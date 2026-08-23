/* Phase 4 extracted module — globals shared with index.html */
const AI_HEALTH_COACH_CACHE_KEY = 'healthTrackerAIHealthCoachV2Cache_v1';
const AI_DAILY_TASKS_CACHE_KEY = 'healthTrackerAIDailyTasksCache_v1';
const AI_WEEKLY_REPORT_CACHE_KEY = 'healthTrackerAIWeeklyReport_v1';
const AI_HEALTH_PROFILE_CACHE_KEY = 'healthTrackerAIHealthProfile_v1';

const aiWeeklyReportInFlight = {};
function getWeeklyReportCache(){
  return readMemoizedLocalJson(AI_WEEKLY_REPORT_CACHE_KEY);
}
function saveWeeklyReportCache(cache){
  writeMemoizedLocalJson(AI_WEEKLY_REPORT_CACHE_KEY,cache||{});
}
function getWeeklyReportProfileKey(profile){
  return getProfileDataId(profile)||profile?.id||'unknown';
}
function getWeeklyReportRange(date=currentViewDate){
  const dates=getRecentDateList(7,date);
  const [y,m,d]=date.split('-').map(Number);
  const end=new Date(y,m-1,d);
  const day=end.getDay()||7;
  const weekStart=new Date(end);
  weekStart.setDate(end.getDate()-day+1);
  const weekKey=`week_${weekStart.getFullYear()}-${String(weekStart.getMonth()+1).padStart(2,'0')}-${String(weekStart.getDate()).padStart(2,'0')}`;
  return {dates,start:dates[0],end:dates[dates.length-1],key:weekKey};
}
function getWeeklyReportDayCache(profile,date=currentViewDate){
  const cache=getWeeklyReportCache();
  const pkey=getWeeklyReportProfileKey(profile);
  const range=getWeeklyReportRange(date);
  return cache[pkey]?.[range.key]||{};
}
function setWeeklyReportDayCache(profile,date,patch){
  const cache=getWeeklyReportCache();
  const pkey=getWeeklyReportProfileKey(profile);
  const range=getWeeklyReportRange(date);
  cache[pkey]=cache[pkey]||{};
  cache[pkey][range.key]={...(cache[pkey][range.key]||{}),...patch,range_start:range.start,range_end:range.end,updatedAt:Date.now()};
  saveWeeklyReportCache(cache);
  return cache[pkey][range.key];
}
function getWeeklyReportSourceSignature(profile,date=currentViewDate){
  const range=getWeeklyReportRange(date);
  const pkey=getWeeklyReportProfileKey(profile);
  const dailyCache=getDailyTasksCache();
  const goal=getHealthGoal(profile);
  return range.dates.map(d=>{
    const snap=getHealthSnapshot(profile,d);
    const dayTasks=dailyCache[pkey]?.[d]?.tasks||[];
    return [
      d,
      snap.healthScore?.score,
      snap.intakeCalories,
      Math.round(snap.intake.protein||0),
      snap.exerciseMinutes,
      snap.recordedExerciseCalories,
      snap.exerciseCalories,
      snap.sleepMinutes,
      snap.waterTotal,
      snap.daily.weight.length,
      snap.daily.food.length,
      snap.daily.exercise.length,
      snap.daily.sleep.length,
      snap.daily.water.length,
      dayTasks.length,
      dayTasks.filter(t=>t.completed).length,
      goal.type,
      goal.target_weight||'',
      goal.strategy?.daily_calories||'',
      goal.strategy?.protein_target||''
    ].join(':');
  }).join('|');
}
function getWeeklyWeightStats(profile,dates){
  const weightRecords=(profile.weightRecords||[])
    .filter(r=>dates.includes(getRecordDate(r)))
    .sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
  const first=weightRecords[0]||null;
  const last=weightRecords[weightRecords.length-1]||null;
  const firstBmi=first?.weight&&profile.height?calcBMI(first.weight,profile.height):null;
  const lastBmi=last?.weight&&profile.height?calcBMI(last.weight,profile.height):null;
  return {
    first_weight:first?.weight||null,
    last_weight:last?.weight||null,
    weight_change:first&&last?+(Number(last.weight-first.weight).toFixed(1)):null,
    first_bmi:firstBmi?Number(firstBmi):null,
    last_bmi:lastBmi?Number(lastBmi):null,
    bmi_change:firstBmi&&lastBmi?+(Number(lastBmi-firstBmi).toFixed(1)):null,
    record_count:weightRecords.length
  };
}
function buildWeeklyReportInput(profile,date=currentViewDate){
  const range=getWeeklyReportRange(date);
  const targets=calcNutrientTargets(profile);
  const latestWeight=getLatestWeight(profile);
  const dailyCache=getDailyTasksCache();
  const pkey=getWeeklyReportProfileKey(profile);
  let totalCalories=0,totalProtein=0,totalCarbs=0,totalFat=0,dietTargetDays=0;
  let exerciseCount=0,exerciseMinutes=0,exerciseCalories=0;
  let sleepTotal=0,sleepDays=0,bestSleep=0,worstSleep=null;
  let waterTotal=0,waterTargetDays=0,scoreTotal=0,scoreDays=0;
  let aiTaskTotal=0,aiTaskDone=0;
  const daily=range.dates.map(d=>{
    const snap=getHealthSnapshot(profile,d);
    const dayTasks=dailyCache[pkey]?.[d]?.tasks||[];
    totalCalories+=snap.intakeCalories;
    totalProtein+=snap.intake.protein||0;
    totalCarbs+=snap.intake.carbs||0;
    totalFat+=snap.intake.fat||0;
    if(snap.hasFood&&snap.dietPct>=80&&snap.dietPct<=120) dietTargetDays++;
    exerciseCount+=snap.daily.exercise.length;
    exerciseMinutes+=snap.exerciseMinutes;
    exerciseCalories+=snap.recordedExerciseCalories;
    if(snap.sleepMinutes>0){
      sleepTotal+=snap.sleepMinutes;
      sleepDays++;
      bestSleep=Math.max(bestSleep,snap.sleepMinutes);
      worstSleep=worstSleep===null?snap.sleepMinutes:Math.min(worstSleep,snap.sleepMinutes);
    }
    waterTotal+=snap.waterTotal;
    if(snap.waterGoal&&snap.waterTotal>=snap.waterGoal) waterTargetDays++;
    const dayScore=snap.healthScore?.score;
    if(dayScore!==null&&dayScore!==undefined){scoreTotal+=dayScore;scoreDays++;}
    aiTaskTotal+=dayTasks.length;
    aiTaskDone+=dayTasks.filter(t=>t.completed).length;
    return {
      date:d,
      health_score:dayScore,
      calories:snap.intakeCalories,
      protein_g:Math.round(snap.intake.protein||0),
      carbs_g:Math.round(snap.intake.carbs||0),
      fat_g:Math.round(snap.intake.fat||0),
      diet_pct:snap.dietPct,
      exercise_count:snap.daily.exercise.length,
      exercise_minutes:Math.round(snap.exerciseMinutes),
      exercise_calories:snap.recordedExerciseCalories,
      exercise_calories_counted_in_budget:snap.exerciseCalories,
      dynamic_calorie_target:snap.targetCals,
      sleep_minutes:snap.sleepMinutes,
      water_ml:snap.waterTotal,
      water_goal_ml:snap.waterGoal,
      ai_tasks:dayTasks.length,
      ai_tasks_done:dayTasks.filter(t=>t.completed).length
    };
  });
  return {
    range:{start:range.start,end:range.end,days:7},
    health_goal:getGoalAIContext(profile),
    profile:{
      age:calcAge(profile.birthDate)||null,
      gender:profile.gender||'',
      height:profile.height||null,
      latest_weight:latestWeight?.weight||null,
      goal:profile.goal||'',
      goalWeight:profile.goalWeight||null,
      activityLevel:profile.activityLevel||''
    },
    body:getWeeklyWeightStats(profile,range.dates),
    daily,
    stats:{
      avg_health_score:scoreDays?Math.round(scoreTotal/scoreDays):0,
      diet:{
        avg_calories:Math.round(totalCalories/range.dates.length),
        avg_protein_g:Math.round(totalProtein/range.dates.length),
        avg_carbs_g:Math.round(totalCarbs/range.dates.length),
        avg_fat_g:Math.round(totalFat/range.dates.length),
        target_calories:targets?.calories||null,
        target_days:dietTargetDays
      },
      exercise:{
        count:exerciseCount,
        total_minutes:Math.round(exerciseMinutes),
        total_calories:Math.round(exerciseCalories),
        target_days:daily.filter(d=>d.exercise_minutes>=30).length
      },
      sleep:{
        avg_minutes:sleepDays?Math.round(sleepTotal/sleepDays):0,
        best_minutes:bestSleep,
        worst_minutes:worstSleep||0,
        recorded_days:sleepDays
      },
      water:{
        avg_ml:Math.round(waterTotal/range.dates.length),
        target_days:waterTargetDays,
        target_ratio:clampPercent(waterTargetDays/range.dates.length*100)
      },
      ai_daily_plan:{
        generated_tasks:aiTaskTotal,
        completed_tasks:aiTaskDone,
        completion_rate:aiTaskTotal?clampPercent(aiTaskDone/aiTaskTotal*100):0
      }
    }
  };
}
function normalizeWeeklyReport(raw,input){
  const obj=raw&&typeof raw==='object'?raw:{};
  const fallback=buildFallbackWeeklyReport(input);
  const section=(name)=>({
    score:clampPercent(Number(obj[name]?.score??fallback[name].score)),
    summary:String(obj[name]?.summary||fallback[name].summary).slice(0,180),
    advice:String(obj[name]?.advice||fallback[name].advice).slice(0,180)
  });
  return {
    week_summary:String(obj.week_summary||fallback.week_summary).slice(0,220),
    health_score:clampPercent(Number(obj.health_score??fallback.health_score)),
    body:{
      weight_change:String(obj.body?.weight_change||fallback.body.weight_change).slice(0,40),
      summary:String(obj.body?.summary||fallback.body.summary).slice(0,180)
    },
    diet:section('diet'),
    exercise:section('exercise'),
    sleep:section('sleep'),
    water:section('water'),
    next_week_plan:(Array.isArray(obj.next_week_plan)?obj.next_week_plan:fallback.next_week_plan).slice(0,5).map(x=>String(x).slice(0,80)).filter(Boolean)
  };
}
function buildFallbackWeeklyReport(input){
  const s=input.stats;
  const goal=input.health_goal||{};
  const weightChange=input.body.weight_change;
  const weightText=weightChange===null?'记录不足':`${weightChange>0?'+':''}${weightChange}kg`;
  let goalText=`当前目标为「${goal.title||'健康保持'}」`;
  if(goal.type==='fat_loss'&&weightChange!==null){
    const weeklyDrop=-Number(weightChange||0);
    goalText=weeklyDrop>0?`本周下降 ${weeklyDrop.toFixed(1)}kg，${weeklyDrop>=0.3&&weeklyDrop<=0.8?'符合减脂节奏':'需要结合目标节奏调整'}`:'本周体重暂未下降，建议继续关注热量与蛋白质完成度';
  }else if(goal.type==='muscle_gain'&&weightChange!==null){
    goalText=Number(weightChange)>0?`本周体重增加 ${Number(weightChange).toFixed(1)}kg，可结合力量训练判断增肌质量`:'本周体重未明显增加，建议关注蛋白质和力量训练';
  }
  const weakest=[
    {k:'饮食',v:s.diet.target_days/7*100},
    {k:'运动',v:s.exercise.target_days/7*100},
    {k:'睡眠',v:s.sleep.avg_minutes/420*100},
    {k:'饮水',v:s.water.target_ratio}
  ].sort((a,b)=>a.v-b.v)[0]?.k||'记录';
  return {
    week_summary:`${goalText}。本周平均健康评分 ${s.avg_health_score} 分，主要需要关注${weakest}。AI每日计划完成 ${s.ai_daily_plan.completed_tasks}/${s.ai_daily_plan.generated_tasks}。`,
    health_score:s.avg_health_score,
    body:{weight_change:weightText,summary:input.body.record_count>=2?`近7天体重变化 ${weightText}，BMI变化 ${input.body.bmi_change??'记录不足'}。`:'本周体重记录不足，建议至少记录2次以判断变化。'},
    diet:{score:clampPercent(s.diet.target_days/7*100),summary:`日均摄入 ${s.diet.avg_calories} kcal，蛋白质约 ${s.diet.avg_protein_g}g，达标 ${s.diet.target_days}/7 天。`,advice:'下周优先保持三餐记录，并在蛋白质不足的日子补充鸡蛋、鱼虾、牛肉或豆制品。'},
    exercise:{score:clampPercent(s.exercise.target_days/7*100),summary:`本周运动 ${s.exercise.count} 次，共 ${s.exercise.total_minutes} 分钟，消耗约 ${s.exercise.total_calories} kcal。`,advice:'下周安排2-3次轻中等强度运动，至少包含2次力量或抗阻训练。'},
    sleep:{score:clampPercent(s.sleep.avg_minutes/420*100),summary:`有记录日平均睡眠 ${formatShortSleep(s.sleep.avg_minutes)}，最短 ${formatShortSleep(s.sleep.worst_minutes)}。`,advice:'如果平均睡眠低于7小时，下周固定23:30前进入睡眠准备。'},
    water:{score:s.water.target_ratio,summary:`日均饮水 ${s.water.avg_ml}ml，达标 ${s.water.target_days}/7 天。`,advice:'饮水未达标的日子建议上午、下午、晚饭后三段补足。'},
    next_week_plan:[`围绕「${goal.title||'健康目标'}」优先改善${weakest}。`,'保持每日记录，避免周报因数据不足失真。','下周至少复盘一次AI每日计划完成情况。']
  };
}
async function callWeeklyReportAI(profile,date=currentViewDate){
  const input=buildWeeklyReportInput(profile,date);
  const aiCfg=getAIConfig();
  if(!aiCfg.apiKey||!aiCfg.modelId) return normalizeWeeklyReport(null,input);
  const prompt=`你是健康App里的个人AI健康周报分析师。请基于过去7天真实数据和health_goal生成一份个人健康总结报告。要求：1. 必须先按用户目标评价“是否接近目标”，不要只评价体重变化，例如减脂要判断下降是否符合计划，增肌要结合蛋白质和力量训练。2. 不要只复述数据，要发现问题、趋势和下周优先级。3. 如果数据不足，明确指出哪些数据不足，并给出具体补记录建议，不要空泛。4. 睡眠、饮水、饮食、运动建议必须围绕目标具体到时间、频次或动作。5. 健康评分是本周综合评分，不等于今日健康评分，也不等于AI每日计划完成率。6. 只返回严格JSON，不要Markdown，不要解释。JSON格式：{"week_summary":"","health_score":0,"body":{"weight_change":"","summary":""},"diet":{"score":0,"summary":"","advice":""},"exercise":{"score":0,"summary":"","advice":""},"sleep":{"score":0,"summary":"","advice":""},"water":{"score":0,"summary":"","advice":""},"next_week_plan":[""]}。输入数据：${JSON.stringify(input)}`;
  const response=await fetch(getApiUrl('/api/weekly-report'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt})
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data?.error||data?.message||`AI请求失败：${response.status}`);
  const text=data?.text||'';
  return normalizeWeeklyReport(extractJSONFromAIText(text),input);
}
async function generateWeeklyReport(profile,date=currentViewDate,{manual=false}={}){
  if(!profile) return null;
  const range=getWeeklyReportRange(date);
  const pkey=getWeeklyReportProfileKey(profile);
  const inflightKey=`${pkey}|${range.key}`;
  const dayCache=getWeeklyReportDayCache(profile,date);
  const signature=getWeeklyReportSourceSignature(profile,date);
  if(dayCache.report&&!manual) return dayCache;
  if(aiWeeklyReportInFlight[inflightKey]) return aiWeeklyReportInFlight[inflightKey];
  aiWeeklyReportInFlight[inflightKey]=(async()=>{
    let report;
    try{
      report=await callWeeklyReportAI(profile,date);
    }catch(err){
      console.warn('AI健康周报调用失败，使用本地兜底周报：',err);
      report=normalizeWeeklyReport(null,buildWeeklyReportInput(profile,date));
    }
    return setWeeklyReportDayCache(profile,date,{report,generatedAt:Date.now(),source_signature:signature,source:'ai'});
  })().finally(()=>{
    delete aiWeeklyReportInFlight[inflightKey];
    renderWeeklyReportCard(profile,date);
  });
  setTimeout(()=>renderWeeklyReportCard(profile,date),0);
  return aiWeeklyReportInFlight[inflightKey];
}
let weeklySummaryDetailState={weak:null,advice:null};
let weeklySummaryDetailTrigger=null;
function syncWeeklySummaryMoreButtons(wrap){
  wrap?.querySelectorAll('.weekly-highlight-summary-card').forEach(card=>{
    const copy=card.querySelector('.weekly-highlight-copy');
    const more=card.querySelector('.weekly-summary-more');
    if(!copy||!more) return;
    const hasHiddenText=more.dataset.hasMore==='true';
    more.hidden=!(hasHiddenText||copy.scrollHeight>copy.clientHeight+1);
  });
}
function openWeeklySummaryDetail(type,trigger){
  const detail=weeklySummaryDetailState[type];
  const modal=document.getElementById('weeklySummaryDetailModal');
  if(!detail||!modal) return;
  weeklySummaryDetailTrigger=trigger||null;
  document.getElementById('weeklySummaryDetailTitle').textContent=detail.title;
  document.getElementById('weeklySummaryDetailContent').textContent=detail.content;
  modal.classList.add('show');
  GlassScrollLock.lock('modal:weeklySummaryDetailModal');
  document.getElementById('weeklySummaryDetailClose')?.focus({preventScroll:true});
}
function closeWeeklySummaryDetail(){
  closeModal('weeklySummaryDetailModal');
  weeklySummaryDetailTrigger?.focus?.({preventScroll:true});
  weeklySummaryDetailTrigger=null;
}
function renderWeeklyReportCard(profile,date=currentViewDate){
  const wrap=document.getElementById('weeklyReportContent');
  if(!wrap||!profile) return;
  const range=getWeeklyReportRange(date);
  const pkey=getWeeklyReportProfileKey(profile);
  const loading=!!aiWeeklyReportInFlight[`${pkey}|${range.key}`];
  const dayCache=getWeeklyReportDayCache(profile,date);
  const report=dayCache.report;
  const displayStart=dayCache.range_start||range.start;
  const displayEnd=dayCache.range_end||range.end;
  if(!report){
    wrap.innerHTML=`
      <section class="ai-weekly-report-card">
        <div class="ai-report-header">
          <div class="ai-report-title-wrap">
            <div class="ai-report-title">${icon('sparkles')}<span>AI健康周报</span></div>
            <div class="ai-report-range">${displayStart} 至 ${displayEnd} · 最近7天</div>
          </div>
          <button class="ai-regenerate-btn" id="weeklyReportRefreshBtn" type="button" ${loading?'disabled':''}>${loading?'生成中':'生成周报'}</button>
        </div>
        <div class="ai-empty">${loading?'AI正在分析过去7天健康数据，请稍候…':'每周第一次打开健康页会自动生成，也可以点击生成。'}</div>
      </section>`;
    bindWeeklyReportCard(profile,date);
    return;
  }
  const dims=[
    ['饮食','diet',report.diet.score],
    ['运动','exercise',report.exercise.score],
    ['睡眠','sleep',report.sleep.score],
    ['饮水','water',report.water.score]
  ];
  const weeklyDisplayInput=buildWeeklyReportInput(profile,date);
  const hasWeeklyLifestyleData=weeklyDisplayInput.daily.some(day=>
    day.calories>0||day.exercise_count>0||day.sleep_minutes>0||day.water_ml>0
  );
  const weeklySummaryText=hasWeeklyLifestyleData
    ? report.week_summary
    : '本周记录数据不足，继续完成饮食、运动、睡眠和饮水记录后，可生成更完整的健康分析。';
  const best=dims.slice().sort((a,b)=>b[2]-a[2])[0]?.[0]||'记录';
  const weak=dims.slice().sort((a,b)=>a[2]-b[2])[0]?.[0]||'记录';
  const weakKey=dims.find(d=>d[0]===weak)?.[1]||'diet';
  const weakSummary=String(report[weakKey]?.summary||'').replace(/\s+/g,' ').trim();
  const weakReason=weakSummary.split(/[。！？!?]/)[0].trim();
  const weakReasonShort=weakReason?weakReason.split(/[，,]/)[0].slice(0,14).trim():'需重点关注';
  const aiAdvice=String(report.next_week_plan[0]||'下周继续保持记录。').replace(/\s+/g,' ').trim();
  const adviceParts=aiAdvice.split(/[，,。！？!?]/).filter(s=>s.trim());
  const aiAdviceTitle=adviceParts[0]?adviceParts[0].slice(0,8).trim():aiAdvice.slice(0,8);
  const aiAdviceDesc=adviceParts[1]?adviceParts[1].slice(0,12).trim():'';
  const fullReportParts=[];
  if(report.week_summary) fullReportParts.push(report.week_summary);
  if(report.body?.summary) fullReportParts.push(`【身体变化】\n${report.body.summary}`);
  if(report.diet?.summary) fullReportParts.push(`【饮食分析】\n${report.diet.summary}${report.diet.advice?'\n建议：'+report.diet.advice:''}`);
  if(report.exercise?.summary) fullReportParts.push(`【运动分析】\n${report.exercise.summary}${report.exercise.advice?'\n建议：'+report.exercise.advice:''}`);
  if(report.sleep?.summary) fullReportParts.push(`【睡眠分析】\n${report.sleep.summary}${report.sleep.advice?'\n建议：'+report.sleep.advice:''}`);
  if(report.water?.summary) fullReportParts.push(`【饮水分析】\n${report.water.summary}${report.water.advice?'\n建议：'+report.water.advice:''}`);
  if(report.next_week_plan?.length) fullReportParts.push(`【下周计划】\n${report.next_week_plan.map(p=>'· '+p).join('\n')}`);
  weeklySummaryDetailState={
    summary:{title:'AI健康周报 · 完整报告',content:fullReportParts.filter(Boolean).join('\n\n')},
    weak:{title:`需要改善 · ${weak}`,content:weakSummary||`${weak}需要重点改善。`},
    advice:{title:'AI建议',content:aiAdvice}
  };
  wrap.innerHTML=`
    <section class="ai-weekly-report-card">
      <div class="ai-report-header">
        <div class="ai-report-title-wrap">
          <div class="ai-report-title">${icon('sparkles')}<span>AI健康周报</span></div>
          <div class="ai-report-range">${displayStart} 至 ${displayEnd} · 最近7天</div>
        </div>
        <button class="ai-regenerate-btn" id="weeklyReportRefreshBtn" type="button" ${loading?'disabled':''}>${loading?'生成中':'重新生成'}</button>
      </div>
      <div class="ai-report-main">
        <div class="ai-score-block">
          <div class="ai-score-ring">
            <div class="ai-score-number">${report.health_score}</div>
            <div class="ai-score-label">本周健康评分</div>
          </div>
        </div>
        <div class="ai-summary-block">
          <div class="ai-summary-text">${escapeHTML(weeklySummaryText)}</div>
          <button class="ai-summary-more" type="button" data-weekly-summary="summary">查看更多 ${icon('chevron-right')}</button>
        </div>
      </div>
      <div class="ai-insight-grid">
        <div class="ai-insight-card">
          <div class="ai-insight-label">体重变化</div>
          <div class="ai-insight-value">${escapeHTML(report.body.weight_change)}</div>
          <div class="ai-insight-desc">较上周</div>
        </div>
        <div class="ai-insight-card">
          <div class="ai-insight-label">最大进步</div>
          <div class="ai-insight-value">${escapeHTML(best)}</div>
          <div class="ai-insight-desc">保持良好</div>
        </div>
        <div class="ai-insight-card">
          <div class="ai-insight-label">需要改善</div>
          <div class="ai-insight-value">${escapeHTML(weak)}</div>
          <div class="ai-insight-desc">${escapeHTML(weakReasonShort)}</div>
        </div>
        <div class="ai-insight-card">
          <div class="ai-insight-label">AI建议</div>
          <div class="ai-insight-value">${escapeHTML(aiAdviceTitle)}</div>
          <div class="ai-insight-desc">${escapeHTML(aiAdviceDesc)}</div>
        </div>
      </div>
      <div class="ai-dimension-bar">
        <div class="ai-dimension-item ai-diet">${icon('utensils')}<span class="ai-dimension-name">饮食</span><strong class="ai-dimension-score">${report.diet.score}</strong></div>
        <div class="ai-dimension-item ai-exercise">${icon('activity')}<span class="ai-dimension-name">运动</span><strong class="ai-dimension-score">${report.exercise.score}</strong></div>
        <div class="ai-dimension-item ai-sleep">${icon('moon')}<span class="ai-dimension-name">睡眠</span><strong class="ai-dimension-score">${report.sleep.score}</strong></div>
        <div class="ai-dimension-item ai-water">${icon('droplets')}<span class="ai-dimension-name">饮水</span><strong class="ai-dimension-score">${report.water.score}</strong></div>
      </div>
    </section>`;
  bindWeeklyReportCard(profile,date);
}
function bindWeeklyReportCard(profile,date=currentViewDate){
  const btn=document.getElementById('weeklyReportRefreshBtn');
  if(btn){
    btn.addEventListener('click',async()=>{
      btn.disabled=true;
      btn.textContent='生成中';
      await generateWeeklyReport(profile,date,{manual:true}).catch(()=>showToast('AI健康周报暂时不可用，已生成本地周报','error'));
      showToast('AI健康周报已更新','success');
    });
  }
  const wrap=document.getElementById('weeklyReportContent');
  wrap?.querySelectorAll('.ai-summary-more').forEach(more=>{
    more.addEventListener('click',()=>openWeeklySummaryDetail(more.dataset.weeklySummary,more));
  });
}
function triggerWeeklyReportAuto(profile,date=currentViewDate){
  if(!profile||activeAppPage!=='health'||isFutureDate(date)) return;
  const dayCache=getWeeklyReportDayCache(profile,date);
  if(dayCache.report) return;
  generateWeeklyReport(profile,date,{manual:false}).catch(()=>{});
}
const AI_HEALTH_PROFILE_MANUAL_COOLDOWN = 24*60*60*1000;
const AI_HEALTH_PROFILE_STALE_AFTER = 7*24*60*60*1000;
const aiHealthProfileInFlight = {};
function getHealthProfileCache(){
  return readMemoizedLocalJson(AI_HEALTH_PROFILE_CACHE_KEY);
}
function saveHealthProfileCache(cache){
  writeMemoizedLocalJson(AI_HEALTH_PROFILE_CACHE_KEY,cache||{});
}
function getHealthProfileProfileKey(profile){
  return getProfileDataId(profile)||profile?.id||'unknown';
}
function getHealthProfileCacheItem(profile){
  const cache=getHealthProfileCache();
  return cache[getHealthProfileProfileKey(profile)]||{};
}
function setHealthProfileCacheItem(profile,entry){
  const cache=getHealthProfileCache();
  const pkey=getHealthProfileProfileKey(profile);
  cache[pkey]=entry;
  saveHealthProfileCache(cache);
  return entry;
}
function getHealthProfileCooldownText(entry){
  const last=Number(entry?.generated_time)||0;
  const remain=AI_HEALTH_PROFILE_MANUAL_COOLDOWN-(Date.now()-last);
  if(remain<=0) return '';
  const hours=Math.ceil(remain/(60*60*1000));
  return hours>=1?`${hours}小时后可重新分析`:`${Math.ceil(remain/60000)}分钟后可重新分析`;
}
function getLatestWeeklyReportForProfile(profile){
  const cache=getWeeklyReportCache();
  const pkey=getWeeklyReportProfileKey(profile);
  const entries=Object.values(cache[pkey]||{}).filter(x=>x?.report);
  entries.sort((a,b)=>(Number(b.generatedAt)||0)-(Number(a.generatedAt)||0));
  const latest=entries[0];
  if(!latest) return null;
  return {
    range_start:latest.range_start,
    range_end:latest.range_end,
    health_score:latest.report.health_score,
    summary:latest.report.week_summary,
    weak:[
      ['饮食',latest.report.diet?.score],
      ['运动',latest.report.exercise?.score],
      ['睡眠',latest.report.sleep?.score],
      ['饮水',latest.report.water?.score]
    ].filter(x=>Number.isFinite(Number(x[1]))).sort((a,b)=>a[1]-b[1])[0]?.[0]||''
  };
}
function getHealthProfileWeightStats(profile,dates){
  const records=(profile.weightRecords||[])
    .filter(r=>dates.includes(getRecordDate(r)))
    .sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
  const first=records[0]||null;
  const last=records[records.length-1]||null;
  const firstBmi=first?.weight&&profile.height?calcBMI(first.weight,profile.height):null;
  const lastBmi=last?.weight&&profile.height?calcBMI(last.weight,profile.height):null;
  return {
    first_weight:first?.weight||null,
    last_weight:last?.weight||null,
    latest_weight:last?.weight||getLatestWeight(profile)?.weight||null,
    weight_change:first&&last?+(last.weight-first.weight).toFixed(1):null,
    first_bmi:firstBmi?Number(firstBmi):null,
    last_bmi:lastBmi?Number(lastBmi):null,
    bmi_change:firstBmi&&lastBmi?+(lastBmi-firstBmi).toFixed(1):null,
    record_count:records.length
  };
}
function buildHealthProfileInput(profile,date=currentViewDate){
  const dates=getRecentDateList(30,date);
  const targets=calcNutrientTargets(profile);
  const latestWeight=getLatestWeight(profile);
  const latestBmi=latestWeight?.weight&&profile.height?calcBMI(latestWeight.weight,profile.height):null;
  const goalContext=getGoalAIContext(profile);
  const dailyCache=getDailyTasksCache();
  const pkey=getDailyTasksProfileKey(profile);
  const foodNames=[];
  const exerciseTypes=[];
  const incompleteTaskTitles={};
  let dataDays=0,foodDays=0,exerciseDays=0,sleepDays=0,waterDays=0,weightDays=0;
  let totalCalories=0,totalProtein=0,totalCarbs=0,totalFat=0,waterTotal=0,waterTargetDays=0;
  let exerciseCount=0,exerciseMinutes=0,exerciseCalories=0,sleepTotal=0,sleepMin=null,sleepMax=0;
  let aiTasks=0,aiTasksDone=0;
  const daily=dates.map(d=>{
    const snap=getHealthSnapshot(profile,d);
    const hasAny=snap.hasFood||snap.hasExercise||snap.hasSleep||snap.hasWater||snap.daily.weight.length>0;
    if(hasAny) dataDays++;
    if(snap.hasFood) foodDays++;
    if(snap.hasExercise) exerciseDays++;
    if(snap.hasSleep) sleepDays++;
    if(snap.hasWater) waterDays++;
    if(snap.daily.weight.length) weightDays++;
    totalCalories+=snap.intakeCalories;
    totalProtein+=snap.intake.protein||0;
    totalCarbs+=snap.intake.carbs||0;
    totalFat+=snap.intake.fat||0;
    waterTotal+=snap.waterTotal;
    if(snap.waterGoal&&snap.waterTotal>=snap.waterGoal) waterTargetDays++;
    exerciseCount+=snap.daily.exercise.length;
    exerciseMinutes+=snap.exerciseMinutes;
    exerciseCalories+=snap.recordedExerciseCalories;
    if(snap.sleepMinutes>0){
      sleepTotal+=snap.sleepMinutes;
      sleepMin=sleepMin===null?snap.sleepMinutes:Math.min(sleepMin,snap.sleepMinutes);
      sleepMax=Math.max(sleepMax,snap.sleepMinutes);
    }
    (snap.daily.food||[]).forEach(r=>(r.foods||[]).forEach(f=>foodNames.push(String(f.name||''))));
    (snap.daily.exercise||[]).forEach(e=>exerciseTypes.push(String(e.name||e.detail||'运动')));
    const dayTasks=dailyCache[pkey]?.[d]?.tasks||[];
    aiTasks+=dayTasks.length;
    aiTasksDone+=dayTasks.filter(t=>t.completed).length;
    dayTasks.filter(t=>!t.completed).forEach(t=>{
      const title=String(t.title||t.type||'未完成任务');
      incompleteTaskTitles[title]=(incompleteTaskTitles[title]||0)+1;
    });
    return {
      date:d,
      has_data:hasAny,
      calories:snap.intakeCalories,
      protein_g:Math.round(snap.intake.protein||0),
      exercise_minutes:Math.round(snap.exerciseMinutes),
      sleep_minutes:snap.sleepMinutes,
      water_ml:snap.waterTotal,
      score:snap.healthScore?.score
    };
  });
  const highOilSugarCount=foodNames.filter(name=>/炸|煎|油|烧烤|奶茶|蛋糕|甜|糖|薯片|辣条|可乐|饮料|炸鸡|汉堡/.test(name)).length;
  const exerciseTypeCount=exerciseTypes.reduce((map,name)=>{
    const key=name||'运动';
    map[key]=(map[key]||0)+1;
    return map;
  },{});
  const commonIncomplete=Object.entries(incompleteTaskTitles).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([title,count])=>({title,count}));
  const dataCompleteness=clampPercent(dataDays/30*100);
  return {
    range:{start:dates[0],end:dates[dates.length-1],days:30},
    data_completeness:dataCompleteness,
    health_goal:goalContext,
    profile:{
      age:calcAge(profile.birthDate)||null,
      gender:profile.gender||'',
      height:profile.height||null,
      weight:latestWeight?.weight||null,
      bmi:latestBmi?Number(latestBmi):null,
      goal:profile.goal||'',
      goalWeight:profile.goalWeight||null,
      activityLevel:profile.activityLevel||''
    },
    body:getHealthProfileWeightStats(profile,dates),
    diet:{
      recorded_days:foodDays,
      avg_calories:Math.round(totalCalories/30),
      avg_protein_g:Math.round(totalProtein/30),
      avg_carbs_g:Math.round(totalCarbs/30),
      avg_fat_g:Math.round(totalFat/30),
      target_calories:targets?.calories||null,
      regularity_pct:clampPercent(foodDays/30*100),
      high_oil_sugar_mentions:highOilSugarCount,
      common_foods:foodNames.filter(Boolean).slice(-20)
    },
    exercise:{
      recorded_days:exerciseDays,
      count:exerciseCount,
      total_minutes:Math.round(exerciseMinutes),
      total_calories:Math.round(exerciseCalories),
      frequency_per_week:Math.round(exerciseDays/30*7*10)/10,
      types:Object.entries(exerciseTypeCount).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([name,count])=>({name,count}))
    },
    sleep:{
      recorded_days:sleepDays,
      avg_minutes:sleepDays?Math.round(sleepTotal/sleepDays):0,
      min_minutes:sleepMin||0,
      max_minutes:sleepMax,
      variability_minutes:sleepMin?Math.round(sleepMax-sleepMin):0,
      regularity_pct:clampPercent(sleepDays/30*100)
    },
    water:{
      recorded_days:waterDays,
      avg_ml:Math.round(waterTotal/30),
      target_days:waterTargetDays,
      target_ratio:clampPercent(waterTargetDays/30*100)
    },
    ai_daily_plan:{
      generated_tasks:aiTasks,
      completed_tasks:aiTasksDone,
      completion_rate:aiTasks?clampPercent(aiTasksDone/aiTasks*100):0,
      common_incomplete_tasks:commonIncomplete
    },
    weekly_report:getLatestWeeklyReportForProfile(profile),
    daily
  };
}
function buildFallbackHealthProfile(input){
  const goal=input.health_goal||{};
  const weak=[
    {k:'饮食',v:input.diet.regularity_pct},
    {k:'运动',v:clampPercent(input.exercise.frequency_per_week/3*100)},
    {k:'睡眠',v:clampPercent(input.sleep.avg_minutes/420*100)},
    {k:'饮水',v:input.water.target_ratio}
  ].sort((a,b)=>a.v-b.v)[0]?.k||'记录';
  const type=goal.title?`${goal.title}型`:(input.profile.goal?.includes('增肌')?'增肌提升型':input.profile.goal?.includes('减')?'减脂改善型':weak==='睡眠'?'睡眠优化型':weak==='运动'?'久坐改善型':weak==='饮食'?'饮食调整型':'健康保持型');
  const strengths=[];
  if(input.water.target_ratio>=60) strengths.push('饮水达标情况相对稳定');
  if(input.exercise.frequency_per_week>=2) strengths.push('已有一定运动习惯');
  if(input.diet.regularity_pct>=60) strengths.push('饮食记录较规律');
  if(input.sleep.avg_minutes>=420) strengths.push('平均睡眠时长较充足');
  if(!strengths.length) strengths.push('已经开始积累健康数据，这是改善的第一步');
  return {
    profile_type:type,
    profile_title:type,
    health_summary:`最近30天数据完整度 ${input.data_completeness}%。你的长期画像目前更接近「${type}」，目标匹配度约 ${goal.progress_pct??0}%，主要改善方向是${weak}。继续记录后画像会更准确。`,
    strengths:strengths.slice(0,4),
    improvements:[{title:`优先改善${weak}`,reason:`最近30天${weak}相关数据低于其他项目，适合作为下月重点。`,priority:'high'}],
    habits:[
      {name:'饮食规律',level:input.diet.regularity_pct>=70?'good':input.diet.regularity_pct>=40?'normal':'poor'},
      {name:'运动习惯',level:input.exercise.frequency_per_week>=3?'good':input.exercise.frequency_per_week>=1?'normal':'poor'},
      {name:'睡眠稳定',level:input.sleep.avg_minutes>=420&&input.sleep.variability_minutes<=120?'good':input.sleep.avg_minutes>=360?'normal':'poor'},
      {name:'饮水达标',level:input.water.target_ratio>=70?'good':input.water.target_ratio>=35?'normal':'poor'}
    ],
    long_term_goal:`未来30天围绕「${goal.title||'健康目标'}」优先提升${weak}，同时保持已有记录习惯。`,
    next_month_focus:[`围绕「${goal.title||'健康目标'}」改善${weak}`,`关注目标策略：${(goal.focus||[]).slice(0,2).join('、')||'保持稳定记录'}`,'每周查看一次AI健康周报趋势','继续记录饮食、运动、睡眠和饮水，提高画像可信度'],
    confidence:Math.max(20,input.data_completeness),
    goal_match_pct:clampPercent(Number(goal.progress_pct)||0)
  };
}
function normalizeHealthProfile(raw,input){
  const obj=raw&&typeof raw==='object'?raw:{};
  const fallback=buildFallbackHealthProfile(input);
  const normalizeList=(list,fb,max=4)=>((Array.isArray(list)?list:fb)||[]).slice(0,max).map(x=>String(x).slice(0,80)).filter(Boolean);
  const improvements=(Array.isArray(obj.improvements)?obj.improvements:fallback.improvements).slice(0,4).map(item=>({
    title:String(item?.title||'改善方向').slice(0,30),
    reason:String(item?.reason||'根据长期数据推荐').slice(0,120),
    priority:['high','medium','low'].includes(item?.priority)?item.priority:'medium'
  }));
  const habits=(Array.isArray(obj.habits)?obj.habits:fallback.habits).slice(0,6).map(item=>({
    name:String(item?.name||'健康习惯').slice(0,24),
    level:['good','normal','poor'].includes(item?.level)?item.level:'normal'
  }));
  return {
    profile_type:String(obj.profile_type||fallback.profile_type).slice(0,24),
    profile_title:String(obj.profile_title||obj.profile_type||fallback.profile_title).slice(0,36),
    health_summary:String(obj.health_summary||fallback.health_summary).slice(0,220),
    strengths:normalizeList(obj.strengths,fallback.strengths,4),
    improvements,
    habits,
    long_term_goal:String(obj.long_term_goal||fallback.long_term_goal).slice(0,140),
    next_month_focus:normalizeList(obj.next_month_focus,fallback.next_month_focus,5),
    confidence:clampPercent(Number(obj.confidence??fallback.confidence)),
    goal_match_pct:clampPercent(Number(obj.goal_match_pct??fallback.goal_match_pct))
  };
}
function getHealthProfileSourceSignature(profile,date=currentViewDate){
  const goal=getHealthGoal(profile);
  const latest=getLatestWeight(profile);
  return [
    getProfileDataId(profile),
    date,
    goal.type,
    goal.target_weight||'',
    goal.target_date||'',
    goal.strategy?.daily_calories||'',
    goal.strategy?.protein_target||'',
    latest?.weight||''
  ].join('|');
}
async function callHealthProfileAI(profile,date=currentViewDate){
  const input=buildHealthProfileInput(profile,date);
  const aiCfg=getAIConfig();
  if(!aiCfg.apiKey||!aiCfg.modelId) return {content:normalizeHealthProfile(null,input),input};
  const prompt=`你是健康App里的AI个人健康画像分析师。请基于最近30天长期健康数据和health_goal，为用户生成动态个人健康画像。要求：1. 不是单日总结，要发现长期规律，例如工作日睡眠不足、运动类型单一、饮食记录不规律、饮水稳定等。2. 必须输出goal_match_pct，表示当前行为与目标的匹配度或完成度，减脂/增肌要结合目标进度、饮食蛋白和运动，睡眠目标要重点看睡眠时长与规律。3. 数据不足时必须说明可信度较低，并给出继续记录建议。4. profile_type由你根据数据和目标自动判断，不限于健康保持型、减脂改善型、增肌提升型、久坐改善型、睡眠优化型、饮食调整型。5. 改善方向必须有原因和优先级。6. 只返回严格JSON，不要Markdown，不要解释。JSON格式：{"profile_type":"","profile_title":"","health_summary":"","strengths":[""],"improvements":[{"title":"","reason":"","priority":"high"}],"habits":[{"name":"","level":"good"}],"long_term_goal":"","next_month_focus":[""],"confidence":0,"goal_match_pct":0}。输入数据：${JSON.stringify(input)}`;
  const response=await fetch(getApiUrl('/api/health-profile'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt})
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data?.error||data?.message||`AI请求失败：${response.status}`);
  const text=data?.text||'';
  return {content:normalizeHealthProfile(extractJSONFromAIText(text),input),input};
}
async function generateHealthProfile(profile,date=currentViewDate,{manual=false}={}){
  if(!profile) return null;
  const pkey=getHealthProfileProfileKey(profile);
  const entry=getHealthProfileCacheItem(profile);
  const signature=getHealthProfileSourceSignature(profile,date);
  if(manual){
    const cooldown=getHealthProfileCooldownText(entry);
    if(cooldown){showToast(`请稍后再重新分析，${cooldown}`,'error');return entry}
  }else if(entry?.content&&entry.source_signature===signature){
    return entry;
  }
  if(aiHealthProfileInFlight[pkey]) return aiHealthProfileInFlight[pkey];
  aiHealthProfileInFlight[pkey]=(async()=>{
    let result;
    try{
      result=await callHealthProfileAI(profile,date);
    }catch(err){
      console.warn('AI健康画像调用失败，使用本地兜底画像：',err);
      const input=buildHealthProfileInput(profile,date);
      result={content:normalizeHealthProfile(null,input),input};
    }
    const range=result.input.range;
    const saved=setHealthProfileCacheItem(profile,{
      profile_id:getProfileDataId(profile),
      generated_time:Date.now(),
      data_range:`${range.start}_${range.end}`,
      profile:result.content.profile_type,
      confidence:result.content.confidence,
      content:result.content,
      data_completeness:result.input.data_completeness,
      source_signature:signature,
      updatedAt:Date.now()
    });
    return saved;
  })().finally(()=>{
    delete aiHealthProfileInFlight[pkey];
    renderHealthProfileCard(profile,date);
  });
  setTimeout(()=>renderHealthProfileCard(profile,date),0);
  return aiHealthProfileInFlight[pkey];
}
function renderHealthProfileCard(profile,date=currentViewDate){
  const wrap=document.getElementById('healthProfileContent');
  if(!wrap||!profile) return;
  const pkey=getHealthProfileProfileKey(profile);
  const loading=!!aiHealthProfileInFlight[pkey];
  const entry=getHealthProfileCacheItem(profile);
  const content=entry.content;
  const cooldown=getHealthProfileCooldownText(entry);
  const stale=entry.generated_time&&(Date.now()-Number(entry.generated_time)>AI_HEALTH_PROFILE_STALE_AFTER);
  if(!content){
    wrap.innerHTML=`
      <div class="health-profile-head">
        <div><div class="health-profile-title">${icon('dna')} 我的健康画像</div><div class="health-profile-sub">最近30天 · 长期健康状态</div></div>
        <button class="health-profile-refresh" id="healthProfileRefreshBtn" type="button" ${loading?'disabled':''}>${loading?'生成中':'生成画像'}</button>
      </div>
      <div class="health-profile-empty">${loading?'AI正在分析长期健康数据，请稍候…':'首次进入会自动生成；数据不足时也会给出低可信度画像。'}</div>`;
    bindHealthProfileCard(profile,date);
    return;
  }
  const levelLabel={good:'良好',normal:'一般',poor:'待改善'};
  const summaryText=String(content.health_summary||'').slice(0,96);
  wrap.innerHTML=`
    <div class="health-profile-head">
      <div><div class="health-profile-title">${icon('dna')} 我的健康画像</div><div class="health-profile-sub">最近30天 · ${entry.data_range||'长期健康状态'}${stale?' · 建议更新':''}</div></div>
      <button class="health-profile-refresh" id="healthProfileRefreshBtn" type="button" ${loading||!!cooldown?'disabled':''}>${loading?'生成中':(cooldown||'重新分析')}</button>
    </div>
    <div class="health-profile-hero">
      <div class="health-profile-type">${escapeHTML(content.profile_type)}</div>
      <div class="health-profile-label">${escapeHTML(content.profile_title)}</div>
      <div class="health-profile-summary">${escapeHTML(summaryText)}${content.health_summary&&content.health_summary.length>96?'…':''}</div>
    </div>
    <div class="health-profile-meta">
      <div class="health-profile-meta-item"><b>${entry.data_completeness??content.confidence}%</b><span>数据完整度</span></div>
      <div class="health-profile-meta-item"><b>${content.confidence}%</b><span>数据可信度</span></div>
      <div class="health-profile-meta-item"><b>${content.goal_match_pct??getGoalMatchScore(profile)}%</b><span>目标匹配度</span></div>
    </div>
    <details class="health-profile-full-details">
      <summary>查看完整画像 ›</summary>
      <div class="health-profile-section">
        <div class="health-profile-section-title">健康优势</div>
        <div class="health-profile-list">${(content.strengths||[]).map(x=>`<div class="health-profile-chip good">✓ ${escapeHTML(x)}</div>`).join('')}</div>
      </div>
      <div class="health-profile-section">
        <div class="health-profile-section-title">改善方向</div>
        <div class="health-profile-list">${(content.improvements||[]).map(x=>`<div class="health-profile-chip warn">⚠ ${escapeHTML(x.title)}：${escapeHTML(x.reason)}</div>`).join('')}</div>
      </div>
      <div class="health-profile-section">
        <div class="health-profile-section-title">习惯特征</div>
        <div class="health-profile-habit-grid">${(content.habits||[]).map(x=>`<div class="health-profile-habit"><b>${escapeHTML(x.name)}</b>${escapeHTML(levelLabel[x.level]||x.level)}</div>`).join('')}</div>
      </div>
      <div class="health-profile-section">
        <div class="health-profile-section-title">未来30天</div>
        <div class="health-profile-list">
          <div class="health-profile-chip">${escapeHTML(content.long_term_goal)}</div>
          ${(content.next_month_focus||[]).map(x=>`<div class="health-profile-chip">${escapeHTML(x)}</div>`).join('')}
        </div>
      </div>
    </details>`;
  bindHealthProfileCard(profile,date);
}
function bindHealthProfileCard(profile,date=currentViewDate){
  const btn=document.getElementById('healthProfileRefreshBtn');
  if(!btn) return;
  btn.addEventListener('click',async()=>{
    btn.disabled=true;
    btn.textContent='生成中';
    await generateHealthProfile(profile,date,{manual:true}).catch(()=>showToast('AI健康画像暂时不可用，已生成本地画像','error'));
    showToast('AI健康画像已更新','success');
  });
}
function triggerHealthProfileAuto(profile,date=currentViewDate){
  if(!profile||activeAppPage!=='health'||isFutureDate(date)) return;
  const entry=getHealthProfileCacheItem(profile);
  if(entry?.content) return;
  generateHealthProfile(profile,date,{manual:false}).catch(()=>{});
}

