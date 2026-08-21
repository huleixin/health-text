/* Phase 4 extracted module — globals shared with index.html */
// 云端只同步家庭健康数据。viewer/currentViewDate/themeMode 属于本地 UI 状态，不能进入云端。
// 调用方（pushToCloud/clearCloudData）仅做 JSON.stringify，无需深拷贝。
function getSyncData(source){
  // 优化5：无source时使用缓存，避免每次同步都深拷贝+normalize+migrate
  if(!source && !_syncDataCacheDirty && _syncDataCache){
    return _syncDataCache;
  }
  const src=JSON.parse(JSON.stringify(source||state));
  migrateProfiles(src);
  normalizeDeletedRecords(src);
  normalizeCoupleSpace(src);
  const result = {
    appMode:getAppMode(src),
    appModeUpdatedAt:Number(src.appModeUpdatedAt)||0,
    profiles: (src.profiles||[]).map(p=>{
      normalizeFavoriteCollections(p);
      const avatar=resolveProfileAvatar(p);
      if(avatar&&p.avatar!==avatar) return Object.assign({},p,{avatar});
      return p;
    }),
    coupleSpace:src.coupleSpace,
    deletedRecords: src.deletedRecords||{weight:[],food:[],exercise:[],steps:[],sleep:[],water:[]}
  };
  // 优化5/2：缓存结果并计算hash，供周期同步变化检测使用
  if(!source){
    _syncDataCache = result;
    _syncDataCacheHash = hashString(JSON.stringify(result));
    _syncDataCacheDirty = false;
  }
  return result;
}

// ==================== CLOUD SYNC ====================
let syncTimer = null;
let isSyncing = false;
let deviceId = null;
// --- 同步性能优化变量 ---
let _syncPromise = null;          // 优化3：复用进行中的同步Promise，避免重复请求
let _lastSyncDataHash = '';       // 优化2：上次成功同步的数据hash，用于周期同步变化检测
let _syncDataCache = null;        // 优化5：缓存的sync payload，避免重复深拷贝+normalize
let _syncDataCacheHash = '';      // 优化5：缓存数据对应的hash
let _syncDataCacheDirty = true;   // 优化5：缓存是否需要重建
function loadPreferCloudModeOnNextSyncCode(){
  try{return (localStorage.getItem(PENDING_SYNC_CODE_STORAGE_KEY)||'').trim()}
  catch(e){return ''}
}
function rememberPreferCloudModeOnNextSyncCode(code){
  _preferCloudModeOnNextSyncCode=String(code||'').trim();
  try{
    if(_preferCloudModeOnNextSyncCode) localStorage.setItem(PENDING_SYNC_CODE_STORAGE_KEY,_preferCloudModeOnNextSyncCode);
    else localStorage.removeItem(PENDING_SYNC_CODE_STORAGE_KEY);
  }catch(e){}
}
function clearPreferCloudModeOnNextSyncCode(code){
  const normalized=String(code||'').trim();
  if(_preferCloudModeOnNextSyncCode===normalized) _preferCloudModeOnNextSyncCode='';
  try{
    if((localStorage.getItem(PENDING_SYNC_CODE_STORAGE_KEY)||'')===normalized) localStorage.removeItem(PENDING_SYNC_CODE_STORAGE_KEY);
  }catch(e){}
}
let _preferCloudModeOnNextSyncCode=loadPreferCloudModeOnNextSyncCode(); // 更换同步码时，Existing空间Mode仅在下一次合并中优先
function invalidateSyncDataCache(){ _syncDataCacheDirty = true; }
function getSyncDataHash(){
  if(_syncDataCacheDirty || !_syncDataCache) getSyncData();
  return _syncDataCacheHash;
}

function getDeviceId(){
  if(!deviceId){
    deviceId = localStorage.getItem('healthTrackerDeviceId');
    if(!deviceId){
      deviceId = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2,6);
      localStorage.setItem('healthTrackerDeviceId', deviceId);
    }
  }
  return deviceId;
}

function getCloudConfig(){
  return {
    url: EMBEDDED_CLOUD_CONFIG.url,
    anonKey: EMBEDDED_CLOUD_CONFIG.anonKey,
    familyCode: state.familyCode || ''
  };
}

