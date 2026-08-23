/**
 * Phase 4 regression runner — dev only.
 * Usage: append ?phase4test=1 to URL, or call window.__runPhase4Regression() in console.
 * Backs up localStorage, runs tests, restores original data.
 */
(function (global) {
  'use strict';

  const STORAGE_KEYS = [
    'healthTrackerData_v2',
    'healthTrackerViewerId_v1',
    'healthTrackerCurrentProfileId_v1',
    'healthTrackerPendingSyncCode_v1',
    'theme',
    'currentViewDate',
    'healthTrackerDataMigrationVersion_v1'
  ];

  function backupStorage() {
    const snap = {};
    STORAGE_KEYS.forEach((k) => {
      try { snap[k] = localStorage.getItem(k); } catch (_) { snap[k] = null; }
    });
    return snap;
  }

  function restoreStorage(snap) {
    if (!snap) return;
    Object.entries(snap).forEach(([k, v]) => {
      try {
        if (v == null) localStorage.removeItem(k);
        else localStorage.setItem(k, v);
      } catch (_) { /* noop */ }
    });
  }

  function assert(cond, msg) {
    if (!cond) throw new Error(msg || 'assertion failed');
  }

  function makeProfile(id, profileId, name) {
    return {
      id,
      profile_id: profileId,
      name,
      gender: profileId === 'profile_A' ? 'male' : 'female',
      relation: '',
      height: profileId === 'profile_A' ? 175 : 165,
      birthDate: '1995-01-15',
      activityLevel: 'moderate',
      goal: 'maintain',
      goalWeight: null,
      startWeight: profileId === 'profile_A' ? 70 : 55,
      weightRecords: [],
      foodRecords: [],
      exerciseRecords: [],
      stepsRecords: [],
      sleepRecords: [],
      waterRecords: [],
      favoriteFoods: [],
      deletedFavoriteFoods: [],
      favoriteRecipes: []
    };
  }

  function injectTestState() {
    const today = typeof todayStr === 'function' ? todayStr() : new Date().toISOString().slice(0, 10);
    const hist = (() => {
      const d = new Date();
      d.setDate(d.getDate() - 3);
      return d.toISOString().slice(0, 10);
    })();
    const data = {
      appMode: 'couple',
      appModeUpdatedAt: Date.now(),
      profiles: [makeProfile('p1', 'profile_A', '测试用户A'), makeProfile('p2', 'profile_B', '测试用户B')],
      activeProfileId: 'p1',
      aiConfig: state?.aiConfig || {},
      familyCode: '',
      lastSyncAt: null,
      lastModifiedAt: Date.now(),
      lastLocalClearAt: null,
      coupleSpace: {
        togetherDate: '',
        togetherDateUpdatedAt: 0,
        togetherRemindDays: 1,
        togetherReminderEnabled: true,
        nextMeeting: { date: '', place: '', note: '', updatedAt: 0 },
        meetings: [],
        deletedMeetings: [],
        anniversaries: [],
        deletedAnniversaries: [],
        countdowns: [],
        deletedCountdowns: [],
        holidays: [],
        deletedHolidays: [],
        memories: [],
        deletedMemories: [],
        ledger: { expenses: [], deletedExpenses: [], periods: [], deletedPeriods: [], activePeriodId: null, updatedAt: 0 },
        updatedAt: 0
      },
      deletedRecords: { weight: [], food: [], exercise: [], steps: [], sleep: [], water: [] }
    };
    localStorage.setItem('healthTrackerData_v2', JSON.stringify(data));
    localStorage.setItem('healthTrackerCurrentProfileId_v1', 'profile_A');
    localStorage.setItem('currentViewDate', today);
    return { today, hist };
  }

  async function runInPageTests() {
    const results = [];
    const log = (name, ok, detail) => results.push({ name, ok, detail });

    const closeAll = () => {
      while (typeof AppSubPage !== 'undefined' && AppSubPage.isOpen()) closeSubPage();
    };

    try {
      closeAll();
      document.querySelectorAll('.modal-overlay.show,.ledger-dt-overlay.show').forEach((el) => el.classList.remove('show'));
      document.body.classList.remove('app-subpage-active', 'glass-scroll-locked', 'onboarding-active');
      document.documentElement.classList.remove('glass-scroll-locked');

      // Legacy DOM absent
      const legacy = ['quickActionModal', 'recordDetailModal', 'aiModal', 'coupleLedgerModal', 'foodSyncModal'];
      log('no-legacy-dom', legacy.every((id) => !document.getElementById(id)), legacy.filter((id) => document.getElementById(id)));

      // Device owner ready
      const owner = getDeviceOwnerProfile();
      log('device-owner', !!owner && isProfileInitializedForDeviceOwner(owner), owner?.name);

      // Water CRUD
      const wBefore = (getHealthWriteProfile().waterRecords || []).length;
      addWaterRecord(250, recordEntryDateTime(currentViewDate));
      const wAfter = (getHealthWriteProfile().waterRecords || []).length;
      log('water-add', wAfter === wBefore + 1, { wBefore, wAfter });
      const wId = getHealthWriteProfile().waterRecords.slice(-1)[0]?.id;
      const wRec = getHealthWriteProfile().waterRecords.find((r) => r.id === wId);
      if (wRec) wRec.amount = 300;
      saveData();
      log('water-edit', getHealthWriteProfile().waterRecords.find((r) => r.id === wId)?.amount === 300);
      getHealthWriteProfile().waterRecords = getHealthWriteProfile().waterRecords.filter((r) => r.id !== wId);
      saveData();
      log('water-delete', !getHealthWriteProfile().waterRecords.find((r) => r.id === wId));

      // Weight add
      const p = getHealthWriteProfile();
      const wb = (p.weightRecords || []).length;
      p.weightRecords.push(withProfileId(p, {
        id: 'wtest1',
        date: currentViewDate,
        dateTime: `${currentViewDate}T10:00`,
        weight: 71,
        bmi: calcBMI(71, p.height),
        bodyFat: null,
        bodyFatSource: ''
      }));
      saveData();
      log('weight-add', p.weightRecords.length === wb + 1);

      // Steps
      const sb = (p.stepsRecords || []).length;
      saveStepsRecordEntry(5000, `${currentViewDate}T09:00`);
      log('steps-add', (p.stepsRecords || []).length === sb + 1);

      // Sleep cross-midnight
      const slb = (p.sleepRecords || []).length;
      saveSleepRecordEntry({ startTime: '23:30', endTime: '07:00', referenceDate: currentViewDate, quality: 'good' });
      const sl = p.sleepRecords[p.sleepRecords.length - 1];
      log('sleep-cross-midnight', slb < p.sleepRecords.length && sl.duration > 0, { duration: sl?.duration });

      // User isolation
      setCurrentProfile('p2', { render: false, save: false });
      const partnerCount = (getHealthWriteProfile().waterRecords || []).length;
      log('user-isolation', partnerCount === 0, { partnerWater: partnerCount });
      setCurrentProfile('p1', { render: false, save: false });

      // Historical date
      const hist = (() => {
        const d = new Date();
        d.setDate(d.getDate() - 3);
        return d.toISOString().slice(0, 10);
      })();
      saveLocalViewDate(hist);
      addWaterRecord(100, recordEntryDateTime(hist));
      const histRec = getHealthWriteProfile().waterRecords.find((r) => r.date === hist);
      log('historical-date', histRec?.date === hist && histRec.date !== todayStr());
      saveLocalViewDate(todayStr());

      // Food draft multi-item
      foodDraft = [];
      foodDraftSession = { mode: 'search', phase: 'review', editingIndex: null, pendingFood: null, recordDate: currentViewDate, origin: 'quick' };
      foodDraft.push({ name: '苹果', amount: 1, unit: '个', calories: 52, protein: 0, carbs: 14, fat: 0 });
      foodDraft.push({ name: '牛奶', amount: 250, unit: 'ml', calories: 150, protein: 8, carbs: 12, fat: 8 });
      log('food-draft-multi', foodDraft.length === 2);

      // SubPage stack pressure
      for (let i = 0; i < 5; i++) {
        renderWaterModal();
        closeSubPage();
      }
      log('subpage-stack-pressure', !AppSubPage.isOpen());

      // Ledger datetime overlay layout
      openLedgerDateTimePicker(`${currentViewDate}T12:00`, () => {});
      const overlay = document.getElementById('ledgerDateTimeOverlay');
      const panel = document.getElementById('ledgerDateTimePanel');
      const confirmBtn = panel?.querySelector('[data-action="confirm"]');
      const scroll = panel?.querySelector('.ledger-dt-scroll');
      log('ledger-dt-overlay', overlay?.classList.contains('show') && !!confirmBtn && !!scroll);
      closeLedgerDateTimePicker();

      // More record placeholder
      renderUnavailableRecordModal('bp');
      const moreShell = document.querySelector('[data-subpage-id="more_record_item"] [data-record-flow-content]');
      const moreText = moreShell?.textContent || '';
      log('more-record-placeholder', /暂未|尚未|暂不/.test(moreText) && !moreShell?.querySelector('.qa-save-btn'));
      closeSubPage();

      // Bottom nav hide
      renderWaterModal();
      log('bottom-nav-hide', document.body.classList.contains('app-subpage-active'));
      closeSubPage();
      log('bottom-nav-restore', !document.body.classList.contains('app-subpage-active'));

      // Scroll lock
      log('scroll-lock-cleared', !document.body.classList.contains('glass-scroll-locked'));
    } catch (err) {
      log('runner-error', false, err.message);
    }

    return results;
  }

  async function run() {
    const backup = backupStorage();
    const report = { startedAt: new Date().toISOString(), backupKeys: Object.keys(backup), tests: [], restored: false };
    try {
      injectTestState();
      location.reload();
      return { status: 'reloading_for_test_data', backupToken: '__phase4Backup' };
    } catch (e) {
      report.error = e.message;
      restoreStorage(backup);
      report.restored = true;
      return report;
    }
  }

  async function runAfterReload() {
    const backupRaw = sessionStorage.getItem('__phase4Backup');
    const backup = backupRaw ? JSON.parse(backupRaw) : null;
    const report = { startedAt: new Date().toISOString(), tests: [], restored: false };
    try {
      report.tests = await runInPageTests();
    } finally {
      if (backup) {
        restoreStorage(backup);
        sessionStorage.removeItem('__phase4Backup');
        report.restored = true;
      }
    }
    report.passed = report.tests.filter((t) => t.ok).length;
    report.failed = report.tests.filter((t) => !t.ok).length;
    report.finishedAt = new Date().toISOString();
    console.log('[Phase4]', report);
    return report;
  }

  function start() {
    const backup = backupStorage();
    sessionStorage.setItem('__phase4Backup', JSON.stringify(backup));
    injectTestState();
    sessionStorage.setItem('__phase4Pending', '1');
    location.reload();
  }

  if (sessionStorage.getItem('__phase4Pending') === '1') {
    sessionStorage.removeItem('__phase4Pending');
    global.__phase4Report = runAfterReload();
  }

  global.__runPhase4Regression = start;
  global.__phase4RunInPage = runInPageTests;
})(typeof window !== 'undefined' ? window : globalThis);