const AI_HEALTH_COACH_MANUAL_COOLDOWN = 30*60*1000;
const aiHealthCoachInFlight = {};
function getHealthCoachCache(){
  return readMemoizedLocalJson(AI_HEALTH_COACH_CACHE_KEY);
}
function saveHealthCoachCache(cache){
  writeMemoizedLocalJson(AI_HEALTH_COACH_CACHE_KEY,cache||{});
}
function getHealthCoachProfileKey(profile){
  return getProfileDataId(profile)||profile?.id||'unknown';
}
function getHealthCoachDayCache(profile,date=currentViewDate){
  const cache=getHealthCoachCache();
  const pkey=getHealthCoachProfileKey(profile);
  return cache[pkey]?.[date]||{};
}
function setHealthCoachDayCache(profile,date,patch){
  const cache=getHealthCoachCache();
  const pkey=getHealthCoachProfileKey(profile);
  cache[pkey]=cache[pkey]||{};
  cache[pkey][date]={...(cache[pkey][date]||{}),...patch,updatedAt:Date.now()};
  saveHealthCoachCache(cache);
  return cache[pkey][date];
}
// Mark day cache stale after health data changes; keep existing slot advice as history.
function invalidateHealthCoachDayCache(profile,date=currentViewDate){
  if(!profile) return;
  setHealthCoachDayCache(profile,date,{needsRefresh:true});
}
// Invalidate the entire profile's health coach cache (all dates).
// Called when profile fundamentals change (height, gender, birthDate, activityLevel, weight, goal).
// Only affects the given profile; other profiles keep their cached advice.
function invalidateHealthCoachProfile(profile){
  if(!profile) return;
  const cache=getHealthCoachCache();
  const pkey=getHealthCoachProfileKey(profile);
  if(cache[pkey]){
    delete cache[pkey];
    saveHealthCoachCache(cache);
  }
}
function getHealthCoachSlotLabel(slot){
  return {morning:'今日计划',noon:'午间调整',evening:'晚间建议',manual:'手动分析'}[slot]||'AI建议';
}
function getLatestHealthCoachAdvice(dayCache){
  const items=[
    ['manual',dayCache.manualAdvice,dayCache.manualRefreshTime||0],
    ['evening',dayCache.eveningAdvice,dayCache.eveningAdvice?.generatedAt||0],
    ['noon',dayCache.noonAdvice,dayCache.noonAdvice?.generatedAt||0],
    ['morning',dayCache.morningAdvice,dayCache.morningAdvice?.generatedAt||0]
  ].filter(x=>x[1]);
  if(!items.length) return null;
  items.sort((a,b)=>(b[2]||0)-(a[2]||0));
  return {slot:items[0][0],advice:items[0][1]};
}
function getHealthCoachCurrentSlot(hour=new Date().getHours()){
  if(hour<11) return 'morning';
  if(hour<18) return 'noon';
  return 'evening';
}
function getHealthCoachDueSlots(profile,date=currentViewDate){
  if(date!==todayStr()) return [];
  const dayCache=getHealthCoachDayCache(profile,date);
  const slot=getHealthCoachCurrentSlot();
  if(dayCache[`${slot}Advice`]) return [];
  return [slot];
}
function getFoodSummaryForDate(profile,date,mealFilter=null,beforeHour=null){
  const daily=getDailyRecord(profile,date);
  const records=(daily.food||[]).filter(r=>{
    const mealOk=!mealFilter||r.meal===mealFilter;
    const time=normalizeDateTime(r.dateTime||`${date}T12:00`).slice(11,13);
    const hourOk=beforeHour===null||Number(time)<beforeHour;
    return mealOk&&hourOk;
  });
  let calories=0,protein=0,carbs=0,fat=0;
  records.forEach(r=>(r.foods||[]).forEach(f=>{
    const n=getFoodActualNutrition(f);
    calories+=n.calories;
    protein+=n.protein;
    carbs+=n.carbs;
    fat+=n.fat;
  }));
  return {count:records.length,calories:Math.round(calories),protein:Math.round(protein),carbs:Math.round(carbs),fat:Math.round(fat)};
}
function getWaterTotalForDateBefore(profile,date,beforeHour=null){
  return getDailyRecord(profile,date).water.filter(r=>{
    if(beforeHour===null) return true;
    return Number(normalizeDateTime(r.dateTime||`${date}T12:00`).slice(11,13))<beforeHour;
  }).reduce((sum,r)=>sum+(Number(r.amount)||0),0);
}
function getExerciseSummaryForDateBefore(profile,date,beforeHour=null){
  const records=getDailyRecord(profile,date).exercise.filter(r=>{
    if(beforeHour===null) return true;
    return Number(normalizeDateTime(r.dateTime||`${date}T12:00`).slice(11,13))<beforeHour;
  });
  return {
    count:records.length,
    calories:Math.round(records.reduce((sum,r)=>sum+(Number(r.calories)||0),0)),
    minutes:Math.round(records.reduce((sum,r)=>{
      const explicit=Number(r.duration);
      if(Number.isFinite(explicit)&&explicit>0) return sum+explicit;
      const match=String(r.detail||'').match(/(\d+(?:\.\d+)?)\s*分/);
      return sum+(match?Number(match[1]):0);
    },0))
  };
}
function buildHealthCoachInput(profile,date,slot){
  const todaySnap=getHealthScoreData(profile,date);
  const yesterday=addDays(date,-1);
  const yesterdaySnap=getHealthScoreData(profile,yesterday);
  const targets=calcNutrientTargets(profile);
  const calStatus=getDailyCalorieStatus(profile,date);
  return {
    slot,
    date,
    health_goal:getGoalAIContext(profile),
    profile:{
      profile_id:getProfileDataId(profile),
      display_name:getDisplayName(profile),
      gender:profile.gender||'',
      birthDate:profile.birthDate||'',
      height:profile.height||null,
      activityLevel:profile.activityLevel||'',
      goal:profile.goal||'',
      goalWeight:profile.goalWeight||null,
      latestWeight:todaySnap.latestWeight?.weight||null
    },
    targets:{
      calories:todaySnap.targetCals||null,
      base_calories:targets?.calories||null,
      water_ml:todaySnap.waterGoal,
      exercise_minutes:todaySnap.exerciseTarget,
      sleep_minutes:todaySnap.sleepTarget
    },
    yesterday:{
      sleep_minutes:yesterdaySnap.sleepMinutes,
      intake_calories:yesterdaySnap.intakeCalories,
      water_ml:yesterdaySnap.waterTotal,
      exercise_minutes:yesterdaySnap.exerciseMinutes
    },
    today:{
      health_score:todaySnap.healthScore?.score,
      health_status:todaySnap.healthScore?.status,
      data_coverage:todaySnap.healthScore?.dataCoverage,
      intake_calories:todaySnap.intakeCalories,
      diet_pct:todaySnap.targetCals>0?todaySnap.dietPct:null,
      water_ml:todaySnap.waterTotal,
      water_pct:todaySnap.waterPct,
      exercise_minutes:todaySnap.exerciseMinutes,
      exercise_calories:todaySnap.recordedExerciseCalories,
      exercise_calories_counted_in_budget:todaySnap.exerciseCalories,
      exercise_pct:todaySnap.exercisePct,
      sleep_minutes:todaySnap.sleepMinutes,
      sleep_pct:todaySnap.sleepPct,
      breakfast:getFoodSummaryForDate(profile,date,'breakfast',11),
      morning_water_ml:getWaterTotalForDateBefore(profile,date,11),
      morning_exercise:getExerciseSummaryForDateBefore(profile,date,11),
      all_day_food:getFoodSummaryForDate(profile,date),
      all_day_water_ml:getWaterTotalForDateBefore(profile,date),
      all_day_exercise:getExerciseSummaryForDateBefore(profile,date)
    },
    // Pre-calculated calorie metrics – AI must NOT recalculate these.
    calorie_status:{
      base_calorie_target:calStatus.baseCalorieTarget,
      recorded_exercise_calories:calStatus.recordedExerciseCalories,
      exercise_calories:calStatus.exerciseCalories,
      dynamic_calorie_target:calStatus.dynamicCalorieTarget,
      calories_consumed:calStatus.caloriesConsumed,
      net_calories:calStatus.netCalories,
      remaining_calories:calStatus.remainingCalories,
      calorie_balance:calStatus.calorieBalance,
      intake_kcal:calStatus.intakeKcal,
      intake_target_kcal:calStatus.intakeTargetKcal,
      intake_remaining_kcal:calStatus.intakeRemainingKcal,
      intake_over_target_kcal:calStatus.intakeOverTargetKcal,
      maintenance_kcal:calStatus.maintenanceKcal,
      energy_deficit_kcal:calStatus.energyDeficitKcal,
      energy_surplus_kcal:calStatus.energySurplusKcal,
      recommended_deficit_min:calStatus.recommendedDeficitMin,
      recommended_deficit_max:calStatus.recommendedDeficitMax,
      goal_type:calStatus.goalType
    }
  };
}
function normalizeHealthCoachAdvice(raw,snap,slot='morning',calStatus=null){
  const fallback=buildFallbackHealthCoachAdvice(snap,slot);
  const obj=raw&&typeof raw==='object'?raw:{};
  const actionPlan=Array.isArray(obj.action_plan)?obj.action_plan:fallback.action_plan;
  // summary: always overwrite with live deterministic calorie summary.
  // Prevents stale AI cache (e.g. energy_deficit written as 还可摄入) from drifting
  // after new food records are added.
  const detSummary=calStatus?buildDeterministicCalorieSummary(calStatus):null;
  return {
    // Health Engine: always use unified score, never let AI override
    health_score:snap.healthScore?.score,
    summary:String(detSummary||obj.summary||fallback.summary).slice(0,80),
    diet_advice:sanitizeHealthCoachAdviceText(String(obj.diet_advice||fallback.diet_advice),calStatus).slice(0,160),
    exercise_advice:String(obj.exercise_advice||fallback.exercise_advice).slice(0,160),
    water_advice:String(obj.water_advice||fallback.water_advice).slice(0,160),
    sleep_advice:String(obj.sleep_advice||fallback.sleep_advice).slice(0,160),
    action_plan:actionPlan.slice(0,4).map(item=>{
      if(typeof item==='string') return {task:item,done:false};
      return {task:String(item.task||item.title||'健康行动'),done:!!(item.done||item.completed),type:item.type||''};
    }),
    generatedAt:Date.now(),
    slot
  };
}
/* Replace AI-invented "还可摄入/还能吃" numbers with live intakeRemainingKcal.
   Also strips mistaken energy-deficit phrasing used as intake remaining. */
