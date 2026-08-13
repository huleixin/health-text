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

function normalizeExercise(data) {
  const src = data?.exercise || data;
  if (!src || src.found === false) return null;

  const name = String(src.name || src.exerciseName || '').trim();
  const met = Number(src.met ?? src.MET);
  if (!name || !Number.isFinite(met) || met <= 0) return null;

  return {
    name,
    met: Math.round(met * 10) / 10,
    unit: '分钟',
    defaultVal: 30,
    inputType: 'time',
  };
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
      return jsonResponse({ found: false, error: '请输入更具体的运动名称' }, 400);
    }

    const apiKey = context.env.DASHSCOPE_API_KEY || context.env.QWEN_API_KEY || context.env.BAILIAN_API_KEY;
    if (!apiKey) {
      return jsonResponse({ found: false, error: 'AI服务未配置' }, 500);
    }

    const model = context.env.DASHSCOPE_MODEL || context.env.QWEN_MODEL || 'qwen-plus';
    const prompt = `你是健康运动记录应用中的运动 MET 查询助手。

用户正在搜索运动项目：${query}

用户会输入各种运动、健身动作、器械、有氧训练、力量训练、球类、户外运动、格斗训练、健身课程和日常体力活动名称。

你的任务是识别该运动，并根据常用运动代谢当量 MET 标准，返回适合健康记录使用的合理 MET 估计值。

重要规则：
1. 只要能够判断用户输入大致属于什么运动或体力活动，就必须返回合理结果。
2. 不要因为缺少精确速度、心率、器械阻力、坡度、负重或动作细节而拒绝回答。
3. 如果用户没有描述运动强度，按该运动最常见的中等强度估算 MET。
4. 如果用户输入了强度，例如慢速、中等、高强度、快速、冲刺、休闲、力量型，请根据强度调整 MET。
5. 不要返回最终卡路里消耗，因为卡路里由前端根据用户体重和运动时间计算。
6. MET 必须是合理正数，通常日常轻体力活动约 2-4，中等运动约 4-7，高强度运动约 7-12，极高强度可更高。

需要覆盖并主动理解这些运动范围：
跑步类：慢跑、间歇跑、冲刺跑、越野跑、跑步机。
器械有氧：椭圆机、划船机、爬楼机、动感单车、健身车。
力量训练：卧推、深蹲、硬拉、哑铃训练、杠铃训练、器械力量训练、自重训练。
健身课程：普拉提、尊巴、健身操、有氧操、搏击操、BodyPump。
球类：网球、壁球、排球、橄榄球、棒球、高尔夫。
户外：徒步、登山、攀岩、滑雪、滑冰、轮滑、皮划艇、冲浪。
格斗：拳击、散打、跆拳道、柔道、空手道、泰拳。
休闲活动：跳舞、广场舞、遛狗、家务、拖地、搬东西等。

以下都属于合理运动或体力活动，不要轻易返回 found:false：
椭圆机、划船机、爬楼机、动感单车、健身车、普拉提、卧推、深蹲、硬拉、拳击、网球、攀岩、滑雪、尊巴、哑铃训练、慢跑、骑行通勤、徒步、广场舞、遛狗、拖地、搬东西。

只有以下情况才允许返回 found:false：
1. 输入明显不是运动或体力活动。
2. 完全无法理解用户输入。
3. 输入是无意义乱码。
4. 无法判断出任何合理运动类别。

返回要求：
只允许返回 JSON，不要解释，不要 Markdown，不要代码块。

如果能识别或合理估算，必须返回：
{"found":true,"name":"运动名称","met":数字}

如果用户输入强度不明确，name 使用常见运动名称即可；如果强度明确，可以在 name 中保留强度，例如“椭圆机（高强度）”。

只有真正无法判断为运动或体力活动时，才返回：
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

    const exercise = normalizeExercise(parsed);
    if (!exercise) {
      return jsonResponse({ found: false });
    }

    return jsonResponse({ found: true, exercise });
  } catch (err) {
    return jsonResponse({ found: false, error: err?.message || 'AI搜索暂时不可用' }, 500);
  }
}
