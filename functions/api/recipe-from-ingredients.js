/**
 * POST /api/recipe-from-ingredients
 *
 * Generate a recipe from confirmed ingredients.
 * Primary: Doubao Seed 2.1 Turbo; fallback: Qwen 3.8-Max.
 * Does not modify /api/food-photo.
 *
 * Request: { ingredients: [], healthContext?, preferences? }
 * Response: recipe JSON | { error }
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
  isValidRecipePayload,
  normalizeRecipePayload,
  normalizeIdentifiedIngredients,
  compactHealthContext,
  compactPreferences,
  buildRecipeOutputContract,
} from './_shared/recipe.js';

function logRecipeFromIngredients(meta) {
  console.log('[recipe-from-ingredients]', {
    provider: meta.provider,
    fallback: !!meta.fallback,
    ms: meta.ms,
  });
}

function buildPrompt(ingredients, healthContext, preferences) {
  const names = ingredients
    .map((item) => {
      const amount = item.amount === '' || item.amount == null ? '' : ` ${item.amount}${item.unit || ''}`;
      return `${item.name}${amount}`;
    })
    .join('、');
  return `你是家庭健康食谱助手。根据用户现有食材，生成一道能做出来的家常菜。
优先用这些食材，可以少量补充油盐葱姜蒜，不要引入用户没有的主料。
不要给出医疗诊断。

现有食材：${names}

当前健康状态（系统已算好，请直接使用，不要重新计算热量）：
${JSON.stringify(healthContext)}

用户饮食偏好：
${JSON.stringify(preferences)}

推荐原因要结合当前缺口，例如蛋白质还差多少、晚餐热量空间是否充足。

${buildRecipeOutputContract()}`;
}

async function generateRecipe(context, prompt) {
  const startedAt = Date.now();
  const messages = [{ role: 'user', content: prompt }];
  let usedFallback = false;

  if (getDoubaoApiKey(context)) {
    const doubaoResult = await callDoubao(
      context,
      {
        model: getDoubaoTurboModel(context),
        messages,
        temperature: 0.4,
        thinking: { type: 'disabled' },
      },
      { timeoutMs: 20000 }
    );
    const parsed = extractJSONFromAIText(doubaoResult.text);
    if (doubaoResult.ok && isValidRecipePayload(parsed)) {
      logRecipeFromIngredients({
        provider: 'doubao',
        fallback: false,
        ms: Date.now() - startedAt,
      });
      return { ok: true, recipe: normalizeRecipePayload(parsed) };
    }
    usedFallback = true;
  }

  const qwenResult = await callDashScope(context, {
    model: getDashScopeModel(context),
    messages,
    temperature: 0.4,
    ...FOOD_QWEN_LOW_LATENCY_OPTIONS,
  });
  logRecipeFromIngredients({
    provider: 'qwen',
    fallback: usedFallback,
    ms: Date.now() - startedAt,
  });
  if (!qwenResult.ok) {
    return { ok: false, error: qwenResult.error, status: qwenResult.status };
  }
  const parsed = extractJSONFromAIText(qwenResult.text);
  if (!isValidRecipePayload(parsed)) {
    return { ok: false, error: '菜谱结果不完整，请确认食材后再试', status: 502 };
  }
  return { ok: true, recipe: normalizeRecipePayload(parsed) };
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const ingredients = normalizeIdentifiedIngredients(body.ingredients || []);
    if (!ingredients.length) {
      return jsonResponse({ error: '请先提供食材' }, 400);
    }
    const healthContext = compactHealthContext(body.healthContext || {});
    const preferences = compactPreferences(body.preferences || {});
    const prompt = buildPrompt(ingredients, healthContext, preferences);
    const result = await generateRecipe(context, prompt);
    if (!result.ok) {
      return jsonResponse({ error: result.error || '根据食材生成菜谱暂时不可用' }, result.status || 502);
    }
    return jsonResponse(result.recipe);
  } catch (err) {
    return jsonResponse({ error: err?.message || '根据食材生成菜谱暂时不可用' }, 500);
  }
}