function sanitizeHealthCoachAdviceText(text,calStatus){
  const raw=String(text||'');
  if(!raw||!calStatus||!calStatus.hasTarget) return raw;
  const rem=Math.max(0,Math.round(Number(calStatus.intakeRemainingKcal)||0));
  const over=Math.max(0,Math.round(Number(calStatus.intakeOverTargetKcal)||0));
  const remText=over>0?`今日已超过目标 ${over} kcal`:`还可摄入约 ${rem} kcal`;
  return raw
    .replace(/(还可摄入|还能吃|还可以摄入|剩余可摄入|剩余热量|热量空间|还可按需要摄入)[约大概]*\s*\d+(\.\d+)?\s*kcal/g,()=>remText)
    .replace(/(超出|超过)(动态)?目标[约大概]*\s*\d+(\.\d+)?\s*kcal/g,(_,a,b)=>`${a}${b||''}目标 ${over} kcal`)
    .replace(/今日仍在目标范围内，还可摄入约\s*\d+(\.\d+)?\s*kcal/g,()=>over>0?`今日已超过目标 ${over} kcal`:`今日仍在目标范围内，还可摄入约 ${rem} kcal`);
}
function liveHealthCoachAdvice(advice,profile,date=currentViewDate){
  if(!advice||typeof advice!=='object') return advice;
  const snap=getHealthScoreData(profile,date);
  const cs=getDailyCalorieStatus(profile,date);
  const normalized=normalizeHealthCoachAdvice(advice,snap,advice.slot||'morning',cs);
  if(advice.fallback) normalized.fallback=true;
  return normalized;
}
function buildFallbackHealthCoachAdvice(snap,slot='morning'){
  const waterNeed=Math.max(0,(snap.waterGoal||0)-snap.waterTotal);
  const goalType=snap.healthGoal?.type||'maintain';
  const hasTdee=snap.targetCals>0;
  const action=[];
  if(waterNeed>0) action.push({task:`补充饮水 ${Math.min(500,waterNeed)} ml`,done:false,type:'water'});
  if(snap.exerciseMinutes<(snap.exerciseTarget||30)) action.push({task:goalType==='muscle_gain'?`力量或抗阻训练 ${Math.max(10,(snap.exerciseTarget||30)-snap.exerciseMinutes)} 分钟`:`散步或拉伸 ${Math.max(10,(snap.exerciseTarget||30)-snap.exerciseMinutes)} 分钟`,done:false,type:'exercise'});
  if(!snap.hasFood||(hasTdee&&snap.dietPct<60)) action.push({task:goalType==='fat_loss'||goalType==='muscle_gain'?'下一餐优先补足优质蛋白':'下一餐增加优质蛋白和蔬菜',done:false,type:'diet'});
  if(snap.sleepMinutes>0&&snap.sleepMinutes<(snap.sleepTarget||420)) action.push({task:'今晚尽量提前入睡30分钟',done:false,type:'sleep'});
  if(!action.length) action.push({task:'保持当前节奏，晚间复盘一次',done:false,type:'habit'});
  const dietAdvice=snap.hasFood
    ?(hasTdee
      ?`今日已摄入 ${snap.intakeCalories} kcal，蛋白质约 ${Math.round(snap.intake.protein||0)}g，对照目标 ${Math.round(snap.targets?.protein||0)}g 调整。`
      :`今日已摄入 ${snap.intakeCalories} kcal，蛋白质约 ${Math.round(snap.intake.protein||0)}g。如需精确热量和营养目标，请在 设置 → 个人资料 中补全资料。`)
    :'今天还没有饮食记录，建议先补充一餐并记录。';
  return {
    health_score:snap.healthScore?.score,
    summary:slot==='morning'?`今天围绕「${snap.healthGoal?.title||'健康目标'}」完成关键记录。`:`根据当前数据，优先补齐最影响「${snap.healthGoal?.title||'健康目标'}」的短板。`,
    diet_advice:dietAdvice,
    exercise_advice:snap.exerciseMinutes>=(snap.exerciseTarget||30)?'运动目标已完成，可以做轻量拉伸收尾。':(goalType==='muscle_gain'?'建议优先安排力量训练或抗阻动作。':'建议安排10-30分钟散步或拉伸，避免久坐。'),
    water_advice:waterNeed>0?`距离饮水目标还差约 ${waterNeed} ml，建议分次小口补充。`:'饮水目标完成得不错，继续保持。',
    sleep_advice:snap.sleepMinutes>=(snap.sleepTarget||420)?'睡眠时长达标，继续保持规律作息。':`今晚尽量接近 ${formatShortSleep(snap.sleepTarget||420)}，减少熬夜。`,
    action_plan:action.slice(0,4)
  };
}
function extractJSONFromAIText(text){
  const raw=String(text||'').trim();
  try{return JSON.parse(raw)}catch(e){}
  const match=raw.match(/\{[\s\S]*\}/);
  if(match){
    try{return JSON.parse(match[0])}catch(e){}
  }
  return null;
}
async function callHealthCoachAI(profile,date,slot){
  const snap=getHealthScoreData(profile,date);
  const calStatus=getDailyCalorieStatus(profile,date);
  const aiCfg=getAIConfig();
  if(!aiCfg.apiKey||!aiCfg.modelId) return normalizeHealthCoachAdvice(null,snap,slot,calStatus);
  const input=buildHealthCoachInput(profile,date,slot);
  const csInput=input.calorie_status;
  const calStatusText=[
    `基础热量目标：${csInput.base_calorie_target} kcal`,
    `运动记录消耗：${csInput.recorded_exercise_calories} kcal`,
    `计入动态预算的额外运动：${csInput.exercise_calories} kcal`,
    `动态热量目标：${csInput.dynamic_calorie_target} kcal`,
    `今日摄入：${csInput.calories_consumed} kcal`,
    `净摄入：${csInput.net_calories} kcal`,
    csInput.calorie_balance>0
      ? `超出动态目标：${csInput.intake_over_target_kcal||csInput.calorie_balance} kcal`
      : `今日还可摄入（intake_remaining_kcal）：${Math.max(0,csInput.intake_remaining_kcal)} kcal`,
    csInput.maintenance_kcal>0?`预计今日总消耗（维持热量，仅供能量缺口分析）：${csInput.maintenance_kcal} kcal`:'',
    csInput.maintenance_kcal>0
      ? (csInput.energy_deficit_kcal>0
        ? `预计实际热量缺口 energy_deficit_kcal：${csInput.energy_deficit_kcal} kcal（不是还可摄入）`
        : `预计热量盈余 energy_surplus_kcal：${csInput.energy_surplus_kcal} kcal（不是还可摄入）`)
      : '',
    csInput.recommended_deficit_min>0?`建议热量缺口范围：${csInput.recommended_deficit_min}～${csInput.recommended_deficit_max} kcal`:''
  ].filter(Boolean).join('\n');
  const prompt=`你是一个健康App中的AI健康教练。请根据用户健康数据和health_goal生成个性化建议，只返回严格JSON，不要Markdown，不要解释。JSON字段必须为：summary(string, 40字以内), diet_advice(string), exercise_advice(string), water_advice(string), sleep_advice(string), action_plan(array，最多4项，每项为{task:string,done:boolean,type:string})。

【重要规则】以下数值已由系统计算完成，你不得自行修改、重新计算或创造任何热量、缺口、超支、盈余等数值。
- 「今日还可摄入 / 还能吃多少」只能引用 intake_remaining_kcal（= 动态目标 − 今日摄入）。当前值：${Math.max(0,csInput.intake_remaining_kcal)}。
- energy_deficit_kcal 是相对维持热量的能量缺口，严禁写成「还可摄入」「还能吃」。
- summary 不要写具体 kcal 数字；系统会用统一口径覆盖 summary。饮食建议如需提热量，只能复述 intake_remaining_kcal / intake_over_target_kcal。
${calStatusText}

不要返回health_score字段，健康评分由系统统一计算。建议必须服从用户目标：减脂关注热量、蛋白和饭后活动；增肌关注蛋白和力量训练；睡眠目标关注入睡时间、时长和规律；体能目标关注运动频率和活动量。建议要温和、具体、可执行，不要医疗诊断。当前分析阶段：${slot}。输入数据：${JSON.stringify(input)}`;
  const response=await fetch(getApiUrl('/api/health-coach'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt})
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data?.error||data?.message||`AI请求失败：${response.status}`);
  const text=data?.text||'';
  return normalizeHealthCoachAdvice(extractJSONFromAIText(text),snap,slot,calStatus);
}
async function generateHealthCoachAdvice(profile,date,slot,{manual=false}={}){
  const pkey=getHealthCoachProfileKey(profile);
  const inflightKey=`${pkey}|${date}|${slot}`;
  if(aiHealthCoachInFlight[inflightKey]) return aiHealthCoachInFlight[inflightKey];
  aiHealthCoachInFlight[inflightKey]=(async()=>{
    const snap=getHealthScoreData(profile,date);
    let advice;
    try{
      advice=await callHealthCoachAI(profile,date,slot);
    }catch(err){
      console.warn('AI健康教练调用失败，使用本地兜底建议：',err);
      advice=normalizeHealthCoachAdvice(null,snap,slot,getDailyCalorieStatus(profile,date));
      advice.fallback=true;
    }
    const patch=manual
      ? {manualAdvice:advice,manualRefreshTime:Date.now(),needsRefresh:false}
      : {[`${slot}Advice`]:advice,lastAutoCallTime:Date.now(),needsRefresh:false};
    setHealthCoachDayCache(profile,date,patch);
    return advice;
  })().finally(()=>{
    delete aiHealthCoachInFlight[inflightKey];
    if(activeAppPage==='daily-advice'&&date===currentViewDate){
      renderDailyAdvicePage(profile,date);
    }
  });
  return aiHealthCoachInFlight[inflightKey];
}
function triggerHealthCoachV2Auto(profile,date=currentViewDate){
  if(!profile||date!==todayStr()) return;
  // 统一状态检查：数据不足时不触发AI分析
  const ds=getDashboardStatus(profile,date);
  if(ds.status!=='complete') return;
  const slots=getHealthCoachDueSlots(profile,date);
  if(!slots.length) return;
  const slot=slots[0];
  const pkey=getHealthCoachProfileKey(profile);
  if(aiHealthCoachInFlight[`${pkey}|${date}|${slot}`]) return;
  generateHealthCoachAdvice(profile,date,slot).catch(()=>{});
}
function getHealthCoachCooldownText(dayCache){
  const last=Number(dayCache.manualRefreshTime)||0;
  const remain=AI_HEALTH_COACH_MANUAL_COOLDOWN-(Date.now()-last);
  if(remain<=0) return '';
  return `${Math.ceil(remain/60000)}分钟后可刷新`;
}
const AI_DAILY_TASKS_MANUAL_COOLDOWN = 2*60*60*1000;
const AI_DAILY_TASKS_AUTO_REFRESH_COOLDOWN = 20*60*1000;
const DAILY_TASK_ACTION_MAP = {
  water:'open_water_record',
  food:'open_food_record',
  exercise:'open_exercise_record',
  sleep:'open_sleep_record',
  habit:'open_today_overview'
};
const aiDailyTasksInFlight = {};
function getDailyTasksCache(){
  return readMemoizedLocalJson(AI_DAILY_TASKS_CACHE_KEY);
}
function saveDailyTasksCache(cache){
  writeMemoizedLocalJson(AI_DAILY_TASKS_CACHE_KEY,cache||{});
}
function getDailyTasksProfileKey(profile){
  return getProfileDataId(profile)||profile?.id||'unknown';
}
function getDailyTasksDayCache(profile,date=currentViewDate){
  const cache=getDailyTasksCache();
  const pkey=getDailyTasksProfileKey(profile);
  return cache[pkey]?.[date]||{};
}
function setDailyTasksDayCache(profile,date,patch){
  const cache=getDailyTasksCache();
  const pkey=getDailyTasksProfileKey(profile);
  cache[pkey]=cache[pkey]||{};
  const next={...(cache[pkey][date]||{}),...patch,updatedAt:Date.now()};
  next.completed_count=(next.tasks||[]).filter(t=>t.completed).length;
  cache[pkey][date]=next;
  saveDailyTasksCache(cache);
  return next;
}
function getDailyTasksCooldownText(dayCache){
  const last=Number(dayCache.last_ai_call_time)||0;
  const remain=AI_DAILY_TASKS_MANUAL_COOLDOWN-(Date.now()-last);
  if(remain<=0) return '';
  const minutes=Math.ceil(remain/60000);
  return minutes>=60?`${Math.ceil(minutes/60)}小时后可重新分析`:`${minutes}分钟后可重新分析`;
}
function getDailyTasksSourceSignature(profile,date=currentViewDate){
  const snap=getHealthScoreData(profile,date);
  const trend=getSevenDayTrend(profile);
  return [
    date,
    getProfileDataId(profile),
    snap.healthScore?.score,
    snap.intakeCalories,
    Math.round(snap.intake.protein||0),
    Math.round(snap.intake.carbs||0),
    Math.round(snap.intake.fat||0),
    snap.exerciseMinutes,
    snap.recordedExerciseCalories,
    snap.exerciseCalories,
    snap.sleepMinutes,
    snap.waterTotal,
    snap.waterGoal,
    snap.daily.food.length,
    snap.daily.exercise.length,
    snap.daily.sleep.length,
    snap.daily.water.length,
    trend.weight.delta??'',
    trend.avgWaterPct,
    snap.healthGoal?.type||'',
    snap.healthGoal?.target_weight||'',
    snap.goalStrategy?.daily_calories||'',
    snap.goalStrategy?.protein_target||'',
    snap.goalStrategy?.exercise_days||'',
    snap.goalStrategy?.sleep_target||''
  ].join('|');
}
function getDailyTaskAction(task){
  return String(task?.action||DAILY_TASK_ACTION_MAP[task?.type]||DAILY_TASK_ACTION_MAP.habit);
}
function handleDailyTaskAction(action){
  const recordTypeMap={
    open_water_record:'water',water:'water',
    open_food_record:'food',food:'food',protein:'food',nutrition:'food',
    open_exercise_record:'exercise',exercise:'exercise',
    open_sleep_record:'sleep',sleep:'sleep',
    open_steps_record:'steps',steps:'steps'
  };
  const normalized=String(action||'');
  const recordType=recordTypeMap[normalized];
  if(recordType&&window.openRecordEntry) return window.openRecordEntry(recordType,{source:'daily-task'});
  if(normalized==='open_today_overview'||normalized==='habit') return switchAppPage('daily-tasks');
  showToast('暂时无法打开该记录入口','error');
  return false;
}
window.handleDailyTaskAction=handleDailyTaskAction;
function buildDailyTasksInput(profile,date){
  const snap=getHealthScoreData(profile,date);
  const trend=getSevenDayTrend(profile);
  const latestWeight=snap.latestWeight?.weight||null;
  const bmi=latestWeight&&profile.height?calcBMI(latestWeight,profile.height):null;
  const sleepQMap={good:'良好',normal:'一般',poor:'较差'};
  return {
    date,
    health_goal:getGoalAIContext(profile),
    profile:{
      profile_id:getProfileDataId(profile),
      gender:profile.gender||'',
      age:calcAge(profile.birthDate)||null,
      height:profile.height||null,
      weight:latestWeight,
      bmi:bmi?Number(bmi):null,
      goal:profile.goal||'',
      goalWeight:profile.goalWeight||null,
      activityLevel:profile.activityLevel||''
    },
    targets:{
      calories:snap.targetCals||null,
      protein_g:snap.targets?.protein||null,
      carbs_g:snap.targets?.carbs||null,
      fat_g:snap.targets?.fat||null,
      water_ml:snap.waterGoal,
      exercise_minutes:snap.exerciseTarget,
      sleep_minutes:snap.sleepTarget
    },
    today:{
      health_score:snap.healthScore?.score,
      intake_calories:snap.intakeCalories,
      protein_g:Math.round(snap.intake.protein||0),
      carbs_g:Math.round(snap.intake.carbs||0),
      fat_g:Math.round(snap.intake.fat||0),
      foods:(snap.daily.food||[]).flatMap(r=>(r.foods||[]).map(f=>f.name)).slice(0,12),
      exercise_records:(snap.daily.exercise||[]).map(e=>({name:e.name||'',detail:e.detail||'',calories:e.calories||0})).slice(0,8),
      exercise_minutes:snap.exerciseMinutes,
      exercise_calories:snap.recordedExerciseCalories,
      exercise_calories_counted_in_budget:snap.exerciseCalories,
      sleep_minutes:snap.sleepMinutes,
      sleep_quality:snap.daily.sleep.length?sleepQMap[snap.daily.sleep[snap.daily.sleep.length-1].quality||'normal']||'一般':'未记录',
      water_ml:snap.waterTotal,
      water_goal_ml:snap.waterGoal
    },
    trend_7d:{
      weight_delta:trend.weight.delta,
      avg_calories:trend.avgCalories,
      exercise_minutes:trend.exercise.minutes,
      avg_sleep_minutes:trend.avgSleep,
      avg_water_pct:trend.avgWaterPct
    },
    // Pre-calculated calorie metrics – AI must NOT recalculate these.
    calorie_status:(()=>{const cs=getDailyCalorieStatus(profile,date);return{
      base_calorie_target:cs.baseCalorieTarget,recorded_exercise_calories:cs.recordedExerciseCalories,
      exercise_calories:cs.exerciseCalories,dynamic_calorie_target:cs.dynamicCalorieTarget,
      calories_consumed:cs.caloriesConsumed,net_calories:cs.netCalories,
      remaining_calories:cs.remainingCalories,calorie_balance:cs.calorieBalance,
      intake_kcal:cs.intakeKcal,intake_target_kcal:cs.intakeTargetKcal,
      intake_remaining_kcal:cs.intakeRemainingKcal,intake_over_target_kcal:cs.intakeOverTargetKcal,
      maintenance_kcal:cs.maintenanceKcal,energy_deficit_kcal:cs.energyDeficitKcal,
      energy_surplus_kcal:cs.energySurplusKcal,
      recommended_deficit_min:cs.recommendedDeficitMin,recommended_deficit_max:cs.recommendedDeficitMax
    };})()
  };
}
function makeDailyTaskId(type,index,date=currentViewDate){
  return `${type||'habit'}_${date.replace(/-/g,'')}_${index+1}`;
}
function isActionableDailyTaskText(text){
  const s=String(text||'');
  if(/改善健康|保持习惯|注意健康|适当运动|合理饮食|多喝水$/.test(s)) return false;
  return /\d|ml|毫升|分钟|小时|点|:|g|克|蛋白|散步|拉伸|记录|睡觉|放下手机|喝水|补充/.test(s);
}
function getDailyTasksNeedContext(snap){
  const waterNeed=Math.max(0,(snap.waterGoal||0)-snap.waterTotal);
  const proteinTarget=Number(snap.targets?.protein)||60;
  const proteinNeed=Math.max(0,Math.round(proteinTarget-(snap.intake.protein||0)));
  const exerciseNeed=Math.max(0,(snap.exerciseTarget||30)-(snap.exerciseMinutes||0));
  const sleepNeed=snap.hasSleep?Math.max(0,(snap.sleepTarget||420)-(snap.sleepMinutes||0)):(snap.sleepTarget||420);
  const hasAnyData=!!(snap.hasFood||snap.hasExercise||snap.hasSleep||snap.hasWater);
  const hsScore=snap.healthScore?.score;
  const hasScore=hsScore!==null&&hsScore!==undefined;
  const statusGood=hasAnyData
    && hasScore
    && hsScore>=85
    && waterNeed<200
    && proteinNeed<12
    && exerciseNeed<=0
    && (!snap.hasSleep||sleepNeed<30);
  return {waterNeed,proteinNeed,exerciseNeed,sleepNeed,hasAnyData,statusGood};
}
function getDailyTasksMaxCount(snap){
  const ctx=getDailyTasksNeedContext(snap);
  if(!ctx.hasAnyData) return 2;
  if(ctx.statusGood) return 1;
  const hsScore=snap.healthScore?.score;
  if(hsScore!==null&&hsScore!==undefined&&hsScore>=78) return 3;
  return 5;
}
function getDailyTaskPriority(task,snap){
  const ctx=getDailyTasksNeedContext(snap);
  const type=task?.type||'habit';
  if(!ctx.hasAnyData) return type==='food'?'high':'low';
  if(type==='water'){
    if(!snap.hasWater||ctx.waterNeed>=500||(snap.waterPct||0)<70) return 'high';
    return ctx.waterNeed>=200?'medium':'low';
  }
  if(type==='food'){
    if(!snap.hasFood||ctx.proteinNeed>=20||(snap.targetCals>0&&(snap.dietPct||0)<65)) return 'high';
    return ctx.proteinNeed>=12||(snap.targetCals>0&&(snap.dietPct||0)<80)?'medium':'low';
  }
  if(type==='exercise'){
    if(!snap.hasExercise||ctx.exerciseNeed>=20) return 'high';
    return ctx.exerciseNeed>0?'medium':'low';
  }
  if(type==='sleep'){
    if(!snap.hasSleep||ctx.sleepNeed>=60) return 'high';
    return ctx.sleepNeed>=30?'medium':'low';
  }
  return 'low';
}
function getDailyTaskCurrentData(type,snap){
  const ctx=getDailyTasksNeedContext(snap);
  if(type==='water') return `饮水 ${snap.waterTotal||0}/${snap.waterGoal||0}ml，完成 ${snap.waterPct||0}%`;
  if(type==='food') return snap.hasFood?`蛋白质 ${Math.round(snap.intake.protein||0)}/${Math.round(Number(snap.targets?.protein)||60)}g，饮食完成 ${snap.targetCals>0?(snap.dietPct||0)+'%':'未设目标'}`:'今天还没有饮食记录';
  if(type==='exercise') return `运动 ${snap.exerciseMinutes||0}/${snap.exerciseTarget||30} 分钟`;
  if(type==='sleep') return snap.hasSleep?`睡眠 ${Math.round((snap.sleepMinutes||0)/60*10)/10} 小时`:'今天还没有睡眠记录';
  const hs=snap.healthScore;
  return hs?.score===null?`健康评分：数据不足（${hs?.reason||'记录不足'}）`:`综合健康状态 ${hs?.score??0} 分`;
}
function getDailyTaskSuggestion(task,snap){
  const ctx=getDailyTasksNeedContext(snap);
  const type=task?.type||'habit';
  if(type==='water') return ctx.waterNeed>0?'下午或晚上分2次补充，不要一次性大量饮水。':'饮水目标已完成，保持当前节奏即可。';
  if(type==='food') return ctx.proteinNeed>0?`围绕${snap.healthGoal?.title||'健康目标'}，下一餐增加鸡蛋、牛肉、鱼虾、豆制品等高蛋白食物。`:'饮食状态较好，继续记录即可。';
  if(type==='exercise') return ctx.exerciseNeed>0?(snap.healthGoal?.type==='muscle_gain'?'优先安排力量训练或抗阻动作，避免只做有氧。':'优先选择饭后步行、拉伸或低强度有氧，降低完成门槛。'):'运动目标已完成，今天不必额外加量。';
  if(type==='sleep') return ctx.sleepNeed>0?'今晚提前30分钟洗漱、放下手机并准备入睡。':'睡眠状态较好，保持固定入睡节奏。';
  return '睡前用1分钟复盘记录完整性，不需要额外增加负担。';
}
function getDailyTaskShortReason(task,snap){
  const type=task?.type||'habit';
  if(type==='water') return (snap.waterTotal||0)>=(snap.waterGoal||0)?'饮水目标已完成':'今日饮水仍有缺口';
  if(type==='food') return snap.hasFood?'今日蛋白质或饮食结构待优化':'今天还没有饮食记录';
  if(type==='exercise') return (snap.exerciseMinutes||0)>=30?'运动目标已完成':'今日运动时间不足';
  if(type==='sleep') return snap.hasSleep?'睡眠时长可继续优化':'今天还没有睡眠记录';
  return '健康状态较好，保持记录习惯';
}
function enrichDailyTask(task,snap){
  const type=task?.type||'habit';
  const action=getDailyTaskAction({type,action:task?.action});
  const priority=getDailyTaskPriority(task,snap);
  const currentData=String(task?.current_data||task?.currentData||getDailyTaskCurrentData(type,snap)).slice(0,80);
  const suggestion=String(task?.suggestion||getDailyTaskSuggestion(task,snap)).slice(0,90);
  const shortReason=String(task?.short_reason||task?.shortReason||getDailyTaskShortReason(task,snap)).slice(0,32);
  return {...task,type,action,priority,current_data:currentData,suggestion,short_reason:shortReason};
}
function sortDailyTasksByPriority(tasks){
  const rank={high:0,medium:1,low:2};
  return (tasks||[]).slice().sort((a,b)=>(rank[a.priority]??9)-(rank[b.priority]??9));
}
function isDailyTaskStillNeeded(task,snap){
  const ctx=getDailyTasksNeedContext(snap);
  const type=task?.type||'habit';
  if(type==='water') return ctx.waterNeed>=200||!snap.hasWater;
  if(type==='food') return !snap.hasFood||ctx.proteinNeed>=12||(snap.targetCals>0&&(snap.dietPct||0)<70);
  if(type==='exercise') return ctx.exerciseNeed>0||!snap.hasExercise;
  if(type==='sleep') return !snap.hasSleep||ctx.sleepNeed>=30;
  return true;
}
function refineDailyTasksByContext(tasks,snap){
  const maxCount=getDailyTasksMaxCount(snap);
  const seen=new Set();
  return sortDailyTasksByPriority((tasks||[])
    .filter(task=>isDailyTaskStillNeeded(task,snap))
    .filter(task=>{
      const key=`${task.type}|${task.title}|${task.description}`;
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    }))
    .slice(0,maxCount);
}
function normalizeDailyTasksPlan(raw,profile,date,snap){
  const fallback=buildFallbackDailyTasksPlan(profile,snap);
  const obj=raw&&typeof raw==='object'?raw:{};
  const validTypes=['water','food','exercise','sleep','habit'];
  let tasks=Array.isArray(obj.tasks)?obj.tasks:fallback.tasks;
  tasks=tasks.map((item,index)=>{
    const fallbackTask=fallback.tasks[index]||fallback.tasks[fallback.tasks.length-1]||{};
    const type=validTypes.includes(item?.type)?item.type:'habit';
    const title=String(item?.title||fallback.tasks[index]?.title||'健康任务').trim().slice(0,24);
    const description=String(item?.description||fallback.tasks[index]?.description||'完成一个具体健康动作').trim().slice(0,52);
    const reason=String(item?.reason||fallback.tasks[index]?.reason||'根据今天健康数据推荐').trim().slice(0,60);
    if(!isActionableDailyTaskText(`${title} ${description}`)){
      return {...fallbackTask,id:makeDailyTaskId(fallbackTask.type,index,date),completed:false};
    }
    return enrichDailyTask({
      id:String(item?.id||makeDailyTaskId(type,index,date)).replace(/[^a-zA-Z0-9_-]/g,'_'),
      type,title,description,reason,
      short_reason:item?.short_reason||item?.shortReason||'',
      current_data:item?.current_data||item?.currentData||'',
      suggestion:item?.suggestion||'',
      action:item?.action||'',
      completed:!!item?.completed
    },snap);
  }).filter(t=>t.title&&t.description);
  tasks=tasks.map(task=>enrichDailyTask(task,snap));
  tasks=refineDailyTasksByContext(tasks,snap);
  if(!tasks.length) tasks=fallback.tasks;
  tasks=tasks.map(task=>enrichDailyTask(task,snap));
  tasks=refineDailyTasksByContext(tasks,snap);
  if(!tasks.length) tasks=fallback.tasks.slice(0,1).map(task=>enrichDailyTask(task,snap));
  return {
    date,
    profile_id:getProfileDataId(profile),
    summary:String(obj.summary||fallback.summary||'今天优先完成最关键的小任务。').slice(0,60),
    tasks,
    completed_count:tasks.filter(t=>t.completed).length,
    generated_time:Date.now(),
    last_ai_call_time:Date.now(),
    source_signature:getDailyTasksSourceSignature(profile,date),
    source:'ai'
  };
}
function dailyTaskStateKey(task){
  return `${task?.type||''}|${String(task?.title||'').trim()}|${String(task?.description||'').trim()}`;
}
function preserveCompletedDailyTasks(nextPlan,previousCache,snap){
  const doneKeys=new Set((previousCache?.tasks||[]).filter(t=>t.completed).map(dailyTaskStateKey));
  const doneIds=new Set((previousCache?.tasks||[]).filter(t=>t.completed).map(t=>t.id));
  const marked=(nextPlan.tasks||[]).map(task=>({
    ...enrichDailyTask(task,snap),
    completed:!!task.completed||doneIds.has(task.id)||doneKeys.has(dailyTaskStateKey(task))
  }));
  const nextKeys=new Set(marked.map(dailyTaskStateKey));
  const nextIds=new Set(marked.map(t=>t.id));
  const carried=(previousCache?.tasks||[])
    .filter(t=>t.completed&&!nextIds.has(t.id)&&!nextKeys.has(dailyTaskStateKey(t)))
    .map(t=>({...enrichDailyTask(t,snap),completed:true}));
  const room=Math.max(0,5-carried.length);
  nextPlan.tasks=[...carried.slice(0,5),...marked.filter(t=>!carried.find(old=>old.id===t.id||dailyTaskStateKey(old)===dailyTaskStateKey(t))).slice(0,room)];
  nextPlan.completed_count=nextPlan.tasks.filter(t=>t.completed).length;
  return nextPlan;
}
function buildFallbackDailyTasksPlan(profile,snap){
  const tasks=[];
  const ctx=getDailyTasksNeedContext(snap);
  const goalType=snap.healthGoal?.type||'maintain';
  if(!ctx.hasAnyData){
    tasks.push({id:makeDailyTaskId('food',tasks.length),type:'food',title:'先记录一项健康数据',description:'记录一餐饮食或一次饮水',reason:'今天还没有任何健康记录，先建立真实数据基础',priority:'high',completed:false});
    if(goalType==='sleep_improve') tasks.push({id:makeDailyTaskId('sleep',tasks.length),type:'sleep',title:'设定睡前时间',description:'今晚提前30分钟放下手机',reason:'当前目标是改善睡眠，先建立睡前节律',priority:'medium',completed:false});
    else tasks.push({id:makeDailyTaskId('exercise',tasks.length),type:'exercise',title:goalType==='muscle_gain'?'完成力量启动':'完成轻量启动',description:goalType==='muscle_gain'?'完成 10 分钟自重抗阻训练':'散步或拉伸 10 分钟',reason:'无记录时只给少量具体行动，不做过度推荐',priority:'low',completed:false});
    return {summary:`今天还没有记录，先围绕「${snap.healthGoal?.title||'健康目标'}」从少量可执行动作开始。`,tasks};
  }
  const waterNeed=Math.max(0,(snap.waterGoal||0)-snap.waterTotal);
  const proteinTarget=Number(snap.targets?.protein)||60;
  const proteinNeed=Math.max(0,Math.round(proteinTarget-(snap.intake.protein||0)));
  if(waterNeed>=250){
    const amount=Math.min(600,Math.ceil(waterNeed/100)*100);
    tasks.push({id:makeDailyTaskId('water',tasks.length),type:'water',title:'补充饮水',description:`今天再补充 ${amount}ml 水`,reason:`当前饮水还差约 ${waterNeed}ml`,priority:'high',completed:false});
  }
  if(proteinNeed>=15&&(goalType==='fat_loss'||goalType==='muscle_gain'||goalType==='maintain')){
    tasks.push({id:makeDailyTaskId('food',tasks.length),type:'food',title:'增加蛋白质',description:`下一餐增加约 ${Math.min(30,proteinNeed)}g 蛋白质`,reason:`今日蛋白质距离目标还差约 ${proteinNeed}g`,priority:'high',completed:false});
  }else if(!snap.hasFood){
    tasks.push({id:makeDailyTaskId('food',tasks.length),type:'food',title:'记录一餐饮食',description:'下一餐拍照或搜索记录食物',reason:'今天还没有饮食记录',priority:'medium',completed:false});
  }
  if(snap.exerciseMinutes<(snap.exerciseTarget||30)){
    const target=snap.exerciseTarget||30;
    const mins=Math.max(10,Math.min(30,target-snap.exerciseMinutes));
    const isStrength=goalType==='muscle_gain';
    tasks.push({id:makeDailyTaskId('exercise',tasks.length),type:'exercise',title:isStrength?'安排力量训练':(goalType==='fitness'?'补足体能活动':'补足轻运动'),description:isStrength?`完成 ${mins} 分钟力量或抗阻训练`:`饭后散步或拉伸 ${mins} 分钟`,reason:`今日运动距离目标还差约 ${target-snap.exerciseMinutes} 分钟`,priority:snap.exerciseMinutes?'medium':'high',completed:false});
  }
  if((snap.hasSleep&&snap.sleepMinutes<(snap.sleepTarget||420))||!snap.hasSleep){
    tasks.push({id:makeDailyTaskId('sleep',tasks.length),type:'sleep',title:'提前准备睡眠',description:'23:30前放下手机并准备睡觉',reason:snap.hasSleep?`昨晚睡眠少于目标 ${formatShortSleep(snap.sleepTarget||420)}`:'今天还未记录睡眠',priority:goalType==='sleep_improve'?'high':'medium',completed:false});
  }
  if(!tasks.length){
    tasks.push({id:makeDailyTaskId('habit',0),type:'habit',title:'晚间复盘记录',description:'睡前用1分钟检查饮水、运动和饮食记录',reason:'今天主要指标完成较好，减少额外任务',priority:'low',completed:false});
  }
  return {
    summary:tasks.length<=2?`围绕「${snap.healthGoal?.title||'健康目标'}」，今天只保留关键小任务。`:`今天优先补齐最影响「${snap.healthGoal?.title||'健康目标'}」的项目。`,
    tasks:tasks.slice(0,getDailyTasksMaxCount(snap))
  };
}
async function callDailyTasksAI(profile,date){
  const snap=getHealthScoreData(profile,date);
  const aiCfg=getAIConfig();
  if(!aiCfg.apiKey||!aiCfg.modelId) return normalizeDailyTasksPlan(null,profile,date,snap);
  const input=buildDailyTasksInput(profile,date);
  const csInput=input.calorie_status;
  const calStatusText=[
    `基础热量目标：${csInput.base_calorie_target} kcal`,
    `运动记录消耗：${csInput.recorded_exercise_calories} kcal`,
    `计入动态预算的额外运动：${csInput.exercise_calories} kcal`,
    `动态热量目标：${csInput.dynamic_calorie_target} kcal`,
    `今日摄入：${csInput.calories_consumed} kcal`,
    `净摄入：${csInput.net_calories} kcal`,
    csInput.calorie_balance>0
      ? `超出动态目标：${csInput.intake_over_target_kcal||csInput.calorie_balance} kcal`
      : `今日还可摄入（intake_remaining_kcal）：${Math.max(0,csInput.intake_remaining_kcal)} kcal`,
    csInput.maintenance_kcal>0?`预计今日总消耗（维持热量，仅供能量缺口分析）：${csInput.maintenance_kcal} kcal`:'',
    csInput.maintenance_kcal>0
      ? (csInput.energy_deficit_kcal>0
        ? `预计实际热量缺口 energy_deficit_kcal：${csInput.energy_deficit_kcal} kcal（不是还可摄入）`
        : `预计热量盈余 energy_surplus_kcal：${csInput.energy_surplus_kcal} kcal（不是还可摄入）`)
      : '',
    csInput.recommended_deficit_min>0?`建议热量缺口范围：${csInput.recommended_deficit_min}～${csInput.recommended_deficit_max} kcal`:''
  ].filter(Boolean).join('\n');
  const prompt=`你是健康App里的AI每日健康行动计划生成器。请严格基于输入数据和health_goal生成用户今天能完成的1-5个具体任务。规则：1. 任务必须服从用户当前目标，减脂不要生成增肌增重任务，增肌不要只给有氧消耗任务，睡眠目标要优先分析入睡时间、睡眠时长和规律。2. 已达标的项目不要继续推荐同类任务，例如饮水已达到或超过目标就不要推荐继续喝水；可在summary里说明“饮水目标已完成，保持当前状态”。3. 无健康记录或数据很少时，只给1-2个具体启动任务，不要输出“保持健康、改善生活方式、注意饮食、适当运动”这类空泛建议。4. 健康状态良好时最多给1-2个低负担任务，不要制造任务压力。5. high表示当前最需要改善的问题，medium表示建议优化，low表示保持习惯。6. 每个任务必须包含具体动作和数量/时长/时间，例如喝多少ml水、晚饭后步行多少分钟、增加多少g蛋白质、几点准备睡眠。7. type只能是water、food、exercise、sleep、habit；action按type填写：water=open_water_record，food=open_food_record，exercise=open_exercise_record，sleep=open_sleep_record，habit=open_today_overview。8. 不要医疗诊断。

【重要规则】以下数值已由系统计算完成，你不得自行修改、重新计算或创造任何热量、缺口、超支、盈余等数值。summary和task描述中如需提及「还可摄入/还能吃」，只能引用 intake_remaining_kcal=${Math.max(0,csInput.intake_remaining_kcal)}，严禁把 energy_deficit_kcal 写成还可摄入：
${calStatusText}

只返回严格JSON，不要Markdown，不要解释。JSON格式：{"summary":"","tasks":[{"id":"","type":"water|food|exercise|sleep|habit","title":"","description":"","short_reason":"","reason":"","current_data":"","suggestion":"","priority":"high|medium|low","action":"","completed":false}]}。输入数据：${JSON.stringify(input)}`;
  const response=await fetch(getApiUrl('/api/daily-tasks'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt})
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data?.error||data?.message||`AI请求失败：${response.status}`);
  const text=data?.text||'';
  return normalizeDailyTasksPlan(extractJSONFromAIText(text),profile,date,snap);
}
async function generateDailyTasksPlan(profile,date=currentViewDate,{manual=false}={}){
  const pkey=getDailyTasksProfileKey(profile);
  const inflightKey=`${pkey}|${date}`;
  const dayCache=getDailyTasksDayCache(profile,date);
  const currentSignature=getDailyTasksSourceSignature(profile,date);
  const stale=dayCache.source_signature&&dayCache.source_signature!==currentSignature;
  if(manual){
    const cooldown=getDailyTasksCooldownText(dayCache);
    if(cooldown){showToast(`请稍后再重新分析，${cooldown}`,'error');return dayCache}
  }else if(dayCache.tasks?.length&&!stale){
    return dayCache;
  }
  if(aiDailyTasksInFlight[inflightKey]) return aiDailyTasksInFlight[inflightKey];
  aiDailyTasksInFlight[inflightKey]=(async()=>{
    let plan;
    try{
      plan=await callDailyTasksAI(profile,date);
    }catch(err){
      console.warn('AI每日计划调用失败，使用本地兜底任务：',err);
      plan=normalizeDailyTasksPlan(null,profile,date,getHealthScoreData(profile,date));
      plan.source='fallback';
      plan.fallback=true;
    }
    plan=preserveCompletedDailyTasks(plan,dayCache,getHealthScoreData(profile,date));
    setDailyTasksDayCache(profile,date,plan);
    return plan;
  })().finally(()=>{
    delete aiDailyTasksInFlight[inflightKey];
  });
  return aiDailyTasksInFlight[inflightKey];
}
function triggerDailyTasksAuto(profile,date=currentViewDate){
  if(!profile||date!==todayStr()) return;
  // 统一状态检查：数据不足时不触发AI计划生成
  const ds=getDashboardStatus(profile,date);
  if(ds.status!=='complete') return;
  const dayCache=getDailyTasksDayCache(profile,date);
  const currentSignature=getDailyTasksSourceSignature(profile,date);
  if(dayCache.tasks?.length){
    const stale=dayCache.source_signature&&dayCache.source_signature!==currentSignature;
    const last=Number(dayCache.last_ai_call_time)||0;
    if(!stale||Date.now()-last<AI_DAILY_TASKS_AUTO_REFRESH_COOLDOWN) return;
  }
  generateDailyTasksPlan(profile,date,{manual:false}).catch(()=>{});
}

