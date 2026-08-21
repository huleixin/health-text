/**
 * POST /api/recipe-search
 *
 * Generate a personalized recipe from a user query.
 * Primary: Doubao Seed 2.1 Turbo; fallback: Qwen 3.8-Max.
 *
 * Request: { query, healthContext?, preferences? }
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
  compactHealthContext,
  compactPreferences,
  buildRecipeOutputContract,
} from './_shared/recipe.js';

function logRecipeSearch(meta) {
  console.log('[recipe-search]', {
    provider: meta.provider,
    fallback: !!meta.fallback,
    ms: meta.ms,
  });
}

function buildRecipeSearchPrompt(query, healthContext, preferences) {
  return `你是家庭健康食谱助手。根据用户搜索词，生成一道适合当前状态的家常菜谱。
不要给出医疗诊断，不要鼓励极端节食。

用户搜索：${query}

当前健康状态（系统已算好，请直接使用，不要重新计算热量）：
${JSON.stringify(healthContext)}

用户饮食偏好：
${JSON.stringify(preferences)}

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
      logRecipeSearch({
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
  logRecipeSearch({
    provider: 'qwen',
    fallback: usedFallback,
    ms: Date.now() - startedAt,
  });
  if (!qwenResult.ok) {
    return { ok: false, error: qwenResult.error, status: qwenResult.status };
  }
  const parsed = extractJSONFromAIText(qwenResult.text);
  if (!isValidRecipePayload(parsed)) {
    return { ok: false, error: '菜谱结果不完整，请换个说法再试', status: 502 };
  }
  return { ok: true, recipe: normalizeRecipePayload(parsed) };
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const query = String(body.query || body.text || '').trim();
    if (!query) {
      return jsonResponse({ error: '请输入要搜索的菜品或条件' }, 400);
    }
    const healthContext = compactHealthContext(body.healthContext || {});
    const preferences = compactPreferences(body.preferences || {});
    const prompt = buildRecipeSearchPrompt(query, healthContext, preferences);
    const result = await generateRecipe(context, prompt);
    if (!result.ok) {
      return jsonResponse({ error: result.error || '菜谱搜索暂时不可用' }, result.status || 502);
    }
    return jsonResponse(result.recipe);
  } catch (err) {
    return jsonResponse({ error: err?.message || '菜谱搜索暂时不可用' }, 500);
  }
}
