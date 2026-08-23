/**
 * Health Connect → 衡迹同行 数据适配层
 *
 * 职责：调用 window.HealthBridge、转换 JSON、按来源去重合并。
 * 第一版：仅手动 syncNow()；不做后台自动同步。
 *
 * 依赖 index.html 已暴露的全局：
 * getHealthWriteProfile / withProfileId / saveData / renderAll /
 * showToast / calcBMI / normalizeDateTime / requireCurrentDeviceOwnerForHealthWrite
 */
(function (global) {
  'use strict';

  var SOURCE = 'health_connect';
  var MODULE = 'HealthConnectSync';

  function log() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[' + MODULE + ']');
    console.log.apply(console, args);
  }

  function warn() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[' + MODULE + ']');
    console.warn.apply(console, args);
  }

  function isAvailable() {
    try {
      return !!(
        global.HealthBridge &&
        typeof global.HealthBridge.getHealthData === 'function'
      );
    } catch (_) {
      return false;
    }
  }

  function parseBridgeJson(raw) {
    if (raw == null) return null;
    if (typeof raw === 'object') return raw;
    try {
      return JSON.parse(String(raw));
    } catch (err) {
      warn('JSON parse failed', err);
      return null;
    }
  }

  function fetchHealthPayload() {
    if (!isAvailable()) {
      return {
        ok: false,
        error: 'unavailable',
        message: '当前环境不支持 Health Connect（需 Android App）'
      };
    }
    try {
      var raw = global.HealthBridge.getHealthData();
      var data = parseBridgeJson(raw);
      if (!data) {
        return { ok: false, error: 'parse_error', message: 'Health Connect 返回数据无法解析' };
      }
      if (data.availability && data.availability !== 'AVAILABLE') {
        return {
          ok: false,
          error: 'availability',
          message:
            data.availability === 'UPDATE_REQUIRED'
              ? '请先安装或更新 Health Connect'
              : '设备不支持 Health Connect',
          data: data
        };
      }
      if (data.permissionsGranted === false) {
        return {
          ok: false,
          error: 'permission',
          message: '尚未授权 Health Connect 读取权限',
          data: data
        };
      }
      return { ok: true, data: data };
    } catch (err) {
      warn('getHealthData failed', err);
      return {
        ok: false,
        error: 'bridge_exception',
        message: err && err.message ? err.message : '读取 Health Connect 失败'
      };
    }
  }

  function requestPermissions() {
    if (!isAvailable() || typeof global.HealthBridge.requestPermissions !== 'function') {
      return { ok: false, message: '当前环境不支持 Health Connect' };
    }
    try {
      return parseBridgeJson(global.HealthBridge.requestPermissions()) || { ok: true };
    } catch (err) {
      return { ok: false, message: err && err.message ? err.message : '权限请求失败' };
    }
  }

  // ---- time helpers ----

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function toLocalParts(isoOrLocal) {
    if (!isoOrLocal) return null;
    var s = String(isoOrLocal).trim();
    // Already local "YYYY-MM-DDTHH:mm"
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) && s.indexOf('Z') < 0 && !/[+-]\d{2}:\d{2}$/.test(s)) {
      return {
        date: s.slice(0, 10),
        time: s.slice(11, 16),
        dateTime: s.slice(0, 16)
      };
    }
    var d = new Date(s);
    if (Number.isNaN(d.getTime())) return null;
    var date =
      d.getFullYear() +
      '-' +
      pad2(d.getMonth() + 1) +
      '-' +
      pad2(d.getDate());
    var time = pad2(d.getHours()) + ':' + pad2(d.getMinutes());
    return { date: date, time: time, dateTime: date + 'T' + time };
  }

  function todayLocalDate() {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function uid(prefix, key) {
    var safe = String(key || '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 48);
    return prefix + safe + '_' + Date.now().toString(36).slice(-4);
  }

  // ---- exercise type map (Health Connect int → 中文名) ----

  var EXERCISE_TYPE_NAMES = {
    0: '其他运动',
    2: '羽毛球',
    4: '棒球',
    5: '篮球',
    8: '骑自行车',
    9: '动感单车',
    10: '训练营',
    11: '拳击',
    13: '徒手健身',
    14: '板球',
    16: '跳舞',
    25: '椭圆机',
    26: '团课',
    27: '击剑',
    28: '美式足球',
    29: '澳式足球',
    31: '飞盘',
    32: '高尔夫',
    33: '呼吸冥想',
    34: '体操',
    35: '手球',
    36: 'HIIT',
    37: '爬山',
    38: '冰球',
    39: '滑冰',
    44: '武术',
    46: '划桨',
    47: '滑翔伞',
    48: '普拉提',
    50: '壁球',
    51: '攀岩',
    52: '轮滑球',
    53: '划船',
    54: '划船机',
    55: '橄榄球',
    56: '跑步',
    57: '跑步机',
    58: '帆船',
    59: '潜水',
    60: '滑冰',
    61: '滑雪',
    62: '单板滑雪',
    63: '雪鞋健行',
    64: '足球',
    65: '垒球',
    66: '壁球',
    68: '爬楼梯',
    69: '爬楼机',
    70: '力量训练',
    71: '拉伸',
    72: '冲浪',
    73: '公开水域游泳',
    74: '泳池游泳',
    75: '乒乓球',
    76: '网球',
    78: '排球',
    79: '步行',
    80: '水球',
    81: '举重',
    82: '轮椅运动',
    83: '瑜伽'
  };

  function exerciseNameFromSession(session) {
    var title = session && session.title ? String(session.title).trim() : '';
    if (title) return title.slice(0, 40);
    var type = Number(session && session.exerciseType);
    return EXERCISE_TYPE_NAMES[type] || '运动';
  }

  function estimateExerciseCalories(name, durationMin, profile) {
    try {
      var met = 5.0;
      if (typeof global.getExerciseDB === 'function') {
        var db = global.getExerciseDB() || [];
        for (var i = 0; i < db.length; i++) {
          if (db[i] && db[i].name === name && db[i].met != null) {
            met = Number(db[i].met) || met;
            break;
          }
        }
      }
      if (typeof global.calcExerciseCalories === 'function' && durationMin > 0) {
        return global.calcExerciseCalories(
          { name: name, met: met, inputType: 'time' },
          durationMin,
          profile
        );
      }
    } catch (_) {}
    return 0;
  }

  function sleepQualityFromStages(stages) {
    if (!stages) return 'normal';
    var deep = Number(stages.deepMinutes) || 0;
    var rem = Number(stages.remMinutes) || 0;
    var total =
      deep +
      rem +
      (Number(stages.lightMinutes) || 0) +
      (Number(stages.awakeMinutes) || 0);
    if (total <= 0) return 'normal';
    var goodRatio = (deep + rem) / total;
    if (goodRatio >= 0.35) return 'good';
    if (goodRatio < 0.18) return 'poor';
    return 'normal';
  }

  // ---- convert ----

  /**
   * Health Connect JSON → 内部记录数组（尚未写入 profile）
   * 步数写入 stepsRecords（驱动每日视图 / dailyHealthData 聚合）
   */
  function convertToInternal(payload, profile) {
    var out = {
      weightRecords: [],
      stepsRecords: [],
      exerciseRecords: [],
      sleepRecords: []
    };
    if (!payload || typeof payload !== 'object') return out;

    var height =
      profile && profile.height != null
        ? Number(profile.height)
        : payload.body && payload.body.heightCm != null
          ? Number(payload.body.heightCm)
          : null;

    // Weight（当前桥接返回最新一条；兼容未来 body.weights[]）
    var weightSamples = [];
    if (Array.isArray(payload.body && payload.body.weights)) {
      weightSamples = payload.body.weights;
    } else if (payload.body && payload.body.weightKg != null) {
      weightSamples = [
        {
          kg: payload.body.weightKg,
          time: payload.body.weightTime,
          bodyFatPercentage: payload.body.bodyFatPercentage
        }
      ];
    }
    weightSamples.forEach(function (sample) {
      var kg = Number(sample.kg != null ? sample.kg : sample.weightKg);
      if (!Number.isFinite(kg) || kg <= 0) return;
      var parts = toLocalParts(sample.time || sample.weightTime) || {
        date: todayLocalDate(),
        time: '08:00',
        dateTime: todayLocalDate() + 'T08:00'
      };
      var bodyFat = sample.bodyFatPercentage != null ? Number(sample.bodyFatPercentage) : null;
      var bmi =
        typeof global.calcBMI === 'function' ? global.calcBMI(kg, height) : null;
      out.weightRecords.push({
        id: uid('hc_w_', parts.dateTime),
        date: parts.date,
        dateTime: parts.dateTime,
        weight: Math.round(kg * 100) / 100,
        bmi: bmi,
        bodyFat: Number.isFinite(bodyFat) ? Math.round(bodyFat * 10) / 10 : null,
        bodyFatSource: Number.isFinite(bodyFat) ? SOURCE : '',
        source: SOURCE,
        externalId: 'weight:' + parts.dateTime,
        timeRangeStart: parts.dateTime,
        timeRangeEnd: parts.dateTime
      });
    });

    // Steps → stepsRecords（每日健康数据层）
    var dailySteps = [];
    if (Array.isArray(payload.activity && payload.activity.dailySteps)) {
      dailySteps = payload.activity.dailySteps;
    } else if (payload.activity && payload.activity.steps != null) {
      dailySteps = [{ date: todayLocalDate(), steps: payload.activity.steps }];
    }
    dailySteps.forEach(function (row) {
      var steps = Math.round(Number(row.steps));
      if (!Number.isFinite(steps) || steps < 0) return;
      var date = String(row.date || todayLocalDate()).slice(0, 10);
      var dateTime = date + 'T23:59';
      out.stepsRecords.push({
        id: uid('hc_st_', date),
        date: date,
        dateTime: dateTime,
        steps: steps,
        source: SOURCE,
        externalId: 'steps:' + date,
        timeRangeStart: date + 'T00:00',
        timeRangeEnd: dateTime
      });
    });

    // Exercise sessions
    var sessions = (payload.activity && payload.activity.exerciseSessions) || [];
    sessions.forEach(function (session) {
      var start = toLocalParts(session.startTime);
      var end = toLocalParts(session.endTime);
      if (!start || !end) return;
      var duration =
        session.durationMinutes != null
          ? Math.round(Number(session.durationMinutes))
          : Math.max(
              1,
              Math.round(
                (new Date(session.endTime) - new Date(session.startTime)) / 60000
              )
            );
      if (!Number.isFinite(duration) || duration <= 0) return;
      var name = exerciseNameFromSession(session);
      var calories = estimateExerciseCalories(name, duration, profile);
      var ext = 'exercise:' + (session.id || start.dateTime + '_' + end.dateTime);
      out.exerciseRecords.push({
        id: uid('hc_ex_', session.id || start.dateTime),
        date: start.date,
        dateTime: start.dateTime,
        name: name,
        detail: duration + ' 分钟',
        calories: calories,
        durationMinutes: duration,
        source: SOURCE,
        externalId: ext,
        timeRangeStart: start.dateTime,
        timeRangeEnd: end.dateTime,
        hcExerciseType: session.exerciseType != null ? session.exerciseType : null
      });
    });

    // Sleep sessions
    var sleepSessions = (payload.sleep && payload.sleep.sessions) || [];
    sleepSessions.forEach(function (session) {
      var start = toLocalParts(session.startTime);
      var end = toLocalParts(session.endTime);
      if (!start || !end) return;
      var duration =
        session.durationMinutes != null
          ? Math.round(Number(session.durationMinutes))
          : Math.max(
              1,
              Math.round(
                (new Date(session.endTime) - new Date(session.startTime)) / 60000
              )
            );
      if (!Number.isFinite(duration) || duration <= 0) return;
      duration = Math.min(1440, Math.max(1, duration));
      var stages = session.stages || null;
      var ext = 'sleep:' + (session.id || start.dateTime + '_' + end.dateTime);
      out.sleepRecords.push({
        id: uid('hc_sl_', session.id || start.dateTime),
        date: end.date,
        dateTime: start.dateTime,
        duration: duration,
        quality: sleepQualityFromStages(stages),
        startDate: start.date,
        startTime: start.time,
        endDate: end.date,
        endTime: end.time,
        endDateTime: end.dateTime,
        stages: stages
          ? {
              deepMinutes: stages.deepMinutes != null ? Number(stages.deepMinutes) : null,
              lightMinutes: stages.lightMinutes != null ? Number(stages.lightMinutes) : null,
              remMinutes: stages.remMinutes != null ? Number(stages.remMinutes) : null,
              awakeMinutes: stages.awakeMinutes != null ? Number(stages.awakeMinutes) : null
            }
          : null,
        source: SOURCE,
        externalId: ext,
        timeRangeStart: start.dateTime,
        timeRangeEnd: end.dateTime
      });
    });

    return out;
  }

  // ---- dedupe / merge ----

  function sameSource(record) {
    return record && String(record.source || '') === SOURCE;
  }

  function findExisting(list, candidate) {
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      if (!sameSource(r)) continue;
      if (candidate.externalId && r.externalId && r.externalId === candidate.externalId) {
        return r;
      }
      // 日期 + 时间范围 + 来源
      if (
        String(r.date || '') === String(candidate.date || '') &&
        String(r.timeRangeStart || r.dateTime || '') ===
          String(candidate.timeRangeStart || candidate.dateTime || '') &&
        String(r.timeRangeEnd || r.endDateTime || r.dateTime || '') ===
          String(candidate.timeRangeEnd || candidate.endDateTime || candidate.dateTime || '')
      ) {
        return r;
      }
    }
    return null;
  }

  /** 步数：同一来源同一天视为同一条（可更新数值） */
  function findExistingSteps(list, candidate) {
    if (!Array.isArray(list)) return null;
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      if (!sameSource(r)) continue;
      if (candidate.externalId && r.externalId && r.externalId === candidate.externalId) return r;
      if (String(r.date || '') === String(candidate.date || '')) return r;
    }
    return null;
  }

  function attachProfile(profile, record) {
    if (typeof global.withProfileId === 'function') {
      return global.withProfileId(profile, record);
    }
    return record;
  }

  function mergeIntoProfile(profile, converted) {
    var stats = {
      added: { weight: 0, steps: 0, exercise: 0, sleep: 0 },
      updated: { weight: 0, steps: 0, exercise: 0, sleep: 0 },
      skipped: { weight: 0, steps: 0, exercise: 0, sleep: 0 }
    };
    if (!profile || !converted) return stats;

    profile.weightRecords = profile.weightRecords || [];
    profile.stepsRecords = profile.stepsRecords || [];
    profile.exerciseRecords = profile.exerciseRecords || [];
    profile.sleepRecords = profile.sleepRecords || [];

    (converted.weightRecords || []).forEach(function (item) {
      var existing = findExisting(profile.weightRecords, item);
      if (existing) {
        if (Number(existing.weight) !== Number(item.weight)) {
          existing.weight = item.weight;
          existing.bmi = item.bmi;
          existing.bodyFat = item.bodyFat;
          existing.bodyFatSource = item.bodyFatSource;
          existing.source = SOURCE;
          existing.externalId = item.externalId;
          existing.timeRangeStart = item.timeRangeStart;
          existing.timeRangeEnd = item.timeRangeEnd;
          stats.updated.weight++;
        } else {
          stats.skipped.weight++;
        }
        return;
      }
      profile.weightRecords.push(attachProfile(profile, item));
      stats.added.weight++;
    });
    profile.weightRecords.sort(function (a, b) {
      var ta = String(a.dateTime || a.date || '');
      var tb = String(b.dateTime || b.date || '');
      return ta.localeCompare(tb);
    });

    (converted.stepsRecords || []).forEach(function (item) {
      var existing = findExistingSteps(profile.stepsRecords, item);
      if (existing) {
        if (Number(existing.steps) !== Number(item.steps)) {
          existing.steps = item.steps;
          existing.dateTime = item.dateTime;
          existing.source = SOURCE;
          existing.externalId = item.externalId;
          existing.timeRangeStart = item.timeRangeStart;
          existing.timeRangeEnd = item.timeRangeEnd;
          stats.updated.steps++;
        } else {
          stats.skipped.steps++;
        }
        return;
      }
      profile.stepsRecords.push(attachProfile(profile, item));
      stats.added.steps++;
    });

    (converted.exerciseRecords || []).forEach(function (item) {
      var existing = findExisting(profile.exerciseRecords, item);
      if (existing) {
        stats.skipped.exercise++;
        return;
      }
      profile.exerciseRecords.push(attachProfile(profile, item));
      stats.added.exercise++;
    });

    (converted.sleepRecords || []).forEach(function (item) {
      var existing = findExisting(profile.sleepRecords, item);
      if (existing) {
        stats.skipped.sleep++;
        return;
      }
      profile.sleepRecords.push(attachProfile(profile, item));
      stats.added.sleep++;
    });

    return stats;
  }

  function totalChanged(stats) {
    if (!stats) return 0;
    var n = 0;
    ['added', 'updated'].forEach(function (k) {
      var g = stats[k] || {};
      n += (g.weight || 0) + (g.steps || 0) + (g.exercise || 0) + (g.sleep || 0);
    });
    return n;
  }

  function summarizeMessage(stats) {
    var parts = [];
    var a = stats.added || {};
    var u = stats.updated || {};
    if (a.sleep || u.sleep) parts.push('睡眠+' + ((a.sleep || 0) + (u.sleep || 0)));
    if (a.weight || u.weight) parts.push('体重+' + ((a.weight || 0) + (u.weight || 0)));
    if (a.steps || u.steps) parts.push('步数+' + ((a.steps || 0) + (u.steps || 0)));
    if (a.exercise || u.exercise) parts.push('运动+' + ((a.exercise || 0) + (u.exercise || 0)));
    if (!parts.length) return '没有新的 Health Connect 数据需要同步';
    return '已同步：' + parts.join('，');
  }

  /**
   * 手动同步入口
   * @returns {Promise<{ok:boolean, message:string, stats?:object, data?:object}>}
   */
  async function syncNow(options) {
    options = options || {};
    var silent = !!options.silent;

    if (typeof global.requireCurrentDeviceOwnerForHealthWrite === 'function') {
      if (!global.requireCurrentDeviceOwnerForHealthWrite()) {
        return { ok: false, error: 'no_profile', message: '请先绑定当前设备身份' };
      }
    }

    var profile =
      typeof global.getHealthWriteProfile === 'function'
        ? global.getHealthWriteProfile()
        : typeof global.getActiveProfile === 'function'
          ? global.getActiveProfile()
          : null;
    if (!profile) {
      var msg = '未找到可写入的健康档案';
      if (!silent && typeof global.showToast === 'function') global.showToast(msg, 'error');
      return { ok: false, error: 'no_profile', message: msg };
    }

    var fetched = fetchHealthPayload();
    if (!fetched.ok) {
      if (fetched.error === 'permission') {
        requestPermissions();
        var pmsg = fetched.message + '，请授权后再次点击同步';
        if (!silent && typeof global.showToast === 'function') global.showToast(pmsg, 'info');
        return { ok: false, error: 'permission', message: pmsg, data: fetched.data };
      }
      if (!silent && typeof global.showToast === 'function') {
        global.showToast(fetched.message || '同步失败', 'error');
      }
      return fetched;
    }

    var converted = convertToInternal(fetched.data, profile);
    log('converted', {
      weight: converted.weightRecords.length,
      steps: converted.stepsRecords.length,
      exercise: converted.exerciseRecords.length,
      sleep: converted.sleepRecords.length
    });

    var stats = mergeIntoProfile(profile, converted);
    var changed = totalChanged(stats);
    log('merge stats', stats);

    if (changed > 0) {
      if (typeof global.saveData === 'function') global.saveData();
      if (typeof global.renderAll === 'function') global.renderAll();
      else if (typeof global.renderDashboard === 'function') global.renderDashboard();
    }

    var message = summarizeMessage(stats);
    if (!silent && typeof global.showToast === 'function') {
      global.showToast(message, changed > 0 ? 'success' : 'info');
    }

    return {
      ok: true,
      message: message,
      stats: stats,
      changed: changed,
      data: fetched.data
    };
  }

  function updateSyncButtonVisibility() {
    var btn = document.getElementById('healthConnectSyncBtn');
    var wrap = document.getElementById('healthConnectSyncWrap');
    var available = isAvailable();
    if (wrap) wrap.style.display = available ? '' : 'none';
    if (btn) btn.disabled = !available;
  }

  /** 兼容旧调用名：仅刷新入口可见性（点击由 index.html 绑定） */
  function bindManualSyncButton() {
    updateSyncButtonVisibility();
  }

  var api = {
    SOURCE: SOURCE,
    isAvailable: isAvailable,
    fetchHealthPayload: fetchHealthPayload,
    requestPermissions: requestPermissions,
    convertToInternal: convertToInternal,
    mergeIntoProfile: mergeIntoProfile,
    syncNow: syncNow,
    bindManualSyncButton: bindManualSyncButton,
    updateSyncButtonVisibility: updateSyncButtonVisibility
  };

  global.HealthConnectSync = api;
  global.syncHealthConnectNow = function () {
    return syncNow.apply(null, arguments);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateSyncButtonVisibility);
  } else {
    updateSyncButtonVisibility();
  }

  log('module ready, bridge=', isAvailable());
})(typeof window !== 'undefined' ? window : this);