async function parseHealthText(text){
  const response=await fetch(getApiUrl('/api/health-parse'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({text,baseDate:currentViewDate,currentDateTime:toLocalDateTimeValue()})
  });
  const data=await response.json().catch(()=>({events:[]}));
  if(!response.ok) throw new Error(data?.error||'AI解析暂时不可用');
  return Array.isArray(data.events)?data.events:[];
}

// ==================== AI ANALYSIS ====================
function parseAIJsonArray(text){
  const raw=String(text||'').trim();
  const match=raw.match(/\[[\s\S]*\]/);
  if(!match) return [];
  try{return JSON.parse(match[0])}catch(e){return []}
}
function findNutritionReference(name){
  // Only reuse a database entry when the normalized full name resolves to it.
  // Compound drinks must never inherit the unit of a contained fruit name.
  const normalized=normalizeFoodName(name);
  return getFoodDB().find(f=>normalizeFoodName(f.name)===normalized)||null;
}
function normalizePhotoFoodItem(item,phase='quick'){
  const name=String(item?.food||item?.name||'未知食物').trim()||'未知食物';
  const ref=findNutritionReference(name);
  const cat=item?.cat||item?.category||ref?.category||ref?.cat||'其他';
  const estimatedWeight=Number(item?.referenceAmount??item?.estimatedWeight??item?.weight??item?.estimated_weight);
  const weightStep=estimatedWeight<100?5:10;
  const refGrams=Number.isFinite(estimatedWeight)&&estimatedWeight>0?Math.max(weightStep,Math.round(estimatedWeight/weightStep)*weightStep):(ref?getFoodBaseAmount(ref):100);
  const per100={
    cal:Number(item?.calories_per_100g??item?.calPer100g??item?.caloriesPer100g),
    pro:Number(item?.protein_per_100g??item?.proteinPer100g),
    fat:Number(item?.fat_per_100g??item?.fatPer100g),
    carb:Number(item?.carbs_per_100g??item?.carbsPer100g),
    fib:Number(item?.fiber_per_100g??item?.fiberPer100g)
  };
  const hasPer100=Number.isFinite(per100.cal)&&per100.cal>0;
  const base=hasPer100?{
    cal:per100.cal,pro:Number.isFinite(per100.pro)?per100.pro:0,fat:Number.isFinite(per100.fat)?per100.fat:0,
    carb:Number.isFinite(per100.carb)?per100.carb:0,fib:Number.isFinite(per100.fib)?per100.fib:0
  }:(ref?{cal:ref.cal,pro:ref.pro,fat:ref.fat,carb:ref.carb,fib:ref.fib}: {cal:0,pro:0,fat:0,carb:0,fib:0});
  const baseAmount=hasPer100?100:(ref?getFoodBaseAmount(ref):100);
  const measure=validateAIFoodReferenceMeasure(name,getCanonicalFoodMeasureSuggestion(name,cat,{
    ...(ref||{}),
    ...item,
    unit:item?.unit||ref?.unit,
    amount:item?.amount??ref?.amount,
    referenceAmount:item?.referenceAmount??item?.estimatedMl??item?.volume_ml??item?.volumeMl??item?.portionAmount??item?.portion_ml??estimatedWeight??ref?.referenceAmount,
    referenceUnit:item?.referenceUnit||item?.portionUnit||ref?.referenceUnit
  }));
  const draft=prepareFoodPortion({
    ...(ref||{}),
    name,
    category:measure.category,
    cat:measure.category,
    unit:measure.unit,
    amount:measure.amount,
    defaultUnit:measure.unit,
    defaultAmount:measure.amount,
    referenceAmount:measure.referenceAmount,
    referenceUnit:measure.referenceUnit,
    unitWeight:measure.referenceAmount&&measure.amount?measure.referenceAmount/measure.amount:null,
    unitWeightUnit:measure.referenceUnit,
    referenceMode:'auto',
    measureModelVersion:2,
    source:'ai_photo',
    base_amount:baseAmount,
    base_weight:baseAmount,
    cal:base.cal,
    pro:base.pro,
    fat:base.fat,
    carb:base.carb,
    fib:base.fib,
    estimatedWeight:measure.referenceUnit==='g'?measure.referenceAmount:null,
    aiReferenceAdjusted:measure.aiReferenceAdjusted,
    confidence:['low','medium','high'].includes(String(item?.confidence||'').toLowerCase())?String(item.confidence).toLowerCase():'medium',
    estimateReason:item?.reason||item?.estimateReason||'图片估算重量可能存在误差，请按实际份量修正',
    aiAdvice:item?.advice||item?.aiAdvice||item?.suggestion||'图片估算重量可能存在误差，请按实际份量修正',
    aiStage:phase,
    recordAmount:{value:measure.amount,unit:measure.unit},
    referenceWeight:{value:measure.referenceAmount,unit:measure.referenceUnit}
  });
  return draft;
}
async function callFoodVisionAI(photoURL,promptText,aiCfg,stage){
  const aiStart=performance.now();
  const uploadBytes=getDataURLBytes(photoURL);
  logFoodAI('upload',{stage,uploadBytes,uploadSize:formatBytes(uploadBytes)});
  const response=await fetch(getApiUrl('/api/food-photo'),{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      prompt:promptText,
      image:photoURL
    })
  });
  const data=await response.json().catch(()=>({}));
  const clientMs=Math.round(performance.now()-aiStart);
  const serverMs=Number(data?.meta?.ms);
  const modelMs=Number.isFinite(serverMs)?serverMs:clientMs;
  const uploadMs=Number.isFinite(serverMs)?Math.max(0,clientMs-serverMs):null;
  logFoodAI('AI',{stage,ms:clientMs,modelMs,uploadMs,ok:response.ok,provider:data?.meta?.provider||'',fallback:!!data?.meta?.fallback});
  if(!response.ok){
    const msg=data?.error||data?.message||`请求失败：HTTP ${response.status}`;
    throw new Error(msg);
  }
  return {
    text:data?.text||'',
    meta:{
      provider:data?.meta?.provider||'',
      fallback:!!data?.meta?.fallback,
      modelMs,
      uploadMs,
      clientMs
    }
  };
}
async function startAIAnalysis(photoURL,targetProfileId=aiAnalysisTargetProfileId||getHealthWriteProfile()?.id||''){
  aiAnalysisTargetProfileId=targetProfileId;
  foodDraft=[];
  foodDraftSession=null;

  if(typeof openFoodSubPage!=='function'){
    console.error('[AI] openFoodSubPage missing');
    return;
  }
  openFoodSubPage(typeof FOOD_SUBPAGE_IDS!=='undefined'?FOOD_SUBPAGE_IDS.AI_FLOW:'food_ai_flow','食物识别',{
    render(shell){
      shell.innerHTML='<div class="ai-scanning"><div class="ai-scan-ring"></div><div class="ai-scan-text">准备识别…</div></div>';
    }
  });
  let content=typeof getFoodFlowContent==='function'?getFoodFlowContent():null;

  const aiCfg=getAIConfig();
  const totalStart=performance.now();
  const speedCtx=window.__foodAISpeedCtx||{};
  window.__foodAISpeedCtx=null;

  // Check if real API is configured
  if(aiCfg.apiKey&&aiCfg.modelId){
    content.innerHTML=`
      <div class="ai-scanning">
        <img src="${photoURL}" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-bottom:8px">
        <div class="ai-scan-ring"></div>
        <div class="ai-scan-text">正在识别食物并估算营养...</div>
      </div>`;

    try{
      // Compact prompt: structured fields only — reason/advice filled by frontend template.
      const promptText='识别图中食物，只返回严格JSON数组，无Markdown/解释。每项必须返回：food,category(主食/菜肴/肉类/水果/饮品/甜品/其他),unit(杯/瓶/碗/个/颗/根/块/片/份),amount(初始数量，离散单位为整数),referenceAmount(参考重量或容量数字),referenceUnit(g或ml),confidence(low|medium|high),calories_per_100g,protein_per_100g,fat_per_100g,carbs_per_100g,fiber_per_100g。饮品必须使用杯/瓶且referenceUnit=ml，禁止饮品使用块或默认g；甜品优先块；水果优先个/颗/根。';
      const apiStart=performance.now();
      const vision=await callFoodVisionAI(photoURL,promptText,aiCfg,'complete');
      const text=typeof vision==='string'?vision:vision.text;
      const meta=(vision&&vision.meta)||{};
      const parseStart=performance.now();
      const foods=parseAIJsonArray(text);
      const parseMs=Math.round(performance.now()-parseStart);
      logFoodAI('parse',{stage:'complete',ms:parseMs,count:foods.length});
      if(!foods.length) throw new Error('无法解析AI返回结果');
      foodDraft=foods.map(f=>normalizePhotoFoodItem(f,'complete'));
      const renderStart=performance.now();
      renderAIResults(photoURL,targetProfileId,{detailReady:true});
      const renderMs=Math.round(performance.now()-renderStart);
      const totalMs=Math.round(performance.now()-totalStart)+(Number(speedCtx.compressMs)||0);
      logFoodAI('total',{ms:Math.round(performance.now()-totalStart)});
      if(typeof logFoodAISpeed==='function') logFoodAISpeed({
        compress:speedCtx.compressMs??null,
        upload:meta.uploadMs??null,
        model:meta.modelMs??Math.round(performance.now()-apiStart),
        parse:parseMs,
        render:renderMs,
        total:totalMs,
        originalSize:speedCtx.originalSize||'',
        compressedSize:speedCtx.compressedSize||formatBytes(getDataURLBytes(photoURL)),
        provider:meta.provider||'',
        fallback:!!meta.fallback
      });
      return;
    }catch(err){
      console.error('Bailian API error:',err);
      logFoodAI('total',{ms:Math.round(performance.now()-totalStart),failed:true});
      if(typeof logFoodAISpeed==='function') logFoodAISpeed({
        compress:speedCtx.compressMs??null,
        upload:null,
        model:null,
        parse:null,
        render:null,
        total:Math.round(performance.now()-totalStart)+(Number(speedCtx.compressMs)||0),
        originalSize:speedCtx.originalSize||'',
        compressedSize:speedCtx.compressedSize||''
      });
      content.innerHTML=`
        <div style="text-align:center;padding:20px">
          <div style="font-size:14px;color:var(--red);margin-bottom:8px">AI识别失败</div>
          <div style="font-size:12px;color:var(--txt3);margin-bottom:12px">${err.message||'网络错误或API配置问题'}</div>
          <div style="font-size:11px;color:var(--txt3);margin-bottom:12px">可能原因：<br>1. 网络连接异常<br>2. 未开通通义千问VL模型权限<br>3. 浏览器跨域限制(CORS)<br>4. 图片过大或格式不支持<br><br>建议：请检查网络连接，或稍后重试。</div>
          <button class="btn btn-gold btn-sm" id="aiFallbackBtn">使用演示模式</button>
        </div>`;
      document.getElementById('aiFallbackBtn').addEventListener('click',()=>{
        runDemoAIAnalysis(photoURL,targetProfileId);
      });
      return;
    }
  }

  // Demo mode (no API key configured)
  content.innerHTML=`
    <div class="ai-scanning">
      <img src="${photoURL}" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-bottom:8px">
      <div class="ai-scan-ring"></div>
      <div class="ai-scan-text">AI 正在识别食物（演示模式）...</div>
    </div>`;
  runDemoAIAnalysis(photoURL,targetProfileId,totalStart);
}

