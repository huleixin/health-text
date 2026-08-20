/**
 * POST /api/health-coach
 *
 * Server-side proxy for AI health coach advice generation.
 * Primary: Doubao Seed 2.1 Turbo; fallback: Qwen 3.8-Max.
 * The frontend sends the fully-built prompt; the server does not rewrite it.
 *
 * Request body: { prompt: string }
 * Response:     { text: string } | { error: string }
 */

import {
  CORS_HEADERS,
  jsonResponse,
  callDashScope,
  getDashScopeModel,
} from './_shared/dashscope.js';
import {
  callDoubao,
  getDoubaoApiKey,
  getDoubaoTurboModel,
} from './_shared/doubao.js';

function logHealthCoach(meta) {
  console.log('[health-coach]', {
    provider: meta.provider,
    fallback: !!meta.fallback,
    ms: meta.ms,
  });
}

function extractJSONFromAIText(text) {
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

function isAdviceString(value) {
  return value === undefined || value === null || typeof value === 'string' || typeof value === 'number';
}

function validateHealthCoachAdvice(parsed) {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
  if (typeof parsed.summary !== 'string' || !parsed.summary.trim()) return false;
  if (!isAdviceString(parsed.diet_advice)) return false;
  if (!isAdviceString(parsed.exercise_advice)) return false;
  if (!isAdviceString(parsed.water_advice)) return false;
  if (!isAdviceString(parsed.sleep_advice)) return false;
  if (parsed.action_plan != null && !Array.isArray(parsed.action_plan)) return false;
  return true;
}

function isValidHealthCoachText(text) {
  return validateHealthCoachAdvice(extractJSONFromAIText(text));
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const prompt = String(body.prompt || '').trim();

    if (!prompt) {
      return jsonResponse({ error: '缺少prompt参数' }, 400);
    }

    const startedAt = Date.now();
    const messages = [{ role: 'user', content: prompt }];
    let usedFallback = false;

    if (getDoubaoApiKey(context)) {
      const doubaoResult = await callDoubao(context, {
        model: getDoubaoTurboModel(context),
        messages,
        temperature: 0.3,
        thinking: { type: 'disabled' },
      });

      if (doubaoResult.ok && isValidHealthCoachText(doubaoResult.text)) {
        logHealthCoach({
          provider: 'doubao',
          fallback: false,
          ms: Date.now() - startedAt,
        });
        return jsonResponse({ text: doubaoResult.text });
      }

      usedFallback = true;
    }

    const model = getDashScopeModel(context);
    const qwenResult = await callDashScope(context, {
      model,
      messages,
      temperature: 0.3,
      enable_thinking: false,
    });

    logHealthCoach({
      provider: 'qwen',
      fallback: usedFallback,
      ms: Date.now() - startedAt,
    });

    if (!qwenResult.ok) {
      return jsonResponse({ error: qwenResult.error }, qwenResult.status);
    }

    return jsonResponse({ text: qwenResult.text });
  } catch (err) {
    return jsonResponse(
      { error: err?.message || 'AI健康教练暂时不可用' },
      500
    );
  }
}
