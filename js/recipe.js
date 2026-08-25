/* Phase 4 extracted module — globals shared with index.html */
const AI_SMART_RECIPE_CACHE_KEY = 'healthTrackerSmartRecipeAI_v1';

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
let _SUPPLEMENT_FOODS_CACHE=null;
function getSupplementFoodsData(){
  if(!_SUPPLEMENT_FOODS_CACHE){
    _SUPPLEMENT_FOODS_CACHE=[
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
  }
  return _SUPPLEMENT_FOODS_CACHE;
}
let _SMART_RECIPE_LIBRARY_CACHE=null;
function getSmartRecipeLibraryData(){
  if(!_SMART_RECIPE_LIBRARY_CACHE){
    _SMART_RECIPE_LIBRARY_CACHE=[
  {id:'sr_oat_milk',title:'燕麦牛奶杯',mealType:'breakfast',calories:285,protein:12,carbs:42,fat:8,fiber:5,cookTime:5,difficulty:'简单',noCook:true,allergens:['牛奶','小麦'],appliances:[],tags:['breakfast','easy','light'],ingredients:[{name:'燕麦',amount:40,unit:'g'},{name:'牛奶',amount:200,unit:'ml'},{name:'香蕉',amount:0.5,unit:'根'}],reason:'5分钟就能做好，适合匆忙的早餐',steps:["准备食材：燕麦、牛奶和香蕉备好。","冲泡燕麦：用牛奶浸泡或微波加热至软糯。","组装成杯：香蕉切片放上即可食用。"]},
  {id:'sr_egg_toast',title:'水煮蛋配全麦吐司',mealType:'breakfast',calories:320,protein:18,carbs:28,fat:12,fiber:4,cookTime:10,difficulty:'简单',noCook:false,allergens:['鸡蛋','小麦'],appliances:[],tags:['breakfast','high_protein','easy'],ingredients:[{name:'鸡蛋',amount:2,unit:'个'},{name:'全麦吐司',amount:2,unit:'片'},{name:'黄瓜',amount:50,unit:'g'}],reason:'蛋白质充足，准备也不复杂',steps:["煮蛋：水开后放入鸡蛋煮 7-8 分钟。","烤吐司：全麦吐司轻烤至微脆。","装盘：鸡蛋去壳切开，配黄瓜一起吃。"]},
  {id:'sr_banana_yogurt',title:'香蕉酸奶碗',mealType:'breakfast',calories:255,protein:14,carbs:38,fat:5,fiber:4,cookTime:0,difficulty:'简单',noCook:true,allergens:['牛奶'],appliances:[],tags:['breakfast','no_cook','light','easy'],ingredients:[{name:'无糖酸奶',amount:180,unit:'g'},{name:'香蕉',amount:1,unit:'根'}],reason:'开袋即吃，适合不想开火的早上',steps:["准备酸奶：将无糖酸奶倒入碗中。","切片香蕉：香蕉切段铺在酸奶上。","即可食用：搅拌均匀后直接吃。"]},
  {id:'sr_tomato_omelette',title:'番茄菠菜蛋饼',mealType:'breakfast',calories:290,protein:20,carbs:8,fat:18,fiber:3,cookTime:12,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['炒锅'],tags:['breakfast','high_protein','chinese_home','easy'],ingredients:[{name:'鸡蛋',amount:2,unit:'个'},{name:'番茄',amount:1,unit:'个'},{name:'菠菜',amount:50,unit:'g'}],reason:'家常做法，蛋白质够、味道也清淡',steps:["备菜：番茄切片，菠菜洗净切段，鸡蛋打散。","摊蛋：热锅倒蛋液摊成蛋饼。","收汁：加入番茄和菠菜略炒至熟。"]},
  {id:'sr_sweet_potato_egg',title:'蒸红薯配水煮蛋',mealType:'breakfast',calories:310,protein:15,carbs:42,fat:8,fiber:5,cookTime:15,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['蒸锅','电饭煲'],tags:['breakfast','chinese_home','light','easy'],ingredients:[{name:'红薯',amount:150,unit:'g'},{name:'鸡蛋',amount:2,unit:'个'}],reason:'碳水来得稳，蛋白质也能补上',steps:["蒸红薯：红薯切块上锅蒸约 12 分钟。","煮蛋：同时水煮鸡蛋 8 分钟。","装盘：去壳切开，配红薯一起吃。"]},
  {id:'sr_apple_oat',title:'苹果燕麦碗',mealType:'breakfast',calories:250,protein:8,carbs:44,fat:6,fiber:6,cookTime:5,difficulty:'简单',noCook:true,allergens:['小麦'],appliances:[],tags:['breakfast','vegetarian','light','easy','no_cook'],ingredients:[{name:'燕麦',amount:35,unit:'g'},{name:'苹果',amount:0.5,unit:'个'},{name:'原味坚果',amount:8,unit:'g'}],reason:'不用开火，纤维也够',steps:["泡燕麦：燕麦用温水或牛奶浸泡至软。","切苹果：苹果切小块。","拌匀：加入坚果拌匀即可。"]},
  {id:'sr_veggie_congee',title:'蔬菜豆腐粥',mealType:'breakfast',calories:240,protein:11,carbs:36,fat:5,fiber:3,cookTime:20,difficulty:'简单',noCook:false,allergens:['大豆'],appliances:['电饭煲'],tags:['breakfast','vegetarian','light','chinese_home'],ingredients:[{name:'米饭',amount:80,unit:'g'},{name:'嫩豆腐',amount:100,unit:'g'},{name:'青菜',amount:80,unit:'g'}],reason:'清淡好消化，适合想吃热食的早上',steps:["煮粥：米饭加水煮至软烂。","加豆腐：嫩豆腐撕小块下锅。","加青菜：青菜切段煮 1 分钟即可。"]},
  {id:'sr_cucumber_egg',title:'黄瓜炒蛋配馒头',mealType:'breakfast',calories:330,protein:16,carbs:38,fat:12,fiber:3,cookTime:10,difficulty:'简单',noCook:false,allergens:['鸡蛋','小麦'],appliances:['炒锅'],tags:['breakfast','chinese_home','easy'],ingredients:[{name:'鸡蛋',amount:2,unit:'个'},{name:'黄瓜',amount:100,unit:'g'},{name:'馒头',amount:1,unit:'个'}],reason:'家常早餐，十来分钟能出锅',steps:["备菜：黄瓜切片，鸡蛋打散。","炒蛋：热锅炒蛋至凝固。","出锅：加入黄瓜快炒，配馒头食用。"]},
  {id:'sr_chicken_salad',title:'鸡胸蔬菜沙拉',mealType:'lunch',calories:380,protein:35,carbs:18,fat:16,fiber:5,cookTime:10,difficulty:'简单',noCook:false,allergens:[],appliances:[],tags:['lunch','high_protein','light','easy'],ingredients:[{name:'即食鸡胸肉',amount:120,unit:'g'},{name:'生菜',amount:80,unit:'g'},{name:'番茄',amount:1,unit:'个'},{name:'黄瓜',amount:80,unit:'g'}],reason:'蛋白质高、准备快，适合减脂午餐',steps:["备菜：生菜、黄瓜、番茄洗净切好。","切鸡胸：即食鸡胸撕成条。","拌匀：全部混合，可少许调味。"]},
  {id:'sr_tomato_egg_rice',title:'番茄炒蛋盖饭',mealType:'lunch',calories:460,protein:20,carbs:62,fat:14,fiber:3,cookTime:15,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['炒锅'],tags:['lunch','chinese_home','easy'],ingredients:[{name:'鸡蛋',amount:2,unit:'个'},{name:'番茄',amount:2,unit:'个'},{name:'米饭',amount:150,unit:'g'}],reason:'最省事的家常一餐，热量也明确',steps:["备菜：番茄切块，鸡蛋打散。","炒蛋：先炒蛋盛出。","盖饭：番茄炒出汁后回锅炒蛋，浇在米饭上。"]},
  {id:'sr_shrimp_broccoli',title:'清炒虾仁西兰花',mealType:'lunch',calories:320,protein:28,carbs:12,fat:12,fiber:4,cookTime:12,difficulty:'简单',noCook:false,allergens:['虾蟹'],appliances:['炒锅'],tags:['lunch','high_protein','light','chinese_home','easy'],ingredients:[{name:'虾仁',amount:120,unit:'g'},{name:'西兰花',amount:150,unit:'g'},{name:'蒜',amount:2,unit:'瓣'}],reason:'低脂高蛋白，适合还想补蛋白质的午餐',steps:["焯菜：西兰花焯水，虾仁洗净沥干。","爆香：蒜末下锅爆香。","快炒：下虾仁和西兰花炒至虾仁变色。"]},
  {id:'sr_tofu_veggie_rice',title:'家常豆腐青菜饭',mealType:'lunch',calories:420,protein:18,carbs:58,fat:12,fiber:6,cookTime:18,difficulty:'简单',noCook:false,allergens:['大豆'],appliances:['炒锅'],tags:['lunch','vegetarian','chinese_home','light'],ingredients:[{name:'豆腐',amount:150,unit:'g'},{name:'青菜',amount:120,unit:'g'},{name:'米饭',amount:150,unit:'g'}],reason:'素食也能吃饱，做法不复杂',steps:["备菜：豆腐切块，青菜洗净。","煎豆腐：豆腐两面煎至微黄。","配饭：下青菜快炒，配米饭食用。"]},
  {id:'sr_steamed_fish',title:'清蒸鲈鱼配时蔬',mealType:'lunch',calories:350,protein:32,carbs:10,fat:16,fiber:3,cookTime:20,difficulty:'中等',noCook:false,allergens:['鱼'],appliances:['蒸锅'],tags:['lunch','high_protein','light','chinese_home'],ingredients:[{name:'鲈鱼',amount:150,unit:'g'},{name:'青菜',amount:120,unit:'g'},{name:'姜',amount:6,unit:'g'}],reason:'清淡高蛋白，适合想吃正经正餐的时候',steps:["处理鱼：鲈鱼洗净，姜片铺在鱼上。","清蒸：上锅蒸约 10-12 分钟。","配菜：同时焯或蒸青菜一起上桌。"]},
  {id:'sr_chicken_potato',title:'烤鸡胸配红薯',mealType:'lunch',calories:430,protein:36,carbs:42,fat:10,fiber:5,cookTime:25,difficulty:'简单',noCook:false,allergens:[],appliances:['烤箱','空气炸锅'],tags:['lunch','high_protein','light'],ingredients:[{name:'鸡胸肉',amount:130,unit:'g'},{name:'红薯',amount:150,unit:'g'},{name:'西兰花',amount:80,unit:'g'}],reason:'蛋白和碳水都补得到，适合训练日午餐',steps:["备料：鸡胸切条，红薯切块，西兰花掰小朵。","烘烤：鸡胸和红薯入烤箱或空气炸锅烤熟。","配菜：西兰花焯水后一起装盘。"]},
  {id:'sr_veggie_fried_rice',title:'杂蔬蛋炒饭',mealType:'lunch',calories:440,protein:16,carbs:64,fat:12,fiber:4,cookTime:15,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['炒锅'],tags:['lunch','chinese_home','easy'],ingredients:[{name:'米饭',amount:180,unit:'g'},{name:'鸡蛋',amount:1,unit:'个'},{name:'胡萝卜',amount:40,unit:'g'},{name:'青豆',amount:30,unit:'g'}],reason:'剩饭也能做成一餐，15分钟内能好',steps:["备菜：胡萝卜丁、青豆备好，鸡蛋打散。","炒蛋：热锅炒蛋盛出。","炒饭：下米饭和蔬菜炒匀，再回锅炒蛋。"]},
  {id:'sr_steam_chicken_veg',title:'清蒸鸡胸时蔬',mealType:'dinner',calories:360,protein:38,carbs:12,fat:12,fiber:4,cookTime:20,difficulty:'简单',noCook:false,allergens:[],appliances:['蒸锅'],tags:['dinner','high_protein','light','chinese_home'],ingredients:[{name:'鸡胸肉',amount:140,unit:'g'},{name:'西兰花',amount:120,unit:'g'},{name:'胡萝卜',amount:40,unit:'g'}],reason:'晚餐清淡高蛋白，不容易吃撑',steps:["切配：鸡胸切片，西兰花和胡萝卜切好。","清蒸：一起上锅蒸约 12-15 分钟。","调味：出锅后少量调味即可。"]},
  {id:'sr_tomato_beef',title:'番茄瘦牛肉煲',mealType:'dinner',calories:440,protein:32,carbs:22,fat:20,fiber:4,cookTime:30,difficulty:'中等',noCook:false,allergens:[],appliances:['炒锅'],tags:['dinner','high_protein','chinese_home'],ingredients:[{name:'瘦牛肉',amount:120,unit:'g'},{name:'番茄',amount:2,unit:'个'},{name:'洋葱',amount:0.5,unit:'个'}],reason:'家常热食，蛋白质和饱腹感都不错',steps:["备料：瘦牛肉切片，番茄和洋葱切块。","煸炒：先炒洋葱和牛肉至变色。","慢炖：下番茄煮至软烂入味。"]},
  {id:'sr_mushroom_tofu',title:'香菇豆腐煲',mealType:'dinner',calories:300,protein:18,carbs:22,fat:14,fiber:5,cookTime:20,difficulty:'简单',noCook:false,allergens:['大豆'],appliances:['炒锅'],tags:['dinner','vegetarian','chinese_home','light'],ingredients:[{name:'豆腐',amount:180,unit:'g'},{name:'香菇',amount:80,unit:'g'},{name:'青菜',amount:80,unit:'g'}],reason:'素食晚餐，热量更克制',steps:["备菜：豆腐切块，香菇切片，青菜洗净。","煮汤：香菇下锅炒香后加水。","收锅：下豆腐和青菜煮 3-5 分钟。"]},
  {id:'sr_shrimp_noodle',title:'虾仁蔬菜汤面',mealType:'dinner',calories:390,protein:24,carbs:48,fat:8,fiber:4,cookTime:15,difficulty:'简单',noCook:false,allergens:['虾蟹','小麦'],appliances:['炒锅'],tags:['dinner','chinese_home','easy','light'],ingredients:[{name:'面条',amount:80,unit:'g'},{name:'虾仁',amount:80,unit:'g'},{name:'青菜',amount:100,unit:'g'}],reason:'一碗就能吃完，适合想吃热汤面的晚上',steps:["煮面：面条下锅煮至刚熟，捞出备用。","焯虾：虾仁洗净焯至变色。","组汤：青菜下汤煮软，加入面条和虾仁即可。"]},
  {id:'sr_grilled_fish',title:'香煎鱼配沙拉',mealType:'dinner',calories:360,protein:30,carbs:14,fat:18,fiber:4,cookTime:15,difficulty:'简单',noCook:false,allergens:['鱼'],appliances:['炒锅'],tags:['dinner','high_protein','light','easy'],ingredients:[{name:'鱼柳',amount:140,unit:'g'},{name:'生菜',amount:80,unit:'g'},{name:'番茄',amount:1,unit:'个'}],reason:'15分钟能做好，蛋白质也够晚餐用',steps:["备沙拉：生菜和番茄洗净切好。","煎鱼：鱼柳两面煎至金黄熟透。","装盘：鱼配沙拉一起上桌。"]},
  {id:'sr_cabbage_pork',title:'白菜瘦肉卷',mealType:'dinner',calories:340,protein:26,carbs:16,fat:16,fiber:4,cookTime:25,difficulty:'中等',noCook:false,allergens:[],appliances:['蒸锅','炒锅'],tags:['dinner','chinese_home','light'],ingredients:[{name:'瘦猪肉',amount:100,unit:'g'},{name:'白菜',amount:200,unit:'g'},{name:'姜',amount:4,unit:'g'}],reason:'菜多肉少，适合想吃热食又想控热量的晚餐',steps:["备馅：瘦猪肉剁碎，加姜末拌匀。","包卷：白菜叶焯软，卷入肉馅。","蒸熟：上锅蒸约 12 分钟即可。"]},
  {id:'sr_eggplant_chicken',title:'蒜香鸡丁配青椒',mealType:'dinner',calories:400,protein:34,carbs:16,fat:18,fiber:4,cookTime:15,difficulty:'简单',noCook:false,allergens:[],appliances:['炒锅'],tags:['dinner','high_protein','chinese_home','easy'],ingredients:[{name:'鸡胸肉',amount:130,unit:'g'},{name:'青椒',amount:100,unit:'g'},{name:'蒜',amount:3,unit:'瓣'}],reason:'家常快炒，蛋白质高、不拖时间',steps:["切配：鸡胸切丁，青椒切块，蒜切末。","炒鸡：鸡丁下锅炒至变色。","快炒：下蒜和青椒炒匀出锅。"]},
  {id:'sr_tomato_egg_drop',title:'番茄蛋花汤配米饭',mealType:'dinner',calories:380,protein:16,carbs:58,fat:8,fiber:3,cookTime:12,difficulty:'简单',noCook:false,allergens:['鸡蛋'],appliances:['炒锅'],tags:['dinner','chinese_home','light','easy'],ingredients:[{name:'番茄',amount:2,unit:'个'},{name:'鸡蛋',amount:1,unit:'个'},{name:'米饭',amount:150,unit:'g'}],reason:'特别省事的清淡晚饭',steps:["备菜：番茄切块，鸡蛋打散。","煮汤：番茄炒出汁后加水煮开。","蛋花：淋入蛋液成蛋花，配米饭食用。"]},
  {id:'sr_yogurt_cup',title:'希腊酸奶杯',mealType:'snack',calories:150,protein:15,carbs:10,fat:4,fiber:0,cookTime:0,difficulty:'简单',noCook:true,allergens:['牛奶'],appliances:[],tags:['snack','high_protein','no_cook','easy','light'],ingredients:[{name:'希腊酸奶',amount:150,unit:'g'}],reason:'开杯即吃，适合补一点蛋白质',steps:["开杯：打开希腊酸奶。","即可食用：无需加热，直接食用。"]},
  {id:'sr_apple',title:'切片苹果',mealType:'snack',calories:104,protein:0.5,carbs:28,fat:0.3,fiber:5,cookTime:0,difficulty:'简单',noCook:true,allergens:[],appliances:[],tags:['snack','vegetarian','no_cook','light','easy','fruit'],ingredients:[{name:'苹果',amount:1,unit:'个'}],reason:'几乎不用准备，适合热量不多时加餐',steps:["清洗：苹果洗净。","切片：去核切片即可食用。"]},
  {id:'sr_edamame',title:'水煮毛豆',mealType:'snack',calories:131,protein:13,carbs:10,fat:5,fiber:5,cookTime:5,difficulty:'简单',noCook:false,allergens:['大豆'],appliances:[],tags:['snack','vegetarian','high_protein','easy','light'],ingredients:[{name:'毛豆',amount:100,unit:'g'}],reason:'加餐也能补蛋白，准备很快',steps:["清洗：毛豆洗净。","水煮：冷水下锅煮 4-5 分钟。","沥干：捞出沥干，可略撒盐。"]},
  {id:'sr_corn',title:'煮玉米',mealType:'snack',calories:112,protein:4,carbs:25,fat:1,fiber:2,cookTime:8,difficulty:'简单',noCook:false,allergens:[],appliances:[],tags:['snack','vegetarian','easy','light'],ingredients:[{name:'玉米',amount:1,unit:'根'}],reason:'简单补碳水，不容易做成大餐',steps:["清洗：玉米洗净。","水煮：冷水下锅煮 8 分钟左右。","食用：沥干后趁热吃。"]},
  {id:'sr_nuts',title:'原味坚果一小把',mealType:'snack',calories:91,protein:3,carbs:4,fat:8,fiber:1,cookTime:0,difficulty:'简单',noCook:true,allergens:['坚果'],appliances:[],tags:['snack','no_cook','easy'],ingredients:[{name:'原味坚果',amount:15,unit:'g'}],reason:'一小把就够，适合脂肪还差一点时',steps:["取量：取出一小把原味坚果。","直接食用：无需加热。"]},
  {id:'sr_ready_chicken',title:'即食鸡胸小切',mealType:'snack',calories:120,protein:23,carbs:2,fat:2,fiber:0,cookTime:0,difficulty:'简单',noCook:true,allergens:[],appliances:[],tags:['snack','high_protein','no_cook','easy','light'],ingredients:[{name:'即食鸡胸肉',amount:100,unit:'g'}],reason:'不用做饭，蛋白质补得最快',steps:["开袋：打开即食鸡胸。","切块：切成小块即可食用。"]},
  {id:'sr_orange',title:'鲜橙',mealType:'snack',calories:94,protein:2,carbs:21,fat:0.4,fiber:4,cookTime:0,difficulty:'简单',noCook:true,allergens:[],appliances:[],tags:['snack','vegetarian','no_cook','light','easy','fruit'],ingredients:[{name:'橙子',amount:1,unit:'个'}],reason:'清爽加餐，热量占用很少',steps:["清洗：橙子洗净。","剥皮：剥开后直接食用。"]},
  {id:'sr_cucumber_tofu',title:'凉拌黄瓜豆腐',mealType:'snack',calories:140,protein:10,carbs:8,fat:7,fiber:2,cookTime:8,difficulty:'简单',noCook:true,allergens:['大豆'],appliances:[],tags:['snack','vegetarian','light','chinese_home','easy','no_cook'],ingredients:[{name:'嫩豆腐',amount:150,unit:'g'},{name:'黄瓜',amount:100,unit:'g'}],reason:'不用开火，清淡也能当加餐',steps:["备菜：黄瓜切片，嫩豆腐切块。","拌匀：少量调味拌匀。","即可食用：不用开火。"]}
];
  }
  return _SMART_RECIPE_LIBRARY_CACHE;
}
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
function normalizeSmartRecipeStepText(step){
  if(typeof step==='string') return step.trim();
  if(step&&typeof step==='object'){
    const title=String(step.title||step.name||'').trim();
    const desc=String(step.description||step.text||step.detail||step.content||'').trim();
    if(title&&desc) return `${title}：${desc}`;
    return title||desc;
  }
  return '';
}
function normalizeSmartRecipeForUI(raw,source='local'){
  if(!raw||typeof raw!=='object') return null;
  const nutrition=getSmartRecipeNutrition(raw);
  const ingredients=(Array.isArray(raw.ingredients)?raw.ingredients:[]).map(item=>{
    if(typeof item==='string') return {name:item,amount:'',unit:''};
    return {name:String(item?.name||item?.food||'').trim(),amount:item?.amount??'',unit:String(item?.unit||'')};
  }).filter(item=>item.name);
  if(!String(raw.title||'').trim()) return null;
  const recipe={
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
    steps:(Array.isArray(raw.steps)?raw.steps:[]).map(normalizeSmartRecipeStepText).filter(Boolean),
    cookTime:Math.max(0,Math.round(Number(raw.cookTime)||0)),
    difficulty:String(raw.difficulty||'简单').trim()||'简单',
    tags:Array.isArray(raw.tags)?raw.tags.map(tag=>String(tag||'').trim()).filter(Boolean):[],
    noCook:!!raw.noCook,
    adjustment:String(raw.adjustment||'').trim(),
    source:raw.source||source
  };
  return recipe;
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
  const calDisplay=getDailyCalorieDisplayContext(profile,date);
  const goal=getHealthGoal(profile);
  const gaps=getSmartRecipeMacroGaps(snap,cs);
  return {
    date,
    meal:getSmartRecipeCurrentMeal(),
    goalType:goal?.type||'maintain',
    goalTitle:goal?.title||'',
    remainingKcal:calDisplay.hasTarget?calDisplay.remainingCalories:null,
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
  return readMemoizedLocalJson(AI_SMART_RECIPE_CACHE_KEY);
}
function saveSmartRecipeAICache(cache){
  writeMemoizedLocalJson(AI_SMART_RECIPE_CACHE_KEY,cache||{});
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
    steps:Array.isArray(raw.steps)?raw.steps.map(normalizeSmartRecipeStepText).filter(Boolean):[],
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
      const itemUnit=normalizeMeasureUnit(item?.unit||'');
      const isDirectUnit=FOOD_RECORD_MEASURE_UNITS.includes(itemUnit);
      const directAmount=Number(item?.amount);
      const unit=isDirectUnit?itemUnit:local.unit;
      const amount=isDirectUnit&&directAmount>0
        ?(isDiscreteFoodMeasureUnit(unit)?Math.max(1,Math.round(directAmount)):directAmount)
        :local.amount;
      return prepareFoodPortion({
        ...local,
        name,
        unit,
        amount,
        referenceAmount:grams,
        referenceUnit:itemUnit==='ml'?'ml':'g',
        referenceMode:'manual',
        measureModelVersion:2,
        source:'recipe',
        source_unit:unit
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
      referenceAmount:grams,
      referenceUnit:'g',
      measureModelVersion:2,
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
  if(typeof openFoodSubPage!=='function'){
    showToast('无法打开记录确认页','error');
    return;
  }
  openFoodSubPage(typeof FOOD_SUBPAGE_IDS!=='undefined'?FOOD_SUBPAGE_IDS.SEARCH:'food_search','记录这餐',{
    render(shell){renderFoodDraftShell(shell);}
  });
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
  if(smartRecipeContext?.mode==='protein-gap'||smartRecipeContext?.mode==='nutrition-gap') smartRecipePickIndex=0;
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
  srGalleryRuntime=null;
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
  const display=cs&&cs.remainingCalories!==undefined&&cs.status&&!('intakeRemainingKcal' in cs)
    ?cs
    :getDailyCalorieDisplayContextFromStatus(cs||{});
  const remaining=display.hasTarget?Math.max(0,Math.round(Number(display.remainingCalories)||0)):null;
  return {
    calories:remaining,
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
  const lib=getSmartRecipeLibraryData();
  return Array.isArray(lib)?lib.slice():[];
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
function getSmartRecipeRecommendMode(profile,date=currentViewDate){
  const meal=getSmartRecipeCurrentMeal();
  const mealStatus=getSmartRecipeMealStatus(profile,date);
  const current=mealStatus.find(item=>item.key===meal);
  const recorded=!!current?.recorded;
  // 当前餐次未记录 → 餐次推荐；已记录 → 营养补缺
  if(!recorded) return {mode:'meal',meal,recorded:false};
  return {mode:'gap',meal,recorded:true};
}
function scoreSmartRecipeCandidate(recipe,ctx){
  const calories=Number(recipe.calories)||0;
  const remaining=ctx.remaining;
  const mealType=recipe.mealType;
  const current=ctx.meal;
  const mode=ctx.recommendMode==='gap'?'gap':'meal';
  if(ctx.hasTarget&&remaining>0&&remaining<100&&calories>remaining) return {score:-Infinity};
  if(ctx.hasTarget&&remaining>=100&&calories>remaining*1.2) return {score:-Infinity};
  if(ctx.hasTarget&&remaining<=0&&calories>130) return {score:-Infinity};

  // 餐次推荐：只允许当前餐次菜谱（正餐不含加餐）
  if(mode==='meal'){
    if(current==='breakfast'||current==='lunch'||current==='dinner'){
      if(mealType!==current) return {score:-Infinity};
    }else if(current==='snack'){
      if(mealType!=='snack') return {score:-Infinity};
    }
  }

  let score=0;
  const mealMatch=mealType===current;
  const proteinGap=Math.max(0,Number(ctx.gaps.protein)||0);
  const carbsGap=Math.max(0,Number(ctx.gaps.carbs)||0);
  const fatGap=Math.max(0,Number(ctx.gaps.fat)||0);
  const cookTime=Number(recipe.cookTime)||0;
  const easy=!!(recipe.noCook||cookTime<=10||ctx.effort==='easy');
  let calFit=false;

  if(mode==='meal'){
    // 权重：当前餐次匹配 > 营养匹配 > 省事程度
    score+=220;
    let macroScore=0;
    macroScore+=Math.min(Number(recipe.protein)||0,proteinGap)*0.9;
    macroScore+=Math.min(Number(recipe.carbs)||0,carbsGap)*0.45;
    macroScore+=Math.min(Number(recipe.fat)||0,fatGap)*0.55;
    if(ctx.macroHint==='protein'&&(recipe.tags?.includes('high_protein')||Number(recipe.protein)>=18)) macroScore+=8;
    if(ctx.macroHint==='carbs'&&Number(recipe.carbs)>=20) macroScore+=5;
    if(ctx.macroHint==='fat'&&Number(recipe.fat)>=8) macroScore+=4;
    score+=Math.min(36,macroScore);
    if(ctx.hasTarget&&remaining>0){
      const ratio=calories/Math.max(1,remaining);
      if(ratio>=0.25&&ratio<=0.7){score+=18;calFit=true;}
      else if(ratio<=1){score+=8;calFit=true;}
    }
    if(recipe.noCook) score+=8;
    score-=cookTime*0.08;
    if(ctx.effort==='easy'&&cookTime<=15) score+=10;
    if(ctx.goalType==='fat_loss'&&(recipe.tags?.includes('light')||recipe.tags?.includes('high_protein'))) score+=6;
    if(ctx.goalType==='muscle_gain'&&recipe.tags?.includes('high_protein')) score+=6;
  }else{
    // 补缺模式：营养缺口 > 热量空间 > 方便程度
    let macroScore=0;
    macroScore+=Math.min(Number(recipe.protein)||0,proteinGap)*2.4;
    macroScore+=Math.min(Number(recipe.carbs)||0,carbsGap)*1.2;
    macroScore+=Math.min(Number(recipe.fat)||0,fatGap)*1.4;
    if(ctx.macroHint==='protein'&&(recipe.tags?.includes('high_protein')||Number(recipe.protein)>=18)) macroScore+=24;
    if(ctx.macroHint==='carbs'&&Number(recipe.carbs)>=20) macroScore+=16;
    if(ctx.macroHint==='fat'&&Number(recipe.fat)>=8) macroScore+=14;
    if(smartRecipeContext?.mode==='protein-gap'&&(recipe.tags?.includes('high_protein')||Number(recipe.protein)>=18)) macroScore+=20;
    if(smartRecipeContext?.mode==='nutrition-gap'){
      const t=smartRecipeContext.target;
      if(t==='protein'&&(recipe.tags?.includes('high_protein')||Number(recipe.protein)>=18)) macroScore+=18;
      else if(t==='carbs'&&(Number(recipe.carbs)||0)>=20) macroScore+=14;
      else if(t==='fat'&&(Number(recipe.fat)||0)>=10) macroScore+=12;
    }
    score+=macroScore;
    if(ctx.hasTarget){
      if(remaining<=0){
        if(calories<=130){score+=40;calFit=true;}
        else score-=20;
      }else{
        const ratio=calories/Math.max(1,remaining);
        if(ratio>=0.08&&ratio<=0.45){score+=36;calFit=true;}
        else if(ratio<=0.7){score+=20;calFit=true;}
        else if(ratio<=1){score+=8;calFit=true;}
        else score-=16;
      }
    }
    if(recipe.noCook) score+=16;
    score-=cookTime*0.15;
    if(ctx.effort==='easy'&&cookTime<=10) score+=12;
    if(mealType==='snack') score+=10;
    else if(mealMatch) score+=4;
    if(ctx.mealPattern==='3_meals'&&mealType==='snack') score-=6;
  }
  return {score,mealMatch,calFit,easy,recommendMode:mode};
}
function buildSmartRecipeRecommendations(profile,date=currentViewDate,snap,cs){
  if(!profile) return [];
  const healthSnap=snap||getHealthScoreData(profile,date);
  const calorieStatus=cs||getDailyCalorieStatus(profile,date);
  const calDisplay=getDailyCalorieDisplayContext(profile,date);
  const preferences=getRecipePreferences(profile);
  const goal=getHealthGoal(profile);
  const modeInfo=getSmartRecipeRecommendMode(profile,date);
  const meal=modeInfo.meal;
  const mealStatus=getSmartRecipeMealStatus(profile,date);
  const gaps=getSmartRecipeMacroGaps(healthSnap,calorieStatus);
  const allergies=(preferences.allergies||[]).map(String);
  const dislikes=(preferences.dislikes||[]).map(String);
  const unrecordedMeals=mealStatus.filter(item=>!item.recorded).map(item=>item.key);
  const ctx={
    meal,
    recommendMode:modeInfo.mode,
    unrecordedMeals,
    gaps,
    remaining:calDisplay.hasTarget?calDisplay.remainingCalories:null,
    hasTarget:!!calDisplay.hasTarget,
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
    if(modeInfo.mode==='meal'){
      if((meal==='breakfast'||meal==='lunch'||meal==='dinner')&&recipe.mealType!==meal) return;
      if(meal==='snack'&&recipe.mealType!=='snack') return;
    }
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
      recommendMode:modeInfo.mode,
      recommendMeal:meal,
      reason:buildSmartRecipeRecommendationReason(recipe,{...ctx,...scored})
    });
  });
  if(modeInfo.mode==='meal'){
    ranked.sort((a,b)=>b.score-a.score||a.calories-b.calories);
  }else{
    ranked.sort((a,b)=>{
      const aProt=Number(a.protein)||0;
      const bProt=Number(b.protein)||0;
      if(ctx.macroHint==='protein'&&aProt!==bProt) return bProt-aProt;
      return b.score-a.score||a.calories-b.calories;
    });
  }
  const list=ranked.slice(0,8);
  list.recommendMode=modeInfo.mode;
  list.recommendMeal=meal;
  return list;
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
function formatSmartRecipeSteps(recipe){
  return (Array.isArray(recipe?.steps)?recipe.steps:[]).map((step,idx)=>{
    const text=normalizeSmartRecipeStepText(step);
    if(!text) return null;
    const split=text.match(/^([^：:]{1,16})[：:]\s*(.+)$/);
    if(split) return {title:split[1].trim(),description:split[2].trim()};
    return {title:`步骤 ${idx+1}`,description:text};
  }).filter(item=>item&&(item.title||item.description));
}
function renderSmartRecipeMethodSection(recipe){
  const steps=formatSmartRecipeSteps(recipe);
  const body=steps.length
    ? `<div class="sr-method-list">${steps.map((step,i)=>`
        <div class="sr-method-item">
          <div class="sr-method-num">${i+1}</div>
          <div class="sr-method-body">
            <div class="sr-method-title">${escapeHTML(step.title)}</div>
            ${step.description?`<div class="sr-method-desc">${escapeHTML(step.description)}</div>`:''}
          </div>
        </div>`).join('')}</div>`
    : `<div class="sr-method-empty">暂无详细步骤</div>`;
  return `<section class="sub-page-section"><div class="sub-page-section-title">${icon('utensils')} 做法</div>${body}</section>`;
}
function renderSmartRecipeRecommendationCard(pick,total,options={}){
  if(!pick) return '';
  const recipe=normalizeSmartRecipeForUI(pick,pick.source||'local');
  if(!recipe) return '';
  const p=getActiveProfile();
  const recommendMode=options.recommendMode||pick.recommendMode||'meal';
  const mealLabel=MEAL_LABELS[recipe.mealType]||'这顿';
  const cookLabel=recipe.noCook||(Number(recipe.cookTime)||0)<=0?'无需准备':`${recipe.cookTime}分钟`;
  const isHighProtein=!!(recipe.tags?.includes('high_protein')||Number(recipe.protein)>=18);
  let metaChips=[];
  if(recommendMode==='gap'){
    metaChips=[mealLabel];
    if(recipe.noCook||(Number(recipe.cookTime)||0)<=0) metaChips.push('无需准备');
    else metaChips.push(cookLabel);
    if(isHighProtein) metaChips.push('高蛋白');
    else metaChips.push(recipe.difficulty||'简单');
  }else{
    // 餐次推荐：主标签必须是正餐名，不显示「加餐」
    let mealTag=MEAL_LABELS[pick.recommendMeal||recipe.mealType]||mealLabel;
    if(mealTag==='加餐') mealTag=MEAL_LABELS[pick.recommendMeal]||'早餐';
    metaChips=[mealTag,cookLabel,recipe.difficulty||'简单'];
  }
  const canSwap=options.swap!==false&&Number(total)>1;
  const showSwap=options.swap!==false;
  const showRegen=!!options.regenerate;
  const fav=p?isFavoriteRecipe(p,recipe):false;
  const sourceAttr=escapeHTML(options.source||recipe.source||'local');
  const reasons=p?buildSmartRecipeRecommendationReasons(recipe,p,currentViewDate):[recipe.reason||'简单健康，适合当前状态'];
  const reasonHtml=reasons.length?`<div class="sr-recipe-section-label">推荐理由</div><div class="sr-reason-list">${reasons.map(r=>`<div class="sr-reason-item">${escapeHTML(r)}</div>`).join('')}</div>`:'';
  return `<div class="sr-recipe-card" data-sr-recipe-source="${sourceAttr}" data-sr-recommend-mode="${escapeHTML(recommendMode)}">
      <div class="sr-recipe-meta">
        ${metaChips.map((tag,i)=>`<span class="ds-chip ds-chip--sm${i===0?' active':''}">${escapeHTML(tag)}</span>`).join('')}
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
  return getSupplementFoodsData().slice();
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
  const modeInfo=getSmartRecipeRecommendMode(profile,date);
  const currentMeal=modeInfo.meal;
  const mealLabel=MEAL_LABELS[currentMeal]||'这顿';
  let recommendations=[];
  try{recommendations=buildSmartRecipeRecommendations(profile,date,snap,cs)}
  catch(err){console.error('[Render] buildSmartRecipeRecommendations failed:',err);recommendations=[]}
  const recommendMode=recommendations.recommendMode||modeInfo.mode||'meal';
  const pick=getSmartRecipeRecommendationPick(recommendations);
  const coreTitle=recommendMode==='gap'?'营养补充建议':`${mealLabel}推荐`;
  const calDisplay=getDailyCalorieDisplayContext(profile,date);
  const remaining=calDisplay.hasTarget?calDisplay.remainingCalories:'—';
  const emptyTitle=!calDisplay.hasTarget?'完善健康目标后可计算每日摄入建议':(calDisplay.overCalories>0||remaining===0?'今天的热量空间已经用完':(remaining<100?'今日剩余空间较少':'当前偏好下暂时没有合适的本地菜谱'));
  const emptyDesc=!calDisplay.hasTarget?'请先在设置中完善身体数据与健康目标。':(calDisplay.overCalories>0||remaining===0?'不建议为了凑一餐继续加码。可以先看看加餐，或明天再调整正餐。':(remaining<100?'热量空间有限，优先选择轻量加餐或小份菜谱。':'试试放宽忌口、做饭省事程度，或先记录一餐后再来看推荐。'));
  const linkCtx=smartRecipeContext||getSmartRecipeLinkContext(profile,date,snap,cs);
  const contextHint=linkCtx?.mode==='protein-gap'?'优先看高蛋白推荐':(linkCtx?.mode==='nutrition-gap'?'优先看适合补营养缺口的推荐':'');
  const contextBanner=linkCtx?.hint?`<div class="sr-goal-pill" style="margin-bottom:10px">${icon('target')} 来自今日建议 · ${escapeHTML(linkCtx.hint)}${contextHint?` · ${escapeHTML(contextHint)}`:''}</div>`:'';
  return `
    <section class="sub-page-section">
      <div class="sub-page-section-title">${icon('sparkles')} 今日推荐</div>
      ${contextBanner}
      <div class="sr-goal-pill">${icon('target')} 围绕「${escapeHTML(goal.title||'健康目标')}」 · 现在是${escapeHTML(mealLabel)}${recommendMode==='gap'?' · 本餐已记录':''}</div>
      <div class="sr-core-card">
        <div class="sr-core-title">${escapeHTML(coreTitle)}</div>
        <div class="sr-core-desc">今天还可以吃</div>
        <div class="sr-cal-hero">${remaining}<small>kcal</small></div>
      </div>
      ${pick?renderSmartRecipeRecommendationCard(pick,recommendations.length,{source:'today',swap:true,recommendMode}):`<div class="empty-state"><div class="empty-state__title">${escapeHTML(emptyTitle)}</div><div class="empty-state__desc">${escapeHTML(emptyDesc)}</div></div>`}
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
      <div class="sr-ing-add">
        <input type="text" id="srIngredientCustom" class="sr-ing-add-input" placeholder="补充食材，如：鸡蛋" autocomplete="off" enterkeyhint="done">
        <button type="button" class="sr-ing-add-btn" id="srIngredientAddBtn">添加</button>
      </div>
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
      <div class="sr-search-bar">
        <input type="search" class="sr-search-input" id="smartRecipeSearchInput" placeholder="搜菜名、食材或条件" autocomplete="off" enterkeyhint="search" value="${escapeHTML(smartRecipeSearchQuery)}">
        <button type="button" class="sr-search-submit" id="smartRecipeSearchBtn" aria-label="生成菜谱">${icon('sparkles')}<span>生成菜谱</span></button>
      </div>
      <div class="sr-search-hint">例如：番茄牛腩、高蛋白早餐、空气炸锅鸡胸、快手早餐</div>
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
    (ingItems.length?`<section class="sub-page-section"><div class="sub-page-section-title">${icon('bowl')} 食材</div><ul class="sr-detail-list">${ingItems.map(name=>`<li>${escapeHTML(name)}</li>`).join('')}</ul></section>`:'')+
    renderSmartRecipeMethodSection(recipe)+
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
  const response=await fetchWithTimeout(getApiUrl('/api/recipe-search'),{
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
  const response=await fetchWithTimeout(getApiUrl('/api/recipe-ingredients-photo'),{
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
  const response=await fetchWithTimeout(getApiUrl('/api/recipe-from-ingredients'),{
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