function runDemoAIAnalysis(photoURL,targetProfileId=aiAnalysisTargetProfileId,totalStart=performance.now()){
  // Simulate analysis (pick 1-3 random foods)
  setTimeout(()=>{
    const mealFoods=getFoodDB().filter(f=>['主食','菜肴','肉类','蛋奶'].includes(f.cat));
    const vegFoods=getFoodDB().filter(f=>f.cat==='蔬菜');
    const picked=[];
    // Pick a main
    picked.push(mealFoods[Math.floor(Math.random()*mealFoods.length)]);
    // Maybe pick a veg
    if(Math.random()>0.3) picked.push(vegFoods[Math.floor(Math.random()*vegFoods.length)]);
    // Maybe pick a drink/snack
    if(Math.random()>0.5){
      const extras=getFoodDB().filter(f=>['饮品','水果'].includes(f.cat));
      picked.push(extras[Math.floor(Math.random()*extras.length)]);
    }
    foodDraft=picked.map(f=>normalizePhotoFoodItem({
      food:f.name,
      category:f.cat,
      estimatedWeight:getFoodBaseAmount(f),
      confidence:'medium',
      calories_per_100g:f.cal*100/getFoodBaseAmount(f),
      protein_per_100g:f.pro*100/getFoodBaseAmount(f),
      fat_per_100g:f.fat*100/getFoodBaseAmount(f),
      carbs_per_100g:f.carb*100/getFoodBaseAmount(f),
      fiber_per_100g:f.fib*100/getFoodBaseAmount(f),
      reason:'演示模式按常见份量估算',
      advice:'请根据实际餐盘份量微调重量后再添加'
    },'detail'));
    logFoodAI('AI',{stage:'demo',ms:700,ok:true});
    logFoodAI('parse',{stage:'demo',ms:1,count:foodDraft.length});
    logFoodAI('total',{ms:Math.round(performance.now()-totalStart)});
    renderAIResults(photoURL,targetProfileId,{detailReady:true});
  },700);
}

