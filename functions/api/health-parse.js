const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function parseAIJson(text) {
  if (!text) return null;
  const cleaned = String(text).replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
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

function normalizeDateTime(value, fallbackDateTime) {
  const text = String(value || '').trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(text)) return text;
  return fallbackDateTime;
}

function normalizeMeal(value) {
  const v = String(value || '').toLowerCase();
  if (['breakfast', 'lunch', 'dinner', 'snack'].includes(v)) return v;
  if (v.includes('早')) return 'breakfast';
  if (v.includes('午')) return 'lunch';
  if (v.includes('晚')) return 'dinner';
  return 'snack';
}

function normalizeQuality(value) {
  const v = String(value || '').toLowerCase();
  if (['good', 'normal', 'poor'].includes(v)) return v;
  if (v.includes('好')) return 'good';
  if (v.includes('差') || v.includes('不好')) return 'poor';
  return 'normal';
}

function normalizeEvents(events, fallbackDateTime) {
  if (!Array.isArray(events)) return [];
  return events.map((event) => {
    const type = String(event?.type || '').toLowerCase();
    const dateTime = normalizeDateTime(event?.dateTime, fallbackDateTime);
    if (type === 'weight') {
      return {
        type,
        dateTime,
        weight: Number(event.weight) || null,
        bodyFat: event.bodyFat === null || event.bodyFat === undefined ? null : Number(event.bodyFat),
        timeDefaulted: !!event.timeDefaulted,
      };
    }
    if (type === 'food') {
      return {
        type,
        dateTime,
        meal: normalizeMeal(event.meal),
        foods: Array.isArray(event.foods) ? event.foods.map((food) => ({
          name: String(food.name || '').trim(),
          amount: food.amount === null || food.amount === undefined ? null : Number(food.amount),
          unitText: String(food.unitText || '').trim(),
        })).filter((food) => food.name) : [],
        timeDefaulted: !!event.timeDefaulted,
      };
    }
    if (type === 'exercise') {
      return {
        type,
        dateTime,
        name: String(event.name || '').trim(),
        duration: Number(event.duration) || null,
        timeDefaulted: !!event.timeDefaulted,
      };
    }
    if (type === 'steps') {
      return {
        type,
        dateTime,
        steps: parseInt(event.steps, 10) || null,
        timeDefaulted: !!event.timeDefaulted,
      };
    }
    if (type === 'sleep') {
      return {
        type,
        dateTime,
        duration: Number(event.duration) || null,
        quality: normalizeQuality(event.quality),
        timeDefaulted: !!event.timeDefaulted,
      };
    }
    if (type === 'water') {
      return {
        type,
        dateTime,
        amount: event.amount === null || event.amount === undefined ? null : Math.round(Number(event.amount)) || null,
        needConfirm: !!event.needConfirm,
        timeDefaulted: !!event.timeDefaulted,
      };
    }
    return null;
  }).filter(Boolean);
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json().catch(() => ({}));
    const text = String(body.text || '').trim();
    const baseDate = String(body.baseDate || '').trim();
    const currentDateTime = String(body.currentDateTime || '').slice(0, 16);
    const fallbackDateTime = currentDateTime || `${baseDate || '2026-01-01'}T12:00`;

    if (text.length < 2) {
      return jsonResponse({ events: [], error: '请输入要解析的健康记录内容' }, 400);
    }

    const apiKey = context.env.DASHSCOPE_API_KEY || context.env.QWEN_API_KEY || context.env.BAILIAN_API_KEY;
    if (!apiKey) {
      return jsonResponse({ events: [], error: 'AI服务未配置' }, 500);
    }

    const model = context.env.DASHSCOPE_MODEL || context.env.QWEN_MODEL || 'qwen-plus';
    const prompt = `你是健康记录应用的自然语言结构化助手。你的任务只是把用户文本拆成健康事件数组，不要计算BMI、不要计算运动卡路里、不要估算食物营养、不要判断人物。

用户文本：
${text}

上下文：
baseDate=${baseDate}
currentDateTime=${currentDateTime}

必须遵守：
1. 只返回 JSON，不要 Markdown，不要解释。
2. 不要返回 profileId、我、伴侣、用户身份等字段；记录对象由前端决定。
3. 只提取用户明确表达或能够可靠理解的信息，不要虚构体重、步数、运动时长、睡眠时长、食物数量、饮水量。
4. 如果没有明确日期，默认使用 baseDate。
5. 如果没有明确时间，可以使用 currentDateTime 的时间，并设置 timeDefaulted:true。
6. 支持中文自然时间：今天、昨天、前天、昨晚、今早、上午、中午、下午、晚上、凌晨、7点半、7点20、七点二十分、8月8日、8月8号、2026年8月8日。
7. 食物事件只返回吃了什么、数量、单位和餐次；不要返回热量和营养。
8. 运动事件只返回运动名称和持续分钟数；不要返回卡路里和MET。
9. 睡眠 duration 使用分钟；quality 只能是 good、normal、poor，未提到质量默认 normal。
10. 如果一句话包含多条记录，必须拆成多条事件，例如早中晚三餐拆成三条 food，早晚两次运动拆成两条 exercise。
11. 饮水事件只返回喝水时间和饮水量 amount，单位统一为 ml；1L=1000ml，1.5升=1500ml，2000毫升=2000ml。
12. 如果用户只说“一杯水”“一大杯水”“半瓶水”“一瓶水”等无法可靠换算的表达，不要猜固定毫升，返回 amount:null, needConfirm:true。

事件格式：
{
  "events": [
    {"type":"weight","dateTime":"YYYY-MM-DDTHH:mm","weight":65.4,"bodyFat":null,"timeDefaulted":false},
    {"type":"food","dateTime":"YYYY-MM-DDTHH:mm","meal":"breakfast|lunch|dinner|snack","foods":[{"name":"鸡蛋","amount":2,"unitText":"个"}],"timeDefaulted":false},
    {"type":"exercise","dateTime":"YYYY-MM-DDTHH:mm","name":"跑步","duration":30,"timeDefaulted":false},
    {"type":"steps","dateTime":"YYYY-MM-DDTHH:mm","steps":8500,"timeDefaulted":false},
    {"type":"sleep","dateTime":"YYYY-MM-DDTHH:mm","duration":460,"quality":"good","timeDefaulted":false},
    {"type":"water","dateTime":"YYYY-MM-DDTHH:mm","amount":500,"needConfirm":false,"timeDefaulted":false}
  ]
}

餐次判断：
明确说早餐/早饭/早上吃 -> breakfast；午餐/中午吃 -> lunch；晚餐/晚饭/晚上吃饭 -> dinner；夜宵/加餐/零食或非正餐 -> snack。
如果只给时间：05:00-10:30 breakfast，10:31-14:00 lunch，17:00-21:00 dinner，其余 snack。`;

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
      return jsonResponse({ events: [], error: aiData?.error?.message || aiData?.message || 'AI解析失败' }, 502);
    }

    const content = aiData?.choices?.[0]?.message?.content;
    const parsed = typeof content === 'string' ? parseAIJson(content) : content;
    const events = normalizeEvents(parsed?.events, fallbackDateTime);
    return jsonResponse({ events });
  } catch (err) {
    return jsonResponse({ events: [], error: err?.message || 'AI解析暂时不可用' }, 500);
  }
}
