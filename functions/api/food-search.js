const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const FOOD_AI_VERSION = 'food-ai-estimate-v3';

const COMPLEX_FOOD_RULES = [
  {
    match: ['螺蛳粉', '螺蛤粉'],
    name: '螺蛳粉',
    unit: '1份（普通一份）',
    portionAmount: 500,
    portionUnit: 'g',
    estimateReason: '基于普通一份螺蛳粉估算，包含米粉、汤底、油包、腐竹等主要组成，实际热量受配料和油量影响。',
    cal: 650,
    min: 500,
    max: 850,
    carb: 85,
    pro: 18,
    fat: 25,
    fib: 5,
    confidence: 'medium',
  },
  { match: ['麻辣烫', '冒菜'], cal: 750, min: 550, max: 1000, carb: 55, pro: 28, fat: 45, fib: 8, confidence: 'medium', portionAmount: 600, portionUnit: 'g', estimateReason: '按常见一份麻辣烫估算，考虑汤底、丸类、肉菜和调味油，实际热量受选菜和油量影响。' },
  { match: ['火锅'], cal: 900, min: 650, max: 1300, carb: 50, pro: 40, fat: 60, fib: 8, confidence: 'low', portionAmount: 700, portionUnit: 'g', estimateReason: '火锅热量受锅底、蘸料和食材选择影响较大，该值按常见单人一餐估算。' },
  { match: ['炒饭', '蛋炒饭', '扬州炒饭'], cal: 620, min: 450, max: 850, carb: 80, pro: 18, fat: 24, fib: 3, confidence: 'medium', portionAmount: 350, portionUnit: 'g', estimateReason: '按常见一份炒饭估算，考虑米饭、鸡蛋、配菜和炒制用油，实际热量受油量影响。' },
  { match: ['炒面', '炒粉', '炒河粉'], cal: 650, min: 480, max: 900, carb: 85, pro: 18, fat: 26, fib: 4, confidence: 'medium', portionAmount: 350, portionUnit: 'g', estimateReason: '按常见一份炒制主食估算，热量主要来自面粉类主食和炒制用油。' },
  { match: ['炸鸡', '鸡排', '炸鸡排', '鸡柳', '炸鸡柳'], cal: 620, min: 450, max: 900, carb: 35, pro: 32, fat: 38, fib: 2, confidence: 'medium', portionAmount: 250, portionUnit: 'g', estimateReason: '该估算考虑油炸过程带来的额外脂肪，实际热量受裹粉厚度和份量影响。' },
  { match: ['汉堡', '鸡腿堡', '牛肉堡'], cal: 560, min: 420, max: 750, carb: 45, pro: 24, fat: 30, fib: 3, confidence: 'medium', portionAmount: 220, portionUnit: 'g', estimateReason: '按常见一个汉堡估算，包含面包、肉饼、酱料和配菜，实际热量受酱料和规格影响。' },
  { match: ['奶茶', '杨枝甘露', '生椰拿铁', '伯牙绝弦'], cal: 430, min: 250, max: 700, carb: 60, pro: 6, fat: 18, fib: 1, confidence: 'low', portionAmount: 500, portionUnit: 'ml', estimateReason: '按常规杯饮品估算，实际热量主要受糖量、奶底、配料和杯型大小影响。' },
  { match: ['盖浇饭', '饭套餐', '外卖套餐', '套餐'], cal: 780, min: 600, max: 1100, carb: 95, pro: 30, fat: 30, fib: 6, confidence: 'low', portionAmount: 600, portionUnit: 'g', estimateReason: '按常见外卖套餐估算，包含主食、菜肴和酱汁，实际热量受油量和配菜影响。' },
  { match: ['手抓饼', '鸡蛋灌饼', '煎饼果子', '烤冷面'], cal: 560, min: 420, max: 750, carb: 60, pro: 18, fat: 28, fib: 3, confidence: 'medium', portionAmount: 260, portionUnit: 'g', estimateReason: '按常见一份街边主食估算，考虑饼皮、鸡蛋、酱料和煎制用油。' },
  { match: ['酸辣粉', '米线', '米粉'], cal: 580, min: 430, max: 800, carb: 85, pro: 14, fat: 20, fib: 4, confidence: 'medium', portionAmount: 500, portionUnit: 'g', estimateReason: '按常见一碗粉类主食估算，包含粉、汤底、调味油和少量配菜。' },
  { match: ['烧烤', '炸串', '烤串'], cal: 700, min: 450, max: 1100, carb: 35, pro: 35, fat: 48, fib: 3, confidence: 'low', portionAmount: 300, portionUnit: 'g', estimateReason: '按常见一份烧烤或炸串估算，实际热量受肉类比例、刷油和调料影响较大。' },
];