function isCloudConfigured(){
  const c = getCloudConfig();
  return !!(c.familyCode && c.familyCode.length >= 1);
}

function buildRestUrl(path){
  let base = EMBEDDED_CLOUD_CONFIG.url.replace(/\/+$/,'');
  if(!base.includes('/rest/v1')){
    base = base + '/rest/v1';
  }
  return base + path;
}

function getRestHeaders(extra){
  const h = {
    'apikey': EMBEDDED_CLOUD_CONFIG.anonKey,
    'Authorization': 'Bearer ' + EMBEDDED_CLOUD_CONFIG.anonKey,
    'Content-Type': 'application/json'
  };
  return Object.assign(h, extra || {});
}

function updateSyncStatus(status, text){
  const badge = document.getElementById('syncBadge');
  const textEl = document.getElementById('syncBadgeText');
  if(!badge) return;
  badge.className = 'sync-badge ' + status;
  if(text) textEl.textContent = text;
  badge.style.display = isCloudConfigured() || status === 'config' ? 'inline-flex' : 'none';
}

function getSyncStatusText(status){
  const map = {
    synced: '已同步',
    syncing: '同步中…',
    error: '同步失败 · 点击重试',
    offline: '未连接',
    config: '未配置'
  };
  return map[status] || '未连接';
}
function formatSyncTime(d){
  if(!d) return '';
  const dt=d instanceof Date?d:new Date(d);
  return `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
}

// Push local data to cloud (upsert)
async function pushToCloud(familyCode){
  const code=(familyCode||state.familyCode||'').trim();
  if(!code) return {ok:false, err:'未配置云同步'};
  const c = {...getCloudConfig(),familyCode:code};
  const syncData = getSyncData(state);
  const payload = {
    code: c.familyCode,
    data: JSON.stringify(syncData),
    updated_at: new Date().toISOString(),
    device_id: getDeviceId()
  };
  try{
    const uploadBody=JSON.stringify(payload);
    const _uploadStart=performance.now();
    const resp = await fetch(buildRestUrl('/health_sync'), {
      method: 'POST',
      headers: getRestHeaders({
        'Prefer': 'return=minimal,resolution=merge-duplicates'
      }),
      body: uploadBody
    });
    const _uploadMs=performance.now()-_uploadStart;
    if(!resp.ok){
      const errText = await resp.text();
      const verified=await verifyCloudCleared(c.familyCode);
      if(verified) return {ok:true};
      return {ok:false, err:`HTTP ${resp.status}: ${errText.substring(0,200)}`};
    }
    console.info('[SyncPerf]', {uploadMs:Math.round(_uploadMs), uploadBytes:uploadBody.length});
    return {ok:true, uploadMs:Math.round(_uploadMs), uploadBytes:uploadBody.length};
  }catch(e){
    return {ok:false, err:e.message};
  }
}

// Pull cloud data
async function pullFromCloud(familyCode){
  const code=(familyCode||state.familyCode||'').trim();
  if(!code) return {ok:false, err:'未配置云同步'};
  const c = {...getCloudConfig(),familyCode:code};
  try{
    const _downloadStart=performance.now();
    const resp = await fetch(
      buildRestUrl('/health_sync?code=eq.' + encodeURIComponent(c.familyCode) + '&order=updated_at.desc&limit=1'),
      {
        method: 'GET',
        headers: getRestHeaders()
      }
    );
    const _downloadMs=performance.now()-_downloadStart;
    if(!resp.ok){
      const errText = await resp.text();
      return {ok:false, err:`HTTP ${resp.status}: ${errText.substring(0,200)}`};
    }
    const rows = await resp.json();
    const _downloadBytes=rows&&rows.length?JSON.stringify(rows).length:0;
    console.info('[SyncPerf]', {downloadMs:Math.round(_downloadMs), downloadBytes:_downloadBytes});
    if(!rows || rows.length === 0){
      return {ok:true, data:null, downloadMs:Math.round(_downloadMs), downloadBytes:_downloadBytes};
    }
    const row = rows[0];
    let cloudState;
    try{
      cloudState = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
    }catch(e){
      return {ok:false, err:'云端数据格式错误'};
    }
    return {ok:true, data:cloudState, row:row, downloadMs:Math.round(_downloadMs), downloadBytes:_downloadBytes};
  }catch(e){
    return {ok:false, err:e.message};
  }
}

function isClearedHealthData(data){
  if(!data || !Array.isArray(data.profiles)) return false;
  return data.profiles.every(p =>
    (!p.weightRecords || p.weightRecords.length===0) &&
    (!p.foodRecords || p.foodRecords.length===0) &&
    (!p.exerciseRecords || p.exerciseRecords.length===0) &&
    (!p.stepsRecords || p.stepsRecords.length===0) &&
    (!p.sleepRecords || p.sleepRecords.length===0) &&
    (!p.waterRecords || p.waterRecords.length===0)
  );
}

async function verifyCloudCleared(familyCode){
  const code=(familyCode||'').trim();
  if(!code) return true;
  try{
    const resp=await fetch(
      buildRestUrl('/health_sync?code=eq.' + encodeURIComponent(code) + '&order=updated_at.desc&limit=1'),
      {method:'GET',headers:getRestHeaders()}
    );
    if(!resp.ok) return false;
    const rows=await resp.json();
    if(!rows || rows.length===0) return true;
    const cloudData=typeof rows[0].data==='string'?JSON.parse(rows[0].data):rows[0].data;
    return isClearedHealthData(cloudData);
  }catch(e){
    return false;
  }
}

// 用空数据覆盖指定家庭共享码的云端数据，避免 DELETE 请求被浏览器或接口策略拦截
async function clearCloudData(familyCode, emptyState){
  const code=(familyCode||'').trim();
  if(!code) return {ok:true};
  const syncData=getSyncData(emptyState||getDefaultData());
  const payload = {
    code: code,
    data: JSON.stringify(syncData),
    updated_at: new Date().toISOString(),
    device_id: getDeviceId()
  };
  try{
    const resp = await fetch(buildRestUrl('/health_sync'), {
      method: 'POST',
      headers: getRestHeaders({
        'Prefer': 'return=minimal,resolution=merge-duplicates'
      }),
      body: JSON.stringify(payload)
    });
    if(!resp.ok){
      const errText = await resp.text();
      return {ok:false, err:`HTTP ${resp.status}: ${errText.substring(0,200)}`};
    }
    return {ok:true};
  }catch(e){
    const verified=await verifyCloudCleared(code);
    if(verified) return {ok:true};
    return {ok:false, err:e.message};
  }
}

function syncProfileBasics(localProfile,cloudProfile){
  const cloudProfileUpdatedAt=cloudProfile.profileUpdatedAt||0;
  const localProfileUpdatedAt=localProfile.profileUpdatedAt||0;
  if(cloudProfileUpdatedAt < localProfileUpdatedAt) return;
  ['name','gender','relation','birthDate','height','activityLevel','goal','goalWeight','startWeight','profileUpdatedAt','displayName','avatar'].forEach(key=>{
    if(cloudProfile[key]!==undefined){
      localProfile[key]=cloudProfile[key];
    }
  });
}

// Merge cloud data into local state
function mergeCloudData(cloudState,{preferCloudMode=false}={}){
  if(!cloudState || !cloudState.profiles) return state;
  normalizeAppMode(cloudState,{existingData:true});
  normalizeDeletedRecords(state);
  normalizeDeletedRecords(cloudState);
  normalizeCoupleSpace(state);
  normalizeCoupleSpace(cloudState);
  migrateProfiles(cloudState);
  migrateWeightRecords(cloudState);

  // Start with a deep copy of local state
  const merged = JSON.parse(JSON.stringify(state));
  const deletedRecords={
    weight:Array.from(new Set([...(state.deletedRecords?.weight||[]),...(cloudState.deletedRecords?.weight||[])])),
    food:Array.from(new Set([...(state.deletedRecords?.food||[]),...(cloudState.deletedRecords?.food||[])])),
    exercise:Array.from(new Set([...(state.deletedRecords?.exercise||[]),...(cloudState.deletedRecords?.exercise||[])])),
    steps:Array.from(new Set([...(state.deletedRecords?.steps||[]),...(cloudState.deletedRecords?.steps||[])])),
    sleep:Array.from(new Set([...(state.deletedRecords?.sleep||[]),...(cloudState.deletedRecords?.sleep||[])])),
    water:Array.from(new Set([...(state.deletedRecords?.water||[]),...(cloudState.deletedRecords?.water||[])]))
  };
  // 优化4：将deletedRecords数组转为Set，查询从O(n)降至O(1)
  const deletedSets={};
  Object.keys(deletedRecords).forEach(type=>{deletedSets[type]=new Set(deletedRecords[type])});
  const isDeleted=(type,keys)=>{
    // 优化4：使用Set查询替代Array.includes，O(n)→O(1)
    const s=deletedSets[type];
    if(!s||s.size===0) return false;
    return (Array.isArray(keys)?keys:[keys]).some(k=>s.has(k));
  };

  cloudState.profiles.forEach(cloudProfile => {
    let localProfile = merged.profiles.find(p => p.id === cloudProfile.id);
    if(!localProfile){
      // Profile doesn't exist locally, add it
      const cloned=JSON.parse(JSON.stringify(cloudProfile));
      cloned.weightRecords=(cloned.weightRecords||[]).filter(r=>!isDeleted('weight',weightDeleteKeys(r,cloned.id)));
      cloned.foodRecords=(cloned.foodRecords||[]).filter(r=>!isDeleted('food',r.id));
      cloned.exerciseRecords=(cloned.exerciseRecords||[]).filter(r=>!isDeleted('exercise',r.id));
      cloned.stepsRecords=(cloned.stepsRecords||[]).filter(r=>!isDeleted('steps',r.id));
      cloned.sleepRecords=(cloned.sleepRecords||[]).filter(r=>!isDeleted('sleep',r.id));
      cloned.waterRecords=(cloned.waterRecords||[]).filter(r=>!isDeleted('water',r.id));
      merged.profiles.push(cloned);
      return;
    }

    // Profile basic information is shared cloud data. Use profileUpdatedAt to avoid
    // overwriting a newer local profile edit during pull -> merge -> push.
    syncProfileBasics(localProfile,cloudProfile);

    // Merge weight records (deduplicate by profile + exact time + weight, supports multiple records per day)
    const weightMap = new Map();
    const weightKey=r=>`${localProfile.id}_${getRecordTime(r)}_${r.weight}`;
    localProfile.weightRecords=(localProfile.weightRecords||[]).filter(r=>!isDeleted('weight',weightDeleteKeys(r,localProfile.id)));
    localProfile.weightRecords.forEach(r => weightMap.set(weightKey(r), r));
    cloudProfile.weightRecords.forEach(r => {
      const key=weightKey(r);
      if(!weightMap.has(key) && !isDeleted('weight',weightDeleteKeys(r,localProfile.id))){
        weightMap.set(key, r);
      }
    });
    localProfile.weightRecords = Array.from(weightMap.values()).sort((a,b) => getRecordTime(a).localeCompare(getRecordTime(b)));

    // Merge food records (deduplicate by id)
    const foodMap = new Map();
    localProfile.foodRecords=(localProfile.foodRecords||[]).filter(r=>!isDeleted('food',r.id));
    localProfile.foodRecords.forEach(r => foodMap.set(r.id || (r.date+'_'+r.meal), r));
    (cloudProfile.foodRecords || []).forEach(r => {
      const key = r.id || (r.date+'_'+r.meal);
      if(!foodMap.has(key) && !isDeleted('food',key)){
        foodMap.set(key, r);
      }
    });
    localProfile.foodRecords = Array.from(foodMap.values());

    // Merge exercise records (deduplicate by id)
    const exMap = new Map();
    localProfile.exerciseRecords=(localProfile.exerciseRecords||[]).filter(r=>!isDeleted('exercise',r.id));
    localProfile.exerciseRecords.forEach(r => exMap.set(r.id, r));
    (cloudProfile.exerciseRecords || []).forEach(r => {
      if(!exMap.has(r.id) && !isDeleted('exercise',r.id)){
        exMap.set(r.id, r);
      }
    });
    localProfile.exerciseRecords = Array.from(exMap.values());

    // Merge steps records (deduplicate by id)
    localProfile.stepsRecords=localProfile.stepsRecords||[];
    const stepsMap=new Map();
    localProfile.stepsRecords=(localProfile.stepsRecords).filter(r=>!isDeleted('steps',r.id));
    localProfile.stepsRecords.forEach(r=>stepsMap.set(r.id,r));
    (cloudProfile.stepsRecords||[]).forEach(r=>{
      if(!stepsMap.has(r.id)&&!isDeleted('steps',r.id)) stepsMap.set(r.id,r);
    });
    localProfile.stepsRecords=Array.from(stepsMap.values());

    // Merge sleep records (deduplicate by id)
    localProfile.sleepRecords=localProfile.sleepRecords||[];
    const sleepMap=new Map();
    localProfile.sleepRecords=(localProfile.sleepRecords).filter(r=>!isDeleted('sleep',r.id));
    localProfile.sleepRecords.forEach(r=>sleepMap.set(r.id,r));
    (cloudProfile.sleepRecords||[]).forEach(r=>{
      if(!sleepMap.has(r.id)&&!isDeleted('sleep',r.id)) sleepMap.set(r.id,r);
    });
    localProfile.sleepRecords=Array.from(sleepMap.values());

    // Merge water records (deduplicate by id)
    localProfile.waterRecords=localProfile.waterRecords||[];
    const waterMap=new Map();
    localProfile.waterRecords=(localProfile.waterRecords).filter(r=>!isDeleted('water',r.id));
    localProfile.waterRecords.forEach(r=>waterMap.set(r.id,r));
    (cloudProfile.waterRecords||[]).forEach(r=>{
      if(!waterMap.has(r.id)&&!isDeleted('water',r.id)) waterMap.set(r.id,r);
    });
    localProfile.waterRecords=Array.from(waterMap.values());

    // Merge favorite foods by stable favorite id and deletion tombstones.
    // A tombstone deletes older local/cloud favorites, while a newer re-favorite clears the tombstone.
    mergeFavoriteCollections(localProfile,cloudProfile);

  });

  // Couple space is shared: merge by field and anniversary id to avoid overwriting partner edits.
  merged.coupleSpace=mergeCoupleSpace(state.coupleSpace,cloudState.coupleSpace);
  normalizeCoupleSpace(merged);
  const localModeUpdatedAt=Number(state.appModeUpdatedAt)||0;
  const cloudModeUpdatedAt=Number(cloudState.appModeUpdatedAt)||0;
  if(preferCloudMode||cloudModeUpdatedAt>=localModeUpdatedAt){
    merged.appMode=getAppMode(cloudState);
    merged.appModeUpdatedAt=cloudModeUpdatedAt;
  }else{
    merged.appMode=getAppMode(state);
    merged.appModeUpdatedAt=localModeUpdatedAt;
  }
  merged.current_profile_id = state.current_profile_id;
  merged.viewerId = getProfileIdByDataId(merged,state.current_profile_id)||state.viewerId;
  merged.activeProfileId = state.activeProfileId;
  merged.aiConfig = state.aiConfig;
  merged.familyCode = state.familyCode;
  merged.lastLocalClearAt = state.lastLocalClearAt || null;
  merged.deletedRecords = deletedRecords;

  detachLargeAvatarsFromData(merged);
  return merged;
}

// Full sync: pull -> merge -> push
// 优化2/3/6：force=false时检查hash跳过周期同步；复用进行中的Promise；保留SyncPerf日志
async function syncNow(silent,{force=true}={}){
  runDeferredDataMigrations();
  if(!isCloudConfigured()){
    if(!silent) showToast('请先在设置中配置云同步','error');
    return false;
  }
  // 优化3：如果正在同步，复用当前Promise，不重复请求
  if(isSyncing){
    if(_syncPromise) return _syncPromise;
    console.info('[SyncPerf]', {skipped:true, reason:'sync in progress, no promise to reuse'});
    return false;
  }
  const syncFamilyCode=state.familyCode;
  // 优化3：手动同步/启动同步时清除pending防抖timer，避免重复执行
  if(force && syncTimer){
    clearTimeout(syncTimer);
    syncTimer=null;
  }
  // 优化2：周期同步(force=false)时，如果本地数据无变化则跳过完整GET+POST
  if(!force){
    const currentHash=getSyncDataHash();
    if(currentHash && currentHash===_lastSyncDataHash){
      console.info('[SyncPerf]', {skipped:true, reason:'periodic sync: no local change, skip', hash:currentHash});
      return true;
    }
  }
  isSyncing = true;
  updateSyncStatus('syncing', getSyncStatusText('syncing'));
  const _totalStart=performance.now();

  const preferCloudModeForThisSync=_preferCloudModeOnNextSyncCode===syncFamilyCode;
  _syncPromise = (async () => {
    let mergedFromCloud = false;
    let _downloadBytes=0, _uploadBytes=0, _downloadMs=0, _uploadMs=0, _mergeMs=0;
    try{
      // Step 1: Pull cloud data
      const pullResult = await pullFromCloud(syncFamilyCode);
      if(!pullResult.ok){
        throw new Error(pullResult.err);
      }
      if(state.familyCode!==syncFamilyCode){
        console.info('[SyncPerf]',{skipped:true,reason:'sync code changed during pull',from:syncFamilyCode,to:state.familyCode});
        return true;
      }
      _downloadMs=pullResult.downloadMs||0;
      _downloadBytes=pullResult.downloadBytes||0;

      // Step 2: Merge if cloud has data.
      // 如果本机刚清空过数据，而云端记录更新时间更早，则跳过旧云端数据，防止旧记录回流。
      const localClearAt=state.lastLocalClearAt||0;
      const cloudUpdatedAt=pullResult.row?.updated_at ? new Date(pullResult.row.updated_at).getTime() : 0;
      const shouldSkipOldCloud=!preferCloudModeForThisSync&&localClearAt&&cloudUpdatedAt&&cloudUpdatedAt<localClearAt;
      if(pullResult.data && !shouldSkipOldCloud){
        const _mergeStart=performance.now();
        const modeBeforeMerge=getAppMode();
        state = mergeCloudData(pullResult.data,{preferCloudMode:preferCloudModeForThisSync});
        const modeChanged=getAppMode()!==modeBeforeMerge;
        invalidateSyncDataCache(); // 优化5：合并后state已变化，标记缓存失效
        invalidateHealthScoreMemo(); // 云端合并后必须清健康快照 memo，否则首页仍显示同步前旧数据
        _mergeMs=performance.now()-_mergeStart;
        mergedFromCloud = true;
        if(modeChanged) reconcileAppModeUI();
        else{
          // 性能优化：Mode未变化时只刷新当前页面需要的模块，不触发完整 renderAll
          renderDashboard();
          if(activeAppPage==='health') renderChart();
          if(activeAppPage==='couple') renderAppPageSummaries();
        }
      }

      // Step 3: Push merged data to cloud
      const pushResult = await pushToCloud(syncFamilyCode);
      if(!pushResult.ok){
        throw new Error(pushResult.err);
      }
      _uploadMs=pushResult.uploadMs||0;
      _uploadBytes=pushResult.uploadBytes||0;
      if(preferCloudModeForThisSync) clearPreferCloudModeOnNextSyncCode(syncFamilyCode);

      // 优化2：记录成功同步后的数据hash，供下次周期同步比较
      _lastSyncDataHash = getSyncDataHash();

      // Update sync timestamp and save once
      state.lastSyncAt = Date.now();
      try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getPersistableState()));
      }catch(e){}

      const _totalMs=performance.now()-_totalStart;
      console.info('[SyncPerf]', {
        totalMs:Math.round(_totalMs),
        downloadMs:Math.round(_downloadMs),
        mergeMs:Math.round(_mergeMs),
        uploadMs:Math.round(_uploadMs),
        downloadBytes:_downloadBytes,
        uploadBytes:_uploadBytes,
        mergedFromCloud
      });

      const syncTime=formatSyncTime(new Date(state.lastSyncAt));
      updateSyncStatus('synced', `已同步 · ${syncTime}`);
      if(!silent) showToast('同步成功','success');
      return true;
    }catch(e){
      console.error('Sync error:', e);
      // Safety: persist merged data even if push failed
      if(mergedFromCloud){
        try{
          localStorage.setItem(STORAGE_KEY, JSON.stringify(getPersistableState()));
        }catch(e2){}
      }
      updateSyncStatus('error', '同步失败 · 点击重试');
      if(!silent) showToast('同步失败: ' + e.message, 'error');
      return false;
    }finally{
      isSyncing = false;
      _syncPromise = null;
    }
  })();

  return _syncPromise;
}

// Debounced auto-sync (called after saveData)
function debouncedSync(){
  if(!isCloudConfigured()) return;
  // Safety lock: do NOT push during join-existing-space flow (pull-first)
  if(_isJoiningSpace) return;
  if(syncTimer) clearTimeout(syncTimer);
  const run=()=>{
    if(_isJoiningSpace) return;
    if(isSyncing){
      syncTimer=setTimeout(run,500);
      return;
    }
    syncTimer=null;
    syncNow(true,{force:true});
  };
  syncTimer=setTimeout(run,3000);
}

// Test cloud connection
async function testSyncConnection(){
  const resultEl = document.getElementById('syncTestResult');
  if(resultEl) resultEl.innerHTML = '<span style="color:var(--gold)">测试中...</span>';

  // Use embedded URL and key, read code from input
  const code = document.getElementById('setSyncCode')?.value.trim() || '';

  if(!code){
    if(resultEl) resultEl.innerHTML = '<span class="err">请输入同步码</span>';
    return false;
  }

  try{
    const resp = await fetch(
      buildRestUrl('/health_sync?code=eq.' + encodeURIComponent(code) + '&order=updated_at.desc&limit=1'),
      {
        method: 'GET',
        headers: getRestHeaders()
      }
    );

    if(resp.ok){
      const rows = await resp.json();
      const hasData = rows && rows.length > 0;
      if(resultEl){
        resultEl.innerHTML = '<span class="ok">✓ 连接成功' + (hasData ? '（已有云端数据）' : '（新共享码，首次使用）') + '</span>';
      }
      return true;
    }else if(resp.status === 404){
      if(resultEl) resultEl.innerHTML = '<span class="err">✗ 数据表不存在，请联系管理员</span>';
      return false;
    }else if(resp.status === 401 || resp.status === 403){
      if(resultEl) resultEl.innerHTML = '<span class="err">✗ 认证失败</span>';
      return false;
    }else{
      const errText = await resp.text();
      if(resultEl) resultEl.innerHTML = '<span class="err">✗ HTTP ' + resp.status + ': ' + errText.substring(0,100) + '</span>';
      return false;
    }
  }catch(e){
    if(resultEl) resultEl.innerHTML = '<span class="err">✗ 网络错误: ' + e.message + '</span>';
    return false;
  }
}

// Initialize cloud sync on app load
// Safe to call multiple times — periodic interval is set up only once.
let _periodicSyncSetup=false;
async function initCloudSync(){
  if(!isCloudConfigured()){
    updateSyncStatus('config', '未配置');
    return;
  }
  // Show last sync time if available, otherwise show "已配置"
  if(state.lastSyncAt){
    const lastTime=formatSyncTime(state.lastSyncAt);
    updateSyncStatus('synced', `已同步 · ${lastTime}`);
  }else{
    updateSyncStatus('config', '已配置');
  }
  updateSyncStatus('syncing', '同步中…');
  // Pull from cloud on startup
  const ok = await syncNow(true);
  if(ok && !_periodicSyncSetup){
    _periodicSyncSetup=true;
    // Set up periodic sync every 2 minutes
    setInterval(() => {
      if(!isSyncing && isCloudConfigured()){
        syncNow(true,{force:false}); // 优化2：周期同步，无变化时自动跳过
      }
    }, 120000);
  }
}
