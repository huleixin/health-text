/* Phase 4 extracted module — globals shared with index.html */
function renderCoupleTrendRow(title,meText,otherText,meName,otherName){
  const mLabel=meName||'我';
  const oLabel=otherName||'TA';
  return `<div class="couple-compare-line">
    <div class="metric">${escapeHTML(title)}</div>
    <div class="couple-compare-side"><span>${escapeHTML(mLabel)}</span><strong>${escapeHTML(getTextOrWaiting(meText))}</strong></div>
    <div class="couple-compare-side"><span>${escapeHTML(oLabel)}</span><strong>${escapeHTML(getTextOrWaiting(otherText))}</strong></div>
  </div>`;
}
function getCoupleAiAdvice(meSnap,otherSnap){
  const cs=getCoupleSpace();
  const nextM=getNextMeeting();
  const meetingDays=nextM?daysUntilDate(nextM.startDate):null;
  const meAny=coupleHasAnyData(meSnap);
  const otherAny=coupleHasAnyData(otherSnap);
  if(Number.isFinite(meetingDays)&&meetingDays>=0&&meetingDays<=7) return `距离下一次见面还有${meetingDays}天，可以一起保持规律作息。`;
  if(meAny&&otherAny&&meSnap.exerciseMinutes>0&&otherSnap.exerciseMinutes>0) return '今天你们都完成运动，坚持得不错。';
  if(otherAny&&otherSnap.hasSleep&&otherSnap.sleepPct<75) return 'TA今天睡眠不足，可以提醒TA早点休息。';
  if(meAny&&!otherAny) return 'TA今天还没有记录饮食或运动，可以提醒TA一下。';
  if(!meAny&&otherAny) return 'TA今天已经开始记录了，你也可以补一条，保持共同节奏。';
  if(meSnap.waterPct>=100&&otherSnap.waterPct>=100) return '你们今天都完成了饮水目标，可以继续保持。';
  return '保持简单记录就好，饮水、运动、睡眠各补一点，会让你们的共同趋势更清晰。';
}
// ==================== Couple Time Center Helpers ====================
const LUNAR_QIXI_DATES={2024:'2024-08-10',2025:'2025-08-29',2026:'2026-08-19',2027:'2027-08-08',2028:'2028-08-26',2029:'2029-08-15',2030:'2030-08-05'};
function formatDateLocal(date){
  const y=date.getFullYear();
  const m=String(date.getMonth()+1).padStart(2,'0');
  const d=String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function parseChineseLunarNumber(value){
  const text=String(value||'').replace(/闰|月|日|初/g,'').trim();
  const direct=Number(text.replace(/[^\d]/g,''));
  if(Number.isFinite(direct)&&direct>0) return direct;
  const map={一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9,十:10,冬:11,腊:12,正:1};
  if(map[text]) return map[text];
  if(text.startsWith('十')) return 10+(map[text.slice(1)]||0);
  if(text.includes('十')){
    const [tens,ones]=text.split('十');
    return (map[tens]||1)*10+(map[ones]||0);
  }
  return 0;
}
function getChineseLunarMonthDay(date){
  try{
    if(!window.Intl||!Intl.DateTimeFormat) return null;
    const parts=new Intl.DateTimeFormat('zh-u-ca-chinese',{month:'numeric',day:'numeric'}).formatToParts(date);
    const monthPart=parts.find(p=>p.type==='month')?.value;
    const dayPart=parts.find(p=>p.type==='day')?.value;
    const month=parseChineseLunarNumber(monthPart);
    const day=parseChineseLunarNumber(dayPart);
    return month&&day?{month,day}:null;
  }catch(e){
    return null;
  }
}
function getLunarQixiDate(year){
  if(LUNAR_QIXI_DATES[year]) return LUNAR_QIXI_DATES[year];
  const start=new Date(`${year}-07-15T00:00`);
  const end=new Date(`${year}-09-15T00:00`);
  for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1)){
    const lunar=getChineseLunarMonthDay(d);
    if(lunar?.month===7&&lunar?.day===7) return formatDateLocal(d);
  }
  return null;
}
function getDefaultCoupleHolidays(){
  const now=Date.now();
  return [
    {id:'hol_valentine',name:'情人节',month:2,day:14,isLunar:false,enabled:true,hidden:false,updatedAt:now},
    {id:'hol_whiteday',name:'白色情人节',month:3,day:14,isLunar:false,enabled:true,hidden:false,updatedAt:now},
    {id:'hol_520',name:'520',month:5,day:20,isLunar:false,enabled:true,hidden:false,updatedAt:now},
    {id:'hol_qixi',name:'七夕节',month:7,day:7,isLunar:true,enabled:true,hidden:false,updatedAt:now},
    {id:'hol_nye',name:'跨年夜',month:12,day:31,isLunar:false,enabled:true,hidden:false,updatedAt:now},
    {id:'hol_newyear',name:'元旦',month:1,day:1,isLunar:false,enabled:true,hidden:false,updatedAt:now}
  ];
}
function ensureDefaultHolidays(){
  const cs=getCoupleSpace();
  const defaults=getDefaultCoupleHolidays();
  const current=Array.isArray(cs.holidays)?cs.holidays:[];
  const existingIds=new Set(current.map(h=>h.id));
  const missing=defaults.filter(h=>!existingIds.has(h.id));
  if(missing.length){
    cs.holidays=[...current,...missing];
    cs.updatedAt=Date.now();
  }
  return cs.holidays;
}
function getHolidayNextDate(holiday,base=todayStr()){
  if(!holiday||!holiday.month||!holiday.day) return null;
  if(holiday.isLunar){
    const year=Number(base.slice(0,4));
    let solar=getLunarQixiDate(year);
    if(solar&&solar<base) solar=getLunarQixiDate(year+1);
    return solar;
  }
  const m=String(holiday.month).padStart(2,'0');
  const d=String(holiday.day).padStart(2,'0');
  const year=Number(base.slice(0,4));
  let next=`${year}-${m}-${d}`;
  if(next<base) next=`${year+1}-${m}-${d}`;
  return next;
}
function formatCountdownDays(date){
  if(!isValidDateStr(date)) return '未设置';
  const d=daysUntilDate(date);
  if(d===0) return '今天';
  if(d>0) return `还有${d}天`;
  return `已过去${Math.abs(d)}天`;
}
function getActiveCountdowns(){
  const cs=getCoupleSpace();
  const all=[];
  const nextM=getNextMeeting();
  if(nextM) all.push({id:'meeting',title:nextM.title||'见面',date:nextM.startDate,icon:nextM.type==='trip'?'✈️':'📍'});
  (cs.countdowns||[]).forEach(c=>all.push(c));
  return all.sort((a,b)=>(daysUntilDate(a.date)||9999)-(daysUntilDate(b.date)||9999));
}
function getNearestCountdown(){
  const all=getActiveCountdowns();
  const future=all.filter(c=>{const d=daysUntilDate(c.date);return d!==null&&d>=0});
  return future[0]||all[0]||null;
}
function getActiveHolidays(){
  return getDefaultCoupleHolidays();
}
function getNearestCoupleHoliday(base=todayStr()){
  const holidays=getActiveHolidays();
  const candidates=holidays.map(h=>{
    const nextDate=getHolidayNextDate(h,base);
    const days=nextDate?daysUntilDate(nextDate,base):null;
    return nextDate&&days!==null&&days>=0?{...h,nextDate,days}:null;
  }).filter(Boolean);
  return candidates.sort((a,b)=>a.days-b.days||String(a.nextDate).localeCompare(String(b.nextDate)))[0]||null;
}
function formatNearestHolidayDays(holiday){
  if(!holiday) return '';
  if(holiday.days===0) return `今天是${holiday.name}`;
  return `还有 ${holiday.days} 天`;
}
function getSortedAnniversaries(){
  const cs=getCoupleSpace();
  const all=[];
  if(cs.togetherDate) all.push({id:'together',name:'在一起纪念日',date:cs.togetherDate,type:'together',sortOrder:cs.togetherSortOrder,remindDays:cs.togetherRemindDays,enabled:cs.togetherReminderEnabled});
  (cs.anniversaries||[]).forEach(a=>all.push(a));
  return all.sort(compareAnniversaryOrder);
}
function getTodayMemorySnippet(owner,other){
  const meSnap=owner?getHealthScoreData(owner,currentViewDate):null;
  const otherSnap=other?getHealthScoreData(other,currentViewDate):null;
  const parts=[];
  if(meSnap){
    if(meSnap.exerciseMinutes>0) parts.push('今日运动');
    if(meSnap.waterPct>=100) parts.push('饮水目标');
    if(meSnap.hasSleep) parts.push('睡眠记录');
  }
  if(otherSnap){
    if(otherSnap.exerciseMinutes>0) parts.push('TA也运动了');
    if(otherSnap.waterPct>=100) parts.push('TA完成了饮水');
  }
  return parts.length?parts.join('<br>'):'';
}
function formatCoupleTimelineDate(date){
  const base=formatDate(date);
  if(date===currentViewDate) return `${base} · 今天`;
  if(date===addDays(currentViewDate,-1)) return `${base} · 昨天`;
  const labels=['周日','周一','周二','周三','周四','周五','周六'];
  const parsed=new Date(`${date}T00:00`);
  return Number.isNaN(parsed.getTime())?base:`${base} · ${labels[parsed.getDay()]}`;
}
function getCoupleTimelineIcon(text){
  const label=String(text||'');
  if(label.includes('运动')) return 'activity';
  if(label.includes('饮水')) return 'droplets';
  if(label.includes('睡眠')) return 'moon';
  return 'circle-check';
}
function renderCoupleTimeCenter(owner,other){
  const cs=getCoupleSpace();
  const togetherDays=cs.togetherDate?Math.max(0,daysBetweenDates(cs.togetherDate)):null;
  const nextM=getNextMeeting();
  const nearestCD=nextM?{id:'meeting',title:nextM.title||'见面',date:nextM.startDate,icon:nextM.type==='trip'?'✈️':'📍'}:getNearestCountdown();
  const anniversaries=getSortedAnniversaries();
  const nearestHoliday=getNearestCoupleHoliday();
  const memories=(cs.memories||[]).slice().sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const todaySnippet=getTodayMemorySnippet(owner,other);
  const hasAnyTimeData=cs.togetherDate||nextM||anniversaries.length||cs.countdowns?.length||memories.length;
  // Empty state
  if(!hasAnyTimeData){
    return `<div class="couple-section couple-time-empty">
      <div class="couple-section-title">${icon('heart')} 我们的时光</div>
      <div class="couple-time-main">记录属于你们的第一个重要日子</div>
      <div class="couple-time-sub">设置在一起日期、下一次见面或纪念日后，这里会自动计算你们的时间。</div>
      <div class="couple-actions" style="justify-content:center"><button class="btn btn-gold btn-sm" type="button" data-couple-time-action="together">开始设置</button></div>
    </div>
    <div class="couple-section couple-records">
      <div class="couple-time-card-head">
        <div class="couple-section-title">${icon('heart')} 我们的记录</div>
        <button class="couple-link-btn" type="button" data-couple-time-action="memory">添加</button>
      </div>
      <div class="couple-records-empty">还没有共同记录，完成一次共同健康记录后会显示在这里。</div>
    </div>`;
  }
  // Main time card: primary together duration + two nearby states
  const meetingSet=!!nextM;
  const today=todayStr();
  const meetingDays=meetingSet?daysUntilDate(nextM.startDate):null;
  let meetingStatus;
  if(meetingSet&&meetingDays!==null){
    const isOngoing=nextM.startDate<today&&(nextM.endDate||nextM.startDate)>=today;
    const dateText=nextM.endDate&&nextM.endDate!==nextM.startDate
      ?`${formatLedgerDateGroup(nextM.startDate)} - ${formatLedgerDateGroup(nextM.endDate)}`
      :formatLedgerDateGroup(nextM.startDate);
    if(isOngoing){
      meetingStatus={label:'当前'+(nextM.type==='trip'?'旅行':'见面'),value:'进行中',detail:`${nextM.title} · ${dateText}`,action:'meeting'};
    }else if(meetingDays===0){
      meetingStatus={label:'下一次见面',value:'今天',detail:`${nextM.title} · ${dateText}`,action:'meeting'};
    }else if(meetingDays>0){
      meetingStatus={label:'下一次见面',value:`${meetingDays}天后`,detail:`${nextM.title} · ${dateText}`,action:'meeting'};
    }else{
      meetingStatus={label:'下一次见面',value:`${Math.abs(meetingDays)}天前`,detail:`${nextM.title} · ${dateText}`,action:'meeting'};
    }
  }else{
    meetingStatus={label:'下一次见面',value:'暂未安排',detail:'点击管理见面 / 旅行',action:'meeting'};
  }
  const holidayStatus=nearestHoliday
    ?{label:nearestHoliday.name,value:nearestHoliday.days===0?'今天':`${nearestHoliday.days}天后`,detail:nearestHoliday.nextDate}
    :{label:'近期节日',value:'暂无',detail:'继续记录重要日期'};
  // Show only the nearest three important dates in the main card.
  const visibleAnniversaries=anniversaries.slice(0,3);
  const annListHTML=visibleAnniversaries.length?visibleAnniversaries.map(a=>{
    const isTogether=a.id==='together';
    const daysText=isTogether&&togetherDays!==null?`已相伴${togetherDays}天`:formatAnniversaryDistance(a.date);
    const nextText=isTogether?formatTogetherNextAnniversary(a.date):'';
    const metaParts=[a.date,daysText];
    if(nextText) metaParts.push(nextText);
    const actions=coupleAnnSortMode?`<button type="button" class="couple-ann-sort-handle" data-couple-ann-sort-handle aria-label="拖动排序">⋮⋮</button>`:(isTogether?
      `<button type="button" class="couple-ann-edit-btn" data-couple-time-action="together" aria-label="编辑">${icon('edit')}</button>`:
      `<button type="button" class="couple-ann-edit-btn" data-couple-ann-edit="${escapeHTML(a.id)}" aria-label="编辑">${icon('edit')}</button>`);
    return `<div class="couple-ann-compact ${coupleAnnSortMode?'sorting':''}" data-couple-ann-sort-id="${escapeHTML(a.id)}">
      <div class="couple-ann-compact-icon">${isTogether?'❤️':'📅'}</div>
      <div class="couple-ann-compact-info">
        <div class="couple-ann-compact-name">${escapeHTML(a.name)}</div>
        <div class="couple-ann-compact-meta">${metaParts.map(p=>escapeHTML(p)).join(' · ')}</div>
      </div>
      <div class="couple-ann-compact-actions">${actions}</div>
    </div>`;
  }).join(''):'';
  const timelineGroups=[];
  if(todaySnippet){
    timelineGroups.push({date:currentViewDate,rows:todaySnippet.split('<br>').filter(Boolean).map(text=>({text}))});
  }
  memories.slice(0,5).forEach(m=>{
    let group=timelineGroups.find(item=>item.date===m.date);
    if(!group){group={date:m.date,rows:[]};timelineGroups.push(group)}
    group.rows.push({text:escapeHTML(m.content),id:m.id});
  });
  timelineGroups.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const timelineHTML=timelineGroups.length?timelineGroups.map(group=>`<div class="couple-timeline-group">
    <div class="couple-timeline-date">${escapeHTML(formatCoupleTimelineDate(group.date))}</div>
    <div class="couple-timeline-rows">${group.rows.map(row=>`<div class="couple-timeline-row"><span class="couple-timeline-icon">${icon(getCoupleTimelineIcon(row.text))}</span><span class="couple-timeline-title">${row.text}</span>${row.id?`<span class="couple-timeline-actions"><button type="button" data-couple-mem-edit="${escapeHTML(row.id)}" aria-label="编辑">${icon('edit')}</button><button type="button" data-couple-mem-delete="${escapeHTML(row.id)}" aria-label="删除">${icon('x')}</button></span>`:`<span class="couple-timeline-status">${icon('circle-check')}</span>`}</div>`).join('')}</div>
  </div>`).join(''):'';
  return `<div class="couple-section couple-time-overview">
    <div class="couple-section-title">${icon('heart')} 我们的时光</div>
    <div class="couple-time-primary" data-couple-time-action="together">
      <div class="couple-time-primary-label">已相伴</div>
      <div class="couple-time-primary-value"><strong>${togetherDays!==null?togetherDays:'--'}</strong><span>天</span></div>
      <div class="couple-time-primary-date">${escapeHTML(cs.togetherDate?`${cs.togetherDate} 至今`:'点击设置在一起日期')}</div>
    </div>
    <div class="couple-time-status-grid">
      <button class="couple-time-status-card" type="button" data-couple-time-action="${meetingStatus.action}"><span>${escapeHTML(meetingStatus.label)}</span><strong>${escapeHTML(meetingStatus.value)}</strong><small>${escapeHTML(meetingStatus.detail||'')}</small></button>
      <div class="couple-time-status-card"><span>${escapeHTML(holidayStatus.label)}</span><strong>${escapeHTML(holidayStatus.value)}</strong><small>${escapeHTML(holidayStatus.detail)}</small></div>
    </div>
    <div class="couple-time-inline-section">
      <div class="couple-time-inline-head">
        <div class="couple-section-title">${icon('calendar')} 最近的重要日子</div>
        <div class="couple-time-inline-actions">
          ${anniversaries.length>1?`<button class="couple-link-btn" type="button" id="coupleAnnSortToggleBtn">${coupleAnnSortMode?'完成':'全部'}</button>`:''}
          ${coupleAnnSortMode?'':`<button class="couple-link-btn" type="button" data-couple-time-action="anniversary">添加</button>`}
        </div>
      </div>
      <div class="couple-time-inline-list" id="coupleAnnList">${annListHTML||'<div class="couple-records-empty">还没有自定义纪念日</div>'}</div>
    </div>
  </div>
  <div class="couple-section couple-records">
    <div class="couple-time-card-head">
      <div class="couple-section-title">${icon('heart')} 我们的记录</div>
      <button class="couple-link-btn" type="button" data-couple-time-action="memory">添加</button>
    </div>
    ${timelineHTML?`<div class="couple-timeline">${timelineHTML}</div>`:'<div class="couple-records-empty">还没有共同记录，完成一次共同健康记录后会显示在这里。</div>'}
  </div>`;
}
function renderCoupleSpaceContent(owner,other){
  if(!owner||!other){
    return `<div class="couple-space">
      ${renderCoupleTimeCenter(owner,other)}
      <div class="couple-section couple-insufficient">
        <div class="couple-insufficient-title">开始记录，解锁你们的健康故事</div>
        <div class="couple-insufficient-sub">请先完成两位档案设置。这里会展示你们的共同时间、健康变化和重要回忆。</div>
        <div class="couple-cta-group">
          <button class="btn btn-gold btn-sm" type="button" id="coupleInviteBtn">邀请TA加入</button>
        </div>
      </div>
    </div>`;
  }
  const meSnap=getHealthScoreData(owner,currentViewDate);
  const otherSnap=getHealthScoreData(other,currentViewDate);
  const meAny=coupleHasAnyData(meSnap);
  const otherAny=coupleHasAnyData(otherSnap);
  const streak=getCoupleStreakDays(owner,other,currentViewDate);
  const aiAdvice=getCoupleAiAdvice(meSnap,otherSnap);
  const meName=getDisplayName(owner);
  const otherName=getDisplayName(other);
  return `
    <div class="couple-space">
      ${renderCoupleTimeCenter(owner,other)}

      ${renderCoupleLedgerSummaryCard(owner,other)}

      <div class="couple-section couple-companion">
        <div class="couple-section-title">${icon('heart')} 健康同行</div>
        <div class="couple-companion-grid">
          <div class="couple-companion-person">
            <div class="couple-companion-name">${escapeHTML(meName)}</div>
            <div class="couple-companion-score">${coupleScoreDisplay(meSnap)}分</div>
            <div class="couple-companion-note">${escapeHTML(coupleStatusLabel(meSnap))}</div>
          </div>
          <div class="couple-companion-person">
            <div class="couple-companion-name">${escapeHTML(otherName)}</div>
            <div class="couple-companion-score">${otherAny?`${coupleScoreDisplay(otherSnap)}分`:'暂无'}</div>
            <div class="couple-companion-note">${otherAny?escapeHTML(coupleStatusLabel(otherSnap)):'等待TA加入记录'}</div>
            ${!otherAny?`<button class="couple-companion-remind" type="button" id="coupleRemindBtn">提醒TA</button>`:''}
          </div>
        </div>
        <div class="couple-companion-shared">
          <div class="couple-companion-streak">共同坚持 <strong>${streak}天</strong></div>
          <button class="couple-companion-cta" type="button" id="coupleHealthCompareBtn">查看健康对比 &gt;</button>
        </div>
      </div>

      <div class="couple-section couple-change-card">
        <div class="couple-section-title">${icon('chart')} 我们的变化</div>
        <div class="couple-change-sub">近7天健康数据对比</div>
        ${meAny||otherAny?`<div class="couple-compare-header"><span></span><span>${escapeHTML(meName)}</span><span>${escapeHTML(otherName)}</span></div>
        <div class="couple-compare-compact">
          ${renderCoupleTrendRow('体重变化',getWeightChangeText(owner),getWeightChangeText(other),meName,otherName)}
          ${renderCoupleTrendRow('运动次数',getExerciseDaysText(owner),getExerciseDaysText(other),meName,otherName)}
          ${renderCoupleTrendRow('睡眠变化',getSleepTrendText(owner),getSleepTrendText(other),meName,otherName)}
        </div>`:'<div class="couple-change-empty">继续记录后可查看你们的共同变化趋势。</div>'}
      </div>

      <div class="couple-section couple-reminder-section">
        <div class="couple-advice-card" id="coupleAdviceCard">
          <div class="couple-advice-card-label">${icon('bot')} 今天的小提醒</div>
          <div class="couple-advice-card-text">${escapeHTML(aiAdvice)}</div>
        </div>
      </div>

      ${(!meAny&&!otherAny)?`<div class="couple-section couple-insufficient">
        <div class="couple-insufficient-title">开始记录，解锁你们的健康故事</div>
        <div class="couple-insufficient-sub">记录饮水、运动、睡眠或饮食后，这里会生成共同健康变化。</div>
        <div class="couple-cta-group">
          <button class="btn btn-gold btn-sm dash-page-goto" type="button" data-app-page="record">开始记录</button>
          <button class="btn btn-ghost btn-sm" type="button" id="coupleInviteBtn">邀请TA加入</button>
        </div>
      </div>`:''}
    </div>`;
}
function refreshCoupleSpaceView(){
  saveData();
  if(activeAppPage==='couple') renderAppPageSummaries();
}
function saveCoupleAnniversaryOrderFromDom(){
  const list=document.getElementById('coupleAnnList');
  if(!list) return;
  const ids=[...list.querySelectorAll('[data-couple-ann-sort-id]')].map(el=>el.dataset.coupleAnnSortId).filter(Boolean);
  if(!ids.length) return;
  const cs=touchCoupleSpace();
  const now=Date.now();
  ids.forEach((id,index)=>{
    const sortOrder=index+1;
    if(id==='together'){
      cs.togetherSortOrder=sortOrder;
      cs.togetherSortUpdatedAt=now;
    }else{
      const ann=(cs.anniversaries||[]).find(a=>a.id===id);
      if(ann){
        ann.sortOrder=sortOrder;
        ann.updatedAt=now;
      }
    }
  });
  cs.updatedAt=now;
  saveData();
}
function toggleCoupleAnnSortMode(){
  if(coupleAnnSortMode){
    saveCoupleAnniversaryOrderFromDom();
    coupleAnnSortMode=false;
    refreshCoupleSpaceView();
    showToast('重要日期顺序已保存','success');
  }else{
    coupleAnnSortMode=true;
    refreshCoupleSpaceView();
    showToast('长按右侧手柄拖动排序','info');
  }
}
function getCoupleAnnDragAfterElement(list,y,draggingItem){
  const items=[...list.querySelectorAll('[data-couple-ann-sort-id]:not(.dragging)')].filter(el=>el!==draggingItem);
  return items.reduce((closest,child)=>{
    const box=child.getBoundingClientRect();
    const offset=y-box.top-box.height/2;
    if(offset<0&&offset>closest.offset) return {offset,element:child};
    return closest;
  },{offset:Number.NEGATIVE_INFINITY,element:null}).element;
}
function setupCoupleAnnSortHandlers(root){
  const list=root?.querySelector('#coupleAnnList');
  if(!coupleAnnSortMode||!list) return;
  list.querySelectorAll('[data-couple-ann-sort-handle]').forEach(handle=>{
    handle.addEventListener('pointerdown',e=>{
      const item=handle.closest('[data-couple-ann-sort-id]');
      if(!item) return;
      e.preventDefault();
      const pointerId=e.pointerId;
      const startY=e.clientY;
      let dragging=false;
      const startDrag=()=>{
        if(dragging) return;
        dragging=true;
        item.classList.add('dragging');
        try{handle.setPointerCapture(pointerId)}catch(err){}
      };
      const timer=setTimeout(startDrag,180);
      const onMove=ev=>{
        if(!dragging&&Math.abs(ev.clientY-startY)>6){
          clearTimeout(timer);
          startDrag();
        }
        if(!dragging) return;
        ev.preventDefault();
        const after=getCoupleAnnDragAfterElement(list,ev.clientY,item);
        if(after==null) list.appendChild(item);
        else list.insertBefore(item,after);
      };
      const onEnd=()=>{
        clearTimeout(timer);
        document.removeEventListener('pointermove',onMove);
        document.removeEventListener('pointerup',onEnd);
        document.removeEventListener('pointercancel',onEnd);
        if(dragging){
          item.classList.remove('dragging');
          saveCoupleAnniversaryOrderFromDom();
        }
      };
      document.addEventListener('pointermove',onMove,{passive:false});
      document.addEventListener('pointerup',onEnd,{once:true});
      document.addEventListener('pointercancel',onEnd,{once:true});
    });
  });
}
function openCoupleTimeModal(type='together',annId=''){
  const modal=document.getElementById('coupleTimeModal');
  const title=document.getElementById('coupleTimeModalTitle');
  const form=document.getElementById('coupleTimeForm');
  if(!modal||!title||!form) return;
  const cs=getCoupleSpace();
  if(type==='meeting'){
    closeModal('coupleTimeModal');
    openMeetingManager();
    return;
  }else if(type==='anniversary'){
    const ann=(cs.anniversaries||[]).find(a=>a.id===annId);
    title.textContent=ann?'编辑纪念日':'添加纪念日';
    const annType=ann?.type||'custom';
    form.innerHTML=`
      <div class="couple-time-modal-grid">
        <div class="form-group"><label>名称</label><input class="form-input" id="coupleAnnName" maxlength="30" placeholder="例如：TA生日、第一次旅行" value="${escapeHTML(ann?.name||'')}"></div>
        <div class="form-group"><label>类型</label><select class="form-select" id="coupleAnnType">
          <option value="first_meet" ${annType==='first_meet'?'selected':''}>第一次见面</option>
          <option value="first_trip" ${annType==='first_trip'?'selected':''}>第一次旅行</option>
          <option value="birthday" ${annType==='birthday'?'selected':''}>生日</option>
          <option value="custom" ${annType==='custom'?'selected':''}>自定义日期</option>
        </select></div>
        <div class="form-group"><label>日期</label><input class="form-input" id="coupleAnnDate" type="date" value="${escapeHTML(ann?.date||'')}"></div>
        <div class="form-group"><label>提醒</label><select class="form-select" id="coupleAnnEnabled">
          <option value="true" ${ann?.enabled===false?'':'selected'}>开启提醒</option>
          <option value="false" ${ann?.enabled===false?'selected':''}>关闭提醒</option>
        </select></div>
        <div class="form-group"><label>提前提醒天数</label><input class="form-input" id="coupleAnnRemindDays" type="number" min="0" max="365" value="${escapeHTML(String(Number(ann?.remindDays)||1))}"></div>
      </div>
      <div class="couple-form-note">保存后，双方账号都会看到这个重要日子。</div>
      <div class="couple-form-actions"><button class="btn btn-ghost" type="button" id="coupleTimeCancelBtn">取消</button>${ann?`<button class="btn btn-ghost" type="button" id="coupleAnnDeleteBtn" data-ann-id="${escapeHTML(annId)}" style="color:#ff6b6b;border-color:rgba(255,100,100,0.2)">删除</button>`:''}<button class="btn btn-gold" type="button" id="coupleAnnSaveBtn" data-ann-id="${escapeHTML(annId||'')}">保存</button></div>`;
    form.querySelector('#coupleAnnSaveBtn')?.addEventListener('click',saveCoupleAnniversary);
    form.querySelector('#coupleAnnDeleteBtn')?.addEventListener('click',()=>{
      deleteCoupleAnniversary(annId);
      const cs2=getCoupleSpace();
      if(!(cs2.anniversaries||[]).find(a=>a.id===annId)){
        closeModal('coupleTimeModal');
      }
    });
  }else if(type==='countdown'){
    const cd=(cs.countdowns||[]).find(c=>c.id===annId);
    title.textContent=cd?'编辑倒计时':'添加倒计时';
    form.innerHTML=`
      <div class="couple-time-modal-grid">
        <div class="form-group"><label>名称</label><input class="form-input" id="coupleCdTitle" maxlength="30" placeholder="例如：下一次见面、旅行、回家" value="${escapeHTML(cd?.title||'')}"></div>
        <div class="form-group"><label>目标日期</label><input class="form-input" id="coupleCdDate" type="date" value="${escapeHTML(cd?.date||'')}"></div>
        <div class="form-group"><label>图标（可选）</label><input class="form-input" id="coupleCdIcon" maxlength="4" placeholder="📍" value="${escapeHTML(cd?.icon||'📍')}"></div>
      </div>
      <div class="couple-form-note">保存后会自动计算距离目标日期的天数，并同步给 TA。</div>
      <div class="couple-form-actions"><button class="btn btn-ghost" type="button" id="coupleTimeCancelBtn">取消</button><button class="btn btn-gold" type="button" id="coupleCdSaveBtn" data-cd-id="${escapeHTML(annId||'')}">保存</button></div>`;
    form.querySelector('#coupleCdSaveBtn')?.addEventListener('click',saveCoupleCountdown);
  }else if(type==='memory'){
    const mem=(cs.memories||[]).find(m=>m.id===annId);
    title.textContent=mem?'编辑记录':'添加记录';
    form.innerHTML=`
      <div class="couple-time-modal-grid">
        <div class="form-group"><label>日期</label><input class="form-input" id="coupleMemDate" type="date" value="${escapeHTML(mem?.date||currentViewDate)}"></div>
        <div class="form-group"><label>内容</label><textarea class="form-input" id="coupleMemContent" rows="4" maxlength="200" placeholder="例如：一起完成运动、饮水目标，或者一句想说的话">${escapeHTML(mem?.content||'')}</textarea></div>
      </div>
      <div class="couple-form-note">记录你们共同完成的事情或想说的话，会同步给 TA。</div>
      <div class="couple-form-actions"><button class="btn btn-ghost" type="button" id="coupleTimeCancelBtn">取消</button><button class="btn btn-gold" type="button" id="coupleMemSaveBtn" data-mem-id="${escapeHTML(annId||'')}">保存</button></div>`;
    form.querySelector('#coupleMemSaveBtn')?.addEventListener('click',saveCoupleMemory);
  }else{
    title.textContent='设置在一起纪念日';
    form.innerHTML=`
      <div class="couple-time-modal-grid">
        <div class="form-group"><label>开始日期</label><input class="form-input" id="coupleTogetherDate" type="date" value="${escapeHTML(cs.togetherDate||'')}"></div>
        <div class="form-group"><label>提醒</label><select class="form-select" id="coupleTogetherEnabled">
          <option value="true" ${cs.togetherReminderEnabled===false?'':'selected'}>开启提醒</option>
          <option value="false" ${cs.togetherReminderEnabled===false?'selected':''}>关闭提醒</option>
        </select></div>
        <div class="form-group"><label>提前提醒天数</label><input class="form-input" id="coupleTogetherRemindDays" type="number" min="0" max="365" value="${escapeHTML(String(Number(cs.togetherRemindDays)||1))}"></div>
      </div>
      <div class="couple-form-note">设置后会自动计算“已经一起走过”的天数，并同步给 TA。</div>
      <div class="couple-form-actions"><button class="btn btn-ghost" type="button" id="coupleTimeCancelBtn">取消</button><button class="btn btn-gold" type="button" id="coupleTogetherSaveBtn">保存</button></div>`;
    form.querySelector('#coupleTogetherSaveBtn')?.addEventListener('click',saveCoupleTogetherDate);
  }
  if(window.GlassUI) GlassUI.enhance(form);
  form.querySelector('#coupleTimeCancelBtn')?.addEventListener('click',()=>closeModal('coupleTimeModal'));
  modal.classList.add('show');
  GlassScrollLock.lock('modal:coupleTimeModal');
}
function saveCoupleTogetherDate(){
  const date=document.getElementById('coupleTogetherDate')?.value||'';
  if(!isValidDateStr(date)){showToast('请选择开始日期','error');return}
  const cs=touchCoupleSpace();
  const now=Date.now();
  cs.togetherDate=date;
  cs.togetherDateUpdatedAt=now;
  cs.togetherRemindDays=Math.max(0,Math.min(365,Number(document.getElementById('coupleTogetherRemindDays')?.value)||0));
  cs.togetherReminderEnabled=(document.getElementById('coupleTogetherEnabled')?.value||'true')==='true';
  cs.updatedAt=now;
  closeModal('coupleTimeModal');
  refreshCoupleSpaceView();
  showToast('在一起纪念日已保存','success');
}
function saveCoupleMeeting(){
  const title=(document.getElementById('coupleMeetingTitle')?.value||'').trim();
  if(!title){showToast('请输入名称','error');return}
  const type=document.getElementById('coupleMeetingType')?.value||'meeting';
  const date=document.getElementById('coupleMeetingDate')?.value||'';
  if(!isValidDateStr(date)){showToast('请选择开始日期','error');return}
  const endDate=document.getElementById('coupleMeetingEnd')?.value||'';
  const place=(document.getElementById('coupleMeetingPlace')?.value||'').trim().slice(0,40);
  const note=(document.getElementById('coupleMeetingNote')?.value||'').trim().slice(0,120);
  const btn=document.getElementById('coupleMeetingSaveBtn');
  const existingId=btn?.dataset.meetingId||'';
  if(existingId){
    updateMeeting(existingId,{title,type,startDate:date,endDate,place,note});
  }else{
    createMeeting({title,type,startDate:date,endDate,place,note});
  }
  saveData();
  closeModal('coupleTimeModal');
  refreshCoupleSpaceView();
  showToast(existingId?'已更新':'已保存','success');
}
function saveCoupleAnniversary(){
  const btn=document.getElementById('coupleAnnSaveBtn');
  const id=btn?.dataset.annId||'';
  const name=(document.getElementById('coupleAnnName')?.value||'').trim();
  const date=document.getElementById('coupleAnnDate')?.value||'';
  const annType=document.getElementById('coupleAnnType')?.value||'custom';
  const remindDays=Math.max(0,Math.min(365,Number(document.getElementById('coupleAnnRemindDays')?.value)||0));
  const enabled=(document.getElementById('coupleAnnEnabled')?.value||'true')==='true';
  if(!name){showToast('请填写纪念日名称','error');return}
  if(!isValidDateStr(date)){showToast('请选择纪念日日期','error');return}
  const cs=touchCoupleSpace();
  const now=Date.now();
  const annId=id||`ann${now}_${Math.random().toString(36).slice(2,7)}`;
  const idx=(cs.anniversaries||[]).findIndex(a=>a.id===annId);
  const existing=idx>=0?cs.anniversaries[idx]:null;
  const orderValues=[
    Number.isFinite(Number(cs.togetherSortOrder))?Number(cs.togetherSortOrder):null,
    ...(cs.anniversaries||[]).map(a=>Number.isFinite(Number(a.sortOrder))?Number(a.sortOrder):null)
  ].filter(v=>v!==null);
  const sortOrder=existing&&Number.isFinite(Number(existing.sortOrder))?Number(existing.sortOrder):(orderValues.length?Math.max(...orderValues)+1:(cs.anniversaries||[]).length+(cs.togetherDate?2:1));
  const ann={id:annId,name:name.slice(0,30),date,type:annType,sortOrder,remindDays,enabled,updatedAt:now};
  if(idx>=0) cs.anniversaries[idx]=ann;
  else cs.anniversaries=[...(cs.anniversaries||[]),ann];
  cs.deletedAnniversaries=(cs.deletedAnniversaries||[]).filter(t=>t.id!==ann.id);
  cs.updatedAt=now;
  closeModal('coupleTimeModal');
  refreshCoupleSpaceView();
  showToast('纪念日已保存','success');
}
function deleteCoupleAnniversary(id){
  const cs=touchCoupleSpace();
  const target=(cs.anniversaries||[]).find(a=>a.id===id);
  if(!target) return;
  if(!confirm(`删除“${target.name}”？`)) return;
  const now=Date.now();
  cs.anniversaries=(cs.anniversaries||[]).filter(a=>a.id!==id);
  cs.deletedAnniversaries=[...(cs.deletedAnniversaries||[]).filter(t=>t.id!==id),{id,deletedAt:now}];
  cs.updatedAt=now;
  refreshCoupleSpaceView();
  showToast('纪念日已删除','success');
}
function saveCoupleCountdown(){
  const btn=document.getElementById('coupleCdSaveBtn');
  const id=btn?.dataset.cdId||'';
  const title=(document.getElementById('coupleCdTitle')?.value||'').trim();
  const date=document.getElementById('coupleCdDate')?.value||'';
  if(!title){showToast('请填写倒计时名称','error');return}
  if(!isValidDateStr(date)){showToast('请选择目标日期','error');return}
  const cs=touchCoupleSpace();
  const now=Date.now();
  const iconVal=(document.getElementById('coupleCdIcon')?.value||'📍').trim().slice(0,4)||'📍';
  const cd={id:id||`cd${now}_${Math.random().toString(36).slice(2,7)}`,title:title.slice(0,30),date,icon:iconVal,updatedAt:now};
  const idx=(cs.countdowns||[]).findIndex(c=>c.id===cd.id);
  if(idx>=0) cs.countdowns[idx]=cd;
  else cs.countdowns=[...(cs.countdowns||[]),cd];
  cs.deletedCountdowns=(cs.deletedCountdowns||[]).filter(t=>t.id!==cd.id);
  cs.updatedAt=now;
  closeModal('coupleTimeModal');
  refreshCoupleSpaceView();
  showToast('倒计时已保存','success');
}
function deleteCoupleCountdown(id){
  const cs=touchCoupleSpace();
  const target=(cs.countdowns||[]).find(c=>c.id===id);
  if(!target) return;
  if(!confirm(`删除“${target.title}”？`)) return;
  const now=Date.now();
  cs.countdowns=(cs.countdowns||[]).filter(c=>c.id!==id);
  cs.deletedCountdowns=[...(cs.deletedCountdowns||[]).filter(t=>t.id!==id),{id,deletedAt:now}];
  cs.updatedAt=now;
  refreshCoupleSpaceView();
  showToast('倒计时已删除','success');
}
function saveCoupleMemory(){
  const btn=document.getElementById('coupleMemSaveBtn');
  const id=btn?.dataset.memId||'';
  const date=document.getElementById('coupleMemDate')?.value||currentViewDate;
  const content=(document.getElementById('coupleMemContent')?.value||'').trim();
  if(!content){showToast('请填写记录内容','error');return}
  if(!isValidDateStr(date)){showToast('请选择日期','error');return}
  const cs=touchCoupleSpace();
  const now=Date.now();
  const mem={id:id||`mem${now}_${Math.random().toString(36).slice(2,7)}`,date,content:content.slice(0,200),updatedAt:now};
  const idx=(cs.memories||[]).findIndex(m=>m.id===mem.id);
  if(idx>=0) cs.memories[idx]=mem;
  else cs.memories=[...(cs.memories||[]),mem];
  cs.deletedMemories=(cs.deletedMemories||[]).filter(t=>t.id!==mem.id);
  cs.updatedAt=now;
  closeModal('coupleTimeModal');
  refreshCoupleSpaceView();
  showToast('记录已保存','success');
}
function deleteCoupleMemory(id){
  const cs=touchCoupleSpace();
  const target=(cs.memories||[]).find(m=>m.id===id);
  if(!target) return;
  if(!confirm('删除这条记录？')) return;
  const now=Date.now();
  cs.memories=(cs.memories||[]).filter(m=>m.id!==id);
  cs.deletedMemories=[...(cs.deletedMemories||[]).filter(t=>t.id!==id),{id,deletedAt:now}];
  cs.updatedAt=now;
  refreshCoupleSpaceView();
  showToast('记录已删除','success');
}