const ESTIMATE_REASON_TEMPLATES = {
  composite: '该估算基于常见份量计算，实际热量会因油量、配料和制作方式变化。',
  fried: '该估算考虑油炸过程带来的额外脂肪，实际热量受裹粉和份量影响。',
  drink: '按常规杯饮品估算，实际热量主要受糖量、配料和杯型大小影响。',
  basic: '按常见食物营养数据估算，实际热量会因品牌和份量略有变化。',
};

function roundNumber(value, digits = 1) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return +n.toFixed(digits);
}

function parseExplicitAmount(query) {
  const text = String(query || '');
  const match = text.match(/(\d+(?:\.\d+)?)\s*(kg|公斤|千克|g|克|ml|毫升|l|升)/i);
  if (!match) return null;
  let amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  if (!Number.isFinite(amount) || amount <= 0) return null;
  if (unit === 'kg' || unit === '公斤' || unit === '千克') return { amount: Math.round(amount * 1000), unit: 'g' };
  if (unit === 'l' || unit === '升') return { amount: Math.round(amount * 1000), unit: 'ml' };
  return { amount: Math.round(amount), unit: unit === '克' ? 'g' : unit === '毫升' ? 'ml' : unit };
}

function findComplexFoodRule(query, name = '') {
  const text = `${query || ''} ${name || ''}`.toLowerCase();
  return COMPLEX_FOOD_RULES.find((rule) => rule.match.some((keyword) => text.includes(keyword.toLowerCase()))) || null;
}

function normalizeConfidence(value, fallback = 'medium') {
  const confidence = String(value || '').toLowerCase();
  return ['high', 'medium', 'low'].includes(confidence) ? confidence : fallback;
}

function clampReason(text, fallback) {
  const value = String(text || '').replace(/\s+/g, '').trim();
  const reason = value || fallback || ESTIMATE_REASON_TEMPLATES.composite;
  return reason.length > 80 ? `${reason.slice(0, 78)}…` : reason;
}

function formatAmount(amount, unit) {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return '';
  return `${Math.round(n)}${unit || 'g'}`;
}

