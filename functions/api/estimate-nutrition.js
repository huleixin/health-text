/**
 * POST /api/estimate-nutrition
 *
 * Batch nutrition estimation for food order items.
 * Primary: Doubao Seed 2.1 Turbo; fallback: Qwen3.8-Max.
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
import {
  callDoubao,
  getDoubaoApiKey,
  getDoubaoTurboModel,
} from './_shared/doubao.js';

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

function logEstimateNutrition(meta) {
  console.log('[estimate-nutrition]', {
    provider: meta.provider,
    fallback: !!meta.fallback,
    ms: meta.ms,
  });
}

function parseNutritionJson(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    const match = String(text).match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch (e2) {
      return null;
    }
  }
}

function isValidNutritionNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0;
}

function validateNutritionAIResponse(parsed, itemCount) {
  if (!parsed || !Array.isArray(parsed.results)) return false;
  if (parsed.results.length !== itemCount) return false;

  for (const r of parsed.results) {
    if (!r || typeof r !== 'object') return false;
    if (r.found === false) continue;

    const name = String(r.name || '').trim();
    if (!name) return false;

    const cal = r.cal ?? r.calories;
    if (!isValidNutritionNumber(cal)) return false;
    if (!isValidNutritionNumber(r.protein)) return false;
    if (!isValidNutritionNumber(r.carbs)) return false;
    if (!isValidNutritionNumber(r.fat)) return false;
  }

  return true;
}

function sanitizeNutritionResults(parsed, items) {
  return parsed.results.map((r, i) => {
    const found = r.found !== false;
    const cal = Math.max(0, Math.round(Number(r.cal) || 0));
    const protein = Math.max(0, Math.round(Number(r.protein) || 0));
    const carbs = Math.max(0, Math.round(Number(r.carbs) || 0));
    const fat = Math.max(0, Math.round(Number(r.fat) || 0));
    const fiber = Math.max(0, Math.round(Number(r.fiber) || 0));
    const portionAmount = Math.max(0, Math.round(Number(r.portionAmount) || 0));
    const servingWeightG = found && portionAmount > 0 ? portionAmount : null;
    let per100g = null;
    if (servingWeightG && servingWeightG > 0) {
      per100g = {
        calories: Math.round(cal / servingWeightG * 100),
        protein: Math.round(protein / servingWeightG * 100 * 10) / 10,
        carbs: Math.round(carbs / servingWeightG * 100 * 10) / 10,
        fat: Math.round(fat / servingWeightG * 100 * 10) / 10,
      };
    }
    return {
      name: String(r.name || items[i]?.name || '').slice(0, 40),
      found,
      cal, protein, carbs, fat, fiber,
      portionAmount,
      portionUnit: 'g',
      estimatedServingWeightG: servingWeightG,
      nutritionPer100g: per100g,
      confidence: ['high', 'medium', 'low'].includes(r.confidence) ? r.confidence : 'low',
      estimateReason: String(r.estimateReason || '').slice(0, 80),
    };
  });
}

async function callEstimateNutritionAI(context, prompt, itemCount) {
  const startedAt = Date.now();
  const requestBody = {
    max_tokens: 2000,
    response_format: { type: 'json_object' },
    messages: [{ role: 'user', content: prompt }],
  };

  let usedFallback = false;

  if (getDoubaoApiKey(context)) {
    const doubaoResult = await callDoubao(context, {
      model: getDoubaoTurboModel(context),
      ...requestBody,
      thinking: { type: 'disabled' },
    });

    if (doubaoResult.ok) {
      const parsed = parseNutritionJson(doubaoResult.text);
      if (validateNutritionAIResponse(parsed, itemCount)) {
        logEstimateNutrition({
          provider: 'doubao',
          fallback: false,
          ms: Date.now() - startedAt,
        });
        return { ok: true, parsed };
      }
    }
    usedFallback = true;
  }

  const model = getDashScopeModel(context);
  const qwenResult = await callDashScope(context, {
    model,
    ...FOOD_QWEN_LOW_LATENCY_OPTIONS,
    ...requestBody,
  });

  if (!qwenResult.ok) {
    logEstimateNutrition({
      provider: 'qwen',
      fallback: usedFallback,
      ms: Date.now() - startedAt,
    });
    return { ok: false, error: qwenResult.error, status: qwenResult.status };
  }

  const parsed = parseNutritionJson(qwenResult.text);
  if (!validateNutritionAIResponse(parsed, itemCount)) {
    logEstimateNutrition({
      provider: 'qwen',
      fallback: usedFallback,
      ms: Date.now() - startedAt,
    });
    return { ok: false, error: 'AI返回格式异常', status: 500 };
  }

  logEstimateNutrition({
    provider: 'qwen',
    fallback: usedFallback,
    ms: Date.now() - startedAt,
  });
  return { ok: true, parsed };
}

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

    const result = await callEstimateNutritionAI(context, prompt, items.length);

    if (!result.ok) {
      return jsonResponse({ error: result.error }, result.status);
    }

    const sanitized = sanitizeNutritionResults(result.parsed, items);
    return jsonResponse({ results: sanitized });
  } catch (err) {
    return jsonResponse(
      { error: err?.message || '营养估算暂时不可用' },
      500
    );
  }
}
