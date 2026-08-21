
// App-like: suppress context menu (long-press copy/select/share) on non-editable UI.
// Input/textarea/contenteditable are excluded so paste/select still works. (req 17)
// Voice "press and hold" uses pointerdown/pointerup — not affected by contextmenu prevention.
document.addEventListener('contextmenu',function(e){
  var t=e.target;
  if(!t)return;
  if(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable)return;
  e.preventDefault();
},true);
// ==================== FOOD DATABASE ====================
const FOOD_DB = [
  // 主食
  {name:"米饭",cat:"主食",unit:"碗(150g)",cal:174,carb:38.9,pro:3.9,fat:0.5,fib:0.6},
  {name:"面条(煮)",cat:"主食",unit:"碗(200g)",cal:220,carb:48.6,pro:7.0,fat:1.2,fib:0.8},
  {name:"馒头",cat:"主食",unit:"个(100g)",cal:223,carb:47.0,pro:7.0,fat:1.1,fib:1.3},
  {name:"包子(猪肉)",cat:"主食",unit:"个(80g)",cal:182,carb:24.0,pro:6.7,fat:6.4,fib:0.8},
  {name:"面包(切片)",cat:"主食",unit:"片(30g)",cal:94,carb:16.8,pro:3.2,fat:1.6,fib:0.9},
  {name:"燕麦片",cat:"主食",unit:"份(40g)",cal:147,carb:25.1,pro:5.1,fat:2.7,fib:2.7},
  {name:"红薯",cat:"主食",unit:"个(200g)",cal:198,carb:46.0,pro:3.6,fat:0.4,fib:3.0},
  {name:"玉米",cat:"主食",unit:"根(200g)",cal:224,carb:49.2,pro:7.2,fat:1.2,fib:4.0},
  {name:"饺子(猪肉)",cat:"主食",unit:"5个(100g)",cal:240,carb:30.0,pro:8.4,fat:8.0,fib:1.0},
  {name:"白米粥",cat:"主食",unit:"碗(300g)",cal:138,carb:31.2,pro:3.0,fat:0.3,fib:0.3},
  {name:"炒饭",cat:"主食",unit:"碗(250g)",cal:365,carb:50.0,pro:8.0,fat:13.0,fib:1.5},
  {name:"馄饨",cat:"主食",unit:"碗(200g)",cal:250,carb:28.0,pro:9.0,fat:10.0,fib:1.0},
  // 肉类
  {name:"鸡胸肉",cat:"肉类",unit:"100g",cal:133,carb:0,pro:31.0,fat:1.2,fib:0},
  {name:"猪肉(瘦)",cat:"肉类",unit:"100g",cal:143,carb:0,pro:20.3,fat:6.2,fib:0},
  {name:"牛肉(瘦)",cat:"肉类",unit:"100g",cal:106,carb:0,pro:20.0,fat:2.3,fib:0},
  {name:"羊肉",cat:"肉类",unit:"100g",cal:203,carb:0,pro:19.0,fat:14.1,fib:0},
  {name:"鸡腿",cat:"肉类",unit:"个(150g)",cal:272,carb:0,pro:25.5,fat:18.9,fib:0},
  {name:"排骨",cat:"肉类",unit:"100g",cal:278,carb:0,pro:18.3,fat:23.0,fib:0},
  {name:"草鱼",cat:"肉类",unit:"100g",cal:113,carb:0,pro:16.6,fat:5.2,fib:0},
  {name:"虾",cat:"肉类",unit:"100g",cal:87,carb:0,pro:18.6,fat:0.8,fib:0},
  {name:"三文鱼",cat:"肉类",unit:"100g",cal:139,carb:0,pro:21.6,fat:5.5,fib:0},
  {name:"鸡翅",cat:"肉类",unit:"个(80g)",cal:148,carb:0,pro:13.8,fat:10.2,fib:0},
  // 蛋奶豆
  {name:"鸡蛋",cat:"蛋奶",unit:"个(50g)",cal:78,carb:0.6,pro:6.3,fat:5.3,fib:0},
  {name:"牛奶",cat:"蛋奶",unit:"杯(250ml)",cal:135,carb:8.5,pro:7.5,fat:8.0,fib:0},
  {name:"酸奶",cat:"蛋奶",unit:"杯(150g)",cal:108,carb:12.0,pro:3.0,fat:3.6,fib:0},
  {name:"奶酪",cat:"蛋奶",unit:"片(20g)",cal:66,carb:0.8,pro:4.2,fat:5.0,fib:0},
  {name:"豆腐",cat:"蛋奶",unit:"100g",cal:81,carb:1.9,pro:8.1,fat:4.8,fib:0.4},
  {name:"豆浆",cat:"蛋奶",unit:"杯(300ml)",cal:93,carb:3.6,pro:7.8,fat:4.8,fib:0.9},
  {name:"培根",cat:"蛋奶",unit:"2片(20g)",cal:108,carb:0.4,pro:6.2,fat:8.8,fib:0},
  // 蔬菜
  {name:"西兰花",cat:"蔬菜",unit:"100g",cal:36,carb:4.3,pro:2.8,fat:0.4,fib:1.6},
  {name:"菠菜",cat:"蔬菜",unit:"100g",cal:28,carb:4.5,pro:2.6,fat:0.3,fib:1.7},
  {name:"白菜",cat:"蔬菜",unit:"100g",cal:17,carb:3.2,pro:1.5,fat:0.1,fib:0.8},
  {name:"番茄",cat:"蔬菜",unit:"个(150g)",cal:27,carb:5.4,pro:1.5,fat:0.3,fib:1.2},
  {name:"黄瓜",cat:"蔬菜",unit:"根(200g)",cal:30,carb:6.0,pro:1.2,fat:0.2,fib:1.0},
  {name:"胡萝卜",cat:"蔬菜",unit:"根(100g)",cal:41,carb:9.6,pro:1.0,fat:0.2,fib:2.8},
  {name:"土豆",cat:"蔬菜",unit:"个(150g)",cal:116,carb:25.5,pro:3.0,fat:0.2,fib:1.8},
  {name:"青椒",cat:"蔬菜",unit:"100g",cal:22,carb:5.4,pro:1.0,fat:0.2,fib:1.4},
  {name:"生菜",cat:"蔬菜",unit:"100g",cal:15,carb:2.8,pro:1.4,fat:0.2,fib:0.7},
  {name:"茄子",cat:"蔬菜",unit:"100g",cal:21,carb:4.9,pro:1.1,fat:0.2,fib:1.3},
  // 水果
  {name:"苹果",cat:"水果",unit:"个(200g)",cal:104,carb:27.6,pro:0.5,fat:0.3,fib:4.8},
  {name:"香蕉",cat:"水果",unit:"根(120g)",cal:107,carb:27.6,pro:1.3,fat:0.4,fib:3.1},
  {name:"橙子",cat:"水果",unit:"个(200g)",cal:94,carb:21.2,pro:1.8,fat:0.4,fib:4.4},
  {name:"葡萄",cat:"水果",unit:"串(150g)",cal:101,carb:25.8,pro:1.0,fat:0.2,fib:1.0},
  {name:"西瓜",cat:"水果",unit:"块(300g)",cal:90,carb:22.5,pro:1.8,fat:0.3,fib:0.6},
  {name:"草莓",cat:"水果",unit:"10颗(150g)",cal:48,carb:11.4,pro:0.6,fat:0.3,fib:2.4},
  {name:"蓝莓",cat:"水果",unit:"盒(100g)",cal:57,carb:14.5,pro:0.7,fat:0.3,fib:2.4},
  {name:"猕猴桃",cat:"水果",unit:"个(80g)",cal:49,carb:11.0,pro:0.8,fat:0.3,fib:2.5},
  // 零食/其他
  {name:"巧克力",cat:"零食",unit:"块(30g)",cal:164,carb:16.4,pro:2.1,fat:9.3,fib:0.9},
  {name:"薯片",cat:"零食",unit:"袋(50g)",cal:274,carb:28.5,pro:3.4,fat:16.5,fib:2.0},
  {name:"坚果(混合)",cat:"零食",unit:"把(30g)",cal:182,carb:7.2,pro:6.0,fat:15.2,fib:2.7},
  {name:"饼干",cat:"零食",unit:"3片(30g)",cal:131,carb:19.2,pro:2.1,fat:5.2,fib:0.6},
  {name:"蛋糕",cat:"零食",unit:"块(80g)",cal:278,carb:40.0,pro:4.0,fat:11.0,fib:0.8},
  {name:"冰淇淋",cat:"零食",unit:"球(80g)",cal:166,carb:18.4,pro:2.8,fat:8.4,fib:0.4},
  // 饮品
  {name:"可乐",cat:"饮品",unit:"罐(330ml)",cal:142,carb:35.2,pro:0,fat:0,fib:0},
  {name:"咖啡(黑)",cat:"饮品",unit:"杯(240ml)",cal:5,carb:0,pro:0.3,fat:0,fib:0},
  {name:"奶茶",cat:"饮品",unit:"杯(500ml)",cal:350,carb:55.0,pro:5.0,fat:12.0,fib:0.5},
  {name:"橙汁",cat:"饮品",unit:"杯(250ml)",cal:113,carb:26.0,pro:1.7,fat:0.5,fib:0.5},
  // 菜肴
  {name:"番茄炒蛋",cat:"菜肴",unit:"份(200g)",cal:180,carb:6.0,pro:10.0,fat:13.0,fib:1.5},
  {name:"红烧肉",cat:"菜肴",unit:"份(150g)",cal:420,carb:8.0,pro:15.0,fat:38.0,fib:0.5},
  {name:"宫保鸡丁",cat:"菜肴",unit:"份(200g)",cal:310,carb:15.0,pro:20.0,fat:18.0,fib:1.8},
  {name:"麻婆豆腐",cat:"菜肴",unit:"份(200g)",cal:200,carb:8.0,pro:12.0,fat:13.0,fib:1.2},
  {name:"清炒时蔬",cat:"菜肴",unit:"份(150g)",cal:80,carb:6.0,pro:3.0,fat:5.0,fib:2.0},
  {name:"鱼香肉丝",cat:"菜肴",unit:"份(200g)",cal:280,carb:18.0,pro:12.0,fat:18.0,fib:1.5},
  {name:"蛋炒饭",cat:"菜肴",unit:"碗(250g)",cal:365,carb:50.0,pro:8.0,fat:13.0,fib:1.5},
  {name:"排骨汤",cat:"菜肴",unit:"碗(300ml)",cal:150,carb:5.0,pro:8.0,fat:11.0,fib:0.5},
  {name:"紫菜蛋花汤",cat:"菜肴",unit:"碗(300ml)",cal:75,carb:4.0,pro:5.0,fat:4.0,fib:0.8},
];

// ==================== DATA LAYER ====================
const STORAGE_KEY = 'healthTrackerData_v2';
const VIEWER_STORAGE_KEY = 'healthTrackerViewerId_v1';
const CURRENT_PROFILE_STORAGE_KEY = 'healthTrackerCurrentProfileId_v1';
const PENDING_SYNC_CODE_STORAGE_KEY = 'healthTrackerPendingSyncCode_v1';
let state;
const THEME_STORAGE_KEY = 'theme';
const VIEW_DATE_STORAGE_KEY = 'currentViewDate';
const FOOD_AI_VERSION = 'food-ai-estimate-v4';
const AI_FOOD_CACHE_PREFIX = 'healthTrackerAIFoodCache_';
const AI_FOOD_CACHE_KEY = `healthTrackerAIFoodCache_${FOOD_AI_VERSION}`;
const AI_FOOD_CACHE_CLEANUP_KEY = `healthTrackerAIFoodCacheCleanup_${FOOD_AI_VERSION}`;
const COMPLEX_AI_FOOD_KEYWORDS = ['螺蛳粉','麻辣烫','冒菜','火锅','炒饭','蛋炒饭','炒面','炒粉','炒河粉','炸鸡','鸡排','鸡柳','汉堡','奶茶','杨枝甘露','生椰拿铁','盖浇饭','外卖套餐','饭套餐','手抓饼','鸡蛋灌饼','煎饼果子','烤冷面','酸辣粉','烧烤','炸串','烤串'];
// 食物别名映射：将常见同义词/口语名称映射到FOOD_DB标准名称或统一通用名
// 目的：让"西红柿/马铃薯/梨子"等变体也能命中本地库或标准化后走AI fallback
const FOOD_ALIASES = {
  '梨子':'梨','雪梨':'梨','鸭梨':'梨','丰水梨':'梨','贡梨':'梨',
  '西红柿':'番茄','马铃薯':'土豆','洋芋':'土豆','地蛋':'土豆',
  '凤梨':'菠萝','地瓜':'红薯','番薯':'红薯','甘薯':'红薯',
  '苞谷':'玉米','玉蜀黍':'玉米','大豆':'黄豆',
  '地瓜粉':'红薯粉','美人蕉':'香蕉',
  '奇异果':'猕猴桃','车厘子':'樱桃','圣女果':'小番茄',
};
const AI_EXERCISE_CACHE_KEY = 'healthTrackerAIExerciseCache_v1';
const AI_HEALTH_COACH_CACHE_KEY = 'healthTrackerAIHealthCoachV2Cache_v1';
const AI_DAILY_TASKS_CACHE_KEY = 'healthTrackerAIDailyTasksCache_v1';
const AI_WEEKLY_REPORT_CACHE_KEY = 'healthTrackerAIWeeklyReport_v1';
const AI_HEALTH_PROFILE_CACHE_KEY = 'healthTrackerAIHealthProfile_v1';
const AI_SMART_RECIPE_CACHE_KEY = 'healthTrackerSmartRecipeAI_v1';
const LOCAL_PROFILE_IDS = ['profile_A','profile_B'];
const LEGACY_PROFILE_ID_MAP = {person_A:'profile_A',person_B:'profile_B'};
// 统一功能图标系统：使用轻量内联 SVG，避免 Emoji / Unicode 在不同系统字体下显示不一致。
const ICON_PATHS={
  home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  plus:'<path d="M12 5v14"/><path d="M5 12h14"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  scale:'<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M2 16 5 8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  droplet:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  droplets:'<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
  bed:'<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
  bowl:'<path d="M2 12h20"/><path d="M2 12a10 10 0 0 0 20 0"/><path d="m7.5 7.5 1.5 1.5"/><path d="M16.5 7.5 15 9"/><path d="M9 4h6"/>',
  utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  egg:'<path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
  sparkles:'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
  chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  bot:'<path d="M12 8V4H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4"/><path d="M8 8V4h8v4"/><path d="M2 14h20"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>',
  dna:'<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/><path d="m20 9 .5.5"/><path d="m6.5 12.5 1 1"/><path d="m16.5 10.5 1 1"/><path d="m10 16 1.5 1.5"/>',
  footprints:'<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/>',
  star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.262A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.738C19.414 14.94 18 13.518 18 9V9A6 6 0 0 0 6 9c0 4.518-1.414 5.94-2.738 6.262z"/>',
  'bell-off':'<path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="m2 2 20 20"/>',
  'eye-off':'<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.85 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.506-5.307"/><path d="m2 2 20 20"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  'circle-check':'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  'circle-dashed':'<path d="M10.1 2.18a10 10 0 0 1 3.8 0"/><path d="M17.6 3.71a10 10 0 0 1 2.7 2.7"/><path d="M21.82 10.1a10 10 0 0 1 0 3.8"/><path d="M20.29 17.6a10 10 0 0 1-2.7 2.7"/><path d="M13.9 21.82a10 10 0 0 1-3.8 0"/><path d="M6.4 20.29a10 10 0 0 1-2.7-2.7"/><path d="M2.18 13.9a10 10 0 0 1 0-3.8"/><path d="M3.71 6.4a10 10 0 0 1 2.7-2.7"/>',
  activity:'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  'clipboard-list':'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  'chevron-right':'<path d="m9 18 6-6-6-6"/>',
  'arrow-left':'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'alert-circle':'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  'alert-triangle':'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'lightbulb':'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  'check':'<path d="M20 6 9 17l-5-5"/>',
  'wallet':'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  'calendar':'<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
  'coffee':'<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1Z"/><path d="M6 2v2"/><path d="M18 12h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/>',
  'car':'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  'shopping':'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  'ticket':'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
  'cake':'<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M17 8v3"/><path d="M12 5v6"/><path d="M12 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>',
  'package':'<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  'gift':'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  'credit-card':'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  'image':'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  'more-horizontal':'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  'trash-2':'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
};
function icon(name,cls=''){
  const path=ICON_PATHS[name]||ICON_PATHS.plus;
  const className=`ui-icon${cls?` ${cls}`:''}`;
  return `<span class="${className}" aria-hidden="true"><svg viewBox="0 0 24 24">${path}</svg></span>`;
}
function renderIcons(root=document){
  root.querySelectorAll('.ui-icon[data-icon]').forEach(el=>{
    const name=el.dataset.icon;
    const svg=ICON_PATHS[name]?`<svg viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]}</svg>`:'';
    if(svg&&el.innerHTML!==svg) el.innerHTML=svg;
  });
}
const HEALTH_GOAL_TYPES = {
  fat_loss:{title:'减脂塑形',legacy:'lose',desc:'降低体脂、控制体重',strategy:['控制热量','保持蛋白质','增加有氧','保持力量训练']},
  muscle_gain:{title:'增肌提升',legacy:'gain',desc:'增加肌肉、提升围度',strategy:['热量略增加','提高蛋白质','力量训练优先']},
  maintain:{title:'健康保持',legacy:'maintain',desc:'维持状态、平衡习惯',strategy:['保持饮食平衡','规律运动','优化睡眠']},
  sleep_improve:{title:'改善睡眠',legacy:'maintain',desc:'提升睡眠时长与规律',strategy:['固定入睡时间','稳定睡眠时长','减少睡眠波动']},
  fitness:{title:'提升体能',legacy:'maintain',desc:'提升心肺能力和活动量',strategy:['提高运动频率','增加活动量','循序渐进提升强度']}
};
function normalizeAppMode(data,{existingData=false}={}){
  if(!data||typeof data!=='object') return false;
  data.appModeUpdatedAt=Number.isFinite(Number(data.appModeUpdatedAt))?Number(data.appModeUpdatedAt):0;
  if(data.appMode==='single'||data.appMode==='couple') return false;
  data.appMode=existingData?'couple':'single';
  return true;
}
function getAppMode(source=state){
  return source?.appMode==='couple'?'couple':'single';
}
function isSingleMode(source=state){return getAppMode(source)==='single'}
function isCoupleMode(source=state){return getAppMode(source)==='couple'}
function resolveAppRoute(page,mode=getAppMode()){
  if(mode==='single'&&(page==='couple'||page==='health-compare'||page==='couple-ledger')) return 'growth';
  if(mode==='couple'&&page==='growth') return 'couple';
  return page;
}
function syncModeNavigation(){
  const bottomNav=document.getElementById('bottomTabNav');
  const modeTab=document.getElementById('modeTabBtn');
  if(!bottomNav||!modeTab) return;
  modeTab.dataset.appPage=isSingleMode()?'growth':'couple';
  modeTab.querySelector('.mode-tab-label').textContent=isSingleMode()?'成长':'我们';
  const iconEl=modeTab.querySelector('.ui-icon[data-icon]');
  if(iconEl) iconEl.dataset.icon=isSingleMode()?'chart':'users';
  modeTab.style.display='';
  bottomNav.style.gridTemplateColumns='repeat(5,1fr)';
  renderIcons(modeTab);
  bottomNav.querySelectorAll('.bottom-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.appPage===activeAppPage));
}
function reconcileAppModeUI(){
  const owner=getDeviceOwnerProfile();
  if(isSingleMode()) state.activeProfileId=owner?.id||'';
  syncModeNavigation();
  const nextPage=resolveAppRoute(activeAppPage);
  renderAll();
  if(nextPage!==activeAppPage) switchAppPage(nextPage,{scrollTop:false});
}
function setAppMode(mode,{sync=true,notify=true,updatedAt}={}){
  if(mode!=='single'&&mode!=='couple') return false;
  const previousMode=getAppMode();
  const previousUpdatedAt=Number(state.appModeUpdatedAt)||0;
  const previousActiveProfileId=state.activeProfileId;
  state.appMode=mode;
  state.appModeUpdatedAt=updatedAt===undefined?Date.now():(Number(updatedAt)||0);
  const owner=getDeviceOwnerProfile();
  if(mode==='single') state.activeProfileId=owner?.id||'';
  if(!saveLocalOnly(false)){
    state.appMode=previousMode;
    state.appModeUpdatedAt=previousUpdatedAt;
    state.activeProfileId=previousActiveProfileId;
    return false;
  }
  invalidateSyncDataCache();
  if(sync) debouncedSync();
  reconcileAppModeUI();
  if(notify) showToast(mode==='single'?'已切换为个人模式':'已切换为双人模式','success');
  return true;
}
const EMBEDDED_BAILIAN_CONFIG = {
  apiKey:'__server_managed__',
  modelId:'__server_managed__'
};
const EMBEDDED_CLOUD_CONFIG = {
  url:'https://oyaountxtpbuwmtnzzuf.supabase.co',
  anonKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YW91bnR4dHBidXdtdG56enVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODgzMTcsImV4cCI6MjEwMTY2NDMxN30.vij8W9RHxyJlEaRQgJpqNbEbH8piQZkO-xbXMGJz5Mk'
};

/* ---- Unified API Base URL mechanism ----
   - Normal web deployment (http/https origin): returns the relative path as-is (same-origin).
   - Android WebView (file:// origin): resolves to the production HTTPS API domain
     via AndroidBridge.getApiBaseUrl() (from BuildConfig.WEB_API_BASE_URL),
     falling back to PRODUCTION_API_BASE if the bridge is unavailable.
   This lets fetch('/api/food-search') work in both environments without hardcoding
   absolute URLs in business logic. */
var PRODUCTION_API_BASE=''; /* Fallback for file:// context if AndroidBridge is absent. */
function getApiUrl(path){
  if(location.protocol==='file:'){
    var base='';
    try{if(window.AndroidBridge&&typeof window.AndroidBridge.getApiBaseUrl==='function'){base=window.AndroidBridge.getApiBaseUrl()||'';}}catch(e){}
    if(!base) base=PRODUCTION_API_BASE;
    if(base){
      var resolved=base.replace(/\/+$/,'')+path;
      if(window.console) console.log('[API]',{origin:location.origin,resolved:resolved});
      return resolved;
    }
    if(window.console) console.warn('[API] file:// context but no API base URL configured');
  }
  return path;
}

function getDefaultData(){
  return {
    appMode:'single',
    appModeUpdatedAt:0,
    profiles:[
      {id:'p1',profile_id:'profile_A',name:'',gender:'',relation:'',height:null,birthDate:'',activityLevel:'',goal:'',goalWeight:null,startWeight:null,weightRecords:[],foodRecords:[],exerciseRecords:[],stepsRecords:[],sleepRecords:[],waterRecords:[],favoriteFoods:[],deletedFavoriteFoods:[],favoriteRecipes:[]},
      {id:'p2',profile_id:'profile_B',name:'',gender:'',relation:'',height:null,birthDate:'',activityLevel:'',goal:'',goalWeight:null,startWeight:null,weightRecords:[],foodRecords:[],exerciseRecords:[],stepsRecords:[],sleepRecords:[],waterRecords:[],favoriteFoods:[],deletedFavoriteFoods:[],favoriteRecipes:[]}
    ],
    activeProfileId:'p1',
    aiConfig:{...EMBEDDED_BAILIAN_CONFIG},
    familyCode:'',
    lastSyncAt:null,
    lastModifiedAt:Date.now(),
    lastLocalClearAt:null,
    coupleSpace:{togetherDate:'',togetherDateUpdatedAt:0,togetherRemindDays:1,togetherReminderEnabled:true,nextMeeting:{date:'',place:'',note:'',updatedAt:0},meetings:[],deletedMeetings:[],anniversaries:[],deletedAnniversaries:[],countdowns:[],deletedCountdowns:[],holidays:[],deletedHolidays:[],memories:[],deletedMemories:[],ledger:{expenses:[],deletedExpenses:[],periods:[],deletedPeriods:[],activePeriodId:null,updatedAt:0},updatedAt:0},
    deletedRecords:{weight:[],food:[],exercise:[],steps:[],sleep:[],water:[]}
  };
}
// 唯一分类配置源 — 所有地方(表单/统计/Filter/icon/AI)统一读取此配置
const LEDGER_CATEGORY_CONFIG=[
  {key:'food',label:'餐饮',icon:'utensils'},
  {key:'drinks',label:'奶茶咖啡',icon:'coffee'},
  {key:'snacks',label:'零食甜品',icon:'cake'},
  {key:'hotel',label:'酒店住宿',icon:'bed'},
  {key:'transport',label:'交通出行',icon:'car'},
  {key:'tickets',label:'门票景点',icon:'ticket'},
  {key:'entertainment',label:'娱乐休闲',icon:'star'},
  {key:'shopping',label:'购物',icon:'shopping'},
  {key:'daily',label:'生活日用',icon:'package'},
  {key:'gift',label:'礼物',icon:'gift'},
  {key:'beauty',label:'美容护理',icon:'sparkles'},
  {key:'healthcare',label:'医疗健康',icon:'heart'},
  {key:'subscription',label:'会员订阅',icon:'credit-card'},
  {key:'other',label:'其他',icon:'clipboard-list'}
];
const LEDGER_CATEGORIES=LEDGER_CATEGORY_CONFIG.map(c=>c.key);
const LEDGER_CATEGORY_LABELS=Object.fromEntries(LEDGER_CATEGORY_CONFIG.map(c=>[c.key,c.label]));
const LEDGER_CATEGORY_ICONS=Object.fromEntries(LEDGER_CATEGORY_CONFIG.map(c=>[c.key,c.icon]));
// 旧分类key → 新key 兼容映射
const LEDGER_CATEGORY_MIGRATION={'drink':'drinks','ticket':'tickets'};
function resolveLedgerCategory(c){
  const s=String(c||'');
  const migrated=LEDGER_CATEGORY_MIGRATION[s]||s;
  return LEDGER_CATEGORIES.includes(migrated)?migrated:'other';
}
state = loadData();
const MEAL_LABELS={breakfast:'早餐',lunch:'午餐',dinner:'晚餐',snack:'加餐'};
const MEAL_KEYS=['breakfast','lunch','dinner','snack'];
let currentMeal = 'snack'; // will be auto-set by getMealTypeByDateTime when opening food modals

/* Smart Recipe — schema version & preference defaults (P1, no AI) */
const SMART_RECIPE_SCHEMA_VERSION = 1;
const SMART_RECIPE_DEFAULT_PREFERENCES={
  allergies:[],
  dislikes:[],
  dietStyle:'any',
  cookingEffort:'easy',
  maxCookTime:15,
  kitchenAppliances:[],
  mealPattern:'3_meals_snack'
};
const SMART_RECIPE_ALLERGY_PRESETS=['花生','坚果','牛奶','鸡蛋','鱼','虾蟹','贝类','大豆','小麦'];
const SMART_RECIPE_DIET_STYLES=[
  {id:'any',label:'不限'},
  {id:'chinese_home',label:'家常中餐'},
  {id:'light',label:'清淡'},
  {id:'high_protein',label:'高蛋白'},
  {id:'vegetarian',label:'素食'}
];
const SMART_RECIPE_EFFORT_OPTIONS=[
  {id:'easy',label:'越省事越好',maxCookTime:15},
  {id:'15min',label:'15分钟以内',maxCookTime:15},
  {id:'30min',label:'30分钟以内',maxCookTime:30},
  {id:'any',label:'不限制',maxCookTime:999}
];
const SMART_RECIPE_APPLIANCE_OPTIONS=['无厨房','炒锅','电饭煲','空气炸锅','微波炉','烤箱','蒸锅'];
const SMART_RECIPE_MEAL_PATTERN_OPTIONS=[
  {id:'3_meals',label:'三餐'},
  {id:'3_meals_snack',label:'三餐 + 加餐'}
];
const SMART_RECIPE_GAP_THRESHOLDS={protein:5,carbs:10,fat:3};
const SUPPLEMENT_FOODS=[
  {id:'high_protein_yogurt',name:'高蛋白酸奶',servingLabel:'1杯',servingAmount:200,unit:'g',calories:130,protein:18,carbs:10,fat:2,fiber:0,prepMinutes:0,noCook:true,convenience:5,tags:['high_protein','low_fat','snack','no_cook'],allergens:['牛奶'],keywords:['酸奶','乳制品'],portionOptions:[{label:'半杯',factor:0.5}]},
  {id:'plain_yogurt',name:'无糖酸奶',servingLabel:'1杯',servingAmount:180,unit:'g',calories:95,protein:9,carbs:8,fat:3,fiber:0,prepMinutes:0,noCook:true,convenience:5,tags:['snack','no_cook','light'],allergens:['牛奶'],keywords:['酸奶','乳制品'],portionOptions:[{label:'半杯',factor:0.5}]},
  {id:'skim_milk',name:'低脂奶',servingLabel:'1杯',servingAmount:250,unit:'ml',calories:105,protein:8,carbs:11,fat:3,fiber:0,prepMinutes:0,noCook:true,convenience:5,tags:['drink','no_cook','light'],allergens:['牛奶'],keywords:['牛奶','乳制品'],portionOptions:[{label:'150ml',factor:0.6}]},
  {id:'egg',name:'鸡蛋',servingLabel:'1个',servingAmount:50,unit:'g',calories:78,protein:6.3,carbs:0.6,fat:5.3,fiber:0,prepMinutes:8,noCook:false,convenience:3,tags:['high_protein','breakfast','simple_cook'],allergens:['鸡蛋'],keywords:['鸡蛋'],portionOptions:[]},
  {id:'egg_white',name:'蛋清',servingLabel:'2个蛋清',servingAmount:66,unit:'g',calories:34,protein:7.2,carbs:0.4,fat:0.1,fiber:0,prepMinutes:8,noCook:false,convenience:3,tags:['high_protein','low_fat','simple_cook'],allergens:['鸡蛋'],keywords:['蛋清'],portionOptions:[]},
  {id:'ready_chicken',name:'即食鸡胸肉',servingLabel:'1袋',servingAmount:100,unit:'g',calories:120,protein:23,carbs:2,fat:2,fiber:0,prepMinutes:0,noCook:true,convenience:5,tags:['high_protein','low_fat','no_cook'],allergens:[],keywords:['鸡胸肉','即食'],portionOptions:[{label:'半袋',factor:0.5}]},
  {id:'shrimp',name:'虾仁',servingLabel:'1份',servingAmount:100,unit:'g',calories:90,protein:18,carbs:1,fat:1,fiber:0,prepMinutes:8,noCook:false,convenience:3,tags:['high_protein','low_fat','simple_cook'],allergens:['虾蟹'],keywords:['虾仁','海鲜'],portionOptions:[{label:'半份',factor:0.5}]},
  {id:'silken_tofu',name:'嫩豆腐',servingLabel:'半盒',servingAmount:200,unit:'g',calories:90,protein:9,carbs:3,fat:5,fiber:1,prepMinutes:2,noCook:true,convenience:4,tags:['vegetarian','light','no_cook'],allergens:['大豆'],keywords:['豆腐','豆制品'],portionOptions:[{label:'1/4盒',factor:0.5}]},
  {id:'edamame',name:'毛豆',servingLabel:'1小碗',servingAmount:100,unit:'g',calories:131,protein:13,carbs:10,fat:5,fiber:5,prepMinutes:5,noCook:false,convenience:3,tags:['vegetarian','high_protein','simple_cook'],allergens:['大豆'],keywords:['毛豆','豆制品'],portionOptions:[{label:'半碗',factor:0.5}]},
  {id:'banana',name:'香蕉',servingLabel:'1根',servingAmount:120,unit:'g',calories:107,protein:1.3,carbs:27.6,fat:0.4,fiber:3.1,prepMinutes:0,noCook:true,convenience:5,tags:['carb','fruit','no_cook'],allergens:[],keywords:['香蕉','水果'],portionOptions:[{label:'半根',factor:0.5}]},
  {id:'corn',name:'玉米',servingLabel:'半根',servingAmount:100,unit:'g',calories:112,protein:3.6,carbs:24.6,fat:0.6,fiber:2,prepMinutes:5,noCook:false,convenience:3,tags:['carb','simple_cook'],allergens:[],keywords:['玉米'],portionOptions:[]},
  {id:'sweet_potato',name:'红薯',servingLabel:'半个',servingAmount:100,unit:'g',calories:99,protein:1.8,carbs:23,fat:0.2,fiber:1.5,prepMinutes:10,noCook:false,convenience:3,tags:['carb','simple_cook','light'],allergens:[],keywords:['红薯'],portionOptions:[]},
  {id:'oats',name:'燕麦',servingLabel:'半份',servingAmount:20,unit:'g',calories:74,protein:2.6,carbs:12.6,fat:1.4,fiber:1.4,prepMinutes:3,noCook:false,convenience:3,tags:['carb','fiber','simple_cook'],allergens:['小麦'],keywords:['燕麦'],portionOptions:[]},
  {id:'whole_wheat_bread',name:'全麦面包',servingLabel:'2片',servingAmount:60,unit:'g',calories:150,protein:6,carbs:26,fat:2,fiber:4,prepMinutes:0,noCook:true,convenience:5,tags:['carb','fiber','no_cook'],allergens:['小麦'],keywords:['面包','全麦'],portionOptions:[{label:'1片',factor:0.5}]},
  {id:'nuts',name:'原味坚果',servingLabel:'15g',servingAmount:15,unit:'g',calories:91,protein:3,carbs:3.6,fat:7.6,fiber:1.3,prepMinutes:0,noCook:true,convenience:5,tags:['fat','no_cook','snack'],allergens:['坚果'],keywords:['坚果'],portionOptions:[{label:'10g',factor:(10/15)}]},
  {id:'peanut_butter',name:'花生酱',servingLabel:'10g',servingAmount:10,unit:'g',calories:59,protein:2.6,carbs:2,fat:5, fiber:0.8,prepMinutes:0,noCook:true,convenience:4,tags:['fat','snack','no_cook'],allergens:['花生'],keywords:['花生酱','花生'],portionOptions:[]},
  {id:'apple',name:'苹果',servingLabel:'1个',servingAmount:200,unit:'g',calories:104,protein:0.5,carbs:27.6,fat:0.3,fiber:4.8,prepMinutes:0,noCook:true,convenience:5,tags:['fruit','carb','no_cook'],allergens:[],keywords:['苹果','水果'],portionOptions:[{label:'半个',factor:0.5}]},
  {id:'orange',name:'橙子',servingLabel:'1个',servingAmount:200,unit:'g',calories:94,protein:1.8,carbs:21.2,fat:0.4,fiber:4.4,prepMinutes:0,noCook:true,convenience:5,tags:['fruit','carb','no_cook'],allergens:[],keywords:['橙子','水果'],portionOptions:[{label:'半个',factor:0.5}]}
];
const SMART_RECIPE_LIBRARY=[
  {id:'sr_oat_milk',title:'燕麦牛奶杯',mealType:'breakfast',calories:285,protein:12,carbs:42,fat:8,fiber:5,cookTime:5,difficulty:'简单',noCook:true,allergens:['牛奶','小麦'],appliances:[],tags:['breakfast','easy','light'],ingredients:[{name:'燕麦',amount:40,unit:'g'},{name:'牛奶',amount:200,unit:'ml'},{name:'香蕉',amount:0.5,unit:'根'}],reason:'5分钟就能做好，适合匆忙的早餐'},
  {id:'sr_egg_toast',title:'水煮蛋配全麦吐司',mealType:'breakfast',calories:320,protein:18,carbs:28,fat:12,fiber:4,cookTime:10,difficulty:'简单',noCook:false,allergens:['鸡蛋','小麦'],appliances:[],tags:['breakfast','high_protein','easy'],ingredients:[{name:'鸡蛋',amount:2,unit:'个'},{name:'全麦吐司',amount:2,unit:'片'},{name:'黄瓜',amount:50,unit:'g'}],reason:'蛋白质充足，准备也不复杂'},
  {id:'sr_banana_yogurt',title:'香蕉酸奶碗',mealType:'breakfast',calories:255,protein:14,carbs:38,fat:5,fiber:4,cookTime:0,difficulty:'简单',noCook:true,allergens:['牛奶'],appliances:[],tags:['breakfast','no_cook','light','easy'],ingredients:[{name:'无糖酸奶',amount:180,unit:'g'},{name:'香蕉',amount:1,unit:'根'}],reason:'开袋即吃，适合不想开火的早上'},
  {id:'sr_tomato_omelette',title:'番茄菠菜蛋饼',mealType:'breakfast',calories:290,protein:20,carbs:8,fat:18,fiber:3,cookTime:12,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['炒锅'],tags:['breakfast','high_protein','chinese_home','easy'],ingredients:[{name:'鸡蛋',amount:2,unit:'个'},{name:'番茄',amount:1,unit:'个'},{name:'菠菜',amount:50,unit:'g'}],reason:'家常做法，蛋白质够、味道也清淡'},
  {id:'sr_sweet_potato_egg',title:'蒸红薯配水煮蛋',mealType:'breakfast',calories:310,protein:15,carbs:42,fat:8,fiber:5,cookTime:15,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['蒸锅','电饭煲'],tags:['breakfast','chinese_home','light','easy'],ingredients:[{name:'红薯',amount:150,unit:'g'},{name:'鸡蛋',amount:2,unit:'个'}],reason:'碳水来得稳，蛋白质也能补上'},
  {id:'sr_apple_oat',title:'苹果燕麦碗',mealType:'breakfast',calories:250,protein:8,carbs:44,fat:6,fiber:6,cookTime:5,difficulty:'简单',noCook:true,allergens:['小麦'],appliances:[],tags:['breakfast','vegetarian','light','easy','no_cook'],ingredients:[{name:'燕麦',amount:35,unit:'g'},{name:'苹果',amount:0.5,unit:'个'},{name:'原味坚果',amount:8,unit:'g'}],reason:'不用开火，纤维也够'},
  {id:'sr_veggie_congee',title:'蔬菜豆腐粥',mealType:'breakfast',calories:240,protein:11,carbs:36,fat:5,fiber:3,cookTime:20,difficulty:'简单',noCook:false,allergens:['大豆'],appliances:['电饭煲'],tags:['breakfast','vegetarian','light','chinese_home'],ingredients:[{name:'米饭',amount:80,unit:'g'},{name:'嫩豆腐',amount:100,unit:'g'},{name:'青菜',amount:80,unit:'g'}],reason:'清淡好消化，适合想吃热食的早上'},
  {id:'sr_cucumber_egg',title:'黄瓜炒蛋配馒头',mealType:'breakfast',calories:330,protein:16,carbs:38,fat:12,fiber:3,cookTime:10,difficulty:'简单',noCook:false,allergens:['鸡蛋','小麦'],appliances:['炒锅'],tags:['breakfast','chinese_home','easy'],ingredients:[{name:'鸡蛋',amount:2,unit:'个'},{name:'黄瓜',amount:100,unit:'g'},{name:'馒头',amount:1,unit:'个'}],reason:'家常早餐，十来分钟能出锅'},
  {id:'sr_chicken_salad',title:'鸡胸蔬菜沙拉',mealType:'lunch',calories:380,protein:35,carbs:18,fat:16,fiber:5,cookTime:10,difficulty:'简单',noCook:false,allergens:[],appliances:[],tags:['lunch','high_protein','light','easy'],ingredients:[{name:'即食鸡胸肉',amount:120,unit:'g'},{name:'生菜',amount:80,unit:'g'},{name:'番茄',amount:1,unit:'个'},{name:'黄瓜',amount:80,unit:'g'}],reason:'蛋白质高、准备快，适合减脂午餐'},
  {id:'sr_tomato_egg_rice',title:'番茄炒蛋盖饭',mealType:'lunch',calories:460,protein:20,carbs:62,fat:14,fiber:3,cookTime:15,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['炒锅'],tags:['lunch','chinese_home','easy'],ingredients:[{name:'鸡蛋',amount:2,unit:'个'},{name:'番茄',amount:2,unit:'个'},{name:'米饭',amount:150,unit:'g'}],reason:'最省事的家常一餐，热量也明确'},
  {id:'sr_shrimp_broccoli',title:'清炒虾仁西兰花',mealType:'lunch',calories:320,protein:28,carbs:12,fat:12,fiber:4,cookTime:12,difficulty:'简单',noCook:false,allergens:['虾蟹'],appliances:['炒锅'],tags:['lunch','high_protein','light','chinese_home','easy'],ingredients:[{name:'虾仁',amount:120,unit:'g'},{name:'西兰花',amount:150,unit:'g'},{name:'蒜',amount:2,unit:'瓣'}],reason:'低脂高蛋白，适合还想补蛋白质的午餐'},
  {id:'sr_tofu_veggie_rice',title:'家常豆腐青菜饭',mealType:'lunch',calories:420,protein:18,carbs:58,fat:12,fiber:6,cookTime:18,difficulty:'简单',noCook:false,allergens:['大豆'],appliances:['炒锅'],tags:['lunch','vegetarian','chinese_home','light'],ingredients:[{name:'豆腐',amount:150,unit:'g'},{name:'青菜',amount:120,unit:'g'},{name:'米饭',amount:150,unit:'g'}],reason:'素食也能吃饱，做法不复杂'},
  {id:'sr_steamed_fish',title:'清蒸鲈鱼配时蔬',mealType:'lunch',calories:350,protein:32,carbs:10,fat:16,fiber:3,cookTime:20,difficulty:'中等',noCook:false,allergens:['鱼'],appliances:['蒸锅'],tags:['lunch','high_protein','light','chinese_home'],ingredients:[{name:'鲈鱼',amount:150,unit:'g'},{name:'青菜',amount:120,unit:'g'},{name:'姜',amount:6,unit:'g'}],reason:'清淡高蛋白，适合想吃正经正餐的时候'},
  {id:'sr_chicken_potato',title:'烤鸡胸配红薯',mealType:'lunch',calories:430,protein:36,carbs:42,fat:10,fiber:5,cookTime:25,difficulty:'简单',noCook:false,allergens:[],appliances:['烤箱','空气炸锅'],tags:['lunch','high_protein','light'],ingredients:[{name:'鸡胸肉',amount:130,unit:'g'},{name:'红薯',amount:150,unit:'g'},{name:'西兰花',amount:80,unit:'g'}],reason:'蛋白和碳水都补得到，适合训练日午餐'},
  {id:'sr_veggie_fried_rice',title:'杂蔬蛋炒饭',mealType:'lunch',calories:440,protein:16,carbs:64,fat:12,fiber:4,cookTime:15,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['炒锅'],tags:['lunch','chinese_home','easy'],ingredients:[{name:'米饭',amount:180,unit:'g'},{name:'鸡蛋',amount:1,unit:'个'},{name:'胡萝卜',amount:40,unit:'g'},{name:'青豆',amount:30,unit:'g'}],reason:'剩饭也能做成一餐，15分钟内能好'},
  {id:'sr_steam_chicken_veg',title:'清蒸鸡胸时蔬',mealType:'dinner',calories:360,protein:38,carbs:12,fat:12,fiber:4,cookTime:20,difficulty:'简单',noCook:false,allergens:[],appliances:['蒸锅'],tags:['dinner','high_protein','light','chinese_home'],ingredients:[{name:'鸡胸肉',amount:140,unit:'g'},{name:'西兰花',amount:120,unit:'g'},{name:'胡萝卜',amount:40,unit:'g'}],reason:'晚餐清淡高蛋白，不容易吃撑'},
  {id:'sr_tomato_beef',title:'番茄瘦牛肉煲',mealType:'dinner',calories:440,protein:32,carbs:22,fat:20,fiber:4,cookTime:30,difficulty:'中等',noCook:false,allergens:[],appliances:['炒锅'],tags:['dinner','high_protein','chinese_home'],ingredients:[{name:'瘦牛肉',amount:120,unit:'g'},{name:'番茄',amount:2,unit:'个'},{name:'洋葱',amount:0.5,unit:'个'}],reason:'家常热食，蛋白质和饱腹感都不错'},
  {id:'sr_mushroom_tofu',title:'香菇豆腐煲',mealType:'dinner',calories:300,protein:18,carbs:22,fat:14,fiber:5,cookTime:20,difficulty:'简单',noCook:false,allergens:['大豆'],appliances:['炒锅'],tags:['dinner','vegetarian','chinese_home','light'],ingredients:[{name:'豆腐',amount:180,unit:'g'},{name:'香菇',amount:80,unit:'g'},{name:'青菜',amount:80,unit:'g'}],reason:'素食晚餐，热量更克制'},
  {id:'sr_shrimp_noodle',title:'虾仁蔬菜汤面',mealType:'dinner',calories:390,protein:24,carbs:48,fat:8,fiber:4,cookTime:15,difficulty:'简单',noCook:false,allergens:['虾蟹','小麦'],appliances:['炒锅'],tags:['dinner','chinese_home','easy','light'],ingredients:[{name:'面条',amount:80,unit:'g'},{name:'虾仁',amount:80,unit:'g'},{name:'青菜',amount:100,unit:'g'}],reason:'一碗就能吃完，适合想吃热汤面的晚上'},
  {id:'sr_grilled_fish',title:'香煎鱼配沙拉',mealType:'dinner',calories:360,protein:30,carbs:14,fat:18,fiber:4,cookTime:15,difficulty:'简单',noCook:false,allergens:['鱼'],appliances:['炒锅'],tags:['dinner','high_protein','light','easy'],ingredients:[{name:'鱼柳',amount:140,unit:'g'},{name:'生菜',amount:80,unit:'g'},{name:'番茄',amount:1,unit:'个'}],reason:'15分钟能做好，蛋白质也够晚餐用'},
  {id:'sr_cabbage_pork',title:'白菜瘦肉卷',mealType:'dinner',calories:340,protein:26,carbs:16,fat:16,fiber:4,cookTime:25,difficulty:'中等',noCook:false,allergens:[],appliances:['蒸锅','炒锅'],tags:['dinner','chinese_home','light'],ingredients:[{name:'瘦猪肉',amount:100,unit:'g'},{name:'白菜',amount:200,unit:'g'},{name:'姜',amount:4,unit:'g'}],reason:'菜多肉少，适合想吃热食又想控热量的晚餐'},
  {id:'sr_eggplant_chicken',title:'蒜香鸡丁配青椒',mealType:'dinner',calories:400,protein:34,carbs:16,fat:18,fiber:4,cookTime:15,difficulty:'简单',noCook:false,allergens:[],appliances:['炒锅'],tags:['dinner','high_protein','chinese_home','easy'],ingredients:[{name:'鸡胸肉',amount:130,unit:'g'},{name:'青椒',amount:100,unit:'g'},{name:'蒜',amount:3,unit:'瓣'}],reason:'家常快炒，蛋白质高、不拖时间'},
  {id:'sr_tomato_egg_drop',title:'番茄蛋花汤配米饭',mealType:'dinner',calories:380,protein:16,carbs:58,fat:8,fiber:3,cookTime:12,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['炒锅'],tags:['dinner','chinese_home','light','easy'],ingredients:[{name:'番茄',amount:2,unit:'个'},{name:'鸡蛋',amount:1,unit:'个'},{name:'米饭',amount:150,unit:'g'}],reason:'特别省事的清淡晚饭'},
  {id:'sr_yogurt_cup',title:'希腊酸奶杯',mealType:'snack',calories:150,protein:15,carbs:10,fat:4,fiber:0,cookTime:0,difficulty:'简单',noCook:true,allergens:['牛奶'],appliances:[],tags:['snack','high_protein','no_cook','easy','light'],ingredients:[{name:'希腊酸奶',amount:150,unit:'g'}],reason:'开杯即吃，适合补一点蛋白质'},
  {id:'sr_apple',title:'切片苹果',mealType:'snack',calories:104,protein:0.5,carbs:28,fat:0.3,fiber:5,cookTime:0,difficulty:'简单',noCook:true,allergens:[],appliances:[],tags:['snack','vegetarian','no_cook','light','easy','fruit'],ingredients:[{name:'苹果',amount:1,unit:'个'}],reason:'几乎不用准备，适合热量不多时加餐'},
  {id:'sr_edamame',title:'水煮毛豆',mealType:'snack',calories:131,protein:13,carbs:10,fat:5,fiber:5,cookTime:5,difficulty:'简单',noCook:false,allergens:['大豆'],appliances:[],tags:['snack','vegetarian','high_protein','easy','light'],ingredients:[{name:'毛豆',amount:100,unit:'g'}],reason:'加餐也能补蛋白，准备很快'},
  {id:'sr_corn',title:'煮玉米',mealType:'snack',calories:112,protein:4,carbs:25,fat:1,fiber:2,cookTime:8,difficulty:'简单',noCook:false,allergens:[],appliances:[],tags:['snack','vegetarian','easy','light'],ingredients:[{name:'玉米',amount:1,unit:'根'}],reason:'简单补碳水，不容易做成大餐'},
  {id:'sr_nuts',title:'原味坚果一小把',mealType:'snack',calories:91,protein:3,carbs:4,fat:8,fiber:1,cookTime:0,difficulty:'简单',noCook:true,allergens:['坚果'],appliances:[],tags:['snack','no_cook','easy'],ingredients:[{name:'原味坚果',amount:15,unit:'g'}],reason:'一小把就够，适合脂肪还差一点时'},
  {id:'sr_ready_chicken',title:'即食鸡胸小切',mealType:'snack',calories:120,protein:23,carbs:2,fat:2,fiber:0,cookTime:0,difficulty:'简单',noCook:true,allergens:[],appliances:[],tags:['snack','high_protein','no_cook','easy','light'],ingredients:[{name:'即食鸡胸肉',amount:100,unit:'g'}],reason:'不用做饭，蛋白质补得最快'},
  {id:'sr_orange',title:'鲜橙',mealType:'snack',calories:94,protein:2,carbs:21,fat:0.4,fiber:4,cookTime:0,difficulty:'简单',noCook:true,allergens:[],appliances:[],tags:['snack','vegetarian','no_cook','light','easy','fruit'],ingredients:[{name:'橙子',amount:1,unit:'个'}],reason:'清爽加餐，热量占用很少'},
  {id:'sr_cucumber_tofu',title:'凉拌黄瓜豆腐',mealType:'snack',calories:140,protein:10,carbs:8,fat:7,fiber:2,cookTime:8,difficulty:'简单',noCook:true,allergens:['大豆'],appliances:[],tags:['snack','vegetarian','light','chinese_home','easy','no_cook'],ingredients:[{name:'嫩豆腐',amount:150,unit:'g'},{name:'黄瓜',amount:100,unit:'g'}],reason:'不用开火，清淡也能当加餐'}
];
let smartRecipeActiveTab='today';
let smartRecipePrefsDraft=null;
let smartRecipePrefsAddField=null;
let smartRecipeSupplementShuffle=0;
let smartRecipePickIndex=0;
let smartRecipeContext=null;
let smartRecipeSearchQuery='';
let smartRecipeSearchResult=null;
let smartRecipeSearchLoading=false;
let smartRecipeSearchError='';
let smartRecipeIngredientPhoto='';
let smartRecipeIdentifiedIngredients=[];
let smartRecipeIngredientResult=null;
let smartRecipeIngredientLoading=false;
let smartRecipeIngredientError='';
let smartRecipeIngredientPhase='idle';
let smartRecipeDetailState=null;
let mealSelectionTouched = false; // true after user manually clicks a meal button
let foodDraft = [];
let foodDraftSession = null;
let chartInstance = null;
let chartPeriod = 7;
let chartMetric = 'weight';
let settingsProfileId = null;
let settingsViewMode = 'home';
let rebindDeviceOwnerProfileId = '';
let rebindDeviceOwnerStep = 'select';
let editingWeightId = null;
let editingFoodRecordId = null;
let editingExerciseId = null;
let editingStepsId = null;
let editingSleepId = null;
let currentViewDate = loadLocalViewDate();
let aiFoodSearchTimer = null;
let aiFoodSearchRequestId = 0;
let aiFoodSearchController = null;
let aiExerciseSearchTimer = null;
let aiExerciseSearchRequestId = 0;
let aiHealthDraft = null;
let aiHealthSubmitting = false;
let aiAnalysisTargetProfileId = '';

function getInitialTheme(){
  try{
    const saved=localStorage.getItem(THEME_STORAGE_KEY);
    if(saved==='light'||saved==='dark') return saved;
  }catch(e){}
  if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

function applyTheme(theme){
  const next=theme==='light'?'light':'dark';
  document.documentElement.setAttribute('data-theme',next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',next==='light'?'#f4efe4':'#08080c');
  const btn=document.getElementById('themeToggleBtn');
  if(btn){
    const isLight=next==='light';
    btn.innerHTML=icon(isLight?'moon':'sun');
    btn.title=isLight?'切换到黑夜模式':'切换到白天模式';
    btn.setAttribute('aria-label',btn.title);
  }
}

function toggleTheme(){
  const current=document.documentElement.getAttribute('data-theme')||getInitialTheme();
  const next=current==='light'?'dark':'light';
  applyTheme(next);
  try{
    localStorage.setItem(THEME_STORAGE_KEY,next);
  }catch(e){}
  if(chartInstance) renderChart();
  if(activeAppPage==='health-compare') renderHealthCompareTrendChart();
}

function normalizeDeletedRecords(data){
  data.deletedRecords=data.deletedRecords||{};
  ['weight','food','exercise','steps','sleep','water'].forEach(type=>{
    data.deletedRecords[type]=Array.from(new Set(data.deletedRecords[type]||[]));
  });
  return data.deletedRecords;
}

function normalizeCoupleSpace(data){
  const raw=data.coupleSpace&&typeof data.coupleSpace==='object'?data.coupleSpace:{};
  const meeting=raw.nextMeeting&&typeof raw.nextMeeting==='object'?raw.nextMeeting:{};
  const fallbackUpdatedAt=Number(raw.updatedAt)||0;
  data.coupleSpace={
    togetherDate:isValidDateStr(raw.togetherDate)?raw.togetherDate:'',
    togetherDateUpdatedAt:Number(raw.togetherDateUpdatedAt)||fallbackUpdatedAt,
    togetherSortOrder:Number.isFinite(Number(raw.togetherSortOrder))?Number(raw.togetherSortOrder):null,
    togetherSortUpdatedAt:Number(raw.togetherSortUpdatedAt)||fallbackUpdatedAt,
    togetherRemindDays:Number.isFinite(Number(raw.togetherRemindDays))?Math.max(0,Math.min(365,Number(raw.togetherRemindDays))):1,
    togetherReminderEnabled:raw.togetherReminderEnabled!==false,
    nextMeeting:{
      date:isValidDateStr(meeting.date)?meeting.date:'',
      place:String(meeting.place||'').slice(0,40),
      note:String(meeting.note||'').slice(0,120),
      updatedAt:Number(meeting.updatedAt)||fallbackUpdatedAt
    },
    meetings:(()=>{
      let arr=Array.isArray(raw.meetings)?raw.meetings.map((item,i)=>({
        id:String(item.id||`meet${Date.now()}_${i}`),
        title:String(item.title||'').slice(0,30),
        type:['meeting','trip','custom'].includes(String(item.type))?String(item.type):'meeting',
        startDate:isValidDateStr(item.startDate)?item.startDate:'',
        endDate:isValidDateStr(item.endDate)?item.endDate:'',
        place:String(item.place||'').slice(0,40),
        note:String(item.note||'').slice(0,120),
        createdAt:Number(item.createdAt)||fallbackUpdatedAt,
        updatedAt:Number(item.updatedAt)||fallbackUpdatedAt
      })).filter(item=>item.id&&item.startDate):[];
      if(arr.length===0){
        const lg=raw.ledger&&typeof raw.ledger==='object'?raw.ledger:{};
        if(Array.isArray(lg.periods)){
          arr=lg.periods.map((item,i)=>({
            id:String(item.id||`meet${Date.now()}_${i}`),
            title:String(item.title||'').slice(0,30),
            type:['meeting','trip','custom'].includes(String(item.type))?String(item.type):'custom',
            startDate:isValidDateStr(item.startDate)?item.startDate:'',
            endDate:isValidDateStr(item.endDate)?item.endDate:'',
            place:'',
            note:'',
            createdAt:Number(item.createdAt)||fallbackUpdatedAt,
            updatedAt:Number(item.updatedAt)||fallbackUpdatedAt
          })).filter(item=>item.id&&item.startDate);
        }
        if(isValidDateStr(meeting.date)){
          const exist=arr.find(m=>m.startDate===meeting.date&&m.type==='meeting');
          if(!exist){
            arr.push({
              id:`meet_next_${meeting.date}`,
              title:meeting.place?`${meeting.place}见面`:`见面 · ${meeting.date}`,
              type:'meeting',
              startDate:meeting.date,
              endDate:meeting.date,
              place:String(meeting.place||'').slice(0,40),
              note:String(meeting.note||'').slice(0,120),
              createdAt:Number(meeting.updatedAt)||fallbackUpdatedAt,
              updatedAt:Number(meeting.updatedAt)||fallbackUpdatedAt
            });
          }else{
            if(meeting.place) exist.place=String(meeting.place).slice(0,40);
            if(meeting.note) exist.note=String(meeting.note).slice(0,120);
          }
        }
      }
      arr=arr.map(m=>m.title==='下一次见面'?Object.assign({},m,{title:`见面 · ${m.startDate}`}):m);
      return arr;
    })(),
    deletedMeetings:Array.isArray(raw.deletedMeetings)?raw.deletedMeetings.map(item=>({
      id:String(item.id||''),
      deletedAt:Number(item.deletedAt)||fallbackUpdatedAt
    })).filter(item=>item.id):[],
    anniversaries:Array.isArray(raw.anniversaries)?raw.anniversaries.map((item,i)=>({
      id:String(item.id||`ann${Date.now()}_${i}`),
      name:String(item.name||'纪念日').slice(0,30),
      date:isValidDateStr(item.date)?item.date:'',
      type:String(item.type||'custom'),
      sortOrder:Number.isFinite(Number(item.sortOrder))?Number(item.sortOrder):null,
      remindDays:Number.isFinite(Number(item.remindDays))?Math.max(0,Math.min(365,Number(item.remindDays))):1,
      enabled:item.enabled!==false,
      updatedAt:Number(item.updatedAt)||fallbackUpdatedAt
    })).filter(item=>item.date):[]
    ,
    deletedAnniversaries:Array.isArray(raw.deletedAnniversaries)?raw.deletedAnniversaries.map(item=>({
      id:String(item.id||''),
      deletedAt:Number(item.deletedAt)||fallbackUpdatedAt
    })).filter(item=>item.id):[],
    countdowns:Array.isArray(raw.countdowns)?raw.countdowns.map((item,i)=>({
      id:String(item.id||`cd${Date.now()}_${i}`),
      title:String(item.title||'倒计时').slice(0,30),
      date:isValidDateStr(item.date)?item.date:'',
      icon:String(item.icon||'📍').slice(0,4),
      updatedAt:Number(item.updatedAt)||fallbackUpdatedAt
    })).filter(item=>item.date):[],
    deletedCountdowns:Array.isArray(raw.deletedCountdowns)?raw.deletedCountdowns.map(item=>({
      id:String(item.id||''),
      deletedAt:Number(item.deletedAt)||fallbackUpdatedAt
    })).filter(item=>item.id):[],
    holidays:Array.isArray(raw.holidays)?raw.holidays.map((item,i)=>({
      id:String(item.id||`hol${i}`),
      name:String(item.name||'节日').slice(0,20),
      month:Number(item.month)||0,
      day:Number(item.day)||0,
      isLunar:Boolean(item.isLunar),
      enabled:item.enabled!==false,
      hidden:Boolean(item.hidden),
      updatedAt:Number(item.updatedAt)||fallbackUpdatedAt
    })).filter(item=>item.month>0&&item.day>0):[],
    deletedHolidays:Array.isArray(raw.deletedHolidays)?raw.deletedHolidays.map(item=>({
      id:String(item.id||''),
      deletedAt:Number(item.deletedAt)||fallbackUpdatedAt
    })).filter(item=>item.id):[],
    memories:Array.isArray(raw.memories)?raw.memories.map((item,i)=>({
      id:String(item.id||`mem${Date.now()}_${i}`),
      date:isValidDateStr(item.date)?item.date:todayStr(),
      content:String(item.content||'').slice(0,200),
      updatedAt:Number(item.updatedAt)||fallbackUpdatedAt
    })).filter(item=>item.content):[],
    deletedMemories:Array.isArray(raw.deletedMemories)?raw.deletedMemories.map(item=>({
      id:String(item.id||''),
      deletedAt:Number(item.deletedAt)||fallbackUpdatedAt
    })).filter(item=>item.id):[],
    ledger:(()=>{
      const lg=raw.ledger&&typeof raw.ledger==='object'?raw.ledger:{};
      const lgFallback=Number(lg.updatedAt)||fallbackUpdatedAt;
      const normCat=c=>resolveLedgerCategory(c);
      return {
        expenses:Array.isArray(lg.expenses)?lg.expenses.map((item,i)=>({
          id:String(item.id||`exp${Date.now()}_${i}`),
          amount:Number.isFinite(Number(item.amount))?Math.max(0,Math.round(Number(item.amount))):0,
          category:normCat(item.category),
          merchant:String(item.merchant||'').slice(0,40),
          paidByProfileId:String(item.paidByProfileId||''),
          occurredAt:isValidLedgerDatetime(item.occurredAt)?item.occurredAt:'',
          note:String(item.note||'').slice(0,200),
          periodId:item.periodId?String(item.periodId):null,
          source:String(item.source||'manual').slice(0,20),
          orderItems:Array.isArray(item.orderItems)?item.orderItems.map(oi=>({
            name:String(oi.name||'').slice(0,40),
            quantity:Number.isFinite(Number(oi.quantity))?Math.max(1,Math.round(Number(oi.quantity))):1,
            spec:oi.spec?String(oi.spec).slice(0,20):null,
            amount:Number.isFinite(Number(oi.amount))?Math.max(0,Math.round(Number(oi.amount))):null
          })).filter(oi=>oi.name).slice(0,30):[],
          linkedFoodRecordIds:Array.isArray(item.linkedFoodRecordIds)?item.linkedFoodRecordIds.map(x=>String(x)).slice(0,50):[],
          createdAt:Number(item.createdAt)||lgFallback,
          updatedAt:Number(item.updatedAt)||lgFallback
        })).filter(item=>item.id&&item.amount>0&&item.occurredAt&&item.paidByProfileId):[],
        deletedExpenses:Array.isArray(lg.deletedExpenses)?lg.deletedExpenses.map(item=>({
          id:String(item.id||''),
          deletedAt:Number(item.deletedAt)||lgFallback
        })).filter(item=>item.id):[],
        periods:Array.isArray(lg.periods)?lg.periods.map((item,i)=>({
          id:String(item.id||`per${Date.now()}_${i}`),
          title:String(item.title||'').slice(0,30),
          startDate:isValidDateStr(item.startDate)?item.startDate:'',
          endDate:isValidDateStr(item.endDate)?item.endDate:'',
          type:['meeting','trip','custom'].includes(String(item.type))?String(item.type):'custom',
          createdAt:Number(item.createdAt)||lgFallback,
          updatedAt:Number(item.updatedAt)||lgFallback
        })).filter(item=>item.id&&item.startDate):[],
        deletedPeriods:Array.isArray(lg.deletedPeriods)?lg.deletedPeriods.map(item=>({
          id:String(item.id||''),
          deletedAt:Number(item.deletedAt)||lgFallback
        })).filter(item=>item.id):[],
        activePeriodId:lg.activePeriodId?String(lg.activePeriodId):null,
        updatedAt:Number(lg.updatedAt)||lgFallback
      };
    })(),
    updatedAt:Number(raw.updatedAt)||0
  };
  return data.coupleSpace;
}
function cloneNormalizedCoupleSpace(space){
  const wrapper={coupleSpace:JSON.parse(JSON.stringify(space||{}))};
  normalizeCoupleSpace(wrapper);
  return wrapper.coupleSpace;
}
function mergeCoupleSpace(localSpace,cloudSpace){
  const local=cloneNormalizedCoupleSpace(localSpace);
  const cloud=cloneNormalizedCoupleSpace(cloudSpace);
  const merged=cloneNormalizedCoupleSpace(local.updatedAt>=cloud.updatedAt?local:cloud);
  if((cloud.togetherDateUpdatedAt||0)>(local.togetherDateUpdatedAt||0)){
    merged.togetherDate=cloud.togetherDate;
    merged.togetherDateUpdatedAt=cloud.togetherDateUpdatedAt;
    merged.togetherRemindDays=cloud.togetherRemindDays;
    merged.togetherReminderEnabled=cloud.togetherReminderEnabled;
  }else{
    merged.togetherDate=local.togetherDate;
    merged.togetherDateUpdatedAt=local.togetherDateUpdatedAt;
    merged.togetherRemindDays=local.togetherRemindDays;
    merged.togetherReminderEnabled=local.togetherReminderEnabled;
  }
  if((cloud.togetherSortUpdatedAt||0)>(local.togetherSortUpdatedAt||0)){
    merged.togetherSortOrder=cloud.togetherSortOrder;
    merged.togetherSortUpdatedAt=cloud.togetherSortUpdatedAt;
  }else{
    merged.togetherSortOrder=local.togetherSortOrder;
    merged.togetherSortUpdatedAt=local.togetherSortUpdatedAt;
  }
  if((cloud.nextMeeting?.updatedAt||0)>(local.nextMeeting?.updatedAt||0)){
    merged.nextMeeting=JSON.parse(JSON.stringify(cloud.nextMeeting||{}));
  }else{
    merged.nextMeeting=JSON.parse(JSON.stringify(local.nextMeeting||{}));
  }
  // Merge meetings (shared Meeting/Trip source of truth)
  const meetTombMap=new Map();
  [...(local.deletedMeetings||[]),...(cloud.deletedMeetings||[])].forEach(t=>{
    if(!t?.id) return;
    const prev=meetTombMap.get(t.id);
    if(!prev||(t.deletedAt||0)>(prev.deletedAt||0)) meetTombMap.set(t.id,{id:t.id,deletedAt:t.deletedAt||0});
  });
  const meetMap=new Map();
  [...(local.meetings||[]),...(cloud.meetings||[])].forEach(m=>{
    if(!m?.id) return;
    const prev=meetMap.get(m.id);
    if(!prev||(m.updatedAt||0)>(prev.updatedAt||0)) meetMap.set(m.id,JSON.parse(JSON.stringify(m)));
  });
  meetMap.forEach((m,id)=>{const tomb=meetTombMap.get(id);if(tomb&&(tomb.deletedAt||0)>=(m.updatedAt||0))meetMap.delete(id)});
  merged.meetings=Array.from(meetMap.values()).sort((a,b)=>(a.startDate||'').localeCompare(b.startDate||''));
  merged.deletedMeetings=Array.from(meetTombMap.values()).filter(t=>!meetMap.has(t.id));
  const tombstoneMap=new Map();
  [...(local.deletedAnniversaries||[]),...(cloud.deletedAnniversaries||[])].forEach(t=>{
    if(!t?.id) return;
    const prev=tombstoneMap.get(t.id);
    if(!prev||(t.deletedAt||0)>(prev.deletedAt||0)) tombstoneMap.set(t.id,{id:t.id,deletedAt:t.deletedAt||0});
  });
  const annMap=new Map();
  [...(local.anniversaries||[]),...(cloud.anniversaries||[])].forEach(a=>{
    if(!a?.id) return;
    const prev=annMap.get(a.id);
    if(!prev||(a.updatedAt||0)>(prev.updatedAt||0)) annMap.set(a.id,JSON.parse(JSON.stringify(a)));
  });
  annMap.forEach((a,id)=>{
    const tomb=tombstoneMap.get(id);
    if(tomb&&(tomb.deletedAt||0)>=(a.updatedAt||0)) annMap.delete(id);
  });
  merged.anniversaries=Array.from(annMap.values()).sort((a,b)=>compareAnniversaryOrder(a,b));
  merged.deletedAnniversaries=Array.from(tombstoneMap.values()).filter(t=>!annMap.has(t.id));
  // Merge countdowns
  const cdTombMap=new Map();
  [...(local.deletedCountdowns||[]),...(cloud.deletedCountdowns||[])].forEach(t=>{
    if(!t?.id) return;
    const prev=cdTombMap.get(t.id);
    if(!prev||(t.deletedAt||0)>(prev.deletedAt||0)) cdTombMap.set(t.id,{id:t.id,deletedAt:t.deletedAt||0});
  });
  const cdMap=new Map();
  [...(local.countdowns||[]),...(cloud.countdowns||[])].forEach(c=>{
    if(!c?.id) return;
    const prev=cdMap.get(c.id);
    if(!prev||(c.updatedAt||0)>(prev.updatedAt||0)) cdMap.set(c.id,JSON.parse(JSON.stringify(c)));
  });
  cdMap.forEach((c,id)=>{const tomb=cdTombMap.get(id);if(tomb&&(tomb.deletedAt||0)>=(c.updatedAt||0))cdMap.delete(id)});
  merged.countdowns=Array.from(cdMap.values()).sort((a,b)=>(daysUntilDate(a.date)||9999)-(daysUntilDate(b.date)||9999));
  merged.deletedCountdowns=Array.from(cdTombMap.values()).filter(t=>!cdMap.has(t.id));
  // Merge holidays
  const holTombMap=new Map();
  [...(local.deletedHolidays||[]),...(cloud.deletedHolidays||[])].forEach(t=>{
    if(!t?.id) return;
    const prev=holTombMap.get(t.id);
    if(!prev||(t.deletedAt||0)>(prev.deletedAt||0)) holTombMap.set(t.id,{id:t.id,deletedAt:t.deletedAt||0});
  });
  const holMap=new Map();
  [...(local.holidays||[]),...(cloud.holidays||[])].forEach(h=>{
    if(!h?.id) return;
    const prev=holMap.get(h.id);
    if(!prev||(h.updatedAt||0)>(prev.updatedAt||0)) holMap.set(h.id,JSON.parse(JSON.stringify(h)));
  });
  holMap.forEach((h,id)=>{const tomb=holTombMap.get(id);if(tomb&&(tomb.deletedAt||0)>=(h.updatedAt||0))holMap.delete(id)});
  merged.holidays=Array.from(holMap.values()).sort((a,b)=>(a.month-b.month)||(a.day-b.day));
  merged.deletedHolidays=Array.from(holTombMap.values()).filter(t=>!holMap.has(t.id));
  // Merge memories
  const memTombMap=new Map();
  [...(local.deletedMemories||[]),...(cloud.deletedMemories||[])].forEach(t=>{
    if(!t?.id) return;
    const prev=memTombMap.get(t.id);
    if(!prev||(t.deletedAt||0)>(prev.deletedAt||0)) memTombMap.set(t.id,{id:t.id,deletedAt:t.deletedAt||0});
  });
  const memMap=new Map();
  [...(local.memories||[]),...(cloud.memories||[])].forEach(m=>{
    if(!m?.id) return;
    const prev=memMap.get(m.id);
    if(!prev||(m.updatedAt||0)>(prev.updatedAt||0)) memMap.set(m.id,JSON.parse(JSON.stringify(m)));
  });
  memMap.forEach((m,id)=>{const tomb=memTombMap.get(id);if(tomb&&(tomb.deletedAt||0)>=(m.updatedAt||0))memMap.delete(id)});
  merged.memories=Array.from(memMap.values()).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  merged.deletedMemories=Array.from(memTombMap.values()).filter(t=>!memMap.has(t.id));
  // Merge ledger (expenses + periods + tombstones, mirrors memories pattern)
  const lgLocal=local.ledger||{}, lgCloud=cloud.ledger||{};
  const expTombMap=new Map();
  [...(lgLocal.deletedExpenses||[]),...(lgCloud.deletedExpenses||[])].forEach(t=>{
    if(!t?.id) return;
    const prev=expTombMap.get(t.id);
    if(!prev||(t.deletedAt||0)>(prev.deletedAt||0)) expTombMap.set(t.id,{id:t.id,deletedAt:t.deletedAt||0});
  });
  const expMap=new Map();
  [...(lgLocal.expenses||[]),...(lgCloud.expenses||[])].forEach(e=>{
    if(!e?.id) return;
    const prev=expMap.get(e.id);
    if(!prev||(e.updatedAt||0)>(prev.updatedAt||0)) expMap.set(e.id,JSON.parse(JSON.stringify(e)));
  });
  expMap.forEach((e,id)=>{const tomb=expTombMap.get(id);if(tomb&&(tomb.deletedAt||0)>=(e.updatedAt||0))expMap.delete(id)});
  const perTombMap=new Map();
  [...(lgLocal.deletedPeriods||[]),...(lgCloud.deletedPeriods||[])].forEach(t=>{
    if(!t?.id) return;
    const prev=perTombMap.get(t.id);
    if(!prev||(t.deletedAt||0)>(prev.deletedAt||0)) perTombMap.set(t.id,{id:t.id,deletedAt:t.deletedAt||0});
  });
  const perMap=new Map();
  [...(lgLocal.periods||[]),...(lgCloud.periods||[])].forEach(p=>{
    if(!p?.id) return;
    const prev=perMap.get(p.id);
    if(!prev||(p.updatedAt||0)>(prev.updatedAt||0)) perMap.set(p.id,JSON.parse(JSON.stringify(p)));
  });
  perMap.forEach((p,id)=>{const tomb=perTombMap.get(id);if(tomb&&(tomb.deletedAt||0)>=(p.updatedAt||0))perMap.delete(id)});
  const lgLocalUpd=Number(lgLocal.updatedAt)||0, lgCloudUpd=Number(lgCloud.updatedAt)||0;
  let mergedActivePeriodId = lgCloudUpd>lgLocalUpd ? (lgCloud.activePeriodId||null) : (lgLocal.activePeriodId||null);
  if(mergedActivePeriodId && !perMap.has(mergedActivePeriodId)) mergedActivePeriodId=null;
  const mergedExpenses=Array.from(expMap.values()).sort((a,b)=>(b.occurredAt||'').localeCompare(a.occurredAt||''));
  const mergedPeriods=Array.from(perMap.values()).sort((a,b)=>(a.startDate||'').localeCompare(b.startDate||''));
  merged.ledger={
    expenses:mergedExpenses,
    deletedExpenses:Array.from(expTombMap.values()).filter(t=>!expMap.has(t.id)),
    periods:mergedPeriods,
    deletedPeriods:Array.from(perTombMap.values()).filter(t=>!perMap.has(t.id)),
    activePeriodId:mergedActivePeriodId,
    updatedAt:Math.max(lgLocalUpd,lgCloudUpd,...mergedExpenses.map(e=>e.updatedAt||0),...Array.from(expTombMap.values()).map(t=>t.deletedAt||0),...mergedPeriods.map(p=>p.updatedAt||0),...Array.from(perTombMap.values()).map(t=>t.deletedAt||0))
  };
  merged.updatedAt=Math.max(local.updatedAt||0,cloud.updatedAt||0,merged.togetherDateUpdatedAt||0,merged.nextMeeting?.updatedAt||0,...(merged.meetings||[]).map(m=>m.updatedAt||0),...(merged.deletedMeetings||[]).map(t=>t.deletedAt||0),...merged.anniversaries.map(a=>a.updatedAt||0),...merged.deletedAnniversaries.map(t=>t.deletedAt||0),...merged.countdowns.map(c=>c.updatedAt||0),...merged.deletedCountdowns.map(t=>t.deletedAt||0),...merged.holidays.map(h=>h.updatedAt||0),...merged.deletedHolidays.map(t=>t.deletedAt||0),...merged.memories.map(m=>m.updatedAt||0),...merged.deletedMemories.map(t=>t.deletedAt||0),merged.ledger?.updatedAt||0,...mergedExpenses.map(e=>e.updatedAt||0),...Array.from(expTombMap.values()).map(t=>t.deletedAt||0),...mergedPeriods.map(p=>p.updatedAt||0),...Array.from(perTombMap.values()).map(t=>t.deletedAt||0));
  return cloneNormalizedCoupleSpace(merged);
}

function normalizeFavoriteName(name){
  return String(name||'').trim().toLowerCase();
}
function normalizeFavoriteUnit(unit){
  return String(unit||'').trim().toLowerCase();
}
function favoriteFoodKey(food){
  const name=normalizeFavoriteName(typeof food==='string'?food:food?.name);
  const unit=normalizeFavoriteUnit(typeof food==='string'?'':food?.unit);
  return `${name}|${unit}`;
}
function favoriteFoodNameKey(food){
  return normalizeFavoriteName(typeof food==='string'?food:food?.name);
}
function hashString(input){
  let hash=2166136261;
  const text=String(input||'');
  for(let i=0;i<text.length;i++){
    hash^=text.charCodeAt(i);
    hash=Math.imul(hash,16777619);
  }
  return (hash>>>0).toString(36);
}
function createFavoriteFoodId(food){
  const key=favoriteFoodKey(food)||favoriteFoodNameKey(food)||`unknown_${Date.now()}`;
  return `food_${hashString(key)}`;
}
function normalizeFavoriteFood(food){
  if(!food) return null;
  if(typeof food==='string') food={name:food};
  const name=String(food.name||food.food_name||'').trim();
  if(!name) return null;
  const unit=String(food.unit||food.source_unit||'份').trim()||'份';
  const normalized={
    id:String(food.id||createFavoriteFoodId({...food,name,unit})),
    name,
    cal:Number(food.cal??food.calories??food.base_calories)||0,
    carb:Number(food.carb??food.carbs??food.base_carbs)||0,
    pro:Number(food.pro??food.protein??food.base_protein)||0,
    fat:Number(food.fat??food.base_fat)||0,
    fib:Number(food.fib??food.fiber??food.base_fiber)||0,
    unit,
    cat:food.cat||'其他',
    quantity:Number(food.quantity)||1,
    createdAt:Number(food.createdAt)||Date.now(),
    updatedAt:Number(food.updatedAt)||Number(food.createdAt)||Date.now()
  };
  normalized.key=favoriteFoodKey(normalized);
  normalized.nameKey=favoriteFoodNameKey(normalized);
  return normalized;
}
function normalizeFavoriteTombstone(item){
  if(!item) return null;
  if(typeof item==='string') item={id:item};
  const id=String(item.id||'').trim();
  const key=String(item.key||'').trim();
  const nameKey=String(item.nameKey||item.name_key||'').trim();
  if(!id&&!key&&!nameKey) return null;
  return {id,key,nameKey,deletedAt:Number(item.deletedAt)||Date.now()};
}
function normalizeFavoriteCollections(profile){
  if(!profile) return profile;
  const tombstoneMap=new Map();
  (profile.deletedFavoriteFoods||profile.deletedFavorites||profile.favoriteTombstones||[]).forEach(item=>{
    const t=normalizeFavoriteTombstone(item);
    if(!t) return;
    [t.id,t.key,t.nameKey].filter(Boolean).forEach(key=>{
      const prev=tombstoneMap.get(key);
      if(!prev||t.deletedAt>prev.deletedAt) tombstoneMap.set(key,t);
    });
  });
  const favoriteMap=new Map();
  (profile.favoriteFoods||[]).forEach(item=>{
    const fav=normalizeFavoriteFood(item);
    if(!fav) return;
    const existing=favoriteMap.get(fav.id);
    if(!existing||fav.updatedAt>existing.updatedAt) favoriteMap.set(fav.id,fav);
  });
  const favorites=Array.from(favoriteMap.values());
  favorites.forEach(fav=>{
    [fav.id,fav.key,fav.nameKey].filter(Boolean).forEach(key=>{
      const tomb=tombstoneMap.get(key);
      if(tomb&&fav.updatedAt>tomb.deletedAt){
        [tomb.id,tomb.key,tomb.nameKey].filter(Boolean).forEach(k=>tombstoneMap.delete(k));
      }
    });
  });
  profile.deletedFavoriteFoods=Array.from(new Map(Array.from(tombstoneMap.values()).map(t=>[t.id||t.key||t.nameKey,t])).values());
  profile.favoriteFoods=favorites.filter(f=>!isFavoriteTombstoned(profile,f));
  delete profile.deletedFavorites;
  delete profile.favoriteTombstones;
  return profile;
}
function isFavoriteTombstoned(profile,food){
  if(!profile||!food) return false;
  const fav=normalizeFavoriteFood(food);
  if(!fav) return false;
  return (profile.deletedFavoriteFoods||[]).some(t=>{
    const tomb=normalizeFavoriteTombstone(t);
    return tomb&&(tomb.deletedAt>=fav.updatedAt)&&(tomb.id===fav.id||tomb.key===fav.key||tomb.nameKey===fav.nameKey);
  });
}
function removeFavoriteTombstone(profile,food){
  if(!profile||!food) return;
  const fav=normalizeFavoriteFood(food);
  if(!fav) return;
  profile.deletedFavoriteFoods=(profile.deletedFavoriteFoods||[]).filter(t=>{
    const tomb=normalizeFavoriteTombstone(t);
    return !(tomb&&(tomb.id===fav.id||tomb.key===fav.key||tomb.nameKey===fav.nameKey));
  });
}
function addFavoriteTombstone(profile,food){
  if(!profile||!food) return null;
  const fav=normalizeFavoriteFood(food);
  if(!fav) return null;
  profile.deletedFavoriteFoods=profile.deletedFavoriteFoods||[];
  const tomb={id:fav.id,key:fav.key,nameKey:fav.nameKey,deletedAt:Date.now()};
  profile.deletedFavoriteFoods=profile.deletedFavoriteFoods.filter(t=>{
    const existing=normalizeFavoriteTombstone(t);
    return !(existing&&(existing.id===tomb.id||existing.key===tomb.key||existing.nameKey===tomb.nameKey));
  });
  profile.deletedFavoriteFoods.push(tomb);
  return tomb;
}
function mergeFavoriteCollections(localProfile,cloudProfile){
  normalizeFavoriteCollections(localProfile);
  normalizeFavoriteCollections(cloudProfile);
  const tombstoneMap=new Map();
  [...(localProfile.deletedFavoriteFoods||[]),...(cloudProfile.deletedFavoriteFoods||[])].forEach(item=>{
    const tomb=normalizeFavoriteTombstone(item);
    if(!tomb) return;
    [tomb.id,tomb.key,tomb.nameKey].filter(Boolean).forEach(key=>{
      const prev=tombstoneMap.get(key);
      if(!prev||tomb.deletedAt>prev.deletedAt) tombstoneMap.set(key,tomb);
    });
  });
  const favMap=new Map();
  [...(localProfile.favoriteFoods||[]),...(cloudProfile.favoriteFoods||[])].forEach(item=>{
    const fav=normalizeFavoriteFood(item);
    if(!fav) return;
    const existing=favMap.get(fav.id);
    if(!existing||fav.updatedAt>existing.updatedAt) favMap.set(fav.id,fav);
  });
  const activeFavorites=Array.from(favMap.values()).filter(fav=>{
    const matched=Array.from(tombstoneMap.values()).filter(t=>t.id===fav.id||t.key===fav.key||t.nameKey===fav.nameKey);
    if(!matched.length) return true;
    const latestDelete=Math.max(...matched.map(t=>t.deletedAt||0));
    if(fav.updatedAt>latestDelete){
      matched.forEach(t=>{
        [t.id,t.key,t.nameKey].filter(Boolean).forEach(key=>tombstoneMap.delete(key));
      });
      return true;
    }
    return false;
  });
  localProfile.favoriteFoods=activeFavorites;
  const uniqueTombstones=new Map();
  Array.from(tombstoneMap.values()).forEach(t=>{
    const key=t.id||t.key||t.nameKey;
    const prev=uniqueTombstones.get(key);
    if(!prev||t.deletedAt>prev.deletedAt) uniqueTombstones.set(key,t);
  });
  localProfile.deletedFavoriteFoods=Array.from(uniqueTombstones.values());
  mergeFavoriteRecipes(localProfile,cloudProfile);
}

function mergeFavoriteRecipes(localProfile,cloudProfile){
  if(!localProfile) return;
  const map=new Map();
  [...(localProfile.favoriteRecipes||[]),...(cloudProfile?.favoriteRecipes||[])].forEach(item=>{
    if(!item||!item.id) return;
    const existing=map.get(item.id);
    if(!existing||Number(item.createdAt||0)>=Number(existing.createdAt||0)) map.set(item.id,item);
  });
  localProfile.favoriteRecipes=Array.from(map.values()).sort((a,b)=>Number(b.createdAt||0)-Number(a.createdAt||0));
}
function isValidProfileId(data,id){
  return !!(data?.profiles||[]).find(p=>p.id===id);
}

function normalizeProfileDataId(id){
  return LEGACY_PROFILE_ID_MAP[id]||id||'';
}
function getProfileDataId(profile){
  if(!profile) return '';
  return normalizeProfileDataId(profile.profile_id||profile.id||'');
}
function findProfileByDataId(data,profileDataId){
  const normalized=normalizeProfileDataId(profileDataId);
  return (data?.profiles||[]).find(p=>getProfileDataId(p)===normalized)||null;
}
function getProfileIdByDataId(data,profileDataId){
  return findProfileByDataId(data,profileDataId)?.id||'';
}
function getSingleModeProfile(data){
  const profiles=data?.profiles||[];
  if(!profiles.length) return null;
  const stored=loadLocalCurrentProfileId(data);
  return findProfileByDataId(data,stored)
    || profiles.find(p=>p.id===data.activeProfileId)
    || findProfileByDataId(data,'profile_A')
    || profiles[0]
    || null;
}
function loadLocalCurrentProfileId(data){
  let stored='';
  try{
    stored=localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY)||'';
  }catch(e){
    console.error('[DeviceOwnerStorage] 读取设备身份失败',e);
  }
  stored=normalizeProfileDataId(stored);
  return findProfileByDataId(data,stored)?stored:'';
}

function isLocalStorageWritable(){
  const testKey='__healthTrackerStorageTest__';
  const testValue=`ok_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  try{
    localStorage.setItem(testKey,testValue);
    const saved=localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return saved===testValue;
  }catch(e){
    try{localStorage.removeItem(testKey)}catch(_){}
    console.error('[DeviceOwnerStorage] localStorage 不可写',e);
    return false;
  }
}
function getLocalStorageUsageBytes(){
  try{
    let total=0;
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i)||'';
      const value=localStorage.getItem(key)||'';
      total+=(key.length+value.length)*2;
    }
    return total;
  }catch(e){
    return null;
  }
}
function getProfilesDebugSummary(data){
  return (data?.profiles||[]).map(p=>({
    id:p.id,
    profile_id:getProfileDataId(p),
    name:p.name||'',
    gender:p.gender||'',
    hasHeight:!!p.height,
    hasStartWeight:!!p.startWeight,
    weightRecords:(p.weightRecords||[]).length,
    avatarBytes:p.avatar?Math.round((p.avatar.length*3)/4):0
  }));
}
function logDeviceOwnerDebug(stage,data=state){
  try{
    console.info('[DeviceOwnerDebug]',{
      stage,
      storageKey:CURRENT_PROFILE_STORAGE_KEY,
      storedCurrentProfileId:localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY)||'',
      stateCurrentProfileId:data?.current_profile_id||'',
      viewerId:data?.viewerId||'',
      activeProfileId:data?.activeProfileId||'',
      profiles:getProfilesDebugSummary(data),
      storageAvailable:isLocalStorageWritable(),
      localStorageUsageBytes:getLocalStorageUsageBytes()
    });
  }catch(e){
    console.error('[DeviceOwnerDebug] 诊断失败',e);
  }
}
function saveLocalCurrentProfileId(profileDataId){
  const normalized=normalizeProfileDataId(profileDataId);
  if(!findProfileByDataId(state,normalized)) return false;
  try{
    localStorage.setItem(CURRENT_PROFILE_STORAGE_KEY, normalized);
    const saved=localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY)||'';
    if(saved!==normalized){
      console.error('[DeviceOwnerStorage] 保存设备身份失败：写入后读回不一致',{
        storageKey:CURRENT_PROFILE_STORAGE_KEY,
        expected:normalized,
        saved,
        storageAvailable:isLocalStorageWritable(),
        localStorageUsageBytes:getLocalStorageUsageBytes()
      });
      return false;
    }
    state.current_profile_id=normalized;
    return true;
  }catch(e){
    console.error('[DeviceOwnerStorage] 保存设备身份失败',e);
    return false;
  }
}
function verifyLocalCurrentProfileId(profileDataId){
  const normalized=normalizeProfileDataId(profileDataId);
  try{
    return (localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY)||'')===normalized;
  }catch(e){
    console.error('[DeviceOwnerStorage] 验证设备身份失败',e);
    return false;
  }
}
function restoreLocalCurrentProfileIdForRollback(previousProfileDataId){
  const normalized=normalizeProfileDataId(previousProfileDataId);
  try{
    if(normalized) localStorage.setItem(CURRENT_PROFILE_STORAGE_KEY,normalized);
    else localStorage.removeItem(CURRENT_PROFILE_STORAGE_KEY);
    state.current_profile_id=normalized;
    state.viewerId=getProfileIdByDataId(state,normalized)||'';
    state.activeProfileId=state.viewerId||'';
  }catch(e){
    console.error('[DeviceOwnerStorage] 回滚设备身份失败',e);
  }
}

function applyLocalDeviceOwner(data){
  logDeviceOwnerDebug('applyLocalDeviceOwner:before',data);
  data.current_profile_id=loadLocalCurrentProfileId(data);
  data.viewerId=getProfileIdByDataId(data,data.current_profile_id)||'';
  if(data.viewerId) data.activeProfileId=data.viewerId;
  else data.activeProfileId='';
  logDeviceOwnerDebug('applyLocalDeviceOwner:after',data);
  return data;
}

function getPersistableState(){
  const localData=JSON.parse(JSON.stringify(state));
  delete localData.viewerId;
  delete localData.current_profile_id;
  return localData;
}

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

function normalizeRecordProfileId(record,profile){
  if(record&&profile) record.profile_id=getProfileDataId(profile);
  return record;
}
function withProfileId(profile,payload){
  return {profile_id:getProfileDataId(profile),...payload};
}
function setCurrentProfile(profileId,{render=true,save=true}={}){
  if(isSingleMode()){
    const singleProfile=getSingleModeProfile(state);
    if(!singleProfile) return false;
    profileId=singleProfile.id;
  }
  if(!isValidProfileId(state,profileId)) return false;
  state.activeProfileId=profileId;
  if(save) saveLocalOnly(false);
  if(render) renderAll();
  return true;
}

// 确保每个 profile 都有新增字段（向后兼容旧数据）
function migrateProfiles(data){
  (data.profiles||[]).forEach((p,index)=>{
    p.profile_id=normalizeProfileDataId(p.profile_id||LOCAL_PROFILE_IDS[index]||p.id||`profile_${index+1}`);
    if(p.profile_id==='profile_A'&&(p.name==='我'||p.name==='男朋友')) p.name='';
    if(p.profile_id==='profile_B'&&(p.name==='女朋友'||p.name==='伴侣')) p.name='';
    p.weightRecords=p.weightRecords||[];
    p.foodRecords=p.foodRecords||[];
    p.exerciseRecords=p.exerciseRecords||[];
    p.stepsRecords=p.stepsRecords||[];
    p.sleepRecords=p.sleepRecords||[];
    p.waterRecords=p.waterRecords||[];
    p.favoriteFoods=p.favoriteFoods||[];
    p.deletedFavoriteFoods=p.deletedFavoriteFoods||[];
    p.favoriteRecipes=Array.isArray(p.favoriteRecipes)?p.favoriteRecipes:[];
    normalizeFavoriteCollections(p);
    const hasHealthRecords=['weightRecords','foodRecords','exerciseRecords','stepsRecords','sleepRecords','waterRecords'].some(key=>(p[key]||[]).length>0);
    const hasRealProfileInfo=!!(p.name||p.height||p.birthDate||p.activityLevel||p.goal||p.goalWeight||p.startWeight);
    if(!hasHealthRecords&&!hasRealProfileInfo&&p.profile_id==='profile_A'&&p.gender==='male'&&p.relation==='boyfriend'){
      p.gender='';
      p.relation='';
    }
    if(!hasHealthRecords&&!hasRealProfileInfo&&p.profile_id==='profile_B'&&p.gender==='female'&&p.relation==='girlfriend'){
      p.gender='';
      p.relation='';
    }
    // goalWeight / startWeight 旧数据没有 → null（不报错）
    if(p.goalWeight===undefined) p.goalWeight=null;
    if(p.startWeight===undefined) p.startWeight=null;
    // 新用户不预填目标类型；旧数据已有值则保留
    if(p.goal===undefined) p.goal='';
    if(p.gender===undefined) p.gender='';
    if(p.relation===undefined) p.relation='';
    // 新增字段：显示称呼和头像（向后兼容）
    if(p.displayName===undefined) p.displayName='';
    if(p.avatar===undefined) p.avatar='';
    if(p.height===undefined) p.height=null;
    if(p.birthDate===undefined) p.birthDate='';
    if(p.activityLevel===undefined) p.activityLevel='';
    if(p.profileUpdatedAt===undefined) p.profileUpdatedAt=0;
    if(!Array.isArray(p.goal_history)) p.goal_history=[];
    if(!p.health_goal||typeof p.health_goal!=='object') p.health_goal=createDefaultHealthGoalFromLegacy(p);
    ['weightRecords','foodRecords','exerciseRecords','stepsRecords','sleepRecords','waterRecords'].forEach(key=>{
      p[key]=(p[key]||[]).map(record=>normalizeRecordProfileId(record,p));
    });
  });
  return data;
}

function weightDeleteKeys(record,profileId){
  if(!record) return [];
  const keys=[];
  if(record.id) keys.push(record.id);
  keys.push(`${profileId}_${getRecordTime(record)}_${record.weight}`);
  return Array.from(new Set(keys));
}

function addDeletedRecord(type,keys){
  normalizeDeletedRecords(state);
  const arr=state.deletedRecords[type]||[];
  (Array.isArray(keys)?keys:[keys]).filter(Boolean).forEach(key=>{
    if(!arr.includes(key)) arr.push(key);
  });
  state.deletedRecords[type]=arr;
}

function migrateWeightRecords(data){
  normalizeDeletedRecords(data);
  (data.profiles||[]).forEach(p=>{
    p.weightRecords=p.weightRecords||[];
    const dedupeMap=new Map();
    p.weightRecords.forEach(r=>{
      r.dateTime=normalizeDateTime(r.dateTime || `${r.date||todayStr()}T00:00`);
      r.date=dateFromDateTimeValue(r.dateTime);
      r.bmi=r.bmi||calcBMI(r.weight,p.height);
      if(r.bodyFat===undefined){
        const estimated=calcBodyFatPercent(r.weight,p);
        r.bodyFat=estimated;
        r.bodyFatSource=estimated?'estimated':'';
      }
      const stableKey=`${p.id}_${r.dateTime}_${r.weight}`;
      r.id=r.id||`w_${stableKey.replace(/[^a-zA-Z0-9]/g,'_')}`;
      if(!dedupeMap.has(stableKey)) dedupeMap.set(stableKey,r);
    });
    p.weightRecords=Array.from(dedupeMap.values());
    p.weightRecords.sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
  });
  return data;
}

function loadData(){
  try{
    logDeviceOwnerDebug('loadData:before-read',{profiles:[],current_profile_id:'',viewerId:'',activeProfileId:''});
    const d = localStorage.getItem(STORAGE_KEY);
    if(d){
      const parsed=JSON.parse(d);
      parsed.aiConfig={
        apiKey:EMBEDDED_BAILIAN_CONFIG.apiKey,
        modelId:EMBEDDED_BAILIAN_CONFIG.modelId
      };
      // Migrate from old cloudConfig to familyCode
      if(parsed.cloudConfig && !parsed.familyCode){
        parsed.familyCode=parsed.cloudConfig.familyCode||'';
      }
      parsed.familyCode=parsed.familyCode||'';
      delete parsed.cloudConfig;
      parsed.lastSyncAt=parsed.lastSyncAt||null;
      parsed.lastModifiedAt=parsed.lastModifiedAt||Date.now();
      parsed.lastLocalClearAt=parsed.lastLocalClearAt||null;
      const appModeMigrated=normalizeAppMode(parsed,{existingData:true});
      normalizeDeletedRecords(parsed);
      migrateProfiles(parsed);
      migrateWeightRecords(parsed);
      normalizeCoupleSpace(parsed);
      if(appModeMigrated){
        try{
          const migratedData=JSON.parse(JSON.stringify(parsed));
          delete migratedData.viewerId;
          delete migratedData.current_profile_id;
          localStorage.setItem(STORAGE_KEY,JSON.stringify(migratedData));
        }catch(e){
          console.error('[AppMode] 旧数据模式迁移暂未写回，将继续使用双人模式',e);
        }
      }
      return applyLocalDeviceOwner(parsed);
    }
  }catch(e){console.error('Load error:',e)}
  return applyLocalDeviceOwner(getDefaultData());
}
function saveData(){
  try{
    state.lastModifiedAt=Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getPersistableState()));
  }catch(e){
    showToast('存储空间不足，请导出数据后清理','error');
    return false;
  }
  invalidateSyncDataCache(); // 优化5：数据变化，标记sync payload缓存失效
  debouncedSync();
  return true;
}
function saveLocalOnly(touchModified=true){
  try{
    if(touchModified) state.lastModifiedAt=Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getPersistableState()));
  }catch(e){
    showToast('存储空间不足，请导出数据后清理','error');
    return false;
  }
  if(touchModified) invalidateSyncDataCache(); // 优化5：数据可能变化，标记缓存失效
  return true;
}
function getActiveProfile(){
  const profiles=state.profiles||[];
  if(isSingleMode()){
    const owner=getDeviceOwnerProfile();
    state.activeProfileId=owner?.id||'';
    return owner;
  }
  const p=profiles.find(p=>p.id===state.activeProfileId);
  if(!p&&state.activeProfileId){
    console.error('[Profile] activeProfileId not found:',state.activeProfileId);
  }
  return p||profiles[0]||null;
}
function getProfile(id){return (state.profiles||[]).find(p=>p.id===id)||null}
function getDeviceOwnerProfile(){return findProfileByDataId(state,state.current_profile_id)}
function getHealthWriteProfile(){return getDeviceOwnerProfile()}
function getPartnerProfile(owner=getDeviceOwnerProfile()){
  if(!isCoupleMode()||!owner) return null;
  return (state.profiles||[]).find(profile=>profile.id!==owner.id&&isProfileInitializedForDeviceOwner(profile))||null;
}
const DEVICE_OWNER_REQUIRED_MESSAGE='请先完成当前设备身份绑定，否则数据可能保存到错误档案。';
function requireCurrentDeviceOwnerForHealthWrite(){
  if(getHealthWriteProfile()) return true;
  showToast(DEVICE_OWNER_REQUIRED_MESSAGE,'error');
  renderDeviceOwnerModal();
  return false;
}
function requireEditableHealthProfile(profile){
  if(!requireCurrentDeviceOwnerForHealthWrite()) return false;
  if(isSingleMode()) return true;
  if(profile&&getProfileDataId(profile)===state.current_profile_id) return true;
  showToast('当前设备只能修改“我”的健康记录，请切回我的档案或重新绑定设备身份','error');
  return false;
}
function getViewer(){return getDeviceOwnerProfile()}
function getAIConfig(){
  return {...EMBEDDED_BAILIAN_CONFIG};
}

// ==================== EXERCISE DATABASE ====================
const EXERCISE_DB = [
  {name:'步行',met:3.5,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'跑步',met:9.8,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'快走',met:5.0,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'骑自行车',met:7.5,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'游泳',met:8.0,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'跳绳',met:12.3,unit:'分钟',defaultVal:15,inputType:'time'},
  {name:'瑜伽',met:3.0,unit:'分钟',defaultVal:45,inputType:'time'},
  {name:'力量训练',met:6.0,unit:'分钟',defaultVal:45,inputType:'time'},
  {name:'篮球',met:8.0,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'羽毛球',met:5.5,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'足球',met:10.0,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'乒乓球',met:4.0,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'跳舞',met:5.0,unit:'分钟',defaultVal:30,inputType:'time'},
  {name:'爬山',met:6.0,unit:'分钟',defaultVal:60,inputType:'time'},
  {name:'HIIT',met:10.0,unit:'分钟',defaultVal:20,inputType:'time'},
  {name:'计步走路',met:3.5,unit:'步数',defaultVal:8000,inputType:'steps'},
];
const STEP_BASED_EXERCISE_NAMES=new Set([
  ...EXERCISE_DB.filter(ex=>ex.inputType==='steps').map(ex=>ex.name),
  '步行','跑步','快走','爬山'
]);
function isStepBasedExercise(record){
  if(!record) return false;
  const name=String(record.name||'').trim();
  if(name&&STEP_BASED_EXERCISE_NAMES.has(name)) return true;
  if(/\d[\d,]*\s*步/.test(String(record.detail||''))) return true;
  const dbMatch=EXERCISE_DB.find(ex=>ex.name===name);
  return dbMatch?.inputType==='steps';
}
function sumDailySteps(stepsRecords){
  return (stepsRecords||[]).reduce((sum,r)=>sum+(Number(r?.steps)||0),0);
}

function getAIExerciseCacheKey(query){
  return String(query||'').trim().toLowerCase();
}
function normalizeAIExercise(data){
  const src=data?.exercise||data;
  if(!src) return null;
  const name=String(src.name||src.exerciseName||'').trim();
  const met=Number(src.met??src.MET);
  if(!name||!Number.isFinite(met)||met<=0) return null;
  return {
    name,
    met:Math.round(met*10)/10,
    unit:'分钟',
    defaultVal:30,
    inputType:'time'
  };
}
function getCachedAIExercise(query){
  try{
    const cache=JSON.parse(localStorage.getItem(AI_EXERCISE_CACHE_KEY)||'{}');
    return normalizeAIExercise(cache[getAIExerciseCacheKey(query)]);
  }catch(e){
    console.warn('AI exercise cache read error:',e);
    return null;
  }
}
function setCachedAIExercise(query,exercise){
  try{
    const normalized=normalizeAIExercise(exercise);
    if(!normalized) return;
    const cache=JSON.parse(localStorage.getItem(AI_EXERCISE_CACHE_KEY)||'{}');
    cache[getAIExerciseCacheKey(query)]=normalized;
    localStorage.setItem(AI_EXERCISE_CACHE_KEY,JSON.stringify(cache));
  }catch(e){
    console.warn('AI exercise cache write error:',e);
  }
}
function cancelPendingExerciseSearch(){
  if(aiExerciseSearchTimer){
    clearTimeout(aiExerciseSearchTimer);
    aiExerciseSearchTimer=null;
  }
  aiExerciseSearchRequestId++;
}
async function searchExerciseWithAI(query){
  const response=await fetch(getApiUrl('/api/exercise-search'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({query})
  });
  let data=null;
  try{
    data=await response.json();
  }catch(e){
    data=null;
  }
  if(!response.ok){
    throw new Error(data?.error||`HTTP ${response.status}`);
  }
  if(data?.found===false) return null;
  return normalizeAIExercise(data?.exercise||data);
}
function findLocalExercises(query){
  const raw=String(query||'').trim().toLowerCase();
  const aliasMap={骑行:'骑自行车',单车:'骑自行车',撸铁:'力量训练'};
  const q=aliasMap[raw]||raw;
  if(!q) return EXERCISE_DB.slice();
  return EXERCISE_DB.filter(ex=>ex.name.toLowerCase().includes(q)||String(ex.unit||'').toLowerCase().includes(q));
}
function getExerciseIntensity(exercise){
  const met=Number(exercise?.met)||0;
  if(met>=8) return '高强度';
  if(met>=4) return '中等强度';
  return '低强度';
}
function saveExerciseRecordEntry(exercise,value,dateTime,{editingId=null,profile=null}={}){
  if(!exercise||!requireCurrentDeviceOwnerForHealthWrite()) return false;
  const targetProfile=editingId?(profile||getActiveProfile()):getHealthWriteProfile();
  if(editingId&&!requireEditableHealthProfile(targetProfile)) return false;
  const val=Number(value);
  if(!val||val<1){
    showToast('请输入有效数值','error');
    return false;
  }
  const isSteps=exercise.inputType==='steps';
  const calories=isSteps?calcStepsCalories(val,targetProfile):calcExerciseCalories(exercise,val,targetProfile);
  const detail=isSteps?`${val.toLocaleString()} 步`:`${val} 分钟`;
  const normalizedDateTime=normalizeDateTime(dateTime||currentViewDateTime());
  targetProfile.exerciseRecords=targetProfile.exerciseRecords||[];
  const payload=withProfileId(targetProfile,{
    date:dateFromDateTimeValue(normalizedDateTime),
    dateTime:normalizedDateTime,
    name:exercise.name,
    detail,
    calories
  });
  const wasEditing=!!editingId;
  if(editingId){
    const record=targetProfile.exerciseRecords.find(item=>item.id===editingId);
    if(record) Object.assign(record,payload);
    else targetProfile.exerciseRecords.push(withProfileId(targetProfile,{id:editingId,...payload}));
  }else{
    targetProfile.exerciseRecords.push(withProfileId(targetProfile,{
      id:'ex'+Date.now()+Math.random().toString(36).substr(2,5),
      ...payload
    }));
  }
  saveData();
  if(editingId===editingExerciseId) editingExerciseId=null;
  renderDashboard();
  showToast(`${wasEditing?'已更新':'已记录'}${exercise.name}，消耗${calories}kcal`,'success');
  return true;
}

// ==================== CALCULATIONS ====================
function todayStr(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function isValidDateStr(v){
  return /^\d{4}-\d{2}-\d{2}$/.test(v||'') && !Number.isNaN(new Date(`${v}T00:00`).getTime());
}
function loadLocalViewDate(){
  // 每次重新打开网页默认进入当天；当前会话内用户主动切换日期仍由 currentViewDate 保持。
  return todayStr();
}
function saveLocalViewDate(date){
  if(!isValidDateStr(date)) return;
  currentViewDate=date;
  try{
    localStorage.setItem(VIEW_DATE_STORAGE_KEY,date);
  }catch(e){}
}
function renderDateDependentViews(){
  renderDailyView();
  if(isSingleMode()&&activeAppPage==='growth') renderGrowthPage(currentViewDate);
}
function dateToLocalDateTime(date,time='12:00'){
  const safe=isValidDateStr(date)?date:todayStr();
  return `${safe}T${time}`;
}
function isFutureDate(date){
  return isValidDateStr(date)&&date>todayStr();
}
function currentViewDateTime(){
  const nowTime=toLocalDateTimeValue().slice(11);
  return dateToLocalDateTime(currentViewDate,nowTime);
}
// === Unified meal-type detection ===
// Time boundaries centralized here — do NOT scatter hour checks elsewhere.
function getMealTypeByDateTime(dateTime){
  const dt=normalizeDateTime(dateTime);
  const time=dt.split('T')[1]||'00:00';
  const hour=parseInt(time.slice(0,2),10);
  if(hour>=5&&hour<11) return 'breakfast';   // 05:00 - 10:59
  if(hour>=11&&hour<15) return 'lunch';       // 11:00 - 14:59
  if(hour>=15&&hour<17) return 'snack';       // 15:00 - 16:59
  if(hour>=17&&hour<21) return 'dinner';      // 17:00 - 20:59
  return 'snack';                              // 21:00 - 04:59
}
// Detect explicit meal mentions in user's voice/text input.
// Returns meal key ('breakfast'|'lunch'|'dinner'|'snack') or '' if none found.
function detectMealFromText(text){
  const s=String(text||'');
  if(/早餐|早饭|早上吃|清晨吃/.test(s)) return 'breakfast';
  if(/午餐|午饭|中午吃/.test(s)) return 'lunch';
  if(/晚餐|晚饭|晚上吃|夜里吃/.test(s)) return 'dinner';
  if(/加餐|下午茶|夜宵|宵夜|零食/.test(s)) return 'snack';
  return '';
}
function getLocalUIState(){
  return {
    current_profile_id:state.current_profile_id,
    activeProfileId:state.activeProfileId,
    currentViewDate,
    themeMode:document.documentElement.getAttribute('data-theme')||getInitialTheme()
  };
}
function getCloudHealthState(){
  return {
    userProfile:state.profiles||[],
    dailyRecord:(state.profiles||[]).map(profile=>({
      profileId:profile.id,
      weight:profile.weightRecords||[],
      steps:profile.stepsRecords||[],
      sleep:profile.sleepRecords||[],
      water:profile.waterRecords||[],
      meals:profile.foodRecords||[],
      food:profile.foodRecords||[],
      exercise:profile.exerciseRecords||[],
      calories:(profile.foodRecords||[]).map(r=>({id:r.id,date:getRecordDate(r),calories:calcFoodRecordCalories(r)}))
    }))
  };
}
function addDays(date,delta){
  const d=new Date(`${date}T00:00`);
  d.setDate(d.getDate()+delta);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function getMonday(date){
  const d=new Date(`${date}T00:00`);
  const day=d.getDay()||7;
  d.setDate(d.getDate()-day+1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function formatDateTitle(date){
  const [y,m,d]=date.split('-');
  return `${y}年${parseInt(m)}月${parseInt(d)}日`;
}
function formatDate(s){const[,m,d]=s.split('-');return `${parseInt(m)}月${parseInt(d)}日`}
function formatDateShort(s){const[,m,d]=s.split('-');return `${parseInt(m)}/${parseInt(d)}`}
function toLocalDateTimeValue(d=new Date()){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
function dateFromDateTimeValue(v){
  return (v||toLocalDateTimeValue()).slice(0,10);
}
function normalizeDateTime(v){
  return (v||toLocalDateTimeValue()).replace(' ','T').slice(0,16);
}
function formatDateTime(v){
  const dt=normalizeDateTime(v);
  const [date,time]=dt.split('T');
  const [y,m,d]=date.split('-');
  return `${y}年${parseInt(m)}月${parseInt(d)}日 ${time}`;
}
function getRecordTime(r){
  return normalizeDateTime(r.dateTime || (r.date ? `${r.date}T00:00` : toLocalDateTimeValue()));
}
function minutesFromTime(value){
  const [h,m]=String(value||'00:00').split(':').map(Number);
  return (Number.isFinite(h)?h:0)*60+(Number.isFinite(m)?m:0);
}
function dateValueFromDate(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function addDaysToDateValue(dateValue,days){
  const d=dateValue ? new Date(`${dateValue}T00:00`) : new Date();
  d.setDate(d.getDate()+days);
  return dateValueFromDate(d);
}
function combineDateAndTime(dateValue,timeValue){
  return `${dateValue}T${String(timeValue||'00:00').slice(0,5)}`;
}
const TIME_MINUTE_STEP=1;
function minuteValues(){
  const count=Math.floor(60/TIME_MINUTE_STEP);
  return Array.from({length:count},(_,i)=>i*TIME_MINUTE_STEP);
}
function normalizeMinuteStep(minute){
  const n=Number(minute);
  if(!Number.isFinite(n)) return 0;
  return Math.max(0,Math.min(55,Math.round(n/TIME_MINUTE_STEP)*TIME_MINUTE_STEP));
}
function timePartOptionsHTML(type,selected=0){
  const isHour=type==='hour';
  const values=isHour?Array.from({length:24},(_,i)=>i):minuteValues();
  const selectedNum=isHour?Number(selected):normalizeMinuteStep(selected);
  return values.map(v=>{
    const value=String(v).padStart(2,'0');
    return `<option value="${value}" ${Number(v)===selectedNum?'selected':''}>${value}</option>`;
  }).join('');
}
function timeCompactHTML(prefix,selected='23:00'){
  const [h='23',m='00']=String(selected||'23:00').slice(0,5).split(':');
  return `<div class="time-compact-select" data-time-prefix="${prefix}">
    <select class="time-select" id="${prefix}Hour" aria-label="小时">${timePartOptionsHTML('hour',h)}</select>
    <span class="time-compact-sep">:</span>
    <select class="time-select" id="${prefix}Minute" aria-label="分钟">${timePartOptionsHTML('minute',m)}</select>
  </div>`;
}
function getCompactTime(prefix,fallback='00:00'){
  const [fh='00',fm='00']=String(fallback||'00:00').slice(0,5).split(':');
  const h=document.getElementById(`${prefix}Hour`)?.value||fh;
  const m=document.getElementById(`${prefix}Minute`)?.value||fm;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}
function unifiedDateTimeEditorHTML(prefix,dateTime,label='记录时间'){
  const dt=normalizeDateTime(dateTime||toLocalDateTimeValue());
  const [date,time='00:00']=dt.split('T');
  const [h='00',m='00']=time.slice(0,5).split(':');
  return `<div class="unified-datetime-editor" data-datetime-prefix="${escapeHTML(prefix)}">
    <div class="date-part"><input id="${prefix}Date" type="date" value="${escapeHTML(date)}" aria-label="${escapeHTML(label)}日期"></div>
    <select class="time-select" id="${prefix}Hour" aria-label="${escapeHTML(label)}小时">${timePartOptionsHTML('hour',h)}</select>
    <select class="time-select" id="${prefix}Minute" aria-label="${escapeHTML(label)}分钟">${timePartOptionsHTML('minute',m)}</select>
  </div>`;
}
function getUnifiedDateTimeValue(prefix,fallback=toLocalDateTimeValue()){
  const fb=normalizeDateTime(fallback);
  const [fbDate,fbTime='00:00']=fb.split('T');
  const date=document.getElementById(`${prefix}Date`)?.value||fbDate;
  const hour=document.getElementById(`${prefix}Hour`)?.value||(fbTime.slice(0,2)||'00');
  const minute=document.getElementById(`${prefix}Minute`)?.value||(fbTime.slice(3,5)||'00');
  return normalizeDateTime(`${date}T${hour}:${minute}`);
}
function inferSleepRange(startTime,endTime,referenceDate=currentViewDate){
  const startMin=minutesFromTime(startTime);
  const endMin=minutesFromTime(endTime);
  const baseDate=referenceDate||dateValueFromDate(new Date());
  const startDate=startMin>=endMin ? addDaysToDateValue(baseDate,-1) : baseDate;
  const endDate=endMin<=startMin ? addDaysToDateValue(startDate,1) : startDate;
  const duration=(endMin<=startMin ? endMin+1440 : endMin)-startMin;
  return {
    startDate,
    startTime:String(startTime||'23:00').slice(0,5),
    endDate,
    endTime:String(endTime||'07:00').slice(0,5),
    startDateTime:combineDateAndTime(startDate,startTime),
    endDateTime:combineDateAndTime(endDate,endTime),
    duration
  };
}
function getDaysInMonth(year,month){
  return new Date(year,month,0).getDate();
}
const MODULE_TIME_ONLY_PICKERS=new Set(['weightTime','foodTime','exerciseTime','stepsTime','sleepTime','waterTime']);
function setupTimePicker(prefix, initialValue, options={}){
  const wrap=document.getElementById(`${prefix}Picker`);
  if(!wrap) return;
  const dt=normalizeDateTime(initialValue||toLocalDateTimeValue());
  const [date,time]=dt.split('T');
  const [initYear,initMonth,initDay]=date.split('-').map(Number);
  const [initHour,rawMinute]=time.split(':').map(Number);
  const initMinute=normalizeMinuteStep(rawMinute);
  const timeOnly=options.timeOnly ?? MODULE_TIME_ONLY_PICKERS.has(prefix);
  const nowYear=new Date().getFullYear();
  const years=[];
  for(let y=nowYear-15;y<=nowYear+1;y++) years.push(y);
  if(!years.includes(initYear)) years.push(initYear);
  years.sort((a,b)=>b-a);

  const optionHTML=(items,selected,suffix='')=>items.map(v=>{
    const value=String(v).padStart(2,'0');
    const label=(suffix==='时'||suffix==='分')?value:v;
    return `<option value="${value}" ${Number(v)===Number(selected)?'selected':''}>${label}${suffix}</option>`;
  }).join('');

  if(timeOnly){
    wrap.dataset.mode='time-only';
    wrap.dataset.date=currentViewDate;
    wrap.innerHTML=`
      <button class="auto-time-chip" type="button" aria-expanded="false">
        <span>自动记录</span><strong>${formatDate(date)} · ${String(initHour).padStart(2,'0')}:${String(initMinute).padStart(2,'0')}</strong><span class="auto-time-arrow">▼</span>
      </button>
      <div class="auto-time-editor">
        <input class="time-select auto-time-date" id="${prefix}Date" type="date" value="${date}" aria-label="记录日期">
        <select class="time-select" id="${prefix}Hour" aria-label="时">${optionHTML(Array.from({length:24},(_,i)=>i),initHour,'时')}</select>
        <select class="time-select" id="${prefix}Minute" aria-label="分">${optionHTML(minuteValues(),initMinute,'分')}</select>
      </div>
    `;
    const chip=wrap.querySelector('.auto-time-chip');
    const syncChip=()=>{
      const dateEl=document.getElementById(`${prefix}Date`);
      const hourEl=document.getElementById(`${prefix}Hour`);
      const minuteEl=document.getElementById(`${prefix}Minute`);
      const strong=chip?.querySelector('strong');
      if(strong) strong.textContent=`${formatDate(dateEl?.value||currentViewDate)} · ${hourEl?.value||String(initHour).padStart(2,'0')}:${minuteEl?.value||String(initMinute).padStart(2,'0')}`;
    };
    chip?.addEventListener('click',()=>{
      const open=!wrap.classList.contains('open');
      wrap.classList.toggle('open',open);
      chip.setAttribute('aria-expanded',open?'true':'false');
    });
    wrap.querySelectorAll('input,select').forEach(el=>el.addEventListener('change',syncChip));
    if(window.GlassUI) GlassUI.enhance(wrap);
    return;
  }

  wrap.dataset.mode='datetime';
  wrap.innerHTML=`
    <select class="time-select" id="${prefix}Year" aria-label="年">${years.map(y=>`<option value="${y}" ${y===initYear?'selected':''}>${y}年</option>`).join('')}</select>
    <select class="time-select" id="${prefix}Month" aria-label="月">${optionHTML([1,2,3,4,5,6,7,8,9,10,11,12],initMonth,'月')}</select>
    <select class="time-select" id="${prefix}Day" aria-label="日"></select>
    <select class="time-select" id="${prefix}Hour" aria-label="时">${optionHTML(Array.from({length:24},(_,i)=>i),initHour,'时')}</select>
    <select class="time-select" id="${prefix}Minute" aria-label="分">${optionHTML(minuteValues(),initMinute,'分')}</select>
  `;

  const yearEl=document.getElementById(`${prefix}Year`);
  const monthEl=document.getElementById(`${prefix}Month`);
  const dayEl=document.getElementById(`${prefix}Day`);
  const renderDays=()=>{
    const max=getDaysInMonth(+yearEl.value,+monthEl.value);
    const current=Math.min(+(dayEl.value||initDay),max);
    dayEl.innerHTML=optionHTML(Array.from({length:max},(_,i)=>i+1),current,'日');
    if(window.GlassUI) GlassUI.refreshSelect(dayEl);
  };
  yearEl.addEventListener('change',renderDays);
  monthEl.addEventListener('change',renderDays);
  renderDays();
  if(window.GlassUI) GlassUI.enhance(wrap);
}
function getTimePickerValue(prefix){
  const wrap=document.getElementById(`${prefix}Picker`);
  const dateOnly=document.getElementById(`${prefix}Date`)?.value;
  const year=document.getElementById(`${prefix}Year`)?.value;
  const month=document.getElementById(`${prefix}Month`)?.value;
  const day=document.getElementById(`${prefix}Day`)?.value;
  const hour=document.getElementById(`${prefix}Hour`)?.value;
  const minute=document.getElementById(`${prefix}Minute`)?.value;
  if(wrap?.dataset.mode==='time-only'){
    if(!hour||!minute) return currentViewDateTime();
    return `${dateOnly||currentViewDate}T${hour}:${minute}`;
  }
  if(!year||!month||!day||!hour||!minute) return toLocalDateTimeValue();
  return `${year}-${month}-${day}T${hour}:${minute}`;
}
function resetTimePicker(prefix){
  setupTimePicker(prefix,currentViewDateTime());
}
function withCurrentViewDateTime(value){
  const dt=normalizeDateTime(value||currentViewDateTime());
  const time=(dt.split('T')[1]||toLocalDateTimeValue().slice(11)).slice(0,5);
  return dateToLocalDateTime(currentViewDate,time);
}

function calcAge(birthDate){
  if(!birthDate) return null;
  const b=new Date(birthDate);
  const now=new Date();
  let age=now.getFullYear()-b.getFullYear();
  const mDiff=now.getMonth()-b.getMonth();
  if(mDiff<0||(mDiff===0&&now.getDate()<b.getDate())) age--;
  return age;
}
function getDaysUntilBirthday(birthDate){
  if(!birthDate) return null;
  const b=new Date(birthDate);
  const now=new Date();
  let next=new Date(now.getFullYear(),b.getMonth(),b.getDate());
  if(next<now) next=new Date(now.getFullYear()+1,b.getMonth(),b.getDate());
  const diff=Math.ceil((next-now)/(1000*60*60*24));
  return diff;
}
function getRelationFromGender(gender){
  if(gender==='female') return 'girlfriend';
  if(gender==='male') return 'boyfriend';
  return 'partner';
}
function getRelationLabel(relation){
  const map={
    girlfriend:'女朋友',
    boyfriend:'男朋友',
    partner:'Ta',
    husband:'老公',
    wife:'老婆',
    spouse:'伴侣'
  };
  return map[relation]||'Ta';
}
function getDisplayName(profile){
  if(!profile) return '';
  // 1. 用户自定义显示称呼优先
  if(profile.displayName) return profile.displayName;
  // 2. 当前设备主人默认"我"
  if(getProfileDataId(profile)===state.current_profile_id) return '我';
  // 3. 旧数据兼容：有有效relation则显示旧称呼
  if(profile.relation) return getRelationLabel(profile.relation);
  // 4. 有昵称则用昵称
  if(profile.name) return profile.name;
  // 5. 最终fallback
  return 'Ta';
}
function getProfileNameForSettings(profile){
  if(!profile) return '';
  return profile.name||'我';
}
function getGenderIcon(gender){
  if(gender==='male') return '男';
  if(gender==='female') return '女';
  return '';
}

function calcBMI(weight,height){
  if(!weight||!height) return null;
  const h=height/100;
  return +(weight/(h*h)).toFixed(1);
}
function calcBodyFatPercent(weight,profile){
  const bmi=calcBMI(weight,profile.height);
  const age=calcAge(profile.birthDate);
  if(!bmi||!age||!profile.gender) return null;
  const sexFactor=profile.gender==='male'?1:0;
  const val=1.2*bmi+0.23*age-10.8*sexFactor-5.4;
  if(!Number.isFinite(val)||val<3||val>70) return null;
  return +val.toFixed(1);
}
function getLatestBodyFat(p){
  const latest=getLatestWeight(p);
  if(!latest) return null;
  return latest.bodyFat||calcBodyFatPercent(latest.weight,p);
}
function getBodyFatStandardRange(p){
  if(!p.gender) return null;
  if(p.gender==='male') return {min:10,max:20,label:'男性健康范围'};
  if(p.gender==='female') return {min:18,max:28,label:'女性健康范围'};
  return null;
}
function getBodyFatStatus(p){
  const range=getBodyFatStandardRange(p);
  const bodyFat=getLatestBodyFat(p);
  if(!range) return null;
  if(!bodyFat) return {range,bodyFat:null,label:'暂无体脂记录',cls:'negative'};
  if(bodyFat<range.min) return {range,bodyFat,label:`偏低 ${(range.min-bodyFat).toFixed(1)}%`,cls:'negative'};
  if(bodyFat>range.max) return {range,bodyFat,label:`偏高 ${(bodyFat-range.max).toFixed(1)}%`,cls:'positive'};
  return {range,bodyFat,label:'标准范围内',cls:'met'};
}
function calcMaintenanceTDEE(p){
  const bmr=calcBMR(p);
  if(!bmr||!p.activityLevel) return null;
  const factors={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryActive:1.9};
  return Math.round(bmr*(factors[p.activityLevel]||1.2));
}
function calcCalorieGapRecommendation(p,daily=null){
  const maintenance=calcMaintenanceTDEE(p);
  if(!maintenance) return null;
  const goalType=getHealthGoal(p).type;
  let strategy;
  if(goalType==='fat_loss'){
    const min=Math.max(250,Math.round(maintenance*0.10));
    const max=Math.min(600,Math.round(maintenance*0.20));
    strategy={type:'deficit',label:'建议热量缺口',rangeLabel:`建议缺口 ${min}～${max} kcal`,range:`${min}～${max} kcal/天`,min,max,note:'用于减脂，避免缺口过大'};
  }else if(goalType==='muscle_gain'){
    const min=Math.max(150,Math.round(maintenance*0.08));
    const max=Math.min(500,Math.round(maintenance*0.15));
    strategy={type:'surplus',label:'建议热量盈余',rangeLabel:`建议盈余 ${min}～${max} kcal`,range:`${min}～${max} kcal/天`,min,max,note:'用于增肌，避免脂肪增长过快'};
  }else{
    strategy={type:'maintain',label:'建议热量浮动',rangeLabel:'维持范围 ±100 kcal',range:'-100～100 kcal/天',min:-100,max:100,note:'用于维持体重'};
  }
  if(!daily) return {...strategy,maintenanceCalories:maintenance};

  const target=Math.round(Number(daily.targetCalories)||0);
  const consumed=Math.round(Number(daily.consumedCalories)||0);
  if(target<=0||!Number.isFinite(consumed)) return null;
  const effectiveMaintenance=Math.max(0,Math.round(Number(daily.maintenanceCalories)||maintenance));
  const targetDifference=target-consumed;
  const base={...strategy,maintenanceCalories:effectiveMaintenance,targetCalories:target,consumedCalories:consumed,targetDifference};

  if(goalType==='fat_loss'){
    const actualDeficit=effectiveMaintenance-consumed;
    const resultBase={...base,actualDifference:actualDeficit};
    if(targetDifference<0){
      let note='无需通过极端减少下一餐补偿，关注周平均即可。';
      if(actualDeficit>700) note=`相对维持热量仍有约 ${actualDeficit} kcal 缺口，明显高于建议区间；可适当补充优质蛋白和复合碳水。`;
      else if(actualDeficit>strategy.max) note=`相对维持热量仍有约 ${actualDeficit} kcal 缺口，略高于建议区间；注意保证基础能量摄入。`;
      else if(actualDeficit>=strategy.min) note=`相对维持热量仍有约 ${actualDeficit} kcal 缺口，处于建议区间；关注周平均即可。`;
      else if(actualDeficit>0) note=`当前实际缺口约 ${actualDeficit} kcal，低于建议减脂区间；无需极端补偿。`;
      else note=`当前已高于维持热量约 ${Math.abs(actualDeficit)} kcal；无需极端补偿，关注周平均即可。`;
      return {...resultBase,tone:'over',summary:`今日摄入超过目标约 ${Math.abs(targetDifference)} kcal。`,note};
    }
    if(actualDeficit<strategy.min) return {...resultBase,tone:'near',summary:`今日实际热量缺口约 ${Math.max(0,actualDeficit)} kcal，低于建议减脂区间。`,note:'当前更接近维持水平，可结合一周平均摄入判断。'};
    if(actualDeficit<=strategy.max) return {...resultBase,tone:'balanced',summary:`今日预计热量缺口约 ${actualDeficit} kcal，处于建议减脂区间。`,note:'保持蛋白质摄入，避免过度减少热量。'};
    if(actualDeficit<=700) return {...resultBase,tone:'warning',summary:`今日热量缺口偏大，约 ${actualDeficit} kcal。`,note:'注意保证蛋白质和基础能量摄入。'};
    return {...resultBase,tone:'warning',summary:`今日热量缺口较大，约 ${actualDeficit} kcal，不建议长期维持。`,note:'适当补充优质蛋白和复合碳水。'};
  }

  if(goalType==='muscle_gain'){
    const actualSurplus=consumed-effectiveMaintenance;
    const resultBase={...base,actualDifference:actualSurplus};
    if(actualSurplus<strategy.min) return {...resultBase,tone:'warning',summary:targetDifference>0?`距离今日摄入目标还差 ${targetDifference} kcal，当前盈余低于建议区间。`:`今日能量摄入偏低，不利于增肌恢复。`,note:'建议增加蛋白质和优质碳水摄入。'};
    if(actualSurplus<=strategy.max) return {...resultBase,tone:'balanced',summary:`今日实际热量盈余约 ${actualSurplus} kcal，处于建议增肌区间。`,note:'继续保持蛋白质摄入，并配合力量训练。'};
    return {...resultBase,tone:'over',summary:`今日热量盈余偏高，约 ${actualSurplus} kcal。`,note:'无需继续加餐，保持稳定的小幅盈余即可。'};
  }

  const maintenanceDifference=consumed-effectiveMaintenance;
  const resultBase={...base,actualDifference:maintenanceDifference};
  if(maintenanceDifference<strategy.min) return {...resultBase,tone:'near',summary:`今日摄入低于维持热量约 ${Math.abs(maintenanceDifference)} kcal。`,note:'可按饥饿感适量补充，避免长期摄入不足。'};
  if(maintenanceDifference<=strategy.max) return {...resultBase,tone:'balanced',summary:'今日摄入处于维持范围，继续保持即可。',note:'保持饮食结构和一周平均摄入稳定。'};
  return {...resultBase,tone:'over',summary:`今日摄入高于维持热量约 ${maintenanceDifference} kcal。`,note:'单日波动无需焦虑，关注周平均即可。'};
}

/* ── Unified Daily Calorie Status ──────────────────────────────
   Single source of truth for all calorie metrics on the homepage.
   Every module (hero focus, calorie advice, AI coach input) should
   read from this helper instead of computing its own numbers.

   Key distinction:
   - intakeTargetKcal  = calcTDEE()        → goal-adjusted (e.g. 1904 for fat loss)
   - maintenanceKcal   = calcMaintenanceTDEE() → raw TDEE without goal adjustment (e.g. 2234)
   - intakeRemainingKcal = target - intake (positive when below target)
   - energyDeficitKcal   = maintenance - intake (positive = deficit vs maintenance)
   These are DIFFERENT concepts and must never be conflated. */
function calculateDailyCalorieBalance({baseCalorieTarget=0,exerciseCalories=0,caloriesConsumed=0}={}){
  const safeKcal=value=>{const n=Number(value);return Number.isFinite(n)&&n>0?Math.round(n):0;};
  const base=safeKcal(baseCalorieTarget);
  const exercise=safeKcal(exerciseCalories);
  const consumed=safeKcal(caloriesConsumed);
  const hasTarget=base>0;
  const dynamic=hasTarget?base+exercise:0;
  return {
    baseCalorieTarget:base,
    exerciseCalories:exercise,
    dynamicCalorieTarget:dynamic,
    caloriesConsumed:consumed,
    netCalories:Math.round(consumed-exercise),
    remainingCalories:hasTarget?Math.round(dynamic-consumed):0,
    calorieBalance:hasTarget?Math.round(consumed-dynamic):0,
    hasTarget
  };
}
function getExerciseCalorieSummary(profile,date=currentViewDate,exerciseRecords=null,stepsRecords=null){
  const p=profile||getActiveProfile();
  const empty={
    stepCalories:0,stepBasedExerciseCalories:0,nonStepExerciseCalories:0,
    recordedExerciseCalories:0,activityCalories:0,activityAllowanceCalories:0,
    extraActivityCalories:0,exerciseCalories:0,dynamicAdjustment:0,
    hasStepsRecords:false,totalSteps:0,activityFactor:1.2
  };
  if(!p) return empty;
  const daily=getDailyRecord(p,date);
  const records=Array.isArray(exerciseRecords)?exerciseRecords:daily.exercise;
  const steps=Array.isArray(stepsRecords)?stepsRecords:daily.steps;
  const seen=new Set();
  let recordedExerciseCalories=0,stepBasedExerciseCalories=0,nonStepExerciseCalories=0;
  records.forEach((record,index)=>{
    const key=record?.id?`id:${record.id}`:`row:${index}`;
    if(seen.has(key)) return;
    seen.add(key);
    const calories=Number(record?.calories);
    if(!Number.isFinite(calories)||calories<=0) return;
    recordedExerciseCalories+=calories;
    if(isStepBasedExercise(record)) stepBasedExerciseCalories+=calories;
    else nonStepExerciseCalories+=calories;
  });
  recordedExerciseCalories=Math.round(recordedExerciseCalories);
  stepBasedExerciseCalories=Math.round(stepBasedExerciseCalories);
  nonStepExerciseCalories=Math.round(nonStepExerciseCalories);
  const totalSteps=sumDailySteps(steps);
  const hasStepsRecords=totalSteps>0;
  const stepCalories=hasStepsRecords?calcStepsCalories(totalSteps,p):0;
  const activityCalories=Math.round(
    hasStepsRecords?(stepCalories+nonStepExerciseCalories):(stepBasedExerciseCalories+nonStepExerciseCalories)
  );
  const bmr=Number(calcBMR(p))||0;
  const factors={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryActive:1.9};
  const activityFactor=factors[p?.activityLevel]||1.2;
  const activityAllowanceCalories=bmr>0?Math.max(0,Math.round(bmr*(activityFactor-1.2))):0;
  const extraActivityCalories=Math.max(0,activityCalories-activityAllowanceCalories);
  return {
    stepCalories,stepBasedExerciseCalories,nonStepExerciseCalories,
    recordedExerciseCalories,activityCalories,activityAllowanceCalories,
    extraActivityCalories,
    exerciseCalories:extraActivityCalories,
    dynamicAdjustment:extraActivityCalories,
    hasStepsRecords,totalSteps,activityFactor
  };
}
function buildHomeActivityTargetDetailMarkup(snap){
  const activity=Number(snap?.activityCalories)||0;
  const allowance=Number(snap?.activityAllowanceCalories)||0;
  const extra=Number(snap?.exerciseCalories)||0;
  const hasData=activity>0||(Number(snap?.stepCalories)||0)>0||(Number(snap?.recordedExerciseCalories)||0)>0;
  if(!hasData) return '';
  if(extra>0) return '<span class="home-diet-target-detail">今日活动 '+activity+' · 动态增加 +'+extra+'</span>';
  return '<span class="home-diet-target-detail">今日活动 '+activity+' · 基线 '+allowance+'</span>';
}
function getDailyCalorieStatus(profile,date=currentViewDate){
  const p=profile||getActiveProfile();
  const snap=getHealthScoreData(p,date);
  const budget=snap.calorieBudget||calculateDailyCalorieBalance({
    baseCalorieTarget:snap.baseTargetCals||snap.targets?.calories,
    exerciseCalories:snap.exerciseCalories,
    caloriesConsumed:snap.intakeCalories
  });
  const intakeKcal=budget.caloriesConsumed;
  const intakeTargetKcal=budget.dynamicCalorieTarget;
  const maintenanceKcal=Math.max(0,Math.round(Number(calcMaintenanceTDEE(p))||0)+budget.exerciseCalories);
  const goalType=getHealthGoal(p).type;
  const intakeRemainingKcal=budget.hasTarget?Math.max(0,budget.remainingCalories):0;
  const intakeOverTargetKcal=budget.hasTarget?Math.max(0,budget.calorieBalance):0;
  const energyDeficitKcal=maintenanceKcal>0?Math.max(0,maintenanceKcal-intakeKcal):0;
  const energySurplusKcal=maintenanceKcal>0?Math.max(0,intakeKcal-maintenanceKcal):0;
  const gapRec=calcCalorieGapRecommendation(p);
  const recommendedDeficitMin=gapRec?.min||0;
  const recommendedDeficitMax=gapRec?.max||0;
  return {
    ...budget,
    recordedExerciseCalories:Math.round(Number(snap.recordedExerciseCalories)||0),
    activityAllowanceCalories:Math.round(Number(snap.activityAllowanceCalories)||0),
    activityCalories:Math.round(Number(snap.activityCalories)||0),
    extraActivityCalories:Math.round(Number(snap.extraActivityCalories)||Number(snap.exerciseCalories)||0),
    intakeKcal,
    intakeTargetKcal,
    intakeRemainingKcal,
    intakeOverTargetKcal,
    maintenanceKcal,
    energyDeficitKcal,
    energySurplusKcal,
    recommendedDeficitMin,
    recommendedDeficitMax,
    goalType,
    hasFood:snap.hasFood,
    hasTarget:intakeTargetKcal>0,
    hasMaintenance:maintenanceKcal>0
  };
}

/* Planned calorie gap for homepage + info modal.
   Profile-level plan value only: maintenance TDEE − goal intake target.
   Does not use today's food, steps, or extra exercise. */
function getCalorieTargetToleranceKcal(){
  // Same ±100 band already encoded in calcCalorieGapRecommendation maintain strategy.
  return 100;
}
function getPlannedCalorieGap(profile){
  const p=profile||getActiveProfile();
  const missing=getMissingNutrientCalcFields(p);
  const maintenance=Math.round(Number(calcMaintenanceTDEE(p))||0);
  const goal=p?getHealthGoal(p):null;
  const intakeTarget=Math.round(Number(goal?.strategy?.daily_calories)||Number(calcTDEE(p))||0);
  const canPlan=maintenance>0&&intakeTarget>0;
  const planned=canPlan?Math.round(maintenance-intakeTarget):null;
  const tol=getCalorieTargetToleranceKcal();
  let rangeMin=null,rangeMax=null,hasRange=false,targetKind='none';
  if(planned!==null){
    if(planned>0){
      targetKind='deficit';
      rangeMin=Math.max(0,planned-tol);
      rangeMax=planned+tol;
      hasRange=true;
    }else if(planned<0){
      targetKind='surplus';
      const center=Math.abs(planned);
      rangeMin=Math.max(0,center-tol);
      rangeMax=center+tol;
      hasRange=true;
    }else{
      targetKind='maintain';
    }
  }
  let homeLine='目标缺口 --';
  const homeRangeLabel=goal?.deficit_plan_mode==='recommended'?'推荐范围':'目标区间';
  if(hasRange&&targetKind==='deficit') homeLine=`目标缺口 ${planned} · ${homeRangeLabel} ${rangeMin}–${rangeMax}`;
  else if(hasRange&&targetKind==='surplus') homeLine=`目标盈余 ${Math.abs(planned)} · 范围 ${rangeMin}–${rangeMax}`;
  else if(planned!==null&&planned>0) homeLine=`目标缺口约 ${planned}`;
  else if(planned!==null&&planned<0) homeLine=`目标盈余约 ${Math.abs(planned)}`;
  else if(targetKind==='maintain') homeLine='目标约 0 kcal';
  return {
    missing,maintenance,intakeTarget,goal,planned,rangeMin,rangeMax,
    hasRange,targetKind,tol,canPlan,homeLine,
    homeLineHTML:`<span class="gap-target">${escapeHTML(homeLine)}</span>`
  };
}
function formatHomeCalorieBalanceHTML(balance,hasFood){
  if(!hasFood) return '<span class="empty">未记录</span>';
  if(!balance||!balance.hasTarget) return '<span class="empty">目标待设置</span>';
  if(balance.type==='on-target') return escapeHTML(balance.displayValue);
  if(balance.type==='over') return '超出目标 '+balance.value+'<span class="unit">kcal</span>';
  return '还可摄入 '+Math.abs(balance.value)+'<span class="unit">kcal</span>';
}
function renderHomeCalorieMetricHTML(profile,date,valueHTML,valueClass){
  const pres=getPlannedCalorieGap(profile);
  return '<div class="home-metric home-metric--calorie"><span class="home-metric-icon calorie">'+icon('flame')+'</span><div class="home-metric-text">'+
    '<div class="home-metric-label-row"><span class="home-metric-label">热量余额</span>'+
    '<button type="button" class="home-metric-info-btn" data-calorie-info aria-label="目标热量缺口说明">'+icon('info')+'</button></div>'+
    '<div class="home-metric-value'+(valueClass?' '+valueClass:'')+'">'+valueHTML+'</div>'+
    '<div class="home-metric-status">'+pres.homeLineHTML+'</div></div></div>';
}
function bindHomeCalorieDeficitUI(wrap){
  wrap?.querySelectorAll('[data-calorie-info]').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      openCalorieDeficitExplain(btn);
    });
  });
}
function fillCalorieDeficitModal(){
  const content=document.getElementById('calorieDeficitContent');
  if(!content) return;
  const p=getActiveProfile();
  const pres=getPlannedCalorieGap(p);
  const missingNote=(!pres.canPlan&&pres.missing.length)
    ? `当前缺少${pres.missing.join('、')}，暂无法计算目标热量缺口。`
    : '';
  if(!pres.canPlan){
    content.innerHTML=`<div class="calorie-gap-section"><p class="calorie-gap-note">${escapeHTML(missingNote||'资料完善后将显示目标热量缺口。')}</p></div>`;
    return;
  }
  const center=Math.abs(pres.planned);
  const isSurplus=pres.targetKind==='surplus';
  const isMaintain=pres.targetKind==='maintain';
  const heroLabel=isSurplus?'目标热量盈余':(isMaintain?'热量目标':'目标热量缺口');
  const heroVal=isMaintain
    ? `0<span class="unit">kcal / 天</span>`
    : `${center}<span class="unit">kcal / 天</span>`;
  const deficitPlanMode=getHealthGoal(p)?.deficit_plan_mode||'personalized';
  const rangeHTML=pres.hasRange
    ? `<div class="calorie-gap-hero-range">${deficitPlanMode==='recommended'?'推荐执行范围':'目标区间'}：${pres.rangeMin}–${pres.rangeMax} kcal / 天</div>`
    : '';

  let meaning=isSurplus
    ? `<p class="calorie-gap-note">为了达到你当前的增肌目标，每天计划让摄入热量比预计消耗多约 ${center} kcal。</p>
      <p class="calorie-gap-note" style="margin-top:8px">不需要每天精确做到 ${center}，保持在目标范围附近即可。</p>`
    : (isMaintain
      ? `<p class="calorie-gap-note">当前目标是维持体重，计划摄入与预计消耗接近。</p>`
      : `<p class="calorie-gap-note">为了达到你当前的减脂目标，每天计划让摄入热量比预计消耗少约 ${center} kcal。</p>
        <p class="calorie-gap-note" style="margin-top:8px">不需要每天精确做到 ${center}，保持在目标范围附近即可。</p>`);

  if(pres.targetKind==='deficit'&&deficitPlanMode==='recommended'){
    meaning=`<p class="calorie-gap-note">这是 App 提供的默认减脂方案。每天以约 ${center} kcal 的计划缺口为中心，不需要精确做到 ${center}，保持在推荐执行范围附近即可。</p>`;
  }else if(pres.targetKind==='deficit'&&deficitPlanMode!=='recommended'){
    meaning=`<p class="calorie-gap-note">该目标根据你设置的每周减重速度或目标日期自动计算。</p>`;
  }

  // Today calculation summary (display-only). Reuse existing authoritative sources.
  const date=currentViewDate;
  const maintenanceKcal=Math.max(0,Math.round(Number(calcMaintenanceTDEE(p))||0));
  const exerciseSummary=getExerciseCalorieSummary(p,date,getTodayExercises(p),getTodayStepsRecords(p));
  const extraActivityCalories=Number(exerciseSummary.extraActivityCalories)||0;
  const todayTotalConsumption=maintenanceKcal+extraActivityCalories;
  const gapSigned=Number(pres.planned)||0; // positive=deficit, negative=surplus, 0=maintain
  const gapKcal=Math.abs(Math.round(gapSigned));
  const gapLabel=isSurplus?'目标热量盈余':'目标热量缺口';
  const dayStatus=getDailyCalorieStatus(p,date);
  const todayTargetIntakeKcal=Number(dayStatus.intakeTargetKcal)||0;
  const equationLine=isSurplus
    ? `${todayTotalConsumption} + ${gapKcal} = ${todayTargetIntakeKcal} kcal`
    : `${todayTotalConsumption} − ${gapKcal} = ${todayTargetIntakeKcal} kcal`;
  content.innerHTML=`<div class="calorie-gap-section">
      <div class="calorie-gap-hero-label">${heroLabel}</div>
      <div class="calorie-gap-hero-val">${heroVal}</div>
      ${rangeHTML}
    </div>
    <div class="calorie-gap-section">
      <div class="calorie-gap-kicker">这是什么意思？</div>
      ${meaning}
    </div>
    <div class="calorie-gap-section">
      <div class="calorie-gap-kicker">它和「还可摄入」是什么关系？</div>
      <p class="calorie-gap-note">App 已经把目标热量缺口计入了你的每日热量目标。</p>
      <div class="calorie-gap-kicker" style="margin-top:10px">今天的热量目标怎么算？</div>
      <div class="calorie-gap-row"><span>今日预计总消耗</span><b>${todayTotalConsumption} kcal</b></div>
      <div class="calorie-gap-row"><span>${gapLabel}</span><b>${gapKcal} kcal</b></div>
      <div class="calorie-gap-eq">${equationLine}</div>
      <div class="calorie-gap-row is-total"><span>今日目标摄入</span><b>${todayTargetIntakeKcal} kcal</b></div>

      <div class="calorie-gap-kicker" style="margin-top:12px">今日预计总消耗是什么？</div>
      <div class="calorie-gap-row"><span>预计维持消耗</span><b>${maintenanceKcal} kcal</b></div>
      <div class="calorie-gap-row"><span>今日额外活动</span><b>${extraActivityCalories>0?('+'+extraActivityCalories+' kcal'):'0 kcal'}</b></div>
      <div class="calorie-gap-row"><span>预计总消耗</span><b>${todayTotalConsumption} kcal</b></div>
      <p class="calorie-gap-note" style="margin-top:8px">预计维持消耗根据你的基础代谢和活动水平估算。日常活动已包含在活动水平中，只有当天活动超过活动基线的部分才会额外加入，避免重复计算。</p>
      <p class="calorie-gap-foot">预计总消耗属于估算值，会受到个人身体差异、实际活动强度和记录完整度影响。</p>
      <p class="calorie-gap-note" style="margin-top:8px">因此「还可摄入」表示在当前计划下，今天剩余可以摄入的热量。</p>
    </div>
    <div class="calorie-gap-section">
      <div class="calorie-gap-kicker">为什么目标缺口会改变？</div>
      <p class="calorie-gap-note">只有在以下情况发生明显变化时才需要重新计算：</p>
      <ul class="calorie-gap-list">
        <li>体重目标变化</li>
        <li>减脂目标变化</li>
        <li>目标速度变化</li>
        <li>相关身体资料变化</li>
      </ul>
      <p class="calorie-gap-note" style="margin-top:8px">吃饭、运动、步数变化不会让目标缺口当天频繁跳动。</p>
    </div>`;
}
let calorieDeficitTrigger=null;
function openCalorieDeficitExplain(trigger){
  const modal=document.getElementById('calorieDeficitModal');
  if(!modal) return;
  calorieDeficitTrigger=trigger||null;
  fillCalorieDeficitModal();
  modal.classList.add('show');
  GlassScrollLock.lock('modal:calorieDeficitModal');
  document.getElementById('calorieDeficitClose')?.focus({preventScroll:true});
  renderIcons(modal);
}
function closeCalorieDeficitExplain(){
  closeModal('calorieDeficitModal');
  calorieDeficitTrigger?.focus?.({preventScroll:true});
  calorieDeficitTrigger=null;
}

/* Unified calorie balance helper.
   This is the SINGLE source of truth for "热量余额" on the homepage.
   All modules (hero metric card, health summary, advice, tasks) MUST
   use this instead of computing their own difference.
   Returns the signed difference: actualCalories - targetCalories. */
function getCalorieBalance(actualCalories, targetCalories) {
  if (!Number.isFinite(actualCalories) || !Number.isFinite(targetCalories) || targetCalories <= 0) {
    return { value: null, displayValue: '目标待设置', status: '目标待设置', type: 'unknown', hasTarget: false };
  }
  var diff = Math.round(actualCalories - targetCalories);
  if (diff > 0) {
    return { value: diff, displayValue: '超出 ' + diff, status: '超出目标', type: 'over', hasTarget: true };
  }
  if (diff < 0) {
    return { value: diff, displayValue: '还可摄入 ' + Math.abs(diff), status: '目标内', type: 'under', hasTarget: true };
  }
  return { value: 0, displayValue: '已达今日目标', status: '已达目标', type: 'on-target', hasTarget: true };
}

/* Build a short deterministic summary for the homepage hero focus.
   This text never comes from AI – it uses only the unified calorie status.
   The AI may provide additional qualitative advice, but the hero text
   must always reflect correct, deterministic numbers. */
function buildDeterministicCalorieSummary(cs){
  if(!cs||!cs.hasFood) return '今天还没有饮食记录，建议先补充一餐。';
  if(!cs.hasTarget) return `今日已摄入 ${cs.intakeKcal} kcal，营养目标待完善。`;
  var balance=getCalorieBalance(cs.caloriesConsumed, cs.dynamicCalorieTarget);
  if(balance.type==='over'){
    if(cs.goalType==='fat_loss') return `今日摄入超过动态目标 ${balance.value} kcal，建议控制下一餐热量。`;
    if(cs.goalType==='muscle_gain') return `今日摄入超过动态目标 ${balance.value} kcal，保持蛋白质摄入。`;
    return `今日摄入超过动态目标 ${balance.value} kcal，单日波动无需焦虑。`;
  }
  if(balance.type==='under'){
    if(cs.exerciseCalories>0) return `今日运动增加了 ${cs.exerciseCalories} kcal 热量预算，目前仍在目标范围内，还可摄入约 ${Math.abs(balance.value)} kcal。`;
    if(cs.goalType==='fat_loss') return `今日仍在目标范围内，还可摄入约 ${Math.abs(balance.value)} kcal。`;
    if(cs.goalType==='muscle_gain') return `今日摄入距离目标还差 ${Math.abs(balance.value)} kcal，建议增加蛋白质和优质碳水。`;
    return `今日仍在目标范围内，还可摄入约 ${Math.abs(balance.value)} kcal。`;
  }
  return '今日摄入已达到动态热量目标。';
}
function mapLegacyGoalToHealthGoalType(goal){
  if(goal==='lose') return 'fat_loss';
  if(goal==='gain') return 'muscle_gain';
  return 'maintain';
}
function mapHealthGoalTypeToLegacy(type){
  return HEALTH_GOAL_TYPES[type]?.legacy||'maintain';
}
function createDefaultHealthGoalFromLegacy(p){
  const type=mapLegacyGoalToHealthGoalType(p?.goal);
  return {
    type,
    title:HEALTH_GOAL_TYPES[type]?.title||'健康保持',
    start_date:'',
    target_date:'',
    start_weight:p?.startWeight||null,
    target_weight:p?.goalWeight||null,
    weekly_change:type==='fat_loss'?0.3:null,
    plan_mode:type==='fat_loss'?'weekly_change':null,
    target_gain:type==='muscle_gain'?null:null,
    training_days:type==='muscle_gain'?3:null,
    exercise_days:type==='fitness'?3:null,
    sleep_target:type==='sleep_improve'?480:null,
    strategy:{}
  };
}
function normalizeHealthGoal(profile){
  const hasExistingRaw=!!(profile?.health_goal&&typeof profile.health_goal==='object');
  const raw=hasExistingRaw?profile.health_goal:createDefaultHealthGoalFromLegacy(profile);
  const type=HEALTH_GOAL_TYPES[raw.type]?raw.type:mapLegacyGoalToHealthGoalType(profile?.goal);
  const goal={
    ...raw,
    type,
    title:raw.title||HEALTH_GOAL_TYPES[type].title,
    start_weight:raw.start_weight??profile?.startWeight??null,
    target_weight:raw.target_weight??profile?.goalWeight??null,
    strategy:{...(raw.strategy||{})}
  };
  // Default deficit plan mode:
  // - Existing users without deficit_plan_mode: personalized
  // - New goals (no raw health_goal yet): recommended
  if(type==='fat_loss'&&!goal.deficit_plan_mode){
    goal.deficit_plan_mode=hasExistingRaw?'personalized':'recommended';
  }
  goal.strategy=calculateHealthGoalStrategy(profile,goal);
  return goal;
}
function calculateHealthGoalStrategy(profile,goal){
  const maintenance=calcMaintenanceTDEE(profile);
  const latest=getLatestWeight(profile);
  const weight=latest?.weight||goal.start_weight||60;
  const type=goal?.type||'maintain';
  let dailyCalories=maintenance||null;
  if(maintenance){
    if(type==='fat_loss'){
      const planMode=goal?.deficit_plan_mode||'personalized';
      const recommendedWeeklyChange=400*7/7700; // maps to 400 kcal/day deficit via weekly_change × 7700 / 7
      const effectiveWeeklyChange=planMode==='recommended'?recommendedWeeklyChange:(Number(goal.weekly_change)||0.3);
      dailyCalories=Math.round(maintenance-(effectiveWeeklyChange)*7700/7);
    }
    else if(type==='muscle_gain') dailyCalories=Math.round(maintenance+250);
    else dailyCalories=maintenance;
  }
  const proteinFactor=type==='muscle_gain'?1.8:(type==='fat_loss'?1.6:1.2);
  const exerciseDays=Number(goal.exercise_days||goal.training_days)||(type==='fitness'?4:(type==='fat_loss'||type==='muscle_gain'?3:2));
  const sleepTarget=Number(goal.sleep_target)||(type==='sleep_improve'?480:420);
  return {
    daily_calories:dailyCalories,
    protein_target:Math.round(weight*proteinFactor),
    exercise_days:exerciseDays,
    sleep_target:sleepTarget
  };
}
function getHealthGoal(profile){
  return normalizeHealthGoal(profile||getActiveProfile());
}
function getGoalProgress(profile){
  const goal=getHealthGoal(profile);
  const latest=getLatestWeight(profile);
  const current=latest?.weight||null;
  const start=Number(goal.start_weight)||Number(profile?.startWeight)||current||null;
  const target=Number(goal.target_weight)||Number(profile?.goalWeight)||null;
  let pct=0,remainingText='继续保持记录',weeksText='记录更多数据后估算';
  if(current&&start&&target&&start!==target){
    const total=Math.abs(start-target);
    const done=Math.max(0,Math.min(total,Math.abs(start-current)));
    pct=clampPercent(done/total*100);
    const remain=Math.max(0,Math.abs(current-target));
    remainingText=`距离目标还有 ${remain.toFixed(1)}kg`;
    const weekly=Math.abs(Number(goal.weekly_change)||0.5);
    if(weekly>0) weeksText=`预计约 ${Math.max(1,Math.ceil(remain/weekly))} 周完成`;
  }
  return {goal,current,start,target,pct,remainingText,weeksText};
}
function getGoalScoreWeights(profile){
  const type=getHealthGoal(profile).type;
  if(type==='fat_loss') return {diet:.40,exercise:.25,sleep:.20,water:.15};
  if(type==='muscle_gain') return {diet:.35,exercise:.35,sleep:.20,water:.10};
  if(type==='sleep_improve') return {diet:.20,exercise:.15,sleep:.50,water:.15};
  if(type==='fitness') return {diet:.20,exercise:.45,sleep:.20,water:.15};
  return {diet:.25,exercise:.25,sleep:.25,water:.25};
}
function getGoalAIContext(profile){
  const goal=getHealthGoal(profile);
  const progress=getGoalProgress(profile);
  return {
    type:goal.type,
    title:goal.title,
    start_date:goal.start_date||'',
    target_date:goal.target_date||'',
    start_weight:goal.start_weight||null,
    target_weight:goal.target_weight||null,
    progress_pct:progress.pct,
    remaining:progress.remainingText,
    strategy:goal.strategy,
    focus:HEALTH_GOAL_TYPES[goal.type]?.strategy||[]
  };
}
function getGoalFocusLabel(profile){
  const type=getHealthGoal(profile).type;
  if(type==='fat_loss') return '减脂目标优先：热量控制、蛋白质、有氧和力量训练';
  if(type==='muscle_gain') return '增肌目标优先：蛋白质、力量训练和适度热量盈余';
  if(type==='sleep_improve') return '睡眠目标优先：入睡时间、睡眠时长和规律性';
  if(type==='fitness') return '体能目标优先：运动频率、心肺能力和活动量';
  return '健康保持目标优先：饮食平衡、规律运动和睡眠稳定';
}
function getGoalProgressHeadline(profile){
  const progress=getGoalProgress(profile);
  const goal=progress.goal;
  const current=progress.current;
  if(current&&progress.target) return `${goal.title} · ${progress.remainingText}`;
  return `${goal.title} · 继续记录后估算进度`;
}
function getGoalMatchScore(profile,baseScore=null){
  const progress=getGoalProgress(profile);
  const type=progress.goal.type;
  if(progress.pct>0) return progress.pct;
  const snap=getHealthScoreData(profile,currentViewDate);
  const weights=getGoalScoreWeights(profile);
  const score=baseScore??(snap.healthScore?.score??0);
  if(type==='fat_loss'||type==='muscle_gain') return clampPercent((snap.dietPct*(weights.diet||0))+(snap.exercisePct*(weights.exercise||0))+(snap.sleepPct*(weights.sleep||0))+(snap.waterPct*(weights.water||0)));
  return clampPercent(score);
}
function getGoalAdjustmentAdvice(profile){
  const goal=getHealthGoal(profile);
  if(goal.type==='fat_loss'&&goal.start_weight&&goal.target_weight&&goal.target_date){
    const diff=Math.max(0,Number(goal.start_weight)-Number(goal.target_weight));
    const days=Math.max(1,(new Date(goal.target_date)-new Date(goal.start_date||todayStr()))/86400000);
    const weekly=diff/(days/7);
    if(weekly>0.8) return '当前减重节奏偏激，建议调整为每周下降约0.5kg。';
  }
  return '';
}
function bmiCategory(bmi){
  if(bmi<18.5) return {label:'偏瘦',cls:'under'};
  if(bmi<24) return {label:'正常',cls:'normal'};
  if(bmi<28) return {label:'偏胖',cls:'over'};
  return {label:'肥胖',cls:'obese'};
}
function calcBMR(p){
  if(!p.height||!p.gender) return null;
  const age=calcAge(p.birthDate);
  if(!age) return null;
  const w=getLatestWeight(p);
  if(!w) return null;
  const base=10*w.weight+6.25*p.height-5*age;
  return p.gender==='male'?Math.round(base+5):Math.round(base-161);
}
// Returns array of missing field labels that prevent TDEE/nutrient target calculation.
// Uses the SAME data sources as calcBMR/calcTDEE: birthDate for age, weightRecords for weight.
function getMissingNutrientCalcFields(p){
  if(!p) return ['档案'];
  const missing=[];
  if(!p.gender) missing.push('性别');
  if(!p.birthDate||!calcAge(p.birthDate)) missing.push('出生日期');
  if(!p.height) missing.push('身高');
  if(!getLatestWeight(p)) missing.push('体重记录');
  if(!p.activityLevel) missing.push('活动水平');
  return missing;
}
function calcTDEE(p){
  if(!p) return null;
  const bmr=calcBMR(p);
  if(!bmr) return null;
  if(!p.activityLevel) return null;
  const factors={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,veryActive:1.9};
  const tdee=Math.round(bmr*(factors[p.activityLevel]||1.2));
  const goal=getHealthGoal(p);
  if(goal?.strategy?.daily_calories) return goal.strategy.daily_calories;
  if(p.goal==='lose') return Math.round(tdee*0.8);
  if(p.goal==='gain') return Math.round(tdee*1.15);
  return tdee;
}
function calcNutrientTargets(p){
  const tdee=calcTDEE(p);
  if(!tdee) return null;
  const goal=getHealthGoal(p);
  const proteinTarget=goal?.strategy?.protein_target||Math.round(tdee*0.20/4);
  return {
    calories:tdee,
    carbs:Math.round(tdee*0.55/4),
    protein:proteinTarget,
    fat:Math.round(tdee*0.25/9),
    fiber:p.gender==='male'?30:25
  };
}
function calculateDailyWaterGoal(profile){
  const p=profile||getActiveProfile();
  const latest=getLatestWeight(p);
  const weight=latest?.weight||60;
  const base=weight*35;
  const exerciseBonus=getTodayExerciseMinutes(p)*8;
  const goal=Math.round((base+exerciseBonus)/50)*50;
  return Math.max(1500,Math.min(goal,4500));
}
function getSortedWeights(p){
  if(!p) return [];
  return [...(p.weightRecords||[])].sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
}
// 7日移动平均：跳过 null（无记录），用窗口内有效值求平均
function calcMovingAverage(data,windowSize=7){
  return data.map((_,i)=>{
    const start=Math.max(0,i-windowSize+1);
    const windowData=data.slice(start,i+1).filter(v=>v!==null&&v!==undefined);
    if(windowData.length===0) return null;
    return +(windowData.reduce((a,b)=>a+b,0)/windowData.length).toFixed(1);
  });
}
function getLatestWeight(p){
  const records=getSortedWeights(p);
  return records.length?records[records.length-1]:null;
}
function getPrevWeight(p){
  const records=getSortedWeights(p);
  return records.length>=2?records[records.length-2]:null;
}
function getRecordDate(r){
  return r.date || dateFromDateTimeValue(r.dateTime);
}
function calcFoodRecordCalories(record){
  return (record?.foods||[]).reduce((sum,f)=>sum+getFoodActualNutrition(f).calories,0);
}
function getDailyRecord(profile,date=currentViewDate){
  const p=profile||getActiveProfile();
  if(!p){
    console.error('[Health] getDailyRecord missing profile for date:',date);
    return {date,weight:[],steps:[],sleep:[],water:[],meals:[],food:[],exercise:[]};
  }
  return {
    date,
    weight:(p.weightRecords||[]).filter(r=>getRecordDate(r)===date),
    steps:(p.stepsRecords||[]).filter(r=>getRecordDate(r)===date),
    sleep:(p.sleepRecords||[]).filter(r=>getRecordDate(r)===date),
    water:(p.waterRecords||[]).filter(r=>getRecordDate(r)===date),
    meals:(p.foodRecords||[]).filter(r=>getRecordDate(r)===date),
    food:(p.foodRecords||[]).filter(r=>getRecordDate(r)===date),
    exercise:(p.exerciseRecords||[]).filter(r=>getRecordDate(r)===date)
  };
}
function getTrendData(profile,days=chartPeriod){
  const dates=[];
  const today=new Date();
  for(let i=days-1;i>=0;i--){
    const d=new Date(today);
    d.setDate(d.getDate()-i);
    dates.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
  }
  return {dates,weightRecords:getSortedWeights(profile)};
}
function getHealthMetricTrendSeries(profile,metric,days=chartPeriod,sharedDates=null){
  const trendData=getTrendData(profile,days);
  const dates=sharedDates||trendData.dates;
  const records=trendData.weightRecords;
  const dayLatestRecords=dates.map(date=>{
    const dayRecords=records.filter(r=>(r.date||dateFromDateTimeValue(r.dateTime))===date)
      .sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
    if(dayRecords.length>0) return dayRecords[dayRecords.length-1];
    const before=records.filter(r=>(r.date||dateFromDateTimeValue(r.dateTime))<=date)
      .sort((a,b)=>getRecordTime(b).localeCompare(getRecordTime(a)));
    return before.length>0?before[0]:null;
  });
  let values=dayLatestRecords.map(r=>r?r.weight:null);
  if(metric==='bmi') values=dayLatestRecords.map(r=>r?calcBMI(r.weight,profile.height):null);
  if(metric==='bodyFat') values=dayLatestRecords.map(r=>r?(r.bodyFat||calcBodyFatPercent(r.weight,profile)):null);
  return {dates,values};
}
function getTodayFoods(p){
  return getDailyRecord(p,currentViewDate).food;
}
function calcTodayIntake(p){
  const foods=getTodayFoods(p);
  const totals={calories:0,carbs:0,protein:0,fat:0,fiber:0};
  foods.forEach(r=>{
    r.foods.forEach(f=>{
      const n=getFoodActualNutrition(f);
      totals.calories+=n.calories;
      totals.carbs+=n.carbs;
      totals.protein+=n.protein;
      totals.fat+=n.fat;
      totals.fiber+=n.fiber;
    });
  });
  Object.keys(totals).forEach(k=>totals[k]=+totals[k].toFixed(1));
  return totals;
}
function getTodayExercises(p){
  return getDailyRecord(p,currentViewDate).exercise;
}
function calcTodayBurnedCalories(p){
  return getExerciseCalorieSummary(p,currentViewDate,getTodayExercises(p)).recordedExerciseCalories;
}
function calcExerciseCalories(exercise,duration,profile){
  const weight=getLatestWeight(profile);
  const w=weight?weight.weight:60;
  // MET formula: calories = MET * weight(kg) * duration(hour)
  return Math.round(exercise.met*w*(duration/60));
}
function calcStepsCalories(steps,profile){
  const weight=getLatestWeight(profile);
  const w=weight?weight.weight:60;
  // Average: ~0.04 kcal per step per kg (simplified)
  return Math.round(steps*0.0005*w);
}

// ==================== STEPS & SLEEP ====================
function getTodayStepsRecords(p){
  return getDailyRecord(p,currentViewDate).steps;
}
function getTodayTotalSteps(p){
  return getTodayStepsRecords(p).reduce((sum,r)=>sum+(r.steps||0),0);
}
function getTodaySleepRecords(p){
  return getDailyRecord(p,currentViewDate).sleep;
}
function getTodaySleepDuration(p){
  return getTodaySleepRecords(p).reduce((sum,r)=>sum+(r.duration||0),0);
}
function getTodayExerciseMinutes(p){
  const exercises=getTodayExercises(p);
  return exercises.reduce((sum,e)=>{
    const m=(e.detail||'').match(/(\d+)\s*分钟/);
    return sum+(m?+m[1]:0);
  },0);
}
function getTodayWaterRecords(p){
  return getDailyRecord(p,currentViewDate).water;
}
function getDateWaterRecords(p,date){
  return (p.waterRecords||[]).filter(r=>getRecordDate(r)===date);
}
function getTodayWaterTotal(p){
  return getTodayWaterRecords(p).reduce((sum,r)=>sum+(Number(r.amount)||0),0);
}
function formatWaterAmount(amount){
  const n=Math.round(Number(amount)||0);
  return `${n.toLocaleString()} ml`;
}
function formatSleepDuration(minutes){
  return formatDurationCN(minutes);
}
function formatDurationCN(minutes){
  const total=Math.round(Number(minutes)||0);
  if(total<=0) return '0分钟';
  const h=Math.floor(total/60);
  const m=total%60;
  if(h<=0) return `${m}分钟`;
  if(m<=0) return `${h}小时`;
  return `${h}小时${m}分钟`;
}

// ==================== DATE NAVIGATOR ====================
function getExerciseMinutesForDate(profile,date){
  const p=profile||getActiveProfile();
  if(!p){
    console.error('[Health] getExerciseMinutesForDate missing profile for date:',date);
    return 0;
  }
  return (p.exerciseRecords||[]).filter(r=>getRecordDate(r)===date).reduce((sum,r)=>{
    const explicit=Number(r.duration);
    if(Number.isFinite(explicit)&&explicit>0) return sum+explicit;
    const match=String(r.detail||'').match(/(\d+(?:\.\d+)?)\s*分/);
    return sum+(match?Number(match[1]):0);
  },0);
}

function calculateDailyWaterGoalForDate(profile,date){
  const p=profile||getActiveProfile();
  const latest=getLatestWeight(p);
  const weight=latest?.weight||60;
  const base=weight*35;
  const exerciseBonus=getExerciseMinutesForDate(p,date)*8;
  const goal=Math.round((base+exerciseBonus)/50)*50;
  return Math.max(1500,Math.min(goal,4500));
}

function getDailyCompletionDetails(profile,date){
  if(!profile) return {percent:0,hasData:false,items:{},summary:'暂无数据'};
  const daily=getDailyRecord(profile,date);
  const hasWeight=daily.weight.length>0;
  const hasFood=daily.food.length>0;
  const hasExercise=daily.exercise.length>0;
  const sleepMinutes=daily.sleep.reduce((sum,r)=>sum+(Number(r.duration)||0),0);
  const waterTotal=daily.water.reduce((sum,r)=>sum+(Number(r.amount)||0),0);
  const waterGoal=calculateDailyWaterGoalForDate(profile,date);
  const hasSleep=sleepMinutes>0;
  const hasWater=waterTotal>0;
  const items={
    weight:hasWeight?20:0,
    food:hasFood?20:0,
    exercise:hasExercise?20:0,
    sleep:Math.min(20,Math.round((sleepMinutes/420)*20)),
    water:waterGoal?Math.min(20,Math.round((waterTotal/waterGoal)*20)):0
  };
  const percent=Math.max(0,Math.min(100,Object.values(items).reduce((sum,v)=>sum+v,0)));
  const done=[
    hasWeight?'体重':'',
    hasFood?'饮食':'',
    hasExercise?'运动':'',
    sleepMinutes>=420?'睡眠达标':(hasSleep?'睡眠记录':''),
    waterGoal&&waterTotal>=waterGoal?'饮水达标':(hasWater?'饮水记录':'')
  ].filter(Boolean);
  return {
    percent,
    hasData:hasWeight||hasFood||hasExercise||hasSleep||hasWater,
    items,
    waterTotal,
    waterGoal,
    sleepMinutes,
    summary:done.length?done.join('、'):'暂无数据'
  };
}

function getDailyCompletion(profile,date){
  return getDailyCompletionDetails(profile,date).percent;
}

function completionRingClass(percent,hasData=true){
  if(!hasData) return 'no-data';
  if(percent>=100) return 'ring-full';
  if(percent>=70) return 'ring-high';
  if(percent>=40) return 'ring-mid';
  return 'ring-low';
}

let weekRailDragMoved=false;
let weekRailPointerId=null;
let weekRailSnapping=false;

function buildWeekStripDaysHTML(start){
  const labels=['周一','周二','周三','周四','周五','周六','周日'];
  const p=getActiveProfile();
  const today=dateFromDateTimeValue();
  return labels.map((label,i)=>{
    const date=addDays(start,i);
    const day=Number(date.slice(-2));
    const detail=getDailyCompletionDetails(p,date);
    const completion=detail.percent;
    const selected=date===currentViewDate;
    const isToday=date===today;
    const future=isFutureDate(date);
    const stateLabel=isToday&&selected?'今天 · 当前查看':(isToday?'今天':(selected?'当前查看':''));
    const titleText=`${formatDateTitle(date)}${stateLabel?` · ${stateLabel}`:''} · 记录完成度 ${future?'未来日期无法查看':(detail.hasData?completion+'%':'数据不足')} · ${future?'未来日期':detail.summary}`;
    const statusText=future?'未来':(detail.hasData?`${completion}%`:'数据不足');
    const statusClass=future?'is-empty':(isToday?'is-today':(selected?'is-selected':(!detail.hasData?'is-empty':'')));
    return `<div class="day-cell">
      <button class="day-circle ${completionRingClass(completion,detail.hasData)} ${isToday?'today':''} ${selected?'selected':''}" data-date="${date}" style="--completion-deg:${completion*3.6}deg;--completion:${completion}%" title="${titleText}">
        <span class="day-label">${label}</span>
        <span class="day-circle-inner">${day}</span>
        <span class="day-status ${statusClass}"><span class="day-status-label">${detail.hasData&&!future?'记录':''}</span><span class="day-status-value">${statusText}</span></span>
        <span class="day-progress" aria-hidden="true"><span class="day-progress-fill"></span></span>
      </button>
    </div>`;
  }).join('');
}

function getWeekRailWidth(){
  const viewport=document.getElementById('weekRailViewport');
  return viewport?.clientWidth||viewport?.getBoundingClientRect().width||1;
}

function setWeekRailTransform(offsetPx,animate){
  const track=document.getElementById('weekRailTrack');
  if(!track) return;
  const w=getWeekRailWidth();
  track.classList.toggle('is-snapping',!!animate);
  track.classList.toggle('is-dragging',!animate);
  track.style.transform=`translate3d(${-w+offsetPx}px,0,0)`;
}

function resetWeekRailPosition(animate=false){
  setWeekRailTransform(0,animate);
}

function renderDateNavigator(){
  const title=document.getElementById('dateTitleText');
  const picker=document.getElementById('datePickerInput');
  const track=document.getElementById('weekRailTrack');
  const todayBtn=document.getElementById('dateTodayBtn');
  if(!title||!picker||!track) return;
  picker.value=currentViewDate;
  const start=getMonday(currentViewDate);
  const today=dateFromDateTimeValue();
  const currentIsToday=currentViewDate===today;
  title.innerHTML=`<span class="date-title-main">
    <span class="date-title-kicker">${currentIsToday?'今天':'查看'}</span>
    <span class="date-title-date">${formatDateTitle(currentViewDate)}</span>
  </span>`;
  if(todayBtn) todayBtn.hidden=currentIsToday;
  track.innerHTML=`
    <div class="week-strip">${buildWeekStripDaysHTML(addDays(start,-7))}</div>
    <div class="week-strip" id="weekStrip">${buildWeekStripDaysHTML(start)}</div>
    <div class="week-strip">${buildWeekStripDaysHTML(addDays(start,7))}</div>`;
  weekRailSnapping=false;
  weekRailDragMoved=false;
  resetWeekRailPosition(false);
  track.querySelectorAll('.day-circle').forEach(btn=>{
    btn.addEventListener('click',e=>{
      if(weekRailDragMoved){
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      saveLocalViewDate(btn.dataset.date);
      renderDateDependentViews();
    });
  });
  bindWeekRailDrag();
}

function switchWeek(direction){
    saveLocalViewDate(addDays(currentViewDate,direction*7));
    renderDateDependentViews();
}

function bindWeekRailDrag(){
  const viewport=document.getElementById('weekRailViewport');
  const track=document.getElementById('weekRailTrack');
  if(!viewport||!track||viewport.dataset.weekRailBound==='1') return;
  viewport.dataset.weekRailBound='1';
  const DRAG_THRESHOLD=8;
  let startX=0,startY=0,lastX=0,lastT=0,velX=0,dragX=0,locked=null;

  function endPointer(e){
    if(e.pointerId!==weekRailPointerId) return;
    try{viewport.releasePointerCapture(e.pointerId);}catch(_){}
    weekRailPointerId=null;
    const wasHorizontal=locked==='x'&&weekRailDragMoved;
    locked=null;
    if(!wasHorizontal){
      weekRailDragMoved=false;
      resetWeekRailPosition(false);
      return;
    }
    const w=getWeekRailWidth();
    const threshold=Math.max(48,w*0.2);
    let dir=0;
    if(dragX<-threshold||velX<-0.45) dir=1;
    else if(dragX>threshold||velX>0.45) dir=-1;
    weekRailSnapping=true;
    const targetOffset=dir===0?0:(-dir*w);
    setWeekRailTransform(targetOffset,true);
    const currentTrack=document.getElementById('weekRailTrack');
    let settled=false;
    const settle=()=>{
      if(settled) return;
      settled=true;
      currentTrack?.removeEventListener('transitionend',onEnd);
      weekRailSnapping=false;
      if(dir){
        const nextTrack=document.getElementById('weekRailTrack');
        if(nextTrack){
          nextTrack.classList.remove('is-snapping','is-dragging');
          nextTrack.style.transition='none';
          nextTrack.style.transform=`translate3d(${-getWeekRailWidth()}px,0,0)`;
        }
        switchWeek(dir);
      }else{
        resetWeekRailPosition(false);
        setTimeout(()=>{weekRailDragMoved=false;},0);
      }
    };
    const onEnd=ev=>{
      if(ev.propertyName&&ev.propertyName!=='transform') return;
      settle();
    };
    currentTrack?.addEventListener('transitionend',onEnd);
    setTimeout(settle,360);
    velX=0;
    dragX=0;
  }

  viewport.addEventListener('pointerdown',e=>{
    if(e.button>0||weekRailSnapping||weekRailPointerId!==null) return;
    weekRailPointerId=e.pointerId;
    startX=e.clientX;
    startY=e.clientY;
    lastX=e.clientX;
    lastT=performance.now();
    velX=0;
    dragX=0;
    locked=null;
    weekRailDragMoved=false;
  });
  viewport.addEventListener('pointermove',e=>{
    if(e.pointerId!==weekRailPointerId) return;
    const dx=e.clientX-startX;
    const dy=e.clientY-startY;
    if(!locked){
      if(Math.abs(dx)<DRAG_THRESHOLD&&Math.abs(dy)<DRAG_THRESHOLD) return;
      locked=Math.abs(dx)>Math.abs(dy)?'x':'y';
      if(locked!=='x') return;
      try{viewport.setPointerCapture(e.pointerId);}catch(_){}
    }
    if(locked!=='x') return;
    weekRailDragMoved=true;
    dragX=dx;
    const now=performance.now();
    velX=(e.clientX-lastX)/Math.max(1,now-lastT);
    lastX=e.clientX;
    lastT=now;
    setWeekRailTransform(dragX,false);
    if(e.cancelable) e.preventDefault();
  },{passive:false});
  viewport.addEventListener('pointerup',endPointer);
  viewport.addEventListener('pointercancel',endPointer);
  viewport.addEventListener('click',e=>{
    if(!weekRailDragMoved) return;
    e.preventDefault();
    e.stopPropagation();
    weekRailDragMoved=false;
  },true);
  window.addEventListener('resize',()=>{
    if(weekRailPointerId!==null||weekRailSnapping) return;
    resetWeekRailPosition(false);
  });
}

// ==================== UI RENDERING ====================
function clampPercent(v){
  return Math.max(0,Math.min(100,Math.round(Number(v)||0)));
}
function getRecentDateList(days=7,endDate=currentViewDate){
  const [y,m,d]=endDate.split('-').map(Number);
  const base=new Date(y,m-1,d);
  const dates=[];
  for(let i=days-1;i>=0;i--){
    const dt=new Date(base);
    dt.setDate(base.getDate()-i);
    dates.push(`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`);
  }
  return dates;
}
// ================================================================
// Health Engine — Single source of truth for all health scoring
// ================================================================
// Internal: compute health score from a snap data object (no circular calls)
function _computeHealthScore(snap){
  const p=snap.profile;
  const weights=getGoalScoreWeights(p);
  const hasDiet=snap.hasFood;
  const hasExercise=snap.hasExercise;
  const hasSleep=snap.hasSleep;
  const hasWater=snap.hasWater;
  const dims=[{key:'diet',label:'饮食',has:hasDiet},{key:'exercise',label:'运动',has:hasExercise},{key:'sleep',label:'睡眠',has:hasSleep},{key:'water',label:'饮水',has:hasWater}];
  const coverageCount=dims.filter(d=>d.has).length;
  // Build factor list with per-dimension detail
  const factors=dims.map(d=>{
    if(d.key==='diet') return {name:d.label,hasData:d.has,pct:d.has?(snap.targetCals>0?snap.dietPct:50):0,detail:d.has?`${snap.intakeCalories} kcal${snap.targetCals>0?' · 动态目标 '+snap.targetCals+' kcal':''}`:'未记录'};
    if(d.key==='exercise') return {name:d.label,hasData:d.has,pct:d.has?snap.exercisePct:0,detail:d.has?`${snap.exerciseMinutes} 分钟`:'未记录'};
    if(d.key==='sleep') return {name:d.label,hasData:d.has,pct:d.has?snap.sleepPct:0,detail:d.has?formatShortSleep(snap.sleepMinutes):'未记录'};
    if(d.key==='water') return {name:d.label,hasData:d.has,pct:d.has?snap.waterPct:0,detail:d.has?`${snap.waterTotal}/${snap.waterGoal||0} ml`:'未记录'};
    return {name:d.label,hasData:false,pct:0,detail:'未记录'};
  });
  // --- Data insufficient: fewer than 2 dimensions recorded ---
  if(coverageCount<2){
    const recorded=dims.filter(d=>d.has).map(d=>d.label);
    const missing=dims.filter(d=>!d.has).map(d=>d.label);
    const reason=coverageCount===0
      ?'暂无健康数据记录，开始记录后将自动生成评分'
      :`当前仅记录${recorded.join('、')}，需至少2项数据才能生成评分`;
    return {
      score:null,
      status:'insufficient',
      factors,
      reason,
      missingDimensions:missing,
      dataCoverage:coverageCount,
      totalDimensions:4,
      scoreWeights:weights,
      updatedAt:new Date().toISOString()
    };
  }
  // --- Calculate weighted score from active dimensions only ---
  let activeWeightSum=0,weightedSum=0;
  factors.forEach(f=>{
    if(f.hasData){
      const w=weights[f.name==='饮食'?'diet':f.name==='运动'?'exercise':f.name==='睡眠'?'sleep':'water'];
      weightedSum+=f.pct*w;
      activeWeightSum+=w;
    }
  });
  const score=activeWeightSum>0?clampPercent(weightedSum/activeWeightSum):0;
  const status=score>=80?'good':score>=60?'fair':'needs_improvement';
  const missingDimensions=dims.filter(d=>!d.has).map(d=>d.label);
  return {
    score,
    status,
    factors,
    reason:getHealthStatusLabel(score).hint,
    missingDimensions,
    dataCoverage:coverageCount,
    totalDimensions:4,
    scoreWeights:weights,
    updatedAt:new Date().toISOString()
  };
}
// Public API: calculateHealthScore(profile, date) — the single entry point
// All health-related features MUST call this for scoring.
function calculateHealthScore(profile,date=currentViewDate){
  const p=profile||getActiveProfile();
  const snap=getHealthScoreData(p,date);
  return snap.healthScore;
}
function getHealthSnapshot(profile,date=currentViewDate){
  const p=profile||getActiveProfile();
  const daily=getDailyRecord(p,date);
  const targets=calcNutrientTargets(p);
  const intake={calories:0,carbs:0,protein:0,fat:0,fiber:0};
  daily.food.forEach(r=>{
    (r.foods||[]).forEach(f=>{
      const n=getFoodActualNutrition(f);
      intake.calories+=n.calories;
      intake.carbs+=n.carbs;
      intake.protein+=n.protein;
      intake.fat+=n.fat;
      intake.fiber+=n.fiber;
    });
  });
  Object.keys(intake).forEach(k=>intake[k]=+intake[k].toFixed(1));
  const intakeCalories=Math.round(intake.calories);
  const baseTargetCals=targets?Math.max(0,Math.round(Number(targets.calories)||0)):0;
  const exerciseSummary=getExerciseCalorieSummary(p,date,daily.exercise,daily.steps);
  const calorieBudget=calculateDailyCalorieBalance({
    baseCalorieTarget:baseTargetCals,
    exerciseCalories:exerciseSummary.extraActivityCalories,
    caloriesConsumed:intakeCalories
  });
  const targetCals=calorieBudget.dynamicCalorieTarget;
  const exerciseMinutes=daily.exercise.reduce((sum,e)=>{
    const explicit=Number(e.duration);
    if(Number.isFinite(explicit)&&explicit>0) return sum+explicit;
    const match=String(e.detail||'').match(/(\d+(?:\.\d+)?)\s*分/);
    return sum+(match?Number(match[1]):0);
  },0);
  const sleepMinutes=daily.sleep.reduce((sum,r)=>sum+(Number(r.duration)||0),0);
  const waterTotal=daily.water.reduce((sum,r)=>sum+(Number(r.amount)||0),0);
  const waterGoal=calculateDailyWaterGoalForDate(p,date);
  const healthGoal=getHealthGoal(p);
  const goalStrategy=healthGoal.strategy||{};
  const exerciseTarget=Number(goalStrategy.exercise_days)>=4?40:30;
  const sleepTarget=Number(goalStrategy.sleep_target)||420;
  const dietPct=targetCals>0?clampPercent(intakeCalories/targetCals*100):0;
  const exercisePct=clampPercent(exerciseMinutes/exerciseTarget*100);
  const sleepPct=clampPercent(sleepMinutes/sleepTarget*100);
  const waterPct=waterGoal>0?clampPercent(waterTotal/waterGoal*100):0;
  const scoreWeights=getGoalScoreWeights(p);
  // --- Health Engine: unified scoring via _computeHealthScore ---
  const _snapData={
    profile:p,date,daily,targets,intake,intakeCalories,targetCals,baseTargetCals,
    calorieBudget,
    exerciseCalories:calorieBudget.exerciseCalories,
    recordedExerciseCalories:exerciseSummary.recordedExerciseCalories,
    activityAllowanceCalories:exerciseSummary.activityAllowanceCalories,
    activityCalories:exerciseSummary.activityCalories,
    stepCalories:exerciseSummary.stepCalories,
    extraActivityCalories:exerciseSummary.extraActivityCalories,
    exerciseMinutes,
    exerciseTarget,sleepTarget,healthGoal,goalStrategy,
    sleepMinutes,waterTotal,waterGoal,dietPct,exercisePct,sleepPct,waterPct,scoreWeights,
    hasFood:daily.food.length>0,
    hasExercise:daily.exercise.length>0,
    hasSleep:sleepMinutes>0,
    hasWater:waterTotal>0,
    hasWeight:daily.weight.length>0,
    latestWeight:getLatestWeight(p)
  };
  const healthScore=_computeHealthScore(_snapData);
  return {..._snapData,healthScore,score:healthScore.score??0};
}
function getHealthScoreData(profile,date=currentViewDate){
  // 首页健康状态、AI健康教练、AI行动计划、健康详情统一读取这个入口。
  return getHealthSnapshot(profile,date);
}
// ── 统一首页状态判断 ──
// 所有模块根据这个状态决定展示内容，避免各自单独判断。
// status: "empty"(无数据) / "partial"(少量数据) / "complete"(完整数据)
function getDashboardStatus(profile,date=currentViewDate){
  const snap=getHealthScoreData(profile,date);
  const hasFood=snap.hasFood;
  const hasWater=snap.hasWater;
  const hasExercise=snap.hasExercise;
  const hasSleep=snap.hasSleep;
  const availableDataCount=[hasFood,hasWater,hasExercise,hasSleep].filter(Boolean).length;
  let status='empty';
  if(availableDataCount===0) status='empty';
  else if(availableDataCount<2) status='partial';
  else status='complete';
  return {status,hasFood,hasWater,hasExercise,hasSleep,availableDataCount,snap};
}
function getHealthStatusLabel(score){
  if(score>=80) return {label:'优秀',hint:'今日健康状态很好，继续保持！'};
  if(score>=60) return {label:'良好',hint:'还不错，再努力一点就更好了。'};
  if(score>=30) return {label:'一般',hint:'有些项目还需要补充记录。'};
  return {label:'待改善',hint:'今天记录较少，快开始记录吧。'};
}
function formatShortSleep(minutes){
  if(!minutes||minutes<=0) return '未记录';
  const h=Math.floor(minutes/60);
  const m=Math.round(minutes%60);
  return m?`${h}h${m}m`:`${h}h`;
}
function buildTodayHealthAiSummary(profile,snap){
  window.todayHealthAiSummaryCache=window.todayHealthAiSummaryCache||{};
  const key=[
    profile.id,snap.date,snap.intakeCalories,snap.targetCals,snap.exerciseMinutes,snap.exerciseCalories,snap.recordedExerciseCalories,
    snap.sleepMinutes,snap.waterTotal,snap.waterGoal,snap.daily.food.length,
    snap.daily.exercise.length,snap.daily.sleep.length,snap.daily.water.length
  ].join('|');
  if(window.todayHealthAiSummaryCache[key]) return window.todayHealthAiSummaryCache[key];
  const hasAny=snap.hasFood||snap.hasExercise||snap.hasSleep||snap.hasWater||snap.hasWeight;
  const sleepQMap={good:'良好',normal:'一般',poor:'较差'};
  const sleepQuality=snap.daily.sleep.length?sleepQMap[snap.daily.sleep[snap.daily.sleep.length-1].quality||'normal']||'一般':'未记录';
  let lead='今天记录还不多，先从饮食、运动、睡眠或饮水补充一项开始。';
  if(hasAny){
    const low=[];
    if(snap.dietPct<50) low.push('饮食');
    if(snap.exercisePct<50) low.push('运动');
    if(snap.waterPct<60) low.push('饮水');
    if(snap.sleepPct<70) low.push('睡眠');
    const scoreLabel=snap.healthScore?.score!==null&&snap.healthScore?.score!==undefined?getHealthStatusLabel(snap.score).label:'数据不足';
    lead=low.length?`今天状态${scoreLabel}，${low.slice(0,2).join('、')}还可以继续补充。`:`今天整体状态不错，主要健康习惯都有记录。`;
  }
  const budget=snap.calorieBudget||calculateDailyCalorieBalance({baseCalorieTarget:snap.baseTargetCals,exerciseCalories:snap.exerciseCalories,caloriesConsumed:snap.intakeCalories});
  const dietText=snap.hasFood
    ? `今日摄入约 ${snap.intakeCalories} kcal${snap.targetCals?`，动态目标 ${snap.targetCals} kcal`:''}${budget.remainingCalories>0?`，还可摄入约 ${budget.remainingCalories} kcal`:budget.calorieBalance>0?`，超出约 ${budget.calorieBalance} kcal`:'，已达到今日目标'}，蛋白质约 ${Math.round(snap.intake.protein)}g。`
    : '今天暂未记录饮食，可以先补充一餐记录。';
  const exerciseText=snap.hasExercise
    ? `今日运动 ${Math.round(snap.exerciseMinutes)} 分钟，记录消耗约 ${snap.recordedExerciseCalories} kcal${snap.exerciseCalories>0?`，其中 ${snap.exerciseCalories} kcal 计入动态预算`:''}。`
    : '今天暂未记录运动，可以适当增加轻量活动。';
  const sleepText=snap.hasSleep
    ? `睡眠 ${formatSleepDuration(snap.sleepMinutes)}，质量：${sleepQuality}。`
    : '今天暂未记录睡眠，可以补充昨晚睡眠情况。';
  const waterNeed=Math.max(0,(snap.waterGoal||0)-snap.waterTotal);
  const waterText=snap.hasWater
    ? `当前饮水 ${snap.waterTotal} ml${snap.waterGoal?`，完成 ${snap.waterPct}%`:''}${waterNeed>0?`，还差约 ${waterNeed} ml。`:'，已达到今日目标。'}`
    : '今天暂未记录饮水，可以先快速记录一杯水。';
  let advice='保持稳定记录比追求单日完美更重要。';
  const goalType=snap.healthGoal?.type||'maintain';
  if(goalType==='fat_loss'&&snap.hasFood&&snap.targets?.protein&&snap.intake.protein<snap.targets.protein) advice=`围绕减脂目标，今天优先把蛋白质补到约 ${Math.round(snap.targets.protein)}g，并避免额外高糖零食。`;
  else if(goalType==='muscle_gain'&&snap.exerciseMinutes<30) advice='围绕增肌目标，今天优先安排力量训练或抗阻动作，不要只做低强度有氧。';
  else if(goalType==='sleep_improve') advice=`围绕睡眠目标，今晚尽量接近 ${formatShortSleep(snap.sleepTarget)}，并固定睡前准备时间。`;
  else if(goalType==='fitness'&&snap.exerciseMinutes<snap.exerciseTarget) advice=`围绕体能目标，今天还可补足到 ${snap.exerciseTarget} 分钟活动量。`;
  else if(snap.waterPct>0&&snap.waterPct<60) advice='今天饮水偏少，晚些时候可以继续小口补充。';
  else if(snap.hasFood&&budget.remainingCalories>0&&snap.dietPct<60) advice=`今日仍在动态目标范围内，还可按需要摄入约 ${budget.remainingCalories} kcal，优先补充优质蛋白和蔬菜。`;
  else if(!snap.hasExercise) advice='如果时间允许，可以安排 10-20 分钟散步或拉伸。';
  const result={lead:`${getGoalProgressHeadline(profile)}。${lead}`,dietText,exerciseText,sleepText,waterText,advice};
  window.todayHealthAiSummaryCache[key]=result;
  return result;
}
function getSevenDayTrend(profile){
  const p=profile||getActiveProfile();
  const dates=getRecentDateList(7,currentViewDate);
  const weightRecords=(p.weightRecords||[]).filter(r=>dates.includes(getRecordDate(r))).sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
  const firstWeight=weightRecords[0]?.weight;
  const lastWeight=weightRecords[weightRecords.length-1]?.weight;
  const weightDelta=(Number.isFinite(firstWeight)&&Number.isFinite(lastWeight))?+(lastWeight-firstWeight).toFixed(1):null;
  let totalCalories=0,exerciseCount=0,exerciseMinutes=0,exerciseCalories=0,sleepTotal=0,sleepDays=0,waterPctTotal=0;
  dates.forEach(date=>{
    const snap=getHealthSnapshot(p,date);
    totalCalories+=snap.intakeCalories;
    exerciseCount+=snap.daily.exercise.length;
    exerciseMinutes+=snap.exerciseMinutes;
    exerciseCalories+=snap.recordedExerciseCalories;
    if(snap.sleepMinutes>0){sleepTotal+=snap.sleepMinutes;sleepDays++;}
    waterPctTotal+=snap.waterPct;
  });
  return {
    dates,
    weight:{first:firstWeight,last:lastWeight,delta:weightDelta,count:weightRecords.length},
    avgCalories:Math.round(totalCalories/dates.length),
    exercise:{count:exerciseCount,minutes:Math.round(exerciseMinutes),calories:Math.round(exerciseCalories)},
    avgSleep:sleepDays?Math.round(sleepTotal/sleepDays):0,
    avgWaterPct:clampPercent(waterPctTotal/dates.length)
  };
}
function renderHealthTrendSection(profile){
  const trend=getSevenDayTrend(profile);
  const weightText=trend.weight.count>=2?`${trend.weight.last}kg`:(trend.weight.count===1?`${trend.weight.last}kg`:'暂无');
  const deltaText=trend.weight.count>=2?`${trend.weight.delta>0?'↑':'↓'}${Math.abs(trend.weight.delta)}kg`:'记录不足';
  const deltaNote=trend.weight.count>=2?(trend.weight.delta>0?'近7天上升':trend.weight.delta<0?'近7天下降':'近7天稳定'):'补充体重后展示';
  const trendSummary=trend.weight.count>=2?`体重${deltaText}，${deltaNote}`:'近7天趋势分析';
  return `
    <details class="dash-panel dash-trend-panel dash-collapse" data-target="chartCard">
      <summary class="dash-collapse-head">
        <div class="dash-collapse-title">${icon('chart')} 本周趋势</div>
        <div class="dash-collapse-summary">${escapeHTML(trendSummary)}</div>
      </summary>
      <div class="tho-trend-grid">
        <div class="tho-trend-item"><b>体重</b><div class="tho-trend-val">${weightText}</div><div class="tho-trend-note">${deltaText} · ${deltaNote}</div></div>
        <div class="tho-trend-item"><b>饮食</b><div class="tho-trend-val">${trend.avgCalories}</div><div class="tho-trend-note">日均 kcal</div></div>
        <div class="tho-trend-item"><b>运动</b><div class="tho-trend-val">${trend.exercise.count}次</div><div class="tho-trend-note">${trend.exercise.minutes}分钟 · ${trend.exercise.calories}kcal</div></div>
        <div class="tho-trend-item"><b>睡眠</b><div class="tho-trend-val">${formatShortSleep(trend.avgSleep)}</div><div class="tho-trend-note">有记录日均</div></div>
        <div class="tho-trend-item"><b>饮水</b><div class="tho-trend-val">${trend.avgWaterPct}%</div><div class="tho-trend-note">平均完成度</div></div>
      </div>
    </details>`;
}
const aiWeeklyReportInFlight = {};
function getWeeklyReportCache(){
  try{return JSON.parse(localStorage.getItem(AI_WEEKLY_REPORT_CACHE_KEY)||'{}')||{}}
  catch(e){return {}}
}
function saveWeeklyReportCache(cache){
  try{localStorage.setItem(AI_WEEKLY_REPORT_CACHE_KEY,JSON.stringify(cache||{}))}catch(e){}
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
  try{return JSON.parse(localStorage.getItem(AI_HEALTH_PROFILE_CACHE_KEY)||'{}')||{}}
  catch(e){return {}}
}
function saveHealthProfileCache(cache){
  try{localStorage.setItem(AI_HEALTH_PROFILE_CACHE_KEY,JSON.stringify(cache||{}))}catch(e){}
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
function renderCoupleHealthSection(activeSnap){
  const me=getDeviceOwnerProfile();
  const other=getPartnerProfile();
  if(!me||!other||activeSnap?.profile?.id!==me.id) return '';
  const otherSnap=getHealthScoreData(other,currentViewDate);
  const meHasScore=activeSnap.healthScore?.score!==null&&activeSnap.healthScore?.score!==undefined;
  const otherHasScore=otherSnap.healthScore?.score!==null&&otherSnap.healthScore?.score!==undefined;
  const meScoreDisplay=meHasScore?activeSnap.score:'--';
  const otherScoreDisplay=otherHasScore?otherSnap.score:'--';
  const validScores=[meHasScore?activeSnap.score:null,otherHasScore?otherSnap.score:null].filter(s=>s!==null);
  const bothScore=validScores.length?Math.round(validScores.reduce((a,b)=>a+b,0)/validScores.length):0;
  let note='你们的数据会按当前选择分别展示，不会混合。';
  if((activeSnap.hasFood||activeSnap.hasExercise||activeSnap.hasSleep||activeSnap.hasWater)&&(otherSnap.hasFood||otherSnap.hasExercise||otherSnap.hasSleep||otherSnap.hasWater)){
    note=`今天你们一起完成了约 ${bothScore}% 的健康目标，继续互相提醒就很好。`;
  }else if(activeSnap.hasWater||otherSnap.hasWater){
    note='今天已有饮水记录，可以轻松提醒对方也补一杯水。';
  }else if(activeSnap.hasExercise||otherSnap.hasExercise){
    note='今天已有运动记录，适合互相鼓励保持活动。';
  }
  return `
    <details class="tho-v2-section">
      <summary>
        <span class="tho-v2-title">${icon('users')} 我们的健康状态</span>
        <span class="tho-v2-mini">陪伴式对比 <span class="tho-v2-arrow">▼</span></span>
      </summary>
      <div class="tho-v2-body">
        <div class="tho-couple-score">
          <div class="tho-couple-item"><div class="name">${escapeHTML(getDisplayName(me))}</div><div class="score">${meScoreDisplay}</div><div class="tho-trend-note">今日健康分</div></div>
          <div class="tho-couple-item"><div class="name">${escapeHTML(getDisplayName(other))}</div><div class="score">${otherScoreDisplay}</div><div class="tho-trend-note">今日健康分</div></div>
        </div>
        <div class="tho-couple-note">${escapeHTML(note)}</div>
      </div>
    </details>`;
}
function renderTodayHealthV2Sections(profile,snap){
  return `
    <div class="tho-v2-stack">
      ${renderHealthTrendSection(profile)}
    </div>`;
}
function buildTodayReminders(snap){
  const reminders=[];
  // Water
  if(snap.waterPct>=100){
    reminders.push({icon:'💧',text:'饮水已达标，继续保持',type:'good'});
  }else if(snap.hasWater){
    const need=Math.max(0,(snap.waterGoal||0)-snap.waterTotal);
    if(need>0) reminders.push({icon:'💧',text:`距离目标还差 ${need} ml`,type:'warn'});
  }else{
    reminders.push({icon:'💧',text:'今天还没有饮水记录',type:'warn'});
  }
  // Exercise
  if(snap.exercisePct>=100){
    reminders.push({icon:'🏃',text:'运动目标已完成',type:'good'});
  }else if(snap.hasExercise){
    const need=30-snap.exerciseMinutes;
    if(need>0) reminders.push({icon:'🏃',text:`已运动${snap.exerciseMinutes}分钟，再坚持${need}分钟`,type:'warn'});
  }else{
    reminders.push({icon:'🏃',text:'今天还没有运动记录',type:'warn'});
  }
  // Sleep
  if(snap.sleepPct>=100){
    reminders.push({icon:'😴',text:'睡眠充足，精力充沛',type:'good'});
  }else if(snap.hasSleep){
    if(snap.sleepMinutes<360) reminders.push({icon:'😴',text:`睡眠仅${formatShortSleep(snap.sleepMinutes)}，略不足`,type:'warn'});
  }else{
    reminders.push({icon:'😴',text:'昨日睡眠未记录',type:'warn'});
  }
  // Diet
  if(!snap.hasFood){
    reminders.push({icon:'🍚',text:'今天还没有饮食记录',type:'warn'});
  }
  // All complete
  const warnCount=reminders.filter(r=>r.type==='warn').length;
  if(warnCount===0){
    return [{icon:'✨',text:'今天状态很好，继续保持',type:'good'}];
  }
  return reminders.slice(0,4);
}
const AI_HEALTH_COACH_MANUAL_COOLDOWN = 30*60*1000;
const aiHealthCoachInFlight = {};
function getHealthCoachCache(){
  try{return JSON.parse(localStorage.getItem(AI_HEALTH_COACH_CACHE_KEY)||'{}')||{}}
  catch(e){return {}}
}
function saveHealthCoachCache(cache){
  try{localStorage.setItem(AI_HEALTH_COACH_CACHE_KEY,JSON.stringify(cache||{}))}catch(e){}
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
  // summary: prefer deterministic calorie summary when available.
  // This prevents AI from inventing conflicting calorie numbers (e.g. "热量超支477kcal").
  const detSummary=calStatus?buildDeterministicCalorieSummary(calStatus):null;
  return {
    // Health Engine: always use unified score, never let AI override
    health_score:snap.healthScore?.score,
    summary:String(detSummary||obj.summary||fallback.summary).slice(0,80),
    diet_advice:String(obj.diet_advice||fallback.diet_advice).slice(0,160),
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
      ? `超出动态目标：${csInput.calorie_balance} kcal`
      : `今日还可摄入：${Math.max(0,csInput.remaining_calories)} kcal`,
    csInput.maintenance_kcal>0?`预计今日总消耗（维持热量）：${csInput.maintenance_kcal} kcal`:'',
    csInput.maintenance_kcal>0
      ? (csInput.energy_deficit_kcal>0
        ? `预计实际热量缺口：${csInput.energy_deficit_kcal} kcal`
        : `预计热量盈余：${csInput.energy_surplus_kcal} kcal`)
      : '',
    csInput.recommended_deficit_min>0?`建议热量缺口范围：${csInput.recommended_deficit_min}～${csInput.recommended_deficit_max} kcal`:''
  ].filter(Boolean).join('\n');
  const prompt=`你是一个健康App中的AI健康教练。请根据用户健康数据和health_goal生成个性化建议，只返回严格JSON，不要Markdown，不要解释。JSON字段必须为：summary(string, 40字以内), diet_advice(string), exercise_advice(string), water_advice(string), sleep_advice(string), action_plan(array，最多4项，每项为{task:string,done:boolean,type:string})。

【重要规则】以下数值已由系统计算完成，你不得自行修改、重新计算或创造任何热量、缺口、超支、盈余等数值。summary中如需提及热量，必须直接引用以下数值，禁止自己推算：
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
  try{return JSON.parse(localStorage.getItem(AI_DAILY_TASKS_CACHE_KEY)||'{}')||{}}
  catch(e){return {}}
}
function saveDailyTasksCache(cache){
  try{localStorage.setItem(AI_DAILY_TASKS_CACHE_KEY,JSON.stringify(cache||{}))}catch(e){}
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
      ? `超出动态目标：${csInput.calorie_balance} kcal`
      : `今日还可摄入：${Math.max(0,csInput.remaining_calories)} kcal`,
    csInput.maintenance_kcal>0?`预计今日总消耗（维持热量）：${csInput.maintenance_kcal} kcal`:'',
    csInput.maintenance_kcal>0
      ? (csInput.energy_deficit_kcal>0
        ? `预计实际热量缺口：${csInput.energy_deficit_kcal} kcal`
        : `预计热量盈余：${csInput.energy_surplus_kcal} kcal`)
      : '',
    csInput.recommended_deficit_min>0?`建议热量缺口范围：${csInput.recommended_deficit_min}～${csInput.recommended_deficit_max} kcal`:''
  ].filter(Boolean).join('\n');
  const prompt=`你是健康App里的AI每日健康行动计划生成器。请严格基于输入数据和health_goal生成用户今天能完成的1-5个具体任务。规则：1. 任务必须服从用户当前目标，减脂不要生成增肌增重任务，增肌不要只给有氧消耗任务，睡眠目标要优先分析入睡时间、睡眠时长和规律。2. 已达标的项目不要继续推荐同类任务，例如饮水已达到或超过目标就不要推荐继续喝水；可在summary里说明“饮水目标已完成，保持当前状态”。3. 无健康记录或数据很少时，只给1-2个具体启动任务，不要输出“保持健康、改善生活方式、注意饮食、适当运动”这类空泛建议。4. 健康状态良好时最多给1-2个低负担任务，不要制造任务压力。5. high表示当前最需要改善的问题，medium表示建议优化，low表示保持习惯。6. 每个任务必须包含具体动作和数量/时长/时间，例如喝多少ml水、晚饭后步行多少分钟、增加多少g蛋白质、几点准备睡眠。7. type只能是water、food、exercise、sleep、habit；action按type填写：water=open_water_record，food=open_food_record，exercise=open_exercise_record，sleep=open_sleep_record，habit=open_today_overview。8. 不要医疗诊断。

【重要规则】以下数值已由系统计算完成，你不得自行修改、重新计算或创造任何热量、缺口、超支、盈余等数值。summary和task描述中如需提及热量，必须直接引用以下数值，禁止自己推算：
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
function renderHomeNutritionCard(profile,snap){
  const card=document.getElementById('homeNutritionCard');
  const wrap=document.getElementById('homeNutritionContent');
  const dateEl=document.getElementById('homeNutritionDate');
  if(!card||!wrap||!profile||!snap) return;
  card.hidden=false;
  if(dateEl) dateEl.textContent=formatDate(currentViewDate);
  const intake=snap.intake||{calories:0,protein:0,carbs:0,fat:0,fiber:0};
  const targets=snap.targets||null;
  const calories=Math.round(snap.intakeCalories||intake.calories||0);
  const calorieTarget=Number(snap.targetCals)||0;
  const baseCalorieTarget=Number(snap.baseTargetCals||(targets?targets.calories:0))||0;
  const activityDetail=buildHomeActivityTargetDetailMarkup(snap);
  const calorieTargetMarkup=calorieTarget>0
    ?'<span class="home-diet-target-main">动态目标 '+calorieTarget+' kcal</span>'+activityDetail
    :'<span class="home-diet-target-main">目标待设置</span>';
  const caloriePct=calorieTarget>0?Math.min(100,Math.round(calories/calorieTarget*100)):0;
  var nutrients=[
    {key:'carbs',label:'碳水',cls:'carbs'},
    {key:'protein',label:'蛋白质',cls:'protein'},
    {key:'fat',label:'脂肪',cls:'fat'}
  ];
  var dietRingR=42,dietRingCirc=2*Math.PI*dietRingR;
  var carbsG=Number(intake.carbs||0),proteinG=Number(intake.protein||0),fatG=Number(intake.fat||0);
  var carbsCal=carbsG*4,proteinCal=proteinG*4,fatCal=fatG*9;
  var totalNutriCal=carbsCal+proteinCal+fatCal;
  var dietSegs='';
  if(totalNutriCal>0){
    var carbsLen=dietRingCirc*(carbsCal/totalNutriCal);
    var proteinLen=dietRingCirc*(proteinCal/totalNutriCal);
    var fatLen=dietRingCirc*(fatCal/totalNutriCal);
    dietSegs='<circle cx="50" cy="50" r="'+dietRingR+'" fill="none" stroke="var(--home-amber)" stroke-width="9" stroke-dasharray="'+carbsLen+' '+(dietRingCirc-carbsLen)+'" stroke-dashoffset="0" transform="rotate(-90 50 50)"/>'+
      '<circle cx="50" cy="50" r="'+dietRingR+'" fill="none" stroke="var(--home-green)" stroke-width="9" stroke-dasharray="'+proteinLen+' '+(dietRingCirc-proteinLen)+'" stroke-dashoffset="'+(-carbsLen)+'" transform="rotate(-90 50 50)"/>'+
      '<circle cx="50" cy="50" r="'+dietRingR+'" fill="none" stroke="var(--home-red)" stroke-width="9" stroke-dasharray="'+fatLen+' '+(dietRingCirc-fatLen)+'" stroke-dashoffset="'+(-carbsLen-proteinLen)+'" transform="rotate(-90 50 50)"/>';
  }
  var nutrientNames=nutrients.map(function(item){
    return '<div class="home-diet-nutrient-name '+item.cls+'"><span class="home-nutrient-dot"></span>'+
      '<span class="home-diet-nutrient-name-text">'+item.label+'</span></div>';
  }).join('');
  var nutrientData=nutrients.map(function(item){
    var value=roundFoodValue(intake[item.key]||0,1);
    var target=Number(targets?targets[item.key]:0)||0;
    var pct=target>0?Math.min(100,Math.round(value/target*100)):0;
    return '<div class="home-diet-nutrient-data-row '+item.cls+'">'+
      '<div class="home-diet-nutrient-data-head">'+
      '<span class="home-diet-nutrient-data-val">'+value+'g</span>'+
      '<span class="home-diet-nutrient-data-pct">'+(target>0?pct+'%':'--')+'</span></div>'+
      '<div class="home-diet-nutrient-data-bar"><div class="home-diet-nutrient-data-fill" style="width:'+pct+'%"></div></div></div>';
  }).join('');
  wrap.innerHTML='<div class="home-diet-card">'+
    '<div class="home-diet-title-row"><span class="home-diet-title">今日饮食概览</span>'+
    '<span class="home-diet-date">'+formatDate(currentViewDate)+'</span></div>'+
    '<div class="home-diet-body">'+
    '<div class="home-diet-ring-section">'+
    '<div class="home-diet-ring"><svg width="100" height="100" viewBox="0 0 100 100">'+
    '<circle cx="50" cy="50" r="'+dietRingR+'" fill="none" stroke="var(--home-track-bg)" stroke-width="9"/>'+
    dietSegs+
    '</svg></div></div>'+
    '<div class="home-diet-calorie-section">'+
    '<div class="home-diet-calorie-primary">'+
    '<div class="home-diet-intake-label">已摄入</div>'+
    '<div class="home-diet-intake-val">'+calories+'<span class="unit">kcal</span></div></div>'+
    '<div class="home-diet-target">'+calorieTargetMarkup+'</div></div>'+ 
    '<div class="home-diet-nutrient-names">'+nutrientNames+'</div>'+
    '<div class="home-diet-nutrient-data">'+nutrientData+'</div></div></div>';
}
function clearHomeSecondaryCards(){
  const nutrition=document.getElementById('homeNutritionCard');
  const insights=document.getElementById('homeInsightsContent');
  if(nutrition) nutrition.hidden=true;
  if(insights) insights.innerHTML='';
}
function renderTodayHealthOverview(){
  const p=getActiveProfile();
  if(!p) console.error('[Render] renderTodayHealthOverview missing active profile');
  const dateEl=document.getElementById('todayHealthDate');
  if(dateEl) dateEl.textContent=formatDate(currentViewDate);
  const wrap=document.getElementById('todayHealthContent');
  if(!wrap){
    console.error('[Render] #todayHealthContent not found');
    return;
  }
  if(isFutureDate(currentViewDate)){
    clearHomeSecondaryCards();
    wrap.innerHTML=`
      <div class="dash-empty">
        <div class="dash-empty-title">未来日期无法查看</div>
        <div class="dash-empty-sub">${escapeHTML(formatDate(currentViewDate))} 暂无记录，也不会生成预测数据。</div>
        <div class="dash-empty-btns">
          <button class="btn btn-gold btn-sm dash-today-btn" type="button">回到今天</button>
        </div>
      </div>`;
    wrap.querySelector('.dash-today-btn')?.addEventListener('click',()=>{
      saveLocalViewDate(todayStr());
      renderDateDependentViews();
    });
    return;
  }
  const snap=getHealthScoreData(p,currentViewDate);
  renderHomeNutritionCard(p,snap);
  const insights=document.getElementById('homeInsightsContent');
  if(insights) insights.innerHTML='';
  const v2Sections=renderTodayHealthV2Sections(p,snap);
  const reminders=buildTodayReminders(snap);

  // ── 统一首页状态判断 ──
  const dashStatus=getDashboardStatus(p,currentViewDate);
  const isToday=currentViewDate===todayStr();
  const weightVal=snap.latestWeight
    ? `${snap.latestWeight.weight}<span class="unit">kg</span>`
    : '<span class="empty">未记录</span>';
  const exerciseVal=snap.hasExercise
    ? `${snap.exerciseMinutes}<span class="unit">分钟</span>`
    : '<span class="empty">未记录</span>';
  const stepsTotal=(snap.daily.steps||[]).reduce((sum,record)=>sum+(Number(record.steps)||0),0);
  const stepsVal=stepsTotal>0
    ? `${stepsTotal.toLocaleString()}<span class="unit">步</span>`
    : '<span class="empty">未记录</span>';
  const sleepVal=snap.hasSleep
    ? `${formatShortSleep(snap.sleepMinutes)}`
    : '<span class="empty">未记录</span>';
  const waterVal=snap.hasWater
    ? `${snap.waterTotal}<span class="unit"> / ${snap.waterGoal}ml</span>`
    : '<span class="empty">未记录</span>';

  // ---- 状态1: 无数据状态 (empty) ----
  // 当天饮食=0、饮水=0、运动=0、睡眠=0 时，保持与完整状态相同的布局骨架。
  if(dashStatus.status==='empty'){
    var emptyRingR=42,emptyRingCirc=2*Math.PI*emptyRingR;
    var emptyConclusion=isToday?'今日暂无健康数据，请使用底部中央+号新增记录':'这一天暂无记录';
    wrap.innerHTML='<div class="home-hero-card"><div class="home-hero-top">'+
      '<div class="home-hero-ring"><svg width="100" height="100" viewBox="0 0 100 100">'+
      '<circle cx="50" cy="50" r="'+emptyRingR+'" fill="none" stroke="var(--home-track-bg)" stroke-width="8"/>'+
      '</svg><div class="home-hero-ring-num"><span class="num">--</span><span class="lbl">待记录</span></div></div>'+
      '<div class="home-hero-info"><div class="label">今日健康状态</div>'+
      '<div class="conclusion">'+escapeHTML(emptyConclusion)+'</div>'+
      '<button class="home-hero-link" type="button" data-goto-health>查看健康分析 ></button></div></div>'+
      '<div class="home-metrics-grid">'+
      renderHomeCalorieMetricHTML(p,currentViewDate,'未记录','empty')+
      '<div class="home-metric"><span class="home-metric-icon diet">'+icon('utensils')+'</span><div class="home-metric-text"><span class="home-metric-label">饮食评分</span>'+
      '<div class="home-metric-value empty">未记录</div><div class="home-metric-status"></div></div></div>'+
      '<div class="home-metric"><span class="home-metric-icon steps">'+icon('footprints')+'</span><div class="home-metric-text"><span class="home-metric-label">今日步数</span>'+
      '<div class="home-metric-value empty">未记录</div><div class="home-metric-status"></div></div></div>'+
      '<div class="home-metric"><span class="home-metric-icon sleep">'+icon('moon')+'</span><div class="home-metric-text"><span class="home-metric-label">睡眠时长</span>'+
      '<div class="home-metric-value empty">未记录</div><div class="home-metric-status"></div></div></div>'+
      '</div></div>';
    var gotoHealthBtnE=wrap.querySelector('[data-goto-health]');
    if(gotoHealthBtnE) gotoHealthBtnE.addEventListener('click',function(){switchAppPage('health-analysis');});
    bindHomeCalorieDeficitUI(wrap);
    if(document.getElementById('calorieDeficitModal')?.classList.contains('show')) fillCalorieDeficitModal();
    // 空状态不触发AI健康教练和行动计划生成
    return;
  }

  // ---- Score & status (from Health Engine via snap.healthScore) ----
  const hs=snap.healthScore;
  const hasScore=hs&&hs.score!==null&&hs.score!==undefined;
  const score=hasScore?hs.score:0;
  const statusInfo=hasScore?getHealthStatusLabel(score):{label:'待评估',hint:hs?.reason||'数据不足，记录更多数据后自动生成评分'};
  const ringR=24,ringCirc=2*Math.PI*ringR;
  const ringOffset=ringCirc*(1-score/100);
  const ringColor=hasScore?(score>=80?'var(--green)':score>=60?'var(--gold)':score>=30?'var(--amber)':'var(--red)'):'var(--txt3)';

  // ---- Score factors breakdown ----
  const factorsHTML=hs?hs.factors.map(f=>`<span class="dash-factor ${f.hasData?'has-data':'no-data'}">${f.name} ${f.hasData?'✓':'△'}</span>`).join(''):'';
  const coverageHTML=hs?`<div class="dash-coverage">${hasScore?`基于饮食、饮水、运动、睡眠4项数据评估`:`数据不足，继续记录后生成健康评分`}</div>`:'';

  // ---- AI summary for hero (one-line focus) ----
  // heroFocus always uses deterministic calorie text to prevent AI-invented
  // numbers (e.g. "热量超支477kcal") from appearing in the hero.  AI
  // qualitative advice remains available in the health coach card detail.
  const _coachDayCache=getHealthCoachDayCache(p,currentViewDate);
  const _coachLatest=getLatestHealthCoachAdvice(_coachDayCache);
  const _coachAdvice=_coachLatest?.advice||null;
  const _heroCalStatus=getDailyCalorieStatus(p,currentViewDate);
  const heroFocus=buildDeterministicCalorieSummary(_heroCalStatus)||_coachAdvice?.summary||(reminders.find(r=>r.type==='warn')?.text)||statusInfo.hint||'保持记录，持续关注健康';

  // ---- 状态2: 少量数据状态 (partial) ----
  // 仅有1类有效数据时，不展示AI详细分析，但保持与完整状态相同的布局骨架。
  if(dashStatus.status==='partial'){
    var csPartial=getDailyCalorieStatus(p,currentViewDate);
    var balanceP=getCalorieBalance(csPartial.caloriesConsumed,csPartial.dynamicCalorieTarget);
    var calorieDiffTextP=formatHomeCalorieBalanceHTML(balanceP,csPartial.hasFood);
    var calorieDiffStatusP=csPartial.hasFood?balanceP.status:'';
    var dietScoreTextP='<span class="empty">未记录</span>';
    var dietScoreStatusP='';
    var stepsTextP=stepsTotal>0?stepsTotal.toLocaleString()+'<span class="unit">步</span>':'<span class="empty">未记录</span>';
    var stepsStatusP=stepsTotal>0?(stepsTotal>=8000?'已达标':stepsTotal>=4000?'达成中':'刚刚开始'):'';
    var sleepHoursP=snap.sleepMinutes>0?(snap.sleepMinutes/60).toFixed(1):null;
    var sleepTextP=sleepHoursP?sleepHoursP+'<span class="unit">h</span>':'<span class="empty">未记录</span>';
    var sleepStatusP=snap.hasSleep?(snap.sleepPct>=90?'作息稳定':snap.sleepPct>=60?'基本充足':'略不足'):'';
    var heroRingRP=42,heroRingCircP=2*Math.PI*heroRingRP;
    var partialConclusion='已记录'+[dashStatus.hasFood?'饮食':null,dashStatus.hasWater?'饮水':null,dashStatus.hasExercise?'运动':null,dashStatus.hasSleep?'睡眠':null].filter(Boolean).length+'项，需至少2项数据生成健康评分';
    wrap.innerHTML='<div class="home-hero-card"><div class="home-hero-top">'+
      '<div class="home-hero-ring"><svg width="100" height="100" viewBox="0 0 100 100">'+
      '<circle cx="50" cy="50" r="'+heroRingRP+'" fill="none" stroke="var(--home-track-bg)" stroke-width="8"/>'+
      '<circle cx="50" cy="50" r="'+heroRingRP+'" fill="none" stroke="var(--home-text-caption)" stroke-width="8" stroke-dasharray="'+heroRingCircP+'" stroke-dashoffset="'+heroRingCircP+'" stroke-linecap="round" transform="rotate(-90 50 50)"/>'+
      '</svg><div class="home-hero-ring-num"><span class="num">--</span><span class="lbl">数据不足</span></div></div>'+
      '<div class="home-hero-info"><div class="label">今日健康状态</div>'+
      '<div class="conclusion">'+escapeHTML(partialConclusion)+'</div>'+
      '<button class="home-hero-link" type="button" data-goto-health>查看健康分析 ></button></div></div>'+
      '<div class="home-metrics-grid">'+
      renderHomeCalorieMetricHTML(p,currentViewDate,calorieDiffTextP,csPartial.hasFood?'':'empty')+
      '<div class="home-metric"><span class="home-metric-icon diet">'+icon('utensils')+'</span><div class="home-metric-text"><span class="home-metric-label">饮食评分</span>'+
      '<div class="home-metric-value">'+dietScoreTextP+'</div><div class="home-metric-status">'+dietScoreStatusP+'</div></div></div>'+
      '<div class="home-metric"><span class="home-metric-icon steps">'+icon('footprints')+'</span><div class="home-metric-text"><span class="home-metric-label">今日步数</span>'+
      '<div class="home-metric-value">'+stepsTextP+'</div><div class="home-metric-status '+(stepsTotal>=8000?'good':'')+'">'+stepsStatusP+'</div></div></div>'+
      '<div class="home-metric"><span class="home-metric-icon sleep">'+icon('moon')+'</span><div class="home-metric-text"><span class="home-metric-label">睡眠时长</span>'+
      '<div class="home-metric-value">'+sleepTextP+'</div><div class="home-metric-status '+(snap.sleepPct>=90?'good':'')+'">'+sleepStatusP+'</div></div></div>'+
      '</div></div>';
    var gotoHealthBtnP=wrap.querySelector('[data-goto-health]');
    if(gotoHealthBtnP) gotoHealthBtnP.addEventListener('click',function(){switchAppPage('health-analysis');});
    bindHomeCalorieDeficitUI(wrap);
    if(document.getElementById('calorieDeficitModal')?.classList.contains('show')) fillCalorieDeficitModal();
    if(insights){
      insights.innerHTML=renderHomeActionTasks(p,snap)+renderHomeAdviceCard(p,snap)+renderHomeTrendOverview(p);
      _bindTodayHealthNav(insights);
      bindHomeActionTasks(p,currentViewDate);
      bindHomeAdviceCard(p,currentViewDate);
      bindHomeTrendOverview(p,currentViewDate);
    }
    // 少量数据状态不触发AI健康教练和行动计划生成
    return;
  }

  // ---- 状态3: 完整数据状态 (complete) ----
  var cs=getDailyCalorieStatus(p,currentViewDate);
  var balance=getCalorieBalance(cs.caloriesConsumed,cs.dynamicCalorieTarget);
  var calorieDiffText=formatHomeCalorieBalanceHTML(balance,cs.hasFood);
  var calorieDiffStatus=cs.hasFood?balance.status:'';
  var calorieDiffStatusClass=balance.type==='over'?'warn':'gold';
  var dietFactor=hs&&hs.factors?hs.factors.find(function(f){return f.name==='饮食'}):null;
  var dietScore=dietFactor&&dietFactor.hasData?Math.round(dietFactor.pct):null;
  var stepsTotalNum=stepsTotal;
  var sleepHours=snap.sleepMinutes>0?(snap.sleepMinutes/60).toFixed(1):null;
  var heroRingR=42,heroRingCirc=2*Math.PI*heroRingR;
  var heroRingOffset=heroRingCirc*(1-(hasScore?score:0)/100);
  var heroRingColor=hasScore?(score>=80?'var(--home-green)':score>=60?'var(--home-gold)':score>=30?'var(--home-amber)':'var(--home-red)'):'var(--home-text-caption)';
  var dietScoreText=dietScore!==null?dietScore+'<span class="unit">分</span>':'<span class="empty">未记录</span>';
  var dietScoreStatus=dietScore!==null?(dietScore>=80?'良好':dietScore>=60?'一般':'待改善'):'';
  var stepsText=stepsTotalNum>0?stepsTotalNum.toLocaleString()+'<span class="unit">步</span>':'<span class="empty">未记录</span>';
  var stepsStatus=stepsTotalNum>0?(stepsTotalNum>=8000?'已达标':stepsTotalNum>=4000?'达成中':'刚刚开始'):'';
  var sleepText=sleepHours?sleepHours+'<span class="unit">h</span>':'<span class="empty">未记录</span>';
  var sleepStatus=snap.hasSleep?(snap.sleepPct>=90?'作息稳定':snap.sleepPct>=60?'基本充足':'略不足'):'';
  wrap.innerHTML='<div class="home-hero-card"><div class="home-hero-top">'+
    '<div class="home-hero-ring"><svg width="100" height="100" viewBox="0 0 100 100">'+
    '<circle cx="50" cy="50" r="'+heroRingR+'" fill="none" stroke="var(--home-track-bg)" stroke-width="8"/>'+
    '<circle cx="50" cy="50" r="'+heroRingR+'" fill="none" stroke="'+heroRingColor+'" stroke-width="8" stroke-dasharray="'+heroRingCirc+'" stroke-dashoffset="'+heroRingOffset+'" stroke-linecap="round" transform="rotate(-90 50 50)" style="transition:stroke-dashoffset .8s ease"/>'+
    '</svg><div class="home-hero-ring-num"><span class="num">'+(hasScore?score:'--')+'</span><span class="lbl">'+(hasScore?statusInfo.label:'待评估')+'</span></div></div>'+
    '<div class="home-hero-info"><div class="label">今日健康状态</div>'+
    '<div class="conclusion">'+escapeHTML(heroFocus)+'</div>'+
    '<button class="home-hero-link" type="button" data-goto-health>查看健康分析 ></button></div></div>'+
    '<div class="home-metrics-grid">'+
    renderHomeCalorieMetricHTML(p,currentViewDate,calorieDiffText,cs.hasFood?'':'empty')+
    '<div class="home-metric"><span class="home-metric-icon diet">'+icon('utensils')+'</span><div class="home-metric-text"><span class="home-metric-label">饮食评分</span>'+
    '<div class="home-metric-value">'+dietScoreText+'</div><div class="home-metric-status '+(dietScore>=80?'good':dietScore>=60?'gold':'')+'">'+dietScoreStatus+'</div></div></div>'+
    '<div class="home-metric"><span class="home-metric-icon steps">'+icon('footprints')+'</span><div class="home-metric-text"><span class="home-metric-label">今日步数</span>'+
    '<div class="home-metric-value">'+stepsText+'</div><div class="home-metric-status '+(stepsTotalNum>=8000?'good':'gold')+'">'+stepsStatus+'</div></div></div>'+
    '<div class="home-metric"><span class="home-metric-icon sleep">'+icon('moon')+'</span><div class="home-metric-text"><span class="home-metric-label">睡眠时长</span>'+
    '<div class="home-metric-value">'+sleepText+'</div><div class="home-metric-status '+(snap.sleepPct>=90?'good':'')+'">'+sleepStatus+'</div></div></div>'+
    '</div></div>';
  var gotoHealthBtn=wrap.querySelector('[data-goto-health]');
  if(gotoHealthBtn) gotoHealthBtn.addEventListener('click',function(){switchAppPage('health-analysis');});
  bindHomeCalorieDeficitUI(wrap);
  if(document.getElementById('calorieDeficitModal')?.classList.contains('show')) fillCalorieDeficitModal();
  if(insights){
    insights.innerHTML=renderHomeActionTasks(p,snap)+renderHomeAdviceCard(p,snap)+renderHomeTrendOverview(p);
    _bindTodayHealthNav(insights);
    bindHomeActionTasks(p,currentViewDate);
    bindHomeAdviceCard(p,currentViewDate);
    bindHomeTrendOverview(p,currentViewDate);
  }
  triggerHealthCoachV2Auto(p,currentViewDate);
}

function _bindTodayHealthNav(wrap){
  wrap.querySelectorAll('.dash-page-goto').forEach(el=>{
    el.addEventListener('click',()=>{
      const targetPage=el.dataset.appPage;
      if(targetPage==='record'){
        // Open quick add panel instead of navigating to record page
        if(window.openQuickAddPanel) window.openQuickAddPanel();
        else showToast('请使用底部中央“+”新增记录','info');
      }else if(targetPage){
        switchAppPage(targetPage);
      }
    });
  });
}

/* ===== Home Page Redesign: Action Tasks, Advice, Trend ===== */
function buildHomeActionTasks(p,snap){
  var tasks=[];
  var stepsTotal=(snap.daily.steps||[]).reduce(function(sum,r){return sum+(Number(r.steps)||0)},0);
  var stepGoal=8000;
  if(snap.hasWater){
    var waterNeed=Math.max(0,(snap.waterGoal||0)-snap.waterTotal);
    if(waterNeed<=0){tasks.push({id:'water',done:true,name:'饮水已完成',detail:'已喝 '+snap.waterTotal+'/'+(snap.waterGoal||0)+'ml',action:'open_water_record',typeIcon:'droplets',typeClass:'water'})}
    else{tasks.push({id:'water',done:false,name:'还差 '+waterNeed+'ml 饮水',detail:'少量多次，每次200ml左右',action:'open_water_record',typeIcon:'droplets',typeClass:'water'})}
  }else{tasks.push({id:'water',done:false,name:'今日饮水未记录',detail:'点击快速记录一杯水',action:'open_water_record',typeIcon:'droplets',typeClass:'water'})}
  if(stepsTotal>0){
    var stepNeed=Math.max(0,stepGoal-stepsTotal);
    if(stepNeed<=0){tasks.push({id:'steps',done:true,name:'步数达标',detail:'今日 '+stepsTotal.toLocaleString()+' 步',action:'open_steps_record',typeIcon:'footprints',typeClass:'steps'})}
    else{tasks.push({id:'steps',done:false,name:'还差 '+stepNeed.toLocaleString()+' 步',detail:'散步15分钟即可完成',action:'open_steps_record',typeIcon:'footprints',typeClass:'steps'})}
  }else{tasks.push({id:'steps',done:false,name:'今日步数未记录',detail:'出门走走，记录今日步数',action:'open_steps_record',typeIcon:'footprints',typeClass:'steps'})}
  if(snap.hasFood&&snap.targets&&snap.targets.protein){
    var proteinVal=Math.round(snap.intake.protein||0);
    var proteinTarget=Math.round(snap.targets.protein);
    var proteinNeed=Math.max(0,proteinTarget-proteinVal);
    if(proteinNeed<=0){tasks.push({id:'protein',done:true,name:'蛋白质达标',detail:'已摄入 '+proteinVal+'/'+proteinTarget+'g',action:'open_food_record',typeIcon:'egg',typeClass:'nutrition'})}
    else{tasks.push({id:'protein',done:false,name:'还差 '+proteinNeed+'g 蛋白质',detail:'建议补充鸡胸肉、鱼类、鸡蛋等',action:'open_food_record',typeIcon:'egg',typeClass:'nutrition'})}
  }else if(snap.hasFood){tasks.push({id:'protein',done:false,name:'营养目标待完善',detail:'设置蛋白质目标后可获得更精准建议',action:'open_food_record',typeIcon:'egg',typeClass:'nutrition'})}
  else{tasks.push({id:'protein',done:false,name:'今日饮食未记录',detail:'记录一餐即可开始营养分析',action:'open_food_record',typeIcon:'egg',typeClass:'nutrition'})}
  tasks.sort(function(a,b){return a.done===b.done?0:a.done?1:-1});
  return tasks.slice(0,3);
}
function renderHomeActionTasks(p,snap){
  var tasks=buildHomeActionTasks(p,snap);
  var completed=tasks.filter(function(t){return t.done}).length;
  var total=tasks.length;
  var html='<div class="home-task-card" id="homeActionTaskCard"><div class="home-task-head"><div>'+
    '<span class="home-task-title">今日任务</span><span class="home-task-count">'+completed+'/'+total+'已完成</span></div>'+
    '<button class="home-task-more" type="button" data-goto-tasks>查看全部 ></button></div><div class="home-task-list">';
  tasks.forEach(function(task){
    var statusHTML=task.done
      ?'<span class="home-task-check">'+icon('circle-check')+'</span>'
      :'<span class="home-task-check">'+icon('circle-dashed')+'</span>';
    var typeIconHTML='<span class="home-task-icon '+task.typeClass+'">'+icon(task.typeIcon)+'</span>';
    html+='<div class="home-task-item '+(task.done?'done':'')+'" data-task-action="'+escapeHTML(task.action)+'">'+
      '<div class="home-task-status">'+statusHTML+'</div>'+
      '<div class="home-task-body">'+
      typeIconHTML+
      '<div class="home-task-content"><div class="home-task-name">'+escapeHTML(task.name)+'</div>'+
      '<div class="home-task-detail">'+escapeHTML(task.detail)+'</div></div>'+
      '<span class="home-task-chevron">›</span></div></div>';
  });
  html+='</div></div>';
  return html;
}
function bindHomeActionTasks(p,date){
  date=date||currentViewDate;
  var card=document.getElementById('homeActionTaskCard');
  if(!card) return;
  card.querySelectorAll('.home-task-item').forEach(function(item){
    item.addEventListener('click',function(){
      handleDailyTaskAction(item.dataset.taskAction);
    });
  });
  var moreBtn=card.querySelector('.home-task-more');
  if(moreBtn) moreBtn.addEventListener('click',function(e){e.stopPropagation();switchAppPage('daily-tasks')});
}
function bindHomeTrendOverview(profile,date){
  date=date||currentViewDate;
  var section=document.getElementById('homeTrendSection');
  if(!section) return;
  var moreBtn=section.querySelector('[data-goto-trend]');
  if(moreBtn) moreBtn.addEventListener('click',function(e){e.stopPropagation();trendDetailMetric=localStorage.getItem('lastTrendMetric')||'weight';switchAppPage('trend-detail');});
  section.querySelectorAll('[data-trend-metric]').forEach(function(card){
    card.addEventListener('click',function(){
      var metric=card.dataset.trendMetric;
      if(metric){trendDetailMetric=metric;localStorage.setItem('lastTrendMetric',metric);}
      switchAppPage('trend-detail');
    });
  });
}
function renderHomeAdviceCard(p,snap){
  var dayCache=getHealthCoachDayCache(p,currentViewDate);
  var latest=getLatestHealthCoachAdvice(dayCache);
  var advice=latest?latest.advice:null;
  var summary=advice?advice.summary:null;
  if(!summary) summary=buildDeterministicCalorieSummary(getDailyCalorieStatus(p,currentViewDate));
  return '<div class="home-advice-card" id="homeAdviceCard">'+
    '<span class="home-advice-icon">'+icon('sparkles')+'</span>'+
    '<div class="home-advice-body"><div class="home-advice-label">今日建议</div>'+
    '<div class="home-advice-text">'+escapeHTML(summary)+'</div></div>'+
    '<span class="home-advice-arrow">›</span></div>';
}
function bindHomeAdviceCard(p,date){
  date=date||currentViewDate;
  var card=document.getElementById('homeAdviceCard');
  if(!card) return;
  card.addEventListener('click',function(){switchAppPage('daily-advice')});
}
function buildSparklineSVG(values,color,width,height){
  width=width||100;height=height||24;
  if(!values||values.length<2){
    return '<svg viewBox="0 0 '+width+' '+height+'" preserveAspectRatio="none"><line x1="0" y1="'+(height/2)+'" x2="'+width+'" y2="'+(height/2)+'" stroke="var(--home-text-caption)" stroke-width="1" stroke-dasharray="2,3" opacity="0.3"/></svg>';
  }
  var min=Math.min.apply(null,values),max=Math.max.apply(null,values);
  var range=max-min||1;
  var stepX=width/(values.length-1);
  var pts=[];
  for(var i=0;i<values.length;i++){
    var x=i*stepX;
    var y=height-((values[i]-min)/range)*(height-6)-3;
    pts.push(x.toFixed(1)+','+y.toFixed(1));
  }
  var linePath=pts.join(' ');
  var lastX=(values.length-1)*stepX;
  var lastY=height-((values[values.length-1]-min)/range)*(height-6)-3;
  return '<svg viewBox="0 0 '+width+' '+height+'" preserveAspectRatio="none">'+
    '<polyline points="'+linePath+'" fill="none" stroke="'+color+'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<circle cx="'+lastX.toFixed(1)+'" cy="'+lastY.toFixed(1)+'" r="2.5" fill="'+color+'"/></svg>';
}
function renderHomeTrendOverview(profile){
  var p=profile||getActiveProfile();
  var dates=getRecentDateList(7,currentViewDate);
  // Collect REAL data points only - no fake filling
  var weightPoints=[],caloriePoints=[],exercisePoints=[],sleepPoints=[];
  var currentWeight=null,currentCalories=null,currentExercise=null,currentSleep=null;
  dates.forEach(function(date){
    var daily=getDailyRecord(p,date);
    var snap=getHealthSnapshot(p,date);
    // Weight: only use date-specific weightRecords (NOT getLatestWeight which carries forward)
    if(daily.weight&&daily.weight.length>0){
      var w=Number(daily.weight[daily.weight.length-1].weight);
      if(Number.isFinite(w)&&w>0){
        weightPoints.push(w);
        if(date===currentViewDate) currentWeight=w;
      }
    }
    // Calories: only when has food records (null = missing, NOT 0)
    if(snap.hasFood){
      caloriePoints.push(snap.intakeCalories);
      if(date===currentViewDate) currentCalories=snap.intakeCalories;
    }
    // Exercise: 0 is valid business value (no exercise = 0 kcal)
    exercisePoints.push(snap.recordedExerciseCalories||0);
    if(date===currentViewDate) currentExercise=snap.recordedExerciseCalories||0;
    // Sleep: only when has sleep records (null = missing)
    if(snap.hasSleep&&snap.sleepMinutes>0){
      sleepPoints.push(snap.sleepMinutes);
      if(date===currentViewDate) currentSleep=snap.sleepMinutes;
    }
  });
  // Fallback: if current date has no data, use latest available
  if(currentWeight===null&&weightPoints.length>0) currentWeight=weightPoints[weightPoints.length-1];
  if(currentCalories===null&&caloriePoints.length>0) currentCalories=caloriePoints[caloriePoints.length-1];
  if(currentExercise===null&&exercisePoints.length>0) currentExercise=exercisePoints[exercisePoints.length-1];
  if(currentSleep===null&&sleepPoints.length>0) currentSleep=sleepPoints[sleepPoints.length-1];
  // Deltas: last - first among valid points only
  var weightDelta=weightPoints.length>=2?+(weightPoints[weightPoints.length-1]-weightPoints[0]).toFixed(1):null;
  var calorieDelta=caloriePoints.length>=2?caloriePoints[caloriePoints.length-1]-caloriePoints[0]:null;
  var exerciseDelta=exercisePoints.length>=2?exercisePoints[exercisePoints.length-1]-exercisePoints[0]:null;
  var sleepDeltaHours=sleepPoints.length>=2?Math.round((sleepPoints[sleepPoints.length-1]-sleepPoints[0])/60*10)/10:null;
  function deltaHTML(delta,lowerIsBetter){
    if(delta===null||delta===0) return '<span class="home-trend-delta flat">—</span>';
    var isDown=delta<0;var isGood=lowerIsBetter?isDown:!isDown;
    return '<span class="home-trend-delta '+(isGood?'down':'up')+'">'+(isDown?'↓':'↑')+Math.abs(delta)+'</span>';
  }
  return '<div class="home-trend-section" id="homeTrendSection"><div class="home-trend-head">'+
    '<span class="home-trend-title">趋势速览（近7天）</span>'+
    '<button class="home-trend-more" type="button" data-goto-trend>查看更多 ></button></div>'+
    '<div class="home-trend-grid">'+
    '<div class="home-trend-card" data-trend-metric="weight"><div class="home-trend-card-head"><span class="home-trend-card-label">体重(kg)</span>'+deltaHTML(weightDelta,true)+'</div>'+
    '<div class="home-trend-val">'+(currentWeight?currentWeight:'--')+'<span class="unit">kg</span></div>'+
    '<div class="home-trend-spark">'+buildSparklineSVG(weightPoints,'var(--home-green)')+'</div></div>'+
    '<div class="home-trend-card" data-trend-metric="calories"><div class="home-trend-card-head"><span class="home-trend-card-label">热量摄入(kcal)</span>'+deltaHTML(calorieDelta,true)+'</div>'+
    '<div class="home-trend-val">'+(currentCalories||'--')+'<span class="unit">kcal</span></div>'+
    '<div class="home-trend-spark">'+buildSparklineSVG(caloriePoints,'var(--home-gold)')+'</div></div>'+
    '<div class="home-trend-card" data-trend-metric="exercise"><div class="home-trend-card-head"><span class="home-trend-card-label">运动消耗(kcal)</span>'+deltaHTML(exerciseDelta,false)+'</div>'+
    '<div class="home-trend-val">'+(currentExercise||'--')+'<span class="unit">kcal</span></div>'+
    '<div class="home-trend-spark">'+buildSparklineSVG(exercisePoints,'var(--home-orange)')+'</div></div>'+
    '<div class="home-trend-card" data-trend-metric="sleep"><div class="home-trend-card-head"><span class="home-trend-card-label">睡眠时长(h)</span>'+deltaHTML(sleepDeltaHours?sleepDeltaHours*60:null,false)+'</div>'+
    '<div class="home-trend-val">'+(currentSleep>0?(currentSleep/60).toFixed(1):'--')+'<span class="unit">h</span></div>'+
    '<div class="home-trend-spark">'+buildSparklineSVG(sleepPoints,'var(--home-purple)')+'</div></div>'+
    '</div></div>';
}

function renderDailyView(){
  renderTodayHealthOverview();
  renderDateNavigator();
  renderWeightCard();
  renderWeeklyReportCard(getActiveProfile(),currentViewDate);
  if(!isSyncing&&!isFutureDate(currentViewDate)) triggerWeeklyReportAuto(getActiveProfile(),currentViewDate);
  try{renderSmartRecipeCard(getActiveProfile(),currentViewDate)}catch(err){console.error('[Render] renderSmartRecipeCard failed:',err)}
  renderHealthRecordManagement();
  renderOpenRecordDetail();
}

let activeAppPage='home';
let coupleAnnSortMode=false;
const pageScrollPositions={home:0,health:0,growth:0,couple:0,settings:0,'health-analysis':0,'daily-tasks':0,'daily-advice':0,'trend-detail':0,'health-compare':0,'smart-recipe':0,'smart-recipe-detail':0};
function getAppPageForModule(moduleId){
  const map={
    weightCard:'health',
    healthOverviewCard:'health',
    waterCard:'health',
    exerciseCard:'health',
    dietManagementCard:'health',
    chartCard:'health',
    healthGoalProgressCard:'health',
    weeklyReportCard:'health',
    healthProfileCard:'health',
    todayHealthCard:'home'
  };
  return map[moduleId]||'';
}
function createAppPage(id,title){
  const section=document.createElement('section');
  section.className=`app-page ${id==='home'?'active':''}`;
  section.id=`appPage_${id}`;
  section.dataset.appPage=id;
  section.setAttribute('aria-label',title);
  return section;
}
function moveExistingNode(id,target){
  const node=document.getElementById(id);
  if(node&&target) target.appendChild(node);
}
function ensureHealthGoalProgressCard(){
  let card=document.getElementById('healthGoalProgressCard');
  if(card) return card;
  card=document.createElement('div');
  card.className='health-goal-mini-strip';
  card.id='healthGoalProgressCard';
  card.innerHTML='<div id="healthGoalProgressContent"></div>';
  return card;
}
function ensureHomeNutritionCard(){
  let card=document.getElementById('homeNutritionCard');
  if(card) return card;
  card=document.createElement('section');
  card.className='home-nutrition-card';
  card.id='homeNutritionCard';
  card.innerHTML='<div class="home-nutrition-content" id="homeNutritionContent"></div>';
  return card;
}
function ensureHomeInsights(){
  let wrap=document.getElementById('homeInsightsContent');
  if(wrap) return wrap;
  wrap=document.createElement('div');
  wrap.className='home-insights';
  wrap.id='homeInsightsContent';
  return wrap;
}
function setupAppPageShell(){
  const app=document.querySelector('.app');
  const dateNav=document.getElementById('dateNavigator');
  if(!app||document.getElementById('appPages')) return;
  const pages=document.createElement('main');
  pages.className='app-pages';
  pages.id='appPages';
  const pageHome=createAppPage('home','首页');
  const pageHealth=createAppPage('health','健康');
  const pageGrowth=createAppPage('growth','成长');
  const pageCouple=createAppPage('couple','我们');
  const pageSettings=createAppPage('settings','设置');

  const healthGrid=document.createElement('div');
  healthGrid.className='dashboard';
  const managementSection=document.createElement('section');
  managementSection.className='card health-record-management health-record-management-card';
  managementSection.id='healthRecordManagement';
  managementSection.innerHTML=`
    <div class="health-record-management-head">
      <div class="health-record-management-title">${icon('clipboard-list')} 记录管理</div>
      <div class="health-record-management-note" id="healthRecordCompletion">今日完成 0/6项</div>
    </div>
    <div class="health-record-entry-list" id="healthRecordManagementList"></div>`;

  moveExistingNode('todayHealthCard',pageHome);
  pageHome.appendChild(ensureHomeNutritionCard());
  pageHome.appendChild(ensureHomeInsights());
  // Health page v2 structure — real DOM order (do not use CSS order)
  // chartCard → weightCard(身体指标) → weeklyReportCard → smartRecipeCard → healthRecordManagement
  // Do not restore removed legacy cards:
  // dietManagementCard, waterCard, exerciseCard, healthProfileCard, healthOverviewCard
  ['chartCard','weightCard','weeklyReportCard'].forEach(id=>{
    const node=document.getElementById(id);
    if(node) healthGrid.appendChild(node);
  });
  ensureSmartRecipeCard(healthGrid,managementSection);
  ['dietManagementCard','waterCard','exerciseCard','healthOverviewCard','healthProfileCard'].forEach(id=>document.getElementById(id)?.remove());
  healthGrid.appendChild(managementSection);
  pageHealth.appendChild(healthGrid);

  pageGrowth.innerHTML='<div class="growth-page" id="growthPageContent"></div>';
  pageCouple.innerHTML=`
    <section class="card">
      <div class="card-title"><span class="title-label">${icon('users')} 我们的健康空间</span> <span class="accent">共同健康空间</span></div>
      <div id="coupleSpaceContent"></div>
    </section>`;
  pageSettings.innerHTML=`
    <section class="card">
      <div class="card-title">设置 <span class="accent">当前设备</span></div>
      <div id="settingsPageContent"></div>
    </section>`;

  [pageHome,pageHealth,pageGrowth,pageCouple,pageSettings].forEach(page=>pages.appendChild(page));
  // Create detail sub-pages (not shown in bottom nav)
  const detailPageIds=['health-analysis','daily-tasks','daily-advice','trend-detail','health-compare','couple-ledger','smart-recipe','smart-recipe-detail'];
  detailPageIds.forEach(id=>{
    const titles={'health-analysis':'今日健康分析','daily-tasks':'今日任务','daily-advice':'今日建议','trend-detail':'健康趋势','health-compare':'健康对比','couple-ledger':'共同账本','smart-recipe':'智能食谱','smart-recipe-detail':'菜谱详情'};
    const p=createAppPage(id,titles[id]);
    p.innerHTML=`<div class="sub-page-content" id="subPage_${id.replace(/-/g,'_')}"></div>`;
    pages.appendChild(p);
  });
  app.insertBefore(pages,dateNav?.nextSibling||app.firstChild?.nextSibling||null);
  const oldDashboard=app.querySelector(':scope > .dashboard');
  if(oldDashboard&&oldDashboard.children.length===0) oldDashboard.remove();
  syncModeNavigation();
}
function switchAppPage(page,{scrollTop=true}={}){
  page=resolveAppRoute(page);
  let target=document.querySelector(`.app-page[data-app-page="${page}"]`);
  if(!target){
    page=isSingleMode()?'growth':'couple';
    target=document.querySelector(`.app-page[data-app-page="${page}"]`)||document.querySelector('.app-page[data-app-page="home"]');
  }
  if(!target) return false;
  // Save current page scroll position before leaving (only for tab switches, skip if scroll-locked by modal/popup)
  if(scrollTop && pageScrollPositions.hasOwnProperty(activeAppPage) && !document.body.classList.contains('glass-scroll-locked')){
    pageScrollPositions[activeAppPage]=Math.max(window.scrollY||document.documentElement.scrollTop||document.body.scrollTop||0,0);
  }
  activeAppPage=page;
  const savedPos=scrollTop?(pageScrollPositions[page]||0):0;
  // Hide all pages first, then activate target — prevents flash of wrong scroll position
  document.querySelectorAll('.app-page').forEach(el=>el.classList.remove('active'));
  target.classList.add('active');
  document.querySelectorAll('.bottom-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.appPage===page));
  const isChildPage=['health-analysis','daily-tasks','daily-advice','trend-detail','health-compare','couple-ledger','smart-recipe','smart-recipe-detail'].includes(page);
  document.body.classList.toggle('child-page-active',isChildPage);
  document.body.classList.toggle('health-compare-page-active',page==='health-compare');
  renderAppPageSummaries();
  syncMobileBottomNavPosition();
  // Restore scroll position synchronously BEFORE browser paints (no visual flash)
  if(scrollTop){
    window.scrollTo({top:savedPos,left:0,behavior:'instant'});
    // Single rAF fallback for dynamic content that may shift layout after initial render
    requestAnimationFrame(()=>{window.scrollTo({top:savedPos,left:0,behavior:'instant'});});
  }
  if(page==='health'){
    // 性能优化：进入健康页面才渲染 Chart（首次会等待 defer 加载的 Chart.js）
    renderChart();
    if(chartInstance) setTimeout(()=>chartInstance.resize(),60);
    const p=getActiveProfile();
    renderWeeklyReportCard(p,currentViewDate);
    try{renderSmartRecipeCard(p,currentViewDate)}catch(err){console.error('[Render] renderSmartRecipeCard failed:',err)}
    if(!isFutureDate(currentViewDate)) triggerWeeklyReportAuto(p,currentViewDate);
  }
  // Detail sub-pages: render on entry
  if(page==='health-analysis') renderHealthAnalysisPage(getActiveProfile(),currentViewDate);
  if(page==='daily-tasks') renderDailyTasksPage(getActiveProfile(),currentViewDate);
  if(page==='daily-advice') renderDailyAdvicePage(getActiveProfile(),currentViewDate);
  if(page==='trend-detail') renderTrendDetailPage(getActiveProfile(),currentViewDate);
  if(page==='health-compare') renderHealthComparePage(currentViewDate);
  if(page==='couple-ledger') renderCoupleLedgerPage();
  if(page==='smart-recipe') renderSmartRecipePage(getActiveProfile(),currentViewDate);
  if(page==='smart-recipe-detail') renderSmartRecipeDetailPage(getActiveProfile(),currentViewDate);
  return true;
}

let mobileBottomNavFrame=0;
function syncMobileBottomNavPosition(){
  const root=document.documentElement;
  const header=document.querySelector('.header');
  const nav=document.getElementById('bottomTabNav');
  const headerVisible=header&&getComputedStyle(header).display!=='none';
  const navVisible=nav&&getComputedStyle(nav).display!=='none';
  if(headerVisible) root.style.setProperty('--immersive-header-height',`${Math.ceil(header.getBoundingClientRect().height)}px`);
  if(navVisible) root.style.setProperty('--immersive-bottom-nav-height',`${Math.ceil(nav.getBoundingClientRect().height)}px`);
}
function queueMobileBottomNavPositionSync(){
  cancelAnimationFrame(mobileBottomNavFrame);
  syncMobileBottomNavPosition();
  mobileBottomNavFrame=requestAnimationFrame(syncMobileBottomNavPosition);
}
queueMobileBottomNavPositionSync();
window.visualViewport?.addEventListener('resize',queueMobileBottomNavPositionSync,{passive:true});
window.visualViewport?.addEventListener('scroll',queueMobileBottomNavPositionSync,{passive:true});
window.addEventListener('resize',queueMobileBottomNavPositionSync,{passive:true});
window.addEventListener('orientationchange',queueMobileBottomNavPositionSync,{passive:true});
window.addEventListener('load',queueMobileBottomNavPositionSync,{passive:true});
if(window.ResizeObserver){
  const immersiveBarsObserver=new ResizeObserver(queueMobileBottomNavPositionSync);
  const immersiveHeader=document.querySelector('.header');
  const immersiveBottomNav=document.getElementById('bottomTabNav');
  if(immersiveHeader) immersiveBarsObserver.observe(immersiveHeader);
  if(immersiveBottomNav) immersiveBarsObserver.observe(immersiveBottomNav);
}

// ===== Mobile Keyboard Adaptation: auto-scroll focused input into visible area =====
(function(){
  function scrollToFocused(target){
    if(!target||!target.matches||!target.matches('input,textarea,select')) return;
    var vp=window.visualViewport;
    var rect=target.getBoundingClientRect();
    if(vp){
      var visTop=vp.offsetTop;
      var visBottom=vp.offsetTop+vp.height;
      if(rect.bottom>visBottom-24||rect.top<visTop+24){
        setTimeout(function(){target.scrollIntoView({behavior:'smooth',block:'center'});},120);
      }
    }else{
      if(rect.bottom>window.innerHeight-24||rect.top<24){
        setTimeout(function(){target.scrollIntoView({behavior:'smooth',block:'center'});},120);
      }
    }
  }
  document.addEventListener('focusin',function(e){scrollToFocused(e.target);},{passive:true});
  var kbTimer=null;
  window.visualViewport?.addEventListener('resize',function(){
    if(kbTimer)clearTimeout(kbTimer);
    kbTimer=setTimeout(function(){
      var ae=document.activeElement;
      if(ae&&ae.matches&&ae.matches('input,textarea,select'))scrollToFocused(ae);
    },200);
  },{passive:true});
})();

function formatSettingsValue(value,empty='未填写'){
  if(value===null||value===undefined||value==='') return empty;
  return String(value);
}
function coupleHasAnyData(snap){
  return !!(snap?.hasFood||snap?.hasWater||snap?.hasExercise||snap?.hasSleep||snap?.hasWeight);
}
function coupleStatusLabel(snap){
  if(!coupleHasAnyData(snap)) return '未记录';
  if(snap.healthScore?.score===null||snap.healthScore?.score===undefined) return '一般';
  if(snap.score>=75) return '良好';
  if(snap.score>=50) return '一般';
  return '需关注';
}
function coupleScoreDisplay(snap){
  return snap.healthScore?.score!==null&&snap.healthScore?.score!==undefined?snap.score:'--';
}
function coupleInitial(profile,fallback){
  const name=getDisplayName(profile)||fallback||'TA';
  return name.slice(0,1).toUpperCase();
}
function coupleDayHasAnyRecord(profile,date){
  if(!profile) return false;
  const daily=getDailyRecord(profile,date);
  return daily.weight.length||daily.steps.length||daily.sleep.length||daily.water.length||daily.food.length||daily.exercise.length;
}
function getCoupleStreakDays(me,other,date=currentViewDate){
  let count=0;
  for(let i=0;i<180;i++){
    const d=addDays(date,-i);
    if(coupleDayHasAnyRecord(me,d)&&coupleDayHasAnyRecord(other,d)) count++;
    else break;
  }
  return count;
}
function getCoupleCareAdvice(otherSnap){
  if(!coupleHasAnyData(otherSnap)) return '记录更多数据后，可以获得专属陪伴建议。';
  if(otherSnap.hasSleep&&otherSnap.sleepMinutes>0&&otherSnap.sleepPct<75) return 'TA昨晚睡眠不足，可以提醒TA早点休息。';
  if(otherSnap.hasWater&&otherSnap.waterPct<70) return '今天提醒TA多喝一点水，少量多次就好。';
  if(!otherSnap.hasExercise||otherSnap.exerciseMinutes<20) return '可以陪TA一起散步10分钟，轻松完成一点活动量。';
  if(otherSnap.dietPct>120) return 'TA今天摄入偏多，可以提醒TA晚些时候吃清淡一点。';
  return 'TA今天状态还不错，给TA一个简单鼓励就好。';
}
function countCoupleSharedDays(me,other,days=30,date=currentViewDate){
  let count=0;
  for(let i=0;i<days;i++){
    const d=addDays(date,-i);
    if(coupleDayHasAnyRecord(me,d)&&coupleDayHasAnyRecord(other,d)) count++;
  }
  return count;
}
function getCoupleGoalRows(me,other,meSnap,otherSnap){
  const meGoal=getGoalProgress(me);
  const otherGoal=getGoalProgress(other);
  const sharedDays=countCoupleSharedDays(me,other,30);
  const exerciseMe=clampPercent(meSnap.exercisePct||0);
  const exerciseOther=clampPercent(otherSnap.exercisePct||0);
  const sleepMe=clampPercent(meSnap.sleepPct||0);
  const sleepOther=clampPercent(otherSnap.sleepPct||0);
  const waterMe=clampPercent(meSnap.waterPct||0);
  const waterOther=clampPercent(otherSnap.waterPct||0);
  return [
    {title:'减脂目标',desc:'体重目标进度',me:meGoal.pct,other:otherGoal.pct,days:sharedDays},
    {title:'运动目标',desc:'今日运动完成度',me:exerciseMe,other:exerciseOther,days:countCoupleSharedDays(me,other,7)},
    {title:'睡眠目标',desc:'昨晚睡眠节奏',me:sleepMe,other:sleepOther,days:countCoupleSharedDays(me,other,14)},
    {title:'习惯养成',desc:`一起坚持记录 ${sharedDays} 天`,me:waterMe,other:waterOther,days:sharedDays}
  ];
}
function renderCoupleProgressMini(label,pct){
  const v=clampPercent(pct||0);
  return `<div><div class="couple-progress-label"><span>${escapeHTML(label)}</span><strong>${v}%</strong></div><div class="couple-mini-track"><div class="couple-mini-fill" style="width:${v}%"></div></div></div>`;
}
function renderCoupleGoalRow(row){
  return `<div class="couple-goal-row">
    <div class="couple-goal-top"><span>${escapeHTML(row.title)}</span><span>共同完成：${row.days}天</span></div>
    <div class="couple-goal-desc">${escapeHTML(row.desc)}</div>
    <div class="couple-progress-duo">${renderCoupleProgressMini('我',row.me)}${renderCoupleProgressMini('TA',row.other)}</div>
  </div>`;
}
function getProfileRecordsInRange(records,startDate,endDate){
  return (records||[]).filter(r=>{
    const d=getRecordDate(r);
    return d>=startDate&&d<=endDate;
  });
}
function getWeightChangeText(profile,days=30,date=currentViewDate){
  const start=addDays(date,-days+1);
  const records=getProfileRecordsInRange(getSortedWeights(profile),start,date);
  if(records.length<2) return '记录不足';
  const diff=Number(records[records.length-1].weight)-Number(records[0].weight);
  if(Math.abs(diff)<0.05) return '基本稳定';
  return `${diff<0?'↓':'↑'}${Math.abs(diff).toFixed(1)}kg`;
}
function getExerciseDaysText(profile,days=7,date=currentViewDate){
  const start=addDays(date,-days+1);
  const daysSet=new Set(getProfileRecordsInRange(profile.exerciseRecords,start,date).map(getRecordDate));
  return `${daysSet.size}次`;
}
function getSleepTrendText(profile,days=7,date=currentViewDate){
  const vals=[];
  for(let i=days-1;i>=0;i--){
    const d=addDays(date,-i);
    const mins=getDailyRecord(profile,d).sleep.reduce((sum,r)=>sum+(Number(r.duration)||0),0);
    if(mins>0) vals.push(mins);
  }
  if(vals.length<2) return '记录不足';
  const mid=Math.max(1,Math.floor(vals.length/2));
  const first=vals.slice(0,mid).reduce((a,b)=>a+b,0)/mid;
  const rest=vals.slice(mid);
  const second=rest.length?rest.reduce((a,b)=>a+b,0)/rest.length:first;
  const diff=Math.round((second-first)/30)*30;
  if(Math.abs(diff)<30) return '基本稳定';
  return `${diff>0?'↑':'↓'}${formatShortSleep(Math.abs(diff))}`;
}
function getWaterCompletionText(profile,days=7,date=currentViewDate){
  let total=0,count=0;
  for(let i=0;i<days;i++){
    const d=addDays(date,-i);
    const goal=calculateDailyWaterGoalForDate(profile,d);
    const water=getDateWaterRecords(profile,d).reduce((sum,r)=>sum+(Number(r.amount)||0),0);
    if(water>0&&goal>0){total+=clampPercent(water/goal*100);count++;}
  }
  return count?`${Math.round(total/count)}%`:'记录不足';
}
const GROWTH_RECORD_TYPES=[
  {key:'weightRecords',type:'weight',label:'体重记录',icon:'scale'},
  {key:'foodRecords',type:'food',label:'饮食记录',icon:'utensils'},
  {key:'waterRecords',type:'water',label:'饮水记录',icon:'droplets'},
  {key:'exerciseRecords',type:'exercise',label:'运动记录',icon:'activity'},
  {key:'stepsRecords',type:'steps',label:'步数记录',icon:'footprints'},
  {key:'sleepRecords',type:'sleep',label:'睡眠记录',icon:'moon'}
];
function getGrowthRecordEntries(profile){
  if(!profile) return [];
  return GROWTH_RECORD_TYPES.flatMap(meta=>(profile[meta.key]||[]).map(record=>{
    const rawDate=record?.date||String(record?.dateTime||'').slice(0,10);
    if(!isValidDateStr(rawDate)) return null;
    return {...meta,record,date:rawDate,time:record.dateTime||`${rawDate}T00:00`};
  }).filter(Boolean)).sort((a,b)=>String(b.time).localeCompare(String(a.time)));
}
function getGrowthGoalProgress(profile,date=currentViewDate){
  const goal=getHealthGoal(profile);
  const weights=getSortedWeights(profile).filter(record=>getRecordDate(record)<=date);
  const latest=weights[weights.length-1]||null;
  const numberOrNull=value=>value===null||value===undefined||value===''?null:Number(value);
  const start=numberOrNull(goal.start_weight);
  const current=numberOrNull(latest?.weight);
  const target=numberOrNull(goal.target_weight);
  let pct=null;
  if(goal.type==='fat_loss'&&start!==null&&current!==null&&target!==null&&start>target){
    pct=clampPercent((start-current)/(start-target)*100);
  }else if(goal.type==='muscle_gain'&&start!==null&&current!==null&&target!==null&&target>start){
    pct=clampPercent((current-start)/(target-start)*100);
  }
  return {goal,start,current,target,pct,reached:pct===100};
}
function getGrowthStreakDays(entries,date=currentViewDate){
  const days=new Set((entries||[]).map(item=>item.date));
  let count=0;
  for(let i=0;i<180;i++){
    if(days.has(addDays(date,-i))) count++;
    else break;
  }
  return count;
}
function getGrowthLatestRecordSummary(entries,date=currentViewDate){
  const eligible=(entries||[]).filter(item=>item.date<=date);
  const latestDate=eligible[0]?.date;
  if(!latestDate) return null;
  const dayEntries=eligible.filter(item=>item.date===latestDate);
  const order=['weight','food','exercise','steps','water','sleep'];
  const summaries=order.map(type=>{
    const items=dayEntries.filter(item=>item.type===type);
    if(!items.length) return null;
    const first=items[0];
    let label=first.label;
    let value=`${items.length}次`;
    if(type==='food'){
      const foodCount=items.reduce((sum,item)=>sum+(Array.isArray(item.record?.foods)&&item.record.foods.length?item.record.foods.length:1),0);
      value=`${foodCount}次`;
    }else if(type==='exercise'){
      const minutes=items.reduce((sum,item)=>{
        const record=item.record||{};
        const match=String(record.detail||'').match(/(\d+)\s*分钟/);
        return sum+(Number(record.duration)||(match?Number(match[1]):0));
      },0);
      label='运动';
      if(minutes>0) value+=` · ${minutes}分钟`;
    }else if(type==='steps'){
      label='步数';
      value=`${items.reduce((sum,item)=>sum+(Number(item.record?.steps)||0),0).toLocaleString()}步`;
    }else if(type==='water'){
      label='饮水';
      const total=items.reduce((sum,item)=>sum+(Number(item.record?.amount)||0),0);
      if(total>0) value+=` · ${Math.round(total).toLocaleString()}ml`;
    }else if(type==='sleep'){
      label='睡眠';
      const minutes=items.reduce((sum,item)=>sum+(Number(item.record?.duration)||0),0);
      value=minutes>0?formatShortSleep(minutes):value;
    }
    return {type,label,icon:first.icon,value};
  }).filter(Boolean);
  return {date:latestDate,items:summaries.slice(0,4),hiddenCount:Math.max(0,summaries.length-4)};
}
function getGrowthRecordDetail(item){
  const record=item.record||{};
  if(item.type==='weight') return Number.isFinite(Number(record.weight))?`${Number(record.weight).toFixed(1)} kg`:item.label;
  if(item.type==='food') return (record.foods||[]).map(food=>food.name).filter(Boolean).slice(0,3).join('、')||item.label;
  if(item.type==='water') return Number(record.amount)>0?`${Number(record.amount)} ml`:item.label;
  if(item.type==='exercise') return [record.name,record.detail||(Number(record.duration)>0?`${Number(record.duration)} 分钟`:'')].filter(Boolean).join(' · ')||item.label;
  if(item.type==='steps') return Number(record.steps)>0?`${Number(record.steps).toLocaleString()} 步`:item.label;
  if(item.type==='sleep') return Number(record.duration)>0?formatShortSleep(Number(record.duration)):item.label;
  return item.label;
}
function formatGrowthDate(date){
  if(date===todayStr()) return `${Number(date.slice(5,7))}月${Number(date.slice(8,10))}日 · 今天`;
  if(date===addDays(todayStr(),-1)) return `${Number(date.slice(5,7))}月${Number(date.slice(8,10))}日 · 昨天`;
  return `${Number(date.slice(5,7))}月${Number(date.slice(8,10))}日`;
}
function openGrowthRecordHistory(date){
  if(date) saveLocalViewDate(date);
  switchAppPage('health');
  requestAnimationFrame(()=>document.getElementById('healthRecordManagement')?.scrollIntoView({behavior:'smooth',block:'start'}));
}
function renderGrowthPage(date=currentViewDate){
  const wrap=document.getElementById('growthPageContent');
  if(!wrap) return;
  const owner=getDeviceOwnerProfile();
  if(!owner){
    wrap.innerHTML='<div class="app-page-note">请先完成个人资料，再开始记录成长。</div>';
    return;
  }
  const entries=getGrowthRecordEntries(owner).filter(item=>item.date<=date);
  const recordedDates=[...new Set(entries.map(item=>item.date))];
  const earliest=recordedDates.length?recordedDates[recordedDates.length-1]:'';
  const journeyDays=earliest?Math.max(1,(daysBetweenDates(earliest,date)||0)+1):null;
  const streak=getGrowthStreakDays(entries,date);
  const progress=getGrowthGoalProgress(owner,date);
  const monthPrefix=date.slice(0,7);
  const monthEntries=entries.filter(item=>item.date.startsWith(monthPrefix));
  const countDays=type=>new Set(monthEntries.filter(item=>!type||item.type===type).map(item=>item.date)).size;
  const summary30=buildHealthProfileInput(owner,date);
  const milestones=[];
  if(earliest) milestones.push({label:'首次记录',value:earliest});
  if(recordedDates.length) milestones.push({label:'累计记录',value:`${recordedDates.length}天`});
  if(streak>0) milestones.push({label:'连续记录',value:`${streak}天`});
  if(progress.reached) milestones.push({label:'健康目标',value:'已达成'});
  const recordSummary=getGrowthLatestRecordSummary(entries,date);
  const recordRows=recordSummary?.items.map(item=>`<div class="couple-timeline-row"><span class="couple-timeline-icon">${icon(item.icon)}</span><span class="couple-timeline-title">${escapeHTML(item.label)}</span><span class="couple-timeline-status">${escapeHTML(item.value)}</span></div>`).join('')||'';
  const recordsHTML=recordSummary
    ? `<div class="couple-timeline"><div class="couple-timeline-group"><div class="couple-timeline-date">${escapeHTML(formatGrowthDate(recordSummary.date))}</div><div class="couple-timeline-rows">${recordRows}</div>${recordSummary.hiddenCount?`<div class="growth-record-more"><button class="couple-link-btn" type="button" data-growth-record-all>还有 ${recordSummary.hiddenCount} 类记录 &gt;</button></div>`:''}</div></div>`
    : `<div class="growth-record-empty"><strong>还没有健康记录</strong><span>完成第一次记录后，这里会留下你的健康足迹。</span><button class="btn btn-ghost btn-sm" type="button" id="growthRecordStartBtn">去记录</button></div>`;
  const startText=progress.start!==null?`${progress.start.toFixed(1)}kg`:'未设置';
  const currentText=progress.current!==null?`${progress.current.toFixed(1)}kg`:'未记录';
  const targetText=progress.goal.type==='maintain'
    ? (progress.start!==null?`${progress.start.toFixed(1)}kg附近`:'保持当前状态')
    : progress.target!==null?`${progress.target.toFixed(1)}kg`:'未设置';
  const progressHTML=progress.pct!==null
    ? `<div class="growth-progress"><div class="growth-progress-fill" style="width:${progress.pct}%"></div></div><div class="growth-progress-note">已完成 ${progress.pct}%</div>`
    : `<div class="growth-progress-note">${progress.goal.type==='maintain'?'持续观察状态变化':'完善起始与目标体重后显示进度'}</div>`;
  wrap.innerHTML=`<div class="couple-space">
    <div class="couple-section growth-hero"><div class="couple-section-title">${icon('chart')} 我的健康旅程</div>${journeyDays!==null?`<div class="growth-hero-value"><strong>${journeyDays}</strong><span>天</span></div><div class="growth-hero-note">起点 ${escapeHTML(earliest)} · 已记录 ${recordedDates.length} 天</div>`:`<div class="couple-records-empty">从首次记录开始，这里会形成个人健康旅程。</div>`}</div>
    <div class="couple-section"><div class="couple-section-title">${icon('target')} 目标进程</div><div class="growth-hero-note">${escapeHTML(progress.goal.title||'健康保持')}</div><div class="growth-goal-grid"><div class="growth-goal-stat"><span>开始状态</span><strong>${escapeHTML(startText)}</strong></div><div class="growth-goal-stat"><span>当前状态</span><strong>${escapeHTML(currentText)}</strong></div><div class="growth-goal-stat"><span>目标状态</span><strong>${escapeHTML(targetText)}</strong></div></div>${progressHTML}</div>
    <div class="couple-section"><div class="couple-section-title">${icon('star')} 我的里程碑</div><div class="growth-milestones">${milestones.length?milestones.map(item=>`<div class="growth-milestone"><span>${escapeHTML(item.label)}</span><strong>${escapeHTML(item.value)}</strong></div>`).join(''):'<div class="couple-records-empty">完成首次健康记录后生成里程碑。</div>'}</div></div>
    <div class="couple-section couple-records"><div class="couple-time-inline-head"><div class="couple-section-title">${icon('clipboard-list')} 我的记录</div>${recordSummary?'<button class="couple-link-btn" type="button" id="growthRecordsAllBtn" data-growth-record-all>查看全部 &gt;</button>':''}</div>${recordsHTML}</div>
    <div class="couple-section"><div class="couple-section-title">${icon('calendar')} 本月表现</div><div class="growth-metric-grid"><div class="growth-metric"><span>记录天数</span><strong>${countDays()}天</strong></div><div class="growth-metric"><span>运动记录天数</span><strong>${countDays('exercise')}天</strong></div><div class="growth-metric"><span>睡眠记录天数</span><strong>${countDays('sleep')}天</strong></div><div class="growth-metric"><span>饮水记录天数</span><strong>${countDays('water')}天</strong></div></div></div>
    <div class="couple-section"><div class="couple-section-title">${icon('activity')} 我的变化</div><div class="growth-change-row"><span>近30天体重</span><strong>${escapeHTML(getWeightChangeText(owner,30,date))}</strong></div><div class="growth-change-row"><span>近30天运动</span><strong>${summary30.exercise.recorded_days}天 · ${summary30.exercise.count}次</strong></div><div class="growth-change-row"><span>近30天睡眠</span><strong>${summary30.sleep.recorded_days?`${summary30.sleep.recorded_days}天 · 平均${formatShortSleep(summary30.sleep.avg_minutes)}`:'记录不足'}</strong></div></div>
  </div>`;
  wrap.querySelectorAll('[data-growth-record-all]').forEach(btn=>btn.addEventListener('click',()=>openGrowthRecordHistory(recordSummary?.date||date)));
  wrap.querySelector('#growthRecordStartBtn')?.addEventListener('click',()=>window.openQuickAddPanel?.());
  renderIcons(wrap);
}
function getCoupleSpace(){
  normalizeCoupleSpace(state);
  return state.coupleSpace;
}
function touchCoupleSpace(){
  const cs=getCoupleSpace();
  cs.updatedAt=Date.now();
  return cs;
}
// ===== Shared Meeting/Trip Source of Truth =====
function getNextMeeting(){
  const cs=getCoupleSpace();
  const today=todayStr();
  return (cs.meetings||[]).filter(m=>{
    if(!m.startDate) return false;
    if(m.startDate>=today) return true;
    const end=m.endDate||m.startDate;
    return end>=today;
  }).sort((a,b)=>a.startDate.localeCompare(b.startDate))[0]||null;
}
function getMeetingById(id){
  if(!id) return null;
  const cs=getCoupleSpace();
  return (cs.meetings||[]).find(m=>m.id===id)||null;
}
function createMeeting(data){
  const cs=touchCoupleSpace();
  const now=Date.now();
  const startDate=isValidDateStr(data.startDate)?data.startDate:'';
  if(!startDate) return null;
  let endDate=isValidDateStr(data.endDate)?data.endDate:'';
  if(endDate&&endDate<startDate) endDate=startDate;
  const meeting={
    id:`meet${now}_${Math.random().toString(36).slice(2,7)}`,
    title:String(data.title||'').slice(0,30),
    type:['meeting','trip','custom'].includes(data.type)?data.type:'meeting',
    startDate,endDate,
    place:String(data.place||'').slice(0,40),
    note:String(data.note||'').slice(0,120),
    createdAt:now,
    updatedAt:now
  };
  cs.meetings=[...(cs.meetings||[]),meeting];
  cs.updatedAt=now;
  return meeting;
}
function updateMeeting(id,patch){
  const cs=getCoupleSpace();
  const idx=(cs.meetings||[]).findIndex(m=>m.id===id);
  if(idx<0) return null;
  const prev=cs.meetings[idx];
  const now=Date.now();
  const updated=Object.assign({},prev);
  if(patch.title!==undefined) updated.title=String(patch.title||'').slice(0,30);
  if(patch.type!==undefined) updated.type=['meeting','trip','custom'].includes(patch.type)?patch.type:'meeting';
  if(patch.startDate!==undefined) updated.startDate=isValidDateStr(patch.startDate)?patch.startDate:'';
  if(patch.endDate!==undefined) updated.endDate=isValidDateStr(patch.endDate)?patch.endDate:'';
  if(patch.place!==undefined) updated.place=String(patch.place||'').slice(0,40);
  if(patch.note!==undefined) updated.note=String(patch.note||'').slice(0,120);
  if(updated.endDate&&updated.startDate&&updated.endDate<updated.startDate) updated.endDate=updated.startDate;
  updated.updatedAt=now;
  cs.meetings[idx]=updated;
  cs.updatedAt=now;
  return updated;
}
function deleteMeeting(id){
  if(!id) return false;
  const cs=getCoupleSpace();
  const now=Date.now();
  const lg=cs.ledger;
  (lg.expenses||[]).forEach(e=>{if(e.periodId===id)e.periodId=null});
  lg.updatedAt=now;
  cs.meetings=(cs.meetings||[]).filter(m=>m.id!==id);
  cs.deletedMeetings=[...(cs.deletedMeetings||[]).filter(t=>t.id!==id),{id,deletedAt:now}];
  if(lg.activePeriodId===id) lg.activePeriodId=null;
  cs.updatedAt=now;
  return true;
}
// ===== Couple Ledger (共同账本) =====
const LEDGER_PERIOD_TYPE_LABELS={meeting:'见面',trip:'旅行',custom:'自定义'};
// occurredAt 允许 YYYY-MM-DD 或 YYYY-MM-DDTHH:mm（datetime-local）
function isValidLedgerDatetime(v){
  const s=String(v||'');
  return isValidDateStr(s) || (isValidDateStr(s.slice(0,10)) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s));
}
function formatLedgerDateTime(dtStr){
  if(!dtStr) return '';
  const m=String(dtStr).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if(!m) return dtStr;
  const [,y,mo,d,h,mi]=m;
  return h?`${y}/${mo}/${d} ${h}:${mi}`:`${y}/${mo}/${d}`;
}
function formatCompactLedgerDateTime(dtStr){
  if(!dtStr) return '选择时间';
  const m=String(dtStr).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if(!m) return String(dtStr);
  const [,y,mo,d,h,mi]=m;
  return h?`${mo}/${d} ${h}:${mi}`:`${mo}/${d}`;
}
function getLedgerFieldValueText(el){
  if(!el) return '未选择';
  if(el.tagName==='SELECT'){
    const opt=el.options[el.selectedIndex];
    return (opt&&opt.text)?opt.text:'未选择';
  }
  return (el.value||'').trim()||'未填写';
}
function refreshLedgerEditorDisplays(form){
  if(!form) return;
  const amt=form.querySelector('#ledgerExpAmount');
  const amtText=form.querySelector('#ledgerExpAmountText');
  if(amt&&amtText){
    const n=parseFloat(String(amt.value||'').replace(/[^0-9.]/g,''));
    amtText.textContent=Number.isFinite(n)?n.toFixed(2):(amt.value||'0.00');
  }
  const mer=form.querySelector('#ledgerExpMerchant');
  const merVal=form.querySelector('#ledgerExpMerchantValue');
  if(mer&&merVal){
    const v=(mer.value||'').trim();
    merVal.textContent=v||'未填写';
    merVal.classList.toggle('is-placeholder',!v);
  }
  const note=form.querySelector('#ledgerExpNote');
  const noteVal=form.querySelector('#ledgerExpNoteValue');
  if(note&&noteVal){
    const v=(note.value||'').trim();
    noteVal.textContent=v||'选填';
    noteVal.classList.toggle('is-placeholder',!v);
  }
  const dt=form.querySelector('#ledgerExpDatetime');
  const dtText=form.querySelector('#ledgerExpDatetimeText');
  if(dt&&dtText) dtText.textContent=formatCompactLedgerDateTime(dt.value);
}
function setLedgerInlineEdit(form,field,on){
  if(!form) return;
  const view=form.querySelector(`[data-ledger-view="${field}"]`);
  const edit=form.querySelector(`[data-ledger-edit="${field}"]`);
  if(view) view.classList.toggle('is-hidden',!!on);
  if(edit) edit.classList.toggle('is-hidden',!on);
  if(on&&edit){
    const input=edit.querySelector('input,textarea');
    if(input) setTimeout(()=>input.focus(),30);
  }
}
function toggleLedgerAIItemEdit(idx){
  _ledgerAIEditIdx=(_ledgerAIEditIdx===idx)?null:idx;
  const form=document.getElementById('coupleLedgerForm');
  const itemsArea=form&&form.querySelector('#ledgerAIItemsArea');
  if(!itemsArea||!_ledgerAIResult||!Array.isArray(_ledgerAIResult.orderItems)) return;
  const list=itemsArea.querySelector('#ledgerAIItemsList');
  if(!list) return;
  list.innerHTML=renderEditableOrderItems(_ledgerAIResult.orderItems);
  bindOrderItemEdits(itemsArea);
  updateLedgerAISubtotal(itemsArea);
}
function getLedger(){
  const cs=getCoupleSpace();
  if(!cs.ledger||typeof cs.ledger!=='object'){
    cs.ledger={expenses:[],deletedExpenses:[],periods:[],deletedPeriods:[],activePeriodId:null,updatedAt:0};
  }
  if(!Array.isArray(cs.ledger.expenses)) cs.ledger.expenses=[];
  if(!Array.isArray(cs.ledger.deletedExpenses)) cs.ledger.deletedExpenses=[];
  if(!Array.isArray(cs.ledger.periods)) cs.ledger.periods=[];
  if(!Array.isArray(cs.ledger.deletedPeriods)) cs.ledger.deletedPeriods=[];
  if(cs.ledger.activePeriodId&&!(cs.meetings||[]).some(m=>m.id===cs.ledger.activePeriodId)) cs.ledger.activePeriodId=null;
  return cs.ledger;
}
function touchLedger(){
  const cs=getCoupleSpace();
  const lg=cs.ledger;
  const now=Date.now();
  lg.updatedAt=now;
  cs.updatedAt=now;
  return lg;
}
function formatLedgerAmount(cents){
  const n=Number(cents)||0;
  return '¥'+(n/100).toFixed(2);
}
function parseLedgerAmountInput(v){
  const n=parseFloat(String(v||'').replace(/[^0-9.]/g,''));
  if(!Number.isFinite(n)||n<=0) return 0;
  return Math.round(n*100);
}
function getLedgerPayerProfile(paidByProfileId){
  return (state.profiles||[]).find(p=>p.id===paidByProfileId)||null;
}
function getLedgerPayerName(paidByProfileId){
  const p=getLedgerPayerProfile(paidByProfileId);
  return (p&&p.name&&p.name.trim())?p.name.trim():'未知';
}
function getLedgerPayerOptions(){
  const owner=getDeviceOwnerProfile();
  const partner=getPartnerProfile(owner);
  const opts=[];
  if(owner) opts.push({id:owner.id,name:(owner.name||'').trim()||'我'});
  if(partner) opts.push({id:partner.id,name:(partner.name||'').trim()||'对方'});
  return opts;
}
function getActivePeriod(){
  const lg=getLedger();
  if(!lg.activePeriodId) return null;
  return getMeetingById(lg.activePeriodId);
}
function isDateInRange(dateStr,startStr,endStr){
  if(!isValidDateStr(dateStr)) return false;
  const d=dateStr.slice(0,10);
  if(startStr&&d<startStr.slice(0,10)) return false;
  if(endStr&&d>endStr.slice(0,10)) return false;
  return true;
}
// Stats helpers — always filter by occurredAt, never by createdAt
function getLedgerExpensesForRange(range,opts){
  const lg=getLedger();
  let expenses=(lg.expenses||[]).slice();
  if(range==='period'){
    const period=opts?.period||getActivePeriod();
    if(!period) return [];
    expenses=expenses.filter(e=>e.periodId===period.id||isDateInRange(e.occurredAt,period.startDate,period.endDate));
  }else if(range==='month'){
    const ref=opts?.date||todayStr();
    const ym=ref.slice(0,7);
    expenses=expenses.filter(e=>(e.occurredAt||'').slice(0,7)===ym);
  }
  if(opts&&opts.category&&opts.category!=='all'){
    expenses=expenses.filter(e=>resolveLedgerCategory(e.category)===opts.category);
  }
  return expenses;
}
function getLedgerTotal(range,opts){
  return getLedgerExpensesForRange(range,opts).reduce((s,e)=>s+(Number(e.amount)||0),0);
}
function getLedgerTotalsByPayer(range){
  const map={};
  getLedgerExpensesForRange(range).forEach(e=>{
    const k=e.paidByProfileId||'unknown';
    map[k]=(map[k]||0)+(Number(e.amount)||0);
  });
  return map;
}
function getLedgerTotalsByCategory(range){
  const map={};
  getLedgerExpensesForRange(range).forEach(e=>{
    const k=resolveLedgerCategory(e.category);
    map[k]=(map[k]||0)+(Number(e.amount)||0);
  });
  return Object.entries(map).map(([category,total])=>({category,total})).sort((a,b)=>b.total-a.total);
}
// CRUD — all go through these unified functions
function addExpense(data){
  const lg=touchLedger();
  const now=Date.now();
  const amount=Math.max(0,Math.round(Number(data.amount)||0));
  const occurredAt=isValidLedgerDatetime(data.occurredAt)?data.occurredAt:'';
  const paidByProfileId=String(data.paidByProfileId||'');
  if(!amount||!occurredAt||!paidByProfileId) return null;
  const exp={
    id:`exp${now}_${Math.random().toString(36).slice(2,7)}`,
    amount,
    category:resolveLedgerCategory(data.category),
    merchant:String(data.merchant||'').slice(0,40),
    paidByProfileId,
    occurredAt,
    note:String(data.note||'').slice(0,200),
    periodId:data.periodId?String(data.periodId):null,
    source:String(data.source||'manual').slice(0,20),
    orderItems:Array.isArray(data.orderItems)?data.orderItems.map(oi=>({
      name:String(oi.name||'').slice(0,40),
      quantity:Number.isFinite(Number(oi.quantity))?Math.max(1,Math.round(Number(oi.quantity))):1,
      spec:oi.spec?String(oi.spec).slice(0,20):null,
      amount:Number.isFinite(Number(oi.amount))?Math.max(0,Math.round(Number(oi.amount))):null
    })).filter(oi=>oi.name).slice(0,30):[],
    linkedFoodRecordIds:[],
    createdAt:now,
    updatedAt:now
  };
  lg.expenses=[...(lg.expenses||[]),exp];
  return exp;
}
function updateExpense(id,patch){
  const lg=touchLedger();
  const idx=(lg.expenses||[]).findIndex(e=>e.id===id);
  if(idx<0) return null;
  const prev=lg.expenses[idx];
  const now=Date.now();
  const updated=Object.assign({},prev);
  if(patch.amount!==undefined) updated.amount=Math.max(0,Math.round(Number(patch.amount)||0));
  if(patch.category!==undefined) updated.category=resolveLedgerCategory(patch.category);
  if(patch.merchant!==undefined) updated.merchant=String(patch.merchant||'').slice(0,40);
  if(patch.paidByProfileId!==undefined) updated.paidByProfileId=String(patch.paidByProfileId||'');
  if(patch.occurredAt!==undefined) updated.occurredAt=isValidLedgerDatetime(patch.occurredAt)?patch.occurredAt:'';
  if(patch.note!==undefined) updated.note=String(patch.note||'').slice(0,200);
  if(patch.periodId!==undefined) updated.periodId=patch.periodId?String(patch.periodId):null;
  if(patch.source!==undefined) updated.source=String(patch.source||'manual').slice(0,20);
  if(patch.orderItems!==undefined) updated.orderItems=Array.isArray(patch.orderItems)?patch.orderItems.map(oi=>({
    name:String(oi.name||'').slice(0,40),
    quantity:Number.isFinite(Number(oi.quantity))?Math.max(1,Math.round(Number(oi.quantity))):1,
    spec:oi.spec?String(oi.spec).slice(0,20):null,
    amount:Number.isFinite(Number(oi.amount))?Math.max(0,Math.round(Number(oi.amount))):null
  })).filter(oi=>oi.name).slice(0,30):[];
  if(patch.linkedFoodRecordIds!==undefined) updated.linkedFoodRecordIds=Array.isArray(patch.linkedFoodRecordIds)?patch.linkedFoodRecordIds.map(x=>String(x)).slice(0,50):[];
  updated.updatedAt=now;
  if(!updated.amount||!updated.occurredAt||!updated.paidByProfileId) return null;
  lg.expenses[idx]=updated;
  return updated;
}
function deleteExpense(id){
  const lg=touchLedger();
  const now=Date.now();
  lg.expenses=(lg.expenses||[]).filter(e=>e.id!==id);
  lg.deletedExpenses=[...(lg.deletedExpenses||[]).filter(t=>t.id!==id),{id,deletedAt:now}];
  return true;
}
function createPeriod(data){
  return createMeeting(data);
}
function updatePeriod(id,patch){
  return updateMeeting(id,patch);
}
function deletePeriod(id){
  return deleteMeeting(id);
}
function setActivePeriod(id){
  if(id&&!getMeetingById(id)) return false;
  const lg=touchLedger();
  lg.activePeriodId=id||null;
  return true;
}
function saveAndRefreshLedger(){
  saveData();
  if(activeAppPage==='couple') renderAppPageSummaries();
  if(activeAppPage==='couple-ledger') renderCoupleLedgerPage();
}
// ===== Couple Ledger UI =====
let ledgerRange='month';
let ledgerCategoryFilter='all';
let _ledgerPeriodPickerCallback=null;
let _ledgerPickerSelectedId='';
let _ledgerAIResult=null;
let _ledgerAIToken=0;
let _ledgerAIPendingDiet=false;
let _ledgerAISourceImageURL=null;
let _ledgerAIDetectedOrders=[];
let _ledgerAISelectedOrderIdx=0;
let _ledgerAIImageType='unknown';
let _ledgerAIEditIdx=null;
function formatLedgerDateGroup(dateStr){
  if(!dateStr) return '';
  const d=dateStr.slice(0,10);
  const dt=new Date(d+'T00:00');
  if(isNaN(dt.getTime())) return d;
  return `${dt.getMonth()+1}月${dt.getDate()}日`;
}
function renderCoupleLedgerSummaryCard(owner,other){
  if(!owner) return '';
  const lg=getLedger();
  const hasData=(lg.expenses||[]).length>0;
  const rangeLabel=ledgerRange==='period'?(getActivePeriod()?.title||'本次见面'):(ledgerRange==='all'?'全部':'本月');
  const total=getLedgerTotal(ledgerRange);
  const payerMap=getLedgerTotalsByPayer(ledgerRange);
  const cats=getLedgerTotalsByCategory(ledgerRange).slice(0,3);
  const payerOpts=getLedgerPayerOptions();
  const period=getActivePeriod();
  const periodLabel=period?period.title:'';
  if(!hasData){
    return `<div class="couple-section">
      <div class="couple-section-title">${icon('wallet')} 共同账本
        <button class="couple-companion-cta" type="button" id="coupleLedgerViewAllBtn" style="margin-left:auto">查看全部 &gt;</button>
      </div>
      <div class="ledger-empty-sub">记录你们每次见面和旅行中的共同支出。</div>
      <div class="ledger-summary-actions">
        <button class="btn btn-sm btn-tonal-gold" type="button" id="coupleLedgerAddBtn">+ 记一笔</button>
      </div>
    </div>`;
  }
  const payerHtml=payerOpts.map(o=>{
    const amt=payerMap[o.id]||0;
    return `<span class="ledger-summary-payer">${escapeHTML(o.name)} <b>${formatLedgerAmount(amt)}</b></span>`;
  }).join('');
  const catHtml=cats.map(c=>`<b>${LEDGER_CATEGORY_LABELS[c.category]||c.category}</b> ${formatLedgerAmount(c.total)}`).join(' · ');
  return `<div class="couple-section">
    <div class="couple-section-title">${icon('wallet')} 共同账本
      <button class="couple-companion-cta" type="button" id="coupleLedgerViewAllBtn" style="margin-left:auto">查看全部 &gt;</button>
    </div>
    <div class="ledger-summary-amount">${formatLedgerAmount(total)}</div>
    <div class="ledger-summary-label">${escapeHTML(rangeLabel)}总支出${periodLabel?` · ${escapeHTML(periodLabel)}`:''}</div>
    <div class="ledger-summary-payers">${payerHtml}</div>
    ${catHtml?`<div class="ledger-summary-cats">Top 3：${catHtml}</div>`:''}
    <div class="ledger-summary-actions">
      <button class="btn btn-sm btn-tonal-gold" type="button" id="coupleLedgerAddBtn">+ 记一笔</button>
    </div>
  </div>`;
}
function renderCoupleLedgerPage(){
  const wrap=document.getElementById('subPage_couple_ledger');
  if(!wrap) return;
  const owner=getDeviceOwnerProfile();
  const lg=getLedger();
  const expenses=getLedgerExpensesForRange(ledgerRange,{category:ledgerCategoryFilter});
  const total=getLedgerTotal(ledgerRange);
  const payerMap=getLedgerTotalsByPayer(ledgerRange);
  const cats=getLedgerTotalsByCategory(ledgerRange);
  const payerOpts=getLedgerPayerOptions();
  const period=getActivePeriod();
  const maxCat=cats.length?cats[0].total:0;
  const rangeLabel=ledgerRange==='period'?(period?escapeHTML(period.title):'未选择周期'):(ledgerRange==='all'?'全部':'本月');
  let body=`
    <div class="ledger-range-row">
      <button class="td-filter-btn ${ledgerRange==='period'?'active':''}" type="button" data-ledger-range="period">本次见面</button>
      <button class="td-filter-btn ${ledgerRange==='month'?'active':''}" type="button" data-ledger-range="month">本月</button>
      <button class="td-filter-btn ${ledgerRange==='all'?'active':''}" type="button" data-ledger-range="all">全部</button>
    </div>`;
  if(ledgerRange==='period'){
    const periodText=period?escapeHTML(period.title):'请选择见面 / 旅行';
    const periodHint=period?`${formatLedgerDateGroup(period.startDate)}${period.endDate&&period.endDate!==period.startDate?' - '+formatLedgerDateGroup(period.endDate):''}`:'';
    body+=`<div class="ledger-period-select" id="ledgerPeriodBar">
      ${icon('calendar')}
      <div class="ledger-period-select-name ${period?'':'placeholder'}">${periodText}</div>
      ${periodHint?`<div class="ledger-period-select-hint">${periodHint}</div>`:''}
      <span class="ledger-period-select-arrow">▼</span>
    </div>`;
  }
  const payerCardsHtml=payerOpts.map(o=>{
    const amt=payerMap[o.id]||0;
    return `<div class="ledger-overview-item">
      <div class="ledger-overview-label">${escapeHTML(o.name)}支付</div>
      <div class="ledger-overview-value">${formatLedgerAmount(amt)}</div>
    </div>`;
  }).join('');
  body+=`<div class="ledger-overview">
    <div class="ledger-overview-item">
      <div class="ledger-overview-label">${rangeLabel}总支出</div>
      <div class="ledger-overview-value gold">${formatLedgerAmount(total)}</div>
    </div>
    ${payerCardsHtml}
  </div>`;
  if(cats.length){
    const topCats=cats.slice(0,3);
    body+=`<div class="ledger-cat-stats">`;
    body+=`<div class="ledger-cat-stats-header"><span class="ledger-cat-stats-title">分类支出</span>`;
    body+=`<button class="couple-companion-cta" type="button" id="ledgerAllCatsBtn">全部分类 &gt;</button>`;
    body+=`</div>`;
    topCats.forEach(c=>{
      const pct=maxCat>0?Math.round(c.total/maxCat*100):0;
      const catIcon=LEDGER_CATEGORY_ICONS[c.category]||'clipboard-list';
      body+=`<div class="ledger-cat-stat-row">
        <span class="ledger-cat-icon">${icon(catIcon)}</span>
        <span class="ledger-cat-name">${LEDGER_CATEGORY_LABELS[c.category]||c.category}</span>
        <span class="ledger-cat-bar"><span class="ledger-cat-bar-fill" style="width:${pct}%"></span></span>
        <span class="ledger-cat-amt">${formatLedgerAmount(c.total)}</span>
      </div>`;
    });
    body+=`</div>`;
  } else {
    body+=`<div class="ledger-cat-stats-empty">暂无分类支出</div>`;
  }
  body+=`<div class="ledger-cat-pills" id="ledgerCatPills">
    <button class="td-filter-btn ${ledgerCategoryFilter==='all'?'active':''}" type="button" data-ledger-cat="all">全部</button>
    ${LEDGER_CATEGORIES.map(c=>`<button class="td-filter-btn ${ledgerCategoryFilter===c?'active':''}" type="button" data-ledger-cat="${c}">${LEDGER_CATEGORY_LABELS[c]}</button>`).join('')}
  </div>`;
  if(!expenses.length){
    body+=`<div class="couple-insufficient">
      <div class="couple-insufficient-title">暂无账单</div>
      <div class="couple-insufficient-sub">${ledgerCategoryFilter!=='all'?'该分类下没有账单，试试切换分类。':'还没有记录，点击右上角记一笔吧。'}</div>
    </div>`;
  }else{
    const groups={};
    expenses.slice().sort((a,b)=>(b.occurredAt||'').localeCompare(a.occurredAt||'')).forEach(e=>{
      const day=(e.occurredAt||'').slice(0,10);
      (groups[day]=groups[day]||[]).push(e);
    });
    Object.keys(groups).sort((a,b)=>b.localeCompare(a)).forEach(day=>{
      body+=`<div class="ledger-day-group">${formatLedgerDateGroup(day)}</div>`;
      groups[day].forEach(e=>{
        const eCat=resolveLedgerCategory(e.category);
        const catIcon=LEDGER_CATEGORY_ICONS[eCat]||'clipboard-list';
        const payerName=getLedgerPayerName(e.paidByProfileId);
        const catLabel=LEDGER_CATEGORY_LABELS[eCat]||eCat;
        body+=`<div class="ledger-row" data-ledger-expense-id="${e.id}">
          <div class="ledger-row-icon">${icon(catIcon)}</div>
          <div class="ledger-row-main">
            <div class="ledger-row-merchant">${escapeHTML(e.merchant||'(未填商家)')}</div>
            <div class="ledger-row-sub">${escapeHTML(payerName)}付款 · ${catLabel}${e.note?' · '+escapeHTML(e.note):''}</div>
          </div>
          <div class="ledger-row-amount">${formatLedgerAmount(e.amount)}</div>
        </div>`;
      });
    });
  }
  wrap.innerHTML=_subPageHeader('共同账本','',{backPage:'couple',backLabel:'返回我们页',rightAction:'openCoupleLedgerEditor()',rightActionLabel:'+记一笔'})+`<div class="sub-page-content">${body}</div>`;
  renderIcons(wrap);
  wrap.querySelectorAll('[data-ledger-range]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      ledgerRange=btn.dataset.ledgerRange;
      ledgerCategoryFilter='all';
      renderCoupleLedgerPage();
    });
  });
  wrap.querySelectorAll('[data-ledger-cat]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      ledgerCategoryFilter=btn.dataset.ledgerCat;
      renderCoupleLedgerPage();
    });
  });
  wrap.querySelectorAll('[data-ledger-expense-id]').forEach(row=>{
    row.addEventListener('click',()=>openCoupleLedgerEditor(row.dataset.ledgerExpenseId));
  });
  wrap.querySelector('#ledgerPeriodBar')?.addEventListener('click',openMeetingPicker);
  wrap.querySelector('#ledgerAllCatsBtn')?.addEventListener('click',openLedgerAllCategories);
}
async function callExpenseRecognitionAI(imageURL,signal){
  const response=await fetch(getApiUrl('/api/recognize-expense'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({image:imageURL}),
    signal
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok){
    throw new Error(data?.error||data?.message||`识别失败：HTTP ${response.status}`);
  }
  return data?.text||'';
}
function parseExpenseAIResult(text){
  const raw=String(text||'').trim();
  try{return JSON.parse(raw)}catch(e){}
  const match=raw.match(/\{[\s\S]*\}/);
  if(match){try{return JSON.parse(match[0])}catch(e){}}
  return null;
}
function prefillLedgerEditorFromAI(result,form,imageURL){
  if(!result) return;
  if(imageURL) _ledgerAISourceImageURL=imageURL;
  _ledgerAIImageType=result.imageType||'unknown';
  _ledgerAIDetectedOrders=Array.isArray(result.orders)?result.orders.filter(o=>o&&typeof o==='object'):[];
  if(_ledgerAISourceImageURL){
    renderLedgerAISourceImage(form,_ledgerAISourceImageURL);
  }
  if(_ledgerAIDetectedOrders.length===0){
    const ordersArea=form.querySelector('#ledgerAIOrdersArea');
    if(ordersArea) ordersArea.style.display='none';
    const itemsArea=form.querySelector('#ledgerAIItemsArea');
    if(itemsArea) itemsArea.style.display='none';
    _ledgerAIResult=null;
    return;
  }
  renderLedgerAIOrders(form);
  selectLedgerAIOrder(0);
}
function renderLedgerAISourceImage(form,imageURL){
  const area=form.querySelector('#ledgerAISourceImgArea');
  if(!area||!imageURL) return;
  area.style.display='';
  area.innerHTML=`<div class="ledger-ai-source-img">
    <div class="ledger-ai-source-img-header">
      <div class="ledger-ai-source-img-label">原始截图</div>
      <div class="ledger-ai-source-img-view-btn" onclick="openLedgerImageViewer()">查看大图 <span class="ui-icon" data-icon="image"></span></div>
    </div>
    <img class="ledger-ai-source-img-thumb" src="${imageURL}" alt="原始订单截图" onclick="openLedgerImageViewer()">
  </div>`;
  renderIcons(area);
}
function renderLedgerAIOrders(form){
  const area=form.querySelector('#ledgerAIOrdersArea');
  if(!area) return;
  if(_ledgerAIDetectedOrders.length===0){area.style.display='none';return}
  area.style.display='';
  const count=_ledgerAIDetectedOrders.length;
  let html=count>1?`<div class="ledger-ai-orders-header">识别到 ${count} 笔订单，请选择</div>`:'';
  _ledgerAIDetectedOrders.forEach((order,i)=>{
    const amount=order.amount!=null&&!isNaN(Number(order.amount))?`¥${Number(order.amount).toFixed(2)}`:'¥—';
    const merchant=order.merchant||'未知商家';
    const selected=i===_ledgerAISelectedOrderIdx;
    if(count===1){
      html+=`<div class="ledger-source ledger-ai-order-card selected" data-order-idx="${i}">
        <div class="ledger-source-title">${escapeHTML(merchant)}</div>
        <div class="ledger-source-meta">订单实付 <strong>${amount}</strong></div>
      </div>`;
    }else{
      html+=`<div class="ledger-ai-order-card${selected?' selected':''}" data-order-idx="${i}">
      <div class="ledger-ai-order-card-head">
        <div class="ledger-ai-order-card-merchant">${escapeHTML(merchant)}</div>
        <div class="ledger-ai-order-card-amount">${amount}</div>
      </div>
        <div class="ledger-ai-order-card-use"><button type="button">${selected?'当前使用':'使用这笔'}</button></div>
    </div>`;
    }
  });
  area.innerHTML=html;
  area.querySelectorAll('.ledger-ai-order-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const idx=Number(card.dataset.orderIdx);
      selectLedgerAIOrder(idx);
    });
  });
}
function selectLedgerAIOrder(idx){
  if(idx<0||idx>=_ledgerAIDetectedOrders.length) return;
  _ledgerAISelectedOrderIdx=idx;
  _ledgerAIEditIdx=null;
  const order=_ledgerAIDetectedOrders[idx];
  const form=document.getElementById('coupleLedgerForm');
  if(!form) return;
  const cards=form.querySelectorAll('.ledger-ai-order-card');
  cards.forEach((card,i)=>{
    const btn=card.querySelector('.ledger-ai-order-card-use button');
    if(i===idx){card.classList.add('selected');if(btn)btn.textContent='当前使用'}
    else{card.classList.remove('selected');if(btn)btn.textContent='使用这笔'}
  });
  if(order.amount!=null&&!isNaN(Number(order.amount))){
    const amountInput=form.querySelector('#ledgerExpAmount');
    if(amountInput) amountInput.value=(Number(order.amount)).toFixed(2);
  }
  if(order.categoryKey){
    const catSelect=form.querySelector('#ledgerExpCategory');
    if(catSelect) catSelect.value=resolveLedgerCategory(order.categoryKey);
  }
  if(order.merchant){
    const merchantInput=form.querySelector('#ledgerExpMerchant');
    if(merchantInput) merchantInput.value=String(order.merchant).slice(0,40);
  }
  if(order.occurredAt){
    const dt=String(order.occurredAt).slice(0,16);
    if(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dt)){
      const dtInput=form.querySelector('#ledgerExpDatetime');
      if(dtInput) dtInput.value=dt;
    }
  }
  refreshLedgerEditorDisplays(form);
  const items=Array.isArray(order.orderItems)?order.orderItems:[];
  const isOrderType=_ledgerAIImageType==='food_order'||_ledgerAIImageType==='hotel_order'||_ledgerAIImageType==='transport_order'||_ledgerAIImageType==='shopping_order'||_ledgerAIImageType==='other_order';
  const source=isOrderType?'ai_order':'ai_payment';
  const normalizedItems=items.map(oi=>normalizeOrderItem(oi));
  _ledgerAIResult={source,orderItems:normalizedItems,imageType:_ledgerAIImageType};
  const itemsArea=form.querySelector('#ledgerAIItemsArea');
  if(itemsArea){
    if(normalizedItems.length>0){
      itemsArea.style.display='';
      itemsArea.classList.remove('collapsed');
      itemsArea.querySelector('#ledgerAIItemsList').innerHTML=renderEditableOrderItems(normalizedItems);
      bindOrderItemEdits(itemsArea);
      updateLedgerAISubtotal(itemsArea);
    }else{
      itemsArea.style.display='none';
    }
  }
}
function openLedgerImageViewer(){
  const imageURL=_ledgerAISourceImageURL;
  if(!imageURL) return;
  const overlay=document.createElement('div');
  overlay.className='ledger-img-viewer-overlay';
  overlay.innerHTML=`<div class="ledger-img-viewer-header"><button class="ledger-img-viewer-close" type="button">×</button></div><div class="ledger-img-viewer-scroll"><img class="ledger-img-viewer-img" src="${imageURL}" alt="原始截图"></div>`;
  document.body.appendChild(overlay);
  const close=()=>{overlay.remove();document.removeEventListener('keydown',escClose)};
  const escClose=(e)=>{if(e.key==='Escape')close()};
  overlay.querySelector('.ledger-img-viewer-close').addEventListener('click',close);
  overlay.addEventListener('click',(e)=>{if(e.target===overlay)close()});
  document.addEventListener('keydown',escClose);
}
const FEE_ITEM_KEYWORDS=['包装费','配送费','服务费','餐盒费','打包费','运费','配送','包装','餐盒','服务','满减','优惠','红包','折扣','抵扣','优惠券'];
function isFeeOrderItem(name){
  const n=String(name||'').toLowerCase();
  return FEE_ITEM_KEYWORDS.some(k=>n.includes(k.toLowerCase()));
}
function normalizeOrderItem(oi){
  const name=String(oi.name||'').trim();
  const fee=isFeeOrderItem(name);
  const quantity=Math.max(1,Number(oi.quantity)||1);
  let unitPrice=Number(oi.unitPrice);
  let lineTotal=Number(oi.lineTotal);
  const amount=Number(oi.amount);
  if(isNaN(unitPrice)){
    if(!isNaN(lineTotal)&&quantity>0){unitPrice=lineTotal/quantity}
    else if(!isNaN(amount)){unitPrice=fee?amount:amount/quantity}
    else{unitPrice=0}
  }
  if(isNaN(lineTotal)){lineTotal=fee?(unitPrice||amount||0):unitPrice*quantity}
  if(isNaN(lineTotal))lineTotal=0;
  return{name,spec:oi.spec||null,quantity:fee?1:quantity,unitPrice:Number(unitPrice.toFixed(2)),lineTotal:Number(lineTotal.toFixed(2)),isFee:fee};
}
function renderEditableOrderItems(items){
  let html='';
  items.forEach((oi,i)=>{
    const editing=_ledgerAIEditIdx===i;
    if(oi.isFee){
      if(!editing){
        html+=`<div class="ledger-ai-fee-view" data-idx="${i}" data-ledger-ai-edit="${i}">
          <div class="ledger-ai-item-view-name">${escapeHTML(oi.name||'打包费')}</div>
          <span class="ledger-ai-fee-view-amt">¥${Number(oi.unitPrice||0).toFixed(2)}</span>
        </div>`;
      }else{
      html+=`<div class="ledger-ai-fee-row" data-idx="${i}">
        <input class="ledger-ai-fee-name" type="text" value="${escapeHTML(oi.name)}" data-field="name" maxlength="30">
        <div class="ledger-ai-price-wrap">
          <span class="ledger-ai-price-prefix">¥</span>
          <input class="ledger-ai-price-input" type="number" step="0.01" min="0" value="${oi.unitPrice.toFixed(2)}" data-field="unitPrice" oninput="updateLedgerAIItem(${i})">
        </div>
          <button class="ls-edit-link" type="button" data-ledger-ai-done="${i}">完成</button>
        </div>`;
      }
    }else if(!editing){
      html+=`<div class="ledger-ai-item-view" data-idx="${i}" data-ledger-ai-edit="${i}">
        <div class="ledger-ai-item-view-main">
          <div class="ledger-ai-item-view-name">${escapeHTML(oi.name)}</div>
          <div class="ledger-ai-item-view-sub">${oi.quantity} 份 × ¥${Number(oi.unitPrice||0).toFixed(2)}</div>
        </div>
        <button class="ls-edit-link" type="button">编辑</button>
      </div>`;
    }else{
      html+=`<div class="ledger-ai-edit-row" data-idx="${i}" style="flex-wrap:wrap">
        <div class="ledger-ai-item-edit-head" style="flex-basis:100%">
          <input class="form-input ledger-ai-edit-name" type="text" value="${escapeHTML(oi.name)}" data-field="name" maxlength="30">
          <button class="ls-edit-link" type="button" data-ledger-ai-done="${i}">完成</button>
        </div>
        <div class="ledger-ai-qty-group ds-stepper ds-stepper--compact">
          <button class="ds-stepper-btn ledger-ai-qty-btn" type="button" onclick="adjustLedgerAIQty(${i},-1)">−</button>
          <label class="ds-stepper-input-wrap">
            <input class="ds-stepper-input ledger-ai-qty-input" id="ledgerAIQty_${i}" type="number" min="1" value="${oi.quantity}" readonly inputmode="numeric" aria-label="订单数量">
          </label>
          <button class="ds-stepper-btn ledger-ai-qty-btn" type="button" onclick="adjustLedgerAIQty(${i},1)">+</button>
        </div>
        <span style="flex:1"></span>
        <div class="ledger-ai-price-wrap">
          <span class="ledger-ai-price-prefix">¥</span>
          <input class="ledger-ai-price-input" type="number" step="0.01" min="0" value="${oi.unitPrice.toFixed(2)}" data-field="unitPrice" oninput="updateLedgerAIItem(${i})">
        </div>
      </div>`;
    }
  });
  html+=`<div class="ledger-ai-subtotal">
    <span>商品明细合计</span>
    <span class="ledger-ai-subtotal-val" id="ledgerAISubtotalVal">¥0.00</span>
  </div>
  <div class="ledger-ai-subtotal-hint" id="ledgerAISubtotalHint">实际支付金额可能包含优惠、配送费、平台调整等</div>`;
  return html;
}
function bindOrderItemEdits(itemsArea){
  const list=itemsArea.querySelector('#ledgerAIItemsList');
  if(!list) return;
  list.querySelectorAll('[data-field="name"]').forEach(inp=>{
    inp.addEventListener('input',()=>{
      const row=inp.closest('[data-idx]');
      if(!row) return;
      const idx=Number(row.dataset.idx);
      syncLedgerAIItemName(idx,inp.value);
    });
  });
  list.querySelectorAll('[data-ledger-ai-edit]').forEach(el=>{
    el.addEventListener('click',()=>{
      const idx=Number(el.dataset.ledgerAiEdit);
      if(Number.isFinite(idx)) toggleLedgerAIItemEdit(idx);
    });
  });
  list.querySelectorAll('[data-ledger-ai-done]').forEach(el=>{
    el.addEventListener('click',e=>{
      e.stopPropagation();
      _ledgerAIEditIdx=null;
      toggleLedgerAIItemEdit(null);
    });
  });
  const amountInput=document.querySelector('#ledgerExpAmount');
  if(amountInput&&!amountInput._aiSubtotalBound){
    amountInput._aiSubtotalBound=true;
    amountInput.addEventListener('input',()=>updateLedgerAISubtotal(itemsArea));
  }
}
function syncLedgerAIItemName(idx,name){
  if(!_ledgerAIResult||!Array.isArray(_ledgerAIResult.orderItems)) return;
  if(!_ledgerAIResult.orderItems[idx]) return;
  _ledgerAIResult.orderItems[idx].name=String(name||'').trim();
}
function adjustLedgerAIQty(idx,delta){
  if(!_ledgerAIResult||!_ledgerAIResult.orderItems||!_ledgerAIResult.orderItems[idx]) return;
  const oi=_ledgerAIResult.orderItems[idx];
  if(oi.isFee) return;
  oi.quantity=Math.max(1,oi.quantity+delta);
  oi.lineTotal=Number((oi.quantity*oi.unitPrice).toFixed(2));
  const qtyEl=document.getElementById(`ledgerAIQty_${idx}`);
  if(qtyEl) qtyEl.value=oi.quantity;
  const itemsArea=document.querySelector('#ledgerAIItemsArea');
  if(itemsArea) updateLedgerAISubtotal(itemsArea);
}
function updateLedgerAIItem(idx){
  if(!_ledgerAIResult||!_ledgerAIResult.orderItems||!_ledgerAIResult.orderItems[idx]) return;
  const oi=_ledgerAIResult.orderItems[idx];
  const itemsArea=document.querySelector('#ledgerAIItemsArea');
  if(!itemsArea) return;
  const row=itemsArea.querySelector(`[data-idx="${idx}"]`);
  if(!row) return;
  const priceInput=row.querySelector('[data-field="unitPrice"]');
  if(priceInput){
    const v=Number(priceInput.value);
    if(!isNaN(v)&&v>=0){
      oi.unitPrice=Number(v.toFixed(2));
      oi.lineTotal=Number((oi.quantity*oi.unitPrice).toFixed(2));
    }
  }
  updateLedgerAISubtotal(itemsArea);
}
function updateLedgerAISubtotal(itemsArea){
  if(!_ledgerAIResult||!Array.isArray(_ledgerAIResult.orderItems)) return;
  const subtotal=_ledgerAIResult.orderItems.reduce((s,oi)=>s+(Number(oi.lineTotal)||0),0);
  const subEl=itemsArea.querySelector('#ledgerAISubtotalVal');
  if(subEl) subEl.textContent=`¥${subtotal.toFixed(2)}`;
  const amountInput=document.querySelector('#ledgerExpAmount');
  const paidAmount=amountInput?Number(amountInput.value):0;
  const hintEl=itemsArea.querySelector('#ledgerAISubtotalHint');
  if(hintEl) hintEl.style.display='';
}
async function handleLedgerAIFile(file,form){
  if(!file) return;
  const token=++_ledgerAIToken;
  const aiEntry=form.querySelector('#ledgerAIEntry');
  const aiStatus=form.querySelector('#ledgerAIStatus');
  if(aiEntry) aiEntry.style.display='none';
  if(aiStatus) aiStatus.style.display='';
  if(aiStatus) aiStatus.textContent='正在压缩图片…';
  _ledgerAISourceImageURL=null;
  _ledgerAIDetectedOrders=[];
  _ledgerAISelectedOrderIdx=0;
  _ledgerAIImageType='unknown';
  const oldOrdersArea=form.querySelector('#ledgerAIOrdersArea');
  if(oldOrdersArea) oldOrdersArea.style.display='none';
  const oldItemsArea=form.querySelector('#ledgerAIItemsArea');
  if(oldItemsArea) oldItemsArea.style.display='none';
  const oldImgArea=form.querySelector('#ledgerAISourceImgArea');
  if(oldImgArea) oldImgArea.style.display='none';
  try{
    const compressed=await compressFoodImage(file,{maxSide:1280,quality:.80});
    if(token!==_ledgerAIToken) return;
    const imageURL=compressed.url;
    _ledgerAISourceImageURL=imageURL;
    if(aiStatus) aiStatus.textContent='正在识别账单…';
    const text=await callExpenseRecognitionAI(imageURL);
    if(token!==_ledgerAIToken) return;
    const result=parseExpenseAIResult(text);
    if(!result||result.imageType==='unknown'||!result.ok){
      renderLedgerAISourceImage(form,imageURL);
      if(aiStatus) aiStatus.innerHTML='未识别到明确订单，你可以查看原图后手动填写。<br><button class="ledger-ai-retry-btn" type="button" onclick="retryLedgerAIRecognition()">重新识别</button>';
      if(aiStatus) aiStatus.style.color='var(--txt3)';
      if(aiEntry) aiEntry.style.display='';
      _ledgerAIResult=null;
      return;
    }
    if(result.imageType==='food_photo'){
      if(aiStatus) aiStatus.innerHTML='检测到食物照片，请使用"AI智能识别"功能记录饮食<br><span style="font-size:11px;color:var(--txt3)">如需记录账单，请上传付款/订单截图</span>';
      if(aiStatus) aiStatus.style.color='var(--gold-l)';
      if(aiEntry) aiEntry.style.display='';
      _ledgerAIResult=null;
      return;
    }
    prefillLedgerEditorFromAI(result,form,imageURL);
    if(aiStatus){
      aiStatus.textContent='AI已智能填充，请确认';
      aiStatus.style.color='var(--gold-l)';
    }
    if(aiEntry) aiEntry.style.display='';
  }catch(err){
    if(token!==_ledgerAIToken) return;
    console.error('Ledger AI recognition error:',err);
    if(_ledgerAISourceImageURL){
      renderLedgerAISourceImage(form,_ledgerAISourceImageURL);
    }
    if(aiStatus){
      aiStatus.innerHTML='识别失败<br><button class="ledger-ai-retry-btn" type="button" onclick="retryLedgerAIRecognition()">重新识别</button>';
      aiStatus.style.color='var(--txt3)';
    }
    if(aiEntry) aiEntry.style.display='';
    _ledgerAIResult=null;
  }
}
async function retryLedgerAIRecognition(){
  const imageURL=_ledgerAISourceImageURL;
  if(!imageURL) return;
  const form=document.getElementById('coupleLedgerForm');
  if(!form) return;
  const aiStatus=form.querySelector('#ledgerAIStatus');
  const aiEntry=form.querySelector('#ledgerAIEntry');
  const token=++_ledgerAIToken;
  if(aiEntry) aiEntry.style.display='none';
  if(aiStatus) aiStatus.style.display='';
  if(aiStatus) aiStatus.textContent='正在重新识别…';
  const retryOrdersArea=form.querySelector('#ledgerAIOrdersArea');
  if(retryOrdersArea) retryOrdersArea.style.display='none';
  const retryItemsArea=form.querySelector('#ledgerAIItemsArea');
  if(retryItemsArea) retryItemsArea.style.display='none';
  try{
    const text=await callExpenseRecognitionAI(imageURL);
    if(token!==_ledgerAIToken) return;
    const result=parseExpenseAIResult(text);
    if(!result||result.imageType==='unknown'||!result.ok){
      if(aiStatus) aiStatus.innerHTML='未识别到明确订单，你可以查看原图后手动填写。<br><button class="ledger-ai-retry-btn" type="button" onclick="retryLedgerAIRecognition()">重新识别</button>';
      if(aiStatus) aiStatus.style.color='var(--txt3)';
      if(aiEntry) aiEntry.style.display='';
      return;
    }
    prefillLedgerEditorFromAI(result,form,imageURL);
    if(aiStatus){
      aiStatus.textContent='AI已智能填充，请确认';
      aiStatus.style.color='var(--gold-l)';
    }
    if(aiEntry) aiEntry.style.display='';
  }catch(err){
    if(token!==_ledgerAIToken) return;
    if(aiStatus){
      aiStatus.innerHTML='识别失败<br><button class="ledger-ai-retry-btn" type="button" onclick="retryLedgerAIRecognition()">重新识别</button>';
      aiStatus.style.color='var(--txt3)';
    }
    if(aiEntry) aiEntry.style.display='';
  }
}
function openCoupleLedgerEditor(expenseId){
  const modal=document.getElementById('coupleLedgerModal');
  const form=document.getElementById('coupleLedgerForm');
  if(!modal||!form) return;
  const titleEl=document.getElementById('coupleLedgerModalTitle');
  const isEdit=!!expenseId;
  const lg=getLedger();
  const existing=isEdit?(lg.expenses||[]).find(e=>e.id===expenseId):null;
  const owner=getDeviceOwnerProfile();
  const partner=getPartnerProfile(owner);
  const payerOpts=getLedgerPayerOptions();
  const periods=(getCoupleSpace().meetings||[]).slice().sort((a,b)=>(b.startDate||'').localeCompare(a.startDate||''));
  const activePeriod=getActivePeriod();
  const now=new Date();
  const defaultDatetime=existing?.occurredAt||`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}T${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  titleEl.textContent=isEdit?'编辑账单':'记一笔';
  _ledgerAIResult=null;
  _ledgerAIToken++;
  _ledgerAISourceImageURL=null;
  _ledgerAIDetectedOrders=[];
  _ledgerAISelectedOrderIdx=0;
  _ledgerAIImageType='unknown';
  _ledgerAIEditIdx=null;
  let defaultPeriodId=existing?.periodId;
  if(defaultPeriodId===undefined){
    defaultPeriodId=(activePeriod&&isDateInRange(defaultDatetime,activePeriod.startDate,activePeriod.endDate))?activePeriod.id:(activePeriod?activePeriod.id:null);
  }
  const defaultPayerId=existing?.paidByProfileId||(owner&&owner.id)||'';
  const defaultPayerName=(payerOpts.find(o=>o.id===defaultPayerId)||{}).name||'未选择';
  const defaultCat=existing?resolveLedgerCategory(existing.category):'food';
  const amountDisplay=existing?(existing.amount/100).toFixed(2):'';
  const merchantVal=existing?.merchant||'';
  const noteVal=existing?.note||'';
  form.innerHTML=`
    <div class="modal-scroll-region ledger-modal-scroll">
    ${!isEdit?`
    <div class="ledger-ai-entry" id="ledgerAIEntry">
      <div class="ledger-ai-entry-btn" id="ledgerAIBtn">
        <span class="ui-icon" data-icon="sparkles"></span>
        <span>AI智能填充 · 识别付款或订单截图</span>
        <span class="ui-icon ledger-ai-entry-arrow" data-icon="chevron-right"></span>
      </div>
      <input type="file" id="ledgerAIInput" class="photo-input-native" accept="image/*" capture="environment" style="display:none">
    </div>
    <div class="ledger-ai-status" id="ledgerAIStatus" style="display:none"></div>
    <div id="ledgerAISourceImgArea" style="display:none"></div>
    <div id="ledgerAIOrdersArea" style="display:none"></div>
    <div class="ledger-ai-items-area" id="ledgerAIItemsArea" style="display:none">
      <div class="ledger-ai-items-header" id="ledgerAIItemsToggle">识别到的订单内容 <span class="ledger-ai-items-arrow">▾</span></div>
      <div id="ledgerAIItemsList"></div>
    </div>
    `:''}
    <div class="ledger-hero">
      <div class="ledger-hero-top">
        <div class="ledger-hero-kicker">本次记账</div>
        <button class="ls-edit-link" type="button" id="ledgerExpAmountEditBtn">编辑</button>
      </div>
      <div class="ledger-hero-display" data-ledger-view="amount">
        <span class="ledger-hero-yen">¥</span>
        <span class="ledger-hero-num" id="ledgerExpAmountText">${amountDisplay||'0.00'}</span>
      </div>
      <div class="ledger-hero-edit is-hidden" data-ledger-edit="amount">
      <span class="ledger-amount-symbol">¥</span>
        <input class="form-input ledger-amount-input" id="ledgerExpAmount" type="text" inputmode="decimal" placeholder="0.00" value="${amountDisplay}">
    </div>
    </div>
    <div class="ledger-settings-divider"></div>
    <div class="ledger-settings">
      <div class="ledger-form-fields">
        <div class="form-group ledger-form-field">
          <label for="ledgerExpPayer">付款人</label>
        <select class="form-select" id="ledgerExpPayer">
          ${payerOpts.map(o=>`<option value="${o.id}" ${existing?.paidByProfileId===o.id||(!existing&&owner&&o.id===owner.id)?'selected':''}>${escapeHTML(o.name)}</option>`).join('')}
        </select>
      </div>
        <div class="form-group ledger-form-field">
          <label for="ledgerExpCategory">分类</label>
        <select class="form-select" id="ledgerExpCategory">
          ${LEDGER_CATEGORIES.map(c=>`<option value="${c}" ${(existing&&resolveLedgerCategory(existing.category)===c)||(!existing&&c==='food')?'selected':''}>${LEDGER_CATEGORY_LABELS[c]}</option>`).join('')}
        </select>
      </div>
      </div>
      <div class="ledger-settings-divider"></div>
      <div class="ledger-settings-rows">
      <div class="ls-row" data-ledger-view="merchant" data-ledger-open="merchant">
        <span class="ls-row-label">商家</span>
        <span class="ls-row-value ${merchantVal?'':'is-placeholder'}" id="ledgerExpMerchantValue">${escapeHTML(merchantVal||'未填写')}</span>
        <span class="ls-row-chevron">›</span>
        </div>
      <div class="ls-row-edit is-hidden" data-ledger-edit="merchant">
        <input class="form-input" id="ledgerExpMerchant" type="text" maxlength="40" value="${escapeHTML(merchantVal)}" placeholder="如：海底捞">
      </div>
      <div class="ls-row" id="ledgerExpDatetimeBtn" role="button" tabindex="0" aria-label="选择日期时间">
        <span class="ls-row-label">日期/时间</span>
        <span class="ls-row-value" id="ledgerExpDatetimeText">${formatCompactLedgerDateTime(defaultDatetime.slice(0,16))}</span>
        <span class="ls-row-chevron">›</span>
      </div>
      <input type="hidden" id="ledgerExpDatetime" value="${defaultDatetime.slice(0,16)}">
      <div class="ls-row" id="ledgerExpPeriodBtn">
        <span class="ls-row-label">关联见面/旅行</span>
        <span class="ls-row-value" id="ledgerExpPeriodText">${(() => {
            const pid=defaultPeriodId;
            if(!pid) return '不关联';
            const p=periods.find(x=>x.id===pid);
            if(!p) return '不关联';
            const fs=formatLedgerDateGroup(p.startDate);
            const fe=p.endDate?formatLedgerDateGroup(p.endDate):'';
            return `${escapeHTML(p.title)}${fs?` · ${fs}${fe?' - '+fe:''}`:''}`;
          })()}</span>
        <span class="ls-row-chevron">›</span>
        </div>
      <input type="hidden" id="ledgerExpPeriod" value="${defaultPeriodId||''}">
      <div class="ls-row" data-ledger-view="note" data-ledger-open="note">
        <span class="ls-row-label">备注</span>
        <span class="ls-row-value ${noteVal?'':'is-placeholder'}" id="ledgerExpNoteValue">${escapeHTML(noteVal||'选填')}</span>
        <span class="ls-row-chevron">›</span>
      </div>
      <div class="ls-row-edit is-hidden" data-ledger-edit="note">
        <input class="form-input" id="ledgerExpNote" type="text" maxlength="200" value="${escapeHTML(noteVal)}" placeholder="选填">
      </div>
      </div>
      ${isEdit&&existing&&Array.isArray(existing.orderItems)&&existing.orderItems.length>0?`
        ${(()=>{
          const links=Array.isArray(existing.linkedFoodRecordIds)?existing.linkedFoodRecordIds.filter(Boolean):[];
          if(links.length>0){
            return `<div class="food-sync-linked-badge" id="ledgerExpFoodSync"><span class="ui-icon" data-icon="circle-check"></span>已关联饮食记录 ${links.length} 条 <span class="ui-icon" data-icon="chevron-right"></span></div>`;
          }
          return `<div class="food-sync-linked-badge" id="ledgerExpFoodSync"><span class="ui-icon" data-icon="utensils"></span>同步到饮食 <span class="ui-icon" data-icon="chevron-right"></span></div>`;
        })()}
      `:''}
    </div>
    </div>
    <div class="ledger-modal-footer">
    <div class="couple-form-actions">
      <button class="btn btn-ghost" type="button" id="ledgerExpCancel">取消</button>
      ${isEdit?`<button class="btn btn-ghost" type="button" id="ledgerExpDelete" style="color:var(--red,#f87171)">删除</button>`:''}
      <button class="btn btn-gold" type="button" id="ledgerExpSave" data-ledger-exp-id="${expenseId||''}">保存</button>
      </div>
    </div>`;
  renderIcons(modal);
  modal.classList.add('show');
  GlassScrollLock.lock('modal:coupleLedgerModal');
  modal.querySelector('#coupleLedgerClose')?.addEventListener('click',()=>closeLedgerEditor());
  form.querySelector('#ledgerExpCancel').addEventListener('click',()=>closeLedgerEditor());
  form.querySelector('#ledgerExpSave').addEventListener('click',saveCoupleLedgerExpense);
  const amtInput=form.querySelector('#ledgerExpAmount');
  const amtEditBtn=form.querySelector('#ledgerExpAmountEditBtn');
  if(amtInput){
    amtInput.addEventListener('input',()=>refreshLedgerEditorDisplays(form));
  }
  if(amtEditBtn){
    const toggleAmtEdit=(on)=>{
      const edit=form.querySelector('[data-ledger-edit="amount"]');
      const view=form.querySelector('[data-ledger-view="amount"]');
      const turningOn=on==null?(edit&&edit.classList.contains('is-hidden')):!!on;
      if(edit) edit.classList.toggle('is-hidden',!turningOn);
      if(view) view.classList.toggle('is-hidden',!!turningOn);
      amtEditBtn.textContent=turningOn?'完成':'编辑';
      if(turningOn&&amtInput) setTimeout(()=>amtInput.focus(),30);
      else refreshLedgerEditorDisplays(form);
    };
    amtEditBtn.addEventListener('click',()=>toggleAmtEdit());
    form.querySelector('[data-ledger-view="amount"]')?.addEventListener('click',()=>{
      const edit=form.querySelector('[data-ledger-edit="amount"]');
      if(edit&&edit.classList.contains('is-hidden')) toggleAmtEdit(true);
    });
    amtInput?.addEventListener('blur',()=>{
      const edit=form.querySelector('[data-ledger-edit="amount"]');
      if(edit&&!edit.classList.contains('is-hidden')) toggleAmtEdit(false);
    });
  }
  form.querySelector('[data-ledger-open="merchant"]')?.addEventListener('click',()=>setLedgerInlineEdit(form,'merchant',true));
  form.querySelector('#ledgerExpMerchant')?.addEventListener('blur',()=>{
    refreshLedgerEditorDisplays(form);
    setLedgerInlineEdit(form,'merchant',false);
  });
  form.querySelector('[data-ledger-open="note"]')?.addEventListener('click',()=>setLedgerInlineEdit(form,'note',true));
  form.querySelector('#ledgerExpNote')?.addEventListener('blur',()=>{
    refreshLedgerEditorDisplays(form);
    setLedgerInlineEdit(form,'note',false);
  });
  const dtBtn=form.querySelector('#ledgerExpDatetimeBtn');
  if(dtBtn){
    const openDT=()=>{
      const hiddenInput=form.querySelector('#ledgerExpDatetime');
      const textEl=form.querySelector('#ledgerExpDatetimeText');
      openLedgerDateTimePicker(hiddenInput.value,(result)=>{
        hiddenInput.value=result;
        if(textEl) textEl.textContent=formatCompactLedgerDateTime(result);
      });
    };
    dtBtn.addEventListener('click',openDT);
    dtBtn.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openDT()}
    });
  }
  form.querySelector('#ledgerExpFoodSync')?.addEventListener('click',()=>{
    if(!expenseId) return;
    closeLedgerEditor();
    setTimeout(()=>openFoodSyncFromExpense(expenseId),200);
  });
  if(!isEdit){
    const aiBtn=form.querySelector('#ledgerAIBtn');
    const aiInput=form.querySelector('#ledgerAIInput');
    if(aiBtn&&aiInput){
      aiBtn.addEventListener('click',()=>aiInput.click());
      aiInput.addEventListener('change',()=>{
        if(aiInput.files&&aiInput.files[0]){
          handleLedgerAIFile(aiInput.files[0],form);
          aiInput.value='';
        }
      });
    }
    form.querySelector('#ledgerAIItemsToggle')?.addEventListener('click',(e)=>{
      e.currentTarget.parentElement.classList.toggle('collapsed');
    });
  }
  form.querySelector('#ledgerExpPeriodBtn').addEventListener('click',()=>{
    const currentPid=form.querySelector('#ledgerExpPeriod').value;
    openLedgerPeriodPicker((pid)=>{
      const hidden=form.querySelector('#ledgerExpPeriod');
      const textEl=form.querySelector('#ledgerExpPeriodText');
      hidden.value=pid||'';
      if(!pid){
        textEl.textContent='不关联';
      }else{
        const p=getMeetingById(pid);
        if(p){
          const fs=formatLedgerDateGroup(p.startDate);
          const fe=p.endDate?formatLedgerDateGroup(p.endDate):'';
          textEl.textContent=`${p.title}${fs?` · ${fs}${fe?' - '+fe:''}`:''}`;
        }
      }
    },currentPid);
  });
  if(isEdit) form.querySelector('#ledgerExpDelete').addEventListener('click',()=>{
    if(!confirm('删除这笔账单？')) return;
    deleteExpense(expenseId);
    closeLedgerEditor();
    saveAndRefreshLedger();
    showToast('账单已删除','success');
  });
  refreshLedgerEditorDisplays(form);
}
// ===== Ledger DateTime Picker (复用 glass-date-panel 视觉) =====
let _ledgerDTPickerCallback=null;
let _ledgerDTState=null;
function closeLedgerDateTimePicker(){
  const overlay=document.getElementById('ledgerDateTimeOverlay');
  if(overlay) overlay.classList.remove('show');
  _ledgerDTPickerCallback=null;
  _ledgerDTState=null;
}
function openLedgerDateTimePicker(currentValue,onConfirm){
  const overlay=document.getElementById('ledgerDateTimeOverlay');
  const panel=document.getElementById('ledgerDateTimePanel');
  if(!overlay||!panel) return;
  const m=String(currentValue||'').match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  let baseYear,baseMonth,baseDay,hour,minute;
  if(m){
    baseYear=parseInt(m[1]);baseMonth=parseInt(m[2])-1;baseDay=parseInt(m[3]);
    hour=m[4]?parseInt(m[4]):0;minute=m[5]?parseInt(m[5]):0;
  }else{
    const now=new Date();
    baseYear=now.getFullYear();baseMonth=now.getMonth();baseDay=now.getDate();
    hour=now.getHours();minute=now.getMinutes();
  }
  _ledgerDTState={
    year:baseYear,month:baseMonth,
    selectedDate:`${baseYear}-${String(baseMonth+1).padStart(2,'0')}-${String(baseDay).padStart(2,'0')}`,
    hour,minute
  };
  _ledgerDTPickerCallback=onConfirm;
  renderLedgerDTPanel(panel);
  overlay.classList.add('show');
  overlay.onclick=(e)=>{if(e.target===overlay) closeLedgerDateTimePicker()};
}
function renderLedgerDTPanel(panel){
  const state=_ledgerDTState;
  if(!state) return;
  const today=new Date();
  const todayValue=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const first=new Date(state.year,state.month,1);
  const start=new Date(first);
  start.setDate(first.getDate()-((first.getDay()+6)%7));
  const monthTitle=`${state.year}年${state.month+1}月`;
  let days='';
  for(let i=0;i<42;i++){
    const d=new Date(start);
    d.setDate(start.getDate()+i);
    const value=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const isToday=todayValue===value;
    const isSelected=state.selectedDate===value;
    const cls=[d.getMonth()!==state.month?'muted':'',isToday?'today':'',isSelected?'selected':''].filter(Boolean).join(' ');
    days+=`<button class="glass-date-day ${cls}" type="button" data-date="${value}"><span class="glass-date-day-num">${d.getDate()}</span></button>`;
  }
  const hourOpts=Array.from({length:24},(_,i)=>`<option value="${i}" ${i===state.hour?'selected':''}>${String(i).padStart(2,'0')}</option>`).join('');
  const minOpts=Array.from({length:60},(_,i)=>`<option value="${i}" ${i===state.minute?'selected':''}>${String(i).padStart(2,'0')}</option>`).join('');
  panel.innerHTML=`
    <div class="ledger-dt-scroll">
      <div class="glass-date-head">
        <button class="glass-date-nav" type="button" data-nav="-1">‹</button>
        <button class="glass-date-title-btn" type="button">${monthTitle}</button>
        <button class="glass-date-nav" type="button" data-nav="1">›</button>
      </div>
      <div class="glass-date-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
      <div class="glass-date-grid">${days}</div>
      <div class="glass-date-actions">
        <button class="glass-date-action" type="button" data-action="today">今天</button>
      </div>
      <div class="glass-dt-time-area">
        <div class="glass-dt-time-label">时间</div>
        <div class="glass-dt-time-pickers">
          <select class="glass-dt-time-select" id="ledgerDTHour">${hourOpts}</select>
          <span class="glass-dt-time-colon">:</span>
          <select class="glass-dt-time-select" id="ledgerDTMin">${minOpts}</select>
        </div>
      </div>
    </div>
    <div class="glass-dt-confirm-row">
      <button class="glass-date-action" type="button" data-action="cancel">取消</button>
      <button class="glass-date-action primary" type="button" data-action="confirm">确定</button>
    </div>`;
  panel.querySelectorAll('[data-nav]').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      state.month+=Number(btn.dataset.nav);
      if(state.month<0){state.month=11;state.year--}
      if(state.month>11){state.month=0;state.year++}
      renderLedgerDTPanel(panel);
    });
  });
  panel.querySelectorAll('.glass-date-day').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      state.selectedDate=btn.dataset.date;
      renderLedgerDTPanel(panel);
    });
  });
  panel.querySelector('[data-action="today"]').addEventListener('click',e=>{
    e.stopPropagation();
    state.year=today.getFullYear();state.month=today.getMonth();
    state.selectedDate=todayValue;
    renderLedgerDTPanel(panel);
  });
  panel.querySelector('#ledgerDTHour').addEventListener('change',e=>{state.hour=parseInt(e.target.value)});
  panel.querySelector('#ledgerDTMin').addEventListener('change',e=>{state.minute=parseInt(e.target.value)});
  panel.querySelector('[data-action="cancel"]').addEventListener('click',e=>{
    e.stopPropagation();
    closeLedgerDateTimePicker();
  });
  panel.querySelector('[data-action="confirm"]').addEventListener('click',e=>{
    e.stopPropagation();
    const result=`${state.selectedDate}T${String(state.hour).padStart(2,'0')}:${String(state.minute).padStart(2,'0')}`;
    const cb=_ledgerDTPickerCallback;
    closeLedgerDateTimePicker();
    if(cb) cb(result);
  });
}
function closeLedgerEditor(){
  const pendingDiet=_ledgerAIPendingDiet;
  const session=_aiRecognitionSession;
  _ledgerAIResult=null;
  _ledgerAIToken++;
  _ledgerAIPendingDiet=false;
  document.querySelectorAll('.ledger-img-viewer-overlay').forEach(el=>el.remove());
  closeModal('coupleLedgerModal');
  if(pendingDiet&&session&&session.result){
    const result=session.result;
    const orderItems=Array.isArray(result.orderItems)?result.orderItems:[];
    if(orderItems.length>0){
      setTimeout(()=>showExpenseCancelDietChoice(result),250);
    }
  }
}
function showExpenseCancelDietChoice(result){
  const modal=document.getElementById('foodSyncModal');
  const form=document.getElementById('foodSyncForm');
  if(!modal||!form) return;
  const orderItems=Array.isArray(result.orderItems)?result.orderItems:[];
  const merchant=result.expense?.merchant||'';
  form.innerHTML=`<div class="food-sync-prompt">
    <div class="food-sync-prompt-icon">${icon('alert-circle')}</div>
    <div class="food-sync-prompt-text">未保存账单，是否继续记录饮食？<br><span style="font-size:12px;color:var(--txt3)">已识别 ${orderItems.length} 项菜品${merchant?(' · '+escapeHTML(merchant)):''}</span></div>
    <div class="food-sync-prompt-actions">
      <button class="btn btn-ghost" onclick="closeFoodSyncModal()">结束</button>
      <button class="btn btn-gold" onclick="continueDietOnlyAfterCancel()">继续记录饮食</button>
    </div>
  </div>`;
  document.getElementById('foodSyncTitle').textContent='继续记录饮食？';
  modal.classList.add('show');
  GlassScrollLock.lock('modal:foodSyncModal');
  renderIcons(modal);
  bindFoodSyncClose();
}
function continueDietOnlyAfterCancel(){
  const session=_aiRecognitionSession;
  if(!session||!session.result){closeFoodSyncModal();return}
  const result=session.result;
  const orderItems=Array.isArray(result.orderItems)?result.orderItems:[];
  closeFoodSyncModal();
  setTimeout(()=>startFoodOnlySync(orderItems,result.expense?.occurredAt,result.expense?.merchant),200);
}
function saveCoupleLedgerExpense(){
  const form=document.getElementById('coupleLedgerForm');
  if(!form) return;
  const saveBtn=form.querySelector('#ledgerExpSave');
  const id=saveBtn?.dataset.ledgerExpId||'';
  const amount=parseLedgerAmountInput(form.querySelector('#ledgerExpAmount').value);
  if(!amount){showToast('请输入有效金额','error');return}
  const paidByProfileId=form.querySelector('#ledgerExpPayer').value;
  if(!paidByProfileId){showToast('请选择付款人','error');return}
  const category=form.querySelector('#ledgerExpCategory').value;
  const merchant=form.querySelector('#ledgerExpMerchant').value.trim();
  const datetimeVal=form.querySelector('#ledgerExpDatetime').value;
  if(!datetimeVal){showToast('请选择日期/时间','error');return}
  const occurredAt=datetimeVal.length===10?datetimeVal+'T00:00':datetimeVal;
  const note=form.querySelector('#ledgerExpNote').value.trim();
  const periodIdVal=form.querySelector('#ledgerExpPeriod').value;
  const periodId=periodIdVal||null;
  const data={amount,category,merchant,paidByProfileId,occurredAt,note,periodId};
  if(_ledgerAIResult){
    data.source=_ledgerAIResult.source||'manual';
    if(Array.isArray(_ledgerAIResult.orderItems)&&_ledgerAIResult.orderItems.length>0){
      data.orderItems=_ledgerAIResult.orderItems;
    }
  }
  let savedExpenseId='';
  if(id){
    const updated=updateExpense(id,data);
    if(!updated){showToast('保存失败，数据无效','error');return}
    savedExpenseId=id;
  }else{
    const exp=addExpense(data);
    if(!exp){showToast('保存失败，数据无效','error');return}
    savedExpenseId=exp.id;
  }
  const aiResultForSync=_ledgerAIResult;
  _ledgerAIPendingDiet=false;
  closeLedgerEditor();
  saveAndRefreshLedger();
  showToast(id?'账单已更新':'账单已保存','success');
  if(savedExpenseId&&aiResultForSync&&aiResultForSync.imageType==='food_order'&&Array.isArray(aiResultForSync.orderItems)&&aiResultForSync.orderItems.length>0){
    setTimeout(()=>showFoodSyncPrompt(savedExpenseId,aiResultForSync.orderItems),350);
  }
}
// ===== Phase 6: Food Sync (餐饮订单 → 饮食记录联动) =====
let _foodSyncState=null;
const _foodSyncNutritionCache=new Map();
async function estimateOrderNutrition(items){
  const cacheKey=items.map(i=>`${i.name||''}|${i.spec||''}`).join('||');
  if(_foodSyncNutritionCache.has(cacheKey)) return _foodSyncNutritionCache.get(cacheKey);
  const response=await fetch(getApiUrl('/api/estimate-nutrition'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({items})
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data?.error||`HTTP ${response.status}`);
  const results=Array.isArray(data.results)?data.results:[];
  _foodSyncNutritionCache.set(cacheKey,results);
  return results;
}
function showFoodSyncPrompt(expenseId,orderItems){
  const lg=getLedger();
  const exp=(lg.expenses||[]).find(e=>e.id===expenseId);
  if(!exp) return;
  const existingLinks=Array.isArray(exp.linkedFoodRecordIds)?exp.linkedFoodRecordIds.filter(Boolean):[];
  const modal=document.getElementById('foodSyncModal');
  const form=document.getElementById('foodSyncForm');
  if(!modal||!form) return;
  const itemCount=orderItems.length;
  if(existingLinks.length>0){
    const owner=getDeviceOwnerProfile();
    const partner=getPartnerProfile(owner);
    const ownerName=owner?getDisplayName(owner):'我';
    const partnerName=partner?getDisplayName(partner):'伴侣';
    const ownerRecords=[],partnerRecords=[];
    existingLinks.forEach(id=>{
      const rec=(owner?.foodRecords||[]).find(r=>r.id===id);
      if(rec){ownerRecords.push(rec);return;}
      const prec=(partner?.foodRecords||[]).find(r=>r.id===id);
      if(prec) partnerRecords.push(prec);
    });
    let listHtml='';
    if(ownerRecords.length>0){
      listHtml+=`<div class="food-sync-linked-group"><div class="food-sync-linked-name">${escapeHTML(ownerName)}</div>`;
      ownerRecords.forEach(r=>{
        const foods=Array.isArray(r.foods)?r.foods:[];
        const totalCal=foods.reduce((s,f)=>s+(Number(f.cal)||0)*(Number(f.amount)||0)/(Number(f.base_amount)||100),0);
        listHtml+=`<div class="food-sync-linked-item"><span>${escapeHTML(r.meal||'')}</span><span>${foods.map(f=>escapeHTML(f.name||'')).join('、')||'-'}</span><span class="est">${Math.round(totalCal)}kcal</span></div>`;
      });
      listHtml+=`</div>`;
    }
    if(partnerRecords.length>0){
      listHtml+=`<div class="food-sync-linked-group"><div class="food-sync-linked-name">${escapeHTML(partnerName)}</div>`;
      partnerRecords.forEach(r=>{
        const foods=Array.isArray(r.foods)?r.foods:[];
        const totalCal=foods.reduce((s,f)=>s+(Number(f.cal)||0)*(Number(f.amount)||0)/(Number(f.base_amount)||100),0);
        listHtml+=`<div class="food-sync-linked-item"><span>${escapeHTML(r.meal||'')}</span><span>${foods.map(f=>escapeHTML(f.name||'')).join('、')||'-'}</span><span class="est">${Math.round(totalCal)}kcal</span></div>`;
      });
      listHtml+=`</div>`;
    }
    form.innerHTML=`<div class="food-sync-prompt">
      <div class="food-sync-prompt-icon">${icon('utensils')}</div>
      <div class="food-sync-prompt-text">这笔订单已关联 <b>${existingLinks.length}</b> 条饮食记录</div>
      <div class="food-sync-linked-list">${listHtml}</div>
      <div class="food-sync-prompt-actions">
        <button class="btn btn-ghost" onclick="closeFoodSyncModal()">关闭</button>
        <button class="btn btn-gold" onclick="openFoodSyncEditor('${expenseId}')">继续添加</button>
      </div></div>`;
  }else{
    form.innerHTML=`<div class="food-sync-prompt">
      <div class="food-sync-prompt-icon">${icon('utensils')}</div>
      <div class="food-sync-prompt-text">检测到餐饮订单<br>已识别到 <b>${itemCount}</b> 项餐饮内容<br>是否同时记录饮食？</div>
      <div class="food-sync-prompt-actions">
        <button class="btn btn-ghost" onclick="closeFoodSyncModal()">暂不记录</button>
        <button class="btn btn-gold" onclick="openFoodSyncEditor('${expenseId}')">去记录</button>
      </div></div>`;
  }
  document.getElementById('foodSyncTitle').textContent='餐饮订单饮食同步';
  modal.classList.add('show');
  GlassScrollLock.lock('modal:foodSyncModal');
  renderIcons(modal);
  bindFoodSyncClose();
}
function bindFoodSyncClose(){
  const btn=document.getElementById('foodSyncClose');
  if(btn&&!btn._foodSyncBound){
    btn._foodSyncBound=true;
    btn.addEventListener('click',()=>closeFoodSyncModal());
  }
}
async function openFoodSyncEditor(expenseId){
  const modal=document.getElementById('foodSyncModal');
  const form=document.getElementById('foodSyncForm');
  if(!modal||!form) return;
  const lg=getLedger();
  const exp=(lg.expenses||[]).find(e=>e.id===expenseId);
  if(!exp||!Array.isArray(exp.orderItems)||exp.orderItems.length===0){
    showToast('未找到订单菜品信息','error');
    closeFoodSyncModal();
    return;
  }
  form.innerHTML=`<div class="food-sync-loading"><div class="ai-scan-ring"></div><div class="food-sync-loading-text">正在分析菜品营养…</div></div>`;
  document.getElementById('foodSyncTitle').textContent='餐饮订单饮食确认';
  if(!modal.classList.contains('show')){
    modal.classList.add('show');
    GlassScrollLock.lock('modal:foodSyncModal');
  }
  bindFoodSyncClose();
  try{
    const nutritionResults=await estimateOrderNutrition(exp.orderItems);
    const owner=getDeviceOwnerProfile();
    const partner=getPartnerProfile(owner);
    const ownerName=owner?getDisplayName(owner):'我';
    const partnerName=partner?getDisplayName(partner):'伴侣';
    const partnerAvailable=!!partner&&isProfileInitializedForDeviceOwner(partner);
    const existingLinks=Array.isArray(exp.linkedFoodRecordIds)?exp.linkedFoodRecordIds.filter(Boolean):[];
    _foodSyncState={
      expenseId,
      occurredAt:exp.occurredAt,
      existingLinks,
      items:exp.orderItems.map((oi,i)=>{
        const nutri=nutritionResults[i]||{found:false};
        const quantity=Math.max(1,Number(oi.quantity)||1);
        const portionAmount=Math.max(1,Number(nutri.portionAmount)||100);
        const totalGrams=portionAmount*quantity;
        const estimatedServingWeightG=nutri.estimatedServingWeightG!=null?Number(nutri.estimatedServingWeightG):null;
        const nutritionPer100g=nutri.nutritionPer100g||null;
        const isFee=isFeeOrderItem(oi.name);
        return{
          name:oi.name||'未知菜品',
          spec:oi.spec||null,
          quantity,
          included:nutri.found!==false&&!isFee,
          isFee,
          feeAmount:(()=>{const n=Number(oi.unitPrice)||Number(oi.lineTotal)||Number(oi.amount);return Number.isFinite(n)?n:null})(),
          nutrition:nutri,
          portionAmount,
          totalAmount:totalGrams,
          totalGrams,
          estimatedServingWeightG,
          nutritionPer100g,
          portionMode:'ratio',
          portionPct:100,
          consumedWeightG:estimatedServingWeightG?Math.round(estimatedServingWeightG*quantity):100,
          who:'owner',
          splitMode:'ratio',
          splitOwner:50,
          splitPartner:50,
          splitOwnerGrams:Math.round(totalGrams*0.5),
          splitPartnerGrams:Math.round(totalGrams*0.5),
        };
      }),
      ownerName,partnerName,partnerAvailable,
      dateTime:exp.occurredAt||toLocalDateTimeValue(),
      meal:getMealTypeByDateTime(exp.occurredAt||toLocalDateTimeValue()),
      mealManuallySet:false,
    };
    renderFoodSyncForm();
  }catch(err){
    console.error('Food sync nutrition error:',err);
    form.innerHTML=`<div class="food-sync-prompt">
      <div class="food-sync-prompt-icon" style="background:rgba(240,160,32,0.12)">${icon('alert-circle')}</div>
      <div class="food-sync-prompt-text">营养估算暂时不可用<br><span style="font-size:11px;color:var(--txt3)">${escapeHTML(err.message||'')}</span></div>
      <div class="food-sync-prompt-actions">
        <button class="btn btn-ghost" onclick="closeFoodSyncModal()">关闭</button>
      </div></div>`;
    renderIcons(modal);
  }
}
function fsCompactStepper(idx, numVal, unit, inputKind, minusAttr, plusAttr){
  const safeVal=Number.isFinite(Number(numVal))?Math.round(Number(numVal)):0;
  /* dual-class: fs-compact-stepper (legacy selectors) + ds-stepper (canonical) */
  return `<div class="fs-compact-stepper ds-stepper">
    <button type="button" class="fs-compact-stepper-btn ds-stepper-btn" data-idx="${idx}" ${minusAttr}>−</button>
    <label class="fs-compact-stepper-input-wrap ds-stepper-input-wrap">
      <input type="text" class="fs-compact-stepper-input ds-stepper-input" data-glass-enhanced="stepper" data-idx="${idx}" data-fs-input="${inputKind}" inputmode="numeric" autocomplete="off" value="${safeVal}" aria-label="数值">
      <span class="fs-compact-stepper-unit ds-stepper-unit">${unit}</span>
    </label>
    <button type="button" class="fs-compact-stepper-btn ds-stepper-btn" data-idx="${idx}" ${plusAttr}>+</button>
  </div>`;
}
function fsStepperRestoreValue(inp){
  if(!inp||!_foodSyncState) return;
  const idx=Number(inp.dataset.idx);
  const kind=inp.dataset.fsInput;
  const item=_foodSyncState.items[idx];
  if(!item) return;
  if(kind==='weight') inp.value=String(Math.round(item.consumedWeightG||0));
  else if(kind==='custom-pct') inp.value=String(Math.round(item.portionPct||0));
  else if(kind==='split-ratio-owner') inp.value=String(Math.round(item.splitOwner||0));
  else if(kind==='split-ratio-partner') inp.value=String(Math.round(item.splitPartner||0));
  else if(kind==='split-grams-owner') inp.value=String(Math.round(item.splitOwnerGrams||0));
  else if(kind==='split-grams-partner') inp.value=String(Math.round(item.splitPartnerGrams||0));
}
function commitFoodSyncStepperInput(inp){
  if(!inp||!_foodSyncState) return;
  const idx=Number(inp.dataset.idx);
  const kind=inp.dataset.fsInput;
  const raw=String(inp.value||'').trim();
  if(raw===''){fsStepperRestoreValue(inp);return;}
  const n=Number(raw);
  if(!Number.isFinite(n)||!/^\d+(\.\d+)?$/.test(raw)){
    fsStepperRestoreValue(inp);
    return;
  }
  if(kind==='weight') applyFoodSyncPortionWeight(idx,n);
  else if(kind==='custom-pct') applyFoodSyncCustomPct(idx,n);
  else if(kind==='split-ratio-owner') applyFoodSyncSplitRatio(idx,'owner',n);
  else if(kind==='split-ratio-partner') applyFoodSyncSplitRatio(idx,'partner',n);
  else if(kind==='split-grams-owner') applyFoodSyncSplitGrams(idx,'owner',n);
  else if(kind==='split-grams-partner') applyFoodSyncSplitGrams(idx,'partner',n);
}
function applyFoodSyncPortionWeight(idx, grams){
  const item=_foodSyncState?.items?.[idx];
  if(!item) return;
  const n=Number(grams);
  if(!Number.isFinite(n)||n<1) return;
  item.consumedWeightG=Math.max(1,Math.min(9999,Math.round(n)));
  patchFoodSyncStepper(idx,'weight',item.consumedWeightG);
  patchFoodSyncWeightHint(idx);
  updateFoodSyncSummary();
}
function applyFoodSyncCustomPct(idx, pct){
  const item=_foodSyncState?.items?.[idx];
  if(!item) return;
  const n=Number(pct);
  if(!Number.isFinite(n)) return;
  item.portionPct=Math.max(0,Math.min(200,Math.round(n)));
  item.customPctOpen=true;
  patchFoodSyncStepper(idx,'custom-pct',item.portionPct);
  updateFoodSyncSummary();
}
function applyFoodSyncSplitRatio(idx, who, pct){
  const item=_foodSyncState?.items?.[idx];
  if(!item||!who) return;
  const n=Number(pct);
  if(!Number.isFinite(n)) return;
  const key='split'+(who==='owner'?'Owner':'Partner');
  item[key]=Math.max(0,Math.min(100,Math.round(n)));
  patchFoodSyncStepper(idx,'split-ratio-'+who,item[key]);
  patchFoodSyncSplitFoot(idx);
  updateFoodSyncSummary();
}
function applyFoodSyncSplitGrams(idx, who, grams){
  const item=_foodSyncState?.items?.[idx];
  if(!item||!who) return;
  const n=Number(grams);
  if(!Number.isFinite(n)||n<0) return;
  const key='split'+(who==='owner'?'OwnerGrams':'PartnerGrams');
  item[key]=Math.max(0,Math.min(9999,Math.round(n)));
  patchFoodSyncStepper(idx,'split-grams-'+who,item[key]);
  patchFoodSyncSplitFoot(idx);
  updateFoodSyncSummary();
}
function patchFoodSyncStepper(idx,kind,value){
  const inp=document.querySelector(`.food-sync-allocation[data-idx="${idx}"] .fs-compact-stepper-input[data-fs-input="${kind}"]`);
  if(inp&&document.activeElement!==inp) inp.value=String(Math.round(value));
}
function patchFoodSyncWeightHint(idx){
  const item=_foodSyncState?.items?.[idx];
  const hint=document.querySelector(`.food-sync-allocation[data-idx="${idx}"] .food-sync-portion-hint`);
  if(!item||!hint) return;
  const swG=item.estimatedServingWeightG;
  if(swG&&swG>0) hint.textContent=`≈ ${Math.round(item.consumedWeightG/(swG*item.quantity)*100)}%`;
}
function patchFoodSyncSplitFoot(idx){
  const item=_foodSyncState?.items?.[idx];
  const alloc=document.querySelector(`.food-sync-allocation[data-idx="${idx}"]`);
  if(!item||!alloc) return;
  if(item.splitMode==='grams'){
    const totalG=Math.round(item.totalGrams);
    const assignedG=Math.round(item.splitOwnerGrams)+Math.round(item.splitPartnerGrams);
    const remainG=Math.round(item.totalGrams-item.splitOwnerGrams-item.splitPartnerGrams);
    const feet=alloc.querySelectorAll('.food-sync-split-foot-val');
    if(feet[0]) feet[0].textContent=`${assignedG}g / ${totalG}g`;
    if(feet[1]) feet[1].textContent=`${remainG}g`;
  }else{
    const remainPct=100-item.splitOwner-item.splitPartner;
    const el=alloc.querySelector('.food-sync-split-foot-val');
    if(el) el.textContent=`${remainPct}%`;
  }
}
function patchFoodSyncWhoChips(idx){
  const item=_foodSyncState?.items?.[idx];
  const itemEl=document.querySelector(`.food-sync-item[data-idx="${idx}"]`);
  if(!item||!itemEl) return;
  itemEl.querySelectorAll('.food-sync-who-btn').forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.who===item.who);
  });
}
function patchFoodSyncPortionPct(idx){
  const item=_foodSyncState?.items?.[idx];
  const alloc=document.querySelector(`.food-sync-allocation[data-idx="${idx}"]`);
  if(!item||!alloc) return;
  const customOpen=!!item.customPctOpen;
  const isPreset=!customOpen&&[25,50,75,100].includes(item.portionPct);
  alloc.querySelectorAll('.food-sync-portion .food-sync-portion-btn[data-pct]').forEach(btn=>{
    btn.classList.toggle('active',isPreset&&Number(btn.dataset.pct)===item.portionPct);
  });
  const customBtn=alloc.querySelector('[data-custom-open]');
  if(customBtn) customBtn.classList.toggle('active',customOpen||!isPreset);
  const customRow=alloc.querySelector('.food-sync-custom-row');
  if(customRow) customRow.hidden=!customOpen;
  if(customOpen) patchFoodSyncStepper(idx,'custom-pct',item.portionPct);
  const summary=alloc.querySelector('.food-sync-portion-summary');
  if(summary){
    const show=!customOpen&&isPreset&&item.portionPct===100;
    summary.hidden=!show;
    if(show){
      const swG=item.estimatedServingWeightG;
      const approxG=swG&&swG>0?Math.round(swG*item.quantity):null;
      summary.textContent=`100%${approxG!=null?` · 约${approxG}g`:''}`;
    }
  }
}
function patchFoodSyncPortionMode(idx){
  const item=_foodSyncState?.items?.[idx];
  const alloc=document.querySelector(`.food-sync-allocation[data-idx="${idx}"]`);
  if(!item||!alloc) return;
  const swG=item.estimatedServingWeightG;
  const per100g=item.nutritionPer100g;
  const weightAvailable=!!(per100g||(swG&&swG>0&&(item.nutrition?.cal||0)>0));
  const isWeight=item.portionMode==='weight'&&weightAvailable;
  alloc.querySelectorAll('[data-portion-mode]').forEach(btn=>{
    const mode=btn.dataset.portionMode;
    btn.classList.toggle('active',mode==='weight'?isWeight:!isWeight);
  });
  const ratioPanel=alloc.querySelector('.food-sync-ratio-panel');
  const weightPanel=alloc.querySelector('.food-sync-weight-panel');
  if(ratioPanel) ratioPanel.hidden=isWeight;
  if(weightPanel) weightPanel.hidden=!isWeight;
  if(isWeight){
    patchFoodSyncStepper(idx,'weight',item.consumedWeightG);
    patchFoodSyncWeightHint(idx);
  }else{
    patchFoodSyncPortionPct(idx);
  }
}
function patchFoodSyncSplitMode(idx){
  const item=_foodSyncState?.items?.[idx];
  const alloc=document.querySelector(`.food-sync-allocation[data-idx="${idx}"]`);
  if(!item||!alloc) return;
  const isGrams=item.splitMode==='grams';
  alloc.querySelectorAll('[data-split-mode]').forEach(btn=>{
    btn.classList.toggle('active',(btn.dataset.splitMode==='grams')===isGrams);
  });
  const ratioPanel=alloc.querySelector('.food-sync-split-ratio-panel');
  const gramsPanel=alloc.querySelector('.food-sync-split-grams-panel');
  if(ratioPanel) ratioPanel.hidden=isGrams;
  if(gramsPanel) gramsPanel.hidden=!isGrams;
  if(isGrams){
    patchFoodSyncStepper(idx,'split-grams-owner',item.splitOwnerGrams);
    patchFoodSyncStepper(idx,'split-grams-partner',item.splitPartnerGrams);
  }else{
    patchFoodSyncStepper(idx,'split-ratio-owner',item.splitOwner);
    patchFoodSyncStepper(idx,'split-ratio-partner',item.splitPartner);
  }
  patchFoodSyncSplitFoot(idx);
}
function remountFoodSyncAllocation(idx){
  const s=_foodSyncState;
  const item=s?.items?.[idx];
  const itemEl=document.querySelector(`.food-sync-item[data-idx="${idx}"]`);
  if(!item||!itemEl||item.isFee||item.nutrition?.found===false) return;
  const scrollEl=document.querySelector('.food-sync-modal-scroll');
  const scrollTop=scrollEl?.scrollTop??0;
  let alloc=itemEl.querySelector('.food-sync-allocation');
  if(!alloc){
    alloc=document.createElement('div');
    alloc.className='food-sync-allocation';
    alloc.dataset.idx=String(idx);
    itemEl.querySelector('.food-sync-who')?.insertAdjacentElement('afterend',alloc);
  }
  alloc.innerHTML=buildFoodSyncAllocationHTML(item,idx,s);
  if(scrollEl) scrollEl.scrollTop=scrollTop;
}
function buildFoodSyncAllocationHTML(item,i,s){
  const nutri=item.nutrition;
  const swG=item.estimatedServingWeightG;
  const per100g=item.nutritionPer100g;
  const weightAvailable=!!(per100g||(swG&&swG>0&&(nutri.cal||0)>0));
  let html='';
  if(item.who==='both'&&s.partnerAvailable){
    const remainPct=100-item.splitOwner-item.splitPartner;
    const totalG=Math.round(item.totalGrams);
    const assignedG=Math.round(item.splitOwnerGrams)+Math.round(item.splitPartnerGrams);
    const remainG=Math.round(item.totalGrams-item.splitOwnerGrams-item.splitPartnerGrams);
    const isGrams=item.splitMode==='grams';
    html+=`<div class="food-sync-split-wrap" data-idx="${i}">
      <div class="food-sync-split-mode">
        <div class="meal-seg">
          <button class="meal-seg-btn food-sync-portion-btn ${!isGrams?'active':''}" type="button" data-idx="${i}" data-split-mode="ratio">按比例</button>
          <button class="meal-seg-btn food-sync-portion-btn ${isGrams?'active':''}" type="button" data-idx="${i}" data-split-mode="grams">按克数</button>
        </div>
      </div>
      <div class="food-sync-split-ratio-panel food-sync-split-section"${isGrams?' hidden':''}>
        <div class="food-sync-split-head">分配比例</div>
        <div class="food-sync-split-row">
          <span class="food-sync-split-name">${escapeHTML(s.ownerName)}</span>
          ${fsCompactStepper(i,item.splitOwner,'%','split-ratio-owner','data-split-ratio-adjust="owner" data-ratio-delta="-5"','data-split-ratio-adjust="owner" data-ratio-delta="5"')}
        </div>
        <div class="food-sync-split-row">
          <span class="food-sync-split-name">${escapeHTML(s.partnerName)}</span>
          ${fsCompactStepper(i,item.splitPartner,'%','split-ratio-partner','data-split-ratio-adjust="partner" data-ratio-delta="-5"','data-split-ratio-adjust="partner" data-ratio-delta="5"')}
        </div>
        <div class="food-sync-split-foot"><span>剩余</span><span class="food-sync-split-foot-val">${remainPct}%</span></div>
      </div>
      <div class="food-sync-split-grams-panel food-sync-split-section"${!isGrams?' hidden':''}>
        <div class="food-sync-split-total-info"><span>整份约</span><b>${totalG}g</b></div>
        <div class="food-sync-split-head">分配</div>
        <div class="food-sync-split-row">
          <span class="food-sync-split-name">${escapeHTML(s.ownerName)}</span>
          ${fsCompactStepper(i,item.splitOwnerGrams,'g','split-grams-owner','data-split-grams-adjust="owner" data-weight-delta="-10"','data-split-grams-adjust="owner" data-weight-delta="10"')}
        </div>
        <div class="food-sync-split-row">
          <span class="food-sync-split-name">${escapeHTML(s.partnerName)}</span>
          ${fsCompactStepper(i,item.splitPartnerGrams,'g','split-grams-partner','data-split-grams-adjust="partner" data-weight-delta="-10"','data-split-grams-adjust="partner" data-weight-delta="10"')}
        </div>
        <div class="food-sync-split-foot"><span>已分配</span><span class="food-sync-split-foot-val">${assignedG}g / ${totalG}g</span></div>
        <div class="food-sync-split-foot"><span>剩余</span><span class="food-sync-split-foot-val">${remainG}g</span></div>
      </div>
    </div>`;
  }else{
    const customOpen=!!item.customPctOpen;
    const isPreset=!customOpen&&[25,50,75,100].includes(item.portionPct);
    const isWeight=item.portionMode==='weight'&&weightAvailable;
    const pctFromWeight=(!swG||swG<=0)?null:Math.round((item.consumedWeightG||0)/(swG*item.quantity)*100);
    const approxG100=swG&&swG>0?Math.round(swG*item.quantity):null;
    html+=`<div class="food-sync-portion-mode">
      <div class="meal-seg">
        <button class="meal-seg-btn food-sync-portion-btn ${!isWeight?'active':''}" type="button" data-idx="${i}" data-portion-mode="ratio">按比例</button>
        <button class="meal-seg-btn food-sync-portion-btn ${isWeight?'active':''}" type="button" data-idx="${i}" data-portion-mode="weight" ${weightAvailable?'':'disabled style="opacity:.4;cursor:not-allowed"'}>按克数</button>
      </div>
    </div>
    <div class="food-sync-ratio-panel"${isWeight?' hidden':''}>
      <div class="food-sync-portion">
        <button class="td-filter-btn food-sync-portion-btn ${isPreset&&item.portionPct===25?'active':''}" type="button" data-idx="${i}" data-pct="25">25%</button>
        <button class="td-filter-btn food-sync-portion-btn ${isPreset&&item.portionPct===50?'active':''}" type="button" data-idx="${i}" data-pct="50">50%</button>
        <button class="td-filter-btn food-sync-portion-btn ${isPreset&&item.portionPct===75?'active':''}" type="button" data-idx="${i}" data-pct="75">75%</button>
        <button class="td-filter-btn food-sync-portion-btn ${isPreset&&item.portionPct===100?'active':''}" type="button" data-idx="${i}" data-pct="100">100%</button>
        <button class="td-filter-btn food-sync-portion-btn ${customOpen||!isPreset?'active':''}" type="button" data-idx="${i}" data-custom-open="1">自定义</button>
      </div>
      <div class="food-sync-custom-row"${!customOpen?' hidden':''}>
        <span class="food-sync-custom-label">自定义比例</span>
        ${fsCompactStepper(i,item.portionPct,'%','custom-pct','data-custom-adjust="-5"','data-custom-adjust="5"')}
      </div>
      <div class="food-sync-portion-summary"${!(isPreset&&item.portionPct===100&&!customOpen)?' hidden':''}>100%${approxG100!=null?` · 约${approxG100}g`:''}</div>`;
    if(!weightAvailable){
      html+=`<div class="food-sync-item-weight-info">暂无可靠克重营养基准，请使用比例记录</div>`;
    }
    html+=`</div>
    <div class="food-sync-weight-panel"${!isWeight?' hidden':''}>
      <div class="food-sync-portion-row">
        <span class="food-sync-portion-row-label">份量</span>
        ${fsCompactStepper(i,item.consumedWeightG,'g','weight','data-weight-adjust="-10"','data-weight-adjust="10"')}
      </div>
      <div class="food-sync-portion-hint">${pctFromWeight!=null?`≈ ${pctFromWeight}%`:'整份重量：未可靠识别'}</div>
    </div>`;
  }
  return html;
}
function renderFoodSyncForm(){
  if(!_foodSyncState) return;
  const form=document.getElementById('foodSyncForm');
  if(!form) return;
  const s=_foodSyncState;
  const dateTimeVal=normalizeDateTime(s.dateTime).slice(0,16);
  let html=`<div class="modal-scroll-region food-sync-modal-scroll">
    <div class="food-sync-settings">
      <div class="ls-row" id="foodSyncDateTimeBtn" role="button" tabindex="0" aria-label="选择日期时间">
        <span class="ls-row-label">时间</span>
        <span class="ls-row-value" id="foodSyncDateTimeText">${formatCompactLedgerDateTime(dateTimeVal)}</span>
        <span class="ls-row-chevron">›</span>
    </div>
      <div class="ls-row">
        <span class="ls-row-label">餐次</span>
        <span class="ls-row-value" id="foodSyncMealValue">${MEAL_LABELS[s.meal]||''}</span>
        <span class="ls-row-chevron">›</span>
        <select class="ls-row-native" id="foodSyncMeal">${MEAL_KEYS.map(k=>`<option value="${k}" ${k===s.meal?'selected':''}>${MEAL_LABELS[k]}</option>`).join('')}</select>
      </div>
  </div>`;
  s.items.forEach((item,i)=>{
    const nutri=item.nutrition;
    const found=nutri.found!==false;
    const isFee=!!item.isFee;
    const specText=item.spec?` · ${escapeHTML(item.spec)}`:'';
    const qtyText=item.quantity>1?` · ${item.quantity}份`:'';
    html+=`<div class="food-sync-item ${item.included?'':'disabled'}${isFee?' food-sync-fee-row':''}" data-idx="${i}">
      <div class="food-sync-item-head">
        <input type="checkbox" class="food-sync-item-check" data-idx="${i}" ${item.included?'checked':''} ${isFee?'disabled':''}>
        <span class="food-sync-item-name">${escapeHTML(item.name)}${specText}${qtyText}</span>
        ${isFee&&item.feeAmount!=null?`<span class="food-sync-fee-amt">¥${Number(item.feeAmount).toFixed(2)}</span>`:''}
      </div>`;
    if(isFee){
      html+=`<div class="food-sync-item-fail">非食物项 · 不参与营养记录</div>`;
    }else if(!found){
      html+=`<div class="food-sync-item-fail">暂无法估算 · 可取消勾选跳过此菜</div>`;
    }else{
      const swG=item.estimatedServingWeightG;
      const grams=swG&&swG>0?Math.round(swG*item.quantity):null;
      const kcal=Math.round((nutri.cal||0)*item.quantity);
      html+=`<div class="food-sync-item-kcal-line">${grams!=null?`约${grams}g · `:''}<b>${kcal} kcal</b><span class="food-sync-est-tag"> AI估算</span></div>
      <div class="food-sync-item-nutri">蛋白质${Math.round((nutri.protein||0)*item.quantity)}g · 碳水${Math.round((nutri.carbs||0)*item.quantity)}g · 脂肪${Math.round((nutri.fat||0)*item.quantity)}g</div>
      <div class="food-sync-who">
        <span class="food-sync-who-label">谁吃了</span>
        <button class="ds-chip ds-chip--sm food-sync-who-btn ${item.who==='owner'?'active':''}" type="button" data-idx="${i}" data-who="owner">${escapeHTML(s.ownerName)}</button>`;
      if(s.partnerAvailable){
        html+=`<button class="ds-chip ds-chip--sm food-sync-who-btn ${item.who==='partner'?'active':''}" type="button" data-idx="${i}" data-who="partner">${escapeHTML(s.partnerName)}</button>
        <button class="ds-chip ds-chip--sm food-sync-who-btn ${item.who==='both'?'active':''}" type="button" data-idx="${i}" data-who="both">两个人</button>`;
      }
      html+=`</div>
      <div class="food-sync-allocation" data-idx="${i}">${buildFoodSyncAllocationHTML(item,i,s)}</div>`;
    }
    html+=`</div>`;
  });
  html+=`<div id="foodSyncSummary"></div></div>
  <div class="ledger-modal-footer">
    <div class="couple-form-actions food-sync-actions">
      <button class="btn btn-ghost" onclick="closeFoodSyncModal()">取消</button>
      <button class="btn btn-gold" id="foodSyncConfirm" onclick="confirmFoodSync()">确认记录</button>
    </div>
  </div>`;
  form.innerHTML=html;
  renderIcons(form);
  bindFoodSyncFormEvents();
  updateFoodSyncSummary();
}
function bindFoodSyncFormEvents(){
  const form=document.getElementById('foodSyncForm');
  if(!form||!_foodSyncState) return;
  if(!form._foodSyncDelegated){
    form._foodSyncDelegated=true;
    form.addEventListener('change',e=>{
      const cb=e.target.closest('.food-sync-item-check');
      if(!cb||!_foodSyncState) return;
      const idx=Number(cb.dataset.idx);
      if(_foodSyncState.items[idx]){
        _foodSyncState.items[idx].included=cb.checked;
        const item=cb.closest('.food-sync-item');
        if(item) item.classList.toggle('disabled',!cb.checked);
        updateFoodSyncSummary();
      }
    });
    form.addEventListener('focusout',e=>{
      const inp=e.target.closest('.fs-compact-stepper-input');
      if(inp) commitFoodSyncStepperInput(inp);
    });
    form.addEventListener('keydown',e=>{
      const inp=e.target.closest('.fs-compact-stepper-input');
      if(inp&&e.key==='Enter'){e.preventDefault();inp.blur();}
    });
    form.addEventListener('click',e=>{
    if(!_foodSyncState) return;
    const pctBtn=e.target.closest('.food-sync-portion-btn[data-pct]');
    if(pctBtn){
      const idx=Number(pctBtn.dataset.idx);
      const item=_foodSyncState.items[idx];
      if(item){
        item.portionPct=Number(pctBtn.dataset.pct);
        item.customPctOpen=false;
        patchFoodSyncPortionPct(idx);
        updateFoodSyncSummary();
      }
      return;
    }
    const customOpenBtn=e.target.closest('[data-custom-open]');
    if(customOpenBtn){
      const idx=Number(customOpenBtn.dataset.idx);
          const item=_foodSyncState.items[idx];
      if(item){
        item.customPctOpen=true;
        patchFoodSyncPortionPct(idx);
      }
      return;
    }
    const customAdj=e.target.closest('[data-custom-adjust]');
    if(customAdj){
      const idx=Number(customAdj.dataset.idx);
      const delta=Number(customAdj.dataset.customAdjust);
      const item=_foodSyncState.items[idx];
      if(item) applyFoodSyncCustomPct(idx,(Number(item.portionPct)||0)+delta);
      return;
    }
    const modeBtn=e.target.closest('.food-sync-portion-btn[data-portion-mode]');
    if(modeBtn){
      if(modeBtn.disabled) return;
      const idx=Number(modeBtn.dataset.idx);
      const mode=modeBtn.dataset.portionMode;
      const item=_foodSyncState.items[idx];
      if(!item) return;
      if(mode==='weight'){
        const swG=item.estimatedServingWeightG;
        if(swG&&swG>0) item.consumedWeightG=Math.round(swG*item.quantity*(item.portionPct/100));
        else if(!item.consumedWeightG||item.consumedWeightG<=0) item.consumedWeightG=100;
      }else{
        const swG2=item.estimatedServingWeightG;
        if(swG2&&swG2>0&&item.consumedWeightG>0){
          item.portionPct=Math.max(1,Math.min(100,Math.round(item.consumedWeightG/(swG2*item.quantity)*100)));
        }
      }
      item.portionMode=mode;
      patchFoodSyncPortionMode(idx);
      updateFoodSyncSummary();
      return;
    }
    const weightAdj=e.target.closest('[data-weight-adjust]');
    if(weightAdj){
      const idx=Number(weightAdj.dataset.idx);
      const delta=Number(weightAdj.dataset.weightAdjust);
      const item=_foodSyncState.items[idx];
      if(item) applyFoodSyncPortionWeight(idx,(item.consumedWeightG||0)+delta);
      return;
    }
    const ratioAdj=e.target.closest('[data-split-ratio-adjust]');
    if(ratioAdj){
      const idx=Number(ratioAdj.dataset.idx);
      const who=ratioAdj.dataset.splitRatioAdjust;
      const delta=Number(ratioAdj.dataset.ratioDelta);
            const item=_foodSyncState.items[idx];
      if(item&&who){
        const key='split'+(who==='owner'?'Owner':'Partner');
        applyFoodSyncSplitRatio(idx,who,(Number(item[key])||0)+delta);
      }
      return;
    }
    const gramsAdj=e.target.closest('[data-split-grams-adjust]');
    if(gramsAdj){
      const idx=Number(gramsAdj.dataset.idx);
      const who=gramsAdj.dataset.splitGramsAdjust;
      const delta=Number(gramsAdj.dataset.weightDelta);
            const item=_foodSyncState.items[idx];
      if(item&&who){
        const key='split'+(who==='owner'?'OwnerGrams':'PartnerGrams');
        applyFoodSyncSplitGrams(idx,who,(Number(item[key])||0)+delta);
      }
      return;
    }
    const whoBtn=e.target.closest('.food-sync-who-btn');
    if(whoBtn){
      const idx=Number(whoBtn.dataset.idx);
      const who=whoBtn.dataset.who;
      const item=_foodSyncState.items[idx];
      if(item&&item.who!==who){
        item.who=who;
        patchFoodSyncWhoChips(idx);
        remountFoodSyncAllocation(idx);
        updateFoodSyncSummary();
      }
      return;
    }
    const splitModeBtn=e.target.closest('.food-sync-portion-btn[data-split-mode]');
    if(splitModeBtn){
      const idx=Number(splitModeBtn.dataset.idx);
      const mode=splitModeBtn.dataset.splitMode;
      const item=_foodSyncState.items[idx];
      if(item&&item.splitMode!==mode){
        item.splitMode=mode;
        patchFoodSyncSplitMode(idx);
        updateFoodSyncSummary();
      }
      return;
      }
    });
  }
  const dtBtn=form.querySelector('#foodSyncDateTimeBtn');
  if(dtBtn&&!dtBtn._fsBound){
    dtBtn._fsBound=true;
    const openDT=()=>{
      const textEl=form.querySelector('#foodSyncDateTimeText');
      openLedgerDateTimePicker(normalizeDateTime(_foodSyncState.dateTime).slice(0,16),(result)=>{
        _foodSyncState.dateTime=normalizeDateTime(result);
        if(!_foodSyncState.mealManuallySet){
          _foodSyncState.meal=getMealTypeByDateTime(_foodSyncState.dateTime);
          const mealSelect=form.querySelector('#foodSyncMeal');
          if(mealSelect) mealSelect.value=_foodSyncState.meal;
          const mealVal=form.querySelector('#foodSyncMealValue');
          if(mealVal) mealVal.textContent=MEAL_LABELS[_foodSyncState.meal]||'';
        }
        if(textEl) textEl.textContent=formatCompactLedgerDateTime(result);
      });
    };
    dtBtn.addEventListener('click',openDT);
    dtBtn.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openDT()}
    });
  }
  const mealSelect=form.querySelector('#foodSyncMeal');
  if(mealSelect&&!mealSelect._fsBound){
    mealSelect._fsBound=true;
    mealSelect.addEventListener('change',()=>{
      _foodSyncState.meal=mealSelect.value;
      _foodSyncState.mealManuallySet=true;
      const mealVal=form.querySelector('#foodSyncMealValue');
      if(mealVal) mealVal.textContent=MEAL_LABELS[mealSelect.value]||'';
    });
  }
}
function updateFoodSyncSummary(){
  if(!_foodSyncState) return;
  const summaryEl=document.getElementById('foodSyncSummary');
  if(!summaryEl) return;
  const s=_foodSyncState;
  const oT={calories:0,protein:0,carbs:0,fat:0};
  const pT={calories:0,protein:0,carbs:0,fat:0};
  let oHas=false,pHas=false;
  const oItems=[],pItems=[];
  s.items.forEach(item=>{
    if(!item.included||item.nutrition.found===false) return;
    const nutri=item.nutrition;
    const qty=item.quantity;
    const swG=item.estimatedServingWeightG;
    const per100g=item.nutritionPer100g;
    const wholeCal=(Number(nutri.cal)||0)*qty;
    const wholePro=(Number(nutri.protein)||0)*qty;
    const wholeCarb=(Number(nutri.carbs)||0)*qty;
    const wholeFat=(Number(nutri.fat)||0)*qty;
    let portionText='',cal=0,pro=0,carb=0,fat=0;
    if(item.who!=='both'){
      if(item.portionMode==='weight'){
        const wg=Math.max(0,Number(item.consumedWeightG)||0);
        if(per100g){
          cal=Math.round(per100g.calories*wg/100);
          pro=Math.round(per100g.protein*wg/100*10)/10;
          carb=Math.round(per100g.carbs*wg/100*10)/10;
          fat=Math.round(per100g.fat*wg/100*10)/10;
        }else if(swG&&swG>0){
          const ratio=wg/(swG*qty);
          cal=Math.round(wholeCal*ratio);
          pro=Math.round(wholePro*ratio*10)/10;
          carb=Math.round(wholeCarb*ratio*10)/10;
          fat=Math.round(wholeFat*ratio*10)/10;
        }
        portionText=`${Math.round(wg)}g`;
      }else{
        const pct=Math.max(0,Math.min(2,Number(item.portionPct)/100||0));
        cal=Math.round(wholeCal*pct);
        pro=Math.round(wholePro*pct*10)/10;
        carb=Math.round(wholeCarb*pct*10)/10;
        fat=Math.round(wholeFat*pct*10)/10;
        portionText=`${Math.round(pct*100)}%`;
        if(swG&&swG>0){
          const approxG=Math.round(swG*qty*pct);
          portionText+=` · 约${approxG}g`;
        }
      }
      const detail={name:item.name,portionText,cal,pro,carb,fat};
      if(item.who==='owner'){
        oT.calories+=cal;oT.protein+=pro;oT.carbs+=carb;oT.fat+=fat;oHas=true;
        oItems.push(detail);
      }else if(item.who==='partner'){
        pT.calories+=cal;pT.protein+=pro;pT.carbs+=carb;pT.fat+=fat;pHas=true;
        pItems.push(detail);
      }
    }else{
      const portionAmt=Math.max(1,Number(item.portionAmount)||100);
      const totalG=Math.max(1,Number(item.totalGrams)||portionAmt*qty);
      const bCal=Number(nutri.cal)||0;
      const bPro=Number(nutri.protein)||0;
      const bCarb=Number(nutri.carbs)||0;
      const bFat=Number(nutri.fat)||0;
      const perGC=bCal/portionAmt,perGP=bPro/portionAmt,perGCb=bCarb/portionAmt,perGF=bFat/portionAmt;
      const tCal=perGC*totalG, tPro=perGP*totalG, tCarb=perGCb*totalG, tFat=perGF*totalG;
      let oR,pR,oG=0,pG=0;
      if(item.splitMode==='grams'){
        oR=Math.max(0,Math.min(1,(Number(item.splitOwnerGrams)||0)/totalG));
        pR=Math.max(0,Math.min(1,(Number(item.splitPartnerGrams)||0)/totalG));
        oG=Number(item.splitOwnerGrams)||0;
        pG=Number(item.splitPartnerGrams)||0;
      }else{
        oR=Math.max(0,Math.min(1,(Number(item.splitOwner)||0)/100));
        pR=Math.max(0,Math.min(1,(Number(item.splitPartner)||0)/100));
        oG=totalG*oR; pG=totalG*pR;
      }
      oT.calories+=tCal*oR;oT.protein+=tPro*oR;oT.carbs+=tCarb*oR;oT.fat+=tFat*oR;oHas=true;
      pT.calories+=tCal*pR;pT.protein+=tPro*pR;pT.carbs+=tCarb*pR;pT.fat+=tFat*pR;pHas=true;
      oItems.push({name:item.name,portionText:`${Math.round(oG)}g`,cal:Math.round(tCal*oR),pro:Math.round(tPro*oR*10)/10,carb:Math.round(tCarb*oR*10)/10,fat:Math.round(tFat*oR*10)/10});
      pItems.push({name:item.name,portionText:`${Math.round(pG)}g`,cal:Math.round(tCal*pR),pro:Math.round(tPro*pR*10)/10,carb:Math.round(tCarb*pR*10)/10,fat:Math.round(tFat*pR*10)/10});
    }
  });
  let html='<div class="food-sync-summary">';
  const foodCount=s.items.filter(it=>it.included&&!it.isFee&&it.nutrition.found!==false).length;
  const macrosLine=(t)=>`蛋白质${Math.round(t.protein)}g · 碳水${Math.round(t.carbs)}g · 脂肪${Math.round(t.fat)}g`;
  if(!oHas&&!pHas){
    html+='<div class="food-sync-summary-empty">请勾选要记录的菜品并选择食用人</div>';
  }else if(oHas&&pHas){
    html+=`<div class="food-sync-summary-kcal">${Math.round(oT.calories+pT.calories)} kcal</div>`;
    html+=`<div class="food-sync-summary-title">${foodCount>1?`${foodCount} 个食物 · `:''}按人汇总</div>`;
    html+=`<div class="food-sync-summary-row"><span>${escapeHTML(s.ownerName)}</span><b>${Math.round(oT.calories)} kcal</b></div>`;
    html+=`<div class="food-sync-summary-nutri">${macrosLine(oT)}</div>`;
    html+=`<div class="food-sync-summary-row"><span>${escapeHTML(s.partnerName)}</span><b>${Math.round(pT.calories)} kcal</b></div>`;
    html+=`<div class="food-sync-summary-nutri">${macrosLine(pT)}</div>`;
  }else{
    const name=oHas?s.ownerName:s.partnerName;
    const tot=oHas?oT:pT;
    html+=`<div class="food-sync-summary-title">将记录给 ${escapeHTML(name)}</div>`;
    html+=`<div class="food-sync-summary-kcal">${Math.round(tot.calories)} kcal</div>`;
    html+=`<div class="food-sync-summary-nutri">${macrosLine(tot)}</div>`;
    if(foodCount>1) html+=`<div class="food-sync-summary-total">${foodCount} 个食物</div>`;
  }
  html+='</div>';
  summaryEl.innerHTML=html;
  const confirmBtn=document.getElementById('foodSyncConfirm');
  if(confirmBtn){
    const disabled=!oHas&&!pHas;
    confirmBtn.disabled=disabled;
    confirmBtn.style.opacity=disabled?'0.5':'';
  }
}
// Shared Meal FoodRecord Write — ONLY for 餐饮订单饮食确认 flow.
// Bypasses requireEditableHealthProfile which forces Device Owner only.
// Do NOT call from any other entry point (Quick Add, voice, photo, etc.)
function addSharedMealFoodRecord(targetProfile, recordData) {
  if (!isCoupleMode()) return { ok: false, reason: 'not_couple' };
  if (!targetProfile) return { ok: false, reason: 'no_profile' };
  const owner = getDeviceOwnerProfile();
  if (!owner) return { ok: false, reason: 'no_owner' };
  const partner = getPartnerProfile(owner);
  const isOwner = targetProfile.id === owner.id;
  const isPartner = partner && targetProfile.id === partner.id;
  if (!isOwner && !isPartner) return { ok: false, reason: 'invalid_target' };
  if (isPartner && !isProfileInitializedForDeviceOwner(partner)) return { ok: false, reason: 'partner_not_initialized' };
  const record = withProfileId(targetProfile, recordData);
  targetProfile.foodRecords = targetProfile.foodRecords || [];
  targetProfile.foodRecords.push(record);
  return { ok: true, id: record.id };
}
let _foodSyncConfirming=false;
function confirmFoodSync(){
  if(!_foodSyncState||_foodSyncConfirming) return;
  const s=_foodSyncState;
  for(const item of s.items){
    if(!item.included||item.nutrition.found===false) continue;
    if(item.who==='both'&&s.partnerAvailable){
      if(item.splitMode==='grams'){
        const sumG=(Number(item.splitOwnerGrams)||0)+(Number(item.splitPartnerGrams)||0);
        if(sumG>Number(item.totalGrams)){
          showToast(`「${item.name}」双方食用克数合计 ${Math.round(sumG)}g 超过整份 ${Math.round(item.totalGrams)}g`,'error');
          return;
        }
      }else{
        const sumPct=(Number(item.splitOwner)||0)+(Number(item.splitPartner)||0);
        if(sumPct>100){
          showToast(`「${item.name}」双方食用比例合计 ${Math.round(sumPct)}% 超过 100%`,'error');
          return;
        }
      }
    }
  }
  const ownerFoods=[];
  const partnerFoods=[];
  s.items.forEach(item=>{
    if(!item.included||item.nutrition.found===false) return;
    const baseAmount=item.portionAmount;
    const per100g=item.nutritionPer100g;
    const usePer100g=item.portionMode==='weight'&&!!per100g;
    const makeFood=(grams,portionLabel)=>{
      if(grams<=0) return null;
      const food={
        name:item.name,cat:'AI估算',source:'ai',unit:'g',
        base_amount:usePer100g?100:baseAmount,base_weight:usePer100g?100:baseAmount,
        cal:usePer100g?per100g.calories:(Number(item.nutrition.cal)||0),
        pro:usePer100g?per100g.protein:(Number(item.nutrition.protein)||0),
        fat:usePer100g?per100g.fat:(Number(item.nutrition.fat)||0),
        carb:usePer100g?per100g.carbs:(Number(item.nutrition.carbs)||0),
        fib:Number(item.nutrition.fiber)||0,
        amount:grams,confidence:item.nutrition.confidence||'low',
        estimateReason:item.nutrition.estimateReason||'订单菜品AI估算',
        portionText:`AI估算 · ${portionLabel}`,
        estimateVersion:'food-ai-estimate-v4',aiStage:'complete',
      };
      if(item.portionMode==='weight'){
        food.consumedWeightG=Math.round(grams);
      }
      return food;
    };
    if(item.who==='owner'){
      let grams,portionLabel;
      if(item.portionMode==='weight'){
        grams=Math.max(0,Number(item.consumedWeightG)||0);
        portionLabel=`${Math.round(grams)}g`;
      }else{
        const pct=Math.max(0,Math.min(2,Number(item.portionPct)/100||0));
        grams=(Number(item.totalGrams)||baseAmount*item.quantity)*pct;
        portionLabel=`${item.quantity>1?item.quantity+'份×':''}${Math.round(pct*100)}%`;
      }
      const f=makeFood(grams,portionLabel);
      if(f) ownerFoods.push(f);
    }else if(item.who==='partner'){
      let grams,portionLabel;
      if(item.portionMode==='weight'){
        grams=Math.max(0,Number(item.consumedWeightG)||0);
        portionLabel=`${Math.round(grams)}g`;
      }else{
        const pct=Math.max(0,Math.min(2,Number(item.portionPct)/100||0));
        grams=(Number(item.totalGrams)||baseAmount*item.quantity)*pct;
        portionLabel=`${item.quantity>1?item.quantity+'份×':''}${Math.round(pct*100)}%`;
      }
      const f=makeFood(grams,portionLabel);
      if(f) partnerFoods.push(f);
    }else if(item.who==='both'){
      if(item.splitMode==='grams'){
        const oG=Math.max(0,Number(item.splitOwnerGrams)||0);
        const pG=Math.max(0,Number(item.splitPartnerGrams)||0);
        const oF=makeFood(oG,`${Math.round(oG)}g`);
        const pF=makeFood(pG,`${Math.round(pG)}g`);
        if(oF) ownerFoods.push(oF);
        if(pF) partnerFoods.push(pF);
      }else{
        const totalGrams=Number(item.totalGrams)||baseAmount*item.quantity;
        const oR=Math.max(0,Math.min(1,Number(item.splitOwner)/100||0));
        const pR=Math.max(0,Math.min(1,Number(item.splitPartner)/100||0));
        const oF=makeFood(totalGrams*oR,`${Math.round(oR*100)}%`);
        const pF=makeFood(totalGrams*pR,`${Math.round(pR*100)}%`);
        if(oF) ownerFoods.push(oF);
        if(pF) partnerFoods.push(pF);
      }
    }
  });
  if(ownerFoods.length===0&&partnerFoods.length===0){
    showToast('请至少选择一项菜品','error');
    return;
  }
  _foodSyncConfirming=true;
  const confirmBtn=document.getElementById('foodSyncConfirm');
  if(confirmBtn){confirmBtn.disabled=true;confirmBtn.textContent='保存中…';}
  try{
    const dateTime=normalizeDateTime(s.dateTime);
    const date=dateFromDateTimeValue(dateTime);
    const meal=s.meal||getMealTypeByDateTime(dateTime);
    const createdIds=[];
    let partnerBlocked=false;
    const owner=getDeviceOwnerProfile();
    if(ownerFoods.length>0&&owner){
      const result=addSharedMealFoodRecord(owner,{
        id:'r'+Date.now()+Math.random().toString(36).substr(2,5),
        date,dateTime,meal,
        foods:ownerFoods.map(f=>serializeFoodPortion(prepareFoodPortion(f)))
      });
      if(result.ok) createdIds.push(result.id);
    }
    if(partnerFoods.length>0){
      const partner=getPartnerProfile(owner);
      if(partner){
        const result=addSharedMealFoodRecord(partner,{
          id:'r'+Date.now()+'p'+Math.random().toString(36).substr(2,5),
          date,dateTime,meal,
          foods:partnerFoods.map(f=>serializeFoodPortion(prepareFoodPortion(f)))
        });
        if(result.ok) createdIds.push(result.id);
        else partnerBlocked=true;
      }else{
        partnerBlocked=true;
      }
    }
    saveData();
    if(owner) invalidateHealthCoachDayCache(owner,date);
    const partner=getPartnerProfile(owner);
    if(partner) invalidateHealthCoachDayCache(partner,date);
    if(createdIds.length>0){
      const allIds=[...(s.existingLinks||[]),...createdIds];
      updateExpense(s.expenseId,{linkedFoodRecordIds:[...new Set(allIds)]});
      saveData();
    }
    renderDashboard();
    saveAndRefreshLedger();
    if(partnerBlocked){
      showToast(`已记录${createdIds.length}条饮食（伴侣档案未就绪，伴侣部分未保存）`,'info');
    }else{
      showToast(`已记录${createdIds.length}条饮食`,'success');
    }
    closeFoodSyncModal();
  }catch(err){
    console.error('confirmFoodSync error:',err);
    showToast('保存失败，请重试','error');
    if(confirmBtn){confirmBtn.disabled=false;confirmBtn.textContent='确认记录';}
  }finally{
    _foodSyncConfirming=false;
  }
}
function closeFoodSyncModal(){
  _foodSyncState=null;
  closeModal('foodSyncModal');
}
function openFoodSyncFromExpense(expenseId){
  const lg=getLedger();
  const exp=(lg.expenses||[]).find(e=>e.id===expenseId);
  if(!exp) return;
  if(!Array.isArray(exp.orderItems)||exp.orderItems.length===0){
    showToast('这笔账单没有订单菜品信息','info');
    return;
  }
  showFoodSyncPrompt(expenseId,exp.orderItems);
}
// ===== Phase 7: Unified Image Router =====
let _pendingImageURL=null;
let _aiRecognitionToken=0;
let _aiRecognitionSession=null;
let _aiRecognitionAbort=null;
function showAIRecognitionLoading(){
  _aiRecognitionToken++;
  if(_aiRecognitionAbort){try{_aiRecognitionAbort.abort()}catch(e){}}
  _aiRecognitionAbort=new AbortController();
  const modal=document.getElementById('quickActionModal');
  if(!modal||!modal.classList.contains('show')){
    modal.dataset.quickAction='photo-recognition';
    document.getElementById('quickActionTitle').textContent='AI智能识别';
    openQuickActionModal();
  }
  const content=document.getElementById('quickActionContent');
  if(content){
    content.innerHTML=`<div class="ai-recog-loading">
      <div class="ai-recog-spinner"></div>
      <div class="ai-recog-text">正在识别图片…</div>
      <div class="ai-recog-hint">识别完成后自动进入下一步</div>
    </div>`;
  }
}
function showAIRecognitionError(msg){
  const content=document.getElementById('quickActionContent');
  if(!content) return;
  content.innerHTML=`<div class="ai-recog-error">
    <div class="ai-recog-error-icon">${icon('alert-circle')}</div>
    <div class="ai-recog-error-text">${escapeHTML(msg||'识别失败，请重试')}</div>
    <div class="ai-recog-error-actions">
      <button class="btn btn-ghost btn-sm" onclick="closeQuickActionModal()">关闭</button>
      <button class="btn btn-gold btn-sm" onclick="renderPhotoModal()">重新选择</button>
    </div>
  </div>`;
  renderIcons(content);
}
function closeAIRecognitionLoading(){
  const modal=document.getElementById('quickActionModal');
  if(modal&&modal.dataset.quickAction==='photo-recognition'){
    closeQuickActionModal();
  }
}
async function routeFoodPhotoRecognition(file){
  if(!file) return;
  const token=++_aiRecognitionToken;
  try{
    const compressed=await compressFoodImage(file,{maxSide:1280,quality:.80});
    if(token!==_aiRecognitionToken) return;
    closeAIRecognitionLoading();
    startAIAnalysis(compressed.url,null);
  }catch(err){
    if(token!==_aiRecognitionToken) return;
    console.error('Food photo recognition error:',err);
    showAIRecognitionError('图片处理失败：'+(err.message||''));
  }
}
async function routeImageRecognition(file){
  if(!file) return;
  const token=++_aiRecognitionToken;
  try{
    const compressed=await compressFoodImage(file,{maxSide:1280,quality:.80});
    if(token!==_aiRecognitionToken) return;
    const imageURL=compressed.url;
    const text=await callExpenseRecognitionAI(imageURL,_aiRecognitionAbort?.signal);
    if(token!==_aiRecognitionToken) return;
    const result=parseExpenseAIResult(text);
    if(!result||!result.ok||result.imageType==='unknown'){
      if(token!==_aiRecognitionToken) return;
      _aiRecognitionSession={result,imageURL,token};
      showImageTypeChoice(imageURL);
      return;
    }
    if(result.imageType==='food_photo'){
      if(token!==_aiRecognitionToken) return;
      _aiRecognitionSession={result,imageURL,token};
      closeAIRecognitionLoading();
      startAIAnalysis(imageURL,null);
      return;
    }
    if(result.imageType==='food_order'){
      _aiRecognitionSession={result,imageURL,token};
      const orderItems=Array.isArray(result.orderItems)?result.orderItems:[];
      const hasItems=orderItems.length>0;
      if(!isCoupleMode()){
        if(hasItems){
          showFoodOrderPurposeSelection(result,'single');
        }else{
          if(token!==_aiRecognitionToken) return;
          showAIRecognitionError('识别到餐饮订单但未找到菜品信息');
        }
        return;
      }
      if(hasItems){
        showFoodOrderPurposeSelection(result,'couple');
      }else{
        if(token!==_aiRecognitionToken) return;
        closeAIRecognitionLoading();
        routeToExpenseEditorWithAI(result);
      }
      return;
    }
    if(!isCoupleMode()){
      if(token!==_aiRecognitionToken) return;
      showAIRecognitionError('检测到支付/订单截图。共同账本仅在双人模式下可用');
      return;
    }
    if(token!==_aiRecognitionToken) return;
    _aiRecognitionSession={result,imageURL,token};
    closeAIRecognitionLoading();
    routeToExpenseEditorWithAI(result);
  }catch(err){
    if(token!==_aiRecognitionToken) return;
    console.error('Image router error:',err);
    showAIRecognitionError('图片识别失败：'+(err.message||''));
  }
}
function showFoodOrderPurposeSelection(result,mode){
  const orderItems=Array.isArray(result.orderItems)?result.orderItems:[];
  const merchant=result.expense?.merchant||'';
  const amount=result.expense?.amount;
  const amtText=amount!=null?`¥${(Number(amount)).toFixed(2)}`:'未识别';
  closeAIRecognitionLoading();
  const modal=document.getElementById('foodSyncModal');
  const form=document.getElementById('foodSyncForm');
  if(!modal||!form) return;
  let btns=`<button class="btn btn-ghost" onclick="cancelFoodOrderPurpose()">取消</button>`;
  btns+=`<button class="btn btn-tonal-gold" onclick="chooseFoodOrderPurpose('diet_only')">只记饮食</button>`;
  if(mode==='couple'){
    btns+=`<button class="btn btn-gold" onclick="chooseFoodOrderPurpose('both')">记账 + 饮食</button>`;
    btns+=`<button class="btn btn-tonal-gold" onclick="chooseFoodOrderPurpose('ledger_only')">只记账</button>`;
  }
  form.innerHTML=`<div class="food-sync-prompt">
    <div class="food-sync-prompt-icon">${icon('utensils')}</div>
    <div class="food-sync-prompt-text">已识别餐饮订单<br><span style="font-size:12px;color:var(--txt3)">商家：${escapeHTML(merchant||'未知')} · 实付：${amtText} · 菜品：${orderItems.length}项</span><br>你想记录什么？</div>
    <div class="food-sync-prompt-actions">${btns}</div>
  </div>`;
  document.getElementById('foodSyncTitle').textContent='餐饮订单';
  modal.classList.add('show');
  GlassScrollLock.lock('modal:foodSyncModal');
  renderIcons(modal);
  bindFoodSyncClose();
}
function cancelFoodOrderPurpose(){
  _aiRecognitionSession=null;
  closeFoodSyncModal();
}
function chooseFoodOrderPurpose(purpose){
  const session=_aiRecognitionSession;
  if(!session){closeFoodSyncModal();return}
  const result=session.result;
  const orderItems=Array.isArray(result.orderItems)?result.orderItems:[];
  closeFoodSyncModal();
  if(purpose==='diet_only'){
    startFoodOnlySync(orderItems,result.expense?.occurredAt,result.expense?.merchant);
  }else if(purpose==='both'){
    routeToExpenseEditorWithAI(result,true);
  }else if(purpose==='ledger_only'){
    routeToExpenseEditorWithAI(result,false);
  }
}
function startFoodOnlySync(orderItems,occurredAt,merchant){
  if(!orderItems||orderItems.length===0){
    showToast('未识别到菜品信息','error');
    return;
  }
  const modal=document.getElementById('foodSyncModal');
  const form=document.getElementById('foodSyncForm');
  if(!modal||!form) return;
  form.innerHTML=`<div class="food-sync-loading"><div class="food-sync-spinner"></div><div class="food-sync-loading-text">正在分析菜品营养…</div></div>`;
  document.getElementById('foodSyncTitle').textContent='餐饮订单饮食确认';
  modal.classList.add('show');
  GlassScrollLock.lock('modal:foodSyncModal');
  bindFoodSyncClose();
  (async()=>{
    try{
      const nutritionResults=await estimateOrderNutrition(orderItems);
      const owner=getDeviceOwnerProfile();
      const partner=getPartnerProfile(owner);
      const ownerName=owner?getDisplayName(owner):'我';
      const partnerName=partner?getDisplayName(partner):'伴侣';
      const partnerAvailable=!!partner&&isProfileInitializedForDeviceOwner(partner);
      const dtVal=occurredAt||toLocalDateTimeValue();
      _foodSyncState={
        expenseId:null,
        occurredAt:dtVal,
        existingLinks:[],
        items:orderItems.map((oi,i)=>{
          const nutri=nutritionResults[i]||{found:false};
          const quantity=Math.max(1,Number(oi.quantity)||1);
          const portionAmount=Math.max(1,Number(nutri.portionAmount)||100);
          const totalGrams=portionAmount*quantity;
          const estimatedServingWeightG=nutri.estimatedServingWeightG!=null?Number(nutri.estimatedServingWeightG):null;
          const nutritionPer100g=nutri.nutritionPer100g||null;
          const isFee=isFeeOrderItem(oi.name);
          return{
            name:oi.name||'未知菜品',
            spec:oi.spec||null,
            quantity,
            included:nutri.found!==false&&!isFee,
            isFee,
            feeAmount:(()=>{const n=Number(oi.unitPrice)||Number(oi.lineTotal)||Number(oi.amount);return Number.isFinite(n)?n:null})(),
            nutrition:nutri,
            portionAmount,
            totalAmount:totalGrams,
            totalGrams,
            estimatedServingWeightG,
            nutritionPer100g,
            portionMode:'ratio',
            portionPct:100,
            consumedWeightG:estimatedServingWeightG?Math.round(estimatedServingWeightG*quantity):100,
            who:'owner',
            splitMode:'ratio',
            splitOwner:50,
            splitPartner:50,
            splitOwnerGrams:Math.round(totalGrams*0.5),
            splitPartnerGrams:Math.round(totalGrams*0.5),
          };
        }),
        ownerName,partnerName,partnerAvailable,
        dateTime:dtVal,
        meal:getMealTypeByDateTime(dtVal),
        mealManuallySet:false,
      };
      renderFoodSyncForm();
    }catch(err){
      console.error('Food-only sync nutrition error:',err);
      form.innerHTML=`<div class="food-sync-prompt">
        <div class="food-sync-prompt-icon" style="background:rgba(240,160,32,0.12)">${icon('alert-circle')}</div>
        <div class="food-sync-prompt-text">营养估算暂时不可用<br><span style="font-size:11px;color:var(--txt3)">${escapeHTML(err.message||'')}</span></div>
        <div class="food-sync-prompt-actions">
          <button class="btn btn-ghost" onclick="closeFoodSyncModal()">关闭</button>
        </div></div>`;
      renderIcons(modal);
    }
  })();
}
function showImageTypeChoice(imageURL){
  _pendingImageURL=imageURL;
  const modal=document.getElementById('foodSyncModal');
  const form=document.getElementById('foodSyncForm');
  if(!modal||!form) return;
  const couple=isCoupleMode();
  let btns=`<button class="btn btn-ghost" onclick="closeFoodSyncModal()">取消</button>`;
  btns+=`<button class="btn btn-tonal-gold" onclick="confirmImageChoice('food')">记录饮食</button>`;
  if(couple){
    btns+=`<button class="btn btn-gold" onclick="confirmImageChoice('ledger')">共同记账</button>`;
  }
  form.innerHTML=`<div class="food-sync-prompt">
    <div class="food-sync-prompt-icon">${icon('sparkles')}</div>
    <div class="food-sync-prompt-text">无法自动判断图片类型<br>这张图片想用来做什么？</div>
    <div class="food-sync-prompt-actions">${btns}</div>
  </div>`;
  document.getElementById('foodSyncTitle').textContent='智能识别';
  modal.classList.add('show');
  GlassScrollLock.lock('modal:foodSyncModal');
  renderIcons(modal);
  bindFoodSyncClose();
}
function confirmImageChoice(choice){
  const imageURL=_pendingImageURL;
  _pendingImageURL=null;
  closeFoodSyncModal();
  if(choice==='food'&&imageURL){
    startAIAnalysis(imageURL,null);
  }else if(choice==='ledger'){
    openCoupleLedgerEditor();
  }
}
function routeToExpenseEditorWithAI(result,withDiet){
  _ledgerAIPendingDiet=!!withDiet;
  const session=_aiRecognitionSession;
  const sourceImageURL=session?.imageURL||null;
  openCoupleLedgerEditor();
  setTimeout(()=>{
    const form=document.getElementById('coupleLedgerForm');
    if(!form) return;
    const aiEntry=form.querySelector('#ledgerAIEntry');
    const aiStatus=form.querySelector('#ledgerAIStatus');
    if(aiEntry) aiEntry.style.display='none';
    if(aiStatus){aiStatus.style.display='';aiStatus.textContent='AI已智能填充，请确认';aiStatus.style.color='var(--gold-l)';}
    prefillLedgerEditorFromAI(result,form,sourceImageURL);
    if(aiEntry) aiEntry.style.display='';
  },150);
}
function openLedgerAllCategories(){
  const modal=document.getElementById('coupleLedgerAllCatsModal');
  const sub=document.getElementById('coupleLedgerAllCatsSub');
  const body=document.getElementById('coupleLedgerAllCatsBody');
  if(!modal||!body) return;
  const cats=getLedgerTotalsByCategory(ledgerRange);
  const total=getLedgerTotal(ledgerRange);
  const period=getActivePeriod();
  const rangeLabel=ledgerRange==='period'?(period?period.title:'本次见面'):(ledgerRange==='all'?'全部':'本月');
  sub.textContent=`${rangeLabel} · ${formatLedgerAmount(total)}`;
  if(!cats.length){
    body.innerHTML='<div class="ledger-cat-stats-empty">暂无分类支出</div>';
  } else {
    const maxCat=cats[0].total;
    body.innerHTML=cats.map(c=>{
      const pct=maxCat>0?Math.round(c.total/maxCat*100):0;
      const catIcon=LEDGER_CATEGORY_ICONS[c.category]||'clipboard-list';
      return `<div class="ledger-cat-stat-row">
        <span class="ledger-cat-icon">${icon(catIcon)}</span>
        <span class="ledger-cat-name">${LEDGER_CATEGORY_LABELS[c.category]||c.category}</span>
        <span class="ledger-cat-bar"><span class="ledger-cat-bar-fill" style="width:${pct}%"></span></span>
        <span class="ledger-cat-amt">${formatLedgerAmount(c.total)}</span>
      </div>`;
    }).join('');
  }
  renderIcons(modal);
  modal.classList.add('show');
  GlassScrollLock.lock('modal:coupleLedgerAllCatsModal');
  modal.querySelector('#coupleLedgerAllCatsClose')?.addEventListener('click',()=>{
    closeModal('coupleLedgerAllCatsModal');
  });
}
function openMeetingPicker(){
  const modal=document.getElementById('coupleLedgerPeriodModal');
  const form=document.getElementById('coupleLedgerPeriodForm');
  if(!modal||!form) return;
  _ledgerPeriodPickerCallback=null;
  const titleEl=document.getElementById('coupleLedgerPeriodTitle');
  if(titleEl) titleEl.textContent='选择见面 / 旅行';
  renderMeetingPicker(form);
  modal.classList.add('show');
  GlassScrollLock.lock('modal:coupleLedgerPeriodModal');
  modal.querySelector('#coupleLedgerPeriodClose')?.addEventListener('click',()=>{
    closeModal('coupleLedgerPeriodModal');
  });
}
function renderMeetingPicker(form){
  const cs=getCoupleSpace();
  const lg=getLedger();
  const today=todayStr();
  const activeId=lg.activePeriodId;
  const all=(cs.meetings||[]).slice();
  const upcoming=all.filter(p=>{
    if(!p.startDate) return false;
    if(p.startDate>=today) return true;
    const end=p.endDate||p.startDate;
    return end>=today;
  }).sort((a,b)=>(a.startDate||'').localeCompare(b.startDate||''));
  const past=all.filter(p=>{
    if(!p.startDate) return false;
    const end=p.endDate||p.startDate;
    return end<today;
  }).sort((a,b)=>(b.startDate||'').localeCompare(a.startDate||''));
  const renderItem=(p)=>{
    const isOngoing=p.startDate<today&&(p.endDate||p.startDate)>=today;
    const dateText=p.endDate&&p.endDate!==p.startDate
      ?`${formatLedgerDateGroup(p.startDate)} - ${formatLedgerDateGroup(p.endDate)}`
      :formatLedgerDateGroup(p.startDate);
    return `<div class="ledger-meeting-pick-row ${p.id===activeId?'selected':''}" data-meeting-select="${p.id}">
      <span class="ledger-period-picker-radio"></span>
      <div class="ledger-period-picker-info">
        <div class="ledger-period-picker-title">${escapeHTML(p.title||'未命名')} <span style="font-size:10px;color:var(--txt3)">[${LEDGER_PERIOD_TYPE_LABELS[p.type]||p.type}]${isOngoing?' · 进行中':''}</span></div>
        <div class="ledger-period-picker-date">${dateText}</div>
      </div>
      <button class="ledger-meeting-more-btn" type="button" data-meeting-more="${p.id}">${icon('more-horizontal')}</button>
    </div>`;
  };
  let html='<div class="ledger-period-picker-list">';
  html+=`<div class="ledger-meeting-pick-row ${!activeId?'selected':''}" data-meeting-select="">
    <span class="ledger-period-picker-radio"></span>
    <span class="ledger-period-picker-label">不选择</span>
  </div>`;
  if(upcoming.length){
    html+='<div class="ledger-period-group-label">即将到来</div>';
    html+=upcoming.map(renderItem).join('');
  }
  if(past.length){
    html+=`<div class="ledger-period-group-label" style="margin-top:${upcoming.length?'12px':'0'}">历史</div>`;
    html+=past.map(renderItem).join('');
  }
  if(!upcoming.length&&!past.length){
    html+='<div class="ledger-period-picker-empty">还没有见面/旅行记录</div>';
  }
  html+='</div>';
  html+='<div class="ledger-period-picker-divider"></div>';
  html+=`<button class="ledger-period-picker-new" type="button" id="meetingPickerNew">${icon('plus')} 新建见面 / 旅行</button>`;
  form.innerHTML=html;
  renderIcons(form);
  form.querySelectorAll('[data-meeting-select]').forEach(el=>el.addEventListener('click',()=>{
    const id=el.dataset.meetingSelect||'';
    setActivePeriod(id||null);
    saveAndRefreshLedger();
    refreshCoupleSpaceView();
    closeModal('coupleLedgerPeriodModal');
    showToast(id?'已设为当前见面/旅行':'已取消当前见面/旅行','success');
  }));
  form.querySelectorAll('[data-meeting-more]').forEach(btn=>btn.addEventListener('click',(e)=>{
    e.stopPropagation();
    showMeetingMoreMenu(btn.dataset.meetingMore,form);
  }));
  form.querySelector('#meetingPickerNew').addEventListener('click',()=>renderMeetingEditorForm(form,''));
}
function showMeetingMoreMenu(meetingId,pickerForm){
  const meeting=getMeetingById(meetingId);
  if(!meeting) return;
  let overlay=document.getElementById('meetingMoreMenuOverlay');
  if(overlay) overlay.remove();
  overlay=document.createElement('div');
  overlay.id='meetingMoreMenuOverlay';
  overlay.className='ledger-meeting-menu-overlay';
  overlay.innerHTML=`<div class="ledger-meeting-menu-sheet">
    <button class="ledger-meeting-menu-item" id="meetingMoreEdit">${icon('edit')} 编辑</button>
    <button class="ledger-meeting-menu-item danger" id="meetingMoreDelete">${icon('trash-2')} 删除</button>
    <button class="ledger-meeting-menu-item ledger-meeting-menu-cancel" id="meetingMoreCancel">取消</button>
  </div>`;
  document.body.appendChild(overlay);
  renderIcons(overlay);
  const close=()=>overlay.remove();
  overlay.addEventListener('click',(e)=>{if(e.target===overlay) close()});
  overlay.querySelector('#meetingMoreCancel').addEventListener('click',close);
  overlay.querySelector('#meetingMoreEdit').addEventListener('click',()=>{
    close();
    renderMeetingEditorForm(pickerForm,meetingId);
  });
  overlay.querySelector('#meetingMoreDelete').addEventListener('click',()=>{
    close();
    if(!confirm('删除这个见面/旅行？关联的账单不会被删除，但会取消关联。')) return;
    const wasActive=getLedger().activePeriodId===meetingId;
    deleteMeeting(meetingId);
    if(wasActive) setActivePeriod(null);
    saveAndRefreshLedger();
    refreshCoupleSpaceView();
    renderMeetingPicker(pickerForm);
    showToast('已删除','success');
  });
}
function renderMeetingEditorForm(form,periodId){
  const existing=periodId?getMeetingById(periodId):null;
  const today=todayStr();
  form.innerHTML=`
    <div class="couple-time-modal-grid">
      <div class="form-group">
        <label class="form-label">名称 *</label>
        <input class="form-input" id="ledgerPerTitle" type="text" maxlength="30" value="${escapeHTML(existing?.title||'')}" placeholder="如：杭州见面">
      </div>
      <div class="form-group">
        <label class="form-label">类型</label>
        <select class="form-select" id="ledgerPerType">
          <option value="meeting" ${existing?.type==='meeting'||!existing?'selected':''}>见面</option>
          <option value="trip" ${existing?.type==='trip'?'selected':''}>旅行</option>
          <option value="custom" ${existing?.type==='custom'?'selected':''}>自定义</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">开始日期 *</label>
        <input class="form-input" id="ledgerPerStart" type="date" value="${existing?.startDate||today}">
      </div>
      <div class="form-group">
        <label class="form-label">结束日期</label>
        <input class="form-input" id="ledgerPerEnd" type="date" value="${existing?.endDate||''}">
      </div>
    </div>
    <div class="couple-form-actions">
      <button class="btn btn-ghost" type="button" id="ledgerPerCancel">返回</button>
      <button class="btn btn-gold" type="button" id="ledgerPerSave" data-period-id="${periodId}">保存</button>
    </div>`;
  form.querySelector('#ledgerPerCancel').addEventListener('click',()=>{
    renderMeetingPicker(form);
  });
  form.querySelector('#ledgerPerSave').addEventListener('click',()=>{
    const title=form.querySelector('#ledgerPerTitle').value.trim();
    if(!title){showToast('请输入名称','error');return}
    const type=form.querySelector('#ledgerPerType').value;
    const startDate=form.querySelector('#ledgerPerStart').value;
    const endDate=form.querySelector('#ledgerPerEnd').value;
    if(!isValidDateStr(startDate)){showToast('请选择开始日期','error');return}
    if(endDate&&endDate<startDate){showToast('结束日期不能早于开始日期','error');return}
    const data={title,type,startDate,endDate};
    let createdPer=null;
    if(periodId) updatePeriod(periodId,data);
    else createdPer=createPeriod(data);
    if(!periodId&&createdPer) setActivePeriod(createdPer.id);
    saveAndRefreshLedger();
    refreshCoupleSpaceView();
    showToast(periodId?'已更新':'已创建并设为当前','success');
    renderMeetingPicker(form);
  });
}
function openPeriodManager(){
  const modal=document.getElementById('coupleLedgerPeriodModal');
  const form=document.getElementById('coupleLedgerPeriodForm');
  if(!modal||!form) return;
  _ledgerPeriodPickerCallback=null;
  const titleEl=document.getElementById('coupleLedgerPeriodTitle');
  if(titleEl) titleEl.textContent='见面/旅行';
  renderPeriodManagerList(form);
  modal.classList.add('show');
  GlassScrollLock.lock('modal:coupleLedgerPeriodModal');
  modal.querySelector('#coupleLedgerPeriodClose')?.addEventListener('click',()=>{
    closeModal('coupleLedgerPeriodModal');
  });
}
function openMeetingManager(){
  openMeetingPicker();
}
function openLedgerPeriodPicker(onSelect,selectedId){
  const modal=document.getElementById('coupleLedgerPeriodModal');
  const form=document.getElementById('coupleLedgerPeriodForm');
  if(!modal||!form) return;
  _ledgerPeriodPickerCallback=onSelect;
  _ledgerPickerSelectedId=selectedId||'';
  const titleEl=document.getElementById('coupleLedgerPeriodTitle');
  if(titleEl) titleEl.textContent='选择见面 / 旅行';
  renderPeriodPickerList(form);
  modal.classList.add('show');
  GlassScrollLock.lock('modal:coupleLedgerPeriodModal');
  modal.querySelector('#coupleLedgerPeriodClose')?.addEventListener('click',()=>{
    _ledgerPeriodPickerCallback=null;
    closeModal('coupleLedgerPeriodModal');
  });
}
function renderPeriodPickerList(form){
  const cs=getCoupleSpace();
  const periods=(cs.meetings||[]).slice().sort((a,b)=>(b.startDate||'').localeCompare(a.startDate||''));
  const selId=_ledgerPickerSelectedId||'';
  let html='<div class="ledger-period-picker-list">';
  html+=`<div class="ledger-period-picker-item ${!selId?'selected':''}" data-period-pick="">
    <span class="ledger-period-picker-radio"></span>
    <span class="ledger-period-picker-label">不关联</span>
  </div>`;
  if(periods.length){
    periods.forEach(p=>{
      const fmtStart=formatLedgerDateGroup(p.startDate);
      const fmtEnd=p.endDate?formatLedgerDateGroup(p.endDate):'';
      html+=`<div class="ledger-period-picker-item ${selId===p.id?'selected':''}" data-period-pick="${p.id}">
        <span class="ledger-period-picker-radio"></span>
        <div class="ledger-period-picker-info">
          <div class="ledger-period-picker-title">${escapeHTML(p.title||'未命名')}</div>
          <div class="ledger-period-picker-date">${fmtStart}${fmtEnd?' - '+fmtEnd:''}</div>
        </div>
      </div>`;
    });
  }else{
    html+=`<div class="ledger-period-picker-empty">还没有见面/旅行记录</div>`;
  }
  html+='</div>';
  html+='<div class="ledger-period-picker-divider"></div>';
  html+=`<button class="ledger-period-picker-new" type="button" id="ledgerPeriodPickerNew">${icon('plus')} 新建见面 / 旅行</button>`;
  form.innerHTML=html;
  renderIcons(form);
  form.querySelectorAll('[data-period-pick]').forEach(el=>el.addEventListener('click',()=>{
    const pid=el.dataset.periodPick||'';
    const cb=_ledgerPeriodPickerCallback;
    _ledgerPeriodPickerCallback=null;
    closeModal('coupleLedgerPeriodModal');
    if(cb) cb(pid||null);
  }));
  form.querySelector('#ledgerPeriodPickerNew').addEventListener('click',()=>renderPeriodEditorForm(form,''));
}
function renderPeriodManagerList(form){
  const cs=getCoupleSpace();
  const lg=getLedger();
  const today=todayStr();
  const activeId=lg.activePeriodId;
  const all=(cs.meetings||[]).slice();
  const upcoming=all.filter(p=>{
    if(!p.startDate) return false;
    if(p.startDate>=today) return true;
    const end=p.endDate||p.startDate;
    return end>=today;
  }).sort((a,b)=>(a.startDate||'').localeCompare(b.startDate||''));
  const past=all.filter(p=>{
    if(!p.startDate) return false;
    const end=p.endDate||p.startDate;
    return end<today;
  }).sort((a,b)=>(b.startDate||'').localeCompare(a.startDate||''));
  const renderItem=(p)=>{
    const isOngoing=p.startDate<today&&(p.endDate||p.startDate)>=today;
    const dateText=p.endDate&&p.endDate!==p.startDate
      ?`${formatLedgerDateGroup(p.startDate)} - ${formatLedgerDateGroup(p.endDate)}`
      :formatLedgerDateGroup(p.startDate);
    return `<div class="ledger-period-list-item ${p.id===activeId?'active':''}">
      <div class="ledger-period-list-main">
        <div class="ledger-period-list-title">${escapeHTML(p.title||'未命名')} <span style="font-size:10px;color:var(--txt3)">[${LEDGER_PERIOD_TYPE_LABELS[p.type]||p.type}]${isOngoing?' · 进行中':''}</span></div>
        <div class="ledger-period-list-date">${dateText}</div>
      </div>
      <div class="ledger-period-list-actions">
        ${p.id===activeId?'<span style="font-size:10px;color:var(--gold-l);margin-right:auto">当前</span>':''}
        <button class="btn btn-ghost btn-sm" type="button" data-period-set="${p.id}">设为当前</button>
        <button class="btn btn-ghost btn-sm" type="button" data-period-edit="${p.id}">编辑</button>
        <button class="btn btn-ghost btn-sm" type="button" data-period-del="${p.id}" style="color:var(--red,#f87171)">删除</button>
      </div>
    </div>`;
  };
  let html='';
  if(upcoming.length){
    html+='<div class="ledger-period-group-label">即将到来</div>';
    html+=upcoming.map(renderItem).join('');
  }
  if(past.length){
    html+=`<div class="ledger-period-group-label" style="margin-top:${upcoming.length?'12px':'0'}">历史</div>`;
    html+=past.map(renderItem).join('');
  }
  if(!upcoming.length&&!past.length){
    html+=`<div class="couple-insufficient-sub" style="text-align:center;padding:14px 0">还没有见面/旅行记录</div>`;
  }
  html+=`<div class="couple-form-actions" style="margin-top:10px">
    <button class="btn btn-gold btn-sm" type="button" id="ledgerPeriodNew">${icon('plus')} 新建见面 / 旅行</button>
    <button class="btn btn-ghost btn-sm" type="button" id="ledgerPeriodClose">关闭</button>
  </div>`;
  form.innerHTML=html;
  renderIcons(form);
  form.querySelector('#ledgerPeriodClose').addEventListener('click',()=>{
    closeModal('coupleLedgerPeriodModal');
    refreshCoupleSpaceView();
  });
  form.querySelector('#ledgerPeriodNew').addEventListener('click',()=>renderPeriodEditorForm(form,''));
  form.querySelectorAll('[data-period-set]').forEach(btn=>btn.addEventListener('click',()=>{
    setActivePeriod(btn.dataset.periodSet);
    saveAndRefreshLedger();
    renderPeriodManagerList(form);
    refreshCoupleSpaceView();
    showToast('已设为当前周期','success');
  }));
  form.querySelectorAll('[data-period-edit]').forEach(btn=>btn.addEventListener('click',()=>renderPeriodEditorForm(form,btn.dataset.periodEdit)));
  form.querySelectorAll('[data-period-del]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!confirm('删除这个周期？关联的账单不会被删除，但会取消关联。')) return;
    deletePeriod(btn.dataset.periodDel);
    saveAndRefreshLedger();
    renderPeriodManagerList(form);
    refreshCoupleSpaceView();
    showToast('周期已删除','success');
  }));
}
function renderPeriodEditorForm(form,periodId){
  const existing=periodId?getMeetingById(periodId):null;
  const today=todayStr();
  const isPicker=!!_ledgerPeriodPickerCallback;
  form.innerHTML=`
    <div class="couple-time-modal-grid">
      <div class="form-group">
        <label class="form-label">名称 *</label>
        <input class="form-input" id="ledgerPerTitle" type="text" maxlength="30" value="${escapeHTML(existing?.title||'')}" placeholder="如：杭州见面">
      </div>
      <div class="form-group">
        <label class="form-label">类型</label>
        <select class="form-select" id="ledgerPerType">
          <option value="meeting" ${existing?.type==='meeting'||!existing?'selected':''}>见面</option>
          <option value="trip" ${existing?.type==='trip'?'selected':''}>旅行</option>
          <option value="custom" ${existing?.type==='custom'?'selected':''}>自定义</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">开始日期 *</label>
        <input class="form-input" id="ledgerPerStart" type="date" value="${existing?.startDate||today}">
      </div>
      <div class="form-group">
        <label class="form-label">结束日期</label>
        <input class="form-input" id="ledgerPerEnd" type="date" value="${existing?.endDate||''}">
      </div>
    </div>
    <div class="couple-form-actions">
      <button class="btn btn-ghost" type="button" id="ledgerPerCancel">返回</button>
      <button class="btn btn-gold" type="button" id="ledgerPerSave" data-period-id="${periodId}">保存</button>
    </div>`;
  form.querySelector('#ledgerPerCancel').addEventListener('click',()=>{
    if(isPicker) renderPeriodPickerList(form);
    else renderPeriodManagerList(form);
  });
  form.querySelector('#ledgerPerSave').addEventListener('click',()=>{
    const title=form.querySelector('#ledgerPerTitle').value.trim();
    if(!title){showToast('请输入名称','error');return}
    const type=form.querySelector('#ledgerPerType').value;
    const startDate=form.querySelector('#ledgerPerStart').value;
    const endDate=form.querySelector('#ledgerPerEnd').value;
    if(!isValidDateStr(startDate)){showToast('请选择开始日期','error');return}
    if(endDate&&endDate<startDate){showToast('结束日期不能早于开始日期','error');return}
    const data={title,type,startDate,endDate};
    let createdPer=null;
    if(periodId) updatePeriod(periodId,data);
    else createdPer=createPeriod(data);
    saveAndRefreshLedger();
    refreshCoupleSpaceView();
    showToast(periodId?'周期已更新':'周期已创建','success');
    if(isPicker){
      const cb=_ledgerPeriodPickerCallback;
      _ledgerPeriodPickerCallback=null;
      closeModal('coupleLedgerPeriodModal');
      if(cb) cb(periodId||createdPer?.id||null);
    }else{
      renderPeriodManagerList(form);
    }
  });
}
function daysBetweenDates(from,to=todayStr()){
  if(!isValidDateStr(from)||!isValidDateStr(to)) return null;
  return Math.floor((new Date(`${to}T00:00`)-new Date(`${from}T00:00`))/86400000);
}
function daysUntilDate(date,base=todayStr()){
  if(!isValidDateStr(date)) return null;
  return Math.ceil((new Date(`${date}T00:00`)-new Date(`${base}T00:00`))/86400000);
}
function getNextAnnualDate(date,base=todayStr()){
  if(!isValidDateStr(date)) return null;
  const [m,d]=date.slice(5).split('-');
  const year=Number(base.slice(0,4));
  let next=`${year}-${m}-${d}`;
  if(next<base) next=`${year+1}-${m}-${d}`;
  return next;
}
function formatAnniversaryDistance(date){
  const next=getNextAnnualDate(date);
  if(!next) return '未设置日期';
  const diff=daysUntilDate(next);
  if(diff===0) return '就是今天';
  if(diff>0) return `距离还有${diff}天`;
  return `已经过去${Math.abs(diff)}天`;
}
function formatTogetherNextAnniversary(date,base=todayStr()){
  const next=getNextAnnualDate(date,base);
  if(!next) return '未设置日期';
  const diff=daysUntilDate(next,base);
  const startYear=Number(String(date).slice(0,4));
  const nextYear=Number(String(next).slice(0,4));
  const years=Math.max(1,nextYear-startYear);
  if(diff===0) return `今天是${years}周年纪念日`;
  if(diff>0) return `距离${years}周年纪念日还有${diff}天`;
  return `${years}周年纪念日已过去${Math.abs(diff)}天`;
}
function getNearestAnniversary(){
  const cs=getCoupleSpace();
  const candidates=[];
  if(cs.togetherDate) candidates.push({id:'together',name:'在一起纪念日',date:cs.togetherDate});
  (cs.anniversaries||[]).forEach(a=>candidates.push(a));
  if(!candidates.length) return null;
  return candidates
    .map(a=>({...a,next:getNextAnnualDate(a.date)}))
    .filter(a=>a.next)
    .sort((a,b)=>daysUntilDate(a.next)-daysUntilDate(b.next))[0]||null;
}
function formatMeetingDays(meeting){
  if(!meeting?.date) return '未设置';
  const d=daysUntilDate(meeting.date);
  if(d===0) return '今天见面';
  if(d>0) return `${d}天后`;
  return `已过去${Math.abs(d)}天`;
}
function getTextOrWaiting(text){
  return text==='记录不足'||text==='0次'?'暂无记录':text;
}
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
function compareAnniversaryOrder(a,b){
  const ao=Number.isFinite(Number(a?.sortOrder))?Number(a.sortOrder):null;
  const bo=Number.isFinite(Number(b?.sortOrder))?Number(b.sortOrder):null;
  if(ao!==null||bo!==null){
    if(ao===null) return 1;
    if(bo===null) return -1;
    if(ao!==bo) return ao-bo;
  }
  const ad=daysUntilDate(getNextAnnualDate(a?.date))||9999;
  const bd=daysUntilDate(getNextAnnualDate(b?.date))||9999;
  if(ad!==bd) return ad-bd;
  return String(a?.date||'').localeCompare(String(b?.date||''));
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
function renderGoalMiniMetric(label,value){
  return `<div class="settings-row"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`;
}
function renderHealthGoalCenterSummary(profile){
  const progress=getGoalProgress(profile);
  const goal=progress.goal;
  const strategy=goal.strategy||{};
  const strategyText=(HEALTH_GOAL_TYPES[goal.type]?.strategy||[])[0]||'保持记录';
  const currentText=progress.current?`${progress.current} kg`:'未记录';
  const targetText=progress.target?`${progress.target} kg`:'未设置';
  const calorieText=strategy.daily_calories?`${strategy.daily_calories} kcal`:'未设置';
  const proteinText=strategy.protein_target?`${strategy.protein_target} g`:'未设置';
  return `
    <div class="settings-block">
      <div class="settings-summary-head">
        <div class="settings-block-title">健康目标</div>
        <button class="settings-inline-action" type="button" id="settingsPageOpenGoalCenterBtn">编辑 &gt;</button>
      </div>
      <div class="settings-goal-name">${escapeHTML(goal.title||'健康保持')}</div>
      <div class="settings-goal-weight-row">
        <div class="settings-goal-weight"><strong>${escapeHTML(currentText)}</strong><span>当前体重</span></div>
        <div class="settings-goal-weight"><strong>${escapeHTML(targetText)}</strong><span>目标体重</span></div>
      </div>
      <div class="settings-goal-progress"><div class="settings-goal-progress-fill" style="width:${progress.pct||0}%"></div></div>
      <div class="settings-goal-progress-meta"><span>${escapeHTML(progress.remainingText||'继续记录后估算进度')} · ${escapeHTML(progress.weeksText||'')}</span><strong>已完成 ${progress.pct||0}%</strong></div>
      <div class="settings-goal-mini-grid">
        <div class="settings-goal-mini"><span>热量目标</span><strong>${escapeHTML(calorieText)}</strong></div>
        <div class="settings-goal-mini"><span>蛋白质目标</span><strong>${escapeHTML(proteinText)}</strong></div>
        <div class="settings-goal-mini"><span>AI策略</span><strong>${escapeHTML(strategyText)}</strong></div>
      </div>
    </div>`;
}
function renderHomeGoalSummary(profile){
  const progress=getGoalProgress(profile);
  if(progress.current&&progress.target) return `距离目标还有：${Math.max(0,Math.abs(progress.current-progress.target)).toFixed(1)}kg`;
  return `当前目标：${progress.goal.title||'健康保持'}`;
}
function renderGoalProgressCard(profile){
  const wrap=document.getElementById('healthGoalProgressContent');
  if(!wrap||!profile) return;
  const progress=getGoalProgress(profile);
  const goal=progress.goal;
  const currentText=progress.current?`${progress.current}kg`:'未记录';
  const targetText=progress.target?`${progress.target}kg`:'目标未填';
  const startText=progress.start&&progress.target?`${progress.start}kg → `:'';
  wrap.innerHTML=`
    <div class="health-goal-mini-line">
      <span>${icon('target')} ${escapeHTML(goal.title||'健康保持')} · ${escapeHTML(startText)}当前 ${escapeHTML(currentText)} · 目标 ${escapeHTML(targetText)}</span>
      <strong>${progress.pct}%</strong>
    </div>
    <div class="health-goal-mini-bar"><div class="health-goal-mini-fill" style="width:${progress.pct}%"></div></div>`;
}
function renderSettingsPageContent(owner,active){
  const p=active||owner;
  if(!p){
    if(isSingleMode()) return `<div class="app-page-note">请先填写个人资料，再查看和管理健康目标。</div>`;
    return `<div class="app-page-note">请先完成当前设备身份绑定，再查看和管理个人资料。</div>
      <div class="settings-entry-actions"><button class="btn btn-gold btn-sm" type="button" id="settingsPageRebindBtn">重新绑定当前设备身份</button></div>`;
  }
  const latestWeight=getLatestWeight(p);
  const theme=document.documentElement.getAttribute('data-theme')==='light'?'浅色模式':'深色模式';
  const syncText=state.familyCode?'已配置同步码':'本地模式';
  const genderText=p.gender==='male'?'男':p.gender==='female'?'女':'未设置';
  const age=calcAge(p.birthDate);
  const profileName=p.name||getDisplayName(p)||'未填写';
  const profileMetaPrimary=[genderText,age?`${age}岁`:null].filter(Boolean).join(' · ');
  const profileMetaSecondary=[p.height?`${p.height}cm`:'身高未填写',latestWeight?`${latestWeight.weight}kg`:'体重未记录'].join(' · ');
  return `
    <div class="settings-page">
      <div class="settings-block">
        <div class="settings-block-title">个人资料</div>
        <div class="settings-profile-summary">
          <div class="settings-profile-avatar">${getProfileAvatarHtml(p)}</div>
          <div class="settings-profile-copy">
            <div class="settings-profile-name">${escapeHTML(profileName)}</div>
            <div class="settings-profile-meta">${escapeHTML(profileMetaPrimary)}</div>
            <div class="settings-profile-meta">${escapeHTML(profileMetaSecondary)}</div>
          </div>
          <button class="settings-inline-action settings-profile-edit" type="button" id="settingsPageOpenSettingsBtn">编辑 &gt;</button>
        </div>
      </div>
      ${renderHealthGoalCenterSummary(p)}
      <div class="settings-block">
        <div class="settings-block-title">应用设置</div>
        <div class="settings-list">
          <button class="settings-list-row" type="button" id="settingsPageModeBtn">
            <span class="settings-list-icon">${icon('target')}</span><span class="settings-list-title">使用模式</span><span class="settings-list-state">${isSingleMode()?'个人模式':'双人模式'}</span><span class="settings-list-chevron">${icon('chevron-right')}</span>
          </button>
          <button class="settings-list-row" type="button" id="settingsPageThemeBtn">
            <span class="settings-list-icon">${icon(theme==='浅色模式'?'sun':'moon')}</span><span class="settings-list-title">外观</span><span class="settings-list-state">${escapeHTML(theme)}</span><span class="settings-list-chevron">${icon('chevron-right')}</span>
          </button>
          <div class="settings-list-row static">
            <span class="settings-list-icon">${icon('bell')}</span><span class="settings-list-title">提醒</span><span class="settings-list-state">首页轻量提醒</span><span class="settings-list-chevron">${icon('chevron-right')}</span>
          </div>
          <button class="settings-list-row" type="button" id="settingsPageOpenSyncBtn">
            <span class="settings-list-icon">${icon('users')}</span><span class="settings-list-title">同步</span><span class="settings-list-state">${escapeHTML(syncText)}</span><span class="settings-list-chevron">${icon('chevron-right')}</span>
          </button>
          <button class="settings-list-row" type="button" id="settingsPageOpenDeviceBtn">
            <span class="settings-list-icon">${icon('settings')}</span><span class="settings-list-title">设备</span><span class="settings-list-state">当前设备</span><span class="settings-list-chevron">${icon('chevron-right')}</span>
          </button>
        </div>
      </div>
    </div>`;
}
function renderModeSettingsDialog(){
  const modal=document.getElementById('modeSettingsModal');
  const content=document.getElementById('modeSettingsContent');
  if(!modal||!content) return;
  const pendingMode=modal.dataset.pendingMode;
  if(pendingMode==='single'||pendingMode==='couple'){
    const toCouple=pendingMode==='couple';
    content.innerHTML=`<div class="mode-switch-confirm">${toCouple?'切换为双人模式后，将开启“我们”、健康对比等双人功能。现有个人健康记录不会改变。':'切换为个人模式后，将隐藏双人功能。已有健康记录和双人数据不会被删除。'}</div><div class="mode-switch-actions"><button class="btn btn-ghost" type="button" id="modeSwitchCancelBtn">取消</button><button class="btn btn-gold" type="button" id="modeSwitchConfirmBtn">确认切换</button></div>`;
    content.querySelector('#modeSwitchCancelBtn')?.addEventListener('click',()=>{delete modal.dataset.pendingMode;renderModeSettingsDialog()});
    content.querySelector('#modeSwitchConfirmBtn')?.addEventListener('click',()=>{
      if(setAppMode(pendingMode)) closeModal('modeSettingsModal');
    });
    return;
  }
  content.innerHTML=`<div class="mode-choice-grid"><button class="mode-choice-card ${isSingleMode()?'active':''}" type="button" data-mode="single"><strong>个人模式</strong><span>记录自己的健康数据，查看长期变化。</span></button><button class="mode-choice-card ${isCoupleMode()?'active':''}" type="button" data-mode="couple"><strong>双人模式</strong><span>开启“我们”、健康对比等双人功能。</span></button></div>`;
  content.querySelectorAll('.mode-choice-card').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.dataset.mode===getAppMode()) return;
    modal.dataset.pendingMode=btn.dataset.mode;
    renderModeSettingsDialog();
  }));
}
function openModeSettingsDialog(){
  const modal=document.getElementById('modeSettingsModal');
  if(!modal) return;
  delete modal.dataset.pendingMode;
  renderModeSettingsDialog();
  document.getElementById('modeSettingsClose').onclick=()=>closeModal('modeSettingsModal');
  modal.classList.add('show');
  GlassScrollLock.lock('modal:modeSettingsModal');
  renderIcons(modal);
}
/* ===== Detail Sub-Page Renderers ===== */
let trendDetailMetric='weight';
let trendDetailPeriod=7;
let trendDetailChart=null;

function _subPageHeader(title,dateStr,options={}){
  const dateText=dateStr?formatDate(dateStr):'';
  const backPage=options.backPage||'home';
  const backLabel=options.backLabel||'返回首页';
  const rightText=options.rightText||dateText;
  const rightAction=options.rightAction||'';
  const rightActionHTML=options.rightActionHTML||'';
  const rightActionAriaLabel=options.rightActionAriaLabel||options.rightActionLabel||'操作';
  return `<div class="sub-page-header">`+
    `<button class="sub-page-back" type="button" aria-label="${escapeHTML(backLabel)}" onclick="switchAppPage('${backPage}')">${icon('arrow-left')}</button>`+
    `<span class="sub-page-title">${title}</span>`+
    (rightAction?`<button class="sub-page-action" type="button" aria-label="${escapeHTML(rightActionAriaLabel)}" onclick="${escapeHTML(rightAction)}">${rightActionHTML||escapeHTML(options.rightActionLabel||'+')}</button>`:(rightText?`<span class="sub-page-date">${escapeHTML(rightText)}</span>`:''))+
    `</div>`;
}

/* ==================== SMART RECIPE (P1 UI — no AI) ==================== */
/*
 * Future recipe object shape (all features share this):
 * { id, title, mealType, calories, protein, carbs, fat, fiber, servings, cookTime,
 *   difficulty, tags, ingredients:[{name,amount,unit,calories,protein,carbs,fat}],
 *   steps, reason, adjustment, missingIngredients, source }
 */
function normalizeRecipePreferences(raw){
  const src={...SMART_RECIPE_DEFAULT_PREFERENCES,...(raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{})};
  const effort=SMART_RECIPE_EFFORT_OPTIONS.find(o=>o.id===src.cookingEffort)||SMART_RECIPE_EFFORT_OPTIONS[0];
  const cleanList=(arr)=>[...new Set((Array.isArray(arr)?arr:[]).map(v=>String(v||'').trim()).filter(Boolean))];
  return {
    allergies:cleanList(src.allergies),
    dislikes:cleanList(src.dislikes),
    dietStyle:SMART_RECIPE_DIET_STYLES.some(o=>o.id===src.dietStyle)?src.dietStyle:'any',
    cookingEffort:effort.id,
    maxCookTime:Number.isFinite(Number(src.maxCookTime))?Number(src.maxCookTime):effort.maxCookTime,
    kitchenAppliances:cleanList(src.kitchenAppliances),
    mealPattern:SMART_RECIPE_MEAL_PATTERN_OPTIONS.some(o=>o.id===src.mealPattern)?src.mealPattern:'3_meals_snack'
  };
}
function getRecipePreferences(profile){
  return normalizeRecipePreferences(profile?.recipePreferences);
}
function setRecipePreferences(profile,patch){
  if(!profile) return null;
  profile.recipePreferences=normalizeRecipePreferences({...getRecipePreferences(profile),...(patch||{})});
  return profile.recipePreferences;
}
function getSmartRecipeNutrition(recipe){
  const nutrition=recipe?.nutrition&&typeof recipe.nutrition==='object'?recipe.nutrition:recipe||{};
  return {
    calories:Math.max(0,Math.round(Number(nutrition.calories??recipe?.calories)||0)),
    protein:Math.max(0,Number(nutrition.protein??recipe?.protein)||0),
    carbs:Math.max(0,Number(nutrition.carbs??recipe?.carbs)||0),
    fat:Math.max(0,Number(nutrition.fat??recipe?.fat)||0),
    fiber:Math.max(0,Number(nutrition.fiber??recipe?.fiber)||0)
  };
}
function normalizeSmartRecipeForUI(raw,source='local'){
  if(!raw||typeof raw!=='object') return null;
  const nutrition=getSmartRecipeNutrition(raw);
  const ingredients=(Array.isArray(raw.ingredients)?raw.ingredients:[]).map(item=>{
    if(typeof item==='string') return {name:item,amount:'',unit:''};
    return {name:String(item?.name||item?.food||'').trim(),amount:item?.amount??'',unit:String(item?.unit||'')};
  }).filter(item=>item.name);
  if(!String(raw.title||'').trim()) return null;
  return {
    id:raw.id||`${source}_${Date.now().toString(36)}`,
    title:String(raw.title||'').trim(),
    mealType:MEAL_KEYS.includes(raw.mealType)?raw.mealType:getSmartRecipeCurrentMeal(),
    reason:String(raw.reason||'').trim(),
    calories:nutrition.calories,
    protein:nutrition.protein,
    carbs:nutrition.carbs,
    fat:nutrition.fat,
    fiber:nutrition.fiber,
    nutrition,
    ingredients,
    steps:(Array.isArray(raw.steps)?raw.steps:[]).map(step=>String(step||'').trim()).filter(Boolean),
    cookTime:Math.max(0,Math.round(Number(raw.cookTime)||0)),
    difficulty:String(raw.difficulty||'简单').trim()||'简单',
    tags:Array.isArray(raw.tags)?raw.tags.map(tag=>String(tag||'').trim()).filter(Boolean):[],
    noCook:!!raw.noCook,
    adjustment:String(raw.adjustment||'').trim(),
    source:raw.source||source
  };
}
function getSmartRecipeLinkContext(profile,date=currentViewDate,snap,cs){
  if(!profile) return null;
  const healthSnap=snap||getHealthScoreData(profile,date);
  const calorieStatus=cs||getDailyCalorieStatus(profile,date);
  if(!calorieStatus?.hasTarget) return null;
  const gaps=getSmartRecipeMacroGaps(healthSnap,calorieStatus);
  const proteinGap=Math.max(0,Number(gaps.protein)||0);
  const carbsGap=Math.max(0,Number(gaps.carbs)||0);
  const fatGap=Math.max(0,Number(gaps.fat)||0);
  const caloriesGap=Math.max(0,Number(gaps.calories)||0);
  if(proteinGap>SMART_RECIPE_GAP_THRESHOLDS.protein&&caloriesGap>0){
    return {mode:'protein-gap',target:'protein',hint:`蛋白质还差 ${Math.round(proteinGap)}g`};
  }
  const hasMacroGap=proteinGap>SMART_RECIPE_GAP_THRESHOLDS.protein||carbsGap>SMART_RECIPE_GAP_THRESHOLDS.carbs||fatGap>SMART_RECIPE_GAP_THRESHOLDS.fat;
  if(healthSnap?.hasFood&&hasMacroGap&&caloriesGap>0){
    const target=proteinGap>=carbsGap&&proteinGap>=fatGap?'protein':(carbsGap>=fatGap?'carbs':'fat');
    return {mode:'nutrition-gap',target,hint:'今天还有营养缺口'};
  }
  return null;
}
function getSmartRecipeHealthContext(profile,date=currentViewDate){
  const snap=getHealthScoreData(profile,date);
  const cs=getDailyCalorieStatus(profile,date);
  const goal=getHealthGoal(profile);
  const gaps=getSmartRecipeMacroGaps(snap,cs);
  return {
    date,
    meal:getSmartRecipeCurrentMeal(),
    goalType:goal?.type||'maintain',
    goalTitle:goal?.title||'',
    remainingKcal:cs?.hasTarget?Math.max(0,Math.round(Number(cs.intakeRemainingKcal)||0)):null,
    proteinGap:gaps.protein,
    carbsGap:gaps.carbs,
    fatGap:gaps.fat,
    hasFood:!!snap?.hasFood,
    hasTarget:!!cs?.hasTarget
  };
}
function getSmartRecipeRemainingCalorieBucket(remaining){
  if(remaining==null||!Number.isFinite(Number(remaining))) return 'na';
  const val=Math.max(0,Math.round(Number(remaining)));
  if(val<=0) return '0';
  if(val<=200) return '1-200';
  if(val<=500) return '201-500';
  if(val<=800) return '501-800';
  return '801+';
}
function buildSmartRecipeSourceSignature(profile,date=currentViewDate){
  const pkey=getProfileDataId(profile)||profile?.id||'';
  const hc=getSmartRecipeHealthContext(profile,date);
  const prefs=getRecipePreferences(profile);
  return [pkey,date,hc.meal,hc.goalType,getSmartRecipeRemainingCalorieBucket(hc.remainingKcal),JSON.stringify(prefs)].join('|');
}
function getSmartRecipeAICache(){
  try{return JSON.parse(localStorage.getItem(AI_SMART_RECIPE_CACHE_KEY)||'{}')||{}}
  catch(e){return {}}
}
function saveSmartRecipeAICache(cache){
  try{localStorage.setItem(AI_SMART_RECIPE_CACHE_KEY,JSON.stringify(cache||{}))}catch(e){}
}
function getSmartRecipeCacheInputKey(kind,input){
  return `${kind}:${normalizeSupplementText(input)}`;
}
function readSmartRecipeAICache(profile,date,kind,input){
  const pkey=getProfileDataId(profile)||profile?.id||'';
  if(!pkey||!date||!kind||!input) return null;
  const entry=getSmartRecipeAICache()?.[pkey]?.[date]?.[kind];
  const signature=buildSmartRecipeSourceSignature(profile,date);
  if(!entry||entry.inputKey!==getSmartRecipeCacheInputKey(kind,input)||!entry.recipe) return null;
  if(entry.source_signature&&entry.source_signature!==signature) return null;
  if(!entry.source_signature) return null;
  return entry.recipe;
}
function writeSmartRecipeAICache(profile,date,kind,input,recipe){
  const pkey=getProfileDataId(profile)||profile?.id||'';
  if(!pkey||!date||!kind||!recipe) return;
  const cache=getSmartRecipeAICache();
  cache[pkey]=cache[pkey]||{};
  cache[pkey][date]=cache[pkey][date]||{};
  cache[pkey][date][kind]={
    inputKey:getSmartRecipeCacheInputKey(kind,input),
    recipe,
    source_signature:buildSmartRecipeSourceSignature(profile,date),
    updatedAt:Date.now()
  };
  saveSmartRecipeAICache(cache);
}
function normalizeFavoriteRecipe(raw){
  if(!raw||typeof raw!=='object') return null;
  const nutrition=getSmartRecipeNutrition(raw);
  const title=String(raw.title||'').trim();
  if(!title) return null;
  const ingredients=(Array.isArray(raw.ingredients)?raw.ingredients:[]).map(item=>{
    if(typeof item==='string') return {name:item,amount:'',unit:''};
    return {name:String(item?.name||item?.food||'').trim(),amount:item?.amount??'',unit:String(item?.unit||'')};
  }).filter(item=>item.name);
  return {
    id:raw.id||`fav_${Date.now().toString(36)}`,
    title,
    mealType:MEAL_KEYS.includes(raw.mealType)?raw.mealType:'lunch',
    calories:nutrition.calories,
    protein:nutrition.protein,
    carbs:nutrition.carbs,
    fat:nutrition.fat,
    fiber:nutrition.fiber,
    nutrition,
    ingredients,
    steps:Array.isArray(raw.steps)?raw.steps.map(step=>String(step||'').trim()).filter(Boolean):[],
    tags:Array.isArray(raw.tags)?raw.tags.map(tag=>String(tag||'').trim()).filter(Boolean):[],
    reason:String(raw.reason||'').trim(),
    adjustment:String(raw.adjustment||'').trim(),
    cookTime:Math.max(0,Math.round(Number(raw.cookTime)||0)),
    difficulty:String(raw.difficulty||'简单').trim()||'简单',
    createdAt:Number(raw.createdAt)||Date.now(),
    source:'favorite'
  };
}
function getFavoriteRecipes(profile){
  if(!profile) return [];
  if(!Array.isArray(profile.favoriteRecipes)) profile.favoriteRecipes=[];
  return profile.favoriteRecipes.map(item=>normalizeFavoriteRecipe(item)).filter(Boolean);
}
function isFavoriteRecipe(profile,recipe){
  const id=recipe?.id||'';
  const title=String(recipe?.title||'').trim();
  return getFavoriteRecipes(profile).some(item=>item.id===id||(title&&item.title===title));
}
function toggleFavoriteRecipe(profile,recipe){
  if(!profile||!recipe) return false;
  const normalized=normalizeSmartRecipeForUI(recipe,recipe?.source||'favorite');
  if(!normalized) return false;
  const list=Array.isArray(profile.favoriteRecipes)?profile.favoriteRecipes:[];
  const idx=list.findIndex(item=>item.id===normalized.id||item.title===normalized.title);
  if(idx>=0){
    list.splice(idx,1);
    profile.favoriteRecipes=list;
    saveData();
    return false;
  }
  list.unshift({
    id:normalized.id,
    title:normalized.title,
    mealType:normalized.mealType,
    calories:normalized.calories,
    protein:normalized.protein,
    carbs:normalized.carbs,
    fat:normalized.fat,
    fiber:normalized.fiber,
    ingredients:normalized.ingredients,
    steps:normalized.steps,
    tags:normalized.tags,
    reason:normalized.reason||'',
    adjustment:normalized.adjustment||'',
    cookTime:normalized.cookTime||0,
    difficulty:normalized.difficulty||'简单',
    createdAt:Date.now()
  });
  profile.favoriteRecipes=list.slice(0,40);
  saveData();
  return true;
}
function estimateRecipeIngredientGrams(item){
  const name=String(item?.name||'').trim();
  const amount=Number(item?.amount);
  const unit=String(item?.unit||'').trim().toLowerCase();
  const local=findLocalFoodByName(name);
  const base=local?getFoodBaseAmount(local):0;
  if(['g','克'].includes(unit)&&Number.isFinite(amount)&&amount>0) return amount;
  if(['ml','毫升'].includes(unit)&&Number.isFinite(amount)&&amount>0) return amount;
  if(Number.isFinite(amount)&&amount>0&&['个','根','片','碗','份','袋','盒','条'].includes(unit)){
    return Math.max(10,(base||50)*amount);
  }
  if(Number.isFinite(amount)&&amount>=20) return amount;
  if(Number.isFinite(amount)&&amount>0) return Math.max(10,(base||40)*amount);
  return base||80;
}
function recipeIngredientsToFoodDraft(recipe){
  const normalized=normalizeSmartRecipeForUI(recipe,recipe?.source||'recipe');
  if(!normalized) return [];
  const ingredients=normalized.ingredients.length?normalized.ingredients:[{name:normalized.title,amount:normalized.calories?Math.max(80,normalized.calories/1.2):150,unit:'g'}];
  const nutrition=normalized.nutrition;
  const gramsList=ingredients.map(estimateRecipeIngredientGrams);
  const totalGrams=gramsList.reduce((sum,g)=>sum+g,0)||ingredients.length;
  return ingredients.map((item,index)=>{
    const name=item.name;
    const grams=gramsList[index]||80;
    const local=findLocalFoodByName(name);
    if(local){
      return prepareFoodPortion({
        ...local,
        name,
        amount:grams,
        source:'recipe',
        source_unit:local.unit||`${grams}g`
      });
    }
    const share=grams/totalGrams;
    return prepareFoodPortion({
      name,
      cat:'其他',
      unit:'g',
      source:'recipe',
      base_amount:grams,
      amount:grams,
      cal:roundFoodValue((nutrition.calories||0)*share,1),
      pro:roundFoodValue((nutrition.protein||0)*share,1),
      fat:roundFoodValue((nutrition.fat||0)*share,1),
      carb:roundFoodValue((nutrition.carbs||0)*share,1),
      fib:roundFoodValue((nutrition.fiber||0)*share,1),
      source_unit:`${grams}g`
    });
  });
}
function openFoodDraftFromRecipe(recipe){
  if(!recipe) return;
  if(typeof requireCurrentDeviceOwnerForHealthWrite==='function'&&!requireCurrentDeviceOwnerForHealthWrite()) return;
  const foods=recipeIngredientsToFoodDraft(recipe).map(prepareFoodPortion);
  if(!foods.length){
    showToast('这道菜暂无可记录的食材','error');
    return;
  }
  foodDraft=foods;
  foodDraftSession={mode:'search',phase:'review',editingIndex:null,pendingFood:null,recordDate:currentViewDate,fromRecipe:true};
  mealSelectionTouched=true;
  currentMeal=MEAL_KEYS.includes(recipe.mealType)?recipe.mealType:getSmartRecipeCurrentMeal();
  const modal=document.getElementById('quickActionModal');
  const titleEl=document.getElementById('quickActionTitle');
  if(!modal||!titleEl){
    showToast('无法打开记录确认页','error');
    return;
  }
  modal.dataset.quickAction='food-search';
  titleEl.textContent='记录这餐';
  openQuickActionModal();
  renderFoodDraftShell();
}
window.openFoodDraftFromRecipe=openFoodDraftFromRecipe;
function ensureSmartRecipeCard(healthGrid,managementSection){
  if(!healthGrid) return null;
  let card=document.getElementById('smartRecipeCard');
  if(!card){
    card=document.createElement('div');
    card.className='card c-chart smart-recipe-card';
    card.id='smartRecipeCard';
    card.innerHTML='<div id="smartRecipeContent"></div>';
  }
  if(healthGrid){
    if(managementSection&&managementSection.parentNode===healthGrid){
      healthGrid.insertBefore(card,managementSection);
    }else if(card.parentNode!==healthGrid){
      healthGrid.appendChild(card);
    }
  }
  return card;
}
function renderSmartRecipeCard(profile,date=currentViewDate){
  const wrap=document.getElementById('smartRecipeContent');
  if(!wrap||!profile) return;
  wrap.innerHTML=`
    <section class="smart-recipe-entry" id="smartRecipeEntryMain">
      <div class="smart-recipe-entry-head">
        <div class="smart-recipe-entry-title">${icon('utensils')}<span>智能食谱</span></div>
        <span class="smart-recipe-entry-arrow">›</span>
      </div>
      <div class="smart-recipe-entry-desc">根据今日状态，帮你决定怎么吃</div>
      <div class="smart-recipe-chips" id="smartRecipeQuickChips">
        <button type="button" class="ds-chip ds-chip--sm" data-sr-tab="today">今日推荐</button>
        <button type="button" class="ds-chip ds-chip--sm" data-sr-tab="ingredients">拍食材</button>
        <button type="button" class="ds-chip ds-chip--sm" data-sr-tab="search">搜菜品</button>
      </div>
    </section>`;
  renderIcons(wrap);
  bindSmartRecipeCard();
}
function bindSmartRecipeCard(){
  document.getElementById('smartRecipeEntryMain')?.addEventListener('click',()=>openSmartRecipePage('today'));
  document.querySelectorAll('#smartRecipeQuickChips [data-sr-tab]').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      openSmartRecipePage(btn.dataset.srTab||'today');
    });
  });
}
function openSmartRecipePage(tab='today',context=null){
  if(context&&typeof context==='object') smartRecipeContext=context;
  else if(context==null&&tab==='today'){ /* keep existing context */ }
  smartRecipeActiveTab=['today','ingredients','search','favorites'].includes(tab)?tab:'today';
  if(smartRecipeContext?.mode==='protein-gap') smartRecipePickIndex=0;
  switchAppPage('smart-recipe');
}
window.openSmartRecipePage=openSmartRecipePage;
function openSmartRecipeDetail(recipe,{source='today',returnPage='smart-recipe',returnTab=null}={}){
  if(!recipe?.id&&!recipe?.title) return;
  smartRecipeDetailState={
    source:source||'today',
    recipeId:recipe.id||null,
    returnPage:returnPage||'smart-recipe',
    returnTab:returnTab??smartRecipeActiveTab
  };
  switchAppPage('smart-recipe-detail');
}
window.openSmartRecipeDetail=openSmartRecipeDetail;
function closeSmartRecipeDetail(){
  const tab=smartRecipeDetailState?.returnTab||'today';
  const returnPage=smartRecipeDetailState?.returnPage||'smart-recipe';
  smartRecipeDetailState=null;
  if(returnPage==='smart-recipe'){
    smartRecipeActiveTab=['today','ingredients','search','favorites'].includes(tab)?tab:'today';
    switchAppPage('smart-recipe');
  }else{
    switchAppPage(returnPage);
  }
}
window.closeSmartRecipeDetail=closeSmartRecipeDetail;
function resolveSmartRecipeDetailRecipe(){
  const state=smartRecipeDetailState;
  if(!state) return null;
  const p=getActiveProfile();
  if(state.source==='search') return smartRecipeSearchResult?normalizeSmartRecipeForUI(smartRecipeSearchResult,'search'):null;
  if(state.source==='ingredients') return smartRecipeIngredientResult?normalizeSmartRecipeForUI(smartRecipeIngredientResult,'ingredients'):null;
  if(state.source==='favorite'&&state.recipeId&&p){
    const fav=(p.favoriteRecipes||[]).find(item=>item.id===state.recipeId);
    return fav?normalizeSmartRecipeForUI(normalizeFavoriteRecipe(fav),'favorite'):null;
  }
  if(p){
    try{
      const pick=getSmartRecipeRecommendationPick(buildSmartRecipeRecommendations(p,currentViewDate));
      if(pick&&(!state.recipeId||pick.id===state.recipeId)) return normalizeSmartRecipeForUI(pick,'local');
    }catch(e){}
  }
  return null;
}
function getSmartRecipeMealStatus(profile,date=currentViewDate){
  const foods=getDailyRecord(profile,date).food||[];
  const recordedByMeal={};
  foods.forEach(record=>{
    const meal=record?.meal;
    if(!MEAL_KEYS.includes(meal)) return;
    recordedByMeal[meal]=recordedByMeal[meal]||new Set();
    (record.foods||[]).forEach(food=>{
      const name=String(food?.food_name||food?.name||'').trim();
      if(name) recordedByMeal[meal].add(name);
    });
  });
  return MEAL_KEYS.map(key=>({
    key,
    label:MEAL_LABELS[key],
    recorded:!!recordedByMeal[key],
    status:recordedByMeal[key]?'已记录':(key==='snack'?'可安排':'未记录'),
    foodsPreview:recordedByMeal[key]?[...recordedByMeal[key]].slice(0,2).join('、'):''
  }));
}
function getSmartRecipeMacroGaps(snap,cs){
  const targets=snap?.targets||{};
  const intake=snap?.intake||{};
  const round1=v=>Math.max(0,Math.round(Number(v)*10)/10);
  return {
    calories:cs?.hasTarget?Math.max(0,Math.round(Number(cs.intakeRemainingKcal)||0)):null,
    protein:targets.protein?round1(Number(targets.protein)-Number(intake.protein||0)):null,
    carbs:targets.carbs?round1(Number(targets.carbs)-Number(intake.carbs||0)):null,
    fat:targets.fat?round1(Number(targets.fat)-Number(intake.fat||0)):null
  };
}
function getSmartRecipeTodaySectionTitle(mealStatus){
  const main=['breakfast','lunch','dinner'];
  const recordedMain=main.filter(k=>mealStatus.find(m=>m.key===k)?.recorded);
  if(!recordedMain.length) return '今天这样吃';
  if(recordedMain.length<3) return '今天这样吃';
  return '今日饮食建议';
}
function buildSmartRecipeGapLines(gaps){
  const lines=[];
  if(gaps.calories!=null){
    if(gaps.calories<=0) lines.push('今日热量目标已基本达成');
    else lines.push(`剩余热量 ${gaps.calories} kcal`);
  }
  if(gaps.protein!=null){
    if(gaps.protein<=1) lines.push('蛋白质已基本达标');
    else lines.push(`蛋白质还差 ${Math.round(gaps.protein)}g`);
  }
  if(gaps.carbs!=null){
    if(gaps.carbs<=1) lines.push('碳水已基本达标');
    else lines.push(`碳水还差 ${Math.round(gaps.carbs)}g`);
  }
  if(gaps.fat!=null){
    if(gaps.fat<=1) lines.push('脂肪已基本达标');
    else lines.push(`脂肪还差 ${Math.round(gaps.fat)}g`);
  }
  return lines.length?lines:['今日营养状态较为均衡'];
}
function getSmartRecipeLibrary(){
  return Array.isArray(SMART_RECIPE_LIBRARY)?SMART_RECIPE_LIBRARY.slice():[];
}
function getSmartRecipeCurrentMeal(){
  return getMealTypeByDateTime(currentViewDateTime());
}
function getSmartRecipeIngredientNames(recipe){
  return (recipe?.ingredients||[]).map(item=>typeof item==='string'?item:String(item?.name||'')).filter(Boolean);
}
function getSmartRecipeHaystack(recipe){
  return [recipe?.title,...getSmartRecipeIngredientNames(recipe),...(recipe?.tags||[]),recipe?.reason].map(v=>normalizeSupplementText(v)).join(' ');
}
function recipeHitsAllergy(recipe,allergies){
  if(!allergies.length) return false;
  const allergens=(recipe?.allergens||[]).map(String);
  const haystack=getSmartRecipeHaystack(recipe);
  return allergies.some(item=>{
    const key=String(item||'').trim();
    if(!key) return false;
    return allergens.includes(key)||haystack.includes(normalizeSupplementText(key));
  });
}
function recipeHitsDislike(recipe,dislikes){
  if(!dislikes.length) return false;
  const haystack=getSmartRecipeHaystack(recipe);
  return dislikes.some(item=>{
    const key=normalizeSupplementText(item);
    return key&&haystack.includes(key);
  });
}
function recipePassesEffort(recipe,preferences){
  const cookTime=Number(recipe?.cookTime)||0;
  const effort=preferences?.cookingEffort||'easy';
  const maxCook=Number(preferences?.maxCookTime);
  if(effort==='easy') return cookTime<=15;
  if(effort==='15min') return cookTime<=15;
  if(effort==='30min') return cookTime<=30;
  if(Number.isFinite(maxCook)&&maxCook>0) return cookTime<=maxCook;
  return true;
}
function recipePassesKitchen(recipe,preferences){
  const apps=preferences?.kitchenAppliances||[];
  if(apps.includes('无厨房')) return !!(recipe?.noCook||(Number(recipe?.cookTime)||0)<=5);
  return true;
}
function getSmartRecipeMacroHint(gaps){
  const proteinGap=Math.max(0,Number(gaps?.protein)||0);
  const carbsGap=Math.max(0,Number(gaps?.carbs)||0);
  const fatGap=Math.max(0,Number(gaps?.fat)||0);
  if(proteinGap<=SMART_RECIPE_GAP_THRESHOLDS.protein&&carbsGap<=SMART_RECIPE_GAP_THRESHOLDS.carbs&&fatGap<=SMART_RECIPE_GAP_THRESHOLDS.fat) return 'balanced';
  if(proteinGap>=carbsGap&&proteinGap>=fatGap) return 'protein';
  if(carbsGap>=fatGap) return 'carbs';
  return 'fat';
}
function buildSmartRecipeRecommendationReason(recipe,ctx){
  const parts=[];
  if(ctx.mealMatch) parts.push(`适合现在的${MEAL_LABELS[ctx.meal]||'这顿'}`);
  if(ctx.calFit) parts.push('热量刚好落在剩余空间里');
  if(ctx.macroHint==='protein') parts.push('有助于补蛋白质');
  else if(ctx.macroHint==='carbs') parts.push('有助于补碳水');
  else if(ctx.macroHint==='fat') parts.push('有助于补脂肪');
  if(ctx.easy) parts.push('准备比较省事');
  if(parts.length) return parts.join(' · ');
  return recipe?.reason||'简单健康，适合当前状态';
}
function buildSmartRecipeRecommendationReasons(recipe,profile,date=currentViewDate){
  if(!recipe||!profile) return [recipe?.reason||'简单健康，适合当前状态'];
  const snap=getHealthScoreData(profile,date);
  const cs=getDailyCalorieStatus(profile,date);
  const goal=getHealthGoal(profile);
  const preferences=getRecipePreferences(profile);
  const gaps=getSmartRecipeMacroGaps(snap,cs);
  const meal=getSmartRecipeCurrentMeal();
  const reasons=[];
  const proteinGap=Math.max(0,Number(gaps.protein)||0);
  const carbsGap=Math.max(0,Number(gaps.carbs)||0);
  const fatGap=Math.max(0,Number(gaps.fat)||0);
  if(proteinGap>SMART_RECIPE_GAP_THRESHOLDS.protein) reasons.push('今天蛋白质不足，有助于补充');
  else if(carbsGap>SMART_RECIPE_GAP_THRESHOLDS.carbs) reasons.push('今天碳水还有缺口');
  else if(fatGap>SMART_RECIPE_GAP_THRESHOLDS.fat) reasons.push('今天脂肪还有缺口');
  if(goal?.type==='fat_loss') reasons.push('符合当前减脂目标');
  else if(goal?.type==='muscle_gain') reasons.push('符合当前增肌目标');
  if(preferences.dietStyle==='high_protein'&&recipe.tags?.includes('high_protein')) reasons.push('符合高蛋白饮食偏好');
  else if(preferences.dietStyle==='light'&&(recipe.tags?.includes('light')||recipe.tags?.includes('low_fat'))) reasons.push('符合清淡饮食偏好');
  else if(preferences.dietStyle==='vegetarian'&&recipe.tags?.includes('vegetarian')) reasons.push('符合素食偏好');
  if(recipe.mealType===meal) reasons.push(`适合现在的${MEAL_LABELS[meal]||'这顿'}`);
  if(recipe.noCook||Number(recipe.cookTime||0)<=10) reasons.push('制作时间短');
  if(!reasons.length&&recipe.reason) reasons.push(recipe.reason);
  if(!reasons.length) reasons.push('简单健康，适合当前状态');
  return reasons.slice(0,5);
}
function scoreSmartRecipeCandidate(recipe,ctx){
  const calories=Number(recipe.calories)||0;
  const remaining=ctx.remaining;
  if(ctx.hasTarget&&remaining>0&&calories>remaining*1.2) return {score:-Infinity};
  if(ctx.hasTarget&&remaining<=0&&calories>130) return {score:-Infinity};
  let score=0;
  const mealMatch=recipe.mealType===ctx.meal;
  const unrecordedMatch=ctx.unrecordedMeals.includes(recipe.mealType);
  if(mealMatch) score+=42;
  else if(unrecordedMatch) score+=16;
  else if(recipe.mealType==='snack'&&ctx.meal!=='snack') score+=2;
  else score-=10;
  let calFit=false;
  if(ctx.hasTarget){
    if(remaining<=0){
      if(calories<=130){score+=10;calFit=true;}
    }else{
      const ratio=calories/remaining;
      if(ratio>=0.35&&ratio<=0.85){score+=32;calFit=true;}
      else if(ratio>=0.2&&ratio<=1){score+=18;calFit=true;}
      else if(ratio<0.2) score+=4;
      else score-=8;
    }
  }
  const proteinGap=Math.max(0,Number(ctx.gaps.protein)||0);
  const carbsGap=Math.max(0,Number(ctx.gaps.carbs)||0);
  const fatGap=Math.max(0,Number(ctx.gaps.fat)||0);
  score+=Math.min(Number(recipe.protein)||0,proteinGap)*2.2;
  score+=Math.min(Number(recipe.carbs)||0,carbsGap)*1.1;
  score+=Math.min(Number(recipe.fat)||0,fatGap)*1.3;
  if(ctx.macroHint==='protein'&&recipe.tags?.includes('high_protein')) score+=10;
  if(ctx.macroHint==='carbs'&&(recipe.tags?.includes('carb')||Number(recipe.carbs)>=20)) score+=6;
  if(ctx.goalType==='fat_loss'&&(recipe.tags?.includes('light')||recipe.tags?.includes('high_protein'))) score+=8;
  if(ctx.goalType==='muscle_gain'&&recipe.tags?.includes('high_protein')) score+=10;
  if(ctx.dietStyle==='high_protein'&&recipe.tags?.includes('high_protein')) score+=10;
  if(ctx.dietStyle==='light'&&(recipe.tags?.includes('light')||recipe.tags?.includes('low_fat'))) score+=8;
  if(ctx.dietStyle==='chinese_home'&&recipe.tags?.includes('chinese_home')) score+=8;
  if(smartRecipeContext?.mode==='protein-gap'&&(recipe.tags?.includes('high_protein')||Number(recipe.protein)>=18)) score+=28;
  const cookTime=Number(recipe.cookTime)||0;
  const easy=!!(recipe.noCook||cookTime<=10||ctx.effort==='easy');
  if(recipe.noCook) score+=10;
  score-=cookTime*0.12;
  if(ctx.effort==='easy'&&cookTime<=10) score+=8;
  const apps=ctx.appliances||[];
  const recipeApps=recipe.appliances||[];
  if(apps.length&&recipeApps.length&&recipeApps.some(item=>apps.includes(item))) score+=6;
  if(ctx.mealPattern==='3_meals'&&recipe.mealType==='snack') score-=18;
  return {score,mealMatch,calFit,easy};
}
function buildSmartRecipeRecommendations(profile,date=currentViewDate,snap,cs){
  if(!profile) return [];
  const healthSnap=snap||getHealthScoreData(profile,date);
  const calorieStatus=cs||getDailyCalorieStatus(profile,date);
  const preferences=getRecipePreferences(profile);
  const goal=getHealthGoal(profile);
  const meal=getSmartRecipeCurrentMeal();
  const mealStatus=getSmartRecipeMealStatus(profile,date);
  const gaps=getSmartRecipeMacroGaps(healthSnap,calorieStatus);
  const allergies=(preferences.allergies||[]).map(String);
  const dislikes=(preferences.dislikes||[]).map(String);
  const unrecordedMeals=mealStatus.filter(item=>!item.recorded).map(item=>item.key);
  const ctx={
    meal,
    unrecordedMeals,
    gaps,
    remaining:calorieStatus?.hasTarget?Math.max(0,Math.round(Number(calorieStatus.intakeRemainingKcal)||0)):null,
    hasTarget:!!calorieStatus?.hasTarget,
    goalType:goal?.type||'maintain',
    dietStyle:preferences.dietStyle||'any',
    effort:preferences.cookingEffort||'easy',
    appliances:preferences.kitchenAppliances||[],
    mealPattern:preferences.mealPattern||'3_meals_snack',
    macroHint:getSmartRecipeMacroHint(gaps)
  };
  const ranked=[];
  getSmartRecipeLibrary().forEach(recipe=>{
    if(!recipe||!recipe.id) return;
    if(recipeHitsAllergy(recipe,allergies)) return;
    if(recipeHitsDislike(recipe,dislikes)) return;
    if(preferences.dietStyle==='vegetarian'&&!recipe.tags?.includes('vegetarian')) return;
    if(!recipePassesEffort(recipe,preferences)) return;
    if(!recipePassesKitchen(recipe,preferences)) return;
    const scored=scoreSmartRecipeCandidate(recipe,ctx);
    if(!Number.isFinite(scored.score)) return;
    ranked.push({
      ...recipe,
      score:scored.score,
      reason:buildSmartRecipeRecommendationReason(recipe,{...ctx,...scored})
    });
  });
  ranked.sort((a,b)=>b.score-a.score||a.calories-b.calories);
  return ranked.slice(0,8);
}
function getSmartRecipeRecommendationPick(recommendations){
  const list=Array.isArray(recommendations)?recommendations:[];
  if(!list.length) return null;
  const index=Math.abs(Number(smartRecipePickIndex)||0)%list.length;
  return list[index]||null;
}
function formatSmartRecipeIngredients(recipe){
  return getSmartRecipeIngredientNames(recipe).map((name,idx)=>{
    const item=recipe.ingredients[idx];
    if(!item||typeof item==='string') return name;
    const amount=item.amount==null||item.amount===''?'':item.amount;
    const unit=item.unit||'';
    return `${name}${amount!==''?` ${amount}${unit}`:''}`;
  }).join(' · ');
}
function renderSmartRecipeRecommendationCard(pick,total,options={}){
  if(!pick) return '';
  const recipe=normalizeSmartRecipeForUI(pick,pick.source||'local');
  if(!recipe) return '';
  const p=getActiveProfile();
  const mealLabel=MEAL_LABELS[recipe.mealType]||'这顿';
  const cookLabel=recipe.noCook||(Number(recipe.cookTime)||0)<=0?'无需准备':`${recipe.cookTime}分钟`;
  const canSwap=options.swap!==false&&Number(total)>1;
  const showSwap=options.swap!==false;
  const showRegen=!!options.regenerate;
  const fav=p?isFavoriteRecipe(p,recipe):false;
  const sourceAttr=escapeHTML(options.source||recipe.source||'local');
  const reasons=p?buildSmartRecipeRecommendationReasons(recipe,p,currentViewDate):[recipe.reason||'简单健康，适合当前状态'];
  const reasonHtml=reasons.length?`<div class="sr-recipe-section-label">推荐理由</div><div class="sr-reason-list">${reasons.map(r=>`<div class="sr-reason-item">${escapeHTML(r)}</div>`).join('')}</div>`:'';
  return `<div class="sr-recipe-card" data-sr-recipe-source="${sourceAttr}">
      <div class="sr-recipe-meta">
        <span class="ds-chip ds-chip--sm active">${escapeHTML(mealLabel)}</span>
        <span class="ds-chip ds-chip--sm">${escapeHTML(cookLabel)}</span>
        <span class="ds-chip ds-chip--sm">${escapeHTML(recipe.difficulty||'简单')}</span>
      </div>
      <div class="sr-recipe-section-label">菜谱信息</div>
      <div class="sr-recipe-title">${escapeHTML(recipe.title)}</div>
      <div class="sr-recipe-kcal">${Math.round(recipe.calories||0)}<small>kcal</small></div>
      <div class="sr-recipe-macros">
        <span>蛋白质 ${Math.round(recipe.protein||0)}g</span>
        <span>碳水 ${Math.round(recipe.carbs||0)}g</span>
        <span>脂肪 ${Math.round(recipe.fat||0)}g</span>
      </div>
      ${reasonHtml}
      <div class="sr-recipe-actions">
        <button type="button" class="da-action-btn" data-sr-record="${sourceAttr}">${icon('utensils')} 记录这餐</button>
        ${showSwap?`<button type="button" class="da-action-btn ghost" id="smartRecipeSwapBtn">${icon('sparkles')} 换一道</button>`:''}
        <button type="button" class="da-action-btn ghost" data-sr-fav="${sourceAttr}">${fav?'已收藏':'收藏'}</button>
        <button type="button" class="da-action-btn ghost" data-sr-detail="${sourceAttr}">查看详情</button>
        ${showRegen?`<button type="button" class="da-action-btn ghost" data-sr-regen="${sourceAttr}">重新生成</button>`:''}
      </div>
      ${showSwap&&!canSwap?'<div class="sr-supp-note">当前偏好下暂时只有这一道合适的本地菜谱。</div>':''}
    </div>`;
}
function renderSmartRecipeFavoriteTab(profile){
  if(!profile) return '';
  const list=getFavoriteRecipes(profile);
  if(!list.length){
    return `<section class="sub-page-section">
      <div class="sub-page-section-title">${icon('star')} 我的收藏菜谱</div>
      <div class="empty-state"><div class="empty-state__title">还没有收藏菜谱</div><div class="empty-state__desc">在今日推荐、搜菜品或拍食材结果中收藏，方便下次快速查看。</div></div>
    </section>`;
  }
  return `<section class="sub-page-section">
    <div class="sub-page-section-title">${icon('star')} 我的收藏菜谱</div>
    <div class="sr-fav-list">${list.map(item=>{
      const tags=(item.tags||[]).slice(0,3);
      return `<div class="sr-fav-row" data-sr-fav-id="${escapeHTML(item.id)}">
        <div class="sr-fav-main">
          <div class="sr-fav-title">${escapeHTML(item.title)}</div>
          <div class="sr-fav-meta">${Math.round(item.calories||item.nutrition?.calories||0)} kcal · 蛋白质 ${Math.round(item.protein||item.nutrition?.protein||0)}g · 碳水 ${Math.round(item.carbs||item.nutrition?.carbs||0)}g</div>
          ${tags.length?`<div class="sr-fav-tags">${tags.map(tag=>`<span class="sr-fav-tag">${escapeHTML(tag)}</span>`).join('')}</div>`:''}
        </div>
        <div class="sr-fav-actions">
          <button type="button" class="ds-chip ds-chip--sm" data-sr-fav-detail="${escapeHTML(item.id)}">查看详情</button>
          <button type="button" class="ds-chip ds-chip--sm" data-sr-fav-remove="${escapeHTML(item.id)}">取消收藏</button>
        </div>
      </div>`;
    }).join('')}</div>
  </section>`;
}
function getSupplementFoods(){
  return SUPPLEMENT_FOODS.slice();
}
function normalizeSupplementText(value){
  return String(value||'').trim().toLowerCase();
}
function getSupplementVariant(food,factor=1,label=''){
  const scale=Number(factor)||1;
  const amount=Math.round((food.servingAmount||0)*scale);
  return {
    ...food,
    portionFactor:scale,
    portionLabel:label||food.servingLabel,
    servingAmount:amount,
    calories:Math.round((food.calories||0)*scale),
    protein:+((food.protein||0)*scale).toFixed(1),
    carbs:+((food.carbs||0)*scale).toFixed(1),
    fat:+((food.fat||0)*scale).toFixed(1),
    fiber:+((food.fiber||0)*scale).toFixed(1)
  };
}
function getSupplementVariants(food){
  const base=[getSupplementVariant(food,1,food.servingLabel)];
  (food.portionOptions||[]).forEach(opt=>{
    if(opt&&opt.factor>0) base.push(getSupplementVariant(food,opt.factor,opt.label||food.servingLabel));
  });
  return base;
}
function supplementMatchesDislike(food,preferences){
  const dislikes=(preferences?.dislikes||[]).map(normalizeSupplementText).filter(Boolean);
  if(!dislikes.length) return false;
  const haystack=[food.name,...(food.keywords||[])].map(normalizeSupplementText).join(' ');
  return dislikes.some(item=>haystack.includes(item));
}
function passesSupplementEffort(food,preferences){
  const effort=preferences?.cookingEffort||'easy';
  if(effort==='15min') return Number(food.prepMinutes||0)<=15;
  if(effort==='30min') return Number(food.prepMinutes||0)<=30;
  return true;
}
function getSmartRecipeSupplementState(profile,date,snap,cs){
  const preferences=getRecipePreferences(profile);
  const gaps=getSmartRecipeMacroGaps(snap,cs);
  const targets=snap?.targets||null;
  if(!profile||!targets||!cs?.hasTarget||!snap?.hasFood){
    return {status:'insufficient',gaps,preferences,suggestions:[]};
  }
  const proteinGap=Math.max(0,Number(gaps.protein)||0);
  const carbsGap=Math.max(0,Number(gaps.carbs)||0);
  const fatGap=Math.max(0,Number(gaps.fat)||0);
  const caloriesGap=Math.max(0,Number(gaps.calories)||0);
  const basicallyEnough=proteinGap<=SMART_RECIPE_GAP_THRESHOLDS.protein&&carbsGap<=SMART_RECIPE_GAP_THRESHOLDS.carbs&&fatGap<=SMART_RECIPE_GAP_THRESHOLDS.fat;
  if(basicallyEnough){
    return {status:'balanced',gaps,preferences,suggestions:[]};
  }
  if(caloriesGap<=0){
    return {status:'no_calorie_space',gaps,preferences,suggestions:[]};
  }
  const suggestions=buildSupplementSuggestions(gaps,preferences);
  return {status:suggestions.length?'ready':'limited',gaps,preferences,suggestions};
}
function scoreSupplementFood(variant,gaps,preferences){
  const calorieSpace=Math.max(0,Number(gaps.calories)||0);
  const calorieCap=calorieSpace>0?calorieSpace*1.15:0;
  if(calorieSpace>0&&variant.calories>calorieCap) return -Infinity;
  let score=0;
  const proteinGap=Math.max(0,Number(gaps.protein)||0);
  const carbsGap=Math.max(0,Number(gaps.carbs)||0);
  const fatGap=Math.max(0,Number(gaps.fat)||0);
  score+=Math.min(variant.protein,proteinGap)*3.2;
  score+=Math.min(variant.carbs,carbsGap)*1.8;
  score+=Math.min(variant.fat,fatGap)*2.1;
  if(proteinGap<=SMART_RECIPE_GAP_THRESHOLDS.protein) score-=variant.protein*0.35;
  if(carbsGap<=SMART_RECIPE_GAP_THRESHOLDS.carbs) score-=variant.carbs*0.25;
  if(fatGap<=SMART_RECIPE_GAP_THRESHOLDS.fat) score-=variant.fat*0.45;
  const effort=preferences?.cookingEffort||'easy';
  if(variant.noCook) score+=8;
  score+=Number(variant.convenience||0)*1.7;
  score-=Number(variant.prepMinutes||0)*0.22;
  if(effort==='easy'){
    if(variant.noCook) score+=8;
    else if((variant.prepMinutes||0)<=5) score+=2;
    else score-=6;
  }else if(effort==='15min'){
    if((variant.prepMinutes||0)<=5) score+=2;
  }else if(effort==='30min'){
    if((variant.prepMinutes||0)<=10) score+=1;
  }
  if(preferences?.dietStyle==='high_protein'&&variant.tags?.includes('high_protein')) score+=4;
  if(preferences?.dietStyle==='light'&&(variant.tags?.includes('light')||variant.tags?.includes('low_fat'))) score+=3;
  if(preferences?.dietStyle==='vegetarian'&&!variant.tags?.includes('vegetarian')) score-=100;
  if(calorieSpace>0){
    const ratio=variant.calories/calorieSpace;
    if(ratio>0.6&&ratio<=1.05) score+=4;
    else if(ratio<0.35) score-=1.5;
  }
  return score;
}
function buildSupplementSuggestion(items,gaps){
  const total=items.reduce((acc,item)=>{
    acc.calories+=item.calories||0;
    acc.protein+=item.protein||0;
    acc.carbs+=item.carbs||0;
    acc.fat+=item.fat||0;
    return acc;
  },{calories:0,protein:0,carbs:0,fat:0});
  const proteinGap=Math.max(0,Number(gaps.protein)||0);
  const carbsGap=Math.max(0,Number(gaps.carbs)||0);
  const fatGap=Math.max(0,Number(gaps.fat)||0);
  const dominant=proteinGap>=carbsGap&&proteinGap>=fatGap?'protein':(carbsGap>=fatGap?'carbs':'fat');
  let reason='热量合适，适合简单补一下';
  if(dominant==='protein') reason=`${items.every(item=>item.noCook)?'开袋即吃':'准备简单'} · 适合补蛋白`;
  else if(dominant==='carbs') reason=`${items.every(item=>item.noCook)?'拿起就能吃':'准备不复杂'} · 适合补碳水`;
  else if(dominant==='fat') reason=`${items.every(item=>item.noCook)?'无需准备':'操作简单'} · 适合补脂肪`;
  if(items.length===2){
    if(dominant==='protein'&&carbsGap>SMART_RECIPE_GAP_THRESHOLDS.carbs) reason='一份蛋白 + 一份碳水，更适合当前缺口';
    else reason='两样搭配更接近你现在的缺口';
  }
  const maxPrep=Math.max(...items.map(item=>Number(item.prepMinutes)||0),0);
  const prepLabel=items.every(item=>item.noCook)?'无需准备':(maxPrep<=5?'简单处理':(maxPrep<=15?'15分钟内':'30分钟内'));
  return {
    items,
    calories:Math.round(total.calories),
    protein:+total.protein.toFixed(1),
    carbs:+total.carbs.toFixed(1),
    fat:+total.fat.toFixed(1),
    prepLabel,
    reason
  };
}
function buildSupplementSuggestions(gaps,preferences){
  const allergies=(preferences?.allergies||[]).map(String);
  const singles=[];
  getSupplementFoods()
    .filter(food=>passesSupplementEffort(food,preferences))
    .filter(food=>!food.allergens.some(allergen=>allergies.includes(allergen)))
    .filter(food=>!supplementMatchesDislike(food,preferences))
    .forEach(food=>{
      let best=null;
      getSupplementVariants(food).forEach(variant=>{
        const score=scoreSupplementFood(variant,gaps,preferences);
        if(!Number.isFinite(score)) return;
        if(!best||score>best.score) best={...variant,score};
      });
      if(best) singles.push(best);
    });
  singles.sort((a,b)=>b.score-a.score);
  const suggestions=singles.slice(0,6).map(item=>({score:item.score,...buildSupplementSuggestion([item],gaps)}));
  for(let i=0;i<Math.min(6,singles.length);i++){
    for(let j=i+1;j<Math.min(6,singles.length);j++){
      const a=singles[i],b=singles[j];
      const calorieCap=Math.max(0,Number(gaps.calories)||0)*1.15;
      const combinedCalories=(a.calories||0)+(b.calories||0);
      if(calorieCap>0&&combinedCalories>calorieCap) continue;
      const comboSuggestion=buildSupplementSuggestion([a,b],gaps);
      const comboScore=scoreSupplementFood({
        calories:comboSuggestion.calories,
        protein:comboSuggestion.protein,
        carbs:comboSuggestion.carbs,
        fat:comboSuggestion.fat,
        prepMinutes:Math.max(a.prepMinutes||0,b.prepMinutes||0),
        noCook:!!(a.noCook&&b.noCook),
        convenience:Math.min(a.convenience||0,b.convenience||0),
        tags:[...(a.tags||[]),...(b.tags||[])]
      },gaps,preferences)-4;
      if(!Number.isFinite(comboScore)) continue;
      suggestions.push({score:comboScore,...comboSuggestion});
    }
  }
  const unique=[];
  const seen=new Set();
  suggestions.sort((a,b)=>b.score-a.score).forEach(suggestion=>{
    const key=suggestion.items.map(item=>item.id+':'+item.portionLabel).sort().join('+');
    if(seen.has(key)) return;
    seen.add(key);
    unique.push(suggestion);
  });
  const sliced=unique.slice(0,4);
  if(!sliced.length) return sliced;
  const offset=Math.abs(Number(smartRecipeSupplementShuffle)||0)%sliced.length;
  if(offset===0) return sliced;
  return sliced.slice(offset).concat(sliced.slice(0,offset));
}
function getSmartRecipeSupplementTitle(date,mealStatus){
  if(date===todayStr()){
    const hour=new Date().getHours();
    if(hour>=14&&hour<18) return '下午可以简单补一点';
  }
  const recordedMain=['breakfast','lunch','dinner'].filter(key=>mealStatus.find(item=>item.key===key)?.recorded).length;
  if(recordedMain>=3) return '今天还差一点';
  return '省事补一下';
}
function getSmartRecipeSupplementBadges(suggestion,gaps){
  const badges=[];
  const proteinGap=Math.max(0,Number(gaps.protein)||0);
  const carbsGap=Math.max(0,Number(gaps.carbs)||0);
  const fatGap=Math.max(0,Number(gaps.fat)||0);
  const dominant=proteinGap>=carbsGap&&proteinGap>=fatGap?'protein':(carbsGap>=fatGap?'carbs':'fat');
  if(dominant==='protein') badges.push('补蛋白');
  else if(dominant==='carbs') badges.push('补碳水');
  else badges.push('补脂肪');
  if(suggestion.items.every(item=>item.noCook)) badges.push('无需烹饪');
  else if((suggestion.items.every(item=>(item.prepMinutes||0)<=5))) badges.push('准备简单');
  if(suggestion.items.some(item=>item.tags?.includes('low_fat')||item.tags?.includes('light'))) badges.push('适合减脂');
  return badges.slice(0,3);
}
function renderSmartRecipeSupplementSection(state,date,mealStatus){
  if(state.status==='insufficient'){
    return `<section class="sub-page-section"><div class="empty-state"><div class="empty-state__title">今天的数据还不足以生成补缺建议</div><div class="empty-state__desc">补缺建议需要先有可计算的热量目标和当天饮食数据。</div></div></section>`;
  }
  if(state.status==='balanced'){
    return `<section class="sub-page-section"><div class="sub-page-section-title">${icon('sparkles')} ${getSmartRecipeSupplementTitle(date,mealStatus)}</div><div class="empty-state"><div class="empty-state__title">今天营养已经基本够了</div><div class="empty-state__desc">不需要为了凑数字额外加餐。</div></div></section>`;
  }
  if(state.status==='no_calorie_space'){
    return `<section class="sub-page-section"><div class="sub-page-section-title">${icon('sparkles')} ${getSmartRecipeSupplementTitle(date,mealStatus)}</div><div class="empty-state"><div class="empty-state__title">今天的热量空间已经用完</div><div class="empty-state__desc">部分营养还有缺口，不建议为了补齐数字继续吃。明天可以优先调整正餐搭配。</div></div></section>`;
  }
  if(state.status==='limited'){
    return `<section class="sub-page-section"><div class="sub-page-section-title">${icon('sparkles')} ${getSmartRecipeSupplementTitle(date,mealStatus)}</div><div class="sub-page-empty">剩余热量空间比较有限，暂时没有找到足够合适的省事补充组合。</div></section>`;
  }
  return `<section class="sub-page-section">
    <div class="sub-page-section-title"><span>${icon('sparkles')} ${getSmartRecipeSupplementTitle(date,mealStatus)}</span><button type="button" class="ds-chip ds-chip--sm" id="smartRecipeRefreshSuppBtn">换一批</button></div>
    <div class="sr-supp-list">${state.suggestions.map(suggestion=>`
      <div class="sr-supp-card">
        <div class="sr-supp-head">
          <div class="sr-supp-title">${escapeHTML(suggestion.items.map(item=>item.name).join(' + '))}</div>
          <div class="sr-supp-prep">${escapeHTML(suggestion.prepLabel)}</div>
        </div>
        <div class="sr-supp-serving">${escapeHTML(suggestion.items.map(item=>`${item.portionLabel}`).join(' + '))}</div>
        <div class="sr-supp-metrics">
          <span>约 ${Math.round(suggestion.calories)} kcal</span>
          <span>蛋白质 ${Math.round(suggestion.protein)}g</span>
          <span>碳水 ${Math.round(suggestion.carbs)}g</span>
          <span>脂肪 ${Math.round(suggestion.fat)}g</span>
        </div>
        <div class="sr-supp-tags">${getSmartRecipeSupplementBadges(suggestion,state.gaps).map(tag=>`<span class="sr-supp-tag">${escapeHTML(tag)}</span>`).join('')}</div>
        <div class="sr-supp-reason">${escapeHTML(suggestion.reason)}</div>
      </div>`).join('')}</div>
    ${state.preferences.allergies.length||state.preferences.dislikes.length?'<div class="sr-supp-note">已避开你的过敏原和忌口设置。</div>':''}
  </section>`;
}
function renderSmartRecipeTabSeg(activeTab){
  const tabs=[
    {id:'today',label:'今日推荐'},
    {id:'ingredients',label:'拍食材'},
    {id:'search',label:'搜菜品'},
    {id:'favorites',label:'收藏'}
  ];
  return `<div class="meal-seg sr-tab-seg" id="smartRecipeTabSeg">`+
    tabs.map(t=>`<button type="button" class="meal-seg-btn${t.id===activeTab?' active':''}" data-sr-tab="${t.id}">${t.label}</button>`).join('')+
    `</div>`;
}
function renderSmartRecipeTodayPanel(profile,date,snap,cs){
  if(!profile||!snap||!cs) return '';
  const goal=getHealthGoal(profile);
  const mealStatus=getSmartRecipeMealStatus(profile,date);
  const supplementState=getSmartRecipeSupplementState(profile,date,snap,cs);
  const currentMeal=getSmartRecipeCurrentMeal();
  const mealLabel=MEAL_LABELS[currentMeal]||'这顿';
  let recommendations=[];
  try{recommendations=buildSmartRecipeRecommendations(profile,date,snap,cs)}
  catch(err){console.error('[Render] buildSmartRecipeRecommendations failed:',err);recommendations=[]}
  const pick=getSmartRecipeRecommendationPick(recommendations);
  const remaining=cs.hasTarget?Math.max(0,Math.round(cs.intakeRemainingKcal||0)):'—';
  const emptyTitle=cs.hasTarget&&Number(cs.intakeRemainingKcal||0)<=0?'今天的热量空间已经用完':'当前偏好下暂时没有合适的本地菜谱';
  const emptyDesc=cs.hasTarget&&Number(cs.intakeRemainingKcal||0)<=0?'不建议为了凑一餐继续加码。可以先看看加餐，或明天再调整正餐。':'试试放宽忌口、做饭省事程度，或先记录一餐后再来看推荐。';
  const linkCtx=smartRecipeContext||getSmartRecipeLinkContext(profile,date,snap,cs);
  const contextHint=linkCtx?.mode==='protein-gap'?'优先看高蛋白推荐':(linkCtx?.mode==='nutrition-gap'?'优先看适合补营养缺口的推荐':'');
  const contextBanner=linkCtx?.hint?`<div class="sr-goal-pill" style="margin-bottom:10px">${icon('target')} 来自今日建议 · ${escapeHTML(linkCtx.hint)}${contextHint?` · ${escapeHTML(contextHint)}`:''}</div>`:'';
  return `
    <section class="sub-page-section">
      <div class="sub-page-section-title">${icon('sparkles')} 今日推荐</div>
      ${contextBanner}
      <div class="sr-goal-pill">${icon('target')} 围绕「${escapeHTML(goal.title||'健康目标')}」 · 现在是${escapeHTML(mealLabel)}</div>
      <div class="sr-core-card">
        <div class="sr-core-title">这顿可以这样吃</div>
        <div class="sr-core-desc">今天还可以吃</div>
        <div class="sr-cal-hero">${remaining}<small>kcal</small></div>
      </div>
      ${pick?renderSmartRecipeRecommendationCard(pick,recommendations.length,{source:'today',swap:true}):`<div class="empty-state"><div class="empty-state__title">${escapeHTML(emptyTitle)}</div><div class="empty-state__desc">${escapeHTML(emptyDesc)}</div></div>`}
    </section>
    <section class="sub-page-section">
      <div class="sub-page-section-title">${icon('clock')} 今日餐次</div>
      <div class="sr-meal-list">${mealStatus.map(m=>`
        <div class="sr-meal-row"><span class="sr-meal-main"><span class="sr-meal-indicator${m.recorded?' done':''}">${m.recorded?'✓':'○'}</span><span class="sr-meal-name">${escapeHTML(m.label)}</span></span><span class="sr-meal-status${m.recorded?' done':''}">${escapeHTML(m.status)}</span>${m.foodsPreview?`<div class="sr-meal-foods">${escapeHTML(m.foodsPreview)}</div>`:''}</div>`).join('')}</div>
    </section>
    ${renderSmartRecipeSupplementSection(supplementState,date,mealStatus)}`;
}
function renderSmartRecipeIngredientsPanel(){
  const photo=smartRecipeIngredientPhoto;
  const ingredients=smartRecipeIdentifiedIngredients;
  const recipe=smartRecipeIngredientResult?normalizeSmartRecipeForUI(smartRecipeIngredientResult,'ingredients'):null;
  let body='';
  if(smartRecipeIngredientLoading){
    body=`<div class="sr-status">${photo?'正在识别食材…':'正在根据食材生成菜谱…'}</div>`;
  }else if(recipe){
    body=renderSmartRecipeRecommendationCard(recipe,1,{source:'ingredients',swap:false,regenerate:true});
  }else if(ingredients.length){
    body=`<div class="sr-recipe-reason">确认一下识别到的食材，不需要的可以删掉。</div>
      <div class="sr-ing-chips">${ingredients.map((item,idx)=>`<span class="ds-chip ds-chip--sm sr-ing-chip">${escapeHTML(item.name)}${item.amount?` ${escapeHTML(String(item.amount)+item.unit)}`:''}<button type="button" data-sr-ing-del="${idx}" aria-label="删除食材">×</button></span>`).join('')}</div>
      <div class="sr-prefs-add" style="margin-top:12px"><input type="text" id="srIngredientCustom" placeholder="补充食材，如：鸡蛋"><button type="button" class="btn btn-ghost btn-sm" id="srIngredientAddBtn">添加</button></div>
      ${smartRecipeIngredientError?`<div class="sr-status">${escapeHTML(smartRecipeIngredientError)}</div>`:''}
      <button type="button" class="da-action-btn" id="srGenerateFromIngredientsBtn">${icon('sparkles')} 生成菜谱</button>`;
  }else{
    body=`<div class="empty-state">
        <div class="empty-state__title">拍下家里现有的食材</div>
        <div class="empty-state__desc">拍下家里现有的食材，帮你看看能做什么。</div>
        <div class="sr-photo-actions">
          <button type="button" class="ds-chip" id="srIngredientCameraBtn">${icon('camera')} 拍照</button>
          <button type="button" class="ds-chip" id="srIngredientGalleryBtn">${icon('image')} 从相册选择</button>
        </div>
        <input type="file" id="srIngredientCamera" class="photo-input-native" accept="image/*" capture="environment" aria-label="拍照食材">
        <input type="file" id="srIngredientGallery" class="photo-input-native" accept="image/*" aria-label="从相册选择食材">
        ${photo?`<img src="${photo}" alt="食材照片" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-top:12px">`:''}
        ${smartRecipeIngredientError?`<div class="sr-status">${escapeHTML(smartRecipeIngredientError)}</div>`:'<div class="sub-page-empty" style="margin-top:12px">会先识别食材，由你确认后再推荐菜品。</div>'}
      </div>`;
  }
  return `<section class="sub-page-section">${body}</section>`;
}
function renderSmartRecipeSearchPanel(){
  const recipe=smartRecipeSearchResult?normalizeSmartRecipeForUI(smartRecipeSearchResult,'search'):null;
  return `
    <section class="sub-page-section">
      <input type="search" class="sr-search-input" id="smartRecipeSearchInput" placeholder="搜索菜名、食材或条件" autocomplete="off" enterkeyhint="search" value="${escapeHTML(smartRecipeSearchQuery)}">
      <div class="sr-search-hint">例如：番茄牛腩、高蛋白早餐、空气炸锅鸡胸、快手早餐</div>
      <button type="button" class="da-action-btn" id="smartRecipeSearchBtn">${icon('sparkles')} 搜索菜谱</button>
      ${smartRecipeSearchLoading?'<div class="sr-status">正在根据你的目标和偏好生成菜谱…</div>':''}
      ${!smartRecipeSearchLoading&&smartRecipeSearchError?`<div class="sr-status">${escapeHTML(smartRecipeSearchError)}</div>`:''}
      ${!smartRecipeSearchLoading&&recipe?renderSmartRecipeRecommendationCard(recipe,1,{source:'search',swap:false,regenerate:true}):''}
      ${!smartRecipeSearchLoading&&!recipe&&!smartRecipeSearchError?'<div class="sub-page-empty" id="smartRecipeSearchNotice" style="margin-top:14px">输入菜名或条件后，才会调用 AI 生成菜谱。</div>':''}
    </section>`;
}
function renderSmartRecipePage(profile,date=currentViewDate){
  const wrap=document.getElementById('subPage_smart_recipe');
  if(!wrap||!profile) return;
  const tab=['today','ingredients','search','favorites'].includes(smartRecipeActiveTab)?smartRecipeActiveTab:'today';
  const snap=getHealthScoreData(profile,date);
  const cs=getDailyCalorieStatus(profile,date);
  let body='';
  if(tab==='today') body=renderSmartRecipeTodayPanel(profile,date,snap,cs);
  else if(tab==='ingredients') body=renderSmartRecipeIngredientsPanel();
  else if(tab==='favorites') body=renderSmartRecipeFavoriteTab(profile);
  else body=renderSmartRecipeSearchPanel();
  wrap.innerHTML=_subPageHeader('智能食谱','',{backPage:'health',backLabel:'返回健康页',rightAction:'openSmartRecipePrefsModal()',rightActionHTML:icon('settings'),rightActionAriaLabel:'饮食偏好设置'})+
    `<div class="sub-page-content">`+
    renderSmartRecipeTabSeg(tab)+
    body+
    `</div>`;
  renderIcons(wrap);
  bindSmartRecipePage();
}
function getSmartRecipeResultBySource(source){
  if(source==='search') return smartRecipeSearchResult?normalizeSmartRecipeForUI(smartRecipeSearchResult,'search'):null;
  if(source==='ingredients') return smartRecipeIngredientResult?normalizeSmartRecipeForUI(smartRecipeIngredientResult,'ingredients'):null;
  const p=getActiveProfile();
  if(!p) return null;
  try{
    const pick=getSmartRecipeRecommendationPick(buildSmartRecipeRecommendations(p,currentViewDate));
    return pick?normalizeSmartRecipeForUI(pick,'local'):null;
  }catch(e){
    return null;
  }
}
function rerenderSmartRecipeUI(){
  const p=getActiveProfile();
  if(!p) return;
  if(activeAppPage==='smart-recipe-detail') renderSmartRecipeDetailPage(p,currentViewDate);
  else if(activeAppPage==='smart-recipe') renderSmartRecipePage(p,currentViewDate);
}
function renderSmartRecipeDetailPage(profile,date=currentViewDate){
  const wrap=document.getElementById('subPage_smart_recipe_detail');
  if(!wrap) return;
  const recipe=resolveSmartRecipeDetailRecipe();
  const state=smartRecipeDetailState||{};
  const source=state.source||'today';
  if(!recipe){
    wrap.innerHTML=`<div class="sub-page-header">`+
      `<button class="sub-page-back" type="button" aria-label="返回" onclick="closeSmartRecipeDetail()">${icon('arrow-left')}</button>`+
      `<span class="sub-page-title">菜谱详情</span></div>`+
      `<div class="sub-page-content"><div class="empty-state"><div class="empty-state__title">菜谱不存在或已失效</div><div class="empty-state__desc">可能已被删除或来源已变化，请返回重新选择。</div></div></div>`;
    renderIcons(wrap);
    return;
  }
  const mealLabel=MEAL_LABELS[recipe.mealType]||'这顿';
  const cookLabel=recipe.noCook||(Number(recipe.cookTime)||0)<=0?'无需准备':`${recipe.cookTime}分钟`;
  const fav=profile?isFavoriteRecipe(profile,recipe):false;
  const reasons=profile&&source==='today'?buildSmartRecipeRecommendationReasons(recipe,profile,date):[recipe.reason].filter(Boolean);
  const ingItems=(recipe.ingredients||[]).map(item=>{
    if(typeof item==='string') return item;
    const amount=item.amount==null||item.amount===''?'':`${item.amount}${item.unit||''}`;
    return amount?`${item.name} ${amount}`:item.name;
  }).filter(Boolean);
  wrap.innerHTML=`<div class="sub-page-header">`+
    `<button class="sub-page-back" type="button" aria-label="返回" onclick="closeSmartRecipeDetail()">${icon('arrow-left')}</button>`+
    `<span class="sub-page-title">菜谱详情</span></div>`+
    `<div class="sub-page-content">`+
    `<section class="sub-page-section">`+
    `<div class="sr-detail-title">${escapeHTML(recipe.title)}</div>`+
    `<div class="sr-recipe-meta" style="margin-top:8px">`+
    `<span class="ds-chip ds-chip--sm active">${escapeHTML(mealLabel)}</span>`+
    `<span class="ds-chip ds-chip--sm">${escapeHTML(cookLabel)}</span>`+
    `<span class="ds-chip ds-chip--sm">${escapeHTML(recipe.difficulty||'简单')}</span>`+
    `</div></section>`+
    `<section class="sub-page-section"><div class="sub-page-section-title">${icon('flame')} 营养</div>`+
    `<div class="sr-detail-nutri-grid">`+
    `<div class="sr-detail-nutri-item"><div class="sr-detail-nutri-label">热量</div><div class="sr-detail-nutri-val">${Math.round(recipe.calories||0)}<span class="unit">kcal</span></div></div>`+
    `<div class="sr-detail-nutri-item"><div class="sr-detail-nutri-label">蛋白质</div><div class="sr-detail-nutri-val">${Math.round(recipe.protein||0)}<span class="unit">g</span></div></div>`+
    `<div class="sr-detail-nutri-item"><div class="sr-detail-nutri-label">碳水</div><div class="sr-detail-nutri-val">${Math.round(recipe.carbs||0)}<span class="unit">g</span></div></div>`+
    `<div class="sr-detail-nutri-item"><div class="sr-detail-nutri-label">脂肪</div><div class="sr-detail-nutri-val">${Math.round(recipe.fat||0)}<span class="unit">g</span></div></div>`+
    `<div class="sr-detail-nutri-item"><div class="sr-detail-nutri-label">纤维</div><div class="sr-detail-nutri-val">${Math.round(recipe.fiber||0)}<span class="unit">g</span></div></div>`+
    `</div></section>`+
    (ingItems.length?`<section class="sub-page-section"><div class="sub-page-section-title">${icon('list')} 食材</div><ul class="sr-detail-list">${ingItems.map(name=>`<li>${escapeHTML(name)}</li>`).join('')}</ul></section>`:'')+
    ((recipe.steps||[]).length?`<section class="sub-page-section"><div class="sub-page-section-title">${icon('book-open')} 制作步骤</div><ol class="sr-detail-steps">${recipe.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol></section>`:'')+
    (reasons.length?`<section class="sub-page-section"><div class="sub-page-section-title">${icon('sparkles')} 推荐原因</div><div class="sr-reason-list">${reasons.map(r=>`<div class="sr-reason-item">${escapeHTML(r)}</div>`).join('')}</div></section>`:'')+
    (recipe.adjustment?`<section class="sub-page-section"><div class="sub-page-section-title">${icon('lightbulb')} 调整建议</div><div class="sr-detail-note">${escapeHTML(recipe.adjustment)}</div></section>`:'')+
    `<section class="sub-page-section"><div class="sr-detail-actions">`+
    `<button type="button" class="da-action-btn" id="srDetailRecordBtn">${icon('utensils')} 记录这餐</button>`+
    `<button type="button" class="da-action-btn ghost" id="srDetailFavBtn">${fav?'已收藏':'收藏'}</button>`+
    `</div></section>`+
    `</div>`;
  renderIcons(wrap);
  bindSmartRecipeDetailPage(recipe,source);
}
function bindSmartRecipeDetailPage(recipe,source){
  document.getElementById('srDetailRecordBtn')?.addEventListener('click',()=>{
    if(!recipe) return;
    openFoodDraftFromRecipe(recipe);
  });
  document.getElementById('srDetailFavBtn')?.addEventListener('click',()=>{
    const p=getActiveProfile();
    if(!p||!recipe) return;
    const added=toggleFavoriteRecipe(p,recipe);
    showToast(added?'已收藏菜谱':'已取消收藏','success');
    if(!added&&source==='favorite'){
      closeSmartRecipeDetail();
      return;
    }
    rerenderSmartRecipeUI();
  });
}
async function requestSmartRecipeSearch(query,{force=false}={}){
  const p=getActiveProfile();
  if(!p) return null;
  const q=String(query||'').trim();
  if(!q) throw new Error('请输入要搜索的菜品或条件');
  if(!force){
    const cached=readSmartRecipeAICache(p,currentViewDate,'search',q);
    if(cached) return normalizeSmartRecipeForUI(cached,'search');
  }
  const response=await fetch(getApiUrl('/api/recipe-search'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      query:q,
      healthContext:getSmartRecipeHealthContext(p,currentViewDate),
      preferences:getRecipePreferences(p)
    })
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.error||data.message||'菜谱搜索失败');
  const recipe=normalizeSmartRecipeForUI(data,'search');
  if(!recipe) throw new Error('菜谱结果不完整');
  writeSmartRecipeAICache(p,currentViewDate,'search',q,recipe);
  return recipe;
}
async function requestSmartRecipeIngredientsPhoto(image){
  const response=await fetch(getApiUrl('/api/recipe-ingredients-photo'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({image})
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.error||data.message||'食材识别失败');
  const ingredients=Array.isArray(data.ingredients)?data.ingredients:[];
  if(!ingredients.length) throw new Error('没有识别到可用食材');
  return ingredients.map(item=>({
    name:String(item.name||item.food||'').trim(),
    amount:item.amount??'',
    unit:String(item.unit||'')
  })).filter(item=>item.name);
}
async function requestSmartRecipeFromIngredients(ingredients,{force=false}={}){
  const p=getActiveProfile();
  if(!p) return null;
  const list=(ingredients||[]).map(item=>({
    name:String(item.name||'').trim(),
    amount:item.amount??'',
    unit:String(item.unit||'')
  })).filter(item=>item.name);
  if(!list.length) throw new Error('请先确认食材');
  const inputKey=list.map(item=>item.name).sort().join('+');
  if(!force){
    const cached=readSmartRecipeAICache(p,currentViewDate,'ingredients',inputKey);
    if(cached) return normalizeSmartRecipeForUI(cached,'ingredients');
  }
  const response=await fetch(getApiUrl('/api/recipe-from-ingredients'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      ingredients:list,
      healthContext:getSmartRecipeHealthContext(p,currentViewDate),
      preferences:getRecipePreferences(p)
    })
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.error||data.message||'根据食材生成菜谱失败');
  const recipe=normalizeSmartRecipeForUI(data,'ingredients');
  if(!recipe) throw new Error('菜谱结果不完整');
  writeSmartRecipeAICache(p,currentViewDate,'ingredients',inputKey,recipe);
  return recipe;
}
async function handleSmartRecipeSearch({force=false}={}){
  const input=document.getElementById('smartRecipeSearchInput');
  const query=String(input?.value||smartRecipeSearchQuery||'').trim();
  smartRecipeSearchQuery=query;
  if(!query){
    showToast('请输入要搜索的菜品或条件','info');
    return;
  }
  smartRecipeSearchLoading=true;
  smartRecipeSearchError='';
  renderSmartRecipePage(getActiveProfile(),currentViewDate);
  try{
    smartRecipeSearchResult=await requestSmartRecipeSearch(query,{force});
  }catch(err){
    smartRecipeSearchResult=null;
    smartRecipeSearchError=err?.message||'菜谱搜索失败';
  }finally{
    smartRecipeSearchLoading=false;
    renderSmartRecipePage(getActiveProfile(),currentViewDate);
  }
}
async function handleSmartRecipeIngredientFile(file){
  if(!file) return;
  smartRecipeIngredientLoading=true;
  smartRecipeIngredientError='';
  smartRecipeIngredientResult=null;
  smartRecipeIdentifiedIngredients=[];
  smartRecipeIngredientPhase='recognizing';
  renderSmartRecipePage(getActiveProfile(),currentViewDate);
  try{
    const compressed=await compressFoodImage(file);
    smartRecipeIngredientPhoto=compressed.url;
    smartRecipeIdentifiedIngredients=await requestSmartRecipeIngredientsPhoto(compressed.url);
    smartRecipeIngredientPhase='confirm';
  }catch(err){
    smartRecipeIngredientError=err?.message||'食材识别失败';
    smartRecipeIngredientPhase='idle';
  }finally{
    smartRecipeIngredientLoading=false;
    renderSmartRecipePage(getActiveProfile(),currentViewDate);
  }
}
async function handleSmartRecipeGenerateFromIngredients({force=false}={}){
  if(!smartRecipeIdentifiedIngredients.length){
    showToast('请先确认食材','info');
    return;
  }
  smartRecipeIngredientLoading=true;
  smartRecipeIngredientError='';
  smartRecipeIngredientPhase='generating';
  renderSmartRecipePage(getActiveProfile(),currentViewDate);
  try{
    smartRecipeIngredientResult=await requestSmartRecipeFromIngredients(smartRecipeIdentifiedIngredients,{force});
    smartRecipeIngredientPhase='result';
  }catch(err){
    smartRecipeIngredientResult=null;
    smartRecipeIngredientError=err?.message||'生成菜谱失败';
    smartRecipeIngredientPhase='confirm';
  }finally{
    smartRecipeIngredientLoading=false;
    renderSmartRecipePage(getActiveProfile(),currentViewDate);
  }
}
function bindSmartRecipeRecipeActions(){
  document.querySelectorAll('[data-sr-record]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const source=btn.dataset.srRecord||'today';
      const recipe=getSmartRecipeResultBySource(source);
      if(!recipe) return showToast('暂无可记录的菜谱','info');
      openFoodDraftFromRecipe(recipe);
    });
  });
  document.querySelectorAll('[data-sr-detail]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const source=btn.dataset.srDetail||'today';
      const recipe=getSmartRecipeResultBySource(source);
      if(!recipe) return showToast('暂无可查看的菜谱','info');
      openSmartRecipeDetail(recipe,{source,returnTab:smartRecipeActiveTab});
    });
  });
  document.querySelectorAll('[data-sr-fav]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const p=getActiveProfile();
      const recipe=getSmartRecipeResultBySource(btn.dataset.srFav||'today');
      if(!p||!recipe) return;
      const added=toggleFavoriteRecipe(p,recipe);
      showToast(added?'已收藏菜谱':'已取消收藏','success');
      rerenderSmartRecipeUI();
    });
  });
  document.querySelectorAll('[data-sr-regen]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const source=btn.dataset.srRegen;
      if(source==='search') handleSmartRecipeSearch({force:true});
      else if(source==='ingredients') handleSmartRecipeGenerateFromIngredients({force:true});
    });
  });
  document.querySelectorAll('[data-sr-fav-detail]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const p=getActiveProfile();
      if(!p) return;
      const raw=(p.favoriteRecipes||[]).find(item=>item.id===btn.dataset.srFavDetail);
      const recipe=raw?normalizeFavoriteRecipe(raw):null;
      if(!recipe) return;
      openSmartRecipeDetail(recipe,{source:'favorite',returnTab:'favorites'});
    });
  });
  document.querySelectorAll('[data-sr-fav-remove]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const p=getActiveProfile();
      if(!p) return;
      const raw=(p.favoriteRecipes||[]).find(item=>item.id===btn.dataset.srFavRemove);
      if(!raw) return;
      toggleFavoriteRecipe(p,normalizeFavoriteRecipe(raw));
      showToast('已取消收藏','success');
      rerenderSmartRecipeUI();
    });
  });
}
function bindSmartRecipePage(){
  document.getElementById('smartRecipeTabSeg')?.querySelectorAll('[data-sr-tab]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      smartRecipeActiveTab=btn.dataset.srTab||'today';
      renderSmartRecipePage(getActiveProfile(),currentViewDate);
    });
  });
  document.getElementById('smartRecipeSearchInput')?.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      e.preventDefault();
      handleSmartRecipeSearch();
    }
  });
  document.getElementById('smartRecipeSearchBtn')?.addEventListener('click',()=>handleSmartRecipeSearch());
  document.getElementById('smartRecipeRefreshSuppBtn')?.addEventListener('click',()=>{
    smartRecipeSupplementShuffle+=1;
    renderSmartRecipePage(getActiveProfile(),currentViewDate);
  });
  document.getElementById('smartRecipeSwapBtn')?.addEventListener('click',()=>{
    const p=getActiveProfile();
    if(!p) return;
    let recs=[];
    try{recs=buildSmartRecipeRecommendations(p,currentViewDate)}
    catch(err){console.error('[Render] smartRecipeSwap failed:',err);return}
    if(recs.length<=1){
      showToast(recs.length?'暂时只有这一道合适的本地菜谱':'暂时没有合适的本地菜谱','info');
      return;
    }
    smartRecipePickIndex+=1;
    renderSmartRecipePage(p,currentViewDate);
  });
  document.getElementById('srIngredientCameraBtn')?.addEventListener('click',()=>document.getElementById('srIngredientCamera')?.click());
  document.getElementById('srIngredientGalleryBtn')?.addEventListener('click',()=>document.getElementById('srIngredientGallery')?.click());
  document.getElementById('srIngredientCamera')?.addEventListener('change',e=>{
    const file=e.target.files?.[0];
    e.target.value='';
    handleSmartRecipeIngredientFile(file);
  });
  document.getElementById('srIngredientGallery')?.addEventListener('change',e=>{
    const file=e.target.files?.[0];
    e.target.value='';
    handleSmartRecipeIngredientFile(file);
  });
  document.getElementById('srIngredientAddBtn')?.addEventListener('click',()=>{
    const input=document.getElementById('srIngredientCustom');
    const name=String(input?.value||'').trim();
    if(!name) return;
    smartRecipeIdentifiedIngredients.push({name,amount:'',unit:''});
    if(input) input.value='';
    renderSmartRecipePage(getActiveProfile(),currentViewDate);
  });
  document.querySelectorAll('[data-sr-ing-del]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const idx=Number(btn.dataset.srIngDel);
      if(!Number.isFinite(idx)) return;
      smartRecipeIdentifiedIngredients.splice(idx,1);
      renderSmartRecipePage(getActiveProfile(),currentViewDate);
    });
  });
  document.getElementById('srGenerateFromIngredientsBtn')?.addEventListener('click',()=>handleSmartRecipeGenerateFromIngredients());
  bindSmartRecipeRecipeActions();
}
function openSmartRecipePrefsModal(){
  const p=getActiveProfile();
  if(!p) return;
  smartRecipePrefsAddField=null;
  smartRecipePrefsDraft=JSON.parse(JSON.stringify(getRecipePreferences(p)));
  renderSmartRecipePrefsModal();
  const modal=document.getElementById('smartRecipePrefsModal');
  modal?.classList.add('show');
  if(typeof GlassScrollLock!=='undefined') GlassScrollLock.lock('modal:smartRecipePrefsModal');
  renderIcons(modal);
}
window.openSmartRecipePrefsModal=openSmartRecipePrefsModal;
function closeSmartRecipePrefsModal(){
  document.getElementById('smartRecipePrefsModal')?.classList.remove('show');
  if(typeof GlassScrollLock!=='undefined') GlassScrollLock.unlock('modal:smartRecipePrefsModal');
  smartRecipePrefsDraft=null;
  smartRecipePrefsAddField=null;
}
function addSmartRecipePrefListItem(field,value){
  const draft=smartRecipePrefsDraft;
  const val=String(value||'').trim();
  if(!draft||!field||!val) return false;
  const list=Array.isArray(draft[field])?[...draft[field]]:[];
  if(list.includes(val)) return false;
  draft[field]=[...list,val];
  return true;
}
function commitSmartRecipePrefCustom(field){
  const inputId=field==='allergies'?'srAllergyCustom':'srDislikeCustom';
  const input=document.getElementById(inputId);
  const val=input?.value.trim();
  if(val) addSmartRecipePrefListItem(field,val);
  smartRecipePrefsAddField=null;
  renderSmartRecipePrefsModal();
}
function renderSmartRecipePrefsModal(){
  const wrap=document.getElementById('smartRecipePrefsContent');
  const draft=smartRecipePrefsDraft||normalizeRecipePreferences({});
  if(!wrap) return;
  const chip=(list,field)=>list.map(item=>{
    const active=(draft[field]||[]).includes(item);
    return `<button type="button" class="ds-chip ds-chip--sm${active?' active':''}" data-sr-pref-toggle="${field}" data-sr-pref-value="${escapeHTML(item)}">${escapeHTML(item)}</button>`;
  }).join('');
  const segBtn=(options,field)=>{
    const cur=draft[field];
    return options.map(o=>`<button type="button" class="td-filter-btn${o.id===cur?' active':''}" data-sr-pref-field="${field}" data-sr-pref-id="${o.id}">${escapeHTML(o.label)}</button>`).join('');
  };
  const customAllergies=(draft.allergies||[]).filter(a=>!SMART_RECIPE_ALLERGY_PRESETS.includes(a));
  const allergyAddBlock=smartRecipePrefsAddField==='allergies'
    ? `<div class="sr-prefs-add-input-wrap"><input type="text" id="srAllergyCustom" class="sr-prefs-add-input" placeholder="输入过敏原，如：芝麻" autocomplete="off" enterkeyhint="done"></div>`
    : `<button type="button" class="sr-prefs-add-entry" id="srAllergyAddEntry">+ 添加其他过敏原</button>`;
  const dislikeAddBlock=smartRecipePrefsAddField==='dislikes'
    ? `<div class="sr-prefs-add-input-wrap"><input type="text" id="srDislikeCustom" class="sr-prefs-add-input" placeholder="输入不喜欢的食物，如：香菜" autocomplete="off" enterkeyhint="done"></div>`
    : `<button type="button" class="sr-prefs-add-entry" id="srDislikeAddEntry">+ 添加不喜欢的食物</button>`;
  wrap.innerHTML=`
    <div class="sr-prefs-section">
      <div class="sr-prefs-label hard">过敏原</div>
      <div class="sr-prefs-chips">${chip(SMART_RECIPE_ALLERGY_PRESETS,'allergies')}${chip(customAllergies,'allergies')}</div>
      ${allergyAddBlock}
    </div>
    <div class="sr-prefs-section">
      <div class="sr-prefs-label soft">不喜欢</div>
      <div class="sr-prefs-chips" id="srDislikeChips">${chip(draft.dislikes||[],'dislikes')}</div>
      ${dislikeAddBlock}
    </div>
    <div class="sr-prefs-section">
      <div class="sr-prefs-label">饮食风格</div>
      <div class="sr-prefs-seg">${segBtn(SMART_RECIPE_DIET_STYLES,'dietStyle')}</div>
    </div>
    <div class="sr-prefs-section">
      <div class="sr-prefs-label">省事程度</div>
      <div class="sr-prefs-seg">${segBtn(SMART_RECIPE_EFFORT_OPTIONS,'cookingEffort')}</div>
    </div>
    <div class="sr-prefs-section">
      <div class="sr-prefs-label">厨房设备</div>
      <div class="sr-prefs-chips">${chip(SMART_RECIPE_APPLIANCE_OPTIONS,'kitchenAppliances')}</div>
    </div>
    <div class="sr-prefs-section">
      <div class="sr-prefs-label">餐次习惯</div>
      <div class="sr-prefs-seg">${segBtn(SMART_RECIPE_MEAL_PATTERN_OPTIONS,'mealPattern')}</div>
    </div>`;
  renderIcons(wrap);
  bindSmartRecipePrefsModal();
  if(smartRecipePrefsAddField==='allergies'){
    requestAnimationFrame(()=>document.getElementById('srAllergyCustom')?.focus());
  }else if(smartRecipePrefsAddField==='dislikes'){
    requestAnimationFrame(()=>document.getElementById('srDislikeCustom')?.focus());
  }
}
function bindSmartRecipePrefsModal(){
  const draft=smartRecipePrefsDraft;
  if(!draft) return;
  document.querySelectorAll('[data-sr-pref-toggle]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const field=btn.dataset.srPrefToggle;
      const value=btn.dataset.srPrefValue;
      if(!field||!value) return;
      const list=Array.isArray(draft[field])?[...draft[field]]:[];
      const idx=list.indexOf(value);
      if(idx>=0) list.splice(idx,1); else list.push(value);
      draft[field]=list;
      renderSmartRecipePrefsModal();
    });
  });
  document.querySelectorAll('[data-sr-pref-field]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const field=btn.dataset.srPrefField;
      const id=btn.dataset.srPrefId;
      if(!field||!id) return;
      draft[field]=id;
      if(field==='cookingEffort'){
        const opt=SMART_RECIPE_EFFORT_OPTIONS.find(o=>o.id===id);
        if(opt) draft.maxCookTime=opt.maxCookTime;
      }
      renderSmartRecipePrefsModal();
    });
  });
  document.getElementById('srAllergyAddEntry')?.addEventListener('click',()=>{
    smartRecipePrefsAddField='allergies';
    renderSmartRecipePrefsModal();
  });
  document.getElementById('srDislikeAddEntry')?.addEventListener('click',()=>{
    smartRecipePrefsAddField='dislikes';
    renderSmartRecipePrefsModal();
  });
  const bindCustomPrefInput=(inputId,field)=>{
    const input=document.getElementById(inputId);
    if(!input) return;
    input.addEventListener('keydown',e=>{
      if(e.key==='Enter'){
        e.preventDefault();
        commitSmartRecipePrefCustom(field);
      }else if(e.key==='Escape'){
        e.preventDefault();
        smartRecipePrefsAddField=null;
        renderSmartRecipePrefsModal();
      }
    });
    input.addEventListener('blur',()=>{
      window.setTimeout(()=>{
        if(smartRecipePrefsAddField!==field) return;
        const active=document.activeElement;
        if(active&&active.closest('#smartRecipePrefsModal')&&(active.id==='srAllergyCustom'||active.id==='srDislikeCustom')) return;
        commitSmartRecipePrefCustom(field);
      },0);
    });
  };
  bindCustomPrefInput('srAllergyCustom','allergies');
  bindCustomPrefInput('srDislikeCustom','dislikes');
  document.getElementById('smartRecipePrefsSave')?.addEventListener('click',saveSmartRecipePrefsFromModal);
  document.getElementById('smartRecipePrefsCancel')?.addEventListener('click',closeSmartRecipePrefsModal);
  document.getElementById('smartRecipePrefsClose')?.addEventListener('click',closeSmartRecipePrefsModal);
}
function saveSmartRecipePrefsFromModal(){
  const p=getActiveProfile();
  if(!p||!smartRecipePrefsDraft) return;
  setRecipePreferences(p,smartRecipePrefsDraft);
  saveData();
  smartRecipePickIndex=0;
  closeSmartRecipePrefsModal();
  showToast('饮食偏好已保存','success');
  if(activeAppPage==='smart-recipe') renderSmartRecipePage(p,currentViewDate);
}
function initSmartRecipePrefsModal(){
  document.getElementById('smartRecipePrefsModal')?.addEventListener('click',e=>{
    if(e.target.id==='smartRecipePrefsModal') closeSmartRecipePrefsModal();
  });
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

function renderHealthAnalysisPage(profile,date){
  const wrap=document.getElementById('subPage_health_analysis');
  if(!wrap||!profile) return;
  const snap=getHealthScoreData(profile,date);
  const score=snap.healthScore?.score;
  const cs=getDailyCalorieStatus(profile,date);
  const summary=buildTodayHealthAiSummary(profile,snap);
  const stepsTotal=(snap.daily.steps||[]).reduce((s,r)=>s+(Number(r.steps)||0),0);
  const stepGoal=8000;
  const label=score!==null&&score!==undefined?getHealthStatusLabel(score):{label:'数据不足',hint:'记录更多数据后可生成评分'};
  // Build good/warn lists from real data
  const goodList=[],warnList=[],actionList=[];
  if(snap.hasFood&&snap.dietPct>=80) goodList.push('饮食记录良好');
  if(snap.hasExercise&&snap.exercisePct>=80) goodList.push('运动量充足');
  if(snap.hasSleep&&snap.sleepPct>=80) goodList.push('睡眠时长达标');
  if(snap.hasWater&&snap.waterPct>=80) goodList.push('饮水充足');
  if(stepsTotal>=stepGoal) goodList.push('步数已达标');
  if(goodList.length===0&&snap.hasFood) goodList.push('已有健康记录，继续保持');
  if(cs.intakeOverTargetKcal>0) warnList.push(`热量超过动态目标 ${cs.intakeOverTargetKcal} kcal`);
  if(snap.hasWater&&snap.waterPct<60) warnList.push(`饮水不足，还差 ${Math.max(0,(snap.waterGoal||0)-snap.waterTotal)} ml`);
  if(snap.hasExercise&&snap.exercisePct<50) warnList.push('今日运动不足');
  if(stepsTotal>0&&stepsTotal<stepGoal) warnList.push(`步数还差 ${(stepGoal-stepsTotal).toLocaleString()} 步`);
  if(!snap.hasFood) warnList.push('尚未记录饮食');
  if(!snap.hasSleep) warnList.push('尚未记录睡眠');
  // Actions
  if(cs.intakeOverTargetKcal>0) actionList.push(`下一餐减少约 ${Math.min(500,cs.intakeOverTargetKcal)} kcal`);
  if(snap.hasWater&&snap.waterPct<80) actionList.push(`补充 ${Math.max(200,(snap.waterGoal||0)-snap.waterTotal)} ml 饮水`);
  if(stepsTotal>0&&stepsTotal<stepGoal) actionList.push(`再步行 ${Math.ceil((stepGoal-stepsTotal)/100)*5} 分钟`);
  if(!snap.hasExercise) actionList.push('安排 15-30 分钟运动');
  if(actionList.length===0) actionList.push('保持当前健康习惯');
  wrap.innerHTML=_subPageHeader('今日健康分析',date)+
    `<div class="sub-page-content">`+
    // A. Score
    `<section class="sub-page-section">`+
    `<div class="ha-score-wrap">`+
    `<div class="ha-score-ring"><div class="ha-score-num">${score??'--'}</div><div class="ha-score-label">今日健康评分</div></div>`+
    `<div class="ha-score-status" style="color:${score>=80?'var(--green)':score>=60?'var(--gold-l)':score>=30?'var(--amber)':'var(--txt3)'}">${label.label}</div>`+
    `</div>`+
    `<div class="ha-conclusion">${escapeHTML(summary.lead)}</div>`+
    `</section>`+
    // B. 4 Dimensions
    `<section class="sub-page-section">`+
    `<div class="sub-page-section-title">${icon('activity')} 今日4项健康维度</div>`+
    `<div class="ha-dim-grid">`+
    `<div class="ha-dim-card calorie"><div class="ha-dim-head">${icon('flame')}<span>热量</span></div>`+
    `<div class="ha-dim-val">${cs.intakeKcal}<span class="unit">kcal</span></div>`+
    `<div class="ha-dim-status">${cs.hasTarget?`动态目标 ${cs.dynamicCalorieTarget} kcal`:''}</div>`+
    `<div class="ha-dim-target">${cs.intakeOverTargetKcal>0?`超出 ${cs.intakeOverTargetKcal} kcal`:(cs.intakeRemainingKcal>0?`还可摄入 ${cs.intakeRemainingKcal} kcal`:'')}</div></div>`+
    `<div class="ha-dim-card diet"><div class="ha-dim-head">${icon('utensils')}<span>饮食</span></div>`+
    `<div class="ha-dim-val">${snap.dietPct}<span class="unit">分</span></div>`+
    `<div class="ha-dim-status">${snap.hasFood?'营养结构'+(snap.dietPct>=80?'良好':snap.dietPct>=60?'一般':'待改善'):'未记录'}</div>`+
    `<div class="ha-dim-target">蛋白质 ${Math.round(snap.intake.protein)}g</div></div>`+
    `<div class="ha-dim-card steps"><div class="ha-dim-head">${icon('footprints')}<span>步数</span></div>`+
    `<div class="ha-dim-val">${stepsTotal>0?stepsTotal.toLocaleString():'--'}<span class="unit">步</span></div>`+
    `<div class="ha-dim-status">${stepsTotal>0?(stepsTotal>=stepGoal?'已达标':`完成${Math.round(stepsTotal/stepGoal*100)}%`):'未记录'}</div>`+
    `<div class="ha-dim-target">目标 ${stepGoal.toLocaleString()} 步</div></div>`+
    `<div class="ha-dim-card sleep"><div class="ha-dim-head">${icon('moon')}<span>睡眠</span></div>`+
    `<div class="ha-dim-val">${snap.hasSleep?formatShortSleep(snap.sleepMinutes):'--'}<span class="unit"></span></div>`+
    `<div class="ha-dim-status">${snap.hasSleep?(snap.sleepPct>=80?'良好':snap.sleepPct>=60?'一般':'不足'):'未记录'}</div>`+
    `<div class="ha-dim-target">目标 ${formatShortSleep(snap.sleepTarget)}</div></div>`+
    `</div></section>`+
    // C. Good
    (goodList.length?`<section class="sub-page-section"><div class="sub-page-section-title">${icon('circle-check')} 今天做得好的地方</div><div class="ha-list">`+
    goodList.map(g=>`<div class="ha-list-item good">${icon('check')}<span>${escapeHTML(g)}</span></div>`).join('')+`</div></section>`:'')+
    // D. Warn
    (warnList.length?`<section class="sub-page-section"><div class="sub-page-section-title">${icon('alert-circle')} 今天需要注意</div><div class="ha-list">`+
    warnList.map(w=>`<div class="ha-list-item warn">${icon('alert-triangle')}<span>${escapeHTML(w)}</span></div>`).join('')+`</div></section>`:'')+
    // E. Actions
    `<section class="sub-page-section"><div class="sub-page-section-title">${icon('lightbulb')} 今日行动建议</div><div class="ha-action-list">`+
    actionList.slice(0,3).map(a=>`<div class="ha-action-item">${icon('chevron-right')}<span>${escapeHTML(a)}</span></div>`).join('')+`</div></section>`+
    `</div>`;
  renderIcons(wrap);
}

function renderDailyTasksPage(profile,date){
  const wrap=document.getElementById('subPage_daily_tasks');
  if(!wrap||!profile) return;
  const snap=getHealthScoreData(profile,date);
  const dayCache=getDailyTasksDayCache(profile,date);
  const aiTasks=Array.isArray(dayCache.tasks)?dayCache.tasks:[];
  // Build local task list from real data
  const tasks=[];
  const waterNeed=Math.max(0,(snap.waterGoal||0)-snap.waterTotal);
  tasks.push({id:'water',type:'water',icon:'droplets',name:waterNeed<=0?'饮水已完成':`还差 ${waterNeed} ml 饮水`,detail:waterNeed<=0?`已喝 ${snap.waterTotal}/${snap.waterGoal||0} ml`:`今日目标 ${(snap.waterGoal||0)} ml`,completed:waterNeed<=0,action:'water'});
  const stepsTotal=(snap.daily.steps||[]).reduce((s,r)=>s+(Number(r.steps)||0),0);
  const stepGoal=8000;
  const stepNeed=Math.max(0,stepGoal-stepsTotal);
  tasks.push({id:'steps',type:'steps',icon:'footprints',name:stepNeed<=0?'步数已达标':`还差 ${stepNeed.toLocaleString()} 步`,detail:stepNeed<=0?`今日 ${stepsTotal.toLocaleString()} 步`:`目标 ${stepGoal.toLocaleString()} 步`,completed:stepNeed<=0,action:'steps'});
  if(snap.targets?.protein){
    const proteinNeed=Math.max(0,snap.targets.protein-Math.round(snap.intake.protein||0));
    tasks.push({id:'protein',type:'food',icon:'egg',name:proteinNeed<=0?'蛋白质已达标':`蛋白质还差 ${proteinNeed}g`,detail:proteinNeed<=0?`已摄入 ${Math.round(snap.intake.protein)}g`:`目标 ${snap.targets.protein}g`,completed:proteinNeed<=0,action:'food'});
  }
  if(snap.exerciseTarget&&snap.exerciseMinutes<snap.exerciseTarget){
    tasks.push({id:'exercise',type:'exercise',icon:'activity',name:`运动还差 ${snap.exerciseTarget-snap.exerciseMinutes} 分钟`,detail:`目标 ${snap.exerciseTarget} 分钟`,completed:false,action:'exercise'});
  }else if(snap.exerciseMinutes>=snap.exerciseTarget&&snap.exerciseTarget>0){
    tasks.push({id:'exercise',type:'exercise',icon:'activity',name:'运动已完成',detail:`今日 ${snap.exerciseMinutes} 分钟`,completed:true,action:'exercise'});
  }
  const completed=tasks.filter(t=>t.completed).length;
  const total=tasks.length;
  const pct=total?clampPercent(completed/total*100):0;
  const pending=tasks.filter(t=>!t.completed);
  const done=tasks.filter(t=>t.completed);
  const taskIconMap={water:'droplets',food:'egg',steps:'footprints',exercise:'activity',sleep:'moon'};
  wrap.innerHTML=_subPageHeader('今日任务',date)+
    `<div class="sub-page-content">`+
    // A. Progress
    `<section class="sub-page-section"><div class="dt-progress-wrap">`+
    `<div class="dt-progress-text">${completed} / ${total} 完成</div>`+
    `<div class="dt-progress-bar"><div class="dt-progress-fill" style="width:${pct}%"></div></div>`+
    `</div></section>`+
    // B. Pending
    (pending.length?`<section class="sub-page-section"><div class="dt-section-label">待完成</div>`+
    pending.map(t=>`<div class="dt-task-card ${t.type}" style="margin-bottom:8px">`+
    `<div class="dt-task-head">${icon(taskIconMap[t.type]||'circle')}<span class="dt-task-name">${escapeHTML(t.name)}</span></div>`+
    `<div class="dt-task-detail">${escapeHTML(t.detail)}</div>`+
    `<button class="dt-task-btn" data-task-action="${t.action}">${t.action==='water'?'记录饮水':t.action==='food'?'记录饮食':t.action==='steps'?'去完成':t.action==='exercise'?'记录运动':'去记录'}</button>`+
    `</div>`).join('')+`</section>`:'')+
    // C. Completed
    (done.length?`<section class="sub-page-section"><div class="dt-section-label">已完成</div>`+
    done.map(t=>`<div class="dt-task-card completed ${t.type}" style="margin-bottom:8px">`+
    `<div class="dt-task-head">${icon('circle-check')}<span class="dt-task-name">${escapeHTML(t.name)}</span></div>`+
    `<div class="dt-task-detail">${escapeHTML(t.detail)}</div>`+
    `</div>`).join('')+`</section>`:'')+
    `</div>`;
  renderIcons(wrap);
  // Bind task buttons
  wrap.querySelectorAll('.dt-task-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      handleDailyTaskAction(btn.dataset.taskAction);
    });
  });
}

function renderDailyAdvicePage(profile,date){
  const wrap=document.getElementById('subPage_daily_advice');
  if(!wrap||!profile) return;
  const snap=getHealthScoreData(profile,date);
  const summary=buildTodayHealthAiSummary(profile,snap);
  const cs=getDailyCalorieStatus(profile,date);
  const dayCache=getHealthCoachDayCache(profile,date);
  const latest=getLatestHealthCoachAdvice(dayCache);
  const aiAdvice=latest?.advice;
  const useAiAdvice=!!(aiAdvice&&!aiAdvice.fallback);
  const aiSlot=latest?.slot||aiAdvice?.slot||'morning';

  // Build reason list (system-calculated data — always shown)
  const reasons=[];
  if(cs.hasFood){
    reasons.push({label:'今日摄入',value:`${cs.intakeKcal} kcal`});
    if(cs.hasTarget) reasons.push({label:'动态目标',value:`${cs.dynamicCalorieTarget} kcal`});
    if(cs.exerciseCalories>0) reasons.push({label:'基础 + 运动',value:`${cs.baseCalorieTarget} + ${cs.exerciseCalories} kcal`});
    if(cs.intakeOverTargetKcal>0) reasons.push({label:'超出',value:`${cs.intakeOverTargetKcal} kcal`});
    else if(cs.intakeRemainingKcal>0) reasons.push({label:'还可摄入',value:`${cs.intakeRemainingKcal} kcal`});
  }
  if(snap.hasWater){
    reasons.push({label:'今日饮水',value:`${snap.waterTotal} / ${snap.waterGoal||0} ml`});
  }
  if(snap.hasExercise){
    reasons.push({label:'今日运动',value:`${snap.exerciseMinutes} 分钟`});
  }
  const stepsTotal=(snap.daily.steps||[]).reduce((s,r)=>s+(Number(r.steps)||0),0);
  if(stepsTotal>0){
    reasons.push({label:'今日步数',value:`${stepsTotal.toLocaleString()} 步`});
  }

  let focusSection='';
  let dimensionSection='';
  let actionsSection='';

  if(useAiAdvice){
    const focusText=String(aiAdvice.summary||summary.advice||'保持稳定记录比追求单日完美更重要。').trim();
    focusSection=`<section class="sub-page-section"><div class="da-focus">${escapeHTML(focusText)}</div>`+
      `<div style="font-size:12px;color:var(--txt3);text-align:center;margin-top:8px">${escapeHTML(getHealthCoachSlotLabel(aiSlot))} · AI生成</div></section>`;
    dimensionSection=`<section class="sub-page-section"><div class="coach-advice-grid">`+
      `<div class="coach-advice-item"><b>饮食</b>${escapeHTML(aiAdvice.diet_advice||'')}</div>`+
      `<div class="coach-advice-item"><b>运动</b>${escapeHTML(aiAdvice.exercise_advice||'')}</div>`+
      `<div class="coach-advice-item"><b>饮水</b>${escapeHTML(aiAdvice.water_advice||'')}</div>`+
      `<div class="coach-advice-item"><b>睡眠</b>${escapeHTML(aiAdvice.sleep_advice||'')}</div>`+
      `</div></section>`;
    const planItems=(Array.isArray(aiAdvice.action_plan)?aiAdvice.action_plan:[])
      .slice(0,4)
      .map(item=>{
        if(typeof item==='string') return item.trim();
        if(item&&typeof item==='object') return String(item.task||item.title||'').trim();
        return '';
      })
      .filter(Boolean);
    if(planItems.length){
      actionsSection=`<section class="sub-page-section"><div class="sub-page-section-title">${icon('lightbulb')} 今天可以这样做</div><div class="da-action-list">`+
        planItems.map((a,i)=>`<div class="da-action-item"><span class="da-action-num">${i+1}</span><span>${escapeHTML(a)}</span></div>`).join('')+
        `</div></section>`;
    }
  }else{
    const focus=summary.advice||'保持稳定记录比追求单日完美更重要。';
    const focusShort=focus.split(/[，,。！？!?]/)[0].slice(0,20).trim();
    const actions=[];
    if(cs.intakeOverTargetKcal>0){
      actions.push('下一餐控制在 400-500 kcal');
      actions.push('优先蔬菜 + 瘦肉');
      actions.push('减少高油高糖食品');
    }
    if(snap.hasWater&&snap.waterPct<60){
      actions.push(`补充 ${Math.max(200,(snap.waterGoal||0)-snap.waterTotal)} ml 饮水`);
    }
    if(stepsTotal>0&&stepsTotal<8000){
      actions.push('饭后散步 15 分钟');
    }
    if(!snap.hasExercise){
      actions.push('安排 15-30 分钟运动');
    }
    if(actions.length===0) actions.push('保持当前健康习惯');
    focusSection=`<section class="sub-page-section"><div class="da-focus">${escapeHTML(focusShort)}</div>`+
      `<div style="font-size:13px;color:var(--txt2);line-height:1.7;margin-top:10px">${escapeHTML(summary.lead)}</div></section>`;
    actionsSection=`<section class="sub-page-section"><div class="sub-page-section-title">${icon('lightbulb')} 建议你这样做</div><div class="da-action-list">`+
      actions.slice(0,4).map((a,i)=>`<div class="da-action-item"><span class="da-action-num">${i+1}</span><span>${escapeHTML(a)}</span></div>`).join('')+
      `</div></section>`;
  }

  const reasonsSection=reasons.length?`<section class="sub-page-section"><div class="sub-page-section-title">${icon('chart')} 为什么会有这个建议</div><div class="da-reason-list">`+
    reasons.map(r=>`<div class="da-reason-item"><span class="da-reason-label">${escapeHTML(r.label)}</span><span class="da-reason-val">${escapeHTML(r.value)}</span></div>`).join('')+
    `</div></section>`:'';

  // Determine action button
  let actionBtn='';
  const smartRecipeLink=getSmartRecipeLinkContext(profile,date,snap,cs);
  if(smartRecipeLink){
    actionBtn=`<button type="button" class="da-action-btn" id="dailyAdviceSmartRecipeBtn">${icon('utensils')} 去智能食谱补充</button>`;
  }else if(cs.intakeOverTargetKcal>0||!snap.hasFood){
    actionBtn=`<button class="da-action-btn" data-task-action="food">${icon('utensils')} 记录饮食</button>`;
  }else if(snap.hasWater&&snap.waterPct<60){
    actionBtn=`<button class="da-action-btn" data-task-action="water">${icon('droplets')} 记录饮水</button>`;
  }else if(!snap.hasExercise){
    actionBtn=`<button class="da-action-btn" data-task-action="exercise">${icon('activity')} 记录运动</button>`;
  }

  wrap.innerHTML=_subPageHeader('今日建议',date)+
    `<div class="sub-page-content">`+
    focusSection+
    reasonsSection+
    dimensionSection+
    actionsSection+
    (actionBtn?`<section class="sub-page-section">${actionBtn}</section>`:'')+
    `</div>`;
  renderIcons(wrap);
  wrap.querySelectorAll('.da-action-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.id==='dailyAdviceSmartRecipeBtn'){
        const ctx=getSmartRecipeLinkContext(profile,date,snap,cs);
        openSmartRecipePage('today',ctx||{mode:'protein-gap'});
        return;
      }
      const action=btn.dataset.taskAction;
      if(window.openQuickAddPanel) window.openQuickAddPanel(action);
      else showToast('请使用底部+号新增记录','info');
    });
  });
}

function renderTrendDetailPage(profile,date){
  const wrap=document.getElementById('subPage_trend_detail');
  if(!wrap||!profile) return;
  const metrics=[
    {key:'weight',label:'体重',icon:'scale'},
    {key:'calories',label:'热量摄入',icon:'flame'},
    {key:'exercise',label:'运动消耗',icon:'activity'},
    {key:'sleep',label:'睡眠时长',icon:'moon'}
  ];
  const periods=[{label:'7天',val:7},{label:'30天',val:30},{label:'90天',val:90}];
  const m=metrics.find(x=>x.key===trendDetailMetric)||metrics[0];
  // Get trend data
  const dates=getRecentDateList(trendDetailPeriod,date);
  const vals=[],labels=[];
  dates.forEach(d=>{
    labels.push(formatDate(d));
    const snap=getHealthSnapshot(profile,d);
    if(m.key==='weight'){
      const wr=(profile.weightRecords||[]).filter(r=>getRecordDate(r)===d).sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
      vals.push(wr.length?wr[wr.length-1].weight:null);
    }else if(m.key==='calories'){
      vals.push(snap.hasFood?snap.intakeCalories:null);
    }else if(m.key==='exercise'){
      vals.push(snap.hasExercise?snap.exerciseMinutes:null);
    }else if(m.key==='sleep'){
      vals.push(snap.hasSleep?snap.sleepMinutes:null);
    }
  });
  const validVals=vals.filter(v=>v!==null&&v!==undefined);
  const avg=validVals.length?validVals.reduce((s,v)=>s+v,0)/validVals.length:null;
  const max=validVals.length?Math.max(...validVals):null;
  const min=validVals.length?Math.min(...validVals):null;
  const current=vals.filter(v=>v!==null).pop()||null;
  const fmtVal=(v,unit)=>{
    if(v===null||v===undefined) return '--';
    if(m.key==='weight') return v.toFixed(1)+'<span class="unit">kg</span>';
    if(m.key==='calories') return Math.round(v)+'<span class="unit">kcal</span>';
    if(m.key==='exercise') return Math.round(v)+'<span class="unit">min</span>';
    if(m.key==='sleep') return formatShortSleep(v);
    return v;
  };
  wrap.innerHTML=_subPageHeader('健康趋势',date)+
    `<div class="sub-page-content">`+
    // Time filter
    `<div class="td-filter-row">`+
    periods.map(p=>`<button class="td-filter-btn ${p.val===trendDetailPeriod?'active':''}" data-period="${p.val}">${p.label}</button>`).join('')+
    `</div>`+
    // Metric selector
    `<div class="td-metric-row">`+
    metrics.map(mt=>`<button class="td-metric-btn ${mt.key===trendDetailMetric?'active':''}" data-metric="${mt.key}">${icon(mt.icon)}${mt.label}</button>`).join('')+
    `</div>`+
    // Stats
    `<section class="sub-page-section"><div class="td-stats-grid">`+
    `<div class="td-stat-card"><div class="td-stat-label">当前</div><div class="td-stat-val">${fmtVal(current)}</div></div>`+
    `<div class="td-stat-card"><div class="td-stat-label">平均</div><div class="td-stat-val">${fmtVal(avg)}</div></div>`+
    `<div class="td-stat-card"><div class="td-stat-label">最高</div><div class="td-stat-val">${fmtVal(max)}</div></div>`+
    `<div class="td-stat-card"><div class="td-stat-label">最低</div><div class="td-stat-val">${fmtVal(min)}</div></div>`+
    `</div></section>`+
    // Chart
    `<section class="sub-page-section"><div class="sub-page-section-title">${icon(m.icon)} ${m.label}趋势</div><div class="td-chart-wrap"><canvas id="trendDetailCanvas"></canvas></div></section>`+
    `</div>`;
  renderIcons(wrap);
  // Bind filters
  wrap.querySelectorAll('.td-filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{trendDetailPeriod=Number(btn.dataset.period);renderTrendDetailPage(profile,date);});
  });
  wrap.querySelectorAll('.td-metric-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{trendDetailMetric=btn.dataset.metric;renderTrendDetailPage(profile,date);});
  });
  // Render chart
  if(typeof Chart==='undefined') return;
  if(trendDetailChart) trendDetailChart.destroy();
  const ctx=document.getElementById('trendDetailCanvas');
  if(!ctx) return;
  const chartData=vals.map(v=>v===null?null:v);
  trendDetailChart=new Chart(ctx,{
    type:'line',
    data:{labels,datasets:[{
      label:m.label,data:chartData,
      borderColor:'#F2C94C',backgroundColor:'rgba(242,201,76,0.08)',
      borderWidth:2,pointRadius:3,pointBackgroundColor:'#F2C94C',
      tension:.3,spanGaps:true,fill:false
    }]},
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},
        tooltip:{callbacks:{label:c=>{const v=c.raw;if(v===null)return'无数据';if(m.key==='weight')return v.toFixed(1)+' kg';if(m.key==='calories')return Math.round(v)+' kcal';if(m.key==='exercise')return Math.round(v)+' 分钟';if(m.key==='sleep')return formatShortSleep(v);return v;}}}
      },
      scales:{
        x:{grid:{display:false},ticks:{color:'var(--txt3)',font:{size:10},maxRotation:45,autoSkip:true,maxTicksLimit:7}},
        y:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{color:'var(--txt3)',font:{size:10}},beginAtZero:false}
      }
    }
  });
}

function renderAppPageSummaries(){
  const owner=getDeviceOwnerProfile();
  const active=getActiveProfile();
  // 性能优化：只渲染当前页面的摘要内容，减少非当前页面的无效 DOM 更新
  if(activeAppPage==='settings'){
    const settingsContent=document.getElementById('settingsPageContent');
    if(settingsContent){
      settingsContent.innerHTML=renderSettingsPageContent(owner,active);
      settingsContent.querySelector('#settingsPageOpenSettingsBtn')?.addEventListener('click',openProfileSettings);
      settingsContent.querySelector('#settingsPageOpenGoalCenterBtn')?.addEventListener('click',openGoalSettings);
      settingsContent.querySelector('#settingsPageOpenSyncBtn')?.addEventListener('click',openSyncSettings);
      settingsContent.querySelector('#settingsPageOpenDeviceBtn')?.addEventListener('click',openSyncSettings);
      settingsContent.querySelector('#settingsPageThemeBtn')?.addEventListener('click',()=>{toggleTheme();renderAppPageSummaries()});
      settingsContent.querySelector('#settingsPageModeBtn')?.addEventListener('click',openModeSettingsDialog);
      settingsContent.querySelector('#settingsPageRebindBtn')?.addEventListener('click',openRebindDeviceOwnerModal);
    }
  }
  if(activeAppPage==='health'){
    renderGoalProgressCard(active);
  }
  if(isSingleMode()&&activeAppPage==='growth'){
    renderGrowthPage(currentViewDate);
  }
  if(isCoupleMode()&&activeAppPage==='couple'){
    const other=getPartnerProfile(owner);
    const coupleContent=document.getElementById('coupleSpaceContent');
    if(coupleContent) coupleContent.innerHTML=renderCoupleSpaceContent(owner,other);
    coupleContent?.querySelectorAll('.dash-page-goto').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const tp=btn.dataset.appPage||'record';
        if(tp==='record'){
          if(window.openQuickAddPanel) window.openQuickAddPanel();
          else showToast('请使用底部中央“+”新增记录','info');
        }else{
          switchAppPage(tp);
        }
      });
    });
    coupleContent?.querySelectorAll('[data-couple-time-action]').forEach(btn=>{
      btn.addEventListener('click',()=>openCoupleTimeModal(btn.dataset.coupleTimeAction||'together'));
    });
    coupleContent?.querySelector('#coupleAnnSortToggleBtn')?.addEventListener('click',toggleCoupleAnnSortMode);
    coupleContent?.querySelectorAll('[data-couple-ann-edit]').forEach(btn=>{
      btn.addEventListener('click',()=>openCoupleTimeModal('anniversary',btn.dataset.coupleAnnEdit||''));
    });
    coupleContent?.querySelectorAll('[data-couple-cd-edit]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        if(e.target.closest('[data-couple-cd-delete]')) return;
        openCoupleTimeModal('countdown',btn.dataset.coupleCdEdit||'');
      });
    });
    coupleContent?.querySelectorAll('[data-couple-cd-delete]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        deleteCoupleCountdown(btn.dataset.coupleCdDelete||'');
      });
    });
    coupleContent?.querySelectorAll('[data-couple-mem-edit]').forEach(btn=>{
      btn.addEventListener('click',()=>openCoupleTimeModal('memory',btn.dataset.coupleMemEdit||''));
    });
    coupleContent?.querySelectorAll('[data-couple-mem-delete]').forEach(btn=>{
      btn.addEventListener('click',()=>deleteCoupleMemory(btn.dataset.coupleMemDelete||''));
    });
    coupleContent?.querySelector('#coupleRemindBtn')?.addEventListener('click',()=>{
      showToast('可以提醒TA补一条饮水、运动或睡眠记录','info');
    });
    coupleContent?.querySelector('#coupleHealthCompareBtn')?.addEventListener('click',openHealthCompare);
    coupleContent?.querySelector('#coupleLedgerViewAllBtn')?.addEventListener('click',()=>switchAppPage('couple-ledger'));
    coupleContent?.querySelector('#coupleLedgerAddBtn')?.addEventListener('click',()=>openCoupleLedgerEditor());
    coupleContent?.querySelector('#coupleInviteBtn')?.addEventListener('click',()=>{
      showToast(state.familyCode?'把当前同步码发给TA即可加入共同健康空间':'请先在设置中配置同步码，再邀请TA加入','info');
    });
    coupleContent?.querySelector('#coupleAdviceCard')?.addEventListener('click',()=>{
      const card=coupleContent.querySelector('#coupleAdviceCard');
      if(card) card.classList.toggle('expanded');
    });
    setupCoupleAnnSortHandlers(coupleContent);
  }
}
function renderAll({includeTrend=true}={}){
  console.log('[Render] renderAll start');
  const renderStep=(label,fn)=>{
    try{return fn()}
    catch(err){console.error(`[Render] ${label} failed:`,err)}
  };
  renderStep('renderProfileTabs',renderProfileTabs);
  renderStep('renderDailyView',renderDailyView);
  // 性能优化：renderAll 默认不渲染 Chart，只在健康页面时由 switchAppPage 触发
  if(includeTrend&&activeAppPage==='health') renderStep('renderChart',renderChart);
  renderStep('checkBirthdayReminder',checkBirthdayReminder);
  renderStep('renderAppPageSummaries',renderAppPageSummaries);
}
// ── 性能优化：模块化局部刷新 ──
// 只刷新首页和记录页需要的模块，不触发 renderChart、renderAppPageSummaries 等无关渲染。
// 用于：保存饮食/体重/运动/饮水/睡眠记录后、删除记录后、同步完成后的局部刷新。
function renderDashboard(){
  console.log('[Render] renderDashboard (partial)');
  const renderStep=(label,fn)=>{
    try{return fn()}
    catch(err){console.error(`[Render] ${label} failed:`,err)}
  };
  renderStep('renderProfileTabs',renderProfileTabs);
  renderStep('renderDailyView',renderDailyView);
  if(isSingleMode()&&activeAppPage==='growth') renderStep('renderGrowthPage',()=>renderGrowthPage(currentViewDate));
}
function updateAINote(){
  const note=document.getElementById('aiNote');
  if(!note) return;
  const aiCfg=getAIConfig();
  if(aiCfg.apiKey&&aiCfg.modelId){
    note.textContent='已接入通义千问VL视觉识别 · 拍照即可智能识别食物';
    note.style.color='var(--green)';
  }else{
    note.textContent='AI识别为演示模式 · 已内置通义千问VL视觉识别';
    note.style.color='';
  }
}

function getProfileAvatarHtml(profile){
  if(!profile) return '';
  // 优先显示自定义头像
  if(profile.avatar){
    return `<img src="${profile.avatar}" alt="${escapeHTML(getDisplayName(profile))}" class="avatar-img" onerror="this.style.display='none';this.nextElementSibling.style.display=''">
      <span class="avatar-icon-fallback" style="display:none;background:${profile.gender==='male'?'rgba(96,165,250,0.2)':profile.gender==='female'?'rgba(167,139,250,0.2)':'rgba(212,175,55,0.2)'};color:${profile.gender==='male'?'var(--blue)':profile.gender==='female'?'var(--purple)':'var(--gold)'}">${getGenderIcon(profile.gender)||'·'}</span>`;
  }
  // 无自定义头像：使用性别默认图标
  const icon=getGenderIcon(profile.gender);
  const iconColor=profile.gender==='male'?'var(--blue)':profile.gender==='female'?'var(--purple)':'var(--gold)';
  const avatarBg=profile.gender==='male'?'rgba(96,165,250,0.2)':profile.gender==='female'?'rgba(167,139,250,0.2)':'rgba(212,175,55,0.2)';
  return `<span style="background:${avatarBg};color:${iconColor}">${icon}</span>`;
}

function renderProfileTabs(){
  const wrap=document.getElementById('profileTabs');
  if(!wrap){
    console.error('[Render] #profileTabs not found');
    return;
  }
  if(isSingleMode()){
    const p=getDeviceOwnerProfile();
    if(!p){wrap.innerHTML='';return}
    const displayName=p.displayName||p.name||getDisplayName(p);
    wrap.innerHTML=`<div class="profile-tab active">
      <span class="avatar">${getProfileAvatarHtml(p)}</span><span class="profile-tab-name">${escapeHTML(displayName)}</span>
    </div>`;
    return;
  }
  const owner=getDeviceOwnerProfile();
  const profiles=owner?[owner,...(state.profiles||[]).filter(p=>p.id!==owner.id)]:(state.profiles||[]);
  wrap.innerHTML=profiles.map(p=>{
    const displayName=getDisplayName(p);
    return `<div class="profile-tab ${p.id===state.activeProfileId?'active':''}" data-pid="${p.id}">
      <span class="avatar">${getProfileAvatarHtml(p)}</span><span class="profile-tab-name">${escapeHTML(displayName)}</span>
    </div>`;
  }).join('');
  wrap.querySelectorAll('.profile-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      setCurrentProfile(tab.dataset.pid);
    });
  });
}

// ==================== AI SMART RECORD ====================
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
function shouldUseAIFoodEstimate(name){
  const q=String(name||'').trim().toLowerCase();
  return !!q&&COMPLEX_AI_FOOD_KEYWORDS.some(keyword=>q.includes(keyword.toLowerCase()));
}
// 统一食物名称标准化：返回别名映射后的标准名（如"西红柿"→"番茄"），原名无映射时原样返回
function normalizeFoodName(name){
  const trimmed=String(name||'').trim();
  if(!trimmed) return trimmed;
  return FOOD_ALIASES[trimmed]||trimmed;
}
function findLocalFoodByName(name){
  const q=String(name||'').trim().toLowerCase();
  if(!q) return null;
  if(shouldUseAIFoodEstimate(q)) return null;
  // 精确匹配原名
  let match=FOOD_DB.find(f=>f.name.toLowerCase()===q);
  if(match) return match;
  // 别名标准化后精确匹配（如"西红柿"→"番茄"）
  const canonical=normalizeFoodName(name);
  if(canonical.toLowerCase()!==q){
    match=FOOD_DB.find(f=>f.name.toLowerCase()===canonical.toLowerCase());
    if(match) return match;
  }
  // 模糊/包含匹配（原名和标准名都尝试）
  return FOOD_DB.find(f=>f.name.toLowerCase().includes(q)||q.includes(f.name.toLowerCase()))
    ||(canonical.toLowerCase()!==q&&FOOD_DB.find(f=>f.name.toLowerCase().includes(canonical.toLowerCase())||canonical.toLowerCase().includes(f.name.toLowerCase())))
    ||null;
}
function getUnitGram(unit){
  const m=String(unit||'').match(/约?\s*(\d+(?:\.\d+)?)\s*g/i);
  return m?Number(m[1]):null;
}
function roundFoodValue(value,digits=1){
  const n=Number(value)||0;
  return +n.toFixed(digits);
}
function getFoodBaseAmount(food){
  const explicit=Number(food?.base_amount??food?.base_weight);
  if(Number.isFinite(explicit)&&explicit>0) return explicit;
  return getUnitGram(food?.source_unit||food?.unit)||100;
}
function getFoodBaseNutrition(food){
  const hasBase=food&&['base_calories','base_protein','base_fat','base_carbs','base_fiber'].some(k=>food[k]!==undefined);
  return {
    calories:Number(hasBase?food.base_calories:(food?.cal??food?.calories))||0,
    protein:Number(hasBase?food.base_protein:(food?.pro??food?.protein))||0,
    fat:Number(hasBase?food.base_fat:food?.fat)||0,
    carbs:Number(hasBase?food.base_carbs:(food?.carb??food?.carbs))||0,
    fiber:Number(hasBase?food.base_fiber:(food?.fib??food?.fiber))||0
  };
}
function prepareFoodPortion(food){
  const baseAmount=getFoodBaseAmount(food);
  const quantity=Math.max(.01,Number(food?.quantity)||1);
  const explicitAmount=Number(food?.amount);
  const amount=Number.isFinite(explicitAmount)&&explicitAmount>0?explicitAmount:baseAmount*quantity;
  const base=getFoodBaseNutrition(food);
  return {
    ...food,cal:base.calories,pro:base.protein,fat:base.fat,carb:base.carbs,fib:base.fiber,
    base_amount:baseAmount,base_weight:baseAmount,amount:roundFoodValue(amount,1),
    quantity:roundFoodValue(amount/baseAmount,2),source_unit:food?.source_unit||food?.unit||`${baseAmount}g`
  };
}
function calculateFoodNutrition(food,amount=food?.amount){
  const base=getFoodBaseNutrition(food);
  const baseAmount=getFoodBaseAmount(food);
  const grams=Math.max(0,Number(amount)||baseAmount*(Number(food?.quantity)||1));
  const ratio=baseAmount?grams/baseAmount:0;
  return {
    calories:roundFoodValue(base.calories*ratio,1),protein:roundFoodValue(base.protein*ratio,1),
    fat:roundFoodValue(base.fat*ratio,1),carbs:roundFoodValue(base.carbs*ratio,1),fiber:roundFoodValue(base.fiber*ratio,1)
  };
}
function getFoodActualNutrition(food){
  if(food&&food.amount!==undefined&&food.base_amount!==undefined&&food.calories!==undefined){
    return {calories:Number(food.calories)||0,protein:Number(food.protein)||0,fat:Number(food.fat)||0,carbs:Number(food.carbs)||0,fiber:Number(food.fiber)||0};
  }
  return calculateFoodNutrition(food,getFoodBaseAmount(food)*(Number(food?.quantity)||1));
}
function serializeFoodPortion(food){
  const prepared=prepareFoodPortion(food);
  const base=getFoodBaseNutrition(prepared);
  const actual=calculateFoodNutrition(prepared,prepared.amount);
  return {
    food_name:prepared.name,name:prepared.name,cat:prepared.cat||'其他',amount:prepared.amount,unit:'g',
    source_unit:prepared.source_unit,base_amount:prepared.base_amount,base_weight:prepared.base_amount,quantity:prepared.quantity,
    calories:actual.calories,protein:actual.protein,fat:actual.fat,carbs:actual.carbs,fiber:actual.fiber,
    base_calories:base.calories,base_protein:base.protein,base_fat:base.fat,base_carbs:base.carbs,base_fiber:base.fiber,
    cal:base.calories,pro:base.protein,carb:base.carbs,fib:base.fiber,
    source:prepared.source||'database',
    calorieMin:prepared.calorieMin,
    calorieMax:prepared.calorieMax,
    confidence:prepared.confidence,
    estimateReason:prepared.estimateReason,
    portionText:prepared.portionText,
    estimateVersion:prepared.estimateVersion,
    estimatedWeight:prepared.estimatedWeight,
    aiStage:prepared.aiStage,
    userAdjustedWeight:prepared.userAdjustedWeight||false,
    aiAdvice:prepared.aiAdvice,
    consumedWeightG:prepared.consumedWeightG||null,
  };
}
function foodPortionCardHTML(food,index){
  const f=prepareFoodPortion(food);
  const n=calculateFoodNutrition(f,f.amount);
  const per100=calculateFoodNutrition(f,100);
  const isAIPhoto=f.source==='ai_photo';
  const confidenceLabel={low:'低',medium:'中',high:'高'}[f.confidence]||'中';
  const aiAdvice=f.aiAdvice||f.estimateReason||'图片无法精确判断重量，建议按实际份量修正。';
  const portionMeta=isAIPhoto
    ? `默认参考：1份 ≈ ${f.base_amount}g · ${escapeHTML(f.source_unit)}`
    : `1份 = ${f.base_amount}g · ${escapeHTML(f.source_unit)}`;
  const aiNote=isAIPhoto?`<div class="food-portion-ai-note">AI估算：约 <strong>${Math.round(f.amount)}g</strong> · 可信度：${confidenceLabel}。根据图片面积、餐盘比例估算，仅作参考；${escapeHTML(aiAdvice)}</div>`:'';
  return `<div class="food-portion-card" data-portion-index="${index}">
    <div class="food-portion-head"><div><div class="food-portion-name">${escapeHTML(f.name)}</div><div class="food-portion-meta">${portionMeta}</div></div>
    <div><div class="food-portion-kcal"><span data-portion-kcal>${n.calories}</span> kcal</div><div class="food-portion-nutrients" data-portion-nutrients>蛋白 ${n.protein}g · 脂肪 ${n.fat}g · 碳水 ${n.carbs}g</div></div></div>
    ${aiNote}
    <div class="food-portion-controls">
      <div class="food-portion-field"><label>快速份量</label><div class="food-serving-stepper"><button class="food-portion-btn" type="button" data-portion-action="minus">−</button><input class="food-portion-input" data-glass-enhanced="portion" data-portion-quantity type="number" min="0.01" step="0.1" value="${f.quantity}"><span class="food-portion-unit">份</span><button class="food-portion-btn" type="button" data-portion-action="plus">+</button></div></div>
      <div class="food-portion-field"><label>实际重量</label><div class="food-grams-control"><input class="food-portion-input" data-glass-enhanced="portion" data-portion-amount type="number" min="1" step="1" value="${f.amount}"><span class="food-portion-unit">g</span></div></div>
      <button class="food-portion-del" type="button" data-portion-action="delete" aria-label="删除">${icon('x')}</button>
    </div>
    <div class="food-weight-quick">
      <button type="button" data-weight-delta="-50">-50g</button>
      <button type="button" data-weight-delta="-10">-10g</button>
      <span data-weight-current>${Math.round(f.amount)}g</span>
      <button type="button" data-weight-delta="10">+10g</button>
      <button type="button" data-weight-delta="50">+50g</button>
    </div>
    <button class="food-detail-toggle" type="button" data-portion-action="detail" aria-expanded="false">查看详情</button>
    <div class="food-detail-panel" data-food-detail hidden>
      <div><span>每100g热量</span><strong data-detail-per100>${per100.calories} kcal</strong></div>
      <div><span>总热量</span><strong data-detail-calories>${n.calories} kcal</strong></div>
      <div><span>蛋白质</span><strong data-detail-protein>${n.protein}g</strong></div>
      <div><span>脂肪</span><strong data-detail-fat>${n.fat}g</strong></div>
      <div><span>碳水</span><strong data-detail-carbs>${n.carbs}g</strong></div>
      ${isAIPhoto?`<div><span>AI建议</span><strong>${escapeHTML(aiAdvice)}</strong></div>`:''}
    </div>
  </div>`;
}
function bindFoodPortionControls(root,foods,onDelete){
  const refresh=(card,food)=>{
    const n=calculateFoodNutrition(food,food.amount);
    const per100=calculateFoodNutrition(food,100);
    card.querySelector('[data-portion-kcal]').textContent=n.calories;
    card.querySelector('[data-portion-nutrients]').textContent=`蛋白 ${n.protein}g · 脂肪 ${n.fat}g · 碳水 ${n.carbs}g`;
    card.querySelector('[data-portion-quantity]').value=food.quantity;
    card.querySelector('[data-portion-amount]').value=food.amount;
    const current=card.querySelector('[data-weight-current]');
    if(current) current.textContent=`${Math.round(food.amount)}g`;
    const weight=card.querySelector('[data-detail-weight]');
    if(weight) weight.textContent=`${Math.round(food.amount)}g`;
    const per100El=card.querySelector('[data-detail-per100]');
    if(per100El) per100El.textContent=`${per100.calories} kcal`;
    const cal=card.querySelector('[data-detail-calories]');
    if(cal) cal.textContent=`${n.calories} kcal`;
    const pro=card.querySelector('[data-detail-protein]');
    if(pro) pro.textContent=`${n.protein}g`;
    const fat=card.querySelector('[data-detail-fat]');
    if(fat) fat.textContent=`${n.fat}g`;
    const carbs=card.querySelector('[data-detail-carbs]');
    if(carbs) carbs.textContent=`${n.carbs}g`;
  };
  root.querySelectorAll('.food-portion-card').forEach(card=>{
    bindOneFoodPortionCard(card,foods,onDelete,refresh);
  });
}
function bindOneFoodPortionCard(card,foods,onDelete,refresh){
  if(!refresh){
    refresh=(card,food)=>{
      const n=calculateFoodNutrition(food,food.amount);
      const per100=calculateFoodNutrition(food,100);
      card.querySelector('[data-portion-kcal]').textContent=n.calories;
      card.querySelector('[data-portion-nutrients]').textContent=`蛋白 ${n.protein}g · 脂肪 ${n.fat}g · 碳水 ${n.carbs}g`;
      card.querySelector('[data-portion-quantity]').value=food.quantity;
      card.querySelector('[data-portion-amount]').value=food.amount;
      const current=card.querySelector('[data-weight-current]');
      if(current) current.textContent=`${Math.round(food.amount)}g`;
      const weight=card.querySelector('[data-detail-weight]');
      if(weight) weight.textContent=`${Math.round(food.amount)}g`;
      const per100El=card.querySelector('[data-detail-per100]');
      if(per100El) per100El.textContent=`${per100.calories} kcal`;
      const cal=card.querySelector('[data-detail-calories]');
      if(cal) cal.textContent=`${n.calories} kcal`;
      const pro=card.querySelector('[data-detail-protein]');
      if(pro) pro.textContent=`${n.protein}g`;
      const fat=card.querySelector('[data-detail-fat]');
      if(fat) fat.textContent=`${n.fat}g`;
      const carbs=card.querySelector('[data-detail-carbs]');
      if(carbs) carbs.textContent=`${n.carbs}g`;
    };
  }
  if(card.dataset.portionBound==='1') return;
  card.dataset.portionBound='1';
    const idx=Number(card.dataset.portionIndex);
    foods[idx]=prepareFoodPortion(foods[idx]);
    const updateAmount=(value,userAdjusted=false)=>{const f=foods[idx];f.amount=Math.max(1,Number(value)||f.base_amount);f.quantity=roundFoodValue(f.amount/f.base_amount,2);if(userAdjusted) f.userAdjustedWeight=true;refresh(card,f)};
    const updateQuantity=(value,userAdjusted=false)=>{const f=foods[idx];f.quantity=Math.max(.01,Number(value)||1);f.amount=roundFoodValue(f.base_amount*f.quantity,1);if(userAdjusted) f.userAdjustedWeight=true;refresh(card,f)};
    card.querySelector('[data-portion-amount]').addEventListener('input',e=>updateAmount(e.target.value,true));
    card.querySelector('[data-portion-quantity]').addEventListener('change',e=>updateQuantity(e.target.value,true));
    card.querySelector('[data-portion-action="minus"]').addEventListener('click',()=>updateQuantity(Math.max(1,Math.round(foods[idx].quantity)-1),true));
    card.querySelector('[data-portion-action="plus"]').addEventListener('click',()=>updateQuantity(Math.max(1,Math.floor(foods[idx].quantity)+1),true));
    card.querySelectorAll('[data-weight-delta]').forEach(btn=>{
      btn.addEventListener('click',()=>updateAmount((Number(foods[idx].amount)||foods[idx].base_amount)+Number(btn.dataset.weightDelta||0),true));
    });
    card.querySelector('[data-portion-action="detail"]')?.addEventListener('click',e=>{
      const panel=card.querySelector('[data-food-detail]');
      const showDetail=panel.hidden;
      panel.hidden=!showDetail;
      panel.dataset.expanded=String(showDetail);
      e.currentTarget.setAttribute('aria-expanded',String(showDetail));
      e.currentTarget.textContent=showDetail?'收起详情':'查看详情';
    });
    card.querySelector('[data-portion-action="delete"]').addEventListener('click',()=>onDelete(idx));
}
function getFoodDraftTotals(items=foodDraft){
  const totals={cal:0,pro:0,carb:0,fat:0};
  items.forEach(f=>{
    const p=prepareFoodPortion(f);
    const n=calculateFoodNutrition(p,p.amount);
    totals.cal+=Number(n.calories)||0;
    totals.pro+=Number(n.protein)||0;
    totals.carb+=Number(n.carbs)||0;
    totals.fat+=Number(n.fat)||0;
  });
  totals.cal=Math.round(totals.cal);
  totals.pro=Math.round(totals.pro*10)/10;
  totals.carb=Math.round(totals.carb*10)/10;
  totals.fat=Math.round(totals.fat*10)/10;
  return totals;
}
function foodDraftItemMetaText(f){
  const p=prepareFoodPortion(f);
  const n=calculateFoodNutrition(p,p.amount);
  const unit=String(p.source_unit||p.unit||'').trim();
  const qty=p.quantity||1;
  let portionPart='';
  if(unit&&!/^\d*\s*g$/i.test(unit)&&!unit.endsWith('g')){
    const unitLabel=unit.replace(/^\d+\s*/,'');
    const qtyText=Math.abs(qty-Math.round(qty))<0.05?String(Math.round(qty)):String(roundFoodValue(qty,1));
    portionPart=`${qtyText}${unitLabel} · `;
  }else if(qty>0&&Math.abs(qty-1)>0.01){
    portionPart=`${roundFoodValue(qty,1)}份 · `;
  }
  const gramsLabel=portionPart?`约${Math.round(p.amount)}g`:`${Math.round(p.amount)}g`;
  return `${portionPart}${gramsLabel} · ${Math.round(n.calories)} kcal`;
}
function foodDraftCompactRowHTML(f,i){
  const p=prepareFoodPortion(f);
  const n=calculateFoodNutrition(p,p.amount);
  return `<div class="food-draft-item" data-draft-idx="${i}">
    <div class="food-draft-item-main">
      <div class="food-draft-item-name">${escapeHTML(p.name)}</div>
      <div class="food-draft-item-meta">${foodDraftItemMetaText(p)}</div>
      <div class="food-draft-item-macros">P${n.protein}g · C${n.carbs}g · F${n.fat}g</div>
    </div>
    <div class="food-draft-item-actions">
      <button type="button" class="food-draft-action-btn" data-draft-edit="${i}">编辑</button>
      <button type="button" class="food-draft-action-btn" data-draft-del="${i}">删除</button>
    </div>
  </div>`;
}
function renderFoodDraftReviewHTML(){
  const totals=getFoodDraftTotals();
  const totalLabel=`${totals.cal} kcal`;
  const macroTotals=`<div class="food-draft-totals-macros">P ${totals.pro}g · C ${totals.carb}g · F ${totals.fat}g</div>`;
  let html=`<div class="food-draft-panel">
    <div class="food-draft-title">本次待添加</div>
    <div class="food-draft-list">`;
  foodDraft.forEach((f,i)=>{
    html+=foodDraftCompactRowHTML(f,i);
    if(foodDraftSession?.editingIndex===i){
      html+=`<div class="food-draft-inline-edit" data-draft-inline="${i}">${foodPortionCardHTML(f,i)}</div>`;
    }
  });
  html+=`</div>
    <div class="ai-add-more" data-draft-add-more type="button">+ 添加更多食物</div>
    <div class="food-draft-totals">
      <div class="food-draft-totals-kcal">${totalLabel}</div>
      ${macroTotals}
    </div>
    <div class="food-draft-footer">
      <button type="button" class="btn btn-ghost" data-draft-cancel>取消</button>
      <button type="button" class="btn btn-gold" data-draft-confirm>确认添加</button>
    </div>
  </div>`;
  return html;
}
function bindFoodDraftReview(root,options={}){
  if(!root) return;
  root.querySelectorAll('[data-draft-edit]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const idx=Number(btn.dataset.draftEdit);
      if(!Number.isFinite(idx)) return;
      foodDraftSession=foodDraftSession||{mode:options.mode||'search',phase:'review'};
      foodDraftSession.editingIndex=foodDraftSession.editingIndex===idx?null:idx;
      options.onRefresh?.();
    });
  });
  root.querySelectorAll('[data-draft-del]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const idx=Number(btn.dataset.draftDel);
      if(!Number.isFinite(idx)) return;
      foodDraft.splice(idx,1);
      if(foodDraftSession?.editingIndex===idx) foodDraftSession.editingIndex=null;
      else if(foodDraftSession?.editingIndex>idx) foodDraftSession.editingIndex--;
      if(foodDraft.length===0&&foodDraftSession?.mode==='search'){
        foodDraftSession.phase='search';
      }
      options.onRefresh?.();
    });
  });
  foodDraft.forEach((f,i)=>{
    if(foodDraftSession?.editingIndex!==i) return;
    const slot=root.querySelector(`[data-draft-inline="${i}"]`);
    if(!slot) return;
    bindFoodPortionControls(slot,foodDraft,idx=>{
      foodDraft.splice(idx,1);
      if(foodDraftSession) foodDraftSession.editingIndex=null;
      options.onRefresh?.();
    });
  });
  root.querySelector('[data-draft-add-more]')?.addEventListener('click',()=>options.onAddMore?.());
  root.querySelector('[data-draft-cancel]')?.addEventListener('click',()=>options.onCancel?.());
  root.querySelector('[data-draft-confirm]')?.addEventListener('click',()=>options.onConfirm?.());
}
function handleSearchFoodPick(picked,context){
  const food=prepareFoodPortion({...picked,source:picked.source||'search',quantity:1});
  if(typeof context.onFoodPicked==='function'){
    context.onFoodPicked(food);
    if(context.input) context.input.value='';
    hideSearchResults(context.wrap);
    return true;
  }
  if(typeof context.onFoodSelect==='function'){
    context.onFoodSelect(food);
    if(context.input) context.input.value='';
    hideSearchResults(context.wrap);
    return true;
  }
  return false;
}
function renderFoodDraftEditView(container,pendingFood,options={}){
  if(!container||!pendingFood) return;
  const foods=[pendingFood];
  container.innerHTML=`${foodPortionCardHTML(pendingFood,0)}
    <div class="food-draft-edit-actions">
      ${options.showBack?'<button type="button" class="btn btn-ghost" data-draft-edit-back>返回</button>':''}
      <button type="button" class="btn btn-gold" data-draft-edit-join>${escapeHTML(options.joinLabel||'加入本次记录')}</button>
    </div>`;
  bindFoodPortionControls(container,foods,()=>{});
  container.querySelector('[data-draft-edit-join]')?.addEventListener('click',()=>options.onJoin?.(prepareFoodPortion(pendingFood)));
  container.querySelector('[data-draft-edit-back]')?.addEventListener('click',()=>options.onBack?.());
}
function renderFoodDraftShell(){
  const content=document.getElementById('quickActionContent');
  const s=foodDraftSession;
  if(!content||!s||s.mode!=='search') return;
  if(s.phase==='review'){
    content.innerHTML=`<div class="qa-modal-section">${mealSelectorHTML()}${renderFoodDraftReviewHTML()}</div>`;
    bindMealSelector(content);
    bindFoodDraftReview(content,{
      mode:'search',
      onRefresh:renderFoodDraftShell,
      onAddMore:()=>{s.phase='search';s.pendingFood=null;renderFoodDraftShell();},
      onCancel:()=>{foodDraft=[];foodDraftSession=null;closeQuickActionModal();},
      onConfirm:()=>confirmFoodDraft({mode:'search',dateTime:()=>recordEntryDateTime(s.recordDate||currentViewDate),onConfirmed:closeQuickActionModal})
    });
    return;
  }
  if(s.phase==='edit'&&s.pendingFood){
    content.innerHTML=`<div class="qa-modal-section">
      ${mealSelectorHTML()}
      <div id="foodDraftEditHost"></div>
    </div>`;
    bindMealSelector(content);
    renderFoodDraftEditView(document.getElementById('foodDraftEditHost'),s.pendingFood,{
      showBack:true,
      onBack:()=>{s.phase=foodDraft.length?'review':'search';s.pendingFood=null;renderFoodDraftShell();},
      onJoin:food=>{
        foodDraft.push(food);
        s.pendingFood=null;
        s.phase='review';
        s.editingIndex=null;
        renderFoodDraftShell();
        showToast(`已加入 ${food.name}`,'success');
      }
    });
    return;
  }
  content.innerHTML=`<div class="qa-modal-section">
    <div class="qa-search-wrap">
      <input type="text" class="qa-modal-input" id="qaFoodSearchInput" placeholder="搜索食物名称..." autocomplete="off">
    </div>
    ${mealSelectorHTML()}
    ${foodDraft.length?`<div class="food-draft-search-banner" data-draft-go-review>查看本次待添加（${foodDraft.length}）</div>`:''}
    <div class="qa-search-results search-results" id="qaSearchResults" style="display:none"></div>
  </div>`;
  bindMealSelector(content);
  const searchInput=document.getElementById('qaFoodSearchInput');
  const resultsEl=document.getElementById('qaSearchResults');
  const context={
    input:searchInput,
    wrap:resultsEl,
    onFoodPicked:food=>{
      s.pendingFood=food;
      s.phase='edit';
      renderFoodDraftShell();
    }
  };
  searchInput.addEventListener('input',e=>renderSearchResults(e.target.value,context));
  searchInput.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.stopPropagation();searchInput.value='';renderSearchResults('',context);}
  });
  content.querySelector('[data-draft-go-review]')?.addEventListener('click',()=>{s.phase='review';renderFoodDraftShell();});
  requestAnimationFrame(()=>searchInput.focus());
}
function openFoodDraftSearchOverlay(opts={}){
  cancelPendingFoodSearch();
  const modal=document.getElementById('quickActionModal');
  if(!modal) return;
  modal.dataset.quickAction='food-draft-search';
  modal.classList.add('modal-overlay--stack-top');
  document.body.appendChild(modal);
  let overlayPhase='search';
  let pendingFood=null;
  const renderOverlay=()=>{
    if(overlayPhase==='search'){
      document.getElementById('quickActionTitle').textContent='搜索添加食物';
      document.getElementById('quickActionContent').innerHTML=`
        <div class="qa-modal-section ai-food-search-section">
          <div class="qa-search-wrap">
            <input type="text" class="qa-modal-input" id="qaFoodSearchInput" placeholder="搜索食物名称..." autocomplete="off">
          </div>
          <div class="qa-search-results search-results" id="qaSearchResults" style="display:none"></div>
          <button type="button" class="btn btn-ghost btn-sm" id="qaFoodSearchCancel" style="width:100%;margin-top:10px">取消</button>
        </div>`;
      const searchInput=document.getElementById('qaFoodSearchInput');
      const resultsEl=document.getElementById('qaSearchResults');
      const context={
        input:searchInput,
        wrap:resultsEl,
        onFoodPicked:food=>{pendingFood=food;overlayPhase='edit';renderOverlay();}
      };
      searchInput.addEventListener('input',e=>renderSearchResults(e.target.value,context));
      searchInput.addEventListener('keydown',e=>{
        if(e.key==='Escape'){e.stopPropagation();closeQuickActionModal();}
      });
      document.getElementById('qaFoodSearchCancel').addEventListener('click',closeQuickActionModal);
      requestAnimationFrame(()=>searchInput.focus());
    }else{
      document.getElementById('quickActionTitle').textContent='调整份量';
      document.getElementById('quickActionContent').innerHTML=`<div class="qa-modal-section"><div id="foodDraftOverlayEdit"></div></div>`;
      renderFoodDraftEditView(document.getElementById('foodDraftOverlayEdit'),pendingFood,{
        showBack:true,
        onBack:()=>{overlayPhase='search';renderOverlay();},
        onJoin:food=>{
          foodDraft.push(food);
          closeQuickActionModal();
          opts.onJoined?.();
          showToast(`已添加 ${food.name}`,'success');
        }
      });
    }
  };
  openQuickActionModal();
  renderIcons(modal);
  renderOverlay();
}
function confirmFoodDraft(options={}){
  if(!requireCurrentDeviceOwnerForHealthWrite()) return;
  if(foodDraft.length===0){
    showToast('请先添加食物','error');
    return;
  }
  const mode=options.mode||foodDraftSession?.mode||'search';
  const p=mode==='ai'
    ?(getProfile(options.targetProfileId)||getHealthWriteProfile())
    :(editingFoodRecordId?getActiveProfile():getHealthWriteProfile());
  if(mode==='ai'){
    if(!requireEditableHealthProfile(p)) return;
  }else if(editingFoodRecordId&&!requireEditableHealthProfile(p)) return;
  p.foodRecords=p.foodRecords||[];
  const requestedDateTime=typeof options.dateTime==='function'?options.dateTime():options.dateTime;
  const dateTime=normalizeDateTime(requestedDateTime||(mode==='ai'?getTimePickerValue('foodTime'):getTimePickerValue('foodTime')));
  const payload=withProfileId(p,{
    date:dateFromDateTimeValue(dateTime),
    dateTime,
    meal:currentMeal,
    foods:foodDraft.map(serializeFoodPortion)
  });
  const wasEditing=!!editingFoodRecordId;
  if(editingFoodRecordId){
    const record=(p.foodRecords||[]).find(r=>r.id===editingFoodRecordId);
    if(record) Object.assign(record,payload);
    else p.foodRecords.push(withProfileId(p,{id:editingFoodRecordId,...payload}));
  }else{
    p.foodRecords.push(withProfileId(p,{id:'r'+Date.now()+Math.random().toString(36).substr(2,5),...payload}));
  }
  saveData();
  invalidateHealthCoachDayCache(p,dateFromDateTimeValue(dateTime));
  const count=foodDraft.length;
  foodDraft=[];
  foodDraftSession=null;
  editingFoodRecordId=null;
  resetTimePicker('foodTime');
  renderDashboard();
  const mealNames={breakfast:'早餐',lunch:'午餐',dinner:'晚餐',snack:'加餐'};
  if(mode==='ai'){
    aiAnalysisTargetProfileId='';
    closeModal('aiModal');
    clearPhotoZone();
    showToast(`已添加 ${count} 项食物到${mealNames[currentMeal]}`,'success');
  }else{
    showToast(wasEditing?`已更新${mealNames[currentMeal]}记录`:`已添加到${mealNames[currentMeal]}`,'success');
    options.onConfirmed?.();
  }
}
function getFoodQuantity(food,amount,unitText){
  if(amount===null||amount===undefined||amount==='') return '';
  const n=Number(amount);
  if(!Number.isFinite(n)||n<=0) return '';
  const unit=String(unitText||'').toLowerCase();
  if(['g','克','kg','公斤'].includes(unit)){
    const grams=unit==='kg'||unit==='公斤'?n*1000:n;
    // Use getFoodBaseAmount which checks base_amount/base_weight before unit string
    const base=getFoodBaseAmount(food);
    return base?+(grams/base).toFixed(2):'';
  }
  return +n.toFixed(2);
}
async function resolveDraftFood(item){
  const rawName=String(item.name||'').trim();
  // 标准化名称：让"梨子"/"雪梨"也能复用"梨"的缓存和AI搜索结果
  const canonicalName=normalizeFoodName(rawName);
  let food=findLocalFoodByName(rawName)
    ||getCachedAIFood(rawName)
    ||(canonicalName!==rawName&&getCachedAIFood(canonicalName));
  if(!food){
    try{
      // 优先用标准名搜索AI（"梨子"→"梨"），命中率更高
      food=await searchFoodWithAI(canonicalName);
      if(canonicalName!==rawName) setCachedAIFood(rawName,food);
    }catch(e){
      // AI search failed (network/server error) — don't abort the entire draft.
      // Return a placeholder with needsAttention so user can fix the name manually.
      food=null;
    }
  }
  const normalized=normalizeAIFood(food);
  // Parse original amount/unit early — needed even if nutrition lookup failed
  const originalAmount=Number(item.amount)||0;
  const originalUnit=String(item.unitText||'').trim();
  const unitLower=originalUnit.toLowerCase();
  const hasGrams=originalAmount>0&&['g','克','kg','公斤'].includes(unitLower);
  const hasNaturalCount=originalAmount>0&&!hasGrams;
  if(!normalized){
    // Nutrition lookup failed, but user's original amount MUST be preserved.
    // Never discard 500g just because we couldn't find per-100g nutrition data.
    let fallbackGrams=0,fallbackDisplay='',fallbackQty='';
    if(hasGrams){
      const grams=unitLower==='kg'||unitLower==='公斤'?originalAmount*1000:originalAmount;
      fallbackGrams=Math.round(grams);
      fallbackDisplay=`${fallbackGrams}g`;
      fallbackQty=1;
    }else if(hasNaturalCount){
      fallbackQty=originalAmount;
      fallbackDisplay=`×${originalAmount}`;
    }
    return {
      name:rawName,quantity:fallbackQty,unit:'',cal:0,carb:0,pro:0,fat:0,fib:0,
      amount:fallbackGrams,
      amountUnit:hasGrams?'g':'',
      effectiveGrams:fallbackGrams,
      displayText:fallbackDisplay,
      isEstimated:false,
      draftCalories:0,
      draftProtein:0,draftCarbs:0,draftFat:0,draftFiber:0,
      needsAttention:true,
      note:'营养数据暂时获取失败，可稍后重试或手动修改'
    };
  }
  const baseGrams=getFoodBaseAmount(normalized);

  // Calculate effectiveGrams, isEstimated, displayText, quantity
  let effectiveGrams,isEstimated,displayText,quantity;
  if(hasGrams){
    // User explicitly stated grams — use directly, never override
    const grams=unitLower==='kg'||unitLower==='公斤'?originalAmount*1000:originalAmount;
    effectiveGrams=Math.round(grams);
    isEstimated=false;
    quantity=baseGrams>0?+(grams/baseGrams).toFixed(2):1;
    displayText=`${effectiveGrams}g`;
  }else if(hasNaturalCount){
    // Natural count (e.g. "2个", "1条") — estimate grams from base serving
    effectiveGrams=Math.round(baseGrams*originalAmount);
    isEstimated=true;
    quantity=originalAmount;
    displayText=`×${originalAmount} · 约${effectiveGrams}g`;
  }else{
    // No amount specified — estimate 1 default serving
    effectiveGrams=Math.round(baseGrams);
    isEstimated=true;
    quantity=1;
    displayText=`约${effectiveGrams}g`;
  }

  // Calculate nutrition using existing deterministic function
  const nutrition=calculateFoodNutrition(normalized,effectiveGrams);
  const hasNutrition=nutrition.calories>0;

  return {
    ...normalized,
    quantity,
    amount:effectiveGrams,
    amountUnit:'g',
    displayText,
    isEstimated,
    effectiveGrams,
    draftCalories:Math.round(nutrition.calories),
    draftProtein:nutrition.protein,
    draftCarbs:nutrition.carbs,
    draftFat:nutrition.fat,
    draftFiber:nutrition.fiber,
    needsAttention:!hasNutrition,
    note:!hasNutrition?'无法获取营养数据，请修改食物名称':''
  };
}
function findLocalExerciseByName(name){
  const q=String(name||'').trim().toLowerCase();
  if(!q) return null;
  return EXERCISE_DB.find(e=>e.name.toLowerCase()===q)||EXERCISE_DB.find(e=>e.name.toLowerCase().includes(q)||q.includes(e.name.toLowerCase()))||null;
}
async function resolveDraftExercise(event){
  const rawName=String(event.name||'').trim();
  let exercise=findLocalExerciseByName(rawName)||getCachedAIExercise(rawName);
  if(!exercise) exercise=await searchExerciseWithAI(rawName);
  const normalized=normalizeAIExercise(exercise);
  return {
    name:normalized?.name||rawName,
    met:normalized?.met||null,
    unit:'分钟',
    defaultVal:30,
    inputType:'time',
    needsAttention:!normalized||!event.duration,
    note:!normalized?'运动项目需要确认':(!event.duration?'时长需要确认':'')
  };
}
async function buildHealthDraft(events,targetProfileId,sourceText=''){
  const draftEvents=[];
  for(const ev of events){
    const type=ev.type;
    const base={id:'d'+Date.now()+Math.random().toString(36).slice(2,7),type,dateTime:withCurrentViewDateTime(ev.dateTime),timeDefaulted:!!ev.timeDefaulted,needsAttention:false,note:'',selected:true};
    if(type==='weight'){
      draftEvents.push({...base,weight:Number(ev.weight)||'',bodyFat:ev.bodyFat??''});
    }else if(type==='food'){
      const foods=[];
      for(const item of (ev.foods||[])) foods.push(await resolveDraftFood(item));
      // Priority: AI-detected meal > explicit meal in source text > time-based detection
      const meal=ev.meal||detectMealFromText(sourceText)||getMealTypeByDateTime(withCurrentViewDateTime(ev.dateTime));
      draftEvents.push({...base,meal,foods,needsAttention:foods.some(f=>f.needsAttention),note:foods.some(f=>f.needsAttention)?'部分食物营养数据缺失，请修改名称或补充重量':''});
    }else if(type==='exercise'){
      const ex=await resolveDraftExercise(ev);
      draftEvents.push({...base,name:ex.name,duration:ev.duration||'',met:ex.met,needsAttention:ex.needsAttention,note:ex.note});
    }else if(type==='steps'){
      draftEvents.push({...base,steps:parseInt(ev.steps,10)||''});
    }else if(type==='sleep'){
      draftEvents.push({...base,duration:Number(ev.duration)||'',quality:ev.quality||'normal'});
    }else if(type==='water'){
      const amount=Number(ev.amount)||'';
      draftEvents.push({...base,amount,needsAttention:!amount,note:!amount?'饮水量需要确认':''});
    }else if(type==='expense'){
      const owner=getDeviceOwnerProfile();
      const partner=isCoupleMode()?getPartnerProfile(owner):null;
      let paidByProfileId=owner?.id||'';
      const hint=String(ev.paidByHint||'').trim();
      if(hint&&hint!=='self'&&partner){
        const pName=(partner.name||'').toLowerCase();
        if(pName&&hint.toLowerCase().includes(pName)) paidByProfileId=partner.id;
      }
      const amountNum=Number(ev.amount)||0;
      const needsAttn=!amountNum||amountNum<=0;
      draftEvents.push({...base,amount:amountNum||'',merchant:String(ev.merchant||''),categoryKey:String(ev.categoryKey||'other'),paidByHint:hint,paidByProfileId,expenseNote:String(ev.note||''),needsAttention:needsAttn,note:needsAttn?'金额需要确认':''});
    }
  }
  return {targetProfileId,createdAt:Date.now(),committed:false,events:draftEvents};
}
function eventIcon(type){
  return {
    weight:icon('scale'),
    food:icon('bowl'),
    exercise:icon('flame'),
    steps:icon('footprints'),
    sleep:icon('bed'),
    water:icon('droplet'),
    expense:icon('sparkles')
  }[type]||icon('edit');
}
function eventTitle(ev){
  const mealMap={breakfast:'早餐',lunch:'午餐',dinner:'晚餐',snack:'加餐'};
  return ev.type==='food'?mealMap[ev.meal]||'饮食':{weight:'体重',exercise:'运动',steps:'步数',sleep:'睡眠',water:'饮水',expense:'共同账本'}[ev.type]||ev.type;
}
function validateHealthDraft(draft){
  const errors=[];
  if(!draft||draft.committed) errors.push('草稿不存在或已提交');
  const selectedEvents=draft?.events?.filter(ev=>ev.selected!==false)||[];
  if(!selectedEvents.length) errors.push('没有待记录内容');
  draft?.events?.forEach((ev,i)=>{
    if(ev.selected===false) return;
    if(ev.type==='expense') return;
    if(!ev.dateTime) errors.push(`第${i+1}条缺少时间`);
    if(ev.type==='weight'&&(!ev.weight||ev.weight<20||ev.weight>300)) errors.push(`第${i+1}条体重无效`);
    if(ev.type==='food'){
      if(!ev.foods?.length){errors.push(`第${i+1}条饮食没有食物记录`);return}
      // Only block if: food name is empty, OR food has no nutrition data (needsAttention).
      // Grams are always estimated when missing, so missing grams alone should NOT block saving.
      const badFood=ev.foods.find(f=>!f.name||f.needsAttention);
      if(badFood){
        const mealLabel={breakfast:'早餐',lunch:'午餐',dinner:'晚餐',snack:'加餐'}[ev.meal]||`第${i+1}条`;
        const reason=!badFood.name?'食物名称为空':(badFood.note||'营养数据缺失');
        errors.push(`${mealLabel}：${badFood.name||'未知食物'}${reason==='营养数据缺失'?'暂时无法估算，请补充重量':'需要确认'}`);
        return;
      }
    }
    if(ev.type==='exercise'&&(!ev.name||!ev.duration||ev.duration<=0||!ev.met)) errors.push(`第${i+1}条运动需要确认项目和时长`);
    if(ev.type==='steps'&&(!ev.steps||ev.steps<0||ev.steps>100000)) errors.push(`第${i+1}条步数无效`);
    if(ev.type==='sleep'&&(!ev.duration||ev.duration<=0||ev.duration>1440)) errors.push(`第${i+1}条睡眠时长无效`);
    if(ev.type==='water'&&(!ev.amount||ev.amount<=0||ev.amount>10000)) errors.push(`第${i+1}条饮水量需要确认`);
  });
  return errors;
}
function commitHealthDraft(options={}){
  const {
    showSuccessToast=true,
    refreshUI=true
  }=options;
  if(aiHealthSubmitting) return {success:false,error:'正在保存，请勿重复点击',busy:true};
  if(!requireCurrentDeviceOwnerForHealthWrite()) return {success:false,error:DEVICE_OWNER_REQUIRED_MESSAGE};
  const errors=validateHealthDraft(aiHealthDraft);
  if(errors.length){
    showToast(errors[0],'error');
    return {success:false,error:errors[0]};
  }
  const p=getProfile(aiHealthDraft.targetProfileId);
  if(!p){
    showToast('目标人物不存在','error');
    return {success:false,error:'目标人物不存在'};
  }
  if(!requireEditableHealthProfile(p)) return {success:false,error:'目标档案不可编辑'};
  aiHealthSubmitting=true;
  const draft=aiHealthDraft;
  const eventsToCommit=draft.events.filter(ev=>ev.selected!==false&&ev.type!=='expense');
  const expenseEvents=draft.events.filter(ev=>ev.selected!==false&&ev.type==='expense');
  const count=eventsToCommit.length;
  const profileSnapshot=JSON.stringify(p);
  const ledgerSnapshot=(isCoupleMode()&&expenseEvents.length>0)?JSON.stringify(getLedger()?.expenses||[]):null;
  let expenseSaved=0,expenseSkipped=0;
  try{
    if(expenseEvents.length>0){
      if(!isCoupleMode()){
        expenseSkipped=expenseEvents.length;
      }else{
        const activePeriod=getActivePeriod();
        expenseEvents.forEach(ev=>{
          if(ev.amount>0&&ev.paidByProfileId){
            const exp=addExpense({
              amount:ev.amount,
              category:ev.categoryKey,
              merchant:ev.merchant,
              paidByProfileId:ev.paidByProfileId,
              occurredAt:ev.dateTime,
              note:ev.expenseNote||'',
              periodId:activePeriod?.id||null,
              source:'ai_voice'
            });
            if(exp) expenseSaved++;
          }
        });
      }
    }
    eventsToCommit.forEach(ev=>{
      const date=dateFromDateTimeValue(ev.dateTime);
      if(ev.type==='weight'){
        const manualBodyFat=Number(ev.bodyFat);
        const hasManual=Number.isFinite(manualBodyFat)&&manualBodyFat>=3&&manualBodyFat<=70;
        const estimated=hasManual?null:calcBodyFatPercent(ev.weight,p);
        p.weightRecords=p.weightRecords||[];
        p.weightRecords.push(withProfileId(p,{id:'w'+Date.now()+Math.random().toString(36).slice(2,7),date,dateTime:ev.dateTime,weight:ev.weight,bmi:calcBMI(ev.weight,p.height),bodyFat:hasManual?manualBodyFat:estimated,bodyFatSource:hasManual?'manual':(estimated?'estimated':'')}));
        p.weightRecords.sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
      }else if(ev.type==='food'){
        p.foodRecords=p.foodRecords||[];
        p.foodRecords.push(withProfileId(p,{id:'r'+Date.now()+Math.random().toString(36).slice(2,7),date,dateTime:ev.dateTime,meal:ev.meal,foods:ev.foods.map(f=>serializeFoodPortion(prepareFoodPortion(f)))}));
        invalidateHealthCoachDayCache(p, date);
      }else if(ev.type==='exercise'){
        p.exerciseRecords=p.exerciseRecords||[];
        const cal=calcExerciseCalories({name:ev.name,met:ev.met,inputType:'time'},ev.duration,p);
        p.exerciseRecords.push(withProfileId(p,{id:'ex'+Date.now()+Math.random().toString(36).slice(2,7),date,dateTime:ev.dateTime,name:ev.name,detail:`${ev.duration} 分钟`,calories:cal}));
      }else if(ev.type==='steps'){
        p.stepsRecords=p.stepsRecords||[];
        p.stepsRecords.push(withProfileId(p,{id:'st'+Date.now()+Math.random().toString(36).slice(2,7),date,dateTime:ev.dateTime,steps:ev.steps}));
      }else if(ev.type==='sleep'){
        p.sleepRecords=p.sleepRecords||[];
        p.sleepRecords.push(withProfileId(p,{id:'sl'+Date.now()+Math.random().toString(36).slice(2,7),date,dateTime:ev.dateTime,duration:ev.duration,quality:ev.quality||'normal'}));
      }else if(ev.type==='water'){
        p.waterRecords=p.waterRecords||[];
        p.waterRecords.push(withProfileId(p,{id:'wa'+Date.now()+Math.random().toString(36).slice(2,7),date,dateTime:ev.dateTime,amount:Math.round(Number(ev.amount)||0)}));
      }
    });
    draft.committed=true;
    if(!saveData()){
      Object.assign(p,JSON.parse(profileSnapshot));
      if(ledgerSnapshot){const lg=getLedger();if(lg)lg.expenses=JSON.parse(ledgerSnapshot);}
      draft.committed=false;
      return {success:false,error:'保存失败，请清理本地存储空间后重试'};
    }
    aiHealthDraft=null;
    if(refreshUI) renderAll();
    const totalCount=count+expenseSaved;
    if(showSuccessToast){
      let msg=`已保存${totalCount}条记录`;
      if(expenseSkipped>0) msg+=`，${expenseSkipped}条支出需双人模式`;
      showToast(msg,'success');
    }
    return {success:true,count:totalCount,healthSaved:count,expenseSaved,expenseSkipped};
  }catch(err){
    Object.assign(p,JSON.parse(profileSnapshot));
    if(ledgerSnapshot){const lg=getLedger();if(lg)lg.expenses=JSON.parse(ledgerSnapshot);}
    if(draft) draft.committed=false;
    console.error('[HealthDraftCommit]',err);
    showToast('保存失败，请重试','error');
    return {success:false,error:err?.message||'保存失败，请重试'};
  }finally{
    aiHealthSubmitting=false;
  }
}
function joinSpeechParts(parts){
  return parts.map(v=>String(v||'').trim()).filter(Boolean).join(' ');
}

function generateSparklineSVG(data){
  if(!data||data.length<2) return '';
  const W=100,H=42,sw=1.5;
  const min=Math.min(...data),max=Math.max(...data);
  const range=max-min||1;
  const pts=data.map((v,i)=>{
    const x=(i/(data.length-1))*W;
    const y=H-((v-min)/range)*(H-sw*2)-sw;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function getRecentWeightSparkData(p,limit=8){
  const records=getSortedWeights(p);
  if(records.length<2) return [];
  return records.slice(-limit).map(r=>r.weight);
}
function getRecentBMISparkData(p,limit=8){
  const records=getSortedWeights(p);
  if(records.length<2||!p.height) return [];
  return records.slice(-limit).map(r=>calcBMI(r.weight,p.height)).filter(v=>v!==null);
}
function getRecentBodyFatSparkData(p,limit=8){
  const records=getSortedWeights(p);
  const bodyFatRecords=records.filter(r=>r.bodyFat!==null&&r.bodyFat!==undefined);
  if(bodyFatRecords.length<2) return [];
  return bodyFatRecords.slice(-limit).map(r=>r.bodyFat);
}
function renderWeightCard(){
  const p=getActiveProfile();
  const title=document.querySelector('#weightCard .card-title');
  if(title) title.innerHTML=`<span class="title-label">${icon('scale')} 身体指标</span><span class="accent">${escapeHTML(getDisplayName(p))}</span>`;
  const dateEl=document.getElementById('weightDate');
  if(dateEl) dateEl.textContent=formatDate(currentViewDate);
  const latest=getLatestWeight(p);
  const prev=getPrevWeight(p);
  const bmi=latest?calcBMI(latest.weight,p.height):null;
  const bodyFat=latest?(latest.bodyFat||calcBodyFatPercent(latest.weight,p)):null;
  const cat=bmi?bmiCategory(bmi):null;

  const bfStatus=getBodyFatStatus(p);
  const delta=latest&&prev?+(latest.weight-prev.weight).toFixed(1):null;
  const hasPrev=!!prev;
  let deltaText,deltaNote,deltaCls;
  if(!latest){
    deltaText='—';deltaNote='暂无记录';deltaCls='';
  }else if(!hasPrev){
    deltaText='—';deltaNote=`记录不足 · 当前${latest.weight}kg`;deltaCls='';
  }else{
    deltaText=delta>0?`+${delta}kg`:delta<0?`${delta}kg`:'0kg';
    deltaCls=delta>0?'bad':delta<0?'good':'';
    deltaNote=`当前 ${latest.weight}kg`;
  }
  const bmiClsMap={under:'warn',normal:'good',over:'warn',obese:'bad'};
  const bfClsMap={negative:'warn',positive:'bad',met:'good'};
  const bmiSparkData=getRecentBMISparkData(p);
  const bfSparkData=getRecentBodyFatSparkData(p);
  const weightSparkData=getRecentWeightSparkData(p);
  const bmiSparkHTML=bmiSparkData.length>=2?`<div class="body-metric-sparkline bmi">${generateSparklineSVG(bmiSparkData)}</div>`:`<div class="body-metric-sparkline empty"><span class="body-metric-sparkline-empty">数据不足</span></div>`;
  const bfSparkHTML=bfSparkData.length>=2?`<div class="body-metric-sparkline bodyfat">${generateSparklineSVG(bfSparkData)}</div>`:`<div class="body-metric-sparkline empty"><span class="body-metric-sparkline-empty">数据不足</span></div>`;
  const weightSparkHTML=weightSparkData.length>=2?`<div class="body-metric-sparkline weight">${generateSparklineSVG(weightSparkData)}</div>`:`<div class="body-metric-sparkline empty"><span class="body-metric-sparkline-empty">数据不足</span></div>`;
  const bmiWrap=document.getElementById('bmiDisplay');
  if(bmiWrap){
    bmiWrap.innerHTML=`
      <div class="body-metric-grid">
        <div class="body-metric-card">
          <div class="body-metric-label">BMI</div>
          <div class="body-metric-value">${bmi||'--'}</div>
          <div class="body-metric-status ${bmiClsMap[cat?.cls]||''}">${cat?escapeHTML(cat.label):'请记录体重'}</div>
          ${bmiSparkHTML}
        </div>
        <div class="body-metric-card">
          <div class="body-metric-label">体脂${latest?.bodyFatSource==='estimated'?'(估)':''}</div>
          <div class="body-metric-value">${bodyFat?`${bodyFat}%`:'--'}</div>
          <div class="body-metric-status ${bfClsMap[bfStatus?.cls]||''}">${bfStatus?escapeHTML(bfStatus.label):'暂无标准范围'}</div>
          ${bfSparkHTML}
        </div>
        <div class="body-metric-card">
          <div class="body-metric-label">当前体重</div>
          <div class="body-metric-value">${latest?`${latest.weight}kg`:'--'}</div>
          <div class="body-metric-status">${latest?'当前记录':'请记录体重'}</div>
          ${weightSparkHTML}
        </div>
        <div class="body-metric-card">
          <div class="body-metric-label">较上次</div>
          <div class="body-metric-value">${escapeHTML(deltaText)}</div>
          <div class="body-metric-status ${deltaCls}">${escapeHTML(deltaNote)}</div>
          ${weightSparkHTML}
        </div>
      </div>`;
  }
  const statsWrap=document.getElementById('weightStats');
  if(statsWrap) statsWrap.innerHTML='';
  const bfStdWrap=document.getElementById('bodyFatStandard');
  if(bfStdWrap){
    if(bfStatus){
      const currentText=bfStatus.bodyFat?`当前 ${bfStatus.bodyFat}% · ${bfStatus.label}`:bfStatus.label;
      bfStdWrap.innerHTML=`<div class="bfstd-title">
        <span>标准体脂率范围</span><span>${bfStatus.range.min}~${bfStatus.range.max}%</span>
      </div>
      <div class="bfstd-note">${bfStatus.range.label} · ${currentText}</div>`;
    }else{
      bfStdWrap.innerHTML='';
    }
  }
  const goalWrap=document.getElementById('weightGoal');
  if(goalWrap) goalWrap.style.display='none';
  const historyWrap=document.getElementById('weightHistory');
  if(historyWrap) historyWrap.innerHTML='';
}

function renderNutritionCard(){
  const p=getActiveProfile();
  const nameEl=document.getElementById('nutritionProfileName');
  if(!nameEl) return;
  nameEl.textContent=getDisplayName(p);
  const intake=calcTodayIntake(p);
  const targets=calcNutrientTargets(p);
  const calorieStatus=getDailyCalorieStatus(p,currentViewDate);
  const burned=calorieStatus.recordedExerciseCalories;
  const intakeCalories=Math.round(intake.calories);
  const netCalories=calorieStatus.netCalories;
  const dynamicTarget=calorieStatus.dynamicCalorieTarget;
  const summaryDate=document.getElementById('dietSummaryDate');
  if(summaryDate) summaryDate.textContent=formatDate(currentViewDate);
  const summaryGrid=document.getElementById('dietSummaryGrid');
  if(summaryGrid){
    const summaryItems=[
      {label:'摄入热量',value:intakeCalories,unit:'kcal'},
      {label:'蛋白质',value:intake.protein,unit:'g'},
      {label:'碳水',value:intake.carbs,unit:'g'},
      {label:'脂肪',value:intake.fat,unit:'g'}
    ];
    summaryGrid.innerHTML=summaryItems.map(item=>`<div class="diet-summary-stat">
      <div class="ds-val">${item.value}</div>
      <div class="ds-label">${item.label} ${item.unit}</div>
    </div>`).join('');
  }

  // Calorie ring with gap target ring
  const ringWrap=document.getElementById('calorieRing');
  // 首页已经使用同一份 intake/targets 渲染紧凑概览；健康页不再保留重复圆环。
  if(!ringWrap) return;
  if(targets&&dynamicTarget>0){
    const pct=Math.min(intakeCalories/dynamicTarget,1);
    const r=48,circum=2*Math.PI*r;
    const offset=circum*(1-pct);

    // Gap target follows the unified dynamic calorie budget.
    const gapCalories=Math.max(0,calorieStatus.remainingCalories);
    const gapPct=Math.min(gapCalories/dynamicTarget,1);
    const gapR=38,gapCircum=2*Math.PI*gapR;
    const gapOffset=gapCircum*(1-gapPct);

    ringWrap.innerHTML=`
      <svg class="calorie-ring-svg" width="120" height="120" viewBox="0 0 120 120" aria-label="摄入热量 ${intakeCalories} kcal">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4af37"/>
            <stop offset="100%" stop-color="#ffd700"/>
          </linearGradient>
          <linearGradient id="gapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4ade80" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#22c55e" stop-opacity="0.3"/>
          </linearGradient>
        </defs>
        <g transform="rotate(-90 60 60)">
          <!-- Outer track -->
          <circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="7"/>
          <!-- Outer ring: food intake / daily calorie target -->
          <circle cx="60" cy="60" r="${r}" fill="none" stroke="url(#goldGrad)" stroke-width="7"
            stroke-dasharray="${circum}" stroke-dashoffset="${offset}" stroke-linecap="round"
            style="transition:stroke-dashoffset .8s ease"/>
          <!-- Inner track -->
          <circle cx="60" cy="60" r="${gapR}" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="5"/>
          <!-- Inner ring: gap target recommendation -->
          <circle cx="60" cy="60" r="${gapR}" fill="none" stroke="url(#gapGrad)" stroke-width="5"
            stroke-dasharray="${gapCircum}" stroke-dashoffset="${gapOffset}" stroke-linecap="round"
            style="transition:stroke-dashoffset .8s ease"/>
        </g>
        <text class="calorie-svg-main" x="60" y="63.5">
          <tspan class="calorie-svg-num">${intakeCalories}</tspan><tspan class="calorie-svg-unit" dx="3">kcal</tspan>
        </text>
        <text class="calorie-svg-caption" x="60" y="83">摄入</text>
      </svg>`;
    // Sub-text below the ring (outside the SVG, no overlap)
    const subEl=ringWrap.parentElement.querySelector('.nutrition-sub');
    if(subEl){
      const pctRound=Math.round(pct*100);
      const budgetParts=calorieStatus.exerciseCalories>0?`基础${calorieStatus.baseCalorieTarget} + 运动${calorieStatus.exerciseCalories}`:`基础目标${calorieStatus.baseCalorieTarget}`;
      subEl.textContent=`动态目标${dynamicTarget} (${budgetParts}) · 完成度${pctRound}% · 运动记录${burned}kcal · 净摄入${netCalories}kcal`;
    }
  }else{
    // targets=null（资料不完整导致 TDEE 算不出）。
    // 即使如此，也要如实显示已摄入热量，不要让用户看到 "--" 误以为没记录。
    if(intakeCalories>0){
      ringWrap.innerHTML=`<svg class="calorie-ring-svg" width="120" height="120" viewBox="0 0 120 120" aria-label="摄入热量 ${intakeCalories} kcal">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4af37"/>
            <stop offset="100%" stop-color="#ffd700"/>
          </linearGradient>
        </defs>
        <g transform="rotate(-90 60 60)">
          <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="7"/>
          <circle cx="60" cy="60" r="48" fill="none" stroke="url(#goldGrad)" stroke-width="7"
            stroke-dasharray="${2*Math.PI*48}" stroke-dashoffset="0" stroke-linecap="round"/>
        </g>
        <text class="calorie-svg-main" x="60" y="63.5">
          <tspan class="calorie-svg-num">${intakeCalories}</tspan><tspan class="calorie-svg-unit" dx="3">kcal</tspan>
        </text>
        <text class="calorie-svg-caption" x="60" y="83">已摄入</text>
      </svg>`;
    }else{
      ringWrap.innerHTML=`<svg class="calorie-ring-svg" width="120" height="120" viewBox="0 0 120 120"><text class="calorie-svg-main" x="60" y="63.5"><tspan class="calorie-svg-num" style="opacity:.35">--</tspan></text><text class="calorie-svg-caption" x="60" y="83">暂无记录</text></svg>`;
    }
    const subEl=ringWrap.parentElement.querySelector('.nutrition-sub');
    if(subEl){
      const missing=getMissingNutrientCalcFields(p);
      if(missing.length){
        subEl.innerHTML=`<span style="color:var(--amber)">未设置资料：${missing.join('、')}</span> · <a href="#" id="openSettingsFromHint" style="color:var(--gold-l);text-decoration:underline">去设置</a>`;
        const openBtn=subEl.querySelector('#openSettingsFromHint');
        if(openBtn) openBtn.addEventListener('click',(e)=>{e.preventDefault();openProfileSettings()});
      }else{
        subEl.textContent='';
      }
    }
  }

  // Nutrient bars
  const barsWrap=document.getElementById('nutritionBars');
  if(targets){
    const nutrients=[
      {key:'carbs',label:'碳水',val:intake.carbs,tgt:targets.carbs,unit:'g',cls:'carbs'},
      {key:'protein',label:'蛋白质',val:intake.protein,tgt:targets.protein,unit:'g',cls:'protein'},
      {key:'fat',label:'脂肪',val:intake.fat,tgt:targets.fat,unit:'g',cls:'fat'},
      {key:'fiber',label:'纤维',val:intake.fiber,tgt:targets.fiber,unit:'g',cls:'fiber'},
    ];
    const barsHTML=nutrients.map(n=>{
      const pct=Math.min(n.val/n.tgt*100,100);
      return `<div class="nbar ${n.cls}">
        <div class="nlabel">${n.label}</div>
        <div class="ntrack"><div class="nfill" style="width:${pct}%"></div></div>
        <div class="nval">${n.val}/${n.tgt}${n.unit}<br><span class="pct">${Math.round(pct)}%</span></div>
      </div>`;
    }).join('');
    barsWrap.innerHTML=barsHTML;
  }else{
    // 即便 targets=null，也要如实显示实际摄入，不要让进度条消失
    const hasAnyIntake=(intake.carbs||0)+(intake.protein||0)+(intake.fat||0)+(intake.fiber||0)>0;
    if(hasAnyIntake){
      const nutrients=[
        {label:'碳水',val:intake.carbs,unit:'g',cls:'carbs'},
        {label:'蛋白质',val:intake.protein,unit:'g',cls:'protein'},
        {label:'脂肪',val:intake.fat,unit:'g',cls:'fat'},
        {label:'纤维',val:intake.fiber,unit:'g',cls:'fiber'},
      ];
      barsWrap.innerHTML=nutrients.map(n=>`<div class="nbar ${n.cls}">
        <div class="nlabel">${n.label}</div>
        <div class="ntrack"><div class="nfill" style="width:0%"></div></div>
        <div class="nval">${n.val}${n.unit}<br><span class="pct" style="color:var(--txt3)">未设目标</span></div>
      </div>`).join('');
    }else{
      const missing=getMissingNutrientCalcFields(p);
      const hint=missing.length?`请先在 设置 → 个人资料 中填写：${missing.join('、')}`:'请在 设置 → 个人资料 中填写资料';
      barsWrap.innerHTML=`<div style="color:var(--txt3);font-size:12px;text-align:center;padding:20px 0"><a href="#" id="openSettingsFromBars" style="color:var(--gold-l);text-decoration:underline">${escapeHTML(hint)}</a></div>`;
      const openBtn=barsWrap.querySelector('#openSettingsFromBars');
      if(openBtn) openBtn.addEventListener('click',(e)=>{e.preventDefault();openProfileSettings()});
    }
  }

  // Calorie gap/surplus recommendation belongs to Today's Nutrition Overview
  const adviceWrap=document.getElementById('nutritionAdvice');
  if(adviceWrap){
    const calorieAdvice=calcCalorieGapRecommendation(p);
    if(calorieAdvice){
      adviceWrap.innerHTML=`<div class="advice-title">
        <span>${calorieAdvice.label}</span><span>${calorieAdvice.range}</span>
      </div>
      <div class="advice-note">${calorieAdvice.note}</div>`;
    }else{
      adviceWrap.innerHTML='';
    }
  }
}

function renderFoodLog(){
  const p=getActiveProfile();
  const dateEl=document.getElementById('foodLogDate');
  const listWrap=document.getElementById('foodLogList');
  if(!dateEl||!listWrap) return;
  dateEl.textContent=formatDate(currentViewDate);
  const foods=getTodayFoods(p);

  if(foods.length===0){
    listWrap.innerHTML='<div class="log-empty">所选日期暂无饮食记录</div>';
    return;
  }

  const mealNames={breakfast:'早餐',lunch:'午餐',dinner:'晚餐',snack:'加餐'};
  const mealOrder=['breakfast','lunch','dinner','snack'];
  let html='';
  let totalCal=0;

  mealOrder.forEach(meal=>{
    const mealFoods=foods.filter(f=>f.meal===meal);
    if(mealFoods.length===0) return;
    let mealCal=0;
    let itemsHTML=mealFoods.map(r=>{
      let rCal=0,rCarb=0,rPro=0,rFat=0;
      r.foods.forEach(f=>{
        const n=getFoodActualNutrition(f);
        rCal+=n.calories;
        rCarb+=n.carbs;
        rPro+=n.protein;
        rFat+=n.fat;
      });
      mealCal+=rCal;
      totalCal+=rCal;
      return `<div class="log-item">
        <div class="li-left">
          <div class="li-name">${r.foods.map(f=>f.amount!==undefined?`${f.name} ${roundFoodValue(f.amount,1)}g`:`${f.name}×${f.quantity||1}`).join(', ')}</div>
          <div class="li-nutri">碳水${rCarb.toFixed(0)}g · 蛋白${rPro.toFixed(0)}g · 脂肪${rFat.toFixed(0)}g · ${formatDateTime(r.dateTime||`${r.date}T00:00`)}</div>
        </div>
        <div class="li-right">
          <div class="li-cal">${Math.round(rCal)} kcal</div>
          <button class="li-edit" data-rid="${r.id}" title="编辑这条饮食记录">${icon('edit')}</button>
          <button class="li-del health-record-delete" data-rid="${r.id}" type="button" aria-label="删除">${icon('x')}</button>
        </div>
      </div>`;
    }).join('');
    html+=`<div class="meal-group">
      <div class="meal-group-header">${mealNames[meal]} <span class="meal-cal">${Math.round(mealCal)} kcal</span></div>
      ${itemsHTML}
    </div>`;
  });

  html+=`<div class="log-total">
    <span class="lt-label">所选日期总计</span>
    <span class="lt-val">${Math.round(totalCal)} kcal</span>
  </div>`;
  listWrap.innerHTML=html;

  listWrap.querySelectorAll('.li-edit').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const rid=btn.dataset.rid;
      const record=(p.foodRecords||[]).find(r=>r.id===rid);
      if(!record) return;
      openFoodEditor(e.currentTarget,p,record);
    });
  });

  listWrap.querySelectorAll('.li-del').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!requireEditableHealthProfile(p)) return;
      if(!confirm('确定删除这条饮食记录吗？')) return;
      const rid=btn.dataset.rid;
      const record=(p.foodRecords||[]).find(r=>r.id===rid);
      const recDate=record?getRecordDate(record):currentViewDate;
      addDeletedRecord('food',rid);
      p.foodRecords=p.foodRecords.filter(r=>r.id!==rid);
      saveData();
      invalidateHealthCoachDayCache(p, recDate);
      renderDashboard();
      showToast('已删除一条记录','info');
    });
  });
}

function renderExerciseCard(){
  const p=getActiveProfile();
  const nameEl=document.getElementById('exerciseProfileName');
  if(nameEl) nameEl.textContent=getDisplayName(p);
  const content=document.getElementById('exerciseContent');
  if(!content) return;
  const exercises=getTodayExercises(p);
  const burned=calcTodayBurnedCalories(p);
  const tdee=calcTDEE(p);

  const managementHTML=`
    <div class="exercise-summary">
      <div class="ex-summary-info" style="width:100%">
        <div class="si-row"><span class="si-label">所选日期消耗</span><span class="si-val">${burned} kcal</span></div>
        <div class="si-row"><span class="si-label">运动次数</span><span class="si-val">${exercises.length} 次</span></div>
        <div class="si-row"><span class="si-label">每日热量目标</span><span class="si-val">${tdee||'--'} kcal</span></div>
      </div>
    </div>
    <div class="record-management-list-head"><span>所选日期记录</span><span>${formatDate(currentViewDate)}</span></div>
    <div class="ex-list">
      ${exercises.length?exercises.map(e=>`<div class="ex-item">
        <div>
          <div class="exi-name">${escapeHTML(e.name)}</div>
          <div class="exi-detail">${escapeHTML(e.detail)} · ${formatDateTime(e.dateTime||`${e.date}T00:00`)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="exi-cal">-${Number(e.calories)||0} kcal</span>
          <button class="exi-edit" data-id="${escapeHTML(e.id)}" title="编辑这条运动记录">${icon('edit')}</button>
          <button class="exi-del health-record-delete" data-id="${escapeHTML(e.id)}" type="button" title="删除这条运动记录" aria-label="删除">${icon('x')}</button>
        </div>
      </div>`).join(''):'<div class="ex-empty">所选日期暂无运动记录</div>'}
    </div>`;
  content.innerHTML=managementHTML;
  content.querySelectorAll('.exi-edit').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const record=(p.exerciseRecords||[]).find(item=>item.id===btn.dataset.id);
      if(record) openExerciseEditor(e.currentTarget,p,record);
    });
  });
  content.querySelectorAll('.exi-del').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!requireEditableHealthProfile(p)||!confirm('确定删除这条运动记录吗？')) return;
      addDeletedRecord('exercise',btn.dataset.id);
      p.exerciseRecords=(p.exerciseRecords||[]).filter(item=>item.id!==btn.dataset.id);
      saveData();renderDashboard();showToast('已删除一条运动记录','info');
    });
  });
  return;

  // Calorie ring
  const ringMax=tdee||2000;
  const pct=Math.min(burned/ringMax,1);
  const r=30,circum=2*Math.PI*r;
  const offset=circum*(1-pct);

  let html=`
    <div class="exercise-summary">
      <div class="ex-cal-ring">
        <svg width="70" height="70">
          <circle cx="35" cy="35" r="${r}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="5"/>
          <circle cx="35" cy="35" r="${r}" fill="none" stroke="#4ade80" stroke-width="5"
            stroke-dasharray="${circum}" stroke-dashoffset="${offset}" stroke-linecap="round"
            style="transition:stroke-dashoffset .8s ease"/>
        </svg>
        <div class="ex-cal-center">
          <div class="num">${burned}</div>
          <div class="lbl">kcal</div>
        </div>
      </div>
      <div class="ex-summary-info">
        <div class="si-row"><span class="si-label">所选日期消耗</span><span class="si-val">${burned} kcal</span></div>
        <div class="si-row"><span class="si-label">每日热量目标</span><span class="si-val">${tdee||'--'} kcal</span></div>
        <div class="si-row"><span class="si-label">运动次数</span><span class="si-val">${exercises.length} 次</span></div>
      </div>
    </div>
    <div class="ex-input-group">
      <div class="ex-custom-select" id="exCustomSelect">
        <span class="ecs-label" id="exLabel">步行</span>
        <span class="ecs-arrow">▼</span>
        <div class="ex-dropdown" id="exDropdown">
          <div class="ex-search-wrap">
            <input type="text" class="ex-search-input" id="exerciseSearch" placeholder="搜索运动名称…">
          </div>
          <div id="exOptions">
            ${EXERCISE_DB.map((e,i)=>`<div class="ex-option" data-source="local" data-idx="${i}" data-name="${e.name}">
              <span>${e.name}</span>
              <span class="eo-met">${e.inputType==='steps'?'按步数':'MET '+e.met}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
      <input type="number" class="ex-num-input" id="exDuration" placeholder="30" min="1" value="30">
      <span class="ex-unit-label" id="exUnit">分钟</span>
      <button class="ex-add-btn" id="addExBtn">${editingExerciseId?'保存':'添加'}</button>
    </div>
    <div class="time-picker" id="exerciseTimePicker" aria-label="运动记录时间"></div>
    <div class="ex-est" id="exEst"></div>
    <div class="ex-list">`;

  if(exercises.length===0){
    html+='<div class="ex-empty">所选日期暂无运动记录</div>';
  }else{
    exercises.forEach(e=>{
      html+=`<div class="ex-item">
        <div>
          <div class="exi-name">${e.name}</div>
          <div class="exi-detail">${e.detail} · ${formatDateTime(e.dateTime||`${e.date}T00:00`)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="exi-cal">-${e.calories} kcal</span>
          <button class="exi-edit" data-id="${e.id}" title="编辑这条运动记录">${icon('edit')}</button>
          <button class="exi-del health-record-delete" data-id="${e.id}" type="button" aria-label="删除">${icon('x')}</button>
        </div>
      </div>`;
    });
  }
  html+='</div>';
  content.innerHTML=html;
  setupTimePicker('exerciseTime',currentViewDateTime());

  // Custom dropdown logic
  const exSelect=document.getElementById('exCustomSelect');
  const exDropdown=document.getElementById('exDropdown');
  const exOptions=document.getElementById('exOptions');
  const exerciseSearch=document.getElementById('exerciseSearch');
  const exLabel=document.getElementById('exLabel');
  const exDuration=document.getElementById('exDuration');
  const exUnit=document.getElementById('exUnit');
  const exEst=document.getElementById('exEst');
  document.querySelectorAll('body > #exDropdown').forEach(el=>{if(el!==exDropdown) el.remove()});
  if(exDropdown&&exDropdown.parentElement!==document.body) document.body.appendChild(exDropdown);
  const exerciseLockToken='exercise-dropdown';
  let currentExercise=EXERCISE_DB[0]; // default: first
  let currentAIExercise=null;

  function renderExerciseOptions(list){
    currentAIExercise=null;
    if(!list.length){
      exOptions.innerHTML='<div class="ex-search-message">未找到相关运动</div>';
      return;
    }
    exOptions.innerHTML=list.map(e=>{
      const idx=EXERCISE_DB.indexOf(e);
      return `<div class="ex-option" data-source="local" data-idx="${idx}" data-name="${escapeHTML(e.name)}">
        <span>${escapeHTML(e.name)}</span>
        <span class="eo-met">${e.inputType==='steps'?'按步数':'MET '+e.met}</span>
      </div>`;
    }).join('');
    bindExerciseOptions();
    markSelected(currentExercise.name);
  }
  function renderAIExerciseOption(exercise,fromCache=false){
    currentAIExercise=normalizeAIExercise(exercise);
    if(!currentAIExercise){
      exOptions.innerHTML='<div class="ex-search-message">没有找到可靠的运动信息，请尝试输入更具体的运动名称</div>';
      return;
    }
    exOptions.innerHTML=`<div class="ex-search-message" style="color:var(--gold)">✨ AI 搜索结果${fromCache?'（缓存）':''}</div>
      <div class="ex-option" data-source="ai" data-name="${escapeHTML(currentAIExercise.name)}">
        <span>${escapeHTML(currentAIExercise.name)}</span>
        <span class="eo-tag">AI</span>
        <span class="eo-met">MET ${currentAIExercise.met}</span>
      </div>`;
    bindExerciseOptions();
  }
  function renderExerciseMessage(message,isError=false){
    currentAIExercise=null;
    exOptions.innerHTML=`<div class="ex-search-message" style="${isError?'color:var(--red)':''}">${message}</div>`;
  }
  function selectExercise(exercise){
    currentExercise=exercise;
    exLabel.textContent=currentExercise.name;
    exDuration.value=currentExercise.defaultVal;
    exUnit.textContent=currentExercise.inputType==='steps'?'步数':'分钟';
    markSelected(currentExercise.name);
    exSelect.classList.remove('open');
    exDropdown.classList.remove('open','drop-up');
    GlassScrollLock.unlock(exerciseLockToken);
    document.getElementById('exerciseCard').classList.remove('dropdown-open');
    updateExEst();
  }
  function bindExerciseOptions(){
    exOptions.querySelectorAll('.ex-option').forEach(opt=>{
      opt.addEventListener('click',e=>{
        e.stopPropagation();
        const source=opt.dataset.source;
        const exercise=source==='ai'?currentAIExercise:EXERCISE_DB[+opt.dataset.idx];
        if(!exercise) return;
        selectExercise(exercise);
      });
    });
  }
  function markSelected(name){
    exDropdown.querySelectorAll('.ex-option').forEach(o=>{
      o.classList.toggle('selected',o.dataset.name===name);
    });
  }
  function positionExerciseDropdown(){
    const rect=exSelect.getBoundingClientRect();
    const viewportGap=12;
    const gap=10;
    const maxAllowedWidth=window.innerWidth-viewportGap*2;
    const isSmall=window.matchMedia('(max-width: 640px)').matches;
    const width=Math.min(maxAllowedWidth,Math.max(rect.width,isSmall?280:260));
    const maxHeight=Math.min(isSmall?Math.floor(window.innerHeight*.48):320,window.innerHeight-viewportGap*2);
    const spaceBelow=window.innerHeight-rect.bottom-viewportGap;
    const spaceAbove=rect.top-viewportGap;
    exSelect.classList.remove('drop-up');
    exDropdown.classList.remove('drop-up');
    exDropdown.style.visibility='hidden';
    exDropdown.style.width=`${width}px`;
    exDropdown.style.maxHeight=`${maxHeight}px`;
    exDropdown.style.left='0px';
    exDropdown.style.top='0px';
    const naturalHeight=Math.min(exDropdown.scrollHeight||maxHeight,maxHeight);
    const shouldDropUp=spaceBelow<naturalHeight+gap&&spaceAbove>spaceBelow;
    const availableSpace=(shouldDropUp?spaceAbove:spaceBelow)-gap;
    const finalMaxHeight=Math.max(120,Math.min(maxHeight,availableSpace));
    exDropdown.style.maxHeight=`${finalMaxHeight}px`;
    const measuredHeight=Math.min(exDropdown.scrollHeight||finalMaxHeight,finalMaxHeight);
    let top=rect.bottom+gap;
    if(shouldDropUp){
      top=Math.max(viewportGap,rect.top-measuredHeight-gap);
      exSelect.classList.add('drop-up');
      exDropdown.classList.add('drop-up');
    }
    let left=rect.left+rect.width/2-width/2;
    left=Math.min(Math.max(viewportGap,left),window.innerWidth-width-viewportGap);
    top=Math.max(viewportGap,top);
    exDropdown.style.left=`${left}px`;
    exDropdown.style.top=`${top}px`;
    exDropdown.style.visibility='';
  }
  markSelected(currentExercise.name);
  bindExerciseOptions();

  exSelect.addEventListener('click',e=>{
    exSelect.classList.toggle('open');
    exDropdown.classList.toggle('open',exSelect.classList.contains('open'));
    document.getElementById('exerciseCard').classList.toggle('dropdown-open',exSelect.classList.contains('open'));
    if(exSelect.classList.contains('open')){
      GlassScrollLock.lock(exerciseLockToken);
      positionExerciseDropdown();
      requestAnimationFrame(positionExerciseDropdown);
    }else{
      GlassScrollLock.unlock(exerciseLockToken);
    }
  });
  exerciseSearch.addEventListener('click',e=>e.stopPropagation());
  exerciseSearch.addEventListener('input',e=>{
    const rawQuery=e.target.value.trim();
    const q=rawQuery.toLowerCase();
    cancelPendingExerciseSearch();
    if(!rawQuery){
      renderExerciseOptions(EXERCISE_DB);
      if(exSelect.classList.contains('open')) positionExerciseDropdown();
      return;
    }
    const localResults=findLocalExercises(q);
    if(localResults.length>0){
      renderExerciseOptions(localResults);
      if(exSelect.classList.contains('open')) positionExerciseDropdown();
      return;
    }
    if(q.length<2){
      renderExerciseMessage('未找到相关运动');
      if(exSelect.classList.contains('open')) positionExerciseDropdown();
      return;
    }
    const cached=getCachedAIExercise(rawQuery);
    if(cached){
      renderAIExerciseOption(cached,true);
      if(exSelect.classList.contains('open')) positionExerciseDropdown();
      return;
    }
    const requestId=aiExerciseSearchRequestId;
    renderExerciseMessage('AI 正在搜索运动…');
    if(exSelect.classList.contains('open')) positionExerciseDropdown();
    aiExerciseSearchTimer=setTimeout(async()=>{
      if(requestId!==aiExerciseSearchRequestId||exerciseSearch.value.trim().toLowerCase()!==q) return;
      try{
        const aiExercise=await searchExerciseWithAI(rawQuery);
        if(requestId!==aiExerciseSearchRequestId||exerciseSearch.value.trim().toLowerCase()!==q) return;
        if(!aiExercise){
          renderExerciseMessage('没有找到可靠的运动信息，请尝试输入更具体的运动名称');
          if(exSelect.classList.contains('open')) positionExerciseDropdown();
          return;
        }
        setCachedAIExercise(rawQuery,aiExercise);
        renderAIExerciseOption(aiExercise,false);
        if(exSelect.classList.contains('open')) positionExerciseDropdown();
      }catch(err){
        if(requestId!==aiExerciseSearchRequestId||exerciseSearch.value.trim().toLowerCase()!==q) return;
        console.error('AI exercise search error:',err);
        renderExerciseMessage('AI搜索暂时不可用，请稍后重试',true);
        if(exSelect.classList.contains('open')) positionExerciseDropdown();
      }
    },650);
  });
  // Close dropdown on outside click
  document.addEventListener('click',e=>{
    if(!e.target.closest?.('#exCustomSelect')&&!e.target.closest?.('#exDropdown')){
      exSelect.classList.remove('open');
      exDropdown.classList.remove('open','drop-up');
      GlassScrollLock.unlock(exerciseLockToken);
      document.getElementById('exerciseCard').classList.remove('dropdown-open');
    }
  });
  const repositionExerciseDropdown=()=>{
    if(exSelect.classList.contains('open')) positionExerciseDropdown();
  };
  window.addEventListener('resize',repositionExerciseDropdown,{passive:true});
  window.addEventListener('scroll',repositionExerciseDropdown,true);

  function updateExEst(){
    const type=currentExercise.inputType;
    const val=+exDuration.value||0;
    if(type==='steps'){
      exUnit.textContent='步数';
      const cal=calcStepsCalories(val,p);
      exEst.textContent=`预计消耗约 ${cal} kcal`;
    }else{
      exUnit.textContent='分钟';
      const cal=calcExerciseCalories(currentExercise,val,p);
      exEst.textContent=`预计消耗约 ${cal} kcal`;
    }
  }
  exDuration.addEventListener('input',updateExEst);
  updateExEst();

  document.getElementById('addExBtn').addEventListener('click',()=>{
    const val=+exDuration.value;
    const dateTime=normalizeDateTime(getTimePickerValue('exerciseTime'));
    if(saveExerciseRecordEntry(currentExercise,val,dateTime,{editingId:editingExerciseId,profile:p})){
      resetTimePicker('exerciseTime');
    }
  });

  content.querySelectorAll('.exi-edit').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const id=btn.dataset.id;
      const record=(p.exerciseRecords||[]).find(e=>e.id===id);
      if(!record) return;
      openExerciseEditor(e.currentTarget,p,record);
    });
  });

  content.querySelectorAll('.exi-del').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!requireEditableHealthProfile(p)) return;
      if(!confirm('确定删除这条运动记录吗？')) return;
      const id=btn.dataset.id;
      addDeletedRecord('exercise',id);
      p.exerciseRecords=p.exerciseRecords.filter(e=>e.id!==id);
      saveData();
      renderDashboard();
      showToast('已删除一条运动记录','info');
    });
  });
}

function renderWaterCard(){
  const p=getActiveProfile();
  const nameEl=document.getElementById('waterProfileName');
  if(nameEl) nameEl.textContent=getDisplayName(p);
  const wrap=document.getElementById('waterContent');
  if(!wrap) return;
  p.waterRecords=p.waterRecords||[];
  const todayTotal=getTodayWaterTotal(p);
  const goal=calculateDailyWaterGoal(p);
  const percent=goal?Math.min(Math.round(todayTotal/goal*100),999):0;
  const ringPercent=Math.min(percent,100);
  const remaining=Math.max(goal-todayTotal,0);
  const advice=remaining>0?`还差 ${formatWaterAmount(remaining)}`:'今日饮水已达标 💧';
  const adviceClass=remaining>0?'':'done';
  const todayRecords=getTodayWaterRecords(p).slice().sort((a,b)=>getRecordTime(b).localeCompare(getRecordTime(a)));
  const start=getMonday(currentViewDate);
  const weekDays=Array.from({length:7},(_,i)=>addDays(start,i));
  wrap.innerHTML=`
    <div class="water-summary">
      <div class="water-ring" style="--water-progress:${ringPercent}%">
        <div class="water-ring-inner">
          <div class="water-ring-val">${percent}%</div>
          <div class="water-ring-label">完成</div>
        </div>
      </div>
      <div>
        <div class="water-main-stat">${todayTotal.toLocaleString()} <span>/ ${goal.toLocaleString()} ml</span></div>
        <div class="water-goal-line">今日目标：<strong>${goal.toLocaleString()} ml</strong></div>
        <div class="water-goal-line">今日已喝：<strong>${todayTotal.toLocaleString()} ml</strong></div>
        <div class="water-advice ${adviceClass}">${advice}</div>
      </div>
    </div>
    <div class="water-history-title">
      <span>所选日期记录</span>
      <span>${todayRecords.length?`${todayRecords.length} 条`:''}</span>
    </div>
    <div class="health-record-list">
      ${todayRecords.length?todayRecords.map(r=>`<div class="health-record-item">
        <div><strong>${formatWaterAmount(r.amount)}</strong><div class="hr-time">${formatDateTime(r.dateTime||`${r.date}T00:00`)}</div></div>
        <div class="health-record-actions">
          <button class="hr-edit water-edit" data-id="${escapeHTML(r.id)}" type="button" title="编辑饮水记录">${icon('edit')}</button>
          <button class="hr-del water-del health-record-delete" data-id="${escapeHTML(r.id)}" type="button" aria-label="删除">${icon('x')}</button>
        </div>
      </div>`).join(''):'<div class="ex-empty">所选日期暂无饮水记录</div>'}
    </div>
    <div class="water-history-title"><span>本周饮水趋势</span><span>${formatWaterAmount(goal)}/日</span></div>
    <div class="water-week">
      ${weekDays.map(date=>{
        const total=getDateWaterRecords(p,date).reduce((sum,r)=>sum+(Number(r.amount)||0),0);
        const h=Math.min(Math.round(total/goal*100),100);
        return `<div class="water-day" title="${formatDateTitle(date)} · ${formatWaterAmount(total)}">
          <div class="water-day-bar"><div class="water-day-fill" style="--h:${h}%"></div></div>
          <div class="water-day-label">${formatDateShort(date)}</div>
        </div>`;
      }).join('')}
    </div>
  `;
  wrap.querySelectorAll('.water-edit').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const record=(p.waterRecords||[]).find(item=>item.id===btn.dataset.id);
      if(record) openWaterEditor(e.currentTarget,p,record);
    });
  });
  wrap.querySelectorAll('.water-del').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!requireEditableHealthProfile(p)) return;
      if(!confirm('确定删除这条饮水记录吗？')) return;
      addDeletedRecord('water',btn.dataset.id);
      p.waterRecords=(p.waterRecords||[]).filter(r=>r.id!==btn.dataset.id);
      saveData();
      renderDashboard();
      showToast('已删除一条饮水记录','info');
    });
  });
}

function addWaterRecord(amount,dateTime=currentViewDateTime()){
  if(!requireCurrentDeviceOwnerForHealthWrite()) return;
  const p=getHealthWriteProfile();
  const n=Math.round(Number(amount)||0);
  if(!n||n<1||n>10000){
    showToast('请输入有效饮水量','error');
    return;
  }
  const dt=normalizeDateTime(dateTime);
  p.waterRecords=p.waterRecords||[];
  p.waterRecords.push(withProfileId(p,{
    id:'wa'+Date.now()+Math.random().toString(36).slice(2,7),
    date:dateFromDateTimeValue(dt),
    dateTime:dt,
    amount:n
  }));
  saveData();
  renderDashboard();
  showToast(`已记录饮水 ${n}ml`,'success');
}

function saveStepsRecordEntry(steps,dateTime,{editingId=null,profile=null}={}){
  if(!requireCurrentDeviceOwnerForHealthWrite()) return false;
  const targetProfile=editingId?(profile||getActiveProfile()):getHealthWriteProfile();
  if(editingId&&!requireEditableHealthProfile(targetProfile)) return false;
  const value=parseInt(steps);
  if(!value||value<0){
    showToast('请输入有效步数','error');
    return false;
  }
  const normalizedDateTime=normalizeDateTime(dateTime||currentViewDateTime());
  targetProfile.stepsRecords=targetProfile.stepsRecords||[];
  const payload=withProfileId(targetProfile,{
    date:dateFromDateTimeValue(normalizedDateTime),
    dateTime:normalizedDateTime,
    steps:value
  });
  const wasEditing=!!editingId;
  if(editingId){
    const record=targetProfile.stepsRecords.find(item=>item.id===editingId);
    if(record) Object.assign(record,payload);
    else targetProfile.stepsRecords.push(withProfileId(targetProfile,{id:editingId,...payload}));
  }else{
    targetProfile.stepsRecords.push(withProfileId(targetProfile,{
      id:'st'+Date.now()+Math.random().toString(36).substr(2,5),
      ...payload
    }));
  }
  saveData();
  if(editingId===editingStepsId) editingStepsId=null;
  renderDashboard();
  showToast(`${wasEditing?'已更新':'已记录'} ${value.toLocaleString()} 步`,'success');
  return true;
}
function saveSleepRecordEntry({startTime,endTime,referenceDate,quality},{editingId=null,profile=null}={}){
  if(!requireCurrentDeviceOwnerForHealthWrite()) return false;
  const targetProfile=editingId?(profile||getActiveProfile()):getHealthWriteProfile();
  if(editingId&&!requireEditableHealthProfile(targetProfile)) return false;
  if(!endTime){
    showToast('请选择睡眠结束时间','error');
    return false;
  }
  const range=inferSleepRange(startTime||'23:00',endTime,referenceDate||currentViewDate);
  if(range.duration<=0||range.duration>1440){
    showToast('睡眠开始和结束时间不合理','error');
    return false;
  }
  targetProfile.sleepRecords=targetProfile.sleepRecords||[];
  const payload=withProfileId(targetProfile,{
    date:range.endDate,
    dateTime:range.startDateTime,
    duration:range.duration,
    quality:quality||'normal',
    startDate:range.startDate,
    startTime:range.startTime,
    endDate:range.endDate,
    endTime:range.endTime,
    endDateTime:range.endDateTime
  });
  const wasEditing=!!editingId;
  if(editingId){
    const record=targetProfile.sleepRecords.find(item=>item.id===editingId);
    if(record) Object.assign(record,payload);
    else targetProfile.sleepRecords.push(withProfileId(targetProfile,{id:editingId,...payload}));
  }else{
    targetProfile.sleepRecords.push(withProfileId(targetProfile,{
      id:'sl'+Date.now()+Math.random().toString(36).substr(2,5),
      ...payload
    }));
  }
  saveData();
  if(editingId===editingSleepId) editingSleepId=null;
  renderDashboard();
  showToast(`${wasEditing?'已更新':'已记录'}睡眠 ${formatSleepDuration(range.duration)}`,'success');
  return true;
}

let activeRecordDetailType='';
const HEALTH_RECORD_TYPES=[
  {type:'food',icon:'utensils',title:'饮食记录',sub:'早午晚加餐'},
  {type:'exercise',icon:'activity',title:'运动记录',sub:'次数时长消耗'},
  {type:'weight',icon:'scale',title:'体重记录',sub:'体重BMI体脂'},
  {type:'sleep',icon:'moon',title:'睡眠记录',sub:'入睡起床质量'},
  {type:'water',icon:'droplet',title:'饮水记录',sub:'明细与趋势'},
  {type:'steps',icon:'footprints',title:'步数记录',sub:'步数与时间'}
];
function getDateWeightRecords(p,date=currentViewDate){
  return (p.weightRecords||[]).filter(r=>getRecordDate(r)===date).sort((a,b)=>getRecordTime(b).localeCompare(getRecordTime(a)));
}
function getRecordManagementCount(type,p){
  if(!p) return 0;
  if(type==='food') return getTodayFoods(p).length;
  if(type==='weight') return getDateWeightRecords(p).length;
  if(type==='water') return getTodayWaterRecords(p).length;
  if(type==='exercise') return getTodayExercises(p).length;
  if(type==='sleep') return getTodaySleepRecords(p).length;
  if(type==='steps') return getTodayStepsRecords(p).length;
  return 0;
}
function renderHealthRecordManagement(){
  const wrap=document.getElementById('healthRecordManagementList');
  if(!wrap) return;
  const p=getActiveProfile();
  let completed=0;
  wrap.innerHTML=HEALTH_RECORD_TYPES.map(item=>{
    const count=getRecordManagementCount(item.type,p);
    if(count>0) completed++;
    return `<button class="health-record-entry ${item.type}" type="button" data-record-type="${item.type}">
      <div class="health-record-entry-top">
        <span class="health-record-entry-icon">${icon(item.icon)}</span>
        <span class="health-record-entry-main">
          <span class="health-record-entry-title">${escapeHTML(item.title)}</span>
          <span class="health-record-entry-sub">${escapeHTML(item.sub)}</span>
        </span>
      </div>
      <div class="health-record-entry-bottom">
        <span class="health-record-entry-count">${count}条</span>
        <span class="health-record-entry-arrow">›</span>
      </div>
    </button>`;
  }).join('');
  const completion=document.getElementById('healthRecordCompletion');
  if(completion) completion.textContent=`今日完成 ${completed}/${HEALTH_RECORD_TYPES.length}项`;
  wrap.querySelectorAll('.health-record-entry').forEach(btn=>{
    btn.addEventListener('click',()=>openRecordDetail(btn.dataset.recordType));
  });
}
function openRecordDetail(type){
  activeRecordDetailType=type;
  const modal=document.getElementById('recordDetailModal');
  if(!modal) return;
  const content=document.getElementById('recordDetailContent');
  if(content) content.scrollTop=0;
  modal.classList.add('show');
  GlassScrollLock.lock('modal:recordDetailModal');
  renderRecordDetail(type);
}
function closeRecordDetail(){
  if(document.getElementById('quickActionModal')?.classList.contains('show')) return;
  const modal=document.getElementById('recordDetailModal');
  if(modal) modal.classList.remove('show');
  activeRecordDetailType='';
  GlassScrollLock.unlock('modal:recordDetailModal');
}
function renderOpenRecordDetail(){
  const modal=document.getElementById('recordDetailModal');
  if(modal?.classList.contains('show')&&activeRecordDetailType) renderRecordDetail(activeRecordDetailType);
}
function setupRecordDetailModal(){
  const modal=document.getElementById('recordDetailModal');
  if(!modal) return;
  document.getElementById('recordDetailClose')?.addEventListener('click',closeRecordDetail);
  modal.addEventListener('click',e=>{if(e.target===modal) closeRecordDetail()});
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape'||!modal.classList.contains('show')) return;
    if(document.getElementById('quickActionModal')?.classList.contains('show')) return;
    closeRecordDetail();
  });
}
function setRecordDetailChrome(type){
  const meta=HEALTH_RECORD_TYPES.find(x=>x.type===type)||HEALTH_RECORD_TYPES[0];
  const title=document.getElementById('recordDetailTitle');
  const sub=document.getElementById('recordDetailSub');
  if(title) title.textContent=meta.title;
  if(sub) sub.textContent=`${formatDate(currentViewDate)} · ${meta.sub}`;
  return meta;
}
function bindRecordActionButtons(wrap,p,type){
  wrap.querySelectorAll('[data-edit-record]').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const id=btn.dataset.id;
      const record=(
        type==='food'?(p.foodRecords||[]):
        type==='weight'?(p.weightRecords||[]):
        type==='water'?(p.waterRecords||[]):
        type==='exercise'?(p.exerciseRecords||[]):
        type==='sleep'?(p.sleepRecords||[]):
        (p.stepsRecords||[])
      ).find(r=>r.id===id);
      if(!record) return;
      if(type==='food') openFoodEditor(e.currentTarget,p,record);
      else if(type==='weight') openWeightEditor(e.currentTarget,p,record);
      else if(type==='water') openWaterEditor(e.currentTarget,p,record);
      else if(type==='exercise') openExerciseEditor(e.currentTarget,p,record);
      else if(type==='sleep') openSleepEditor(e.currentTarget,p,record);
      else if(type==='steps') openStepsEditor(e.currentTarget,p,record);
    });
  });
  wrap.querySelectorAll('[data-delete-record]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!requireEditableHealthProfile(p)) return;
      const typeLabel={food:'饮食',weight:'体重',water:'饮水',exercise:'运动',sleep:'睡眠',steps:'步数'}[type]||'健康';
      if(!confirm(`确定删除这条${typeLabel}记录吗？`)) return;
      const id=btn.dataset.id;
      if(type==='food'){
        addDeletedRecord('food',id);
        p.foodRecords=(p.foodRecords||[]).filter(r=>r.id!==id);
      }else if(type==='weight'){
        const record=(p.weightRecords||[]).find(r=>r.id===id);
        addDeletedRecord('weight',weightDeleteKeys(record,p.id));
        p.weightRecords=(p.weightRecords||[]).filter(r=>r.id!==id);
        invalidateHealthCoachProfile(p);
      }else if(type==='water'){
        addDeletedRecord('water',id);
        p.waterRecords=(p.waterRecords||[]).filter(r=>r.id!==id);
      }else if(type==='exercise'){
        addDeletedRecord('exercise',id);
        p.exerciseRecords=(p.exerciseRecords||[]).filter(r=>r.id!==id);
      }else if(type==='sleep'){
        addDeletedRecord('sleep',id);
        p.sleepRecords=(p.sleepRecords||[]).filter(r=>r.id!==id);
      }else if(type==='steps'){
        addDeletedRecord('steps',id);
        p.stepsRecords=(p.stepsRecords||[]).filter(r=>r.id!==id);
      }
      saveData();
      renderDashboard();
      showToast(`已删除一条${typeLabel}记录`,'info');
    });
  });
}
function renderRecordAction(id,type){
  return `<div class="health-record-actions">
    <button class="hr-edit" data-edit-record="${type}" data-id="${escapeHTML(id)}" type="button" title="编辑">${icon('edit')}</button>
    <button class="hr-del health-record-delete" data-delete-record="${type}" data-id="${escapeHTML(id)}" type="button" aria-label="删除">${icon('x')}</button>
  </div>`;
}
function recordEntryDateTime(date){
  const nowTime=toLocalDateTimeValue().slice(11);
  return dateToLocalDateTime(isValidDateStr(date)?date:currentViewDate,nowTime);
}
function recordDetailAddHTML(){
  return `<button type="button" class="record-detail-add" aria-label="新增记录"><span class="record-detail-add-plus" aria-hidden="true">＋</span></button>`;
}
function openRecordFromDetail(type){
  const date=currentViewDate;
  const routes={
    food:()=>renderFoodSearchModal({date}),
    exercise:()=>renderExerciseModal({date}),
    weight:()=>renderWeightModal({date}),
    sleep:()=>renderSleepModal({date}),
    water:()=>renderWaterModal({date}),
    steps:()=>renderStepsModal({date})
  };
  const open=routes[type];
  if(!open) return;
  open();
  document.getElementById('quickActionModal')?.classList.add('modal-overlay--stack-top');
}
function bindRecordDetailAdd(wrap,type){
  wrap.querySelector('.record-detail-add')?.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    openRecordFromDetail(type);
  });
}
function renderRecordDetail(type){
  setRecordDetailChrome(type);
  const p=getActiveProfile();
  const wrap=document.getElementById('recordDetailContent');
  if(!wrap||!p) return;
  const renderKey=`${getProfileDataId(p)||p.id||''}|${currentViewDate}|${type}`;
  const restoreScroll=wrap.dataset.renderKey===renderKey?Math.max(0,wrap.scrollTop||0):0;
  if(type==='food') renderFoodRecordDetail(wrap,p);
  else if(type==='weight') renderWeightRecordDetail(wrap,p);
  else if(type==='water') renderWaterRecordDetail(wrap,p);
  else if(type==='exercise') renderExerciseRecordDetail(wrap,p);
  else if(type==='sleep') renderSleepRecordDetail(wrap,p);
  else if(type==='steps') renderStepsRecordDetail(wrap,p);
  wrap.dataset.renderKey=renderKey;
  requestAnimationFrame(()=>{
    if(!wrap.isConnected||wrap.dataset.renderKey!==renderKey) return;
    wrap.scrollTop=Math.min(restoreScroll,Math.max(0,wrap.scrollHeight-wrap.clientHeight));
  });
  if(window.GlassUI) GlassUI.enhance(wrap);
}
function renderFoodRecordDetail(wrap,p){
  const foods=getTodayFoods(p);
  const mealNames={breakfast:'早餐',lunch:'午餐',dinner:'晚餐',snack:'加餐'};
  const mealOrder=['breakfast','lunch','dinner','snack'];
  if(!foods.length){
    wrap.innerHTML=`<div class="ex-empty">所选日期暂无饮食记录</div>${recordDetailAddHTML()}`;
    bindRecordDetailAdd(wrap,'food');
    return;
  }
  let totalCal=0;
  wrap.innerHTML=mealOrder.map(meal=>{
    const mealFoods=foods.filter(f=>f.meal===meal);
    if(!mealFoods.length) return '';
    let mealCal=0;
    const rows=mealFoods.map(r=>{
      let rCal=0,rCarb=0,rPro=0,rFat=0;
      (r.foods||[]).forEach(f=>{const n=getFoodActualNutrition(f);rCal+=n.calories;rCarb+=n.carbs;rPro+=n.protein;rFat+=n.fat});
      mealCal+=rCal;totalCal+=rCal;
      return `<div class="log-item">
        <div class="li-left">
          <div class="li-name">${(r.foods||[]).map(f=>escapeHTML(f.amount!==undefined?`${f.name} ${roundFoodValue(f.amount,1)}g`:`${f.name}×${f.quantity||1}`)).join(', ')}</div>
          <div class="li-nutri">碳水${rCarb.toFixed(0)}g · 蛋白${rPro.toFixed(0)}g · 脂肪${rFat.toFixed(0)}g · ${formatDateTime(r.dateTime||`${r.date}T00:00`)}</div>
        </div>
        <div class="li-right"><div class="li-cal">${Math.round(rCal)} kcal</div>${renderRecordAction(r.id,'food')}</div>
      </div>`;
    }).join('');
    return `<div class="meal-group"><div class="meal-group-header">${mealNames[meal]} <span class="meal-cal">${Math.round(mealCal)} kcal</span></div>${rows}</div>`;
  }).join('')+recordDetailAddHTML()+`<div class="log-total"><span class="lt-label">所选日期总计</span><span class="lt-val">${Math.round(totalCal)} kcal</span></div>`;
  bindRecordActionButtons(wrap,p,'food');
  bindRecordDetailAdd(wrap,'food');
}
function renderWeightRecordDetail(wrap,p){
  const records=getDateWeightRecords(p);
  if(!records.length){
    wrap.innerHTML=`<div class="ex-empty">所选日期暂无体重记录</div>${recordDetailAddHTML()}`;
    bindRecordDetailAdd(wrap,'weight');
    return;
  }
  wrap.innerHTML=`<div class="health-record-list">${records.map(r=>`<div class="health-record-item">
    <div><strong>${r.weight} kg · BMI ${r.bmi||calcBMI(r.weight,p.height)||'--'}</strong><div class="hr-time">${(r.bodyFat||calcBodyFatPercent(r.weight,p))?`体脂 ${r.bodyFat||calcBodyFatPercent(r.weight,p)}%${r.bodyFatSource==='estimated'?'(估)':''} · `:''}${formatDateTime(r.dateTime||`${r.date}T00:00`)}</div></div>
    ${renderRecordAction(r.id,'weight')}
  </div>`).join('')}</div>${recordDetailAddHTML()}`;
  bindRecordActionButtons(wrap,p,'weight');
  bindRecordDetailAdd(wrap,'weight');
}
function renderWaterRecordDetail(wrap,p){
  const records=getTodayWaterRecords(p).slice().sort((a,b)=>getRecordTime(b).localeCompare(getRecordTime(a)));
  const goal=calculateDailyWaterGoal(p);
  const start=getMonday(currentViewDate);
  const weekDays=Array.from({length:7},(_,i)=>addDays(start,i));
  wrap.innerHTML=`
    <div class="health-record-list">${records.length?records.map(r=>`<div class="health-record-item">
      <div><strong>${formatWaterAmount(r.amount)}</strong><div class="hr-time">${formatDateTime(r.dateTime||`${r.date}T00:00`)}</div></div>
      ${renderRecordAction(r.id,'water')}
    </div>`).join(''):'<div class="ex-empty">所选日期暂无饮水记录</div>'}</div>
    ${recordDetailAddHTML()}
    <div class="record-detail-summary-line">所选日期 ${records.length} 条 · 本周趋势保留在这里，首页只显示今日饮水进度。</div>
    <div class="water-history-title"><span>本周饮水趋势</span><span>${formatWaterAmount(goal)}/日</span></div>
    <div class="water-week">${weekDays.map(date=>{
      const total=getDateWaterRecords(p,date).reduce((sum,r)=>sum+(Number(r.amount)||0),0);
      const h=Math.min(Math.round(total/goal*100),100);
      return `<div class="water-day" title="${formatDateTitle(date)} · ${formatWaterAmount(total)}"><div class="water-day-bar"><div class="water-day-fill" style="--h:${h}%"></div></div><div class="water-day-label">${formatDateShort(date)}</div></div>`;
    }).join('')}</div>`;
  bindRecordActionButtons(wrap,p,'water');
  bindRecordDetailAdd(wrap,'water');
}
function renderExerciseRecordDetail(wrap,p){
  const records=getTodayExercises(p);
  const minutes=getTodayExerciseMinutes(p);
  const burned=calcTodayBurnedCalories(p);
  wrap.innerHTML=`
    <div class="ex-list">${records.length?records.map(e=>`<div class="ex-item">
      <div><div class="exi-name">${escapeHTML(e.name)}</div><div class="exi-detail">${escapeHTML(e.detail)} · ${formatDateTime(e.dateTime||`${e.date}T00:00`)}</div></div>
      <div style="display:flex;align-items:center;gap:8px"><span class="exi-cal">-${Number(e.calories)||0} kcal</span>${renderRecordAction(e.id,'exercise')}</div>
    </div>`).join(''):'<div class="ex-empty">所选日期暂无运动记录</div>'}</div>
    ${recordDetailAddHTML()}
    <div class="record-detail-summary-line">今日${records.length}次 · ${minutes}分钟 · ${burned} kcal</div>`;
  bindRecordActionButtons(wrap,p,'exercise');
  bindRecordDetailAdd(wrap,'exercise');
}
function renderSleepRecordDetail(wrap,p){
  const records=getTodaySleepRecords(p);
  const qualityMap={good:'良好',normal:'一般',poor:'较差'};
  wrap.innerHTML=`<div class="health-record-list">${records.length?records.map(r=>{
    const startTime=(r.startTime||((r.dateTime||'').split('T')[1]||'00:00')).slice(0,5);
    const endTime=(r.endTime||(()=>{const d=new Date(normalizeDateTime(r.dateTime||`${r.date||currentViewDate}T00:00`));d.setMinutes(d.getMinutes()+(Number(r.duration)||0));return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`})()).slice(0,5);
    return `<div class="health-record-item">
      <div><strong>${startTime} - ${endTime}</strong><div class="hr-time">${formatSleepDuration(r.duration)} · 睡眠质量${qualityMap[r.quality]||'一般'} · ${r.startDate&&r.endDate&&r.startDate!==r.endDate?'跨天':'同日'}</div></div>
      ${renderRecordAction(r.id,'sleep')}
    </div>`;
  }).join(''):'<div class="ex-empty">所选日期暂无睡眠记录</div>'}</div>${recordDetailAddHTML()}`;
  bindRecordActionButtons(wrap,p,'sleep');
  bindRecordDetailAdd(wrap,'sleep');
}
function renderStepsRecordDetail(wrap,p){
  const records=getTodayStepsRecords(p);
  wrap.innerHTML=`<div class="health-record-list">${records.length?records.map(r=>`<div class="health-record-item">
    <div><strong>${Number(r.steps||0).toLocaleString()} 步</strong><div class="hr-time">${formatDateTime(r.dateTime||`${r.date}T00:00`)}</div></div>
    ${renderRecordAction(r.id,'steps')}
  </div>`).join(''):'<div class="ex-empty">所选日期暂无步数记录</div>'}</div>${recordDetailAddHTML()}`;
  bindRecordActionButtons(wrap,p,'steps');
  bindRecordDetailAdd(wrap,'steps');
}

function renderHealthOverview(){
  const p=getActiveProfile();
  const nameEl=document.getElementById('healthProfileName');
  if(nameEl) nameEl.textContent=getDisplayName(p);
  const wrap=document.getElementById('healthOverview');
  if(!wrap) return;

  const sleepMinutes=getTodaySleepDuration(p);
  const totalSteps=getTodayTotalSteps(p);
  const exerciseMinutes=getTodayExerciseMinutes(p);

  wrap.innerHTML=`
    <div class="health-grid">
      <div class="health-stat">
        <div class="hs-icon">${icon('footprints')}</div>
        <div class="hs-val steps">${totalSteps.toLocaleString()}</div>
        <div class="hs-label">步数</div>
      </div>
      <div class="health-stat">
        <div class="hs-icon">${icon('bed')}</div>
        <div class="hs-val sleep">${formatSleepDuration(sleepMinutes)}</div>
        <div class="hs-label">睡眠</div>
      </div>
      <div class="health-stat">
        <div class="hs-icon">${icon('flame')}</div>
        <div class="hs-val exercise">${exerciseMinutes} min</div>
        <div class="hs-label">运动</div>
      </div>
    </div>
    <div class="record-management-split">
      <section class="record-management-pane">
        <div class="record-management-list-head"><span>步数明细</span><span>${formatDate(currentViewDate)}</span></div>
        <div class="health-record-list" id="stepsRecordList"></div>
      </section>
      <section class="record-management-pane">
        <div class="record-management-list-head"><span>睡眠明细</span><span>${formatDate(currentViewDate)}</span></div>
        <div class="health-record-list" id="sleepRecordList"></div>
      </section>
    </div>`;
  renderStepsList(p);
  renderSleepList(p);
  return;

  let html=`
    <div class="health-grid">
      <div class="health-stat">
        <div class="hs-icon">${icon('bed')}</div>
        <div class="hs-val sleep">${formatSleepDuration(sleepMinutes)}</div>
        <div class="hs-label">睡眠</div>
      </div>
      <div class="health-stat">
        <div class="hs-icon">${icon('footprints')}</div>
        <div class="hs-val steps">${totalSteps.toLocaleString()}</div>
        <div class="hs-label">步数</div>
      </div>
      <div class="health-stat">
        <div class="hs-icon">${icon('flame')}</div>
        <div class="hs-val exercise">${exerciseMinutes} min</div>
        <div class="hs-label">运动</div>
      </div>
    </div>
    <div class="health-input-row">
      <div class="health-input-col">
        <h4>记录步数</h4>
        <div class="health-input-line">
          <span class="hi-label">步数</span>
          <input type="number" id="stepsInput" placeholder="如 8426" min="0" max="100000">
        </div>
        <div class="time-picker" id="stepsTimePicker" aria-label="步数记录时间"></div>
        <button class="btn btn-gold btn-sm" id="addStepsBtn" style="width:100%;margin-top:4px">${editingStepsId?'保存步数':'添加步数'}</button>
        <div class="health-record-list" id="stepsRecordList"></div>
      </div>
      <div class="health-input-col">
        <h4>记录睡眠</h4>
        <div class="sleep-start-row sleep-time-compact">
          <span class="sleep-field-label">开始睡眠</span>
          ${timeCompactHTML('sleepStart','23:00')}
        </div>
        <div class="sleep-end-quality-row">
          <div class="sleep-field sleep-time-compact">
            <span class="sleep-field-label">结束时间</span>
            ${timeCompactHTML('sleepEnd','07:00')}
          </div>
          <div class="sleep-field sleep-quality-field">
            <span class="sleep-field-label">睡眠质量</span>
            <select id="sleepQuality">
              <option value="good">良好</option>
              <option value="normal">一般</option>
              <option value="poor">较差</option>
            </select>
          </div>
        </div>
        <div class="sleep-date-advanced">
          <button class="auto-time-chip" id="sleepDateToggle" type="button" aria-expanded="false">
            <span>睡眠日期</span><strong>自动判断 · ${formatDate(currentViewDate)}</strong><span class="auto-time-arrow">▼</span>
          </button>
          <div class="auto-time-editor">
            <input class="time-select" id="sleepReferenceDate" type="date" value="${currentViewDate}" aria-label="睡眠归属日期">
          </div>
        </div>
        <button class="btn btn-gold btn-sm" id="addSleepBtn" style="width:100%;margin-top:4px">${editingSleepId?'保存睡眠':'添加睡眠'}</button>
        <div class="health-record-list" id="sleepRecordList"></div>
      </div>
    </div>`;

  wrap.innerHTML=html;
  setupTimePicker('stepsTime',currentViewDateTime());
  if(window.GlassUI) GlassUI.enhance(wrap);
  const sleepDateBox=wrap.querySelector('.sleep-date-advanced');
  const sleepDateToggle=wrap.querySelector('#sleepDateToggle');
  sleepDateToggle?.addEventListener('click',()=>{
    const open=!sleepDateBox.classList.contains('open');
    sleepDateBox.classList.toggle('open',open);
    sleepDateToggle.setAttribute('aria-expanded',open?'true':'false');
  });
  wrap.querySelector('#sleepReferenceDate')?.addEventListener('change',e=>{
    const strong=sleepDateToggle?.querySelector('strong');
    if(strong) strong.textContent=`手动 · ${formatDate(e.target.value||currentViewDate)}`;
  });

  // Render today's record lists
  renderStepsList(p);
  renderSleepList(p);

  // Steps add handler
  document.getElementById('addStepsBtn').addEventListener('click',()=>{
    const steps=parseInt(document.getElementById('stepsInput').value);
    const dateTime=normalizeDateTime(getTimePickerValue('stepsTime'));
    if(saveStepsRecordEntry(steps,dateTime,{editingId:editingStepsId,profile:p})){
      resetTimePicker('stepsTime');
    }
  });

  // Sleep add handler
  document.getElementById('addSleepBtn').addEventListener('click',()=>{
    const startTime=getCompactTime('sleepStart','23:00');
    const endTime=getCompactTime('sleepEnd','07:00');
    const sleepReferenceDate=document.getElementById('sleepReferenceDate')?.value||currentViewDate;
    const quality=document.getElementById('sleepQuality').value;
    saveSleepRecordEntry({startTime,endTime,referenceDate:sleepReferenceDate,quality},{editingId:editingSleepId,profile:p});
  });
}

function renderStepsList(p){
  const wrap=document.getElementById('stepsRecordList');
  if(!wrap) return;
  const records=getTodayStepsRecords(p);
  if(records.length===0){wrap.innerHTML='<div class="ex-empty">所选日期暂无步数记录</div>';return}
  wrap.innerHTML=records.map(r=>{
    const timePart=(r.dateTime||'').split('T')[1]||'00:00';
    return `<div class="health-record-item">
      <span>${r.steps.toLocaleString()} 步</span>
      <span class="hr-time">${timePart}</span>
      <div class="health-record-actions">
        <button class="hr-edit steps-edit" data-id="${r.id}" title="编辑步数记录">${icon('edit')}</button>
        <button class="hr-del steps-del health-record-delete" data-id="${r.id}" type="button" aria-label="删除">${icon('x')}</button>
      </div>
    </div>`;
  }).join('');
  wrap.querySelectorAll('.steps-edit').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const id=btn.dataset.id;
      const record=(p.stepsRecords||[]).find(r=>r.id===id);
      if(!record) return;
      openStepsEditor(e.currentTarget,p,record);
    });
  });
  wrap.querySelectorAll('.steps-del').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!requireEditableHealthProfile(p)) return;
      if(!confirm('确定删除这条步数记录吗？')) return;
      const id=btn.dataset.id;
      addDeletedRecord('steps',id);
      p.stepsRecords=(p.stepsRecords||[]).filter(r=>r.id!==id);
      saveData();
      renderDashboard();
      showToast('已删除步数记录','info');
    });
  });
}

function renderSleepList(p){
  const wrap=document.getElementById('sleepRecordList');
  if(!wrap) return;
  const records=getTodaySleepRecords(p);
  if(records.length===0){wrap.innerHTML='<div class="ex-empty">所选日期暂无睡眠记录</div>';return}
  const qualityMap={good:'很好',normal:'一般',poor:'较差'};
  wrap.innerHTML=records.map(r=>{
    const startTime=(r.startTime||((r.dateTime||'').split('T')[1]||'00:00')).slice(0,5);
    const endTime=(r.endTime||(()=>{const d=new Date(normalizeDateTime(r.dateTime||`${r.date||currentViewDate}T00:00`));d.setMinutes(d.getMinutes()+(Number(r.duration)||0));return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`})()).slice(0,5);
    return `<div class="health-record-item">
      <span>${startTime}-${endTime} · ${formatSleepDuration(r.duration)} · ${qualityMap[r.quality]||'一般'}</span>
      <span class="hr-time">${r.startDate&&r.endDate&&r.startDate!==r.endDate?'跨天':'睡眠'}</span>
      <div class="health-record-actions">
        <button class="hr-edit sleep-edit" data-id="${r.id}" title="编辑睡眠记录">${icon('edit')}</button>
        <button class="hr-del sleep-del health-record-delete" data-id="${r.id}" type="button" aria-label="删除">${icon('x')}</button>
      </div>
    </div>`;
  }).join('');
  wrap.querySelectorAll('.sleep-edit').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const id=btn.dataset.id;
      const record=(p.sleepRecords||[]).find(r=>r.id===id);
      if(!record) return;
      openSleepEditor(e.currentTarget,p,record);
    });
  });
  wrap.querySelectorAll('.sleep-del').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!requireEditableHealthProfile(p)) return;
      if(!confirm('确定删除这条睡眠记录吗？')) return;
      const id=btn.dataset.id;
      addDeletedRecord('sleep',id);
      p.sleepRecords=(p.sleepRecords||[]).filter(r=>r.id!==id);
      saveData();
      renderDashboard();
      showToast('已删除睡眠记录','info');
    });
  });
}

const BIRTHDAY_REMINDER_STORAGE_KEY='ai_health_birthday_reminder_shown_v1';
const BIRTHDAY_REMINDER_SESSION_KEY='ai_health_birthday_reminder_session_date_v1';
function getBirthdayReminderShownMap(){
  try{return JSON.parse(localStorage.getItem(BIRTHDAY_REMINDER_STORAGE_KEY)||'{}')||{}}
  catch(e){return {}}
}
function saveBirthdayReminderShownMap(map){
  try{localStorage.setItem(BIRTHDAY_REMINDER_STORAGE_KEY,JSON.stringify(map||{}))}
  catch(e){}
}
function checkBirthdayReminder(){
  const today=todayStr();
  try{
    if(sessionStorage.getItem(BIRTHDAY_REMINDER_SESSION_KEY)===today) return;
  }catch(e){}
  const shown=getBirthdayReminderShownMap();
  const list=Array.isArray(state.profiles)?state.profiles:[];
  for(const p of list){
    const days=getDaysUntilBirthday(p.birthDate);
    if(days===null||days===undefined||!Number.isFinite(days)||days>7) continue;
    const profileKey=p.profile_id||p.id||getDisplayName(p)||'profile';
    const reminderKey=`${today}:${profileKey}:birthday:${days}`;
    if(shown[reminderKey]) continue;
    const name=getDisplayName(p);
    const message=days===0?`今天是${name}的生日！祝生日快乐！`:`${name}的生日还有${days}天`;
    shown[reminderKey]=Date.now();
    saveBirthdayReminderShownMap(shown);
    try{sessionStorage.setItem(BIRTHDAY_REMINDER_SESSION_KEY,today)}catch(e){}
    showToast(message,'info');
    break;
  }
}

function renderGapCard(){
  const p=getActiveProfile();
  const intake=calcTodayIntake(p);
  const targets=calcNutrientTargets(p);
  const suggWrap=document.getElementById('gapSuggestions');
  if(!suggWrap) return;

  if(!targets){
    const missing=getMissingNutrientCalcFields(p);
    const hasIntake=(intake.calories||0)>0;
    if(hasIntake){
      // 即便资料不完整，也如实告诉用户今天吃了什么、还差什么（按 DRIs 默认值估算）
      const defaultTargets={calories:2000,carbs:275,protein:60,fat:55,fiber:25};
      const intakeRound={
        calories:Math.round(intake.calories),
        carbs:Math.round(intake.carbs*10)/10,
        protein:Math.round(intake.protein*10)/10,
        fat:Math.round(intake.fat*10)/10,
        fiber:Math.round(intake.fiber*10)/10,
      };
      const gaps=Object.fromEntries(Object.entries(defaultTargets).map(([k,tgt])=>[k,+(tgt-intakeRound[k]).toFixed(1)]));
      const hints=[];
      if(gaps.protein>10) hints.push(`蛋白质约差 ${gaps.protein}g，建议加一份高蛋白食物`);
      if(gaps.fiber>5) hints.push(`纤维约差 ${gaps.fiber}g，建议加一份蔬菜或粗粮`);
      if(gaps.carbs>30) hints.push(`碳水约差 ${gaps.carbs}g，建议补充主食`);
      const hintText=hints.length?hints.join('；'):'今日营养较为均衡';
      const headerHint=missing.length?`<span style="color:var(--amber)">资料待补全：${escapeHTML(missing.join('、'))}</span> · <a href="#" id="openSettingsFromGap" style="color:var(--gold-l);text-decoration:underline">去设置</a>`:'';
      suggWrap.innerHTML=`<div style="font-size:12px;color:var(--txt2);text-align:center;padding:8px 0">${headerHint}</div><div style="font-size:12px;color:var(--txt);text-align:center;padding:4px 0">${escapeHTML(hintText)}</div>`;
      const openBtn=suggWrap.querySelector('#openSettingsFromGap');
      if(openBtn) openBtn.addEventListener('click',(e)=>{e.preventDefault();openProfileSettings()});
    }else{
      const hint=missing.length?`请先在 设置 → 个人资料 中填写：${missing.join('、')}`:'请在 设置 → 个人资料 中填写完整资料';
      suggWrap.innerHTML=`<div style="color:var(--txt3);font-size:12px;text-align:center;padding:16px 0"><a href="#" id="openSettingsFromGap" style="color:var(--gold-l);text-decoration:underline">${escapeHTML(hint)}</a></div>`;
      const openBtn=suggWrap.querySelector('#openSettingsFromGap');
      if(openBtn) openBtn.addEventListener('click',(e)=>{e.preventDefault();openProfileSettings()});
    }
    return;
  }

  const items=[
    {label:'卡路里',val:intake.calories,tgt:targets.calories,unit:'kcal'},
    {label:'碳水',val:intake.carbs,tgt:targets.carbs,unit:'g'},
    {label:'蛋白质',val:intake.protein,tgt:targets.protein,unit:'g'},
    {label:'脂肪',val:intake.fat,tgt:targets.fat,unit:'g'},
    {label:'纤维',val:intake.fiber,tgt:targets.fiber,unit:'g'},
  ];

  const gaps={};

  items.forEach(it=>{
    const gap=+(it.tgt-it.val).toFixed(1);
    gaps[it.label]=gap;
  });

  // Suggestions
  let suggestions=[];

  if(gaps['蛋白质']>10){
    const foods=FOOD_DB.filter(f=>f.pro>15).sort((a,b)=>b.pro-a.pro).slice(0,3);
    suggestions.push({nutrient:'蛋白质',foods:foods.map(f=>f.name)});
  }
  if(gaps['碳水']>20){
    const foods=FOOD_DB.filter(f=>f.carb>20&&f.cat==='主食').sort((a,b)=>b.carb-a.carb).slice(0,3);
    suggestions.push({nutrient:'碳水',foods:foods.map(f=>f.name)});
  }
  if(gaps['纤维']>5){
    const foods=FOOD_DB.filter(f=>f.fib>2).sort((a,b)=>b.fib-a.fib).slice(0,3);
    suggestions.push({nutrient:'纤维',foods:foods.map(f=>f.name)});
  }
  if(gaps['脂肪']>10){
    const foods=FOOD_DB.filter(f=>f.fat>8&&f.cat!=='零食').sort((a,b)=>b.fat-a.fat).slice(0,3);
    suggestions.push({nutrient:'脂肪',foods:foods.map(f=>f.name)});
  }

  if(suggestions.length===0){
    suggWrap.innerHTML='<div style="font-size:11px;color:var(--txt3);text-align:center;padding:8px 0">营养摄入均衡，继续保持</div>';
  }else{
    suggWrap.innerHTML=suggestions.map(s=>
        `<div class="suggestion-item">
          <span class="sg-dot"></span>
          <span class="sg-main">
            <span>建议补充：${s.foods.join('、')}</span>
            <span class="sg-reason">${s.nutrient}不足 · 推荐份量：1份，正餐或加餐补充</span>
          </span>
        </div>`
      ).join('');
  }
}

function renderChart(){
  // 性能优化：Chart.js defer 加载，未就绪时跳过；非健康页面时不渲染
  if(typeof Chart==='undefined'){console.log('[Chart] Chart.js not ready, skip render');return}
  if(activeAppPage!=='health'){console.log('[Chart] not on health page, skip render');return}
  const p=getActiveProfile();

  const canvas=document.getElementById('trendChart');
  const wrap=document.getElementById('chartCanvasWrap');
  const isMobile=window.matchMedia('(max-width:640px)').matches;
  const css=getComputedStyle(document.documentElement);
  const theme=document.documentElement.getAttribute('data-theme')||'dark';
  const chartText=css.getPropertyValue('--txt').trim()||'#e8e8f0';
  const chartMuted=css.getPropertyValue('--txt3').trim()||'#555566';
  const chartGold=css.getPropertyValue('--gold').trim()||'#d4af37';
  const chartGoldLight=css.getPropertyValue('--gold-l').trim()||'#f4d160';
  const chartTrend=theme==='light'?'#0f766e':'#2dd4bf';
  const chartGrid=theme==='light'?'rgba(120,92,18,0.11)':'rgba(212,175,55,0.04)';
  const tooltipBg=theme==='light'?'rgba(255,253,247,0.96)':'rgba(14,14,20,0.95)';
  const tooltipBorder=theme==='light'?'rgba(120,92,18,0.22)':'rgba(212,175,55,0.3)';

  // Build datasets
  let datasets=[];
  let statsHTML='';
  const dates=getTrendData(p,chartPeriod).dates;
  const metricData=getHealthMetricTrendSeries(p,chartMetric,chartPeriod,dates).values;
  const personalColor={border:chartGold,bg:theme==='light'?'rgba(166,111,0,0.12)':'rgba(212,175,55,0.1)'};

  datasets.push({
    label:chartMetric==='weight'?'体重':chartMetric==='bodyFat'?'体脂':'BMI',
    data:metricData,
    borderColor:personalColor.border,
    backgroundColor:personalColor.bg,
    borderWidth:2.5,
    fill:false,
    tension:0.35,
    pointRadius:isMobile?2.5:3,
    pointHoverRadius:isMobile?4:5,
    pointBackgroundColor:personalColor.border,
    pointBorderColor:personalColor.border,
    pointBorderWidth:0,
    spanGaps:true,
  });

  // The personal trend keeps the existing 7-day moving-average reference line.
  const maData=calcMovingAverage(metricData,7);
  datasets.push({
    label:'7日趋势',
    data:maData,
    borderColor:chartTrend,
    backgroundColor:'transparent',
    borderWidth:2,
    fill:false,
    tension:0.4,
    pointRadius:0,
    pointHoverRadius:isMobile?3:4,
    pointBackgroundColor:chartTrend,
    spanGaps:true,
  });

  // Stats
  const validData=metricData.filter(v=>v!==null);
  if(validData.length>0){
    const avg=(validData.reduce((a,b)=>a+b,0)/validData.length).toFixed(1);
    const min=Math.min(...validData).toFixed(1);
    const max=Math.max(...validData).toFixed(1);
    const change=validData.length>1?(validData[validData.length-1]-validData[0]).toFixed(1):'0';
    const changeNum=parseFloat(change);
    const changeCls=changeNum<0?'stat-pos':changeNum>0?'stat-neg':'';
    const metricName=chartMetric==='weight'?'体重':chartMetric==='bodyFat'?'体脂':'BMI';
    const unit=chartMetric==='weight'?'kg':chartMetric==='bodyFat'?'%':'';
    statsHTML=`<span class="chart-stat">${metricName}：均<b>${avg}</b> 低<b>${min}</b> 高<b>${max}</b> 变化<b class="${changeCls}">${changeNum>0?'+':''}${change}</b>${unit?' '+unit:''}</span>`;
  }

  document.getElementById('chartStats').innerHTML=statsHTML;

  // Show empty state if no data
  const hasData=datasets.some(ds=>ds.data.some(v=>v!==null));
  if(!hasData){
    if(chartInstance){chartInstance.destroy();chartInstance=null}
    wrap.innerHTML='<div class="chart-empty">暂无数据，开始记录体重吧</div>';
    return;
  }

  // Ensure canvas exists
  if(!document.getElementById('trendChart')){
    wrap.innerHTML='<canvas id="trendChart"></canvas>';
  }

  if(chartInstance){chartInstance.destroy()}

  const ctx=document.getElementById('trendChart').getContext('2d');
  const metricLabel=chartMetric==='weight'?'体重 (kg)':chartMetric==='bodyFat'?'体脂率 (%)':'BMI';
  const activeBodyFatRange=chartMetric==='bodyFat'?getBodyFatStandardRange(p):null;
  const bodyFatRangePlugin={
    id:'bodyFatStandardRange',
    beforeDatasetsDraw(chart){
      if(chartMetric!=='bodyFat'||!activeBodyFatRange) return;
      const {ctx,chartArea,scales}=chart;
      const yScale=scales.y;
      if(!chartArea||!yScale) return;
      const top=Math.max(chartArea.top,yScale.getPixelForValue(activeBodyFatRange.max));
      const bottom=Math.min(chartArea.bottom,yScale.getPixelForValue(activeBodyFatRange.min));
      if(!Number.isFinite(top)||!Number.isFinite(bottom)||bottom<=top) return;
      ctx.save();
      ctx.fillStyle='rgba(148, 163, 184, 0.18)';
      ctx.strokeStyle='rgba(148, 163, 184, 0.32)';
      ctx.lineWidth=1;
      ctx.fillRect(chartArea.left,top,chartArea.right-chartArea.left,bottom-top);
      ctx.strokeRect(chartArea.left,top,chartArea.right-chartArea.left,bottom-top);
      ctx.restore();
    }
  };
  // Calculate dynamic Y-axis range from all datasets
  const allValues=datasets.flatMap(ds=>ds.data.filter(v=>v!==null&&typeof v==='number'));
  let yMin,yMax;
  if(allValues.length>0){
    const dataMin=Math.min(...allValues);
    const dataMax=Math.max(...allValues);
    const dataRange=dataMax-dataMin||1;
    const padding=dataRange*0.15;
    yMin=dataMin-padding;
    yMax=dataMax+padding;
  }

  chartInstance=new Chart(ctx,{
    type:'line',
    data:{
      labels:dates.map(formatDateShort),
      datasets:datasets,
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      resizeDelay:isMobile?120:0,
      animation:isMobile?false:{duration:450},
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{
          display:true,
          position:'bottom',
          align:'center',
          labels:{
            color:chartMuted,
            font:{size:11},
            boxWidth:16,
            boxHeight:2,
            padding:8,
            usePointStyle:false,
          }
        },
        tooltip:{
          backgroundColor:tooltipBg,
          titleColor:chartGoldLight,
          bodyColor:chartText,
          borderColor:tooltipBorder,
          borderWidth:1,
          padding:10,
          cornerRadius:10,
          displayColors:true,
          boxWidth:8,
          boxHeight:8,
          boxPadding:4,
          titleFont:{size:12,weight:'600'},
          bodyFont:{size:11},
          callbacks:{
            label:(ctx)=>{
              const v=ctx.parsed.y;
              if(v===null) return null;
              if(chartMetric==='bmi'){
                const cat=bmiCategory(v);
                return `${ctx.dataset.label}: ${v} (${cat.label})`;
              }
              if(chartMetric==='bodyFat'){
                return `${ctx.dataset.label}: ${v}%`;
              }
              return `${ctx.dataset.label}: ${v} kg`;
            }
          }
        }
      },
      scales:{
        x:{
          grid:{color:chartGrid,drawBorder:false},
          ticks:{color:chartMuted,font:{size:isMobile?9:10},maxRotation:0,maxTicksLimit:isMobile?7:14},
        },
        y:{
          grid:{color:chartGrid,drawBorder:false},
          ticks:{color:chartMuted,font:{size:isMobile?9:10},maxTicksLimit:6},
          min:activeBodyFatRange?undefined:yMin,
          max:activeBodyFatRange?undefined:yMax,
          suggestedMin:activeBodyFatRange?Math.max(0,activeBodyFatRange.min-5):undefined,
          suggestedMax:activeBodyFatRange?activeBodyFatRange.max+5:undefined,
        }
      }
    },
    plugins:[bodyFatRangePlugin]
  });
}

function renderAddedFoods(targetWrap=document.getElementById('addedFoods'),options={}){
  const wrap=targetWrap;
  if(!wrap) return;
  if(foodDraft.length===0){wrap.innerHTML='';return;}
  wrap.innerHTML=renderFoodDraftReviewHTML();
  bindFoodDraftReview(wrap,{
    mode:'search',
    onRefresh:()=>renderAddedFoods(wrap,options),
    onAddMore:()=>{
      if(foodDraftSession){foodDraftSession.phase='search';renderFoodDraftShell();}
    },
    onCancel:()=>{foodDraft=[];foodDraftSession=null;wrap.innerHTML='';},
    onConfirm:()=>confirmFoodDraft({...options,mode:'search',renderTarget:wrap})
  });
}

// ==================== FOOD SEARCH ====================
function getRecentFoods(p,limit=10){
  const records=[...(p.foodRecords||[])].sort((a,b)=>getRecordTime(b).localeCompare(getRecordTime(a)));
  const seen=new Set();
  const recent=[];
  for(const r of records){
    for(const f of (r.foods||[])){
      if(!seen.has(f.name)){
        seen.add(f.name);
        const base=getFoodBaseNutrition(f);
        recent.push(prepareFoodPortion({name:f.name,cal:base.calories,carb:base.carbs,pro:base.protein,fat:base.fat,fib:base.fiber,unit:f.source_unit||f.unit,base_amount:getFoodBaseAmount(f),cat:f.cat||'其他',quantity:1}));
        if(recent.length>=limit) return recent;
      }
    }
  }
  return recent;
}
function isFavoriteFood(p,food){
  normalizeFavoriteCollections(p);
  const fav=normalizeFavoriteFood(food);
  if(!fav||isFavoriteTombstoned(p,fav)) return false;
  return (p.favoriteFoods||[]).some(f=>f.id===fav.id||f.key===fav.key||f.nameKey===fav.nameKey);
}
function toggleFavoriteFood(p,food){
  normalizeFavoriteCollections(p);
  const fav=normalizeFavoriteFood(food);
  if(!fav) return false;
  const idx=p.favoriteFoods.findIndex(f=>f.id===fav.id||f.key===fav.key||f.nameKey===fav.nameKey);
  if(idx>=0){
    const removed=p.favoriteFoods[idx];
    p.favoriteFoods.splice(idx,1);
    addFavoriteTombstone(p,removed);
    return false; // removed
  }else{
    removeFavoriteTombstone(p,fav);
    p.favoriteFoods.push({...fav,createdAt:fav.createdAt||Date.now(),updatedAt:Date.now()});
    return true; // added
  }
}

function renderQuickFoods(){
  const p=getHealthWriteProfile()||getActiveProfile();
  const wrap=document.getElementById('quickFoods');
  if(!wrap) return;

  const recent=getRecentFoods(p,10);
  normalizeFavoriteCollections(p);
  const favorites=p.favoriteFoods||[];

  let html='';

  // Favorites section
  if(favorites.length>0){
    html+=`<div class="qf-section-title">${icon('star')} 收藏食物</div>`;
    html+='<div class="qf-chips">';
    favorites.forEach((f,i)=>{
      html+=`<div class="qf-chip" data-source="fav" data-idx="${i}">
        <span>${f.name}<span class="qf-cal">${f.cal}kcal</span></span>
        <span class="qf-fav" data-action="unfav" data-idx="${i}" title="取消收藏">${icon('x')}</span>
      </div>`;
    });
    html+='</div>';
  }

  // Recent section
  if(recent.length>0){
    html+='<div class="qf-section-title">最近吃过</div>';
    html+='<div class="qf-chips">';
    recent.forEach((f,i)=>{
      const isFav=isFavoriteFood(p,f);
      html+=`<div class="qf-chip" data-source="recent" data-idx="${i}">
        <span>${f.name}<span class="qf-cal">${f.cal}kcal</span></span>
        <span class="qf-fav" data-action="${isFav?'unfav':'fav'}" data-idx="${i}" title="${isFav?'取消收藏':'收藏'}">${icon('star')}</span>
      </div>`;
    });
    html+='</div>';
  }

  if(!html){
    wrap.innerHTML='<div class="qf-empty">记录食物后会显示最近吃过和收藏的快捷选项</div>';
    return;
  }

  wrap.innerHTML=html;

  // Click handlers for chips (add to addedFoods)
  wrap.querySelectorAll('.qf-chip').forEach(chip=>{
    chip.addEventListener('click',e=>{
      if(e.target.classList.contains('qf-fav')) return;
      const source=chip.dataset.source;
      const idx=+chip.dataset.idx;
      const food=source==='fav'?favorites[idx]:recent[idx];
      if(foodDraftSession?.mode==='search'){
        foodDraftSession.pendingFood=prepareFoodPortion({...food,source:'search',quantity:1});
        foodDraftSession.phase='edit';
        renderFoodDraftShell();
      }else{
        foodDraft.push(prepareFoodPortion({...food,source:'search',quantity:1}));
      renderAddedFoods();
      }
      showToast(`已加入 ${food.name}`,'success');
    });
  });

  // Fav/unfav handlers
  wrap.querySelectorAll('.qf-fav').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      if(!requireCurrentDeviceOwnerForHealthWrite()) return;
      const action=btn.dataset.action;
      const idx=+btn.dataset.idx;
      if(action==='fav'){
        const food=recent[idx];
        toggleFavoriteFood(p,food);
        saveData();
        renderQuickFoods();
        showToast(`已收藏 ${food.name}`,'success');
      }else{
        const food=favorites[idx];
        toggleFavoriteFood(p,food);
        saveData();
        renderQuickFoods();
        showToast('已取消收藏','info');
      }
    });
  });
}

function getAIFoodCacheKey(query){
  return String(query||'').trim().toLowerCase();
}
function getCachedAIFood(query){
  try{
    const cache=JSON.parse(localStorage.getItem(AI_FOOD_CACHE_KEY)||'{}');
    const food=normalizeAIFood(cache[getAIFoodCacheKey(query)]);
    if(food&&food.estimateVersion!==FOOD_AI_VERSION) return null;
    return food;
  }catch(e){
    console.warn('AI food cache read error:',e);
    return null;
  }
}
function setCachedAIFood(query,food){
  try{
    const cache=JSON.parse(localStorage.getItem(AI_FOOD_CACHE_KEY)||'{}');
    const normalized=normalizeAIFood(food);
    if(!normalized) return;
    cache[getAIFoodCacheKey(query)]=normalized;
    localStorage.setItem(AI_FOOD_CACHE_KEY,JSON.stringify(cache));
  }catch(e){
    console.warn('AI food cache write error:',e);
  }
}
function cleanupLegacyAIFoodCaches(){
  try{
    if(localStorage.getItem(AI_FOOD_CACHE_CLEANUP_KEY)==='1') return;
    const legacyKeys=[];
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);
      if(key&&key.startsWith(AI_FOOD_CACHE_PREFIX)&&key!==AI_FOOD_CACHE_KEY) legacyKeys.push(key);
    }
    legacyKeys.forEach(key=>localStorage.removeItem(key));
    localStorage.setItem(AI_FOOD_CACHE_CLEANUP_KEY,'1');
  }catch(e){
    console.warn('Legacy AI food cache cleanup error:',e);
  }
}
function showSearchResults(wrap){
  if(!wrap) return;
  if(wrap.id==='searchResults') wrap.classList.add('food-search-results-inline');
  wrap.style.display='block';
  // 食物搜索结果是页面内联下拉层，不应锁定整个 body。
  // 旧版本曾使用 food-search-results token；这里主动释放一次，避免残留导致移动端无法滑动。
  GlassScrollLock.unlock('food-search-results');
}
function hideSearchResults(wrap){
  if(!wrap) return;
  wrap.style.display='none';
  GlassScrollLock.unlock('food-search-results');
}
function normalizeConfidenceLabel(value){
  const map={high:'高',medium:'中',low:'低'};
  return map[String(value||'').toLowerCase()]||'中';
}
function clampEstimateReason(text){
  const value=String(text||'').replace(/\s+/g,'').trim();
  const fallback='该估算基于常见份量计算，实际热量会因油量、配料和制作方式变化。';
  const reason=value||fallback;
  return reason.length>80?`${reason.slice(0,78)}…`:reason;
}
function formatAIPortionText(src,unit,baseAmount){
  const explicit=String(src.portionText||src.portion_text||'').trim();
  if(explicit) return explicit.replace(/^AI搜索/,'AI估算');
  const n=Number(src.portionAmount??src.portion_amount??src.base_amount??src.base_weight??baseAmount);
  const portionUnit=String(src.portionUnit||src.portion_unit||(String(unit||'').toLowerCase().includes('ml')?'ml':'g')).trim()||'g';
  if(Number.isFinite(n)&&n>0) return `AI估算 · 常规份量（约${Math.round(n)}${portionUnit}）`;
  return 'AI估算 · 常见一份';
}
function normalizeAIFood(data){
  const src=data?.food||data;
  if(!src) return null;
  const name=String(src.name||src.foodName||'').trim();
  if(!name) return null;
  const toNumber=v=>{
    const n=Number(v);
    return Number.isFinite(n)?n:0;
  };
  const unit=String(src.unit||src.serving||src.portion||'份').trim()||'份';
  const portionAmount=toNumber(src.portionAmount??src.portion_amount??src.base_weight??src.base_amount);
  const baseAmount=Math.max(1,portionAmount||getUnitGram(unit)||100);
  const calories=toNumber(src.estimatedCalories??src.cal??src.calories);
  const carbs=toNumber(src.carb??src.carbs??src.carbohydrate);
  const protein=toNumber(src.pro??src.protein);
  const fat=toNumber(src.fat);
  const fiber=toNumber(src.fib??src.fiber);
  return {
    name,
    source:'ai',
    cat:'AI估算',
    unit,
    base_amount:baseAmount,
    base_weight:baseAmount,
    portionAmount:portionAmount||baseAmount,
    portionUnit:String(src.portionUnit||src.portion_unit||(String(unit).toLowerCase().includes('ml')?'ml':'g')).trim()||'g',
    portionText:formatAIPortionText(src,unit,baseAmount),
    cal:calories,
    calories,
    estimatedCalories:calories,
    calorieMin:toNumber(src.calorieMin??src.caloriesMin??src.minCalories??src.estimatedCalories??src.cal??src.calories),
    calorieMax:toNumber(src.calorieMax??src.caloriesMax??src.maxCalories??src.estimatedCalories??src.cal??src.calories),
    confidence:['high','medium','low'].includes(String(src.confidence||'').toLowerCase())?String(src.confidence).toLowerCase():'medium',
    estimateReason:clampEstimateReason(src.estimateReason),
    estimateVersion:src.estimateVersion||FOOD_AI_VERSION,
    carb:carbs,
    carbs,
    pro:protein,
    protein,
    fat,
    fib:fiber,
    fiber,
    quantity:1
  };
}
function cancelPendingFoodSearch(){
  if(aiFoodSearchTimer){
    clearTimeout(aiFoodSearchTimer);
    aiFoodSearchTimer=null;
  }
  if(aiFoodSearchController){
    aiFoodSearchController.abort();
    aiFoodSearchController=null;
  }
  aiFoodSearchRequestId++;
}
function resolveFoodSearchContext(options={}){
  const input=options.input||document.getElementById('foodSearch');
  const wrap=options.wrap||document.getElementById('searchResults');
  const addedWrap=options.addedWrap||document.getElementById('addedFoods');
  return {...options,input,wrap,addedWrap};
}
function logFoodSearchDebug(stage,context,data={}){
  console.debug('[FoodSearchDebug]',{
    stage,
    query:String(data.query||''),
    localMatchCount:Number(data.localMatchCount||0),
    aiRequested:!!data.aiRequested,
    requestId:data.requestId??aiFoodSearchRequestId,
    renderTarget:context?.wrap?.id||'(missing)',
    resultCount:Number(data.resultCount||0)
  });
}
async function searchFoodWithAI(query,signal){
  const response=await fetch(getApiUrl('/api/food-search'),{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    signal,
    body:JSON.stringify({query})
  });
  let data=null;
  try{
    data=await response.json();
  }catch(e){
    data=null;
  }
  // 400 = food not found or query too short — return null, don't abort the entire draft
  if(response.status===400) return null;
  if(!response.ok){
    throw new Error(data?.error||`HTTP ${response.status}`);
  }
  if(data?.found===false) return null;
  return normalizeAIFood(data?.food||data);
}
function renderAISearchResult(food,query,fromCache=false,options={}){
  const context=resolveFoodSearchContext(options);
  const {wrap,input,addedWrap}=context;
  if(!wrap||!input) return;
  const safeFood=normalizeAIFood(food);
  if(!safeFood){
    wrap.innerHTML='<div class="empty-state" style="padding:16px 10px"><div class="empty-state__desc">没有找到可靠的食物信息，请尝试输入更具体的食物名称</div></div>';
    showSearchResults(wrap);
    return;
  }
  const min=Math.round(safeFood.calorieMin||safeFood.cal);
  const max=Math.round(safeFood.calorieMax||safeFood.cal);
  const rangeText=min&&max&&min!==max?`${min}-${max} kcal`:'接近当前估算';
  wrap.innerHTML=`<div style="padding:6px 12px;color:var(--txt3);font-size:10px;font-weight:600">AI估算${fromCache?' · 缓存':''}</div>
    <div class="search-item ai-search-item" data-ai-food="1">
      <div class="ai-search-main">
        <div class="ai-search-left">
          <span class="si-name">${escapeHTML(safeFood.name)}</span>
          <span class="ai-search-source">${escapeHTML(safeFood.portionText)}</span>
          <button class="ai-detail-toggle" type="button" data-ai-detail-toggle aria-expanded="false">查看详情 &gt;</button>
        </div>
        <div class="ai-search-kcal">≈${Math.round(safeFood.cal)} kcal</div>
      </div>
      <div class="ai-food-details" data-ai-food-details hidden>
        <div class="ai-detail-grid">
          <span class="ai-detail-label">食物</span><span class="ai-detail-value">${escapeHTML(safeFood.name)}</span>
          <span class="ai-detail-label">估算热量</span><span class="ai-detail-value">约${Math.round(safeFood.cal)} kcal</span>
          <span class="ai-detail-label">热量范围</span><span class="ai-detail-value">${escapeHTML(rangeText)}</span>
          <span class="ai-detail-label">蛋白质</span><span class="ai-detail-value">${roundFoodValue(safeFood.pro,1)} g</span>
          <span class="ai-detail-label">碳水</span><span class="ai-detail-value">${roundFoodValue(safeFood.carb,1)} g</span>
          <span class="ai-detail-label">脂肪</span><span class="ai-detail-value">${roundFoodValue(safeFood.fat,1)} g</span>
          <span class="ai-detail-label">可信度</span><span class="ai-detail-value">${normalizeConfidenceLabel(safeFood.confidence)}</span>
        </div>
        <div class="ai-analysis">AI分析：${escapeHTML(safeFood.estimateReason)}</div>
      </div>
    </div>`;
  showSearchResults(wrap);
  const item=wrap.querySelector('[data-ai-food]');
  if(item){
    const toggle=item.querySelector('[data-ai-detail-toggle]');
    const details=item.querySelector('[data-ai-food-details]');
    if(toggle&&details){
      toggle.addEventListener('click',e=>{
        e.preventDefault();
        e.stopPropagation();
        const expanded=!details.hidden;
        details.hidden=expanded;
        toggle.setAttribute('aria-expanded',String(!expanded));
        details.dataset.expanded=String(!expanded);
        toggle.innerHTML=expanded?'查看详情 &gt;':'收起详情 ˄';
      });
    }
    item.addEventListener('click',e=>{
      if(e.target.closest?.('[data-ai-detail-toggle]')||e.target.closest?.('[data-ai-food-details]')) return;
      const picked=prepareFoodPortion({...safeFood,source:safeFood.source||'search',quantity:1});
      if(handleSearchFoodPick(picked,context)) return;
      if(foodDraftSession?.mode==='search'){
        foodDraftSession.pendingFood=picked;
        foodDraftSession.phase='edit';
        renderFoodDraftShell();
        input.value='';
        hideSearchResults(wrap);
        return;
      }
      foodDraft.push(picked);
      input.value='';
      hideSearchResults(wrap);
      renderAddedFoods(addedWrap,context);
      showToast(`已添加 ${safeFood.name}，可调整数量后确认`,'info');
    });
  }
  logFoodSearchDebug('render-ai',context,{query,resultCount:1,requestId:aiFoodSearchRequestId});
}

function renderSearchResults(query,options={}){
  const context=resolveFoodSearchContext(options);
  const {wrap,input,addedWrap}=context;
  if(!wrap||!input) return;
  if(!query||query.trim().length<1){
    cancelPendingFoodSearch();
    hideSearchResults(wrap);
    return;
  }
  const rawQuery=query.trim();
  const q=rawQuery.toLowerCase();
  const preferAI=shouldUseAIFoodEstimate(rawQuery);
  // 别名标准化：让"西红柿"等变体也能命中FOOD_DB中的"番茄"
  const canonical=normalizeFoodName(rawQuery);
  const searchTerms=[q];
  if(canonical.toLowerCase()!==q) searchTerms.push(canonical.toLowerCase());
  const results=preferAI?[]:FOOD_DB.filter(f=>{
    const fn=f.name.toLowerCase();
    return searchTerms.some(term=>fn.includes(term)||term.includes(fn))||f.cat.toLowerCase().includes(q);
  }).slice(0,12);
  logFoodSearchDebug('search',context,{query:rawQuery,localMatchCount:results.length,resultCount:results.length});
  if(results.length===0){
    cancelPendingFoodSearch();
    if(!q){
      wrap.innerHTML='<div class="empty-state" style="padding:16px 10px"><div class="empty-state__desc">未找到相关食物</div></div>';
      showSearchResults(wrap);
      return;
    }
    const cachedFood=getCachedAIFood(rawQuery)||(canonical!==rawQuery&&getCachedAIFood(canonical));
    if(cachedFood){
      renderAISearchResult(cachedFood,rawQuery,true,context);
      return;
    }
    const requestId=aiFoodSearchRequestId;
    wrap.innerHTML='<div class="ds-loading" style="padding:16px 10px"><div class="ds-spinner ds-spinner--inline"></div><div class="ds-loading__text">本地食物库未找到，AI 正在搜索…</div></div>';
    showSearchResults(wrap);
    logFoodSearchDebug('request-ai',context,{query:rawQuery,aiRequested:true,requestId});
    aiFoodSearchTimer=setTimeout(async()=>{
      aiFoodSearchTimer=null;
      if(requestId!==aiFoodSearchRequestId||input.value.trim().toLowerCase()!==q) return;
      const controller=new AbortController();
      aiFoodSearchController=controller;
      try{
        // 优先用标准名搜索AI（"梨子"→"梨"），命中率更高
        const aiFood=await searchFoodWithAI(canonical,controller.signal);
        if(requestId!==aiFoodSearchRequestId||input.value.trim().toLowerCase()!==q) return;
        if(!aiFood){
          wrap.innerHTML='<div class="empty-state" style="padding:16px 10px"><div class="empty-state__desc">没有找到可靠的食物信息，请尝试输入更具体的食物名称</div></div>';
          showSearchResults(wrap);
          return;
        }
        // 同时缓存原名和标准名，下次搜索任一变体都能命中
        setCachedAIFood(rawQuery,aiFood);
        if(canonical!==rawQuery) setCachedAIFood(canonical,aiFood);
        renderAISearchResult(aiFood,rawQuery,false,context);
      }catch(err){
        if(err?.name==='AbortError') return;
        if(requestId!==aiFoodSearchRequestId||input.value.trim().toLowerCase()!==q) return;
        console.error('AI food search error:',err);
        wrap.innerHTML='<div class="empty-state" style="padding:16px 10px"><div class="empty-state__desc" style="color:var(--red)">AI搜索暂时不可用，请稍后重试</div></div>';
        showSearchResults(wrap);
      }finally{
        if(aiFoodSearchController===controller) aiFoodSearchController=null;
      }
    },250);
    return;
  }
  cancelPendingFoodSearch();
  wrap.innerHTML=results.map(f=>{
    const idx=FOOD_DB.indexOf(f);
    const p=getHealthWriteProfile()||getActiveProfile();
    const isFav=isFavoriteFood(p,f);
    return `<div class="search-item" data-idx="${idx}">
      <div><span class="si-name">${f.name}</span><span class="si-cat">数据库 · ${f.unit}</span></div>
      <div style="display:flex;align-items:center;gap:6px">
        <span class="si-fav" data-fav-idx="${idx}" title="${isFav?'取消收藏':'收藏'}" style="cursor:pointer;font-size:14px;color:${isFav?'var(--gold)':'var(--txt3)'}">${icon('star')}</span>
        <div class="si-cal">${f.cal} kcal</div>
      </div>
    </div>`;
  }).join('');
  showSearchResults(wrap);
  wrap.querySelectorAll('.search-item').forEach(item=>{
    item.addEventListener('click',e=>{
      if(e.target.classList.contains('si-fav')){
        e.stopPropagation();
        if(!requireCurrentDeviceOwnerForHealthWrite()) return;
        const food=FOOD_DB[+e.target.dataset.favIdx];
        const p=getHealthWriteProfile()||getActiveProfile();
        const added=toggleFavoriteFood(p,food);
        saveData();
        renderQuickFoods();
        renderSearchResults(input.value,context);
        showToast(added?`已收藏 ${food.name}`:'已取消收藏',added?'success':'info');
        return;
      }
      const food=FOOD_DB[+item.dataset.idx];
      const picked=prepareFoodPortion({...food,source:'search',quantity:1});
      if(handleSearchFoodPick(picked,context)) return;
      if(foodDraftSession?.mode==='search'){
        foodDraftSession.pendingFood=picked;
        foodDraftSession.phase='edit';
        renderFoodDraftShell();
        input.value='';
        hideSearchResults(wrap);
        return;
      }
      foodDraft.push(picked);
      input.value='';
      hideSearchResults(wrap);
      renderAddedFoods(addedWrap,context);
    });
  });
}

// ==================== AI ANALYSIS ====================
function getDataURLBytes(dataURL){
  const text=String(dataURL||'');
  const b64=text.split(',')[1]||'';
  return Math.round(b64.length*3/4);
}
function formatBytes(bytes){
  const n=Number(bytes)||0;
  return n>1024*1024?`${(n/1024/1024).toFixed(2)}MB`:`${Math.round(n/1024)}KB`;
}
function logFoodAI(stage,data={}){
  console.info('[FoodAI]',{stage,...data});
}
function compressFoodImage(file,{maxSide=1024,quality=.76}={}){
  const start=performance.now();
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error('图片读取失败'));
    reader.onload=()=>{
      const originalURL=reader.result;
      const img=new Image();
      img.onerror=()=>reject(new Error('图片解析失败'));
      img.onload=()=>{
        const scale=Math.min(1,maxSide/Math.max(img.width,img.height));
        const width=Math.max(1,Math.round(img.width*scale));
        const height=Math.max(1,Math.round(img.height*scale));
        const canvas=document.createElement('canvas');
        canvas.width=width;
        canvas.height=height;
        const ctx=canvas.getContext('2d');
        ctx.drawImage(img,0,0,width,height);
        let compressedURL=canvas.toDataURL('image/jpeg',quality);
        let compressedBytes=getDataURLBytes(compressedURL);
        // 尽量控制在 300KB-500KB；若仍偏大，逐步降低质量但不低于70%
        if(compressedBytes>520*1024){
          for(const q of [.72,.70]){
            compressedURL=canvas.toDataURL('image/jpeg',q);
            compressedBytes=getDataURLBytes(compressedURL);
            if(compressedBytes<=520*1024) break;
          }
        }
        const originalBytes=file.size||getDataURLBytes(originalURL);
        const result={url:compressedURL,originalURL,originalBytes,compressedBytes,width,height,quality,ms:Math.round(performance.now()-start)};
        logFoodAI('imageCompress',{
          ms:result.ms,
          originalBytes:result.originalBytes,
          compressedBytes:result.compressedBytes,
          originalSize:formatBytes(result.originalBytes),
          compressedSize:formatBytes(result.compressedBytes),
          width,
          height
        });
        resolve(result);
      };
      img.src=originalURL;
    };
    reader.readAsDataURL(file);
  });
}
function parseAIJsonArray(text){
  const raw=String(text||'').trim();
  const match=raw.match(/\[[\s\S]*\]/);
  if(!match) return [];
  try{return JSON.parse(match[0])}catch(e){return []}
}
function findNutritionReference(name){
  // findLocalFoodByName already checks aliases, this fallback adds canonical-name fuzzy match
  return findLocalFoodByName(name)||FOOD_DB.find(f=>String(name||'').includes(f.name)||f.name.includes(String(name||'')))||null;
}
function normalizePhotoFoodItem(item,phase='quick'){
  const name=String(item?.food||item?.name||'未知食物').trim()||'未知食物';
  const ref=findNutritionReference(name);
  const estimatedWeight=Number(item?.estimatedWeight??item?.weight??item?.estimated_weight??item?.amount);
  const weightStep=estimatedWeight<100?5:10;
  const amount=Number.isFinite(estimatedWeight)&&estimatedWeight>0?Math.max(weightStep,Math.round(estimatedWeight/weightStep)*weightStep):(ref?getFoodBaseAmount(ref):100);
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
  return prepareFoodPortion({
    ...(ref||{}),
    name,
    cat:item?.cat||item?.category||ref?.cat||'AI识别',
    unit:'g',
    source:'ai_photo',
    base_amount:baseAmount,
    base_weight:baseAmount,
    cal:base.cal,
    pro:base.pro,
    fat:base.fat,
    carb:base.carb,
    fib:base.fib,
    amount,
    estimatedWeight:amount,
    confidence:['low','medium','high'].includes(String(item?.confidence||'').toLowerCase())?String(item.confidence).toLowerCase():'medium',
    estimateReason:item?.reason||item?.estimateReason||'图片估算重量可能存在误差，请按实际份量修正',
    aiAdvice:item?.advice||item?.aiAdvice||item?.suggestion||'图片估算重量可能存在误差，请按实际份量修正',
    aiStage:phase
  });
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
  const aiMs=Math.round(performance.now()-aiStart);
  logFoodAI('AI',{stage,ms:aiMs,ok:response.ok});
  if(!response.ok){
    const msg=data?.error||data?.message||`请求失败：HTTP ${response.status}`;
    throw new Error(msg);
  }
  return data?.text||'';
}
async function startAIAnalysis(photoURL,targetProfileId=aiAnalysisTargetProfileId||getHealthWriteProfile()?.id||''){
  aiAnalysisTargetProfileId=targetProfileId;
  foodDraft=[];
  foodDraftSession=null;
  const modal=document.getElementById('aiModal');
  const content=document.getElementById('aiModalContent');
  modal.classList.add('show');
  GlassScrollLock.lock('modal:aiModal');

  const aiCfg=getAIConfig();
  const totalStart=performance.now();

  // Check if real API is configured
  if(aiCfg.apiKey&&aiCfg.modelId){
    // Real Bailian (Qwen-VL) API call
    content.innerHTML=`
      <div class="ai-scanning">
        <img src="${photoURL}" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-bottom:8px">
        <div class="ai-scan-ring"></div>
        <div class="ai-scan-text">正在识别食物并估算营养...</div>
      </div>`;

    try{
      const promptText='请一次完成图片中的菜品识别、份量估算和营养估算，只返回严格JSON数组，不要Markdown或解释。每项必须包含：food(食物名称)、category(主食/菜肴/肉类/水果/饮品/其他)、estimatedWeight(合理取整的估算克数)、confidence(low/medium/high)、calories_per_100g、protein_per_100g、fat_per_100g、carbs_per_100g、fiber_per_100g、reason、advice。根据餐盘占比、常见盛装方式和常规份量估算重量；不要生成假精确重量，无法判断时使用合理的粗粒度整数并将confidence降为low；营养值按该菜品常见做法的每100g数值估算；reason简短说明图片判断依据；advice提醒用户可按实际食用量调整。';
      const parseStart=performance.now();
      const text=await callFoodVisionAI(photoURL,promptText,aiCfg,'complete');
      const foods=parseAIJsonArray(text);
      logFoodAI('parse',{stage:'complete',ms:Math.round(performance.now()-parseStart),count:foods.length});
      if(!foods.length) throw new Error('无法解析AI返回结果');
      foodDraft=foods.map(f=>normalizePhotoFoodItem(f,'complete'));
      logFoodAI('total',{ms:Math.round(performance.now()-totalStart)});
      renderAIResults(photoURL,targetProfileId,{detailReady:true});
      return;
    }catch(err){
      console.error('Bailian API error:',err);
      logFoodAI('total',{ms:Math.round(performance.now()-totalStart),failed:true});
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
    const mealFoods=FOOD_DB.filter(f=>['主食','菜肴','肉类','蛋奶'].includes(f.cat));
    const vegFoods=FOOD_DB.filter(f=>f.cat==='蔬菜');
    const picked=[];
    // Pick a main
    picked.push(mealFoods[Math.floor(Math.random()*mealFoods.length)]);
    // Maybe pick a veg
    if(Math.random()>0.3) picked.push(vegFoods[Math.floor(Math.random()*vegFoods.length)]);
    // Maybe pick a drink/snack
    if(Math.random()>0.5){
      const extras=FOOD_DB.filter(f=>['饮品','水果'].includes(f.cat));
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
  if(!document.getElementById('aiFoodDraftHost')||!document.querySelector('#aiModalContent .meal-seg')){
    mealSelectionTouched=false;
    currentMeal=getMealTypeByDateTime(toLocalDateTimeValue());
  }
  const content=document.getElementById('aiModalContent');
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
  bindFoodDraftReview(host,{
    mode:'ai',
    onRefresh:refreshAI,
    onAddMore:()=>openFoodDraftSearchOverlay({onJoined:refreshAI}),
    onCancel:()=>{
      foodDraft=[];
      foodDraftSession=null;
      closeModal('aiModal');
      clearPhotoZone();
    },
    onConfirm:()=>confirmFoodDraft({mode:'ai',targetProfileId})
  });
  document.getElementById('aiRescanBtn').addEventListener('click',()=>{
    foodDraft=[];
    foodDraftSession=null;
    startAIAnalysis(photoURL,targetProfileId);
  });
}

// ==================== ACTIONS ====================
function recordWeight(){
  if(!requireCurrentDeviceOwnerForHealthWrite()) return;
  const input=document.getElementById('weightInput');
  const bodyFatInput=document.getElementById('bodyFatInput');
  const w=parseFloat(input.value);
  if(!w||w<20||w>300){
    showToast('请输入有效的体重（20-300kg）','error');
    return;
  }
  const p=editingWeightId?getActiveProfile():getHealthWriteProfile();
  if(editingWeightId&&!requireEditableHealthProfile(p)) return;
  const bmi=calcBMI(w,p.height);
  const manualBodyFat=parseFloat(bodyFatInput?.value);
  const estimatedBodyFat=calcBodyFatPercent(w,p);
  let bodyFat=null;
  let bodyFatSource='';
  if(manualBodyFat>=3&&manualBodyFat<=70){
    bodyFat=+manualBodyFat.toFixed(1);
    bodyFatSource='manual';
  }else if(bodyFatInput?.value){
    showToast('体脂率请输入 3-70 之间的有效数值，或留空自动估算','error');
    return;
  }else if(estimatedBodyFat){
    bodyFat=estimatedBodyFat;
    bodyFatSource='estimated';
  }
  const dateTime=normalizeDateTime(getTimePickerValue('weightTime'));
  const date=dateFromDateTimeValue(dateTime);
  p.weightRecords=p.weightRecords||[];
  const payload=withProfileId(p,{date,dateTime,weight:w,bmi:bmi,bodyFat:bodyFat,bodyFatSource:bodyFatSource});
  const wasEditing=!!editingWeightId;
  if(editingWeightId){
    const record=p.weightRecords.find(r=>r.id===editingWeightId);
    if(record){
      Object.assign(record,payload);
    }else{
      p.weightRecords.push(withProfileId(p,{id:editingWeightId,...payload}));
    }
  }else{
    p.weightRecords.push(withProfileId(p,{
      id:'w'+Date.now()+Math.random().toString(36).substr(2,5),
      ...payload
    }));
  }
  p.weightRecords.sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
  input.value='';
  if(bodyFatInput) bodyFatInput.value='';
  editingWeightId=null;
  document.getElementById('recordWeightBtn').textContent='记录';
  resetTimePicker('weightTime');
  showToast(`${wasEditing?'已更新':'已记录'} ${formatDateTime(dateTime)} 的体重${bodyFat?`和体脂${bodyFat}%`:''}`,'success');
  // 体重变化 → 失效当前 profile 的所有 AI 健康教练缓存（最新体重影响 BMR/TDEE）
  invalidateHealthCoachProfile(p);
  saveData();
  renderDashboard();
}

function confirmAddFoods(options={}){
  confirmFoodDraft({...options,mode:'search'});
}

function clearPhotoZone(targetZone=document.getElementById('photoZone')){
  const zone=targetZone;
  if(!zone) return;
  aiAnalysisTargetProfileId='';
  zone.classList.remove('has-photo');
  zone.innerHTML=`
    <div class="ph-icon">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
    </div>
    <div class="ph-text">点击或拖拽上传食物照片</div>
    <div class="ph-hint">AI将自动识别食物并估算卡路里</div>`;
}

async function handlePhotoFile(file,{zone:targetZone=null,onAnalysisStart=null}={}){
  if(!requireCurrentDeviceOwnerForHealthWrite()) return;
  if(!file||!file.type.startsWith('image/')){
    showToast('请上传图片文件','error');
    return;
  }
  const totalStart=performance.now();
  try{
    const zone=targetZone||document.getElementById('photoZone');
    if(!zone) throw new Error('拍照识别容器不存在');
    zone.classList.add('has-photo');
    zone.innerHTML=`<div style="padding:18px 12px;text-align:center;color:var(--txt3);font-size:12px">正在压缩图片...</div>`;
    const compressed=await compressFoodImage(file,{maxSide:1024,quality:.76});
    const url=compressed.url;
    zone.innerHTML=`<img src="${url}"><button class="ph-clear" id="phClear" aria-label="清除图片">${icon('x')}</button>`;
    document.getElementById('phClear').addEventListener('click',(ev)=>{
      ev.stopPropagation();
      clearPhotoZone(zone);
    });
    logFoodAI('total',{phase:'beforeAI',ms:Math.round(performance.now()-totalStart),compressedBytes:compressed.compressedBytes});
    startAIAnalysis(url,getHealthWriteProfile()?.id||'');
    onAnalysisStart?.();
  }catch(err){
    console.error('Food image compress error:',err);
    logFoodAI('imageCompress',{failed:true,error:err.message});
    showToast('图片处理失败，请换一张照片重试','error');
    clearPhotoZone(targetZone||document.getElementById('photoZone'));
  }
}

// ==================== SETTINGS ====================
function openSettings(mode='home'){
  const activeProfile=getActiveProfile();
  settingsProfileId=state.activeProfileId||activeProfile?.id||'';
  settingsViewMode=mode||'home';
  renderViewerSelect();
  renderSettingsForm();
  // Populate family code
  const syncCodeEl=document.getElementById('setSyncCode');
  if(syncCodeEl) syncCodeEl.value=state.familyCode||'';
  const syncResultEl=document.getElementById('syncTestResult');
  if(syncResultEl) syncResultEl.innerHTML='';
  document.getElementById('settingsModal').classList.add('show');
  GlassScrollLock.lock('modal:settingsModal');
}
function openProfileSettings(){
  openSettings('profile');
}
function openGoalSettings(){
  openSettings('goal');
}
function openSyncSettings(){
  openSettings('sync');
}
function renderViewerSelect(){
  const wrap=document.getElementById('viewerSelect');
  if(!wrap) return;
  wrap.innerHTML=state.profiles.map(p=>{
    const isActive=p.id===settingsProfileId;
    const avatarHtml=getProfileAvatarHtml(p);
    return `<div class="profile-select-btn ${isActive?'active':''}" data-pid="${p.id}" data-role="viewer"><span class="avatar">${avatarHtml}</span> ${escapeHTML(getDisplayName(p))}</div>`;
  }).join('');
  wrap.querySelectorAll('[data-role="viewer"]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      settingsProfileId=btn.dataset.pid||'';
      settingsViewMode='home';
      setCurrentProfile(btn.dataset.pid,{render:false});
      renderViewerSelect();
      renderSettingsForm();
      renderAll();
    });
  });
}
function setSettingsViewMode(mode){
  settingsViewMode=mode||'home';
  renderSettingsForm();
}
function renderSettingsChrome(){
  const mode=settingsViewMode;
  const isHome=mode==='home';
  const isSync=mode==='sync';
  const showSave=(mode==='profile'||mode==='goal');
  const isSecondaryEdit=(mode==='profile'||mode==='goal');
  const modal=document.getElementById('settingsModal');
  const syncSection=document.getElementById('settingsSyncSection');
  const saveBtn=document.getElementById('saveSettingsBtn');
  const editFooter=document.getElementById('settingsEditFooter');
  const subtitleEl=document.getElementById('settingsModalSubtitle');
  const rebindBtn=document.getElementById('rebindDeviceOwnerBtn');
  const dataActions=document.getElementById('settingsDataActions');
  const profileChooser=document.getElementById('settingsProfileChooser');
  const titleEl=document.getElementById('settingsModalTitle');
  if(modal){
    modal.classList.toggle('settings-centered-modal',mode==='profile'||mode==='goal'||mode==='sync');
    modal.classList.toggle('settings-secondary-edit',isSecondaryEdit);
  }
  if(titleEl){
    const titleMap={home:'设置',profile:'编辑个人资料',goal:'编辑健康目标',sync:'同步与设备管理'};
    titleEl.textContent=titleMap[mode]||'设置';
  }
  if(subtitleEl){
    subtitleEl.textContent='';
    subtitleEl.style.display='none';
  }
  if(syncSection) syncSection.style.display=isSync?'block':'none';
  if(editFooter) editFooter.style.display=showSave?'grid':'none';
  if(saveBtn){
    saveBtn.textContent='保存修改';
  }
  if(rebindBtn) rebindBtn.style.display=(isSync&&isCoupleMode())?'block':'none';
  if(dataActions) dataActions.style.display=isSync?'flex':'none';
  if(profileChooser) profileChooser.style.display=isSync?'block':'none';
  const syncCodeEl=document.getElementById('setSyncCode');
  if(syncCodeEl) syncCodeEl.value=state.familyCode||'';
  updateSyncConfigPanel();
}
function settingsValue(v,unit=''){
  if(v===null||v===undefined||v==='') return '未填写';
  return `${v}${unit}`;
}
function updateSettingsEditSubtitle(p){
  const subtitleEl=document.getElementById('settingsModalSubtitle');
  if(!subtitleEl) return;
  if(settingsViewMode!=='goal'||!p){
    subtitleEl.textContent='';
    subtitleEl.style.display='none';
    return;
  }
  const goal=getHealthGoal(p);
  const latest=getLatestWeight(p);
  const currentWeight=latest?.weight;
  const target=goal.target_weight||p.goalWeight;
  const parts=[goal.title||'健康保持'];
  if(currentWeight) parts.push(`当前${Number(currentWeight).toFixed(0)}kg`);
  if(target) parts.push(`目标${Number(target).toFixed(0)}kg`);
  subtitleEl.textContent=parts.join(' · ');
  subtitleEl.style.display='block';
}
function renderSettingsHome(p){
  const healthGoal=getHealthGoal(p);
  const progress=getGoalProgress(p);
  const latestWeight=getLatestWeight(p);
  const age=calcAge(p.birthDate);
  const genderLabel=p.gender==='male'?'男':(p.gender==='female'?'女':'未填写');
  const currentWeight=progress.current||latestWeight?.weight||null;
  const targetWeight=progress.target||healthGoal.target_weight||p.goalWeight||null;
  const owner=getDeviceOwnerProfile();
  const ownerLabel=owner?getDisplayName(owner):'未绑定';
  const syncLabel=isCloudConfigured()?'已配置':'未配置';
  return `
    <div class="settings-home">
      <div class="settings-home-card">
        <div class="settings-home-head">
          <div class="settings-home-title">个人资料摘要</div>
          <button class="settings-home-action" type="button" data-settings-go="profile">编辑</button>
        </div>
        <div class="settings-home-grid three">
          <div class="settings-home-item"><span>昵称</span><strong>${escapeHTML(p.name||getDisplayName(p))}</strong></div>
          <div class="settings-home-item"><span>性别</span><strong>${escapeHTML(genderLabel)}</strong></div>
          <div class="settings-home-item"><span>年龄</span><strong>${escapeHTML(settingsValue(age,'岁'))}</strong></div>
          <div class="settings-home-item"><span>身高</span><strong>${escapeHTML(settingsValue(p.height,'cm'))}</strong></div>
          <div class="settings-home-item"><span>体重</span><strong>${escapeHTML(settingsValue(currentWeight,'kg'))}</strong></div>
        </div>
      </div>
      <div class="settings-home-card">
        <div class="settings-home-head">
          <div class="settings-home-title">健康目标摘要</div>
          <button class="settings-home-action" type="button" data-settings-go="goal">编辑</button>
        </div>
        <div class="settings-home-grid">
          <div class="settings-home-item"><span>目标类型</span><strong>${escapeHTML(healthGoal.title||'健康保持')}</strong></div>
          <div class="settings-home-item"><span>当前体重</span><strong>${escapeHTML(settingsValue(currentWeight,'kg'))}</strong></div>
          <div class="settings-home-item"><span>目标体重</span><strong>${escapeHTML(settingsValue(targetWeight,'kg'))}</strong></div>
          <div class="settings-home-item"><span>进度</span><strong>${progress.pct?`${progress.pct}%`:'待记录'}</strong></div>
        </div>
        <div class="goal-progress-track" aria-hidden="true"><div class="goal-progress-fill" style="width:${progress.pct||0}%"></div></div>
        <div class="settings-home-note">${escapeHTML(progress.remainingText||'继续记录后估算进度')}</div>
      </div>
      <div class="settings-home-card">
        <div class="settings-home-head">
          <div class="settings-home-title">同步 / 设备摘要</div>
          <button class="settings-home-action" type="button" data-settings-go="sync">管理</button>
        </div>
        <div class="settings-home-grid">
          <div class="settings-home-item"><span>云同步</span><strong>${escapeHTML(syncLabel)}</strong></div>
          <div class="settings-home-item"><span>当前设备</span><strong>${escapeHTML(ownerLabel)}</strong></div>
        </div>
        <div class="settings-home-note">点管理进入同步、设备、导入导出。</div>
      </div>
    </div>`;
}
function renderSettingsForm(){
  const wrap=document.getElementById('settingsProfileSelect');
  const activeProfile=getActiveProfile();
  settingsProfileId=settingsProfileId||state.activeProfileId||activeProfile?.id||'';
  const p=getProfile(settingsProfileId);
  renderSettingsChrome();
  if(wrap){
    wrap.innerHTML=`<div class="profile-select-btn active">${p?`<span class="avatar">${getProfileAvatarHtml(p)}</span>`:''} ${escapeHTML(p?getDisplayName(p):'未选择档案')}</div>`;
  }

  if(!p){
    document.getElementById('settingsForm').innerHTML='<div class="app-page-note">请先选择要编辑健康目标的档案。</div>';
    return;
  }
  updateSettingsEditSubtitle(p);
  if(settingsViewMode==='home'){
    document.getElementById('settingsForm').innerHTML=renderSettingsHome(p);
    document.querySelectorAll('[data-settings-go]').forEach(btn=>{
      btn.addEventListener('click',()=>setSettingsViewMode(btn.dataset.settingsGo));
    });
    return;
  }
  if(settingsViewMode==='profile'){
    document.getElementById('settingsForm').innerHTML=renderProfileEditPage(p);
    document.getElementById('settingsBackHomeBtn')?.addEventListener('click',()=>closeModal('settingsModal'));
    bindAvatarUploadEvents(settingsProfileId);
    return;
  }
  if(settingsViewMode==='goal'){
    document.getElementById('settingsForm').innerHTML=renderGoalEditPage(p);
    document.getElementById('settingsBackHomeBtn')?.addEventListener('click',()=>closeModal('settingsModal'));
    updateGoalFieldVisibility();
    bindGoalPlanUI();
    GlassUI.enhance(document.getElementById('settingsForm'));
    syncGoalPlanFieldsUI();
    updateSettingsPreview();
    ['setGoalType','setGoalWeight','setStartWeight','setGoalTargetDate','setWeeklyChange','setTargetGain','setTrainingDays','setExerciseDays','setSleepTarget'].forEach(id=>{
      const el=document.getElementById(id);
      if(!el) return;
      const onPlanValueChange=()=>{ updateGoalPlanComputedValues(); updateSettingsPreview(); };
      el.addEventListener('input',onPlanValueChange);
      el.addEventListener('change',onPlanValueChange);
    });
    return;
  }
  if(settingsViewMode==='sync'){
    document.getElementById('settingsForm').innerHTML='<div class="settings-sync-hint">同步、设备绑定、导入导出请在下方操作</div>';
    return;
  }
}
function renderProfileEditPage(p){
  const latest=getLatestWeight(p);
  const currentWeight=latest?.weight||null;
  const activityOptions=[
    {val:'sedentary',label:'久坐 (×1.2)'},
    {val:'light',label:'轻度 (×1.375)'},
    {val:'moderate',label:'中度 (×1.55)'},
    {val:'active',label:'高度 (×1.725)'},
    {val:'veryActive',label:'极度 (×1.9)'},
  ];
  return `
    <div class="profile-avatar-edit">
      <div class="avatar-preview-wrap">
        ${p.avatar 
          ? `<img src="${p.avatar}" alt="头像" class="avatar-preview-img" onerror="this.style.display='none';this.nextElementSibling.style.display=''">
             <span class="avatar-preview-fallback" style="display:none">${getGenderIcon(p.gender)||'·'}</span>`
          : `<span class="avatar-preview-default" style="background:${p.gender==='male'?'rgba(96,165,250,0.2)':p.gender==='female'?'rgba(167,139,250,0.2)':'rgba(212,175,55,0.2)'};color:${p.gender==='male'?'var(--blue)':p.gender==='female'?'var(--purple)':'var(--gold)'}">${getGenderIcon(p.gender)||'·'}</span>`
        }
      </div>
      <div class="avatar-actions">
        <button type="button" class="avatar-btn" id="uploadAvatarBtn">更换头像</button>
        ${p.avatar ? '<button type="button" class="avatar-btn avatar-btn-remove" id="removeAvatarBtn">恢复默认</button>' : ''}
      </div>
      <input type="file" id="avatarFileInput" accept="image/*" style="display:none">
    </div>
    <div class="form-group">
      <label>昵称</label>
      <input class="form-input" id="setName" value="${escapeHTML(p.name||'')}" placeholder="例：你的昵称">
    </div>
    <div class="form-group">
      <label>顶部显示称呼</label>
      <input class="form-input" id="setDisplayName" value="${escapeHTML(p.displayName||'')}" placeholder="用于首页和双人切换显示" maxlength="12">
      <div class="form-hint">用于首页和双人切换显示，留空则默认"我/Ta"</div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>性别</label>
        <select class="form-select" id="setGender">
          <option value="" ${!p.gender?'selected':''}>请选择</option>
          <option value="male" ${p.gender==='male'?'selected':''}>男</option>
          <option value="female" ${p.gender==='female'?'selected':''}>女</option>
        </select>
      </div>
      <div class="form-group">
        <label>出生日期</label>
        <input class="form-input" type="date" id="setBirthDate" value="${p.birthDate||''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>身高 (cm)</label>
        <input class="form-input" type="number" id="setHeight" value="${p.height||''}" placeholder="175" min="50" max="250">
      </div>
      <div class="form-group">
        <label>当前体重 (kg)</label>
        <div class="form-readonly-val">${currentWeight?currentWeight.toFixed(1):'暂无记录'}</div>
      </div>
    </div>
    <div class="form-group">
      <label>活动水平</label>
      <select class="form-select" id="setActivity">
        <option value="" ${!p.activityLevel?'selected':''}>请选择</option>
        ${activityOptions.map(o=>`<option value="${o.val}" ${p.activityLevel===o.val?'selected':''}>${o.label}</option>`).join('')}
      </select>
    </div>`;
}
function getGoalPlanMode(goal){
  const mode=goal?.plan_mode;
  return mode==='target_date'?'target_date':'weekly_change';
}
function getGoalPlanCurrentWeight(profile){
  const latest=getLatestWeight(profile);
  const w=Number(latest?.weight);
  return Number.isFinite(w)&&w>0?w:null;
}
function addDaysToDateStr(dateStr,days){
  const d=new Date(dateStr+'T12:00:00');
  if(Number.isNaN(d.getTime())) return '';
  d.setDate(d.getDate()+Math.round(days));
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function daysBetweenDateStr(fromStr,toStr){
  const a=new Date(fromStr+'T12:00:00');
  const b=new Date(toStr+'T12:00:00');
  if(Number.isNaN(a.getTime())||Number.isNaN(b.getTime())) return null;
  return Math.round((b-a)/86400000);
}
function formatGoalPlanDate(dateStr){
  if(!dateStr) return '--';
  const parts=dateStr.split('-').map(Number);
  if(parts.length<3||!parts[0]||!parts[1]||!parts[2]) return dateStr;
  return `${parts[0]}年${parts[1]}月${parts[2]}日`;
}
function computeGoalPlanFromWeekly(profile,weeklyChange,targetWeight){
  const current=getGoalPlanCurrentWeight(profile);
  if(current==null) return {ok:false,reason:'missing_weight',message:'请先记录当前体重'};
  const target=Number(targetWeight);
  if(!Number.isFinite(target)||target<=0) return {ok:false,reason:'missing_target'};
  const remain=current-target;
  if(remain<=0) return {ok:false,reason:'reached',message:'已达到目标'};
  const wc=Number(weeklyChange);
  if(!Number.isFinite(wc)||wc<=0) return {ok:false,reason:'invalid_weekly',message:'请输入有效的每周目标减重'};
  const weeks=remain/wc;
  return {ok:true,targetDate:addDaysToDateStr(todayStr(),weeks*7),weeklyChange:wc,remain,weeks};
}
function computeGoalPlanFromDate(profile,targetWeight,targetDateStr){
  const current=getGoalPlanCurrentWeight(profile);
  if(current==null) return {ok:false,reason:'missing_weight',message:'请先记录当前体重'};
  const target=Number(targetWeight);
  if(!Number.isFinite(target)||target<=0) return {ok:false,reason:'missing_target'};
  const remain=current-target;
  if(remain<=0) return {ok:false,reason:'reached',message:'已达到目标'};
  if(!targetDateStr) return {ok:false,reason:'missing_date',message:'请选择目标日期'};
  const days=daysBetweenDateStr(todayStr(),targetDateStr);
  if(days===null) return {ok:false,reason:'invalid_date',message:'目标日期无效'};
  if(days<=0) return {ok:false,reason:'date_past',message:'目标日期需晚于今天'};
  const weeklyChange=+(remain/(days/7)).toFixed(2);
  if(!Number.isFinite(weeklyChange)||weeklyChange<=0) return {ok:false,reason:'invalid',message:'无法计算预计每周减重'};
  return {ok:true,weeklyChange,targetDate:targetDateStr,remain,days};
}
function getGoalPlanModeFromUI(){
  return document.querySelector('#goalPlanModeSeg .meal-seg-btn.active')?.dataset.planMode==='target_date'?'target_date':'weekly_change';
}
function unwrapGoalWeeklyStepper(){
  const input=document.getElementById('setWeeklyChange');
  if(!input) return;
  const stepper=input.closest('.glass-stepper');
  if(stepper){
    stepper.parentNode.insertBefore(input,stepper);
    stepper.remove();
  }
  input.classList.remove('glass-stepper-input');
  delete input.dataset.glassEnhanced;
}
function ensureGoalWeeklyStepper(){
  const wrap=document.getElementById('goalWeeklyEditableWrap');
  const input=document.getElementById('setWeeklyChange');
  if(!wrap||!input||input.closest('.glass-stepper')) return;
  delete input.dataset.glassEnhanced;
  window.GlassUI?.enhance?.(wrap);
}
function unwrapGoalDatePicker(){
  const input=document.getElementById('setGoalTargetDate');
  if(!input) return;
  const field=input.nextElementSibling?.classList?.contains('glass-date-field')?input.nextElementSibling:null;
  if(field) field.remove();
  input.classList.remove('glass-native-date');
  delete input.dataset.glassEnhanced;
}
function ensureGoalDatePicker(){
  const wrap=document.getElementById('goalDateEditableWrap');
  const input=document.getElementById('setGoalTargetDate');
  if(!wrap||!input||input.dataset.glassEnhanced==='date') return;
  delete input.dataset.glassEnhanced;
  window.GlassUI?.enhance?.(wrap);
}
function updateGoalPlanComputedValues(){
  const type=document.getElementById('setGoalType')?.value;
  if(type!=='fat_loss') return;
  const p=getProfile(settingsProfileId);
  const mode=getGoalPlanModeFromUI();
  const weeklyInput=document.getElementById('setWeeklyChange');
  const dateInput=document.getElementById('setGoalTargetDate');
  const weeklyReadonlyVal=document.getElementById('goalWeeklyReadonlyVal');
  const dateReadonlyVal=document.getElementById('goalDateReadonlyVal');
  const statusEl=document.getElementById('goalPlanStatus');
  const targetWeight=parseFloat(document.getElementById('setGoalWeight')?.value);
  if(!weeklyInput||!dateInput||!weeklyReadonlyVal||!dateReadonlyVal) return;
  const tomorrow=addDaysToDateStr(todayStr(),1);
  dateInput.min=tomorrow;
  let statusMsg='';
  if(mode==='weekly_change'){
    const calc=computeGoalPlanFromWeekly(p,parseFloat(weeklyInput.value),targetWeight);
    dateReadonlyVal.textContent=calc.ok?formatGoalPlanDate(calc.targetDate):(calc.message||'--');
    if(!calc.ok&&calc.message) statusMsg=calc.message;
  }else{
    const calc=computeGoalPlanFromDate(p,targetWeight,dateInput.value);
    weeklyReadonlyVal.textContent=calc.ok?String(calc.weeklyChange):(calc.message||'--');
    if(!calc.ok&&calc.message) statusMsg=calc.message;
  }
  if(statusEl){
    statusEl.textContent=statusMsg;
    statusEl.style.display=statusMsg?'block':'none';
  }
}
function applyGoalPlanModeLayout(){
  const type=document.getElementById('setGoalType')?.value;
  if(type!=='fat_loss') return;
  const mode=getGoalPlanModeFromUI();
  const weeklyEditable=document.getElementById('goalWeeklyEditableWrap');
  const weeklyReadonly=document.getElementById('goalWeeklyReadonly');
  const dateEditable=document.getElementById('goalDateEditableWrap');
  const dateReadonly=document.getElementById('goalDateReadonly');
  const weeklyLabel=document.getElementById('goalWeeklyFieldLabel');
  const dateLabel=document.getElementById('goalDateFieldLabel');
  if(!weeklyEditable||!weeklyReadonly||!dateEditable||!dateReadonly||!weeklyLabel||!dateLabel) return;
  if(mode==='weekly_change'){
    weeklyLabel.textContent='每周目标减重 (kg)';
    dateLabel.textContent='预计达标日期';
    unwrapGoalDatePicker();
    weeklyEditable.hidden=false;
    ensureGoalWeeklyStepper();
    weeklyReadonly.hidden=true;
    dateEditable.hidden=true;
    dateReadonly.hidden=false;
  }else{
    weeklyLabel.textContent='预计每周减重';
    dateLabel.textContent='目标日期';
    unwrapGoalWeeklyStepper();
    weeklyEditable.hidden=true;
    weeklyReadonly.hidden=false;
    dateEditable.hidden=false;
    ensureGoalDatePicker();
    dateReadonly.hidden=true;
  }
}
function getDeficitPlanModeFromUI(){
  return document.querySelector('#goalDeficitPlanSeg .meal-seg-btn.active')
    ?.dataset.deficitPlanMode||'personalized';
}

function applyDeficitPlanModeLayout(){
  const type=document.getElementById('setGoalType')?.value;
  if(type!=='fat_loss') return;
  const mode=getDeficitPlanModeFromUI();
  const recommendedWrap=document.getElementById('goalRecommendedPlanWrap');
  const personalizedWrap=document.getElementById('goalPersonalizedPlanWrap');
  if(!recommendedWrap||!personalizedWrap) return;
  if(mode==='recommended'){
    if(window.GlassUI?.closeAll) GlassUI.closeAll();
    // Remove enhanced interactive triggers so recommended stays non-editable.
    const weeklyEditable=document.getElementById('goalWeeklyEditableWrap');
    const dateEditable=document.getElementById('goalDateEditableWrap');
    const weeklyReadonly=document.getElementById('goalWeeklyReadonly');
    const dateReadonly=document.getElementById('goalDateReadonly');
    if(weeklyEditable) weeklyEditable.hidden=true;
    if(dateEditable) dateEditable.hidden=true;
    if(weeklyReadonly) weeklyReadonly.hidden=true;
    if(dateReadonly) dateReadonly.hidden=true;
    unwrapGoalWeeklyStepper();
    unwrapGoalDatePicker();
    personalizedWrap.hidden=true;
    recommendedWrap.hidden=false;
  }else{
    recommendedWrap.hidden=true;
    personalizedWrap.hidden=false;
  }
}

function updateRecommendedDeficitPlanComputedValues(){
  const type=document.getElementById('setGoalType')?.value;
  if(type!=='fat_loss') return;
  const p=getProfile(settingsProfileId);
  const targetWeight=parseFloat(document.getElementById('setGoalWeight')?.value);
  const effWeeklyChange=400*7/7700; // maps to 400 kcal/day deficit

  const weeklyEl=document.getElementById('goalRecommendedWeeklyVal');
  if(weeklyEl) weeklyEl.textContent=`约 ${effWeeklyChange.toFixed(2)} kg / 周`;

  const dateEl=document.getElementById('goalRecommendedDateVal');
  const hintEl=document.getElementById('goalRecommendedDateHint');
  if(dateEl){
    const calc=computeGoalPlanFromWeekly(p,effWeeklyChange,targetWeight);
    dateEl.textContent=calc.ok?formatGoalPlanDate(calc.targetDate):'--';
  }
  if(hintEl){
    hintEl.textContent=`预计达标日期根据当前体重 → 目标体重 → effective weekly_change ≈ ${effWeeklyChange.toFixed(4)} 自动计算。它只是只读结果。`;
  }
}

function syncGoalPlanFieldsUI(){
  const type=document.getElementById('setGoalType')?.value;
  if(type!=='fat_loss') return;
  applyDeficitPlanModeLayout();
  const mode=getDeficitPlanModeFromUI();
  if(mode==='recommended'){
    updateRecommendedDeficitPlanComputedValues();
    return;
  }
  applyGoalPlanModeLayout();
  updateGoalPlanComputedValues();
}
function resolveGoalPlanInputs(profile,{strict=false}={}){
  const mode=getGoalPlanModeFromUI();
  const targetWeight=parseFloat(document.getElementById('setGoalWeight')?.value);
  const weeklyRaw=parseFloat(document.getElementById('setWeeklyChange')?.value);
  const targetDateRaw=document.getElementById('setGoalTargetDate')?.value||'';
  if(mode==='weekly_change'){
    const calc=computeGoalPlanFromWeekly(profile,weeklyRaw,targetWeight);
    if(!calc.ok){
      if(strict&&calc.reason!=='reached') return {ok:false,message:calc.message||'请完善减脂计划'};
      return {
        ok:!strict||calc.reason==='reached',
        mode,
        weekly_change:Number.isFinite(weeklyRaw)&&weeklyRaw>0?weeklyRaw:0.3,
        target_date:targetDateRaw,
        message:calc.message||''
      };
    }
    return {ok:true,mode,weekly_change:calc.weeklyChange,target_date:calc.targetDate,message:''};
  }
  const calc=computeGoalPlanFromDate(profile,targetWeight,targetDateRaw);
  if(!calc.ok){
    if(strict) return {ok:false,message:calc.message||'请完善减脂计划'};
    return {ok:false,mode,weekly_change:Number.isFinite(weeklyRaw)&&weeklyRaw>0?weeklyRaw:0.3,target_date:targetDateRaw,message:calc.message||''};
  }
  return {ok:true,mode,weekly_change:calc.weeklyChange,target_date:calc.targetDate,message:''};
}
function bindGoalPlanUI(){
  document.querySelectorAll('#goalDeficitPlanSeg .meal-seg-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.classList.contains('active')) return;
      document.querySelectorAll('#goalDeficitPlanSeg .meal-seg-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      if(window.GlassUI?.closeAll) GlassUI.closeAll();
      syncGoalPlanFieldsUI();
      updateSettingsPreview();
    });
  });
  document.querySelectorAll('#goalPlanModeSeg .meal-seg-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.classList.contains('active')) return;
      document.querySelectorAll('#goalPlanModeSeg .meal-seg-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      if(window.GlassUI?.closeAll) GlassUI.closeAll();
      syncGoalPlanFieldsUI();
      updateSettingsPreview();
    });
  });
  syncGoalPlanFieldsUI();
}
function renderGoalEditPage(p){
  const healthGoal=getHealthGoal(p);
  const planMode=getGoalPlanMode(healthGoal);
  const deficitPlanMode=healthGoal?.deficit_plan_mode==='recommended'?'recommended':'personalized';
  const goalOptions=Object.entries(HEALTH_GOAL_TYPES).map(([val,item])=>({val,label:item.title,desc:item.desc}));
  return `
    <div class="form-group">
      <label>健康目标类型</label>
      <select class="form-select" id="setGoalType">
        ${goalOptions.map(o=>`<option value="${o.val}" ${healthGoal.type===o.val?'selected':''}>${o.label} · ${o.desc}</option>`).join('')}
      </select>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>起始体重 (kg)</label>
        <input class="form-input" type="number" id="setStartWeight" value="${healthGoal.start_weight||p.startWeight||''}" placeholder="可选" step="0.1" min="20" max="300">
      </div>
      <div class="form-group">
        <label>目标体重 (kg)</label>
        <input class="form-input" type="number" id="setGoalWeight" value="${healthGoal.target_weight||p.goalWeight||''}" placeholder="如 65" step="0.1" min="20" max="300">
      </div>
    </div>
    <div id="goalFatLossFields">
      <div class="form-group goal-plan-mode-group">
        <label>减脂方案</label>
        <div class="meal-seg goal-plan-seg" id="goalDeficitPlanSeg">
          <button type="button" class="meal-seg-btn ${deficitPlanMode==='recommended'?'active':''}" data-deficit-plan-mode="recommended">推荐方案</button>
          <button type="button" class="meal-seg-btn ${deficitPlanMode==='personalized'?'active':''}" data-deficit-plan-mode="personalized">个性化目标</button>
        </div>
      </div>

      <div id="goalRecommendedPlanWrap" ${deficitPlanMode==='recommended'?'':'hidden'}>
        <div class="form-group">
          <label>推荐目标缺口</label>
          <div class="form-readonly-val" id="goalRecommendedDeficitVal">400 kcal / 天</div>
          <div class="goal-plan-field-hint">推荐执行范围：300–500 kcal / 天</div>
        </div>
        <div class="form-group">
          <label>预计每周减重</label>
          <div class="form-readonly-val" id="goalRecommendedWeeklyVal">约 ${Number(400*7/7700).toFixed(2)} kg / 周</div>
        </div>
        <div class="form-group">
          <label>预计达标日期</label>
          <div class="form-readonly-val" id="goalRecommendedDateVal">--</div>
          <div class="goal-plan-field-hint" id="goalRecommendedDateHint">预计达标日期根据当前体重 → 目标体重 → effective weekly_change 自动计算。它只是只读结果。</div>
        </div>
      </div>

      <div id="goalPersonalizedPlanWrap" ${deficitPlanMode==='personalized'?'':'hidden'}>
        <div class="form-group goal-plan-mode-group">
          <label>计划方式</label>
          <div class="meal-seg goal-plan-seg" id="goalPlanModeSeg">
            <button type="button" class="meal-seg-btn ${planMode==='weekly_change'?'active':''}" data-plan-mode="weekly_change">按减重速度</button>
            <button type="button" class="meal-seg-btn ${planMode==='target_date'?'active':''}" data-plan-mode="target_date">按目标日期</button>
          </div>
        </div>
        <div class="form-row goal-plan-fields-row">
          <div class="form-group" id="goalWeeklyFieldWrap">
            <label id="goalWeeklyFieldLabel">每周目标减重 (kg)</label>
            <div id="goalWeeklyEditableWrap" class="goal-plan-editable-wrap">
              <input class="form-input" type="number" id="setWeeklyChange" value="${healthGoal.weekly_change||0.3}" placeholder="0.3" step="0.1" min="0.1" max="1.5">
            </div>
            <div id="goalWeeklyReadonly" class="goal-plan-readonly" hidden>
              <div class="goal-plan-readonly-main">
                <span id="goalWeeklyReadonlyVal">--</span><span class="goal-plan-readonly-unit">kg / 周</span>
              </div>
              <div class="goal-plan-field-hint">根据目标日期自动计算</div>
            </div>
          </div>
          <div class="form-group" id="goalDateFieldWrap">
            <label id="goalDateFieldLabel">预计达标日期</label>
            <div id="goalDateEditableWrap" class="goal-plan-editable-wrap">
              <input class="form-input" type="date" id="setGoalTargetDate" value="${healthGoal.target_date||''}">
            </div>
            <div id="goalDateReadonly" class="goal-plan-readonly" hidden>
              <div class="goal-plan-readonly-main" id="goalDateReadonlyVal">--</div>
              <div class="goal-plan-field-hint">根据每周目标减重自动计算</div>
            </div>
          </div>
        </div>
        <div class="form-hint goal-plan-status" id="goalPlanStatus" style="display:none"></div>
      </div>
    </div>
    <div class="form-row" id="goalMuscleFields">
      <div class="form-group">
        <label>目标增重 (kg)</label>
        <input class="form-input" type="number" id="setTargetGain" value="${healthGoal.target_gain||''}" placeholder="增肌可填" step="0.1" min="0" max="50">
      </div>
      <div class="form-group">
        <label>训练频率 (天/周)</label>
        <input class="form-input" type="number" id="setTrainingDays" value="${healthGoal.training_days||3}" placeholder="3" step="1" min="1" max="7">
      </div>
    </div>
    <div class="form-row" id="goalFitnessSleepFields">
      <div class="form-group">
        <label>每周运动次数</label>
        <input class="form-input" type="number" id="setExerciseDays" value="${healthGoal.exercise_days||healthGoal.strategy?.exercise_days||3}" placeholder="4" step="1" min="1" max="7">
      </div>
      <div class="form-group">
        <label>目标睡眠 (分钟)</label>
        <input class="form-input" type="number" id="setSleepTarget" value="${healthGoal.sleep_target||healthGoal.strategy?.sleep_target||420}" placeholder="480" step="15" min="300" max="720">
      </div>
    </div>
    <div class="settings-preview-box"><div id="settingsPreview"></div></div>`;
}
function updateGoalFieldVisibility(){
  const type=document.getElementById('setGoalType')?.value||'maintain';
  const fat=document.getElementById('goalFatLossFields');
  const muscle=document.getElementById('goalMuscleFields');
  const fitnessSleep=document.getElementById('goalFitnessSleepFields');
  if(fat) fat.style.display=type==='fat_loss'?'block':'none';
  if(muscle) muscle.style.display=type==='muscle_gain'?'grid':'none';
  if(fitnessSleep) fitnessSleep.style.display=(type==='fitness'||type==='sleep_improve')?'grid':'none';
}
function updateSettingsPreview(){
  updateGoalFieldVisibility();
  syncGoalPlanFieldsUI();
  const p=getProfile(settingsProfileId);
  const goalType=document.getElementById('setGoalType')?.value||'maintain';
  const deficitPlanMode=getDeficitPlanModeFromUI();
  const temp={
    ...p,
    birthDate:document.getElementById('setBirthDate')?.value,
    height:+document.getElementById('setHeight')?.value||0,
    gender:document.getElementById('setGender')?.value,
    activityLevel:document.getElementById('setActivity')?.value,
    goal:mapHealthGoalTypeToLegacy(goalType),
  };
  const planInputs=goalType==='fat_loss'&&deficitPlanMode==='personalized'?resolveGoalPlanInputs(p):null;
  temp.health_goal={
    ...getHealthGoal(p),
    type:goalType,
    title:HEALTH_GOAL_TYPES[goalType]?.title||'健康保持',
    start_weight:parseFloat(document.getElementById('setStartWeight')?.value)||null,
    target_weight:parseFloat(document.getElementById('setGoalWeight')?.value)||null,
    target_date:planInputs?.target_date??(document.getElementById('setGoalTargetDate')?.value||''),
    weekly_change:planInputs?.weekly_change??(parseFloat(document.getElementById('setWeeklyChange')?.value)||0.3),
    deficit_plan_mode:goalType==='fat_loss'?deficitPlanMode:undefined,
    plan_mode:planInputs?.mode??getGoalPlanMode(getHealthGoal(p)),
    target_gain:parseFloat(document.getElementById('setTargetGain')?.value)||null,
    training_days:parseInt(document.getElementById('setTrainingDays')?.value,10)||null,
    exercise_days:parseInt(document.getElementById('setExerciseDays')?.value,10)||null,
    sleep_target:parseInt(document.getElementById('setSleepTarget')?.value,10)||null
  };
  const bmr=calcBMR(temp);
  const tdee=calcTDEE(temp);
  const targets=calcNutrientTargets(temp);
  const w=getLatestWeight(temp);
  const bmi=w?calcBMI(w.weight,temp.height):null;
  const age=calcAge(temp.birthDate);
  const bdayInfo=getDaysUntilBirthday(temp.birthDate);
  let html='';
  if(age) html+=`年龄: ${age}岁 · `;
  if(bdayInfo!==null){
    if(bdayInfo===0) html+=`今天生日！ · `;
    else if(bdayInfo<=7) html+=`${bdayInfo}天后生日 · `;
  }
  if(w&&bmi){
    html+=`BMI: ${bmi} (${bmiCategory(bmi).label}) · `;
  }
  if(bmr) html+=`BMR: ${bmr} kcal · `;
  if(tdee) html+=`每日热量目标: ${tdee} kcal`;
  const goal=getHealthGoal(temp);
  if(goal?.title) html+=`${html?' · ':''}目标: ${goal.title}`;
  if(goal?.strategy?.protein_target) html+=` · 蛋白: ${goal.strategy.protein_target}g`;
  if(!bmr&&!tdee&&!age) html='请填写完整信息查看计算结果';
  document.getElementById('settingsPreview').innerHTML=html;
}
function hasHealthGoalChanged(prev,next){
  return JSON.stringify({
    type:prev?.type,start_weight:prev?.start_weight,target_weight:prev?.target_weight,target_date:prev?.target_date,
    weekly_change:prev?.weekly_change,plan_mode:prev?.plan_mode,deficit_plan_mode:prev?.deficit_plan_mode,
    target_gain:prev?.target_gain,training_days:prev?.training_days,exercise_days:prev?.exercise_days,sleep_target:prev?.sleep_target
  })!==JSON.stringify({
    type:next?.type,start_weight:next?.start_weight,target_weight:next?.target_weight,target_date:next?.target_date,
    weekly_change:next?.weekly_change,plan_mode:next?.plan_mode,deficit_plan_mode:next?.deficit_plan_mode,
    target_gain:next?.target_gain,training_days:next?.training_days,exercise_days:next?.exercise_days,sleep_target:next?.sleep_target
  });
}
function buildGoalDraftFromForm(p,previousGoal){
  const goalType=document.getElementById('setGoalType')?.value||'maintain';
  const goalWeightVal=parseFloat(document.getElementById('setGoalWeight')?.value);
  const startWeightVal=parseFloat(document.getElementById('setStartWeight')?.value);
  const draft={
    type:goalType,
    title:HEALTH_GOAL_TYPES[goalType]?.title||'健康保持',
    start_date:previousGoal?.start_date||todayStr(),
    start_weight:(startWeightVal>=20&&startWeightVal<=300)?startWeightVal:null,
    target_weight:(goalWeightVal>=20&&goalWeightVal<=300)?goalWeightVal:null,
    target_gain:parseFloat(document.getElementById('setTargetGain')?.value)||null,
    training_days:parseInt(document.getElementById('setTrainingDays')?.value,10)||null,
    exercise_days:parseInt(document.getElementById('setExerciseDays')?.value,10)||null,
    sleep_target:parseInt(document.getElementById('setSleepTarget')?.value,10)||null,
    strategy:{}
  };
  if(goalType==='fat_loss'){
    const deficitPlanMode=getDeficitPlanModeFromUI();
    draft.deficit_plan_mode=deficitPlanMode;
    if(deficitPlanMode==='recommended'){
      // Keep user's personalized plan settings as-is, but switch current source.
      const currentPersonalizedMode=getGoalPlanModeFromUI();
      draft.plan_mode=currentPersonalizedMode;
      if(currentPersonalizedMode==='weekly_change'){
        draft.weekly_change=parseFloat(document.getElementById('setWeeklyChange')?.value)||previousGoal?.weekly_change||0.3;
        draft.target_date=previousGoal?.target_date||'';
      }else{
        const targetDateVal=document.getElementById('setGoalTargetDate')?.value||previousGoal?.target_date||'';
        const targetWeightVal=parseFloat(document.getElementById('setGoalWeight')?.value);
        const calc=computeGoalPlanFromDate(p,targetWeightVal,targetDateVal);
        draft.target_date=targetDateVal;
        draft.weekly_change=calc.ok?calc.weeklyChange:(previousGoal?.weekly_change||0.3);
      }
    }else{
      const plan=resolveGoalPlanInputs(p,{strict:true});
      if(!plan.ok) return {error:plan.message||'请完善减脂计划'};
      draft.plan_mode=plan.mode;
      draft.weekly_change=plan.weekly_change;
      draft.target_date=plan.target_date;
    }
  }else{
    draft.plan_mode=null;
    draft.target_date=document.getElementById('setGoalTargetDate')?.value||'';
    draft.weekly_change=parseFloat(document.getElementById('setWeeklyChange')?.value)||0.3;
  }
  return {draft};
}
function saveSettings(){
  if(!settingsProfileId){
    showToast('请先选择要保存健康目标的档案','error');
    return;
  }
  const p=getProfile(settingsProfileId);
  if(!p){
    showToast('目标档案不存在，请重新选择','error');
    return;
  }
  p.name=document.getElementById('setName').value.trim()||p.name||'未命名';
  p.gender=document.getElementById('setGender').value;
  // 不再根据gender自动推断relation — 性别和称呼已解耦
  // 保存头像（从上传按钮的dataset读取）
  const uploadBtn=document.getElementById('uploadAvatarBtn');
  if(uploadBtn){
    if(uploadBtn.dataset.avatarAction==='replace'&&uploadBtn.dataset.avatarData){
      p.avatar=uploadBtn.dataset.avatarData;
    }else if(uploadBtn.dataset.avatarAction==='clear'){
      p.avatar='';
    }
  }
  p.birthDate=document.getElementById('setBirthDate').value||'';
  const heightVal=parseFloat(document.getElementById('setHeight').value);
  p.height=(heightVal>=50&&heightVal<=250)?heightVal:null;
  p.activityLevel=document.getElementById('setActivity').value;
  const goalType=document.getElementById('setGoalType').value||'maintain';
  p.goal=mapHealthGoalTypeToLegacy(goalType);
  const goalWeightVal=parseFloat(document.getElementById('setGoalWeight').value);
  p.goalWeight=(goalWeightVal>=20&&goalWeightVal<=300)?goalWeightVal:null;
  const startWeightVal=parseFloat(document.getElementById('setStartWeight').value);
  p.startWeight=(startWeightVal>=20&&startWeightVal<=300)?startWeightVal:null;
  const previousGoal=getHealthGoal(p);
  const built=buildGoalDraftFromForm(p,previousGoal);
  if(built.error){ showToast(built.error,'error'); return; }
  const nextGoalDraft=built.draft;
  p.goalWeight=nextGoalDraft.target_weight;
  p.startWeight=nextGoalDraft.start_weight;
  const nextGoal={...nextGoalDraft,strategy:calculateHealthGoalStrategy(p,nextGoalDraft)};
  if(hasHealthGoalChanged(previousGoal,nextGoal)){
    p.goal_history=Array.isArray(p.goal_history)?p.goal_history:[];
    if(previousGoal?.type){
      p.goal_history.push({...previousGoal,changed_at:new Date().toISOString()});
      p.goal_history=p.goal_history.slice(-20);
    }
  }
  p.health_goal=nextGoal;
  p.profileUpdatedAt=Date.now();
  // AI config is always embedded
  state.aiConfig={...EMBEDDED_BAILIAN_CONFIG};
  // Save family code
  const syncCodeEl=document.getElementById('setSyncCode');
  const oldCode=state.familyCode||'';
  if(syncCodeEl) state.familyCode=syncCodeEl.value.trim();
  if(state.familyCode&&state.familyCode!==oldCode) rememberPreferCloudModeOnNextSyncCode(state.familyCode);
  const nowConfigured=isCloudConfigured();
  // 资料（身高/性别/出生日期/活动水平/目标）变化 → 失效当前 profile 的所有 AI 健康教练缓存
  invalidateHealthCoachProfile(p);
  // Update BMI / estimated body fat in weight records
  p.weightRecords.forEach(r=>{
    r.bmi=calcBMI(r.weight,p.height);
    if(r.bodyFatSource==='estimated'||!r.bodyFat){
      const estimated=calcBodyFatPercent(r.weight,p);
      r.bodyFat=estimated;
      r.bodyFatSource=estimated?'estimated':'';
    }
  });
  // 资料（身高/性别/出生日期/活动水平/目标）变化会改变 TDEE、目标、AI 教练建议。
  // 失效当前 profile 的所有健康教练缓存条目（只影响该 profile，不影响其他 profile）。
  invalidateHealthCoachProfile(p);
  saveData();
  renderAll();
  closeModal('settingsModal');
  showToast('设置已保存','success');
  // If family code was just added or changed, trigger sync
  if(nowConfigured && state.familyCode!==oldCode){
    updateSyncStatus('config','已配置');
    debouncedSync();
  }else if(nowConfigured){
    // Already configured, keep current status (don't falsely show "已同步")
    updateSyncStatus('config','已配置');
  }else{
    updateSyncStatus('config','未配置');
  }
}
function handleSettingsSave(){
  if(settingsViewMode==='profile') return saveProfileSection();
  if(settingsViewMode==='goal') return saveGoalSection();
  if(settingsViewMode==='sync') return saveSyncSection();
  return saveSettings();
}
function saveProfileSection(){
  if(!settingsProfileId){showToast('请先选择档案','error');return}
  const p=getProfile(settingsProfileId);
  if(!p){showToast('目标档案不存在','error');return}
  p.name=document.getElementById('setName').value.trim()||p.name||'未命名';
  // 保存自定义显示称呼
  const displayNameInput=document.getElementById('setDisplayName');
  if(displayNameInput){
    const dn=displayNameInput.value.trim();
    // 限制1-12个字符，防止顶部撑坏
    p.displayName=dn.length>0?dn.slice(0,12):'';
  }
  p.gender=document.getElementById('setGender').value;
  // 不再根据gender自动推断relation — 性别和称呼已解耦
  // 头像只在用户明确选择新头像或点击恢复默认后，随本次个人资料保存一起提交。
  const uploadBtn=document.getElementById('uploadAvatarBtn');
  if(uploadBtn){
    if(uploadBtn.dataset.avatarAction==='replace'&&uploadBtn.dataset.avatarData){
      p.avatar=uploadBtn.dataset.avatarData;
    }else if(uploadBtn.dataset.avatarAction==='clear'){
      p.avatar='';
    }
  }
  p.birthDate=document.getElementById('setBirthDate').value||'';
  const heightVal=parseFloat(document.getElementById('setHeight').value);
  p.height=(heightVal>=50&&heightVal<=250)?heightVal:null;
  p.activityLevel=document.getElementById('setActivity').value;
  p.weightRecords.forEach(r=>{
    r.bmi=calcBMI(r.weight,p.height);
    if(r.bodyFatSource==='estimated'||!r.bodyFat){
      const estimated=calcBodyFatPercent(r.weight,p);
      r.bodyFat=estimated;
      r.bodyFatSource=estimated?'estimated':'';
    }
  });
  p.profileUpdatedAt=Date.now();
  state.aiConfig={...EMBEDDED_BAILIAN_CONFIG};
  // 资料（身高/性别/出生日期/活动水平）变化 → 失效当前 profile 的所有 AI 健康教练缓存
  invalidateHealthCoachProfile(p);
  saveData();
  renderAll();
  closeModal('settingsModal');
  showToast('个人资料已更新','success');
}
function saveGoalSection(){
  if(!settingsProfileId){showToast('请先选择档案','error');return}
  const p=getProfile(settingsProfileId);
  if(!p){showToast('目标档案不存在','error');return}
  const goalType=document.getElementById('setGoalType').value||'maintain';
  p.goal=mapHealthGoalTypeToLegacy(goalType);
  const goalWeightVal=parseFloat(document.getElementById('setGoalWeight').value);
  p.goalWeight=(goalWeightVal>=20&&goalWeightVal<=300)?goalWeightVal:null;
  const startWeightVal=parseFloat(document.getElementById('setStartWeight').value);
  p.startWeight=(startWeightVal>=20&&startWeightVal<=300)?startWeightVal:null;
  const previousGoal=getHealthGoal(p);
  const built=buildGoalDraftFromForm(p,previousGoal);
  if(built.error){ showToast(built.error,'error'); return; }
  const nextGoalDraft=built.draft;
  p.goalWeight=nextGoalDraft.target_weight;
  p.startWeight=nextGoalDraft.start_weight;
  const nextGoal={...nextGoalDraft,strategy:calculateHealthGoalStrategy(p,nextGoalDraft)};
  if(hasHealthGoalChanged(previousGoal,nextGoal)){
    p.goal_history=Array.isArray(p.goal_history)?p.goal_history:[];
    if(previousGoal?.type){
      p.goal_history.push({...previousGoal,changed_at:new Date().toISOString()});
      p.goal_history=p.goal_history.slice(-20);
    }
  }
  p.health_goal=nextGoal;
  p.profileUpdatedAt=Date.now();
  state.aiConfig={...EMBEDDED_BAILIAN_CONFIG};
  // 健康目标变化 → 失效 AI 健康教练缓存（影响建议内容、目标匹配等）
  invalidateHealthCoachProfile(p);
  saveData();
  renderAll();
  closeModal('settingsModal');
  showToast('健康目标已更新','success');
}
function updateSyncConfigPanel(message=''){
  const wrap=document.getElementById('syncConfigStatus');
  const text=document.getElementById('syncConfigStatusText');
  const configured=isCloudConfigured();
  if(wrap) wrap.classList.toggle('configured',configured);
  if(text) text.textContent=message||`当前状态：${configured?'已连接':'未连接'}`;
}
function saveSyncSection(){
  const syncCodeEl=document.getElementById('setSyncCode');
  const code=syncCodeEl?.value.trim()||'';
  const oldCode=state.familyCode||'';
  if(!code){
    updateSyncConfigPanel('当前状态：同步码不能为空');
    const result=document.getElementById('syncTestResult');
    if(result) result.innerHTML='<span class="err">请输入同步码后再保存</span>';
    syncCodeEl?.focus();
    showToast('同步码不能为空','error');
    return false;
  }
  state.familyCode=code;
  if(code!==oldCode) rememberPreferCloudModeOnNextSyncCode(code);
  saveLocalOnly();
  updateSyncStatus('config','已配置');
  updateSyncConfigPanel('当前状态：已连接');
  const result=document.getElementById('syncTestResult');
  if(result) result.innerHTML='<span class="ok">同步码已保存，可点击“立即同步”</span>';
  renderAppPageSummaries();
  showToast('同步码已保存','success');
  if(code!==oldCode) debouncedSync();
  return true;
}

function getRebindProfileRoleLabel(profile){
  if(!profile) return 'Ta';
  if(getProfileDataId(profile)===state.current_profile_id) return '我的档案';
  return `${getDisplayName(profile)}档案`;
}
function getRebindConfirmLabel(profile){
  if(!profile) return 'Ta';
  return getDisplayName(profile);
}
function renderRebindDeviceOwnerOptions(){
  const content=document.getElementById('rebindDeviceOwnerContent');
  const confirmBtn=document.getElementById('confirmRebindDeviceOwnerBtn');
  if(!content) return;
  const candidates=getDeviceOwnerProfileCandidates(state);
  if(!candidates.some(profile=>profile.id===rebindDeviceOwnerProfileId)) rebindDeviceOwnerProfileId=candidates[0]?.id||'';
  rebindDeviceOwnerStep='select';
  if(confirmBtn) confirmBtn.textContent='确认绑定';
  content.innerHTML=`
    <div style="font-size:12px;color:var(--txt2);margin-bottom:8px">请选择当前设备使用者：</div>
    <div class="profile-select-row" style="display:flex;flex-direction:column;gap:8px;margin-bottom:0">
      ${candidates.map(profile=>{
        const selected=profile.id===rebindDeviceOwnerProfileId;
        const name=getDisplayName(profile);
        const role=getRebindProfileRoleLabel(profile);
        return `<button class="profile-select-btn ${selected?'active':''}" type="button" data-pid="${profile.id}" data-role="rebind-device-owner" style="width:100%;justify-content:flex-start;text-align:left;padding:12px">
          <span class="avatar" style="margin-right:10px">${getProfileAvatarHtml(profile)}</span>
          <span style="display:flex;flex-direction:column;gap:3px">
            <strong style="font-size:14px;color:var(--txt);font-weight:600">${escapeHTML(name)}</strong>
            <span style="font-size:12px;color:var(--txt2)">${escapeHTML(role)}</span>
          </span>
        </button>`;
      }).join('')}
    </div>`;
  content.querySelectorAll('[data-role="rebind-device-owner"]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      rebindDeviceOwnerProfileId=btn.dataset.pid;
      renderRebindDeviceOwnerOptions();
    });
  });
}
function renderRebindDeviceOwnerConfirm(){
  const profile=getProfile(rebindDeviceOwnerProfileId);
  const content=document.getElementById('rebindDeviceOwnerContent');
  const confirmBtn=document.getElementById('confirmRebindDeviceOwnerBtn');
  if(!profile||!content) return;
  rebindDeviceOwnerStep='confirm';
  if(confirmBtn) confirmBtn.textContent='确认';
  const confirmLabel=getRebindConfirmLabel(profile);
  content.innerHTML=`
    <div style="padding:14px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);line-height:1.7">
      <div style="font-size:13px;color:var(--txt2);margin-bottom:8px">确定将当前设备绑定为：</div>
      <div style="font-size:18px;color:var(--txt);font-weight:700;margin-bottom:8px">“${escapeHTML(confirmLabel)}”</div>
      <div style="font-size:12px;color:var(--txt2)">绑定后，以后本设备新增的健康数据会记录到该档案。此操作不会修改云端数据、家庭共享码、档案内容或历史健康记录。</div>
    </div>`;
}
function openRebindDeviceOwnerModal(){
  if(isSingleMode()) return;
  const modal=document.getElementById('rebindDeviceOwnerModal');
  if(!modal) return;
  const owner=getDeviceOwnerProfile();
  rebindDeviceOwnerProfileId=owner?.id||state.viewerId||state.activeProfileId||state.profiles?.[0]?.id||'';
  renderRebindDeviceOwnerOptions();
  modal.classList.add('show');
  GlassScrollLock.lock('modal:rebindDeviceOwnerModal');
}
function closeRebindDeviceOwnerModal(){
  closeModal('rebindDeviceOwnerModal');
  rebindDeviceOwnerStep='select';
  rebindDeviceOwnerProfileId='';
}
function confirmRebindDeviceOwner(){
  const profile=getProfile(rebindDeviceOwnerProfileId);
  if(!profile||!getDeviceOwnerProfileCandidates(state).some(candidate=>candidate.id===profile.id)){
    showToast('请选择有效的当前设备使用者','error');
    return;
  }
  if(rebindDeviceOwnerStep!=='confirm'){
    renderRebindDeviceOwnerConfirm();
    return;
  }
  const profileDataId=getProfileDataId(profile);
  const previousProfileDataId=state.current_profile_id||'';
  if(!saveLocalCurrentProfileId(profileDataId)||!verifyLocalCurrentProfileId(profileDataId)){
    showDeviceOwnerStorageFailureToast();
    return;
  }
  state.viewerId=profile.id;
  state.activeProfileId=profile.id;
  settingsProfileId=profile.id;
  if(!saveLocalOnly(false)){
    restoreLocalCurrentProfileIdForRollback(previousProfileDataId);
    showToast('档案数据保存失败，请先清理本地存储空间后重试','error');
    return;
  }
  logDeviceOwnerDebug('confirmRebindDeviceOwner:after',state);
  closeRebindDeviceOwnerModal();
  renderAll();
  renderSettingsForm();
  showToast('当前设备身份已重新绑定','success');
}

function exportData(){
  const data=JSON.stringify(getPersistableState(),null,2);
  const blob=new Blob([data],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`health-tracker-${todayStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('数据已导出','success');
}
function importData(file){
  const reader=new FileReader();
  reader.onload=(e)=>{
    try{
      const data=JSON.parse(e.target.result);
      if(data.profiles){
        // 保留本机设备主人和显式使用模式；旧备份不从档案数量推断模式。
        if(data.appMode!=='single'&&data.appMode!=='couple') data.appMode=getAppMode();
        data.familyCode=state.familyCode||'';
        data.aiConfig={...EMBEDDED_BAILIAN_CONFIG};
        migrateProfiles(data);
        migrateWeightRecords(data);
        state=applyLocalDeviceOwner(data);
        saveData();
        reconcileAppModeUI();
        closeModal('settingsModal');
        showToast('数据已导入','success');
      }else{
        showToast('文件格式不正确','error');
      }
    }catch(err){
      showToast('导入失败：'+err.message,'error');
    }
  };
  reader.readAsText(file);
}
async function clearAllData(){
  if(!confirm('确定要清空本地和云端的所有健康记录吗？此操作不可撤销。建议先导出数据。')) return;
  const btn=document.getElementById('clearDataBtn');
  const oldText=btn?btn.textContent:'';
  const familyCode=state.familyCode||'';
  if(btn){
    btn.disabled=true;
    btn.textContent='清空中...';
  }
  if(syncTimer){
    clearTimeout(syncTimer);
    syncTimer=null;
  }

  let cloudCleared=false;
  let cloudError='';
  try{
    const fresh=getDefaultData();
    // 保留家庭共享码，方便继续使用同一家庭码重新同步新数据
    fresh.familyCode=familyCode;
    fresh.lastLocalClearAt=Date.now();
    state=applyLocalDeviceOwner(fresh);
    currentMeal=getMealTypeByDateTime(toLocalDateTimeValue());
    mealSelectionTouched=false;
    foodDraft=[];
    foodDraftSession=null;
    chartMetric='weight';
    chartPeriod=7;
    settingsProfileId=null;
    if(chartInstance){
      chartInstance.destroy();
      chartInstance=null;
    }

    saveLocalOnly();
    reconcileAppModeUI();
    document.querySelectorAll('#periodSeg .td-filter-btn').forEach(b=>b.classList.toggle('active',b.dataset.period==='7'));
    document.querySelectorAll('#metricSeg .td-metric-btn').forEach(b=>b.classList.toggle('active',b.dataset.metric==='weight'));
    const syncCodeEl=document.getElementById('setSyncCode');
    if(syncCodeEl) syncCodeEl.value=familyCode;

    if(familyCode){
      const cloudResult=await clearCloudData(familyCode, state);
      cloudCleared=cloudResult.ok;
      if(!cloudResult.ok){
        cloudError=cloudResult.err||'云端清空失败';
      }
    }

    updateSyncStatus(
      familyCode?(cloudCleared?'synced':'error'):'offline',
      familyCode?(cloudCleared?'已清空云端':'云端清空失败'):'未连接'
    );
    closeModal('settingsModal');
    if(familyCode && !cloudCleared){
      showToast('本地数据已清空，云端清空失败：'+cloudError,'error');
    }else{
      showToast(familyCode?'本地和云端数据已清空':'本地数据已清空','info');
    }
  }catch(err){
    console.error('Clear data error:',err);
    showToast('清空失败：'+err.message,'error');
  }finally{
    if(btn){
      btn.disabled=false;
      btn.textContent=oldText||'清空数据';
    }
  }
}

// ==================== MODAL & TOAST ====================
function closeModal(id){
  window.GlassUI?.closeAll?.();
  document.getElementById(id)?.classList.remove('show');
  GlassScrollLock.unlock(`modal:${id}`);
}
function profileChoiceLabel(profile,index){
  const name=(profile?.name||'').trim();
  const gender=profile?.gender==='male'?'男':profile?.gender==='female'?'女':'未填性别';
  const hasData=!!(name||profile?.height||(profile?.weightRecords||[]).length);
  return hasData ? `${name||`档案${index+1}`} · ${gender}` : `空档案 ${index+1}`;
}
function isProfileInitializedForDeviceOwner(profile){
  if(!profile) return false;
  const latest=getLatestWeight(profile);
  return !!(
    (profile.name||'').trim()
    && profile.gender
    && Number(profile.height)>0
    && (Number(profile.startWeight)>0||Number(latest?.weight)>0)
  );
}
function showDeviceOwnerStorageFailureToast(){
  const storageAvailable=isLocalStorageWritable();
  showToast(storageAvailable
    ? '当前浏览器无法保存设备身份，请检查浏览器存储设置后重试'
    : '本地存储空间不足或不可用，设备身份无法保存',
    'error'
  );
}
function getDeviceOwnerProfileCandidates(source=state){
  const profiles=source?.profiles||[];
  if(getAppMode(source)==='single'){
    const personal=getSingleModeProfile(source);
    return personal?[personal]:[];
  }
  const initialized=profiles.filter(isProfileInitializedForDeviceOwner);
  return initialized.length?initialized:profiles.slice(0,1);
}
function updateDeviceOwnerModalMode(profile){
  const initialized=isProfileInitializedForDeviceOwner(profile);
  const title=document.getElementById('deviceOwnerModalTitle');
  const desc=document.getElementById('deviceOwnerModalDesc');
  const form=document.getElementById('deviceOwnerProfileForm');
  const btn=document.getElementById('saveDeviceOwnerBtn');
  if(title) title.textContent=initialized?'选择这台设备的使用者':'创建我的健康档案';
  if(desc) desc.textContent=initialized
    ? '已检测到本地/云端已有健康档案。请选择这台设备的使用者，只会在当前浏览器本地保存设备身份，不会修改档案资料或新增健康记录。'
    : '请先填写这台设备使用者的基础资料。设备主人身份只保存在当前设备本地；健康档案资料会随同步码同步。';
  if(form) form.style.display=initialized?'none':'block';
  if(btn) btn.textContent=initialized?'确认绑定':'保存并开始使用';
}
function fillDeviceOwnerForm(profile){
  if(!profile) return;
  const latest=getLatestWeight(profile);
  const nameEl=document.getElementById('ownerNameInput');
  const genderEl=document.getElementById('ownerGenderInput');
  const heightEl=document.getElementById('ownerHeightInput');
  const birthEl=document.getElementById('ownerBirthDateInput');
  const weightEl=document.getElementById('ownerWeightInput');
  if(nameEl) nameEl.value=profile.name||'';
  if(genderEl) genderEl.value=profile.gender||'';
  if(heightEl) heightEl.value=profile.height||'';
  if(birthEl) birthEl.value=profile.birthDate||'';
  if(weightEl) weightEl.value=latest?.weight||profile.startWeight||'';
  updateDeviceOwnerModalMode(profile);
}
function getSelectedDeviceOwnerProfile(){
  const selected=document.querySelector('#deviceOwnerProfileChoices .profile-select-btn.active');
  return getProfile(selected?.dataset.pid);
}
function bindExistingDeviceOwnerProfile(profile){
  const profileDataId=getProfileDataId(profile);
  const previousProfileDataId=state.current_profile_id||'';
  if(!saveLocalCurrentProfileId(profileDataId)||!verifyLocalCurrentProfileId(profileDataId)){
    showDeviceOwnerStorageFailureToast();
    return false;
  }
  state.viewerId=profile.id;
  setCurrentProfile(profile.id,{save:false,render:false});
  if(!saveLocalOnly(false)){
    restoreLocalCurrentProfileIdForRollback(previousProfileDataId);
    showToast('档案数据保存失败，请先清理本地存储空间后重试','error');
    return false;
  }
  logDeviceOwnerDebug('bindExistingDeviceOwnerProfile:after',state);
  closeModal('deviceOwnerModal');
  renderAll();
  showToast('当前设备身份已绑定','success');
  return true;
}
function saveDeviceOwnerProfile(){
  const profile=getSelectedDeviceOwnerProfile();
  if(!profile){showToast('请选择这台设备要绑定的档案','error');return}
  if(isProfileInitializedForDeviceOwner(profile)){
    bindExistingDeviceOwnerProfile(profile);
    return;
  }
  const name=document.getElementById('ownerNameInput')?.value.trim();
  const gender=document.getElementById('ownerGenderInput')?.value;
  const height=parseFloat(document.getElementById('ownerHeightInput')?.value);
  const birthDate=document.getElementById('ownerBirthDateInput')?.value||'';
  const weight=parseFloat(document.getElementById('ownerWeightInput')?.value);
  if(!name){showToast('请填写昵称','error');return}
  if(!gender){showToast('请选择性别','error');return}
  if(!height||height<50||height>250){showToast('请输入 50-250cm 的有效身高','error');return}
  if(!weight||weight<20||weight>300){showToast('请输入 20-300kg 的有效体重','error');return}
  profile.name=name;
  profile.gender=gender;
  // 不再根据gender自动推断relation — 性别和称呼已解耦
  profile.height=height;
  profile.birthDate=birthDate;
  if(profile.startWeight===null||profile.startWeight===undefined) profile.startWeight=weight;
  profile.profileUpdatedAt=Date.now();
  const dateTime=toLocalDateTimeValue();
  profile.weightRecords=profile.weightRecords||[];
  if(profile.weightRecords.length===0){
    profile.weightRecords.push(withProfileId(profile,{
      id:'w'+Date.now()+Math.random().toString(36).slice(2,7),
      date:dateFromDateTimeValue(dateTime),
      dateTime,
      weight,
      bmi:calcBMI(weight,profile.height),
      bodyFat:null,
      bodyFatSource:''
    }));
  }
  const profileDataId=getProfileDataId(profile);
  const previousProfileDataId=state.current_profile_id||'';
  if(!saveLocalCurrentProfileId(profileDataId)||!verifyLocalCurrentProfileId(profileDataId)){
    showDeviceOwnerStorageFailureToast();
    return;
  }
  state.viewerId=profile.id;
  setCurrentProfile(profile.id,{save:false,render:false});
  if(!saveData()){
    restoreLocalCurrentProfileIdForRollback(previousProfileDataId);
    showToast('档案数据保存失败，请先清理本地存储空间后重试','error');
    return;
  }
  logDeviceOwnerDebug('saveDeviceOwnerProfile:after',state);
  closeModal('deviceOwnerModal');
  renderAll();
  showToast('我的健康档案已创建','success');
}
function renderDeviceOwnerModal(){
  const modal=document.getElementById('deviceOwnerModal');
  if(!modal) return;
  const choices=document.getElementById('deviceOwnerProfileChoices');
  if(choices){
    const candidates=getDeviceOwnerProfileCandidates(state);
    const currentOwner=getDeviceOwnerProfile();
    const defaultProfile=currentOwner&&candidates.some(profile=>profile.id===currentOwner.id)
      ? currentOwner
      : candidates[0];
    const choiceGroup=document.getElementById('deviceOwnerProfileChoiceGroup');
    if(choiceGroup) choiceGroup.style.display=candidates.length>1?'block':'none';
    choices.innerHTML=candidates.map(profile=>{
      const index=(state.profiles||[]).findIndex(item=>item.id===profile.id);
      const active=defaultProfile ? profile.id===defaultProfile.id : false;
      return `<button class="profile-select-btn ${active?'active':''}" type="button" data-pid="${profile.id}" style="flex:1;justify-content:center">${escapeHTML(profileChoiceLabel(profile,index<0?0:index))}</button>`;
    }).join('');
    choices.querySelectorAll('.profile-select-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        choices.querySelectorAll('.profile-select-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        fillDeviceOwnerForm(getProfile(btn.dataset.pid));
      });
    });
    const activeBtn=choices.querySelector('.profile-select-btn.active');
    if(activeBtn){
      fillDeviceOwnerForm(getProfile(activeBtn.dataset.pid));
    }else{
      ['ownerNameInput','ownerGenderInput','ownerHeightInput','ownerBirthDateInput','ownerWeightInput'].forEach(id=>{
        const el=document.getElementById(id);
        if(el) el.value='';
      });
      updateDeviceOwnerModalMode(null);
    }
  }
  const btn=document.getElementById('saveDeviceOwnerBtn');
  if(btn) btn.onclick=saveDeviceOwnerProfile;
  modal.classList.add('show');
  GlassScrollLock.lock('modal:deviceOwnerModal');
}
function ensureDeviceOwnerSelected(){
  // Priority 1: device owner already exists → enter app directly (handled by init)
  if(getDeviceOwnerProfile()) return;
  // Priority 2: true first use → choose sync code and Mode before profile creation.
  if(!state.familyCode && isLocalDataEmpty()){
    renderOnboardingModal();
    return;
  }
  // Priority 3: existing sync space with usable profiles → bind this device identity.
  if(state.familyCode && (state.profiles||[]).some(p=>isProfileInitializedForDeviceOwner(p))){
    renderOnboardingModal();
    renderOnboardingSelectOwner();
    showOnboardingStep('selectOwner');
    return;
  }
  // Fallback: incomplete local profile or interrupted onboarding.
  renderDeviceOwnerModal();
}

// ==================== ONBOARDING: Join / Create Space ====================

// Join-space flow lock — prevents debouncedSync from pushing empty data during pull-first join
let _isJoiningSpace=false;
// Onboarding flow state
let _onboardingState={step:'join',flow:'',pendingMode:'single',previousMode:'single',previousModeUpdatedAt:0,selectedProfileId:'',targetProfileId:'',generatedCode:''};

function isLocalDataEmpty(){
  if(state.familyCode) return false;
  if(state.current_profile_id) return false;
  const profiles=state.profiles||[];
  if(!profiles.length) return true;
  return profiles.every(p=>
    !(p.name||'').trim() && !p.gender && !p.height && !p.birthDate &&
    !(p.weightRecords||[]).length && !(p.foodRecords||[]).length &&
    !(p.exerciseRecords||[]).length && !(p.stepsRecords||[]).length &&
    !(p.sleepRecords||[]).length && !(p.waterRecords||[]).length
  );
}

function generateFamilyCode(){
  // Avoid easily confused characters: 0/O, 1/I/L
  const chars='ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code='';
  for(let i=0;i<6;i++){
    code+=chars[Math.floor(Math.random()*chars.length)];
  }
  return code;
}

async function checkFamilyCodeExists(code){
  try{
    const resp=await fetch(
      buildRestUrl('/health_sync?code=eq.'+encodeURIComponent(code)+'&order=updated_at.desc&limit=1'),
      {method:'GET',headers:getRestHeaders()}
    );
    if(!resp.ok) return {exists:false,error:`HTTP ${resp.status}`};
    const rows=await resp.json();
    return {exists:!!(rows&&rows.length>0),rows};
  }catch(e){
    return {exists:false,error:e.message};
  }
}

async function generateUniqueFamilyCode(){
  for(let i=0;i<10;i++){
    const code=generateFamilyCode();
    const result=await checkFamilyCodeExists(code);
    if(!result.exists&&!result.error) return code;
  }
  // Fallback: return a code even if conflict checks failed (network issues)
  return generateFamilyCode();
}

function showOnboardingError(msg){
  const el=document.getElementById('onboardingError');
  if(el){
    el.textContent=msg||'';
    el.style.display=msg?'block':'none';
  }
}

function showOnboardingStep(step){
  _onboardingState.step=step;
  const stepIds={
    join:'onboardingStepJoin',
    showCode:'onboardingStepShowCode',
    syncing:'onboardingStepSyncing',
    selectOwner:'onboardingStepSelectOwner',
    createProfile:'onboardingStepCreateProfile'
  };
  Object.values(stepIds).forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.style.display='none';
  });
  showOnboardingError('');
  const target=document.getElementById(stepIds[step]);
  if(target) target.style.display='block';
}

function renderOnboardingModal(){
  const modal=document.getElementById('onboardingModal');
  if(!modal) return;
  _onboardingState={step:'join',flow:'',pendingMode:getAppMode(),previousMode:getAppMode(),previousModeUpdatedAt:Number(state.appModeUpdatedAt)||0,selectedProfileId:'',targetProfileId:'',generatedCode:''};
  showOnboardingStep('join');
  const codeInput=document.getElementById('onboardingSyncCodeInput');
  if(codeInput) codeInput.value='';
  const modeChoices=document.getElementById('onboardingModeChoices');
  modeChoices?.querySelectorAll('.mode-choice-card').forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.mode===_onboardingState.pendingMode);
    btn.onclick=()=>{
      _onboardingState.pendingMode=btn.dataset.mode;
      modeChoices.querySelectorAll('.mode-choice-card').forEach(choice=>choice.classList.toggle('active',choice===btn));
    };
  });
  modal.classList.add('show');
  GlassScrollLock.lock('modal:onboardingModal');
}

function closeOnboardingModal(){
  closeModal('onboardingModal');
}

function startNewOnboardingSpace(code,mode){
  _onboardingState.previousMode=getAppMode();
  _onboardingState.previousModeUpdatedAt=Number(state.appModeUpdatedAt)||0;
  state.familyCode=code;
  if(!setAppMode(mode,{sync:false,notify:false})) throw new Error('使用模式保存失败');
  _onboardingState.flow='create';
  _onboardingState.generatedCode=code;
  _onboardingState.targetProfileId=(state.profiles||[])[0]?.id||'';
  const titleEl=document.getElementById('onboardingCreateProfileTitle');
  if(titleEl) titleEl.textContent='创建我的健康档案';
  ['onboardingNameInput','onboardingGenderInput','onboardingHeightInput','onboardingBirthDateInput','onboardingWeightInput'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.value='';
  });
  const backBtn=document.getElementById('onboardingBackBtn');
  if(backBtn) backBtn.style.display='block';
  showOnboardingStep('createProfile');
}

function finishJoiningExistingSpace(cloudState,code,pendingMode){
  normalizeAppMode(cloudState,{existingData:true});
  const remoteMode=getAppMode(cloudState);
  migrateProfiles(cloudState);
  migrateWeightRecords(cloudState);
  normalizeCoupleSpace(cloudState);
  normalizeDeletedRecords(cloudState);
  state=mergeCloudData(cloudState);
  state.familyCode=code;
  if(!setAppMode(remoteMode,{sync:false,notify:false,updatedAt:cloudState.appModeUpdatedAt})) throw new Error('使用模式保存失败');
  invalidateSyncDataCache();
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(getPersistableState()));
  }catch(e){}
  if(remoteMode!==pendingMode){
    showToast(remoteMode==='couple'
      ? '该同步码属于双人模式，将按双人模式继续。'
      : '该同步码属于个人模式，将按个人模式继续。','info');
  }
  renderOnboardingSelectOwner();
  showOnboardingStep('selectOwner');
  return remoteMode;
}

// Unified first-entry flow: optional code + pending Mode, then Existing/New branching.
async function onboardingContinue(){
  const codeInput=document.getElementById('onboardingSyncCodeInput');
  const requestedCode=(codeInput?.value||'').trim().toUpperCase();
  const pendingMode=_onboardingState.pendingMode==='couple'?'couple':'single';
  if(requestedCode&&(requestedCode.length<4||!/^[A-Z0-9]+$/.test(requestedCode))){
    showOnboardingError('同步码格式不正确，请检查后重试');
    return;
  }
  showOnboardingStep('syncing');
  _isJoiningSpace=true;
  try{
    if(!requestedCode){
      const generatedCode=await generateUniqueFamilyCode();
      startNewOnboardingSpace(generatedCode,pendingMode);
      return;
    }
    const checkResult=await checkFamilyCodeExists(requestedCode);
    if(checkResult.error&&!checkResult.exists){
      const err=checkResult.error||'';
      showOnboardingStep('join');
      showOnboardingError(err.startsWith('HTTP')?'云端服务暂时不可用，请稍后重试':'网络错误，请检查网络连接后重试');
      return;
    }
    if(!checkResult.exists){
      startNewOnboardingSpace(requestedCode,pendingMode);
      return;
    }
    state.familyCode=requestedCode;
    const pullResult=await pullFromCloud();
    if(!pullResult.ok||!pullResult.data){
      state.familyCode='';
      showOnboardingStep('join');
      showOnboardingError(pullResult.ok?'云端数据为空，请确认同步码是否正确':'同步失败，请检查网络后重试');
      return;
    }
    finishJoiningExistingSpace(pullResult.data,requestedCode,pendingMode);
  }catch(e){
    showOnboardingStep('join');
    showOnboardingError('同步过程中出现错误，请重试');
    state.familyCode='';
  }finally{
    _isJoiningSpace=false;
  }
}

function renderOnboardingSelectOwner(){
  const choices=document.getElementById('onboardingOwnerChoices');
  if(!choices) return;
  _onboardingState.selectedProfileId='';

  const confirmBtn=document.getElementById('onboardingConfirmOwnerBtn');
  if(confirmBtn) confirmBtn.style.display='none';

  const desc=document.getElementById('onboardingSelectOwnerDesc');
  const title=document.getElementById('onboardingSelectOwnerTitle');
  const candidates=getDeviceOwnerProfileCandidates(state);

  // Existing spaces keep device-owner binding, but empty compatibility slots are never bindable.
  const anyInitialized=candidates.some(p=>isProfileInitializedForDeviceOwner(p));
  if(title) title.textContent='请选择这台设备的使用者';
  if(desc) desc.textContent=anyInitialized
    ? `已找到${isCoupleMode()?'双人':'个人'}健康空间，请选择这台设备绑定的档案。以后本设备新增的健康记录会默认记录到该档案。`
    : '请选择这台设备的使用者。以后本设备新增的健康记录会默认记录到该档案。';

  const waitingForPartner=isCoupleMode()&&(state.profiles||[]).some(profile=>!isProfileInitializedForDeviceOwner(profile));
  choices.innerHTML=candidates.map(profile=>{
    const index=(state.profiles||[]).findIndex(item=>item.id===profile.id);
    const initialized=isProfileInitializedForDeviceOwner(profile);
    const name=getDisplayName(profile);
    const genderText=profile.gender==='male'?'男':profile.gender==='female'?'女':'';
    const heightText=profile.height?`${profile.height}cm`:'';
    const weightCount=(profile.weightRecords||[]).length;
    const info=[genderText,heightText].filter(Boolean).join(' · ');
    const label=initialized?(name||`档案${index+1}`):`空档案 ${index+1}（待完善）`;

    return `<button class="profile-select-btn" type="button" data-pid="${profile.id}" style="width:100%;justify-content:flex-start;text-align:left;padding:12px;margin-bottom:8px">
      <span class="avatar" style="margin-right:10px">${getProfileAvatarHtml(profile)}</span>
      <span style="display:flex;flex-direction:column;gap:3px">
        <strong style="font-size:14px;color:var(--txt);font-weight:600">${escapeHTML(label)}</strong>
        ${initialized
          ? `<span style="font-size:12px;color:var(--txt2)">${escapeHTML(info)}${weightCount?` · ${weightCount}条体重记录`:''}</span>`
          : '<span style="font-size:12px;color:var(--txt3)">尚未填写资料，选择后需完善</span>'}
      </span>
    </button>`;
  }).join('')+(waitingForPartner?'<div class="app-page-note" data-waiting-partner>等待TA加入</div>':'');

  choices.querySelectorAll('.profile-select-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      choices.querySelectorAll('.profile-select-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      _onboardingState.selectedProfileId=btn.dataset.pid;
      if(confirmBtn) confirmBtn.style.display='block';
    });
  });
}

function onboardingConfirmOwner(){
  const profile=getProfile(_onboardingState.selectedProfileId);
  if(!profile){
    showOnboardingError('请选择这台设备的使用者');
    return;
  }

  // If profile is already initialized → just bind locally
  if(isProfileInitializedForDeviceOwner(profile)){
    const profileDataId=getProfileDataId(profile);
    const previousProfileDataId=state.current_profile_id||'';
    if(!saveLocalCurrentProfileId(profileDataId)||!verifyLocalCurrentProfileId(profileDataId)){
      showDeviceOwnerStorageFailureToast();
      return;
    }
    state.viewerId=profile.id;
    setCurrentProfile(profile.id,{save:false,render:false});
    if(!saveLocalOnly(false)){
      restoreLocalCurrentProfileIdForRollback(previousProfileDataId);
      showToast('档案数据保存失败，请先清理本地存储空间后重试','error');
      return;
    }
    logDeviceOwnerDebug('onboardingConfirmOwner:bind',state);
    closeOnboardingModal();
    renderAll();
    showToast(isCoupleMode()?'已成功加入双人健康空间':'已成功加入个人健康空间','success');
    // Set up periodic sync now that we're configured
    setTimeout(()=>initCloudSync(),500);
    return;
  }

  // If profile is empty → go to create profile form
  _onboardingState.targetProfileId=profile.id;
  _onboardingState.flow='join';

  const titleEl=document.getElementById('onboardingCreateProfileTitle');
  if(titleEl) titleEl.textContent='完善我的健康档案';

  // Clear form
  ['onboardingNameInput','onboardingGenderInput','onboardingHeightInput','onboardingBirthDateInput','onboardingWeightInput'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.value='';
  });

  // Show back button for join mode
  const backBtn=document.getElementById('onboardingBackBtn');
  if(backBtn) backBtn.style.display='block';

  showOnboardingStep('createProfile');
}

// Create new space: auto-generate familyCode
async function onboardingCreateNewSpace(){
  showOnboardingStep('syncing');

  try{
    const code=await generateUniqueFamilyCode();
    _onboardingState.generatedCode=code;

    const codeEl=document.getElementById('onboardingGeneratedCode');
    if(codeEl) codeEl.textContent=code;

    showOnboardingStep('showCode');
  }catch(e){
    showOnboardingStep('join');
    showOnboardingError('生成同步码失败，请重试');
  }
}

function onboardingCopyCode(){
  const code=_onboardingState.generatedCode;
  if(!code) return;

  // Try native clipboard bridge first
  try{
    if(window.AndroidBridge&&typeof window.AndroidBridge.copyToClipboard==='function'){
      window.AndroidBridge.copyToClipboard(code);
      showToast('同步码已复制','success');
      return;
    }
  }catch(e){}

  // Then navigator.clipboard
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(code).then(()=>{
      showToast('同步码已复制','success');
    }).catch(()=>{
      onboardingFallbackCopy(code);
    });
  }else{
    onboardingFallbackCopy(code);
  }
}

function onboardingFallbackCopy(code){
  try{
    const textarea=document.createElement('textarea');
    textarea.value=code;
    textarea.style.position='fixed';
    textarea.style.opacity='0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('同步码已复制','success');
  }catch(e){
    showToast('复制失败，请手动记录同步码','info');
  }
}

function onboardingContinueCreate(){
  // Set the generated familyCode
  state.familyCode=_onboardingState.generatedCode;
  _onboardingState.flow='create';
  _onboardingState.targetProfileId=(state.profiles||[])[0]?.id||'';

  const titleEl=document.getElementById('onboardingCreateProfileTitle');
  if(titleEl) titleEl.textContent='创建我的健康档案';

  // Clear form
  ['onboardingNameInput','onboardingGenderInput','onboardingHeightInput','onboardingBirthDateInput','onboardingWeightInput'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.value='';
  });

  // Show back button — allows returning to sync code page
  const backBtn=document.getElementById('onboardingBackBtn');
  if(backBtn) backBtn.style.display='block';

  showOnboardingStep('createProfile');
}

function onboardingSaveProfile(){
  const profile=getProfile(_onboardingState.targetProfileId);
  if(!profile){
    showOnboardingError('档案异常，请重试');
    return;
  }

  const name=document.getElementById('onboardingNameInput')?.value.trim();
  const gender=document.getElementById('onboardingGenderInput')?.value;
  const height=parseFloat(document.getElementById('onboardingHeightInput')?.value);
  const birthDate=document.getElementById('onboardingBirthDateInput')?.value||'';
  const weight=parseFloat(document.getElementById('onboardingWeightInput')?.value);

  if(!name){showOnboardingError('请填写昵称');return}
  if(!gender){showOnboardingError('请选择性别');return}
  if(!height||height<50||height>250){showOnboardingError('请输入 50-250cm 的有效身高');return}
  if(!weight||weight<20||weight>300){showOnboardingError('请输入 20-300kg 的有效体重');return}

  profile.name=name;
  profile.gender=gender;
  profile.height=height;
  profile.birthDate=birthDate;
  if(profile.startWeight===null||profile.startWeight===undefined) profile.startWeight=weight;
  profile.profileUpdatedAt=Date.now();

  const dateTime=toLocalDateTimeValue();
  profile.weightRecords=profile.weightRecords||[];
  if(profile.weightRecords.length===0){
    profile.weightRecords.push(withProfileId(profile,{
      id:'w'+Date.now()+Math.random().toString(36).slice(2,7),
      date:dateFromDateTimeValue(dateTime),
      dateTime,
      weight,
      bmi:calcBMI(weight,profile.height),
      bodyFat:null,
      bodyFatSource:''
    }));
  }

  const profileDataId=getProfileDataId(profile);
  const previousProfileDataId=state.current_profile_id||'';
  if(!saveLocalCurrentProfileId(profileDataId)||!verifyLocalCurrentProfileId(profileDataId)){
    showDeviceOwnerStorageFailureToast();
    return;
  }
  state.viewerId=profile.id;
  setCurrentProfile(profile.id,{save:false,render:false});

  // saveData triggers debouncedSync — safe now because we have real data and familyCode is set
  if(!saveData()){
    restoreLocalCurrentProfileIdForRollback(previousProfileDataId);
    showToast('档案数据保存失败，请先清理本地存储空间后重试','error');
    return;
  }

  logDeviceOwnerDebug('onboardingSaveProfile:after',state);
  closeOnboardingModal();
  renderAll();

  if(_onboardingState.flow==='create'){
    showToast('健康同步空间已创建，同步码已自动保存','success');
    // Trigger initial sync to push new space to cloud
    setTimeout(()=>syncNow(false),500);
  }else{
    showToast('我的健康档案已创建','success');
    // Trigger sync to push newly filled profile
    setTimeout(()=>syncNow(true),500);
  }
}

function onboardingBack(){
  // New-space confirmation is reversible until the owner profile is saved.
  if(_onboardingState.flow==='create'&&_onboardingState.generatedCode){
    state.familyCode='';
    if(!setAppMode(_onboardingState.previousMode,{sync:false,notify:false,updatedAt:_onboardingState.previousModeUpdatedAt})){
      showOnboardingError('返回失败，请重试');
      return;
    }
    invalidateSyncDataCache();
    _onboardingState.flow='';
    _onboardingState.generatedCode='';
  }
  showOnboardingStep('join');
}

function escapeHTML(v){
  return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// 头像压缩工具：读取图片 → 居中裁切1:1 → 缩放到128×128 → WebP/JPEG压缩
function compressAvatar(file){
  return new Promise((resolve,reject)=>{
    if(!file||!file.type.startsWith('image/')){
      reject(new Error('请选择图片文件'));
      return;
    }
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error('图片读取失败'));
    reader.onload=()=>{
      const img=new Image();
      img.onerror=()=>reject(new Error('图片加载失败'));
      img.onload=()=>{
        const SIZE=128;
        const canvas=document.createElement('canvas');
        canvas.width=SIZE;
        canvas.height=SIZE;
        const ctx=canvas.getContext('2d');
        // 居中裁切1:1
        const minDim=Math.min(img.width,img.height);
        const sx=(img.width-minDim)/2;
        const sy=(img.height-minDim)/2;
        ctx.drawImage(img,sx,sy,minDim,minDim,0,0,SIZE,SIZE);
        // WebP优先，JPEG fallback
        let dataUrl;
        const webp=canvas.toDataURL('image/webp',0.8);
        const jpeg=canvas.toDataURL('image/jpeg',0.8);
        // 选择更小的一个
        if(webp&&webp.length<jpeg.length&&webp.startsWith('data:image/webp')){
          dataUrl=webp;
        }else{
          dataUrl=jpeg;
        }
        // 大小安全检查：DataURL约4/3倍Base64，目标<60KB → DataURL<80KB
        if(dataUrl.length>100*1024){
          // 尝试更低质量
          const lower=canvas.toDataURL('image/jpeg',0.6);
          if(lower.length>100*1024){
            reject(new Error('头像图片过大，请重新选择'));
            return;
          }
          dataUrl=lower;
        }
        resolve(dataUrl);
      };
      img.src=reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// 为编辑个人资料页面绑定头像上传事件
function bindAvatarUploadEvents(profileId){
  const uploadBtn=document.getElementById('uploadAvatarBtn');
  const removeBtn=document.getElementById('removeAvatarBtn');
  const fileInput=document.getElementById('avatarFileInput');
  if(!uploadBtn||!fileInput) return;
  uploadBtn.addEventListener('click',()=>fileInput.click());
  fileInput.addEventListener('change',async()=>{
    const file=fileInput.files[0];
    if(!file) return;
    try{
      const compressed=await compressAvatar(file);
      // 更新预览
      const wrap=document.querySelector('.avatar-preview-wrap');
      if(wrap){
        wrap.innerHTML=`<img src="${compressed}" alt="头像" class="avatar-preview-img">
          <span class="avatar-preview-fallback" style="display:none">·</span>`;
      }
      // 暂存到dataset，保存时读取
      uploadBtn.dataset.avatarData=compressed;
      uploadBtn.dataset.avatarAction='replace';
      // 显示恢复默认按钮
      if(!removeBtn){
        const actions=document.querySelector('.avatar-actions');
        if(actions){
          const rmBtn=document.createElement('button');
          rmBtn.type='button';
          rmBtn.className='avatar-btn avatar-btn-remove';
          rmBtn.id='removeAvatarBtn';
          rmBtn.textContent='恢复默认';
          rmBtn.addEventListener('click',clearAvatarPreview);
          actions.appendChild(rmBtn);
        }
      }else{
        removeBtn.dataset.clearAvatar='1';
        removeBtn.onclick=clearAvatarPreview;
      }
      showToast('头像已选择，保存后生效','info');
    }catch(e){
      showToast(e.message||'头像处理失败','error');
    }
    fileInput.value='';
  });
  if(removeBtn){
    removeBtn.addEventListener('click',clearAvatarPreview);
  }
}
function clearAvatarPreview(){
  const wrap=document.querySelector('.avatar-preview-wrap');
  if(wrap){
    const p=getProfile(settingsProfileId);
    const gender=p?.gender||'';
    const bg=gender==='male'?'rgba(96,165,250,0.2)':gender==='female'?'rgba(167,139,250,0.2)':'rgba(212,175,55,0.2)';
    const color=gender==='male'?'var(--blue)':gender==='female'?'var(--purple)':'var(--gold)';
    wrap.innerHTML=`<span class="avatar-preview-default" style="background:${bg};color:${color}">${getGenderIcon(gender)||'·'}</span>`;
  }
  const uploadBtn=document.getElementById('uploadAvatarBtn');
  if(uploadBtn){
    uploadBtn.dataset.avatarData='';
    uploadBtn.dataset.avatarAction='clear';
  }
  const removeBtn=document.getElementById('removeAvatarBtn');
  if(removeBtn) removeBtn.remove();
  showToast('将恢复默认头像，保存后生效','info');
}
function closeEditPopover(){
  window.GlassUI?.closeAll?.();
  if(window._editPopoverVpHandler){
    window.visualViewport?.removeEventListener('resize',window._editPopoverVpHandler);
    window.visualViewport?.removeEventListener('scroll',window._editPopoverVpHandler);
    window.removeEventListener('scroll',window._editPopoverVpHandler);
    window._editPopoverVpHandler=null;
  }
  document.getElementById('editPopover')?.remove();
  GlassScrollLock.unlock('edit-popover');
}
function showEditPopover(trigger,title,bodyHTML,onSave){
  closeEditPopover();
  const pop=document.createElement('div');
  pop.className='edit-popover';
  pop.id='editPopover';
  pop.innerHTML=`
    <div class="edit-popover-title"><span>${escapeHTML(title)}</span><button class="edit-popover-close" type="button" aria-label="关闭">${icon('x')}</button></div>
    <div class="edit-popover-body modal-scroll-region">${bodyHTML}</div>
    <div class="edit-actions">
      <button type="button" class="cancel">取消</button>
      <button type="button" class="save">保存修改</button>
    </div>`;
  document.body.appendChild(pop);
  GlassScrollLock.lock('edit-popover');
  if(window.GlassUI) GlassUI.enhance(pop);
  function positionPopover(){
    const el=document.getElementById('editPopover');
    if(!el) return;
    const rect=trigger.getBoundingClientRect();
    const isMobile=window.matchMedia('(max-width:640px)').matches;
    const bottomNav=document.querySelector('.bottom-tab-nav');
    const bottomReserve=isMobile?(bottomNav?bottomNav.offsetHeight+20:88):12;
    const vpTop=window.visualViewport?window.visualViewport.offsetTop:0;
    const vpHeight=window.visualViewport?window.visualViewport.height:window.innerHeight;
    const vpWidth=window.visualViewport?window.visualViewport.width:window.innerWidth;
    const availBottom=vpTop+vpHeight-bottomReserve;
    if(isMobile){
      const maxH=availBottom-rect.top-12;
      el.style.maxHeight=Math.max(160,Math.min(maxH,620))+'px';
    }
    const pw=el.offsetWidth,ph=el.offsetHeight;
    let left=rect.right+8;
    if(left+pw>vpWidth-12) left=rect.left-pw-8;
    if(left<12) left=Math.max(12,Math.min(rect.left,vpWidth-pw-12));
    let top=rect.top;
    if(top+ph>availBottom) top=availBottom-ph;
    if(top<vpTop+12) top=vpTop+12;
    el.style.left=`${left}px`;
    el.style.top=`${top}px`;
  }
  positionPopover();
  window._editPopoverVpHandler=()=>requestAnimationFrame(positionPopover);
  window.visualViewport?.addEventListener('resize',window._editPopoverVpHandler,{passive:true});
  window.visualViewport?.addEventListener('scroll',window._editPopoverVpHandler,{passive:true});
  window.addEventListener('scroll',window._editPopoverVpHandler,{passive:true});
  pop.querySelector('.edit-popover-close').addEventListener('click',closeEditPopover);
  pop.querySelector('.cancel').addEventListener('click',closeEditPopover);
  pop.querySelector('.save').addEventListener('click',()=>{
    if(onSave(pop)!==false) closeEditPopover();
  });
  return pop;
}
function openWeightEditor(trigger,p,record){
  const dt=normalizeDateTime(record.dateTime||`${record.date||currentViewDate}T00:00`);
  showEditPopover(trigger,'编辑体重记录',`
    <div class="edit-field"><label>体重 kg</label><input id="editWeight" type="number" min="20" max="300" step="0.1" value="${escapeHTML(record.weight||'')}"></div>
    <div class="edit-field"><label>体脂率 %（可选）</label><input id="editBodyFat" type="number" min="3" max="70" step="0.1" value="${escapeHTML(record.bodyFat||'')}"></div>
    <div class="edit-field"><label>记录时间</label><input id="editDateTime" type="datetime-local" value="${escapeHTML(dt)}"></div>
  `,pop=>{
    if(!requireEditableHealthProfile(p)) return false;
    const w=parseFloat(pop.querySelector('#editWeight').value);
    if(!Number.isFinite(w)||w<20||w>300){showToast('请输入有效体重','error');return false}
    const bodyFatInput=pop.querySelector('#editBodyFat').value;
    const manualBodyFat=parseFloat(bodyFatInput);
    let bodyFat=null,bodyFatSource='';
    if(bodyFatInput){
      if(!Number.isFinite(manualBodyFat)||manualBodyFat<3||manualBodyFat>70){showToast('体脂率请输入 3-70 之间的有效数值','error');return false}
      bodyFat=+manualBodyFat.toFixed(1);bodyFatSource='manual';
    }else{
      bodyFat=calcBodyFatPercent(w,p);
      bodyFatSource=bodyFat?'estimated':'';
    }
    const dateTime=normalizeDateTime(pop.querySelector('#editDateTime').value);
    Object.assign(record,{date:dateFromDateTimeValue(dateTime),dateTime,weight:+w.toFixed(1),bmi:calcBMI(w,p.height),bodyFat,bodyFatSource});
    p.weightRecords.sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
    saveData();renderDashboard();showToast('已保存体重修改','success');
  });
}
function openWaterEditor(trigger,p,record){
  const dt=normalizeDateTime(record.dateTime||`${record.date||currentViewDate}T00:00`);
  showEditPopover(trigger,'编辑饮水记录',`
    <div class="edit-field"><label>饮水量 ml</label><input id="editWaterAmount" type="number" min="1" max="10000" step="1" value="${escapeHTML(record.amount||'')}"></div>
    <div class="edit-field"><label>记录时间</label>${unifiedDateTimeEditorHTML('editWaterTime',dt,'饮水记录时间')}</div>
  `,pop=>{
    if(!requireEditableHealthProfile(p)) return false;
    const amount=Math.round(Number(pop.querySelector('#editWaterAmount').value));
    if(!Number.isFinite(amount)||amount<1||amount>10000){showToast('请输入 1-10000ml 的有效饮水量','error');return false}
    const dateTime=getUnifiedDateTimeValue('editWaterTime',dt);
    Object.assign(record,{amount,date:dateFromDateTimeValue(dateTime),dateTime});
    saveData();renderDashboard();showToast('已保存饮水修改','success');
  });
}
function openFoodEditor(trigger,p,record){
  const dt=normalizeDateTime(record.dateTime||`${record.date||currentViewDate}T00:00`);
  const mealOptions={breakfast:'早餐',lunch:'午餐',dinner:'晚餐',snack:'加餐'};
  const foodRows=(record.foods||[]).map((f,i)=>`
    <div class="edit-food-row">
      <span>${escapeHTML(f.name)} <span style="color:var(--txt3)">实际重量</span></span>
      <span style="display:flex;align-items:center;gap:4px"><input class="editFoodAmount" data-idx="${i}" type="number" min="1" step="1" value="${escapeHTML(prepareFoodPortion(f).amount)}"><small style="color:var(--txt3)">g</small></span>
    </div>`).join('');
  showEditPopover(trigger,'编辑饮食记录',`
    <div class="edit-field"><label>餐次</label><select id="editMeal">${Object.entries(mealOptions).map(([v,t])=>`<option value="${v}" ${record.meal===v?'selected':''}>${t}</option>`).join('')}</select></div>
    <div class="edit-field"><label>记录时间</label>${unifiedDateTimeEditorHTML('editFoodTime',dt,'饮食记录时间')}</div>
    <div class="edit-field"><label>食物实际重量</label>${foodRows||'<div style="font-size:12px;color:var(--txt3)">暂无食物</div>'}</div>
  `,pop=>{
    if(!requireEditableHealthProfile(p)) return false;
    const foods=(record.foods||[]).map((f,i)=>{
      const prepared=prepareFoodPortion(f);
      const amount=parseFloat(pop.querySelector(`.editFoodAmount[data-idx="${i}"]`)?.value||prepared.amount);
      prepared.amount=Number.isFinite(amount)&&amount>0?amount:prepared.amount;
      prepared.quantity=roundFoodValue(prepared.amount/prepared.base_amount,2);
      return serializeFoodPortion(prepared);
    });
    const dateTime=getUnifiedDateTimeValue('editFoodTime',dt);
    Object.assign(record,{meal:pop.querySelector('#editMeal').value,date:dateFromDateTimeValue(dateTime),dateTime,foods});
    saveData();renderDashboard();showToast('已保存饮食修改','success');
  });
}
function openExerciseEditor(trigger,p,record){
  const dt=normalizeDateTime(record.dateTime||`${record.date||currentViewDate}T00:00`);
  const current=EXERCISE_DB.find(e=>e.name===record.name)||EXERCISE_DB[0];
  let selectedExercise=current;
  const valueMatch=String(record.detail||'').replace(/,/g,'').match(/(\d+(?:\.\d+)?)/);
  const pop=showEditPopover(trigger,'编辑运动记录',`
    <div class="edit-field">
      <label>搜索并选择运动项目</label>
      <input id="editExerciseSearch" type="search" placeholder="搜索跑步、骑行、游泳、力量训练…" autocomplete="off">
      <div class="qa-search-results edit-exercise-results" id="editExerciseResults"></div>
      <div class="edit-exercise-selected" id="editExerciseSelected">已选择：<strong>${escapeHTML(current.name)}</strong> · ${getExerciseIntensity(current)}</div>
    </div>
    <div class="edit-field"><label>数值（分钟或步数）</label><input id="editExerciseVal" type="number" min="1" step="1" value="${escapeHTML(valueMatch?valueMatch[1]:current.defaultVal)}"></div>
    <div class="edit-field"><label>记录时间</label>${unifiedDateTimeEditorHTML('editExerciseTime',dt,'运动记录时间')}</div>
  `,pop=>{
    if(!requireEditableHealthProfile(p)) return false;
    const ex=selectedExercise;
    const val=parseFloat(pop.querySelector('#editExerciseVal').value);
    if(!Number.isFinite(val)||val<1){showToast('请输入有效运动数值','error');return false}
    const cal=ex.inputType==='steps'?calcStepsCalories(val,p):calcExerciseCalories(ex,val,p);
    const detail=ex.inputType==='steps'?`${Math.round(val).toLocaleString()} 步`:`${val} 分钟`;
    const dateTime=getUnifiedDateTimeValue('editExerciseTime',dt);
    Object.assign(record,{date:dateFromDateTimeValue(dateTime),dateTime,name:ex.name,detail,calories:cal});
    saveData();renderDashboard();showToast('已保存运动修改','success');
  });
  const search=pop.querySelector('#editExerciseSearch');
  const results=pop.querySelector('#editExerciseResults');
  const selected=pop.querySelector('#editExerciseSelected');
  const renderOptions=list=>{
    results.innerHTML=list.length?list.map(ex=>{
      const idx=EXERCISE_DB.indexOf(ex);
      return `<button class="qa-search-item ${ex.name===selectedExercise.name?'active':''}" type="button" data-idx="${idx}">
        <span><span class="qsi-name">${escapeHTML(ex.name)}</span><span class="qsi-cat">${getExerciseIntensity(ex)} · ${ex.inputType==='steps'?'按步数':'MET '+ex.met}</span></span>
        <span class="qsi-cal">选择</span>
      </button>`;
    }).join(''):'<div class="ex-search-message">未找到相关运动</div>';
    results.querySelectorAll('.qa-search-item').forEach(item=>{
      item.addEventListener('click',()=>{
        const exercise=EXERCISE_DB[Number(item.dataset.idx)];
        if(!exercise) return;
        selectedExercise=exercise;
        selected.innerHTML=`已选择：<strong>${escapeHTML(exercise.name)}</strong> · ${getExerciseIntensity(exercise)}`;
        results.querySelectorAll('.qa-search-item').forEach(option=>option.classList.toggle('active',option===item));
      });
    });
  };
  renderOptions(EXERCISE_DB);
  search.addEventListener('input',()=>renderOptions(findLocalExercises(search.value).slice(0,30)));
  search.focus({preventScroll:true});
}
function openStepsEditor(trigger,p,record){
  const dt=normalizeDateTime(record.dateTime||`${record.date||currentViewDate}T00:00`);
  showEditPopover(trigger,'编辑步数记录',`
    <div class="edit-field"><label>步数</label><input id="editSteps" type="number" min="0" max="100000" step="1" value="${escapeHTML(record.steps||0)}"></div>
    <div class="edit-field"><label>记录时间</label><input id="editDateTime" type="datetime-local" value="${escapeHTML(dt)}"></div>
  `,pop=>{
    if(!requireEditableHealthProfile(p)) return false;
    const steps=parseInt(pop.querySelector('#editSteps').value);
    if(!Number.isFinite(steps)||steps<0||steps>100000){showToast('请输入有效步数','error');return false}
    const dateTime=normalizeDateTime(pop.querySelector('#editDateTime').value);
    Object.assign(record,{steps,date:dateFromDateTimeValue(dateTime),dateTime});
    saveData();renderDashboard();showToast('已保存步数修改','success');
  });
}
function openSleepEditor(trigger,p,record){
  const dt=normalizeDateTime(record.dateTime||`${record.date||currentViewDate}T00:00`);
  const duration=Number(record.duration)||0;
  const referenceDate=record.endDate||record.date||currentViewDate;
  const startTime=(record.startTime||(dt.split('T')[1]||'23:00')).slice(0,5);
  const endTime=(record.endTime||(()=>{const d=new Date(dt);d.setMinutes(d.getMinutes()+duration);return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`})()).slice(0,5);
  showEditPopover(trigger,'编辑睡眠记录',`
    <div class="edit-field"><label>睡眠日期</label><input id="editSleepReferenceDate" type="date" value="${escapeHTML(referenceDate)}"></div>
    <div class="edit-field"><label>开始睡眠</label>${timeCompactHTML('editSleepStart',startTime)}</div>
    <div class="edit-field"><label>结束时间</label>${timeCompactHTML('editSleepEnd',endTime)}</div>
    <div class="edit-field"><label>睡眠质量</label><select id="editSleepQuality"><option value="good" ${record.quality==='good'?'selected':''}>良好</option><option value="normal" ${record.quality==='normal'?'selected':''}>一般</option><option value="poor" ${record.quality==='poor'?'selected':''}>较差</option></select></div>
  `,pop=>{
    if(!requireEditableHealthProfile(p)) return false;
    const range=inferSleepRange(getCompactTime('editSleepStart',startTime),getCompactTime('editSleepEnd',endTime),pop.querySelector('#editSleepReferenceDate').value||currentViewDate);
    const total=range.duration;
    if(total<=0||total>1440){showToast('请输入有效睡眠时长','error');return false}
    Object.assign(record,{
      duration:total,
      quality:pop.querySelector('#editSleepQuality').value,
      date:range.endDate,
      dateTime:range.startDateTime,
      startDate:range.startDate,
      startTime:range.startTime,
      endDate:range.endDate,
      endTime:range.endTime,
      endDateTime:range.endDateTime
    });
    saveData();renderDashboard();showToast('已保存睡眠修改','success');
  });
}
function showToast(msg,type='success'){
  const container=document.getElementById('toastContainer');
  const toast=document.createElement('div');
  toast.className=`toast ${type}`;
  toast.textContent=msg;
  container.appendChild(toast);
  setTimeout(()=>toast.classList.add('show'),10);
  setTimeout(()=>{
    toast.classList.remove('show');
    setTimeout(()=>toast.remove(),300);
  },2800);
}

// ==================== QUICK ADD PANEL ====================
function logOverlayDebug(action,source){
  const visible=Array.from(document.querySelectorAll('.quick-add-overlay.active,.modal-overlay.show')).map(el=>{
    const style=getComputedStyle(el);
    return {id:el.id,pointerEvents:style.pointerEvents,zIndex:style.zIndex,display:style.display,opacity:style.opacity};
  });
  console.debug('[OverlayDebug]',{action,source,visible});
}
function logQuickRecordDebug(button,openTarget,success,error=''){
  console.debug('[QuickRecordDebug]',{
    button,
    openTarget,
    success:!!success,
    error:error?String(error):''
  });
}
function openRecordEntry(type,options={}){
  const routes={
    photo:{target:'photo-recognition',render:renderPhotoModal},
    food:{target:'food-search',render:renderFoodSearchModal},
    voice:{target:'voice-record',render:renderVoiceModal},
    water:{target:'water-record',render:renderWaterModal},
    weight:{target:'weight-record',render:renderWeightModal},
    exercise:{target:'exercise-record',render:renderExerciseModal},
    steps:{target:'steps-record',render:renderStepsModal},
    sleep:{target:'sleep-record',render:renderSleepModal},
    more:{target:'more-records',render:renderMoreModal}
  };
  const route=routes[type];
  if(!route){
    showToast('暂时无法打开该记录入口','error');
    return false;
  }
  try{
    route.render();
    const success=!!document.getElementById('quickActionModal')?.classList.contains('show');
    logQuickRecordDebug(options.button||options.source||type,route.target,success,success?'':'目标界面未显示');
    if(!success) showToast('快捷记录界面打开失败，请重试','error');
    return success;
  }catch(err){
    console.error('[QuickRecordDebug] open failed:',err);
    logQuickRecordDebug(options.button||options.source||type,route.target,false,err?.message||err);
    showToast('快捷记录界面打开失败，请重试','error');
    return false;
  }
}
window.openRecordEntry=openRecordEntry;
function setupQuickAddPanel(){
  const btn=document.getElementById('quickAddBtn');
  const panel=document.getElementById('quickAddPanel');
  const overlay=document.getElementById('quickAddOverlay');
  const closeTop=document.getElementById('quickAddCloseTop');
  const handle=document.getElementById('quickAddHandle');
  const carouselViewport=document.getElementById('quickAddCarouselViewport');
  const carouselTrack=document.getElementById('quickAddCarouselTrack');
  const paginationEl=document.getElementById('quickAddPagination');
  if(!btn||!panel||!overlay||!carouselTrack||!carouselViewport) return;

  const QUICK_ADD_PAGES=[
    [
      {type:'food',icon:'utensils',label:'搜索食物'},
      {type:'voice',icon:'mic',label:'语音记录'},
      {type:'water',icon:'droplets',label:'记录饮水'},
      {type:'weight',icon:'scale',label:'记录体重'},
      {type:'exercise',icon:'activity',label:'记录运动'},
      {type:'steps',icon:'footprints',label:'记录步数'}
    ],
    [
      {type:'sleep',icon:'bed',label:'睡眠记录'},
      {type:'photo',icon:'camera',label:'身体照片'},
      {type:'bp',icon:'heart',label:'血压记录'},
      {type:'hr',icon:'activity',label:'心率记录'},
      {type:'custom',icon:'edit',label:'自定义记录'}
    ]
  ];
  const DRAG_THRESHOLD=8;
  const SHEET_CLOSE_RATIO=0.22;
  const SHEET_VEL_CLOSE=0.55;

  carouselTrack.innerHTML=QUICK_ADD_PAGES.map(page=>`
    <div class="quick-add-carousel-page">
      ${page.map(item=>`
        <button class="qa-item" type="button" data-record-type="${item.type}">
          <div class="qa-item-icon"><span class="ui-icon" data-icon="${item.icon}"></span></div>
          <span class="qa-item-label">${item.label}</span>
        </button>
      `).join('')}
    </div>
  `).join('');
  renderIcons(panel);

  const pageCount=QUICK_ADD_PAGES.length;
  let carouselPage=0;
  let carouselDragX=0;
  let carouselPointerId=null;
  let carouselStartX=0;
  let carouselStartY=0;
  let carouselLastX=0;
  let carouselLastT=0;
  let carouselVelX=0;
  let carouselLocked=null;
  let carouselMoved=false;
  let blockCarouselClick=false;

  let sheetPointerId=null;
  let sheetStartY=0;
  let sheetStartX=0;
  let sheetLastY=0;
  let sheetLastT=0;
  let sheetVelY=0;
  let sheetLocked=null;
  let sheetDragging=false;

  let isOpen=false;

  function getCarouselWidth(){
    return carouselViewport.offsetWidth||carouselViewport.getBoundingClientRect().width||1;
  }
  function applyCarouselOffset(rawOffset){
    if(carouselPage===0&&rawOffset>0) return rawOffset*0.32;
    if(carouselPage===pageCount-1&&rawOffset<0) return rawOffset*0.32;
    return rawOffset;
  }
  function setCarouselTransform(offsetPx,animate){
    const w=getCarouselWidth();
    const base=-carouselPage*w;
    carouselTrack.classList.toggle('is-snapping',!!animate);
    carouselTrack.classList.toggle('is-dragging',!animate);
    carouselTrack.style.transform=`translate3d(${base+applyCarouselOffset(offsetPx)}px,0,0)`;
  }
  function renderPagination(){
    if(!paginationEl) return;
    if(pageCount<=1){
      paginationEl.hidden=true;
      paginationEl.innerHTML='';
      return;
    }
    paginationEl.hidden=false;
    paginationEl.innerHTML=QUICK_ADD_PAGES.map((_,i)=>`
      <button type="button" class="quick-add-dot${i===carouselPage?' active':''}" data-page="${i}" aria-label="第 ${i+1} 页"></button>
    `).join('');
    paginationEl.querySelectorAll('.quick-add-dot').forEach(dot=>{
      dot.addEventListener('click',()=>{
        const p=Number(dot.dataset.page);
        if(!Number.isFinite(p)||p===carouselPage) return;
        carouselPage=Math.max(0,Math.min(pageCount-1,p));
        setCarouselTransform(0,true);
        renderPagination();
      });
    });
  }
  function snapCarouselPage(){
    const w=getCarouselWidth();
    const threshold=Math.max(48,w*0.18);
    let next=carouselPage;
    if(carouselDragX<-threshold||carouselVelX<-0.45) next=Math.min(pageCount-1,carouselPage+1);
    else if(carouselDragX>threshold||carouselVelX>0.45) next=Math.max(0,carouselPage-1);
    carouselPage=next;
    carouselDragX=0;
    setCarouselTransform(0,true);
    renderPagination();
  }
  function resetCarousel(){
    carouselPage=0;
    carouselDragX=0;
    carouselPointerId=null;
    carouselLocked=null;
    carouselMoved=false;
    blockCarouselClick=false;
    setCarouselTransform(0,false);
    renderPagination();
  }
  function resetSheetStyles(){
    panel.classList.remove('is-sheet-dragging','is-sheet-snap');
    overlay.classList.remove('is-sheet-dragging');
    panel.style.transform='';
    overlay.style.opacity='';
    sheetPointerId=null;
    sheetLocked=null;
    sheetDragging=false;
    sheetVelY=0;
  }

  function openPanel(recordType){
    if(recordType) return openRecordEntry(recordType,{source:'typed-quick-add'});
    if(isOpen) return;
    isOpen=true;
    resetCarousel();
    resetSheetStyles();
    panel.classList.add('active');
    overlay.classList.add('active');
    GlassScrollLock.lock('quick-add-panel');
    requestAnimationFrame(()=>setCarouselTransform(0,false));
    logOverlayDebug('open','quick-record');
    logQuickRecordDebug('quick-add','quick-record',panel.classList.contains('active'));
  }
  function finishClosePanel(){
    isOpen=false;
    panel.classList.remove('active','is-sheet-dragging','is-sheet-snap');
    overlay.classList.remove('is-sheet-dragging');
    panel.style.transform='';
    overlay.classList.remove('active');
    overlay.style.opacity='';
    resetCarousel();
    GlassScrollLock.unlock('quick-add-panel');
    logOverlayDebug('close','quick-record');
    logQuickRecordDebug('close','quick-record',!panel.classList.contains('active'));
  }
  function closePanel(){
    if(!isOpen) return;
    finishClosePanel();
  }
  function animateSheetClose(fromY){
    panel.classList.remove('is-sheet-dragging');
    overlay.classList.remove('is-sheet-dragging');
    panel.classList.add('is-sheet-snap');
    panel.style.transform='translate3d(-50%,100%,0)';
    overlay.style.opacity='0';
    const onDone=()=>{
      panel.removeEventListener('transitionend',onDone);
      finishClosePanel();
    };
    panel.addEventListener('transitionend',onDone);
    setTimeout(onDone,360);
  }
  function animateSheetSnapBack(){
    panel.classList.remove('is-sheet-dragging');
    overlay.classList.remove('is-sheet-dragging');
    panel.classList.add('is-sheet-snap');
    panel.style.transform='translate3d(-50%,0,0)';
    overlay.style.opacity='';
    const onDone=()=>{
      panel.removeEventListener('transitionend',onDone);
      panel.classList.remove('is-sheet-snap');
      panel.style.transform='';
      overlay.style.opacity='';
    };
    panel.addEventListener('transitionend',onDone);
    setTimeout(onDone,360);
  }

  window.closeQuickAddPanel=closePanel;
  window.openQuickAddPanel=openPanel;

  btn.addEventListener('click',e=>{
    e.preventDefault();
    btn.blur();
    openPanel();
  });
  overlay.addEventListener('click',closePanel);
  closeTop?.addEventListener('click',closePanel);
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&isOpen) closePanel();
  });

  carouselViewport.addEventListener('pointerdown',e=>{
    if(!isOpen||e.button>0) return;
    if(sheetPointerId!==null) return;
    carouselPointerId=e.pointerId;
    carouselStartX=e.clientX;
    carouselStartY=e.clientY;
    carouselLastX=e.clientX;
    carouselLastT=performance.now();
    carouselVelX=0;
    carouselLocked=null;
    carouselMoved=false;
    carouselDragX=0;
    try{carouselViewport.setPointerCapture(e.pointerId);}catch(_){}
  });
  carouselViewport.addEventListener('pointermove',e=>{
    if(e.pointerId!==carouselPointerId||!isOpen) return;
    const dx=e.clientX-carouselStartX;
    const dy=e.clientY-carouselStartY;
    if(!carouselLocked){
      if(Math.abs(dx)<DRAG_THRESHOLD&&Math.abs(dy)<DRAG_THRESHOLD) return;
      carouselLocked=Math.abs(dx)>Math.abs(dy)?'x':'y';
      if(carouselLocked!=='x') return;
    }
    if(carouselLocked!=='x') return;
    carouselMoved=true;
    carouselDragX=dx;
    const now=performance.now();
    carouselVelX=(e.clientX-carouselLastX)/Math.max(1,now-carouselLastT);
    carouselLastX=e.clientX;
    carouselLastT=now;
    setCarouselTransform(carouselDragX,false);
      e.preventDefault();
  });
  function endCarouselPointer(e){
    if(e.pointerId!==carouselPointerId) return;
    try{carouselViewport.releasePointerCapture(e.pointerId);}catch(_){}
    if(carouselLocked==='x'&&carouselMoved){
      snapCarouselPage();
      blockCarouselClick=true;
    }
    carouselPointerId=null;
    carouselLocked=null;
    carouselMoved=false;
    carouselVelX=0;
  }
  carouselViewport.addEventListener('pointerup',endCarouselPointer);
  carouselViewport.addEventListener('pointercancel',endCarouselPointer);
  carouselViewport.addEventListener('click',e=>{
    if(blockCarouselClick){
      e.preventDefault();
      e.stopPropagation();
      blockCarouselClick=false;
    }
  },true);

  handle?.addEventListener('pointerdown',e=>{
    if(!isOpen||e.button>0) return;
    if(carouselPointerId!==null) return;
    sheetPointerId=e.pointerId;
    sheetStartY=e.clientY;
    sheetStartX=e.clientX;
    sheetLastY=e.clientY;
    sheetLastT=performance.now();
    sheetVelY=0;
    sheetLocked=null;
    sheetDragging=false;
    try{handle.setPointerCapture(e.pointerId);}catch(_){}
  });
  handle?.addEventListener('pointermove',e=>{
    if(e.pointerId!==sheetPointerId||!isOpen) return;
    const dx=e.clientX-sheetStartX;
    const dy=e.clientY-sheetStartY;
    if(!sheetLocked){
      if(Math.abs(dx)<DRAG_THRESHOLD&&Math.abs(dy)<DRAG_THRESHOLD) return;
      sheetLocked=Math.abs(dy)>Math.abs(dx)?'y':'x';
      if(sheetLocked!=='y') return;
    }
    if(sheetLocked!=='y') return;
    sheetDragging=true;
    panel.classList.add('is-sheet-dragging');
    overlay.classList.add('is-sheet-dragging');
    const now=performance.now();
    sheetVelY=(e.clientY-sheetLastY)/Math.max(1,now-sheetLastT);
    sheetLastY=e.clientY;
    sheetLastT=now;
    let dragY=dy;
    if(dragY<0) dragY=dragY*0.15;
    else dragY=Math.max(0,dragY);
    panel.style.transform=`translate3d(-50%,${dragY}px,0)`;
    const panelH=panel.offsetHeight||320;
    overlay.style.opacity=String(Math.max(0.12,1-dragY/(panelH*0.85)));
    e.preventDefault();
  });
  function endSheetPointer(e){
    if(e.pointerId!==sheetPointerId) return;
    try{handle.releasePointerCapture(e.pointerId);}catch(_){}
    if(sheetLocked==='y'&&sheetDragging){
      const dy=e.clientY-sheetStartY;
      const panelH=panel.offsetHeight||320;
      const effectiveY=dy<0?dy*0.15:Math.max(0,dy);
      const shouldClose=effectiveY>panelH*SHEET_CLOSE_RATIO||sheetVelY>SHEET_VEL_CLOSE;
      if(shouldClose) animateSheetClose(effectiveY);
      else animateSheetSnapBack();
    }else{
      resetSheetStyles();
    }
    sheetPointerId=null;
    sheetLocked=null;
    sheetDragging=false;
    sheetVelY=0;
  }
  handle?.addEventListener('pointerup',endSheetPointer);
  handle?.addEventListener('pointercancel',endSheetPointer);

  window.addEventListener('resize',()=>{
    if(!isOpen) return;
    setCarouselTransform(0,false);
  });

  function openMappedTarget(recordType){
    closePanel();
    setTimeout(()=>{
      openRecordEntry(recordType,{source:'quick-add'});
    },100);
  }
  function openSecondaryRecord(type){
    closePanel();
    setTimeout(()=>{
      if(type==='sleep') openRecordEntry('sleep',{source:'quick-add'});
      else renderUnavailableRecordModal(type);
    },100);
  }

  document.getElementById('qaPhoto')?.addEventListener('click',()=>openMappedTarget('photo'));
  carouselTrack.querySelectorAll('.qa-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const type=item.dataset.recordType;
      if(!type) return;
      if(['food','voice','water','weight','exercise','steps'].includes(type)) openMappedTarget(type);
      else openSecondaryRecord(type);
    });
  });

  document.getElementById('quickActionClose')?.addEventListener('click',closeQuickActionModal);
  document.getElementById('quickActionModal')?.addEventListener('click',e=>{
    if(e.target.id==='quickActionModal') closeQuickActionModal();
  });
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape'||!document.getElementById('quickActionModal')?.classList.contains('show')) return;
    e.stopImmediatePropagation();
    closeQuickActionModal();
  },true);
}

// ==================== QUICK ACTION MODALS ====================

function openQuickActionModal(){
  const modal=document.getElementById('quickActionModal');
  if(!modal) return;
  const wasOpen=modal.classList.contains('show');
  modal.classList.add('show');
  if(document.getElementById('recordDetailModal')?.classList.contains('show')){
    modal.classList.add('modal-overlay--stack-top');
  }
  if(!wasOpen) GlassScrollLock.lock('modal:quickActionModal');
  renderIcons(modal);
  logOverlayDebug('open',modal.dataset.quickAction||'quick-action');
}
function closeQuickActionModal(){
  const modal=document.getElementById('quickActionModal');
  if(!modal) return;
  const action=modal.dataset.quickAction||'quick-action';
  const focused=document.activeElement;
  if(focused&&modal.contains(focused)&&typeof focused.blur==='function') focused.blur();
  window.GlassUI?.closeAll?.();
  if(action==='food-search'){
    cancelPendingFoodSearch();
    foodDraft=[];
    foodDraftSession=null;
    renderAddedFoods();
  }else if(action==='ai-food-search'||action==='food-draft-search'){
    cancelPendingFoodSearch();
  }
  if(action==='exercise') cancelPendingExerciseSearch();
  modal.classList.remove('show');
  modal.classList.remove('modal-overlay--stack-top');
  GlassScrollLock.unlock('modal:quickActionModal');
  delete modal.dataset.quickAction;
  logOverlayDebug('close',action);
  logQuickRecordDebug('close',action,!modal.classList.contains('show'));
}
window.closeQuickActionModal=closeQuickActionModal;

// --- Photo Recognition Modal ---
function renderPhotoModal(){
  const modal=document.getElementById('quickActionModal');
  modal.dataset.quickAction='photo-recognition';
  document.getElementById('quickActionTitle').textContent='AI智能识别';
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      <div class="qa-source-label">选择图片来源</div>
      <div class="qa-source-list">
        <button type="button" class="qa-source-btn" id="qaSourceCamera">
          <span class="qa-source-icon">${icon('camera')}</span>
          <span class="qa-source-text">拍照</span>
          <span class="qa-source-hint">使用相机拍摄</span>
        </button>
        <button type="button" class="qa-source-btn" id="qaSourceGallery">
          <span class="qa-source-icon">${icon('image')}</span>
          <span class="qa-source-text">从相册选择</span>
          <span class="qa-source-hint">选择截图或已有图片</span>
        </button>
      </div>
      <input type="file" id="qaCameraInput" class="photo-input-native" accept="image/*" capture="environment" aria-label="拍照">
      <input type="file" id="qaGalleryInput" class="photo-input-native" accept="image/*" aria-label="从相册选择">
    </div>
  `;
  openQuickActionModal();
  renderIcons(document.getElementById('quickActionContent'));

  const cameraBtn=document.getElementById('qaSourceCamera');
  const galleryBtn=document.getElementById('qaSourceGallery');
  const cameraInput=document.getElementById('qaCameraInput');
  const galleryInput=document.getElementById('qaGalleryInput');

  const handleCameraSelected=(event)=>{
    const file=event.target.files?.[0];
    event.target.value='';
    if(!file) return;
    logQuickRecordDebug('photo-file','ai-photo-camera',true);
    showAIRecognitionLoading();
    routeFoodPhotoRecognition(file);
  };
  const handleGallerySelected=(event)=>{
    const file=event.target.files?.[0];
    event.target.value='';
    if(!file) return;
    logQuickRecordDebug('photo-file','ai-photo-gallery',true);
    showAIRecognitionLoading();
    routeImageRecognition(file);
  };

  cameraBtn.addEventListener('click',()=>cameraInput.click());
  galleryBtn.addEventListener('click',()=>galleryInput.click());
  cameraInput.addEventListener('change',handleCameraSelected);
  galleryInput.addEventListener('change',handleGallerySelected);
}

// --- Water Modal ---
function renderWaterModal(options={}){
  const p=getHealthWriteProfile()||getActiveProfile();
  const recordDate=isValidDateStr(options.date)?options.date:currentViewDate;
  const todayTotal=getTodayWaterTotal(p);
  const goal=calculateDailyWaterGoal(p);
  const remaining=Math.max(goal-todayTotal,0);

  document.getElementById('quickActionTitle').textContent='记录饮水';
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      <div class="qa-today-stat">
        <div>
          <div class="qs-val">${todayTotal.toLocaleString()}<span style="font-size:12px;color:var(--txt3)"> ml</span></div>
          <div class="qs-label">今日已喝</div>
        </div>
        <div>
          <div class="qs-val">${goal.toLocaleString()}<span style="font-size:12px;color:var(--txt3)"> ml</span></div>
          <div class="qs-label">今日目标</div>
        </div>
        <div>
          <div class="qs-val" style="color:${remaining>0?'var(--gold-l)':'#4ade80'}">${remaining>0?remaining.toLocaleString():'✓'}</div>
          <div class="qs-label">${remaining>0?'还需':'已达标'}</div>
        </div>
      </div>
      <div class="qa-quick-btns">
        <button class="qa-quick-btn" data-amount="250">250<span>ml</span></button>
        <button class="qa-quick-btn" data-amount="500">500<span>ml</span></button>
        <button class="qa-quick-btn" data-amount="1000">1000<span>ml</span></button>
      </div>
      <div class="qa-modal-field">
        <label class="qa-modal-label">自定义饮水量 (ml)</label>
        <input type="number" class="qa-modal-input" id="qaWaterCustom" min="1" max="10000" placeholder="输入毫升数">
      </div>
    </div>
    <button class="qa-save-btn" id="qaWaterSave">保存记录</button>
  `;
  openQuickActionModal();

  const content=document.getElementById('quickActionContent');
  let selectedAmount=0;
  content.querySelectorAll('.qa-quick-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      selectedAmount=+btn.dataset.amount;
      const inp=document.getElementById('qaWaterCustom');
      if(inp) inp.value=selectedAmount;
      content.querySelectorAll('.qa-quick-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.getElementById('qaWaterCustom').addEventListener('input',()=>{
    selectedAmount=0;
    content.querySelectorAll('.qa-quick-btn').forEach(b=>b.classList.remove('active'));
  });
  document.getElementById('qaWaterSave').addEventListener('click',()=>{
    const val=+document.getElementById('qaWaterCustom').value||selectedAmount;
    if(!val){
      showToast('请选择或输入饮水量','error');
      return;
    }
    addWaterRecord(val,recordEntryDateTime(recordDate));
    closeQuickActionModal();
  });
}

// --- Weight Modal ---
function renderWeightModal(options={}){
  const p=getHealthWriteProfile()||getActiveProfile();
  const recordDate=isValidDateStr(options.date)?options.date:currentViewDate;
  const latest=getLatestWeight(p);
  const prevWeight=latest?.weight;

  document.getElementById('quickActionTitle').textContent='记录体重';
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      ${prevWeight?`<div class="qa-today-stat"><div><div class="qs-val">${prevWeight}<span style="font-size:12px;color:var(--txt3)"> kg</span></div><div class="qs-label">上次体重</div></div></div>`:''}
      <div class="qa-modal-field" style="margin-bottom:10px">
        <label class="qa-modal-label">当前体重 (kg)</label>
        <input type="number" class="qa-modal-input" id="qaWeightInput" min="20" max="300" step="0.1" placeholder="输入体重">
      </div>
      <div class="qa-modal-field" style="margin-bottom:10px">
        <label class="qa-modal-label">体脂率 (%) - 留空自动估算</label>
        <input type="number" class="qa-modal-input" id="qaBodyFatInput" min="3" max="70" step="0.1" placeholder="可选">
      </div>
      <div class="qa-bmi-display" id="qaBmiDisplay" style="display:none">
        <div class="qa-bmi-num" id="qaBmiNum">--</div>
        <div class="qa-bmi-info">
          <div class="bi-label">BMI</div>
          <div class="bi-badge" id="qaBmiBadge">--</div>
        </div>
      </div>
    </div>
    <button class="qa-save-btn" id="qaWeightSave">保存记录</button>
  `;
  openQuickActionModal();

  const wInput=document.getElementById('qaWeightInput');
  const bfInput=document.getElementById('qaBodyFatInput');
  const bmiDisp=document.getElementById('qaBmiDisplay');

  function updateBMI(){
    const w=parseFloat(wInput.value);
    if(w&&w>=20&&w<=300&&p.height){
      const bmi=calcBMI(w,p.height);
      const cat=bmiCategory(bmi);
      document.getElementById('qaBmiNum').textContent=bmi;
      document.getElementById('qaBmiBadge').textContent=cat.label;
      bmiDisp.style.display='flex';
    }else{
      bmiDisp.style.display='none';
    }
  }
  wInput.addEventListener('input',updateBMI);
  wInput.focus();

  document.getElementById('qaWeightSave').addEventListener('click',()=>{
    const w=parseFloat(wInput.value);
    if(!w||w<20||w>300){
      showToast('请输入有效的体重（20-300kg）','error');
      return;
    }
    if(!requireCurrentDeviceOwnerForHealthWrite()) return;
    const targetProfile=getHealthWriteProfile();
    const bmi=calcBMI(w,targetProfile.height);
    const manualBF=parseFloat(bfInput.value);
    const estimatedBF=calcBodyFatPercent(w,targetProfile);
    let bodyFat=null,bodyFatSource='';
    if(manualBF>=3&&manualBF<=70){
      bodyFat=+manualBF.toFixed(1);bodyFatSource='manual';
    }else if(estimatedBF){
      bodyFat=estimatedBF;bodyFatSource='estimated';
    }
    const dt=normalizeDateTime(recordEntryDateTime(recordDate));
    const date=dateFromDateTimeValue(dt);
    targetProfile.weightRecords=targetProfile.weightRecords||[];
    targetProfile.weightRecords.push(withProfileId(targetProfile,{
      id:'w'+Date.now()+Math.random().toString(36).substr(2,5),
      date,dateTime:dt,weight:w,bmi:bmi,bodyFat:bodyFat,bodyFatSource:bodyFatSource
    }));
    targetProfile.weightRecords.sort((a,b)=>getRecordTime(a).localeCompare(getRecordTime(b)));
    invalidateHealthCoachProfile(targetProfile);
    saveData();
    renderDashboard();
    showToast(`已记录体重 ${w}kg${bodyFat?`，体脂${bodyFat}%`:''}`,'success');
    closeQuickActionModal();
  });
}

// --- Exercise Modal ---
function renderExerciseModal(options={}){
  cancelPendingExerciseSearch();
  const recordDate=isValidDateStr(options.date)?options.date:currentViewDate;
  const modal=document.getElementById('quickActionModal');
  modal.dataset.quickAction='exercise';
  document.getElementById('quickActionTitle').textContent='记录运动';
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      <label class="qa-modal-label" for="qaExerciseSearch">搜索运动项目</label>
      <input type="text" class="qa-modal-input" id="qaExerciseSearch" placeholder="搜索跑步、骑行、游泳、力量训练…" autocomplete="off">
      <div class="qa-search-results" id="qaExerciseResults" style="margin-top:8px"></div>
      <div class="qa-today-stat" id="qaExerciseSelected" style="margin-top:10px"></div>
      <div class="qa-modal-row">
        <div class="qa-modal-field">
          <label class="qa-modal-label" id="qaExUnitLabel">时长（分钟）</label>
          <input type="number" class="qa-modal-input" id="qaExDuration" min="1" max="100000" value="30" placeholder="输入时长">
        </div>
      </div>
      <div class="time-picker" id="qaExerciseTimePicker" aria-label="运动记录时间" style="margin-top:10px"></div>
      <div class="qa-est-cal" id="qaExEst" style="display:none"></div>
    </div>
    <button class="qa-save-btn" id="qaExSave">保存记录</button>
  `;
  openQuickActionModal();
  setupTimePicker('qaExerciseTime',recordEntryDateTime(recordDate));

  const searchInput=document.getElementById('qaExerciseSearch');
  const resultsEl=document.getElementById('qaExerciseResults');
  const selectedEl=document.getElementById('qaExerciseSelected');
  const durInput=document.getElementById('qaExDuration');
  const unitLabel=document.getElementById('qaExUnitLabel');
  const estEl=document.getElementById('qaExEst');
  let selectedExercise=EXERCISE_DB[0];
  let currentAIExercise=null;

  function renderSelected(){
    const intensity=getExerciseIntensity(selectedExercise);
    selectedEl.innerHTML=`<div><div class="qs-label">已选择</div><div class="qs-val" style="font-size:16px">${escapeHTML(selectedExercise.name)}</div></div>
      <div style="text-align:right"><div class="qs-label">强度</div><strong style="color:var(--gold-l)">${intensity}</strong><div class="qs-label">MET ${selectedExercise.met}</div></div>`;
    unitLabel.textContent=selectedExercise.inputType==='steps'?'步数':'时长（分钟）';
    durInput.max=selectedExercise.inputType==='steps'?'100000':'600';
  }
  function selectExercise(exercise){
    if(!exercise) return;
    selectedExercise=exercise;
    durInput.value=exercise.defaultVal||30;
    renderSelected();
    updateEst();
    resultsEl.querySelectorAll('.qa-search-item').forEach(item=>item.classList.toggle('active',item.dataset.name===exercise.name));
  }
  function bindOptions(){
    resultsEl.querySelectorAll('.qa-search-item').forEach(item=>{
      item.addEventListener('click',()=>{
        const exercise=item.dataset.source==='ai'?currentAIExercise:EXERCISE_DB[Number(item.dataset.idx)];
        selectExercise(exercise);
      });
    });
  }
  function renderLocalOptions(list){
    currentAIExercise=null;
    if(!list.length){
      resultsEl.innerHTML='<div class="ex-search-message">未找到相关运动</div>';
      return;
    }
    resultsEl.innerHTML=list.map(exercise=>{
      const idx=EXERCISE_DB.indexOf(exercise);
      return `<div class="qa-search-item" data-source="local" data-idx="${idx}" data-name="${escapeHTML(exercise.name)}">
        <div><div class="qsi-name">${escapeHTML(exercise.name)}</div><div class="qsi-cat">${getExerciseIntensity(exercise)} · ${exercise.inputType==='steps'?'按步数':'MET '+exercise.met}</div></div>
        <div class="qsi-cal">选择</div>
      </div>`;
    }).join('');
    bindOptions();
  }
  function renderAIOption(exercise,fromCache=false){
    currentAIExercise=normalizeAIExercise(exercise);
    if(!currentAIExercise){
      resultsEl.innerHTML='<div class="ex-search-message">没有找到可靠的运动信息，请尝试更具体的名称</div>';
      return;
    }
    resultsEl.innerHTML=`<div class="ex-search-message" style="color:var(--gold)">✨ AI 搜索结果${fromCache?'（缓存）':''}</div>
      <div class="qa-search-item" data-source="ai" data-name="${escapeHTML(currentAIExercise.name)}">
        <div><div class="qsi-name">${escapeHTML(currentAIExercise.name)}</div><div class="qsi-cat">${getExerciseIntensity(currentAIExercise)} · MET ${currentAIExercise.met}</div></div>
        <div class="qsi-cal">选择</div>
      </div>`;
    bindOptions();
  }
  function renderMessage(message,isError=false){
    currentAIExercise=null;
    resultsEl.innerHTML=`<div class="ex-search-message" style="${isError?'color:var(--red)':''}">${message}</div>`;
  }

  function updateEst(){
    const val=+durInput.value;
    if(!val||val<1){estEl.style.display='none';return;}
    const profile=getHealthWriteProfile()||getActiveProfile();
    const cal=selectedExercise.inputType==='steps'?calcStepsCalories(val,profile):calcExerciseCalories(selectedExercise,val,profile);
    estEl.textContent=`预计消耗约 ${cal} kcal`;
    estEl.style.display='block';
  }

  searchInput.addEventListener('input',e=>{
    const rawQuery=e.target.value.trim();
    const q=rawQuery.toLowerCase();
    cancelPendingExerciseSearch();
    if(!rawQuery){renderLocalOptions(EXERCISE_DB);return;}
    const localResults=findLocalExercises(q);
    if(localResults.length){renderLocalOptions(localResults);return;}
    if(q.length<2){renderMessage('未找到相关运动');return;}
    const cached=getCachedAIExercise(rawQuery);
    if(cached){renderAIOption(cached,true);return;}
    const requestId=aiExerciseSearchRequestId;
    renderMessage('AI 正在搜索运动…');
    aiExerciseSearchTimer=setTimeout(async()=>{
      aiExerciseSearchTimer=null;
      if(requestId!==aiExerciseSearchRequestId||searchInput.value.trim().toLowerCase()!==q) return;
      try{
        const aiExercise=await searchExerciseWithAI(rawQuery);
        if(requestId!==aiExerciseSearchRequestId||searchInput.value.trim().toLowerCase()!==q) return;
        if(!aiExercise){renderMessage('没有找到可靠的运动信息，请尝试更具体的名称');return;}
        setCachedAIExercise(rawQuery,aiExercise);
        renderAIOption(aiExercise,false);
      }catch(err){
        if(requestId!==aiExerciseSearchRequestId||searchInput.value.trim().toLowerCase()!==q) return;
        console.error('AI exercise search error:',err);
        renderMessage('AI搜索暂时不可用，请稍后重试',true);
      }
    },650);
  });
  durInput.addEventListener('input',updateEst);
  renderLocalOptions(EXERCISE_DB);
  renderSelected();
  updateEst();
  searchInput.focus();

  document.getElementById('qaExSave').addEventListener('click',()=>{
    const val=+durInput.value;
    const dateTime=normalizeDateTime(getTimePickerValue('qaExerciseTime'));
    if(saveExerciseRecordEntry(selectedExercise,val,dateTime)) closeQuickActionModal();
  });
}

// --- Meal Selector Helpers ---
function mealSelectorHTML(){
  return `<div class="meal-seg" id="mealSeg">
    ${MEAL_KEYS.map(k=>`<button class="meal-seg-btn${k===currentMeal?' active':''}" type="button" data-meal="${k}">${MEAL_LABELS[k]}</button>`).join('')}
  </div>`;
}
function bindMealSelector(scope){
  const container=(scope||document).querySelector('#mealSeg');
  if(!container) return;
  container.querySelectorAll('.meal-seg-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      currentMeal=btn.dataset.meal;
      mealSelectionTouched=true;
      container.querySelectorAll('.meal-seg-btn').forEach(b=>b.classList.toggle('active',b===btn));
    });
  });
}
function syncMealSelectorUI(){
  document.querySelectorAll('.meal-seg-btn').forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.meal===currentMeal);
  });
}
function autoInitMeal(dateTime){
  // Only auto-set if user hasn't manually touched the selector
  if(mealSelectionTouched) return;
  currentMeal=getMealTypeByDateTime(dateTime||toLocalDateTimeValue());
  syncMealSelectorUI();
}

// --- Food Search Modal ---
function renderFoodSearchModal(options={}){
  cancelPendingFoodSearch();
  foodDraft=[];
  foodDraftSession={mode:'search',phase:'search',editingIndex:null,pendingFood:null,recordDate:isValidDateStr(options.date)?options.date:currentViewDate};
  mealSelectionTouched=false;
  currentMeal=getMealTypeByDateTime(recordEntryDateTime(foodDraftSession.recordDate));
  const modal=document.getElementById('quickActionModal');
  modal.dataset.quickAction='food-search';
  document.getElementById('quickActionTitle').textContent='搜索食物';
  openQuickActionModal();
  renderFoodDraftShell();
}

// --- Voice/AI Modal ---
function renderVoiceModal(){
  document.getElementById('quickActionTitle').textContent='语音记录';
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      <textarea class="qa-voice-area" id="qaVoiceText" placeholder="点击下方按钮开始语音输入，或直接输入文字说一句，同时记录健康与支出..."></textarea>
      <div class="qa-voice-status" id="qaVoiceStatus">说一句，同时记录健康与支出</div>
      <div style="display:flex;gap:8px;margin-bottom:10px">
        <button type="button" class="qa-quick-btn" id="qaVoiceBtn" style="flex:1;padding:12px;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none">
          <span class="ui-icon" data-icon="mic" style="display:inline-block;vertical-align:middle;margin-right:4px"></span>
          <span>按住说话</span>
        </button>
      </div>
      <div class="qa-est-cal" id="qaAIParseResult" style="display:none"></div>
      <div id="qaDraftList"></div>
    </div>
    <button type="button" class="qa-save-btn" id="qaVoiceSave" disabled>AI解析</button>
  `;
  openQuickActionModal();
  renderIcons(document.getElementById('quickActionContent'));

  const textArea=document.getElementById('qaVoiceText');
  const statusEl=document.getElementById('qaVoiceStatus');
  const voiceBtn=document.getElementById('qaVoiceBtn');
  const resultEl=document.getElementById('qaAIParseResult');
  const draftList=document.getElementById('qaDraftList');
  const saveBtn=document.getElementById('qaVoiceSave');
  let parsedResult=null;

  // Do NOT auto-focus textarea on modal open — prevents Android soft keyboard from popping up.
  // User can tap textarea manually when they want to type.

  // Voice input via Web Speech API — hold-to-talk with pointer events
  let recognition=null;
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(SR){
    recognition=new SR();
    recognition.lang='zh-CN';
    recognition.continuous=false;
    recognition.interimResults=true;
    let isRecording=false;
    // Three-layer text state: baseText (existing content) + sessionFinal + sessionInterim
    let baseText='';
    let sessionFinal='';
    let sessionInterim='';

    function updateVoiceTextarea(){
      textArea.value=joinSpeechParts([baseText,sessionFinal,sessionInterim]);
    }
    function invalidateParsedResult(){
      if(parsedResult){
        parsedResult=null;
        draftList.innerHTML='';
        saveBtn.textContent='AI解析';
        saveBtn.disabled=!textArea.value.trim();
      }
    }

    recognition.onresult=e=>{
      const finalParts=[];
      const interimParts=[];
      for(let i=0;i<e.results.length;i++){
        const transcript=e.results[i][0]?.transcript||'';
        if(e.results[i].isFinal) finalParts.push(transcript);
        else interimParts.push(transcript);
      }
      sessionFinal=finalParts.join(' ').trim();
      sessionInterim=interimParts.join(' ').trim();
      updateVoiceTextarea();
    };
    recognition.onend=()=>{
      isRecording=false;
      if(sessionInterim){
        sessionFinal=joinSpeechParts([sessionFinal,sessionInterim]);
        sessionInterim='';
      }
      updateVoiceTextarea();
      voiceBtn.innerHTML='<span class="ui-icon" data-icon="mic" style="display:inline-block;vertical-align:middle;margin-right:4px"></span><span>按住说话</span>';
      renderIcons(voiceBtn);
      statusEl.textContent=textArea.value.trim()?'录音结束，可编辑后点击AI解析':'录音结束，未识别到内容';
      if(textArea.value.trim()) saveBtn.disabled=false;
    };
    recognition.onerror=e=>{
      isRecording=false;
      voiceBtn.innerHTML='<span class="ui-icon" data-icon="mic" style="display:inline-block;vertical-align:middle;margin-right:4px"></span><span>按住说话</span>';
      renderIcons(voiceBtn);
      statusEl.textContent='语音识别失败：'+e.error;
    };

    function startRecording(){
      if(isRecording) return;
      // Read current textarea content as baseText — preserves user edits and previous sessions
      baseText=textArea.value.trim();
      sessionFinal='';
      sessionInterim='';
      invalidateParsedResult();
      // Blur textarea to hide soft keyboard before starting voice recognition.
      // Reading .value does not require focus; blur only removes focus, never clears content.
      if(document.activeElement===textArea) textArea.blur();
      try{
        recognition.start();
        isRecording=true;
        voiceBtn.innerHTML='<span class="ui-icon" data-icon="square" style="display:inline-block;vertical-align:middle;margin-right:4px"></span><span>松开结束</span>';
        renderIcons(voiceBtn);
        statusEl.textContent=baseText?'正在继续聆听，新内容会追加到现有文字后面':'正在聆听…';
      }catch(err){
        isRecording=false;
        statusEl.textContent='无法启动录音，请直接输入文字';
      }
    }
    function stopRecording(){
      if(!isRecording) return;
      try{recognition.stop()}catch(e){}
    }

    // Hold-to-talk using pointer events (not click toggle)
    voiceBtn.addEventListener('pointerdown',e=>{
      e.preventDefault();
      startRecording();
    });
    voiceBtn.addEventListener('pointerup',e=>{
      e.preventDefault();
      stopRecording();
    });
    voiceBtn.addEventListener('pointercancel',()=>{
      stopRecording();
    });
    voiceBtn.addEventListener('pointerleave',e=>{
      // Only stop if button was actually pressed (buttons=0 means released)
      if(isRecording&&e.buttons===0) stopRecording();
    });
    // Prevent context menu on voice button (Android long-press copy/select)
    voiceBtn.addEventListener('contextmenu',e=>e.preventDefault());
  }else{
    voiceBtn.addEventListener('click',()=>{
      statusEl.textContent='当前浏览器不支持语音输入，请直接输入文字';
    });
  }

  textArea.addEventListener('input',()=>{
    parsedResult=null;
    draftList.innerHTML='';
    saveBtn.textContent='AI解析';
    saveBtn.disabled=!textArea.value.trim();
  });

  let voiceSaving=false;
  saveBtn.addEventListener('click',async()=>{
    if(voiceSaving) return;
    if(parsedResult){
      voiceSaving=true;
      saveBtn.disabled=true;
      saveBtn.textContent='保存中...';
      const result=saveVoiceDraft(parsedResult,{textArea,draftList,statusEl});
      if(result?.success){
        parsedResult=null;
      }else{
        statusEl.textContent=result?.error||'保存失败，请重试';
        saveBtn.disabled=false;
        saveBtn.textContent='确认保存';
      }
      voiceSaving=false;
      return;
    }
    const text=textArea.value.trim();
    if(!text) return;
    saveBtn.disabled=true;
    saveBtn.textContent='AI解析中...';
    statusEl.textContent='正在解析...';
    try{
      const events=await parseHealthText(text);
      if(!events||events.length===0){
        statusEl.textContent='未能解析出有效记录，请尝试更详细的描述';
        saveBtn.disabled=false;
        saveBtn.textContent='AI解析';
        return;
      }
      // Build draft using existing logic
      const targetProfileId=getHealthWriteProfile()?.id||'';
      const draft=await buildHealthDraft(events,targetProfileId,text);
      if(!draft.events||draft.events.length===0){
        statusEl.textContent='未能解析出有效记录';
        saveBtn.disabled=false;
        saveBtn.textContent='AI解析';
        return;
      }
      parsedResult=draft;
      // Build grouped display from draft events
      const groupOrder=['expense','food','water','exercise','weight','steps','sleep'];
      const groupLabels={expense:'共同账本',food:'饮食',water:'饮水',exercise:'运动',weight:'体重',steps:'步数',sleep:'睡眠'};
      let html='';
      let totalCalories=0;
      groupOrder.forEach(groupType=>{
        const groupEvents=draft.events.map((ev,idx)=>({ev,idx})).filter(({ev})=>ev.type===groupType);
        if(groupEvents.length===0) return;
        html+=`<div style="margin-top:8px"><div style="font-size:11px;color:var(--txt3);font-weight:600;padding:4px 2px;letter-spacing:.5px">${groupLabels[groupType]}</div>`;
        groupEvents.forEach(({ev,evIdx})=>{
          const checked=ev.selected!==false?'checked':'';
          const timeStr=(normalizeDateTime(ev.dateTime).split('T')[1]||'00:00').slice(0,5);
          const warnBadge=ev.needsAttention?`<span style="color:var(--red);font-size:10px;margin-left:4px">${escapeHTML(ev.note||'需确认')}</span>`:'';
          const itemStyle='padding:8px 10px;border:1px solid var(--card-border);border-radius:8px;margin-bottom:4px';
          if(ev.type==='expense'){
            const couple=isCoupleMode();
            const payerOpts=getLedgerPayerOptions();
            const payerSelect=payerOpts.map(o=>`<option value="${o.id}" ${o.id===ev.paidByProfileId?'selected':''}>${escapeHTML(o.name)}</option>`).join('');
            const catOpts=LEDGER_CATEGORY_CONFIG.map(c=>`<option value="${c.key}" ${c.key===ev.categoryKey?'selected':''}>${c.label}</option>`).join('');
            html+=`<div class="qa-draft-item" data-ev-idx="${evIdx}" style="${itemStyle}">
              <div style="display:flex;align-items:center;gap:6px">
                <input type="checkbox" data-toggle-idx="${evIdx}" ${checked} style="flex-shrink:0">
                <span style="font-weight:600;flex:1">${escapeHTML(ev.merchant||'支出')} ¥${escapeHTML(String(ev.amount||''))}</span>
                ${warnBadge}
              </div>
              <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">
                <input type="number" data-field="amount" data-ev-idx="${evIdx}" value="${ev.amount||''}" placeholder="金额" min="0" step="0.01" style="width:70px;font-size:11px;padding:2px 4px;border:1px solid var(--card-border);border-radius:4px;background:transparent;color:var(--txt)">
                <select data-field="categoryKey" data-ev-idx="${evIdx}" style="font-size:11px;padding:2px 4px;border:1px solid var(--card-border);border-radius:4px;background:transparent;color:var(--txt)">${catOpts}</select>
                ${couple?`<select data-field="paidByProfileId" data-ev-idx="${evIdx}" style="font-size:11px;padding:2px 4px;border:1px solid var(--card-border);border-radius:4px;background:transparent;color:var(--txt)">${payerSelect}</select>`:''}
              </div>
              <input type="text" data-field="merchant" data-ev-idx="${evIdx}" value="${escapeHTML(ev.merchant||'')}" placeholder="商家" style="width:100%;font-size:11px;padding:2px 4px;margin-top:4px;border:1px solid var(--card-border);border-radius:4px;background:transparent;color:var(--txt)">
            </div>`;
          }else if(ev.type==='food'){
            (ev.foods||[]).forEach((f,foodIdx)=>{
              const cal=Number(f.draftCalories)||0;
              totalCalories+=cal;
              const estLabel=f.isEstimated?' <span style="color:var(--txt3);font-size:10px">估算</span>':'';
              const qtyLabel=f.quantity&&f.isEstimated&&f.displayText&&f.displayText.includes('×')?f.displayText:f.displayText||`${f.amount||0}g`;
              html+=`<div class="qa-draft-item" data-ev-idx="${evIdx}" style="${itemStyle}">
                <div style="display:flex;align-items:center;gap:6px">
                  <input type="checkbox" data-toggle-idx="${evIdx}" ${checked} style="flex-shrink:0">
                  <span style="font-weight:600;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHTML(f.name)}</span>
                  <span style="color:var(--gold);font-size:11px;white-space:nowrap">约 ${cal} kcal</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
                  <span style="font-size:11px;color:var(--txt2)">${escapeHTML(qtyLabel)}${estLabel}</span>
                  <input type="number" min="1" step="1" value="${f.amount||''}" data-ev-idx="${evIdx}" data-food-idx="${foodIdx}" style="width:60px;font-size:11px;padding:2px 4px;border:1px solid var(--card-border);border-radius:4px;background:transparent;color:var(--txt)" placeholder="g">
                  <span style="font-size:10px;color:var(--txt3)">g</span>
                </div>
              </div>`;
            });
          }else{
            let detail='';
            if(ev.type==='weight') detail=`${ev.weight}kg${ev.bodyFat?` 体脂${ev.bodyFat}%`:''}`;
            else if(ev.type==='exercise') detail=`${escapeHTML(ev.name)} ${ev.duration}分钟`;
            else if(ev.type==='water') detail=`${ev.amount}ml`;
            else if(ev.type==='steps') detail=`${ev.steps}步`;
            else if(ev.type==='sleep') detail=formatDurationCN(ev.duration);
            html+=`<div class="qa-draft-item" data-ev-idx="${evIdx}" style="${itemStyle}">
              <div style="display:flex;align-items:center;gap:6px">
                <input type="checkbox" data-toggle-idx="${evIdx}" ${checked} style="flex-shrink:0">
                <span style="flex:1">${eventIcon(ev.type)} ${eventTitle(ev)} ${timeStr} · ${detail}</span>
                ${warnBadge}
              </div>
            </div>`;
          }
        });
        html+='</div>';
      });
      // Add total calorie summary
      if(totalCalories>0){
        html+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;margin-top:4px;border-radius:8px;border:1px solid var(--gold);background:rgba(255,200,0,0.06)">
          <span style="font-size:12px;color:var(--txt2)">本次预计摄入</span>
          <span id="qaDraftTotalCal" style="font-size:14px;font-weight:700;color:var(--gold)">约 ${totalCalories} kcal</span>
        </div>`;
      }
      draftList.innerHTML=html;
      renderIcons(draftList);
      // Checkbox toggle
      draftList.querySelectorAll('input[data-toggle-idx]').forEach(cb=>{
        cb.addEventListener('change',()=>{
          const ev=parsedResult?.events?.[+cb.dataset.toggleIdx];
          if(ev) ev.selected=cb.checked;
        });
      });
      // Expense field editing
      draftList.querySelectorAll('select[data-field],input[data-field="merchant"],input[data-field="amount"]').forEach(input=>{
        input.addEventListener('change',()=>{
          const ev=parsedResult?.events?.[+input.dataset.evIdx];
          if(!ev||ev.type!=='expense') return;
          const field=input.dataset.field;
          if(field==='amount') ev.amount=Number(input.value)||0;
          else if(field==='categoryKey') ev.categoryKey=input.value;
          else if(field==='paidByProfileId') ev.paidByProfileId=input.value;
          else if(field==='merchant') ev.merchant=input.value;
        });
      });
      // Food gram editing
      draftList.querySelectorAll('input[data-ev-idx][data-food-idx]').forEach(input=>{
        input.addEventListener('change',()=>{
          const evIdx=+input.dataset.evIdx;
          const foodIdx=+input.dataset.foodIdx;
          const ev=parsedResult?.events?.[evIdx];
          const f=ev?.foods?.[foodIdx];
          if(!f) return;
          const newGrams=Math.max(1,Math.round(Number(input.value)||0));
          if(newGrams<=0) return;
          f.amount=newGrams;
          f.effectiveGrams=newGrams;
          f.isEstimated=false;
          f.displayText=f.displayText&&f.displayText.includes('×')
            ? f.displayText.replace(/约\d+g/,`${newGrams}g`).replace('估算','')
            : `${newGrams}g`;
          const nutrition=calculateFoodNutrition(f,newGrams);
          f.draftCalories=Math.round(nutrition.calories);
          f.draftProtein=nutrition.protein;
          f.draftCarbs=nutrition.carbs;
          f.draftFat=nutrition.fat;
          f.draftFiber=nutrition.fiber;
          const item=input.closest('.qa-draft-item');
          if(item){
            const calSpan=item.querySelector('span[style*="gold"]');
            if(calSpan) calSpan.textContent=`约 ${f.draftCalories} kcal`;
            const qtySpan=item.querySelector('span[style*="txt2"]');
            if(qtySpan){
              const baseText=f.displayText||`${newGrams}g`;
              qtySpan.innerHTML=escapeHTML(baseText);
            }
          }
          let newTotal=0;
          parsedResult.events.forEach(e=>{
            if(e.type==='food') (e.foods||[]).forEach(food=>{newTotal+=Number(food.draftCalories)||0});
          });
          const totalEl=document.getElementById('qaDraftTotalCal');
          if(totalEl) totalEl.textContent=`约 ${Math.round(newTotal)} kcal`;
        });
      });
      statusEl.textContent=`已解析 ${draft.events.length} 条记录，确认保存`;
      saveBtn.disabled=false;
      saveBtn.textContent='确认保存';
    }catch(err){
      statusEl.textContent='解析失败：'+(err.message||'未知错误');
      saveBtn.disabled=false;
      saveBtn.textContent='AI解析';
    }
  });
}

// Save voice/AI draft through the existing AI smart-record commit path.
// Validation is handled by commitHealthDraft — don't duplicate it here.
// commitHealthDraft already shows toast on error, so only show success toast here.
function saveVoiceDraft(draft,ui={}){
  try{
    aiHealthDraft=draft;
    const result=commitHealthDraft({showSuccessToast:false,refreshUI:true});
    if(!result.success){
      return result;
    }
    if(ui.textArea) ui.textArea.value='';
    if(ui.draftList) ui.draftList.innerHTML='';
    if(ui.statusEl) ui.statusEl.textContent='已保存';
    closeQuickActionModal();
    let msg=`已保存${result.count}条记录`;
    if(result.expenseSaved>0) msg+=`（含${result.expenseSaved}笔支出）`;
    if(result.expenseSkipped>0) msg+=`，${result.expenseSkipped}笔支出需双人模式`;
    showToast(msg,'success');
    return result;
  }catch(err){
    console.error('[VoiceSave]',err);
    showToast('保存失败，请重试','error');
    return {success:false,error:'保存失败，请重试'};
  }
}

// --- More Records Modal ---
function renderQuickRecordBack(){
  return '<button class="qa-more-btn" type="button" data-quick-record-back><span class="qa-more-icon">←</span><span>返回更多记录</span></button>';
}
function bindQuickRecordBack(){
  document.querySelector('[data-quick-record-back]')?.addEventListener('click',()=>{
    renderMoreModal();
    logQuickRecordDebug('back','more-records',document.getElementById('quickActionTitle')?.textContent==='更多记录');
  });
}
function renderStepsModal(options={}){
  const recordDate=isValidDateStr(options.date)?options.date:currentViewDate;
  const modal=document.getElementById('quickActionModal');
  modal.dataset.quickAction='steps';
  document.getElementById('quickActionTitle').textContent='步数记录';
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      <label class="qa-modal-label" for="qaStepsInput">步数</label>
      <input type="number" class="qa-modal-input" id="qaStepsInput" min="1" max="100000" placeholder="如 8426">
      <div class="time-picker" id="qaStepsTimePicker" aria-label="步数记录时间" style="margin-top:10px"></div>
    </div>
    <button class="qa-save-btn" id="qaStepsSave">保存步数</button>
    ${renderQuickRecordBack()}
  `;
  openQuickActionModal();
  setupTimePicker('qaStepsTime',recordEntryDateTime(recordDate));
  bindQuickRecordBack();
  const input=document.getElementById('qaStepsInput');
  document.getElementById('qaStepsSave').addEventListener('click',()=>{
    const dateTime=normalizeDateTime(getTimePickerValue('qaStepsTime'));
    if(saveStepsRecordEntry(input.value,dateTime)) closeQuickActionModal();
  });
  input.focus();
}
function renderSleepModal(options={}){
  const recordDate=isValidDateStr(options.date)?options.date:currentViewDate;
  const modal=document.getElementById('quickActionModal');
  modal.dataset.quickAction='sleep';
  document.getElementById('quickActionTitle').textContent='睡眠记录';
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      <div class="sleep-start-row sleep-time-compact">
        <span class="sleep-field-label">开始睡眠</span>
        ${timeCompactHTML('qaSleepStart','23:00')}
      </div>
      <div class="sleep-end-quality-row">
        <div class="sleep-field sleep-time-compact">
          <span class="sleep-field-label">结束时间</span>
          ${timeCompactHTML('qaSleepEnd','07:00')}
        </div>
        <div class="sleep-field sleep-quality-field">
          <span class="sleep-field-label">睡眠质量</span>
          <select id="qaSleepQuality">
            <option value="good">良好</option>
            <option value="normal">一般</option>
            <option value="poor">较差</option>
          </select>
        </div>
      </div>
      <div class="qa-modal-field">
        <label class="qa-modal-label" for="qaSleepReferenceDate">睡眠归属日期</label>
        <input class="qa-modal-input" id="qaSleepReferenceDate" type="date" value="${recordDate}">
      </div>
    </div>
    <button class="qa-save-btn" id="qaSleepSave">保存睡眠</button>
    ${renderQuickRecordBack()}
  `;
  openQuickActionModal();
  const content=document.getElementById('quickActionContent');
  window.GlassUI?.enhance?.(content);
  bindQuickRecordBack();
  document.getElementById('qaSleepSave').addEventListener('click',()=>{
    const saved=saveSleepRecordEntry({
      startTime:getCompactTime('qaSleepStart','23:00'),
      endTime:getCompactTime('qaSleepEnd','07:00'),
      referenceDate:document.getElementById('qaSleepReferenceDate').value||recordDate,
      quality:document.getElementById('qaSleepQuality').value
    });
    if(saved) closeQuickActionModal();
  });
}
function renderUnavailableRecordModal(type){
  const labels={photo:'身体照片',bp:'血压记录',hr:'心率记录',custom:'自定义记录'};
  const label=labels[type]||'记录';
  const modal=document.getElementById('quickActionModal');
  modal.dataset.quickAction=`more-${type}`;
  document.getElementById('quickActionTitle').textContent=label;
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      <div class="qa-today-stat" style="display:block;line-height:1.7">
        <strong>${label}</strong>
        <div class="qs-label" style="margin-top:6px">当前项目尚未定义这一记录类型的持久化字段。为避免创建第二套健康数据结构，本入口已独立打开，但暂不执行保存。</div>
      </div>
    </div>
    ${renderQuickRecordBack()}
  `;
  openQuickActionModal();
  bindQuickRecordBack();
}

function renderMoreModal(){
  const moreItems=[
    {id:'sleep',icon:'bed',label:'睡眠记录',desc:'记录睡眠时长和质量'},
    {id:'photo',icon:'camera',label:'身体照片',desc:'记录体型变化'},
    {id:'bp',icon:'heart',label:'血压记录',desc:'记录收缩压/舒张压'},
    {id:'hr',icon:'activity',label:'心率记录',desc:'记录静息心率'},
    {id:'custom',icon:'edit',label:'自定义记录',desc:'自由记录健康数据'}
  ];

  document.getElementById('quickActionModal').dataset.quickAction='more';
  document.getElementById('quickActionTitle').textContent='更多记录';
  document.getElementById('quickActionContent').innerHTML=`
    <div class="qa-modal-section">
      <div class="qa-more-grid">
        ${moreItems.map(item=>`
          <div class="qa-more-item" data-id="${item.id}">
            <span class="ui-icon" data-icon="${item.icon}"></span>
            <div>
              <div style="font-weight:700">${item.label}</div>
              <div style="font-size:10px;color:var(--txt3)">${item.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  openQuickActionModal();

  document.querySelectorAll('.qa-more-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const id=item.dataset.id;
      if(id==='sleep') renderSleepModal();
      else renderUnavailableRecordModal(id);
      const expected={sleep:'睡眠记录',photo:'身体照片',bp:'血压记录',hr:'心率记录',custom:'自定义记录'}[id];
      const success=document.getElementById('quickActionTitle')?.textContent===expected;
      logQuickRecordDebug(`more-${id}`,`more-${id}`,success,success?'':'标题或目标界面不匹配');
    });
  });
}

// ==================== EVENT BINDING ====================
function bindEvents(){
  // Date navigator
  document.getElementById('dateTitleBtn').addEventListener('click',()=>{
    const picker=document.getElementById('datePickerInput');
    if(picker.showPicker) picker.showPicker();
    else picker.click();
  });
  document.getElementById('dateTodayBtn')?.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    const today=todayStr();
    if(currentViewDate===today) return;
    saveLocalViewDate(today);
    renderDateDependentViews();
  });
  document.getElementById('datePickerInput').addEventListener('change',e=>{
    if(!isValidDateStr(e.target.value)) return;
    saveLocalViewDate(e.target.value);
    renderDateDependentViews();
  });

  // Chart controls
  document.querySelectorAll('#periodSeg .td-filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#periodSeg .td-filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      chartPeriod=+btn.dataset.period;
      renderChart();
    });
  });
  document.querySelectorAll('#metricSeg .td-metric-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#metricSeg .td-metric-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      chartMetric=btn.dataset.metric;
      renderChart();
    });
  });
  // Bottom app tabs
  document.querySelectorAll('.bottom-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.id==='quickAddBtn') return; // FAB handled separately
      btn.blur();
      switchAppPage(btn.dataset.appPage);
    });
  });
  document.getElementById('settingsPageOpenSettingsBtn')?.addEventListener('click',openProfileSettings);
  document.getElementById('settingsPageRebindBtn')?.addEventListener('click',openRebindDeviceOwnerModal);
  document.getElementById('coupleOpenSettingsBtn')?.addEventListener('click',()=>switchAppPage('settings'));

  // ===== Quick Add Panel =====
  setupQuickAddPanel();

  // Settings
  document.getElementById('themeToggleBtn').addEventListener('click',toggleTheme);
  document.getElementById('settingsBtn')?.addEventListener('click',()=>switchAppPage('settings'));
  document.getElementById('weeklySummaryDetailClose')?.addEventListener('click',closeWeeklySummaryDetail);
  document.getElementById('weeklySummaryDetailModal')?.addEventListener('click',e=>{
    if(e.target.id==='weeklySummaryDetailModal') closeWeeklySummaryDetail();
  });
  document.getElementById('calorieDeficitClose')?.addEventListener('click',closeCalorieDeficitExplain);
  document.getElementById('calorieDeficitModal')?.addEventListener('click',e=>{
    if(e.target.id==='calorieDeficitModal') closeCalorieDeficitExplain();
  });
  document.getElementById('settingsClose').addEventListener('click',()=>closeModal('settingsModal'));
  document.getElementById('cancelSettingsEditBtn')?.addEventListener('click',()=>closeModal('settingsModal'));
  document.getElementById('saveSettingsBtn').addEventListener('click',handleSettingsSave);
  document.getElementById('rebindDeviceOwnerBtn')?.addEventListener('click',openRebindDeviceOwnerModal);
  document.getElementById('rebindDeviceOwnerClose')?.addEventListener('click',closeRebindDeviceOwnerModal);
  document.getElementById('cancelRebindDeviceOwnerBtn')?.addEventListener('click',()=>{
    if(rebindDeviceOwnerStep==='confirm') renderRebindDeviceOwnerOptions();
    else closeRebindDeviceOwnerModal();
  });
  document.getElementById('confirmRebindDeviceOwnerBtn')?.addEventListener('click',confirmRebindDeviceOwner);
  document.getElementById('exportDataBtn').addEventListener('click',exportData);
  document.getElementById('importDataBtn').addEventListener('click',()=>{
    document.getElementById('importFileInput').click();
  });
  document.getElementById('clearDataBtn')?.addEventListener('click',clearAllData);
  document.getElementById('importFileInput').addEventListener('change',e=>{
    if(e.target.files[0]) importData(e.target.files[0]);
  });
  document.getElementById('settingsModal').addEventListener('click',e=>{
    if(e.target.id==='settingsModal') closeModal('settingsModal');
  });
  initSmartRecipePrefsModal();
  document.getElementById('rebindDeviceOwnerModal')?.addEventListener('click',e=>{
    if(e.target.id==='rebindDeviceOwnerModal') closeRebindDeviceOwnerModal();
  });

  // ===== Onboarding Modal Events =====
  document.getElementById('onboardingContinueBtn')?.addEventListener('click',onboardingContinue);
  document.getElementById('onboardingConfirmOwnerBtn')?.addEventListener('click',onboardingConfirmOwner);
  document.getElementById('onboardingSaveProfileBtn')?.addEventListener('click',onboardingSaveProfile);
  document.getElementById('onboardingBackBtn')?.addEventListener('click',onboardingBack);
  document.getElementById('onboardingSyncCodeInput')?.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();onboardingContinue();}
  });
  document.getElementById('coupleTimeClose')?.addEventListener('click',()=>closeModal('coupleTimeModal'));
  document.getElementById('coupleTimeModal')?.addEventListener('click',e=>{
    if(e.target.id==='coupleTimeModal') closeModal('coupleTimeModal');
  });

  // Cloud sync
  document.getElementById('saveSyncCodeBtn')?.addEventListener('click',saveSyncSection);
  document.getElementById('testSyncBtn').addEventListener('click',testSyncConnection);
  document.getElementById('syncNowBtn').addEventListener('click',async()=>{
    const ok=await syncNow(false);
    if(ok) closeModal('settingsModal');
  });
  document.getElementById('syncBadge').addEventListener('click',()=>{
    if(isCloudConfigured()){
      syncNow(false);
    }else{
      openSyncSettings();
    }
  });

  // AI modal
  document.getElementById('aiClose').addEventListener('click',()=>closeModal('aiModal'));
  document.getElementById('aiModal').addEventListener('click',e=>{
    if(e.target.id==='aiModal') closeModal('aiModal');
  });

  // Mouse-following highlight
  document.addEventListener('mousemove',e=>{
    const card=e.target.closest('.card');
    if(card){
      const rect=card.getBoundingClientRect();
      card.style.setProperty('--mx',`${e.clientX-rect.left}px`);
      card.style.setProperty('--my',`${e.clientY-rect.top}px`);
    }
  });

  // Keyboard
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      closeModal('settingsModal');
      closeRebindDeviceOwnerModal();
      closeModal('aiModal');
      closeModal('coupleTimeModal');
      closeSmartRecipePrefsModal();
      if(document.getElementById('weeklySummaryDetailModal')?.classList.contains('show')) closeWeeklySummaryDetail();
      if(document.getElementById('calorieDeficitModal')?.classList.contains('show')) closeCalorieDeficitExplain();
    }
  });
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

  return merged;
}

// Full sync: pull -> merge -> push
// 优化2/3/6：force=false时检查hash跳过周期同步；复用进行中的Promise；保留SyncPerf日志
async function syncNow(silent,{force=true}={}){
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

// ==================== GLASS SCROLL LOCK ====================
const GlassScrollLock=(()=>{
  const tokens=new Map();
  const allowedSelector='.modal-scroll-region,#settingsModal #settingsForm,.glass-birthday-years,.time-wheel-scroll,.glass-menu,.glass-date-panel,.ex-dropdown,.modal,.edit-popover,.search-results,.qa-search-results,.quick-add-panel,.ledger-dt-scroll';
  let scrollY=0;
  let touchLastY=0;

  function lockCount(){
    let total=0;
    tokens.forEach(count=>{total+=count});
    return total;
  }
  function tokenSnapshot(){
    return Array.from(tokens.entries()).map(([token,count])=>`${token}:${count}`).join(',');
  }
  function logLockState(action,token){
    const count=lockCount();
    const scrollState={
      bodyLocked:document.body.classList.contains('glass-scroll-locked'),
      htmlLocked:document.documentElement.classList.contains('glass-scroll-locked'),
      bodyOverflow:document.body.style.overflow||getComputedStyle(document.body).overflow,
      scrollY:window.scrollY||document.documentElement.scrollTop||0
    };
    console.debug('[ScrollLockDebug]',{
      action:action.toLowerCase(),
      source:token,
      count,
      tokens:tokenSnapshot(),
      className:document.body.className,
      overflow:document.body.style.overflow||getComputedStyle(document.body).overflow
    });
    console.debug('[ScrollDebug]',{overlay:token,lockCount:count,scrollState});
  }
  function allowedScrollRoot(target){
    return target?.closest?.(allowedSelector)||null;
  }
  function canScrollInside(root,deltaY){
    let el=root;
    while(el&&el!==document.body&&el!==document.documentElement){
      const style=getComputedStyle(el);
      const canScroll=/(auto|scroll)/.test(style.overflowY)&&el.scrollHeight>el.clientHeight+1;
      if(canScroll){
        if(deltaY>0) return el.scrollTop+el.clientHeight<el.scrollHeight-1;
        if(deltaY<0) return el.scrollTop>1;
        return true;
      }
      el=el.parentElement;
    }
    return false;
  }
  function applyLock(){
    if(document.body.classList.contains('glass-scroll-locked')) return;
    scrollY=window.scrollY||document.documentElement.scrollTop||0;
    document.body.dataset.glassScrollY=String(scrollY);
    document.body.classList.add('glass-scroll-locked');
    document.documentElement.classList.add('glass-scroll-locked');
  }
  function releaseLock(){
    if(lockCount()>0) return;
    if(!document.body.classList.contains('glass-scroll-locked')) return;
    const y=Number(document.body.dataset.glassScrollY||scrollY||0);
    document.body.classList.remove('glass-scroll-locked');
    document.documentElement.classList.remove('glass-scroll-locked');
    delete document.body.dataset.glassScrollY;
    window.scrollTo(0,y);
  }
  function lock(token='default'){
    // 同一弹层的重复 open 不应制造无法由一次 close 释放的锁；不同 token 仍组成锁栈。
    if(tokens.has(token)){
      logLockState('LOCK-SKIP',token);
      return;
    }
    tokens.set(token,1);
    applyLock();
    logLockState('LOCK',token);
  }
  function unlock(token='default'){
    const current=tokens.get(token)||0;
    if(!current){
      if(!lockCount()) releaseLock();
      return;
    }
    if(current>1) tokens.set(token,current-1);
    else if(current===1) tokens.delete(token);
    releaseLock();
    logLockState('UNLOCK',token);
  }
  function unlockAll(){
    if(!lockCount()&&!document.body.classList.contains('glass-scroll-locked')) return;
    tokens.clear();
    releaseLock();
    logLockState('UNLOCK','all');
  }
  document.addEventListener('touchstart',e=>{
    if(!lockCount()||!e.touches?.length) return;
    touchLastY=e.touches[0].clientY;
  },{passive:true,capture:true});
  document.addEventListener('touchmove',e=>{
    if(!lockCount()) return;
    const root=allowedScrollRoot(e.target);
    if(!root){
      e.preventDefault();
      return;
    }
    // Fast path: time-wheel-scroll has overscroll-behavior:contain and
    // its own overflow-y:auto — let the browser handle it natively.
    // Running canScrollInside (getComputedStyle on every ancestor) here
    // would add per-frame JS overhead that competes with iOS native scrolling.
    if(root.classList?.contains('time-wheel-scroll')||root.classList?.contains('modal-scroll-region')) return;
    const currentY=e.touches?.[0]?.clientY??touchLastY;
    const deltaY=touchLastY-currentY;
    touchLastY=currentY;
    if(!canScrollInside(root,deltaY)) e.preventDefault();
  },{passive:false,capture:true});
  document.addEventListener('wheel',e=>{
    if(!lockCount()) return;
    const root=allowedScrollRoot(e.target);
    if(!root||!canScrollInside(root,e.deltaY)) e.preventDefault();
  },{passive:false,capture:true});
  return {lock,unlock,unlockAll,isLocked:()=>lockCount()>0,getState:()=>({lockCount:lockCount(),tokens:tokenSnapshot()})};
})();
window.GlassScrollLock=GlassScrollLock;

// ==================== GLASS UI PROXY COMPONENTS ====================
const GlassUI=(()=>{
  let activeDropdown=null;
  let activeDatePanel=null;
  let activeDateAnchor=null;
  let observer=null;
  let enhanceTimer=null;
  const pickerLockToken='glass-picker';
  let pickerLocked=false;

  const pad=n=>String(n).padStart(2,'0');
  const fmtDate=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const parseDate=value=>{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(String(value||''))) return null;
    const [y,m,d]=value.split('-').map(Number);
    const date=new Date(y,m-1,d);
    return Number.isNaN(date.getTime())?null:date;
  };
  const clamp=(num,min,max)=>{
    if(Number.isFinite(min)) num=Math.max(min,num);
    if(Number.isFinite(max)) num=Math.min(max,num);
    return num;
  };
  const decimalsOf=value=>{
    const text=String(value||'');
    return text.includes('.')?text.split('.')[1].length:0;
  };
  const dispatchValueEvents=el=>{
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
  };
  const setControlValue=(el,value)=>{
    el.value=value;
    dispatchValueEvents(el);
  };
  const isHiddenByType=el=>el.type==='hidden'||el.type==='file';
  const syncPickerLock=()=>{
    const shouldLock=!!(activeDropdown||activeDatePanel);
    if(shouldLock&&!pickerLocked){
      GlassScrollLock.lock(pickerLockToken);
      pickerLocked=true;
    }else if(!shouldLock&&pickerLocked){
      GlassScrollLock.unlock(pickerLockToken);
      pickerLocked=false;
    }
  };
  const closeDropdown=()=>{
    if(activeDropdown){
      activeDropdown.classList.remove('open');
      activeDropdown._glassMenu?.classList.remove('open','drop-up');
      activeDropdown=null;
    }
    syncPickerLock();
  };
  const closeDatePanel=()=>{
    if(activeDatePanel){
      activeDatePanel.remove();
      activeDatePanel=null;
    }
    activeDateAnchor=null;
    document.querySelectorAll('.glass-date-field.open').forEach(el=>el.classList.remove('open'));
    document.getElementById('dateTitleBtn')?.classList.remove('glass-date-open');
    syncPickerLock();
  };
  const closeAll=()=>{
    closeDropdown();
    closeDatePanel();
  };
  const optionLabel=select=>{
    const opt=select.selectedOptions&&select.selectedOptions[0];
    return opt?opt.textContent.trim():(select.getAttribute('aria-label')||'请选择');
  };
  const isSmallScreen=()=>window.matchMedia('(max-width: 640px)').matches;
  const viewportGap=12;
  const pickerGap=10;
  function logPickerLayerDebug(kind,picker){
    try{
      const edit=document.getElementById('editPopover');
      const menu=document.querySelector('.glass-menu.open');
      const datePanel=document.querySelector('.glass-date-panel');
      const rect=picker?.getBoundingClientRect?.();
      const x=rect?Math.min(Math.max(rect.left+rect.width/2,0),window.innerWidth-1):0;
      const y=rect?Math.min(Math.max(rect.top+Math.min(24,rect.height/2),0),window.innerHeight-1):0;
      console.debug('[PickerLayerDebug]',{
        kind,
        editPopoverZ:edit?getComputedStyle(edit).zIndex:null,
        menuZ:menu?getComputedStyle(menu).zIndex:null,
        datePanelZ:datePanel?getComputedStyle(datePanel).zIndex:null,
        editPopoverParent:edit?.parentElement?.tagName||null,
        menuParent:menu?.parentElement?.tagName||null,
        datePanelParent:datePanel?.parentElement?.tagName||null,
        menuPosition:menu?getComputedStyle(menu).position:null,
        datePanelPosition:datePanel?getComputedStyle(datePanel).position:null,
        editPopoverTransform:edit?getComputedStyle(edit).transform:null,
        menuTransform:menu?getComputedStyle(menu).transform:null,
        activeModalZ:document.querySelector('.modal-overlay.show .modal')?getComputedStyle(document.querySelector('.modal-overlay.show .modal')).zIndex:null,
        elementsAtPickerPoint:document.elementsFromPoint(x,y).slice(0,6).map(el=>`${el.tagName.toLowerCase()}${el.id?`#${el.id}`:''}${el.className?'.'+String(el.className).trim().replace(/\s+/g,'.'):''}`)
      });
    }catch(err){
      console.debug('[PickerLayerDebug]',{kind,error:err?.message||String(err)});
    }
  }

  function placeFloatingPanel(panel,anchor,opts={}){
    if(!panel||!anchor) return;
    const rect=anchor.getBoundingClientRect();
    const target=opts.classTarget||panel;
    const maxAllowedWidth=Math.max(160,window.innerWidth-viewportGap*2);
    const preferredWidth=opts.preferredWidth||rect.width;
    const minWidth=Math.min(opts.minWidth||160,maxAllowedWidth);
    const maxWidth=Math.min(opts.maxWidth||360,maxAllowedWidth);
    const panelWidth=Math.min(maxWidth,Math.max(minWidth,rect.width,preferredWidth));
    const maxHeight=Math.min(opts.maxHeight||320,Math.max(160,window.innerHeight-viewportGap*2));
    const spaceBelow=window.innerHeight-rect.bottom-viewportGap;
    const spaceAbove=rect.top-viewportGap;

    target.classList?.remove('drop-up');
    panel.classList.remove('drop-up','bottom-sheet');
    panel.style.visibility='hidden';
    panel.style.left='0px';
    panel.style.top='0px';
    panel.style.right='';
    panel.style.bottom='';
    panel.style.width=`${panelWidth}px`;
    panel.style.maxHeight=`${maxHeight}px`;

    const naturalHeight=Math.min(panel.scrollHeight||panel.getBoundingClientRect().height||maxHeight,maxHeight);
    const useSheet=opts.allowSheet&&isSmallScreen()&&spaceBelow<naturalHeight+pickerGap&&spaceAbove<naturalHeight+pickerGap;
    if(useSheet){
      const sheetWidth=Math.min(opts.sheetWidth||360,Math.floor(window.innerWidth*.9),maxAllowedWidth);
      panel.classList.add('bottom-sheet');
      panel.style.width=`${sheetWidth}px`;
      panel.style.left=`${Math.max(viewportGap,(window.innerWidth-sheetWidth)/2)}px`;
      panel.style.visibility='';
      return;
    }

    const shouldDropUp=spaceBelow<naturalHeight+pickerGap&&spaceAbove>spaceBelow;
    const availableSpace=(shouldDropUp?spaceAbove:spaceBelow)-pickerGap;
    const finalMaxHeight=Math.max(120,Math.min(maxHeight,availableSpace));
    panel.style.maxHeight=`${finalMaxHeight}px`;
    const measuredHeight=Math.min(panel.scrollHeight||panel.getBoundingClientRect().height||finalMaxHeight,finalMaxHeight);
    let top=rect.bottom+pickerGap;
    if(shouldDropUp){
      top=Math.max(viewportGap,rect.top-measuredHeight-pickerGap);
      target.classList?.add('drop-up');
      panel.classList.add('drop-up');
    }

    const center=rect.left+rect.width/2;
    let left=center-panelWidth/2;
    left=Math.min(Math.max(viewportGap,left),window.innerWidth-panelWidth-viewportGap);
    top=Math.max(viewportGap,top);

    panel.style.left=`${left}px`;
    panel.style.top=`${top}px`;
    panel.style.visibility='';
  }

  function positionDropdownMenu(wrap){
    const menu=wrap?._glassMenu||wrap?.querySelector('.glass-menu');
    const trigger=wrap?.querySelector('.glass-trigger');
    if(!menu||!trigger) return;
    const visibleOptions=menu.querySelectorAll('.glass-option').length;
    const desiredHeight=Math.min(320,Math.max(180,visibleOptions*42+18));
    placeFloatingPanel(menu,trigger,{
      classTarget:wrap,
      minWidth:isSmallScreen()?220:160,
      preferredWidth:isSmallScreen()?260:180,
      maxWidth:isSmallScreen()?Math.min(360,window.innerWidth-viewportGap*2):360,
      maxHeight:desiredHeight
    });
    if(menu.classList.contains('time-wheel-menu')){
      const scroll=menu.querySelector('.time-wheel-scroll');
      if(scroll){
        const menuMaxHeight=menu.style.maxHeight||`${desiredHeight}px`;
        scroll.style.setProperty('--time-wheel-scroll-height',menuMaxHeight);
      }
    }
  }

  function buildSelectOptions(select,menu,label){
    if(!menu||!label) return;
    label.textContent=optionLabel(select);
    const optionsHTML=Array.from(select.options).map((opt,idx)=>{
      const selected=opt.selected?' selected':'';
      return `<div class="glass-option${selected}" role="option" data-value="${escapeHTML(opt.value)}" data-idx="${idx}" aria-selected="${opt.selected?'true':'false'}">
        <span>${escapeHTML(opt.textContent.trim())}</span><span class="glass-option-check">✓</span>
      </div>`;
    }).join('');
    const isTimeWheel=menu.classList.contains('time-wheel-menu');
    menu.innerHTML=isTimeWheel?`<div class="time-wheel-scroll">${optionsHTML}</div>`:optionsHTML;
    let touchStartY=0;
    let touchMoved=false;
    if(isTimeWheel){
      const scroll=menu.querySelector('.time-wheel-scroll');
      scroll?.addEventListener('touchstart',e=>{
        touchStartY=e.touches?.[0]?.clientY||0;
        touchMoved=false;
      },{passive:true});
      scroll?.addEventListener('touchmove',e=>{
        if(Math.abs((e.touches?.[0]?.clientY||touchStartY)-touchStartY)>6) touchMoved=true;
      },{passive:true});
      scroll?.addEventListener('scroll',()=>{
        touchMoved=true;
      },{passive:true});
    }
    menu.querySelectorAll('.glass-option').forEach(item=>{
      item.addEventListener('click',e=>{
        e.preventDefault();
        e.stopPropagation();
        if(isTimeWheel&&touchMoved){
          touchMoved=false;
          return;
        }
        const opt=select.options[+item.dataset.idx];
        if(!opt) return;
        select.value=opt.value;
        dispatchValueEvents(select);
        buildSelectOptions(select,menu,label);
        closeDropdown();
      });
    });
  }

  function enhanceSelect(select){
    if(!select||select.dataset.glassEnhanced==='select'||select.multiple) return;
    if(select.closest('.glass-dropdown')) return;
    select.dataset.glassEnhanced='select';
    const wrap=document.createElement('div');
    wrap.className='glass-dropdown';
    wrap.dataset.glassFor=select.id||select.getAttribute('aria-label')||'select';
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='glass-trigger';
    btn.setAttribute('aria-haspopup','listbox');
    btn.innerHTML=`<span class="glass-trigger-label"></span><span class="glass-trigger-arrow">⌄</span>`;
    const menu=document.createElement('div');
    menu.className='glass-menu';
    if(select.classList.contains('time-select')) menu.classList.add('time-wheel-menu');
    menu.setAttribute('role','listbox');
    wrap._glassMenu=menu;
    select.classList.add('glass-native-select');
    select.insertAdjacentElement('afterend',wrap);
    wrap.append(btn);
    document.body.appendChild(menu);
    const label=btn.querySelector('.glass-trigger-label');
    buildSelectOptions(select,menu,label);
    btn.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      if(activeDropdown&&activeDropdown!==wrap) closeDropdown();
      closeDatePanel();
      const willOpen=!wrap.classList.contains('open');
      wrap.classList.toggle('open',willOpen);
      menu.classList.toggle('open',willOpen);
      activeDropdown=willOpen?wrap:null;
      if(willOpen){
        positionDropdownMenu(wrap);
        // Scroll selected option into view once on open (time-wheel only).
        // Uses rAF to ensure layout is settled before computing positions.
        // After this initial positioning, the user's manual scroll is never
        // overridden — no subsequent scrollIntoView or scrollTop writes.
        if(menu.classList.contains('time-wheel-menu')){
          const scrollEl=menu.querySelector('.time-wheel-scroll');
          const selOpt=menu.querySelector('.glass-option.selected');
          if(scrollEl&&selOpt){
            requestAnimationFrame(()=>{
              const sr=scrollEl.getBoundingClientRect();
              const or=selOpt.getBoundingClientRect();
              scrollEl.scrollTop+=Math.round(or.top-sr.top-(sr.height-or.height)/2);
            });
          }
        }
      }
      syncPickerLock();
    });
    select.addEventListener('change',()=>buildSelectOptions(select,menu,label));
  }

  function refreshSelect(select){
    if(!select||select.dataset.glassEnhanced!=='select') return;
    const wrap=select.nextElementSibling?.classList?.contains('glass-dropdown')?select.nextElementSibling:null;
    if(!wrap) return;
    buildSelectOptions(select,wrap._glassMenu||wrap.querySelector('.glass-menu'),wrap.querySelector('.glass-trigger-label'));
  }

  function enhanceStepper(input){
    if(!input||input.dataset.glassEnhanced==='stepper'||isHiddenByType(input)) return;
    if(input.closest('#goalWeeklyEditableWrap[hidden]')) return;
    if(input.closest('.glass-stepper')||input.closest('.fs-compact-stepper')||input.closest('.ds-stepper')||input.classList.contains('fs-compact-stepper-input')||input.classList.contains('ds-stepper-input')) return;
    input.dataset.glassEnhanced='stepper';
    const wrap=document.createElement('div');
    wrap.className='glass-stepper';
    if(input.classList.contains('af-qty')||input.classList.contains('ar-qty')||input.classList.contains('ex-num-input')||input.classList.contains('editFoodAmount')){
      wrap.classList.add('compact');
    }
    const minus=document.createElement('button');
    minus.type='button';
    minus.className='glass-stepper-btn';
    minus.setAttribute('aria-label','减少');
    minus.textContent='−';
    const plus=document.createElement('button');
    plus.type='button';
    plus.className='glass-stepper-btn';
    plus.setAttribute('aria-label','增加');
    plus.textContent='+';
    input.classList.add('glass-stepper-input');
    input.insertAdjacentElement('beforebegin',wrap);
    wrap.append(minus,input,plus);
    const stepBy=dir=>{
      const stepAttr=input.getAttribute('step');
      const step=stepAttr&&stepAttr!=='any'?parseFloat(stepAttr):1;
      const min=input.min!==''?parseFloat(input.min):NaN;
      const max=input.max!==''?parseFloat(input.max):NaN;
      const base=input.value!==''?parseFloat(input.value):(Number.isFinite(min)?min:0);
      const precision=Math.max(decimalsOf(step),decimalsOf(input.value));
      let next=clamp((Number.isFinite(base)?base:0)+dir*step,min,max);
      input.value=precision?next.toFixed(precision).replace(/\.?0+$/,''):String(Math.round(next));
      dispatchValueEvents(input);
    };
    minus.addEventListener('click',e=>{e.preventDefault();stepBy(-1)});
    plus.addEventListener('click',e=>{e.preventDefault();stepBy(1)});
  }

  function dateDisplay(input){
    const value=input.value;
    if(!value) return input.placeholder||input.getAttribute('aria-label')||'选择日期';
    return formatDateTitle?formatDateTitle(value):value;
  }

  function enhanceDateInput(input){
    if(!input||input.dataset.glassEnhanced==='date'||input.id==='datePickerInput') return;
    if(input.closest('#goalDateEditableWrap[hidden]')) return;
    input.dataset.glassEnhanced='date';
    const wrap=document.createElement('div');
    wrap.className='glass-date-field';
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='glass-date-trigger';
    btn.innerHTML=`<span class="glass-date-label"></span><span class="glass-date-arrow">⌄</span>`;
    input.classList.add('glass-native-date');
    input.insertAdjacentElement('afterend',wrap);
    wrap.append(btn);
    const label=btn.querySelector('.glass-date-label');
    const sync=()=>{label.textContent=dateDisplay(input)};
    sync();
    btn.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      if(activeDatePanel&&activeDateAnchor===btn){
        closeDatePanel();
      }else{
        openDatePicker(input,btn);
      }
    });
    input.addEventListener('change',sync);
    input.addEventListener('input',sync);
  }

  const birthdayDateInputIds=new Set(['setBirthDate','ownerBirthDateInput']);
  const isBirthdayDateInput=input=>birthdayDateInputIds.has(input?.id);
  const defaultBirthdayYear=()=>new Date().getFullYear()-25;
  const ensureBirthdayYearRange=state=>{
    const anchor=Number(state.year)||defaultBirthdayYear();
    if(!Number.isFinite(state.yearRangeStart)) state.yearRangeStart=anchor-60;
    if(!Number.isFinite(state.yearRangeEnd)) state.yearRangeEnd=anchor+20;
  };
  const renderPanelAgain=(panel,input,state)=>{
    renderDatePanel(panel,input,state);
    if(activeDateAnchor) placePanel(panel,activeDateAnchor);
  };
  function renderBirthdayYearMode(panel,input,state,selected){
    ensureBirthdayYearRange(state);
    const selectedYear=selected?.getFullYear();
    let years='';
    for(let year=state.yearRangeStart;year<=state.yearRangeEnd;year++){
      const isSelected=selectedYear===year;
      years+=`<button class="glass-birthday-year ${isSelected?'selected':''}" type="button" data-year="${year}">${year}</button>`;
    }
    panel.innerHTML=`
      <div class="glass-date-head">
        <button class="glass-date-nav" type="button" data-year-page="-50">‹</button>
        <div class="glass-date-title">选择出生年份</div>
        <button class="glass-date-nav" type="button" data-year-page="50">›</button>
      </div>
      <div class="glass-birthday-subtitle">可上下快速滚动，也可用两侧按钮扩展年份范围</div>
      <div class="glass-birthday-years">${years}</div>
      <div class="glass-date-actions">
        <button class="glass-date-action" type="button" data-action="clear">清除生日</button>
        <button class="glass-date-action primary" type="button" data-action="close">完成</button>
      </div>`;
    panel.querySelectorAll('[data-year-page]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        const delta=Number(btn.dataset.yearPage);
        state.yearRangeStart+=delta;
        state.yearRangeEnd+=delta;
        renderPanelAgain(panel,input,state);
      });
    });
    panel.querySelectorAll('.glass-birthday-year').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        state.year=Number(btn.dataset.year);
        state.mode='month';
        renderPanelAgain(panel,input,state);
      });
    });
    panel.querySelector('[data-action="clear"]').addEventListener('click',e=>{
      e.stopPropagation();
      setControlValue(input,'');
      closeDatePanel();
    });
    panel.querySelector('[data-action="close"]').addEventListener('click',e=>{
      e.stopPropagation();
      closeDatePanel();
    });
    setTimeout(()=>{
      const target=panel.querySelector('.glass-birthday-year.selected')||panel.querySelector(`.glass-birthday-year[data-year="${state.year}"]`);
      target?.scrollIntoView?.({block:'center'});
    },0);
  }
  function renderBirthdayMonthMode(panel,input,state,selected){
    const selectedMonth=selected?.getFullYear()===state.year?selected.getMonth():state.month;
    const months=Array.from({length:12},(_,i)=>`
      <button class="glass-birthday-month ${selectedMonth===i?'selected':''}" type="button" data-month="${i}">${i+1}月</button>
    `).join('');
    panel.innerHTML=`
      <div class="glass-date-head">
        <button class="glass-date-nav" type="button" data-action="year-mode">‹</button>
        <button class="glass-date-title-btn" type="button" data-action="year-mode">${state.year}年</button>
        <button class="glass-date-nav" type="button" style="visibility:hidden" tabindex="-1" aria-hidden="true">›</button>
      </div>
      <div class="glass-birthday-subtitle">选择月份后继续选择具体日期</div>
      <div class="glass-birthday-months">${months}</div>
      <div class="glass-date-actions">
        <button class="glass-date-action" type="button" data-action="clear">清除生日</button>
        <button class="glass-date-action primary" type="button" data-action="close">完成</button>
      </div>`;
    panel.querySelectorAll('[data-action="year-mode"]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        state.mode='year';
        renderPanelAgain(panel,input,state);
      });
    });
    panel.querySelectorAll('.glass-birthday-month').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        state.month=Number(btn.dataset.month);
        state.mode='day';
        renderPanelAgain(panel,input,state);
      });
    });
    panel.querySelector('[data-action="clear"]').addEventListener('click',e=>{
      e.stopPropagation();
      setControlValue(input,'');
      closeDatePanel();
    });
    panel.querySelector('[data-action="close"]').addEventListener('click',e=>{
      e.stopPropagation();
      closeDatePanel();
    });
  }
  function renderBirthdayDatePanel(panel,input,state){
    panel.classList.add('birthday-picker');
    const selected=parseDate(input.value);
    if(state.mode==='year') return renderBirthdayYearMode(panel,input,state,selected);
    if(state.mode==='month') return renderBirthdayMonthMode(panel,input,state,selected);
    const first=new Date(state.year,state.month,1);
    const start=new Date(first);
    start.setDate(first.getDate()-((first.getDay()+6)%7));
    const selectedValue=selected?fmtDate(selected):'';
    let days='';
    for(let i=0;i<42;i++){
      const d=new Date(start);
      d.setDate(start.getDate()+i);
      const value=fmtDate(d);
      const isSelected=selectedValue===value;
      const cls=[
        d.getMonth()!==state.month?'muted':'',
        isSelected?'selected':''
      ].filter(Boolean).join(' ');
      days+=`<button class="glass-date-day ${cls}" type="button" data-date="${value}" title="${escapeHTML(formatDateTitle(value))}">
        <span class="glass-date-day-num">${d.getDate()}</span>
      </button>`;
    }
    panel.innerHTML=`
      <div class="glass-date-head">
        <button class="glass-date-nav" type="button" data-nav="-1">‹</button>
        <button class="glass-date-title-btn" type="button" data-action="year-mode"><span>${state.year}年</span> ${state.month+1}月</button>
        <button class="glass-date-nav" type="button" data-nav="1">›</button>
      </div>
      <div class="glass-birthday-subtitle">点击年份可快速选择出生年份</div>
      <div class="glass-date-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
      <div class="glass-date-grid">${days}</div>
      <div class="glass-date-actions">
        <button class="glass-date-action" type="button" data-action="clear">清除生日</button>
        <button class="glass-date-action primary" type="button" data-action="close">完成</button>
      </div>`;
    panel.querySelectorAll('[data-nav]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        state.month+=Number(btn.dataset.nav);
        if(state.month<0){state.month=11;state.year--}
        if(state.month>11){state.month=0;state.year++}
        renderPanelAgain(panel,input,state);
      });
    });
    panel.querySelector('[data-action="year-mode"]').addEventListener('click',e=>{
      e.stopPropagation();
      state.mode='year';
      renderPanelAgain(panel,input,state);
    });
    panel.querySelectorAll('.glass-date-day').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        setControlValue(input,btn.dataset.date);
        closeDatePanel();
      });
    });
    panel.querySelector('[data-action="clear"]').addEventListener('click',e=>{
      e.stopPropagation();
      setControlValue(input,'');
      closeDatePanel();
    });
    panel.querySelector('[data-action="close"]').addEventListener('click',e=>{
      e.stopPropagation();
      closeDatePanel();
    });
  }

  const ensureGenericYearRange=state=>{
    const anchor=Number(state.year)||new Date().getFullYear();
    if(!Number.isFinite(state.yearRangeStart)) state.yearRangeStart=anchor-24;
    if(!Number.isFinite(state.yearRangeEnd)) state.yearRangeEnd=anchor+8;
  };
  function renderGenericYearMode(panel,input,state,selected){
    ensureGenericYearRange(state);
    const selectedYear=selected?.getFullYear();
    let years='';
    for(let year=state.yearRangeStart;year<=state.yearRangeEnd;year++){
      const isSelected=selectedYear===year||(!selected&&state.year===year);
      years+=`<button class="glass-birthday-year ${isSelected?'selected':''}" type="button" data-year="${year}">${year}</button>`;
    }
    panel.innerHTML=`
      <div class="glass-date-head">
        <button class="glass-date-nav" type="button" data-year-page="-24">‹</button>
        <div class="glass-date-title">选择年份</div>
        <button class="glass-date-nav" type="button" data-year-page="24">›</button>
      </div>
      <div class="glass-date-quick-note">选择年份后回到月份日历，可快速设置生日、纪念日或记录日期</div>
      <div class="glass-birthday-years">${years}</div>
      <div class="glass-date-actions">
        <button class="glass-date-action" type="button" data-action="back">返回日历</button>
        <button class="glass-date-action primary" type="button" data-action="today">今天</button>
      </div>`;
    panel.querySelectorAll('[data-year-page]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        const delta=Number(btn.dataset.yearPage);
        state.yearRangeStart+=delta;
        state.yearRangeEnd+=delta;
        renderPanelAgain(panel,input,state);
      });
    });
    panel.querySelectorAll('.glass-birthday-year').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        state.year=Number(btn.dataset.year);
        state.mode='day';
        renderPanelAgain(panel,input,state);
      });
    });
    panel.querySelector('[data-action="back"]').addEventListener('click',e=>{
      e.stopPropagation();
      state.mode='day';
      renderPanelAgain(panel,input,state);
    });
    panel.querySelector('[data-action="today"]').addEventListener('click',e=>{
      e.stopPropagation();
      setControlValue(input,fmtDate(new Date()));
      closeDatePanel();
    });
    setTimeout(()=>{
      const target=panel.querySelector('.glass-birthday-year.selected')||panel.querySelector(`.glass-birthday-year[data-year="${state.year}"]`);
      target?.scrollIntoView?.({block:'center'});
    },0);
  }

  function renderDatePanel(panel,input,state){
    if(isBirthdayDateInput(input)) return renderBirthdayDatePanel(panel,input,state);
    const selected=parseDate(input.value);
    if(state.mode==='year') return renderGenericYearMode(panel,input,state,selected);
    const today=new Date();
    const todayValue=fmtDate(today);
    const first=new Date(state.year,state.month,1);
    const start=new Date(first);
    start.setDate(first.getDate()-((first.getDay()+6)%7));
    const monthTitle=`${state.year}年${state.month+1}月`;
    let days='';
    for(let i=0;i<42;i++){
      const d=new Date(start);
      d.setDate(start.getDate()+i);
      const value=fmtDate(d);
      const isToday=todayValue===value;
      const isSelected=selected&&fmtDate(selected)===value;
      const detail=state.showCompletion?getDailyCompletionDetails(getActiveProfile(),value):{percent:0,hasData:false};
      const completion=detail.percent;
      const rateClass=!detail.hasData?'rate-empty':(completion>=80?'rate-high':(completion<50?'rate-low':'rate-mid'));
      const stateLabel=isToday&&isSelected?'今天 · 当前查看':(isToday?'今天':(isSelected?'当前查看':''));
      const cls=[
        d.getMonth()!==state.month?'muted':'',
        isToday?'today':'',
        isSelected?'selected':'',
        state.showCompletion?'has-completion':''
      ].filter(Boolean).join(' ');
      const titleText=state.showCompletion?`${formatDateTitle(value)}${stateLabel?` · ${stateLabel}`:''} · 健康完成度 ${completion}%`:formatDateTitle(value);
      days+=`<button class="glass-date-day ${cls}" type="button" data-date="${value}" title="${escapeHTML(titleText)}">
        <span class="glass-date-day-num">${d.getDate()}</span>
        ${state.showCompletion?`<span class="glass-date-day-rate ${rateClass}">${completion}%</span>`:''}
      </button>`;
    }
    panel.innerHTML=`
      <div class="glass-date-head">
        <button class="glass-date-nav" type="button" data-nav="-1">‹</button>
        <button class="glass-date-title-btn" type="button" data-action="year-mode">${monthTitle}</button>
        <button class="glass-date-nav" type="button" data-nav="1">›</button>
      </div>
      <div class="glass-date-quick-note">点击年月可快速切换年份</div>
      <div class="glass-date-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
      <div class="glass-date-grid">${days}</div>
      <div class="glass-date-actions">
        <button class="glass-date-action" type="button" data-action="clear">清除</button>
        <button class="glass-date-action primary" type="button" data-action="today">今天</button>
      </div>`;
    panel.querySelectorAll('[data-nav]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        state.month+=Number(btn.dataset.nav);
        if(state.month<0){state.month=11;state.year--}
        if(state.month>11){state.month=0;state.year++}
        renderPanelAgain(panel,input,state);
      });
    });
    panel.querySelector('[data-action="year-mode"]').addEventListener('click',e=>{
      e.stopPropagation();
      state.mode='year';
      renderPanelAgain(panel,input,state);
    });
    panel.querySelectorAll('.glass-date-day').forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        setControlValue(input,btn.dataset.date);
        closeDatePanel();
      });
    });
    panel.querySelector('[data-action="today"]').addEventListener('click',e=>{
      e.stopPropagation();
      setControlValue(input,fmtDate(new Date()));
      closeDatePanel();
    });
    panel.querySelector('[data-action="clear"]').addEventListener('click',e=>{
      e.stopPropagation();
      setControlValue(input,'');
      closeDatePanel();
    });
  }

  function placePanel(panel,anchor){
    placeFloatingPanel(panel,anchor,{
      minWidth:isSmallScreen()?280:320,
      preferredWidth:isSmallScreen()?340:340,
      maxWidth:isSmallScreen()?Math.min(360,window.innerWidth-viewportGap*2):380,
      maxHeight:Math.floor(window.innerHeight*.7),
      allowSheet:true,
      sheetWidth:360
    });
  }

  function openDatePicker(input,anchor){
    if(!input) return;
    closeDropdown();
    closeDatePanel();
    const birthdayMode=isBirthdayDateInput(input);
    const selected=parseDate(input.value);
    const base=selected||(birthdayMode?new Date(defaultBirthdayYear(),0,1):(parseDate(currentViewDate)||new Date()));
    const state={
      year:base.getFullYear(),
      month:base.getMonth(),
      mode:birthdayMode&&!selected?'year':'day',
      showCompletion:input.id==='datePickerInput'
    };
    const panel=document.createElement('div');
    panel.className=`glass-date-panel${birthdayMode?' birthday-picker':''}`;
    panel.addEventListener('click',e=>e.stopPropagation());
    document.body.appendChild(panel);
    activeDatePanel=panel;
    activeDateAnchor=anchor;
    document.querySelectorAll('.glass-date-field.open').forEach(el=>el.classList.remove('open'));
    anchor.closest?.('.glass-date-field')?.classList.add('open');
    document.getElementById('dateTitleBtn')?.classList.add('glass-date-open');
    renderDatePanel(panel,input,state);
    placePanel(panel,anchor);
    logPickerLayerDebug('date',panel);
    syncPickerLock();
  }

  function enhance(root=document){
    root.querySelectorAll?.('select:not([data-glass-enhanced])').forEach(enhanceSelect);
    root.querySelectorAll?.('input[type="number"]:not([data-glass-enhanced]):not(.fs-compact-stepper-input):not(.ds-stepper-input)').forEach(enhanceStepper);
    root.querySelectorAll?.('input[type="date"]:not([data-glass-enhanced])').forEach(enhanceDateInput);
  }

  function scheduleEnhance(){
    clearTimeout(enhanceTimer);
    enhanceTimer=setTimeout(()=>enhance(document),30);
  }

  function init(){
    document.addEventListener('click',e=>{
      const titleBtn=e.target.closest?.('#dateTitleBtn');
      if(titleBtn){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if(activeDatePanel&&activeDateAnchor===titleBtn){
          closeDatePanel();
        }else{
          openDatePicker(document.getElementById('datePickerInput'),titleBtn);
        }
        return;
      }
      if(!e.target.closest?.('.glass-dropdown,.glass-menu,.glass-date-panel,.glass-date-field')) closeAll();
    },true);
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape') closeAll();
    });
    const reposition=(e)=>{
      // Skip repositioning when scroll originates from inside a dropdown menu
      // (e.g., user scrolling the time-wheel-scroll). Running placeFloatingPanel
      // on every scroll frame would cause severe lag on iOS.
      if(e&&e.type==='scroll'&&e.target?.closest?.('.glass-menu')) return;
      if(activeDropdown) positionDropdownMenu(activeDropdown);
      if(activeDatePanel&&activeDateAnchor) placePanel(activeDatePanel,activeDateAnchor);
    };
    window.addEventListener('resize',reposition,{passive:true});
    window.addEventListener('scroll',reposition,{passive:true,capture:true});
    enhance(document);
    observer=new MutationObserver(scheduleEnhance);
    observer.observe(document.body,{childList:true,subtree:true});
  }

  return {init,enhance,refreshSelect,openDatePicker,closeAll};
})();
window.GlassUI=GlassUI;

// ==================== INIT ====================
function init(){
  console.log('[Init] start');
  const initStep=(label,fn)=>{
    try{return fn()}
    catch(err){console.error(`[Init] ${label} failed:`,err);return undefined}
  };
  initStep('cleanupLegacyAIFoodCaches',cleanupLegacyAIFoodCaches);
  initStep('applyTheme',()=>applyTheme(getInitialTheme()));
  initStep('renderIcons',()=>renderIcons(document));
  initStep('setupAppPageShell',setupAppPageShell);
  initStep('bindEvents',bindEvents);
  initStep('setupRecordDetailModal',setupRecordDetailModal);
  initStep('GlassUI.init',()=>GlassUI.init());
  initStep('DeviceOwnerDebug:beforeEnsure',()=>logDeviceOwnerDebug('init:before-ensureDeviceOwnerSelected',state));
  const hasDeviceOwner=!!getDeviceOwnerProfile();
  if(hasDeviceOwner){
    initStep('renderAll',()=>renderAll());
  }else{
    initStep('renderProfileTabs',renderProfileTabs);
    initStep('ensureDeviceOwnerSelected',ensureDeviceOwnerSelected);
  }
  initStep('GlassUI.enhance',()=>GlassUI.enhance(document));
  // Initialize cloud sync
  initStep('initCloudSync',initCloudSync);
  // Welcome message for new users — skip if onboarding modal is showing
  if(!document.getElementById('onboardingModal')?.classList.contains('show')){
    const activeProfile=getActiveProfile();
    if(activeProfile&&activeProfile.weightRecords.length===0&&activeProfile.foodRecords.length===0){
      setTimeout(()=>{
        showToast('欢迎使用健康管家！请先点击右上角设置填写个人资料','info');
      },500);
    }
  }
}
init();