function buildPortionText({ explicitAmount, portionAmount, portionUnit, fallback = '常见一份' }) {
  if (explicitAmount) return `按输入重量估算 · ${formatAmount(explicitAmount.amount, explicitAmount.unit)}`;
  if (portionAmount) {
    const unit = portionUnit || 'g';
    return `AI估算 · 常规份量（约${formatAmount(portionAmount, unit)}）`;
  }
  return `AI估算 · ${fallback}`;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function normalizeFood(data) {
  const src = data?.food || data;
  if (!src || src.found === false) return null;

  const name = String(src.name || src.foodName || '').trim();
  if (!name) return null;

  const toNumber = (value) => roundNumber(value);
  const calories = toNumber(src.estimatedCalories ?? src.cal ?? src.calories);
  const calorieMin = toNumber(src.calorieMin ?? src.caloriesMin ?? src.minCalories);
  const calorieMax = toNumber(src.calorieMax ?? src.caloriesMax ?? src.maxCalories);

  const portionAmount = toNumber(src.portionAmount ?? src.portion_amount ?? src.base_amount ?? src.baseAmount ?? src.base_weight);
  const portionUnit = String(src.portionUnit || src.portion_unit || (String(src.unit || '').toLowerCase().includes('ml') ? 'ml' : 'g')).trim() || 'g';
  const protein = toNumber(src.pro ?? src.protein);
  const carbs = toNumber(src.carb ?? src.carbs ?? src.carbohydrate);
  const fat = toNumber(src.fat);
  const fiber = toNumber(src.fib ?? src.fiber);

  return {
    name,
    source: 'ai',
    cat: 'AI估算',
    unit: String(src.unit || src.serving || src.portion || '份').trim() || '份',
    cal: calories,
    calories,
    estimatedCalories: calories,
    calorieMin: calorieMin || calories,
    calorieMax: calorieMax || calories,
    confidence: normalizeConfidence(src.confidence, calorieMin && calorieMax && calorieMin !== calorieMax ? 'medium' : 'high'),
    estimateReason: clampReason(src.estimateReason, ESTIMATE_REASON_TEMPLATES.composite),
    portionText: String(src.portionText || src.portion_text || '').trim(),
    portionAmount,
    portionUnit,
    carb: carbs,
    carbs,
    pro: protein,
    protein,
    fat,
    fib: fiber,
    fiber,
    base_amount: portionAmount,
    estimateVersion: FOOD_AI_VERSION,
    quantity: 1,
  };
}

function applyComplexFoodGuard(food, query) {
  if (!food) return null;
  const rule = findComplexFoodRule(query, food.name);
  if (!rule) {
    const portionAmount = Number(food.portionAmount || food.base_amount) || 0;
    const portionUnit = food.portionUnit || (String(food.unit || '').toLowerCase().includes('ml') ? 'ml' : 'g');
    return {
      ...food,
      source: 'ai',
      cat: 'AI估算',
      calories: food.cal,
      protein: food.pro,
      carbs: food.carb,
      fiber: food.fib,
      confidence: normalizeConfidence(food.confidence, 'medium'),
      calorieMin: food.calorieMin || food.cal,
      calorieMax: food.calorieMax || food.cal,
      estimatedCalories: food.estimatedCalories || food.cal,
      portionText: food.portionText || buildPortionText({ portionAmount, portionUnit }),
      estimateReason: clampReason(food.estimateReason, ESTIMATE_REASON_TEMPLATES.composite),
      estimateVersion: FOOD_AI_VERSION,
    };
  }

  const explicitAmount = parseExplicitAmount(query);
  const next = { ...food };
  const portionAmount = explicitAmount?.amount || rule.portionAmount || Number(next.portionAmount || next.base_amount) || 0;
  const portionUnit = explicitAmount?.unit || rule.portionUnit || next.portionUnit || 'g';
  const currentCalories = Number(next.estimatedCalories || next.cal) || 0;
  const guardedCalories = currentCalories < rule.min ? rule.cal : currentCalories;
  const min = Number(next.calorieMin) > 0 ? Math.max(Number(next.calorieMin), Math.round(rule.min * 0.9)) : rule.min;
  const max = Number(next.calorieMax) > 0 ? Math.max(Number(next.calorieMax), rule.max) : rule.max;

  next.name = next.name || rule.name || food.name;
  next.source = 'ai';
  next.cat = 'AI估算';
  next.unit = explicitAmount ? formatAmount(explicitAmount.amount, explicitAmount.unit) : `常规份量（约${formatAmount(portionAmount, portionUnit)}）`;
  next.cal = Math.round(guardedCalories || rule.cal);
  next.calories = next.cal;
  next.estimatedCalories = next.cal;
  next.calorieMin = Math.min(min, next.cal);
  next.calorieMax = Math.max(max, next.cal);
  next.confidence = normalizeConfidence(next.confidence, rule.confidence);
  next.carb = next.carb || rule.carb || 0;
  next.carbs = next.carb;
  next.pro = next.pro || rule.pro || 0;
  next.protein = next.pro;
  next.fat = next.fat || rule.fat || 0;
  next.fib = next.fib || rule.fib || 0;
  next.fiber = next.fib;
  next.portionAmount = portionAmount;
  next.portionUnit = portionUnit;
  next.base_amount = portionAmount || next.base_amount;
  next.portionText = buildPortionText({ explicitAmount, portionAmount, portionUnit });
  next.estimateReason = clampReason(next.estimateReason, rule.estimateReason || ESTIMATE_REASON_TEMPLATES.composite);
  next.estimateVersion = FOOD_AI_VERSION;

  return next;
}

function parseAIJson(text) {
  if (!text) return null;
  const cleaned = String(text)
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch (err) {
      return null;
    }
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json().catch(() => ({}));
    const query = String(body.query || '').trim();
    if (query.length < 2) {
      return jsonResponse({ found: false, error: '请输入更具体的食物名称' }, 400);
    }

    const apiKey = context.env.DASHSCOPE_API_KEY || context.env.QWEN_API_KEY || context.env.BAILIAN_API_KEY;
    if (!apiKey) {
      return jsonResponse({ found: false, error: 'AI服务未配置' }, 500);
    }

    const model = context.env.DASHSCOPE_MODEL || context.env.QWEN_MODEL || 'qwen-plus';
    const prompt = `你是健康饮食记录应用中的食物营养估算助手。

用户正在搜索食物：${query}

用户会输入中文食物名称，包括标准食品名称、家常菜、中餐、西餐、早餐、夜宵、烧烤、火锅、麻辣烫、街边小吃、快餐、便利店食品、零食、饮料、奶茶、咖啡、面包甜点、水果、熟食、半成品、预包装食品、连锁餐饮、品牌食品、地方特色食品、网络常用食品名称和口语化食品名称。

你的任务是尽可能识别该食物，并提供适合饮食记录使用的合理营养估算。这个功能用于帮助用户记录大致热量和营养素，不要求必须找到官方数据库或精确营养标签。

重要规则：
1. 只要能够判断用户输入大致属于什么食物，就必须返回结果。
2. 不要因为缺少品牌、精确重量、制作方法或官方营养标签而拒绝回答。
3. 如果没有精确数据，请根据中国大陆最常见做法、常见配方和常见标准份量进行估算。
4. 不要把复合食物简单等同为“主食名称 + 重量”。必须考虑食材组成、油脂、调味料、汤汁、配料和加工方式。
5. 在健康记录场景中，热量波动大的食物宁可轻微高估，不要长期低估。
6. 如果个别营养素无法确定，不要返回失败，该字段填 0。
7. 不要因为结果是“约”“估计”“常见份量”而返回失败；饮食记录允许估算。

识别优先级：
1. 明确品牌/具体产品且有常见数据：使用该产品常见数据。
2. 没有精确产品数据：按同类食品、常见配方和常见份量合理估算。
3. 普通菜肴：按中国大陆常见做法和常见一份重量估算。
4. 街边小吃、烧烤、炸串、夜宵：按常见单份或单串/单根重量估算。
5. 食物名称存在多个叫法：按中国大陆最常见含义理解。

基础食物处理：
米饭、鸡蛋、牛奶、玉米、鸡胸肉、苹果等基础食材可以按常见营养数据库估算，confidence 可为 high。

复杂食物处理：
螺蛳粉、麻辣烫、炒饭、炒面、火锅、炸鸡、汉堡、奶茶、盖浇饭、外卖套餐、手抓饼、煎饼果子、烤冷面、酸辣粉、烧烤、炸串等属于热量波动大的复合食物，confidence 通常为 medium 或 low，并必须给出 calorieMin 和 calorieMax。

例如螺蛳粉不能按普通米粉估算。应考虑米粉、辣油、腐竹、花生、酸笋、配菜和汤汁，一份常见螺蛳粉通常应落在 500-850 kcal 区间，中位估计约 650 kcal。

份量判断：
1. 如果能够判断常见份量，请返回 portionAmount 和 portionUnit，例如螺蛳粉约500g、米饭约150g、奶茶约500ml、鸡蛋约50g。
2. 如果用户明确输入 300g、400g、500g、500ml 等重量/容量，portionText 使用“按输入重量估算 · 400g”这类表达，并按输入重量估算。
3. 如果用户未输入重量但能判断常规份量，portionText 使用“AI估算 · 常规份量（约500g）”这类表达。
4. 如果确实无法判断重量，portionText 使用“AI估算 · 常见一份”。
5. 不要所有食物固定500g，不同食物必须使用不同常见份量。

解释文字：
1. 必须返回 estimateReason，不超过80个中文字符。
2. 面向普通用户，简洁说明为什么是这个热量、哪些因素会导致差异。
3. 不要医学化，不要长篇分析。
4. 示例：基于普通一份螺蛳粉估算，包含米粉、汤底、油包、腐竹等主要组成，实际热量受配料和油量影响。

需要主动理解中文口语和同义词，例如：
烤肠≈烤香肠/烤火腿肠类；火腿肠不要求具体品牌；可乐≈碳酸饮料；奶茶≈常见含奶茶饮；鸡柳≈常见鸡肉条；鸡排≈常见炸鸡排；烧烤五花≈烤五花肉；蛋炒饭≈鸡蛋炒饭；西红柿炒蛋≈番茄炒蛋；土豆≈马铃薯；地瓜≈红薯。

以下都属于明确食物，绝对不要返回 found:false，必须估算：
烤肠、烤火腿肠、烤香肠、淀粉肠、脆皮肠、台湾烤肠、鸡柳、炸鸡柳、手抓饼、鸡蛋灌饼、煎饼果子、烤冷面、肉夹馍、酸辣粉、麻辣烫、螺蛳粉、关东煮、鸡排、炸鸡排、炸串、烧烤五花肉、烤五花肉、奶茶、生椰拿铁、杨枝甘露、肉松面包、蛋黄酥、辣条、薯片、方便面、麦当劳板烧鸡腿堡、肯德基香辣鸡腿堡、霸王茶姬伯牙绝弦、瑞幸生椰拿铁。

只有以下情况才允许返回 found:false：
1. 输入明显不是食物。
2. 完全无法理解用户输入。
3. 输入是无意义乱码。
4. 无法判断出任何合理食品类别。

返回要求：
只允许返回 JSON，不要解释，不要 Markdown，不要代码块。

如果能识别或能合理估算，必须返回：
{"found":true,"name":"食物名称","source":"ai","unit":"常见标准份量","portionText":"AI估算 · 常规份量（约500g）","portionAmount":数字,"portionUnit":"g或ml","estimatedCalories":数字,"calories":数字,"calorieMin":数字,"calorieMax":数字,"confidence":"high|medium|low","estimateReason":"不超过80字的估算说明","cal":数字,"carb":数字,"carbs":数字,"pro":数字,"protein":数字,"fat":数字,"fib":数字,"fiber":数字}

字段规则：
name 必须是有效食物名称。
source 固定返回 "ai"。
unit 必须有值。用户未提供重量时，可以使用“常规份量（约500g）”或“常见一份”。
portionText 用于界面展示，必须符合“AI估算 · 常规份量（约500g）”“按输入重量估算 · 400g”“AI估算 · 常见一份”之一。
portionAmount 是估算份量数值，无法判断时可为 0；portionUnit 使用 g 或 ml。
estimatedCalories 是推荐用于展示的估算热量；cal 必须等于 estimatedCalories，用于兼容旧字段。
calories 必须等于 estimatedCalories。
calorieMin 和 calorieMax 是常见范围。基础食物可与 estimatedCalories 接近；复杂食物必须体现明显范围。
confidence 表示估算置信度：基础食物 high，常见复合食物 medium，配方差异大的外卖/火锅/麻辣烫/奶茶 low。
estimateReason 必须简洁，不超过80字。
cal、carb、carbs、pro、protein、fat、fib、fiber 必须是大于等于 0 的数字。
缺失或无法确定的营养素填 0。

只有真正无法判断为食物时，才返回：
{"found":false}`;

    const aiResponse = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      }),
    });

    const aiData = await aiResponse.json().catch(() => ({}));
    if (!aiResponse.ok) {
      return jsonResponse({ found: false, error: aiData?.error?.message || aiData?.message || 'AI请求失败' }, 502);
    }

    const content = aiData?.choices?.[0]?.message?.content;
    const parsed = typeof content === 'string' ? parseAIJson(content) : content;
    if (parsed?.found === false) {
      return jsonResponse({ found: false });
    }

    const food = applyComplexFoodGuard(normalizeFood(parsed), query);
    if (!food) {
      return jsonResponse({ found: false });
    }

    return jsonResponse({ found: true, food });
  } catch (err) {
    return jsonResponse({ found: false, error: err?.message || 'AI搜索暂时不可用' }, 500);
  }
}
