/**
 * POST /api/recipe-ingredients-photo
 *
 * Identify ingredients from a kitchen photo.
 * Independent from /api/food-photo so existing food recognition is unchanged.
 *
 * Request: { image }
 * Response: { ingredients: [{ name, amount?, unit? }] } | { error }
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
import {
  extractJSONFromAIText,
  isValidIngredientsPayload,
  normalizeIdentifiedIngredients,
} from './_shared/recipe.js';

function logRecipeIngredientsPhoto(meta) {
  console.log('[recipe-ingredients-photo]', {
    provider: meta.provider,
    fallback: !!meta.fallback,
    ms: meta.ms,
  });
}

function buildRequestBody(image) {
  const prompt = `请识别图片中可以烹饪的食材，不要识别成品菜名营养。
只返回 JSON：
{"ingredients":[{"name":"食材名","amount":"可选估计量","unit":"g或个"}]}
规则：
1. 只列出能看清的食材，不要编造。
2. 不要返回热量或营养素。
3. 最多 12 项。
4. 不要 Markdown。`;
  return {
    max_tokens: 800,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: image } },
        ],
      },
    ],
  };
}

async function identifyIngredients(context, image) {
  const startedAt = Date.now();
  const requestBody = buildRequestBody(image);
  let usedFallback = false;

  if (getDoubaoApiKey(context)) {
    const doubaoResult = await callDoubao(
      context,
      {
        model: getDoubaoTurboModel(context),
        ...requestBody,
        thinking: { type: 'disabled' },
      },
      { timeoutMs: 20000 }
    );
    const parsed = extractJSONFromAIText(doubaoResult.text);
    if (doubaoResult.ok && isValidIngredientsPayload(parsed)) {
      logRecipeIngredientsPhoto({
        provider: 'doubao',
        fallback: false,
        ms: Date.now() - startedAt,
      });
      return { ok: true, ingredients: normalizeIdentifiedIngredients(parsed) };
    }
    usedFallback = true;
  }

  const qwenResult = await callDashScope(context, {
    model: getDashScopeModel(context),
    ...FOOD_QWEN_LOW_LATENCY_OPTIONS,
    ...requestBody,
  });
  logRecipeIngredientsPhoto({
    provider: 'qwen',
    fallback: usedFallback,
    ms: Date.now() - startedAt,
  });
  if (!qwenResult.ok) {
    return { ok: false, error: qwenResult.error, status: qwenResult.status };
  }
  const parsed = extractJSONFromAIText(qwenResult.text);
  if (!isValidIngredientsPayload(parsed)) {
    return { ok: false, error: '没有识别到可用食材，请换一张更清晰的照片', status: 502 };
  }
  return { ok: true, ingredients: normalizeIdentifiedIngredients(parsed) };
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const image = String(body.image || '').trim();
    if (!image) {
      return jsonResponse({ error: '缺少图片' }, 400);
    }
    const result = await identifyIngredients(context, image);
    if (!result.ok) {
      return jsonResponse({ error: result.error || '食材识别暂时不可用' }, result.status || 502);
    }
    return jsonResponse({ ingredients: result.ingredients });
  } catch (err) {
    return jsonResponse({ error: err?.message || '食材识别暂时不可用' }, 500);
  }
}
