/**
 * POST /api/estimate-nutrition
 *
 * Batch nutrition estimation for food order items.
 * Uses Qwen3.8-Max to estimate nutrition for multiple food items in one call.
 * Does NOT re-upload images — only accepts food names/specs/quantities.
 *
 * Request body: { items: [{name: string, spec?: string, quantity?: number}] }
 * Response: { results: [{name, found, cal, protein, carbs, fat, fiber, portionAmount, portionUnit, confidence, estimateReason}] }
 */

import {
  CORS_HEADERS,
  FOOD_QWEN_LOW_LATENCY_OPTIONS,
  jsonResponse,
  callDashScope,
  getDashScopeModel,
} from './_shared/dashscope.js';

const NUTRITION_PROMPT = `你是一个食物营养估算助手。请为以下食物逐一估算每份的营养数据，返回严格JSON。

## 食物列表
{ITEMS}

## 返回格式（严格JSON，不要markdown）
{
  "results": [
    {
      "name": "原食物名称",
      "found": true,
      "cal": 470,
      "protein": 24,
      "carbs": 48,
      "fat": 20,
      "fiber": 3,
      "portionAmount": 200,
      "confidence": "medium",
      "estimateReason": "基于常见份量估算"
    }
  ]
}

## 估算规则
- cal=单份热量(kcal)，protein/carbs/fat/fiber=单份对应克数(g)
- portionAmount=单份标准重量(g)，用于后续按比例计算
- 按中国大陆常见做法和份量估算
- confidence: high(基础食物如米饭/鸡蛋)/medium(常见菜肴)/low(复杂/罕见/外卖)
- 宁可轻微高估热量
- 如果不是食物或完全无法估算，found=false，cal/protein/carbs/fat/fiber/portionAmount为0
- estimateReason不超过50字
- results数组长度必须与输入食物列表一致，顺序对应
- 只返回JSON`;

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0) {
      return jsonResponse({ results: [] });
    }

    if (items.length > 30) {
      return jsonResponse({ error: '一次最多估算30项食物' }, 400);
    }

    const itemsText = items.map((item, i) =>
      `${i + 1}. ${String(item.name || '未知').slice(0, 40)}${item.spec ? `（${String(item.spec).slice(0, 20)}）` : ''}${Number(item.quantity) > 1 ? ` ×${Math.round(Number(item.quantity))}` : ''}`
    ).join('\n');

    const prompt = NUTRITION_PROMPT.replace('{ITEMS}', itemsText);

    const model = getDashScopeModel(context);
    const result = await callDashScope(context, {
      model,
      ...FOOD_QWEN_LOW_LATENCY_OPTIONS,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    if (!result.ok) {
      return jsonResponse({ error: result.error }, result.status);
    }

    let parsed;
    try {
      parsed = JSON.parse(result.text);
    } catch (e) {
      const match = String(result.text).match(/\{[\s\S]*\}/);
      if (match) {
        try { parsed = JSON.parse(match[0]); } catch (e2) { parsed = null; }
      }
    }

    if (!parsed || !Array.isArray(parsed.results)) {
      return jsonResponse({ error: 'AI返回格式异常' }, 500);
    }

    const sanitized = parsed.results.map((r, i) => ({
      name: String(r.name || items[i]?.name || '').slice(0, 40),
      found: r.found !== false,
      cal: Math.max(0, Math.round(Number(r.cal) || 0)),
      protein: Math.max(0, Math.round(Number(r.protein) || 0)),
      carbs: Math.max(0, Math.round(Number(r.carbs) || 0)),
      fat: Math.max(0, Math.round(Number(r.fat) || 0)),
      fiber: Math.max(0, Math.round(Number(r.fiber) || 0)),
      portionAmount: Math.max(0, Math.round(Number(r.portionAmount) || 0)),
      portionUnit: 'g',
      confidence: ['high', 'medium', 'low'].includes(r.confidence) ? r.confidence : 'low',
      estimateReason: String(r.estimateReason || '').slice(0, 80),
    }));

    return jsonResponse({ results: sanitized });
  } catch (err) {
    return jsonResponse(
      { error: err?.message || '营养估算暂时不可用' },
      500
    );
  }
}