let healthComparePeriod=7;
let healthCompareMetric='weight';
let healthCompareChart=null;
function openHealthCompare(){
  if(!isCoupleMode()) return false;
  return switchAppPage('health-compare');
}
window.openHealthCompare=openHealthCompare;
function getHealthCompareProfiles(){
  const owner=getDeviceOwnerProfile();
  const other=getPartnerProfile(owner);
  return {owner,other};
}
function getHealthCompareScoreChange(profile,date,days=7){
  if(!profile) return '';
  const current=getHealthScoreData(profile,date);
  const previous=getHealthScoreData(profile,addDays(date,-days+1));
  if(!coupleHasAnyData(current)||!coupleHasAnyData(previous)) return '';
  const currentScore=current.healthScore?.score;
  const previousScore=previous.healthScore?.score;
  if(currentScore===null||currentScore===undefined||previousScore===null||previousScore===undefined) return '';
  const diff=Math.round(currentScore-previousScore);
  return diff===0?'近7天基本稳定':`近7天变化 ${diff>0?'+':''}${diff}`;
}
function getHealthCompareMetric(profile,snap,type){
  if(!profile||!snap) return {value:'暂无数据',note:'',empty:true};
  if(type==='weight'){
    const value=snap.latestWeight?Number(snap.latestWeight.weight):null;
    return Number.isFinite(value)?{value:`${value.toFixed(1)}kg`,note:'当前体重',empty:false}:{value:'暂无数据',note:'',empty:true};
  }
  if(type==='diet') return snap.hasFood?{value:`${Math.round(snap.intakeCalories)}kcal`,note:`目标完成 ${Math.round(snap.dietPct)}%`,empty:false}:{value:'暂无数据',note:'',empty:true};
  if(type==='exercise') return snap.hasExercise?{value:`${Math.round(snap.exerciseMinutes)}min`,note:`目标完成 ${Math.round(snap.exercisePct)}%`,empty:false}:{value:'暂无数据',note:'',empty:true};
  if(type==='sleep') return snap.hasSleep?{value:formatShortSleep(snap.sleepMinutes),note:`目标完成 ${Math.round(snap.sleepPct)}%`,empty:false}:{value:'暂无数据',note:'',empty:true};
  return {value:'暂无数据',note:'',empty:true};
}
function renderHealthCompareMetricCard(title,type,owner,other,ownerSnap,otherSnap){
  const ownerData=getHealthCompareMetric(owner,ownerSnap,type);
  const otherData=getHealthCompareMetric(other,otherSnap,type);
  const person=(profile,data)=>`<div class="health-compare-metric-person"><div class="health-compare-metric-name">${escapeHTML(getDisplayName(profile)||'暂无')}</div><div class="health-compare-metric-value ${data.empty?'empty':''}">${escapeHTML(data.value)}</div>${data.note?`<div class="health-compare-metric-note">${escapeHTML(data.note)}</div>`:''}</div>`;
  return `<div class="health-compare-metric"><div class="health-compare-metric-title">${escapeHTML(title)}</div><div class="health-compare-metric-people">${person(owner,ownerData)}${person(other,otherData)}</div></div>`;
}
function renderHealthComparePage(date=currentViewDate){
  const wrap=document.getElementById('subPage_health_compare');
  if(!wrap) return;
  const {owner,other}=getHealthCompareProfiles();
  if(!owner||!other){
    wrap.innerHTML=_subPageHeader('健康对比','',{backPage:'couple',backLabel:'返回我们页',rightText:''})+
      `<div class="sub-page-content"><section class="sub-page-section"><div class="couple-insufficient-title">等待TA完成健康档案</div><div class="couple-insufficient-sub">完成两位档案设置后，这里会展示健康评分、核心指标和双人趋势。</div></section></div>`;
    renderIcons(wrap);
    return;
  }
  const ownerSnap=getHealthScoreData(owner,date);
  const otherSnap=getHealthScoreData(other,date);
  const streak=getCoupleStreakDays(owner,other,date);
  const scorePerson=(profile,snap)=>{
    const hasAny=coupleHasAnyData(snap);
    const score=hasAny?coupleScoreDisplay(snap):'--';
    const change=getHealthCompareScoreChange(profile,date,7);
    return `<div class="health-compare-person"><div class="health-compare-name">${escapeHTML(getDisplayName(profile))}</div><div class="health-compare-score">${score==='--'?'暂无数据':`${score}分`}</div><div class="health-compare-status">${hasAny?escapeHTML(coupleStatusLabel(snap)):'等待记录'}</div><div class="health-compare-change">${change?escapeHTML(change):'暂无历史评分变化'}</div></div>`;
  };
  wrap.innerHTML=_subPageHeader('健康对比','',{backPage:'couple',backLabel:'返回我们页',rightText:`近${healthComparePeriod}天`})+
    `<div class="sub-page-content">`+
    `<section class="sub-page-section"><div class="health-compare-score-grid">${scorePerson(owner,ownerSnap)}${scorePerson(other,otherSnap)}</div><div class="health-compare-shared">共同坚持 <strong>${streak}天</strong></div></section>`+
    `<section class="sub-page-section"><div class="sub-page-section-title">${icon('heart')} 核心健康指标</div><div class="health-compare-metrics">`+
      renderHealthCompareMetricCard('体重','weight',owner,other,ownerSnap,otherSnap)+
      renderHealthCompareMetricCard('饮食','diet',owner,other,ownerSnap,otherSnap)+
      renderHealthCompareMetricCard('运动','exercise',owner,other,ownerSnap,otherSnap)+
      renderHealthCompareMetricCard('睡眠','sleep',owner,other,ownerSnap,otherSnap)+
    `</div></section>`+
    `<section class="sub-page-section"><div class="sub-page-section-title">${icon('chart')} 双人健康趋势</div>`+
      `<div class="health-compare-controls"><div class="td-filter-row"><button class="td-filter-btn ${healthComparePeriod===7?'active':''}" data-health-compare-period="7">7天</button><button class="td-filter-btn ${healthComparePeriod===30?'active':''}" data-health-compare-period="30">30天</button></div>`+
      `<div class="td-metric-row"><button class="td-metric-btn ${healthCompareMetric==='weight'?'active':''}" data-health-compare-metric="weight">体重</button><button class="td-metric-btn ${healthCompareMetric==='bmi'?'active':''}" data-health-compare-metric="bmi">BMI</button><button class="td-metric-btn ${healthCompareMetric==='bodyFat'?'active':''}" data-health-compare-metric="bodyFat">体脂</button></div></div>`+
      `<div class="health-compare-chart-wrap" id="healthCompareChartWrap"><canvas id="healthCompareChart"></canvas></div></section>`+
    `</div>`;
  renderIcons(wrap);
  wrap.querySelectorAll('[data-health-compare-period]').forEach(btn=>btn.addEventListener('click',()=>{healthComparePeriod=Number(btn.dataset.healthComparePeriod);renderHealthComparePage(date)}));
  wrap.querySelectorAll('[data-health-compare-metric]').forEach(btn=>btn.addEventListener('click',()=>{healthCompareMetric=btn.dataset.healthCompareMetric;renderHealthComparePage(date)}));
  renderHealthCompareTrendChart(owner,other);
}
function renderHealthCompareTrendChart(ownerArg=null,otherArg=null){
  if(activeAppPage!=='health-compare') return;
  const wrap=document.getElementById('healthCompareChartWrap');
  if(!wrap) return;
  const profiles=getHealthCompareProfiles();
  const owner=ownerArg||profiles.owner;
  const other=otherArg||profiles.other;
  if(!owner||!other) return;
  if(typeof Chart==='undefined'){
    wrap.innerHTML='<div class="chart-empty">图表加载中…</div>';
    return;
  }
  const dates=getTrendData(owner,healthComparePeriod).dates;
  const series=[owner,other].map(profile=>({profile,values:getHealthMetricTrendSeries(profile,healthCompareMetric,healthComparePeriod,dates).values}));
  if(!series.some(item=>item.values.some(value=>value!==null&&value!==undefined))){
    if(healthCompareChart){healthCompareChart.destroy();healthCompareChart=null}
    wrap.innerHTML='<div class="chart-empty">暂无趋势数据</div>';
    return;
  }
  const css=getComputedStyle(document.documentElement);
  const theme=document.documentElement.getAttribute('data-theme')||'dark';
  const text=css.getPropertyValue('--txt').trim();
  const muted=css.getPropertyValue('--txt3').trim();
  const gold=css.getPropertyValue('--gold').trim();
  const goldLight=css.getPropertyValue('--gold-l').trim();
  const purple=css.getPropertyValue('--purple').trim();
  const grid=theme==='light'?'rgba(120,92,18,0.11)':'rgba(212,175,55,0.04)';
  const tooltipBg=theme==='light'?'rgba(255,253,247,0.96)':'rgba(14,14,20,0.95)';
  if(healthCompareChart) healthCompareChart.destroy();
  const canvas=document.getElementById('healthCompareChart');
  if(!canvas) return;
  const colors=[gold,purple];
  const values=series.flatMap(item=>item.values.filter(value=>Number.isFinite(value)));
  const minValue=values.length?Math.min(...values):0;
  const maxValue=values.length?Math.max(...values):1;
  const padding=(maxValue-minValue||1)*.15;
  healthCompareChart=new Chart(canvas.getContext('2d'),{
    type:'line',
    data:{labels:dates.map(formatDateShort),datasets:series.map((item,index)=>({label:getDisplayName(item.profile),data:item.values,borderColor:colors[index],backgroundColor:'transparent',borderWidth:2.5,fill:false,tension:.35,pointRadius:2.5,pointHoverRadius:4,pointBackgroundColor:colors[index],pointBorderWidth:0,spanGaps:true}))},
    options:{responsive:true,maintainAspectRatio:false,animation:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:true,position:'bottom',labels:{color:muted,font:{size:11},boxWidth:16,boxHeight:2,padding:8}},tooltip:{backgroundColor:tooltipBg,titleColor:goldLight,bodyColor:text,borderColor:theme==='light'?'rgba(120,92,18,.22)':'rgba(212,175,55,.3)',borderWidth:1,padding:10,cornerRadius:10,callbacks:{label:ctx=>{const value=ctx.parsed.y;if(value===null)return null;if(healthCompareMetric==='bodyFat')return `${ctx.dataset.label}: ${value}%`;if(healthCompareMetric==='bmi')return `${ctx.dataset.label}: ${value}`;return `${ctx.dataset.label}: ${value} kg`;}}}},scales:{x:{grid:{color:grid,drawBorder:false},ticks:{color:muted,font:{size:9},maxRotation:0,maxTicksLimit:7}},y:{grid:{color:grid,drawBorder:false},ticks:{color:muted,font:{size:9},maxTicksLimit:6},min:minValue-padding,max:maxValue+padding}}}
  });
}