function renderAIResults(photoURL,targetProfileId=aiAnalysisTargetProfileId,{detailReady=true}={}){
  aiAnalysisTargetProfileId=targetProfileId;
  foodDraft=foodDraft.map(prepareFoodPortion);
  const prevEdit=foodDraftSession?.editingIndex??null;
  foodDraftSession={mode:'ai',phase:'review',editingIndex:prevEdit,pendingFood:null,photoURL,targetProfileId,detailReady};
  if(!document.getElementById('aiFoodDraftHost')||!document.querySelector('.meal-seg')){
    mealSelectionTouched=false;
    currentMeal=getMealTypeByDateTime(toLocalDateTimeValue());
  }
  let content=typeof getFoodFlowContent==='function'?getFoodFlowContent():null;
  if(!content){
    if(typeof openFoodSubPage==='function'){
      openFoodSubPage(typeof FOOD_SUBPAGE_IDS!=='undefined'?FOOD_SUBPAGE_IDS.AI_FLOW:'food_ai_flow','食物识别',{
        render(shell){content=shell;}
      });
      content=typeof getFoodFlowContent==='function'?getFoodFlowContent():content;
    }
  }
  if(!content) return;
  const statusText=detailReady?'重量和营养已补全，可查看详情或修正重量':'已快速识别食物，正在后台估算重量和营养...';
  content.innerHTML=`
    <img src="${photoURL}" style="width:100%;max-height:120px;object-fit:cover;border-radius:8px;margin-bottom:10px">
    <div style="font-size:12px;color:var(--gold);margin-bottom:4px">AI识别结果（可查看详情并修正重量）</div>
    <div data-ai-detail-status style="font-size:10px;color:var(--txt3);margin-bottom:8px">${statusText}</div>
    ${mealSelectorHTML()}
    <div id="aiFoodDraftHost"></div>
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="btn btn-ghost" id="aiRescanBtn" style="flex:1">重新识别</button>
    </div>`;
  bindMealSelector(content);
  const host=document.getElementById('aiFoodDraftHost');
  host.innerHTML=renderFoodDraftReviewHTML();
  const refreshAI=()=>renderAIResults(photoURL,targetProfileId,{detailReady});
  const refreshDraftOnly=()=>{
    const draftHost=document.getElementById('aiFoodDraftHost');
    if(!draftHost||!foodDraftSession||foodDraftSession.mode!=='ai'){
      refreshAI();
      return;
    }
    draftHost.innerHTML=renderFoodDraftReviewHTML();
    bindFoodDraftReview(draftHost,{
      mode:'ai',
      onRefresh:refreshAI,
      onAddMore:()=>openFoodDraftSearchOverlay({onJoined:refreshDraftOnly}),
      onCancel:()=>{
        foodDraft=[];
        foodDraftSession=null;
        if(typeof closeFoodSubPageAll==='function') closeFoodSubPageAll();
        clearPhotoZone();
      },
      onConfirm:()=>confirmFoodDraft({mode:'ai',targetProfileId})
    });
  };
  bindFoodDraftReview(host,{
    mode:'ai',
    onRefresh:refreshAI,
    onAddMore:()=>openFoodDraftSearchOverlay({onJoined:refreshDraftOnly}),
    onCancel:()=>{
      foodDraft=[];
      foodDraftSession=null;
      if(typeof closeFoodSubPageAll==='function') closeFoodSubPageAll();
      clearPhotoZone();
    },
    onConfirm:()=>confirmFoodDraft({mode:'ai',targetProfileId})
  });
  const rescanBtn=content.querySelector('#aiRescanBtn')||document.getElementById('aiRescanBtn');
  rescanBtn?.addEventListener('click',()=>{
    foodDraft=[];
    foodDraftSession=null;
    startAIAnalysis(photoURL,targetProfileId);
  });
}

/* Phase 5: explicit window exports so lazy gates are replaced (esp. Android WebView). */
window.parseHealthText=parseHealthText;
window.startAIAnalysis=startAIAnalysis;
window.callFoodVisionAI=callFoodVisionAI;
window.renderAIResults=renderAIResults;
window.runDemoAIAnalysis=runDemoAIAnalysis;
window.normalizePhotoFoodItem=normalizePhotoFoodItem;
window.parseAIJsonArray=parseAIJsonArray;
