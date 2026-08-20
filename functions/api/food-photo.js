/**
 * POST /api/food-photo
 *
 * Server-side proxy for AI food photo recognition (multimodal).
 * Primary: Doubao Seed 2.1 Turbo; fallback: Qwen3.8-Max.
 * The frontend sends the prompt text and base64 image URL; the server
 * adds the API key, model, and constructs the multimodal message content.
 *
 * Request body: { prompt: string, image: string }
 *   - prompt: the text prompt for food recognition
 *   - image:  base64 data URL of the photo (e.g. "data:image/jpeg;base64,...")
 *
 * Response: { text: string } | { error: string }
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

function logFoodPhoto(meta) {
  console.log('[food-photo]', {
    provider: meta.provider,
    fallback: !!meta.fallback,
    ms: meta.ms,
  });
}

function parseFoodPhotoJsonArray(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;

  try {
    const direct = JSON.parse(raw);
    if (Array.isArray(direct)) return direct;
  } catch (e) {
    // fall through to bracket extraction
  }

  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[0]);
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    return null;
  }
}

function getItemCalories(item) {
  return (
    item?.calories_per_100g ??
    item?.calPer100g ??
    item?.caloriesPer100g ??
    item?.calories ??
    item?.cal
  );
}

function isValidCalories(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0;
}

function validateFoodPhotoAIResponse(text) {
  const content = String(text || '').trim();
  if (!content) return false;

  const items = parseFoodPhotoJsonArray(content);
  if (items === null) return false;

  // Empty array is a valid business outcome; frontend handles it without fallback.
  if (items.length === 0) return true;

  if (items.length > 20) return false;

  for (const item of items) {
    if (!item || typeof item !== 'object') return false;

    const name = String(item.food || item.name || '').trim();
    if (!name) return false;

    if (!isValidCalories(getItemCalories(item))) return false;
  }

  return true;
}

function buildFoodPhotoRequestBody(prompt, image) {
  return {
    max_tokens: 1400,
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

async function callFoodPhotoAI(context, prompt, image) {
  const startedAt = Date.now();
  const requestBody = buildFoodPhotoRequestBody(prompt, image);
  let usedFallback = false;

  if (getDoubaoApiKey(context)) {
    const doubaoResult = await callDoubao(context, {
      model: getDoubaoTurboModel(context),
      ...requestBody,
      thinking: { type: 'disabled' },
    });

    if (doubaoResult.ok && validateFoodPhotoAIResponse(doubaoResult.text)) {
      logFoodPhoto({
        provider: 'doubao',
        fallback: false,
        ms: Date.now() - startedAt,
      });
      return { ok: true, text: doubaoResult.text };
    }

    usedFallback = true;
  }

  const model = getDashScopeModel(context);
  const qwenResult = await callDashScope(context, {
    model,
    ...FOOD_QWEN_LOW_LATENCY_OPTIONS,
    ...requestBody,
  });

  logFoodPhoto({
    provider: 'qwen',
    fallback: usedFallback,
    ms: Date.now() - startedAt,
  });

  if (!qwenResult.ok) {
    return { ok: false, error: qwenResult.error, status: qwenResult.status };
  }

  return { ok: true, text: qwenResult.text };
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const prompt = String(body.prompt || '').trim();
    const image = String(body.image || '').trim();

    if (!prompt || !image) {
      return jsonResponse({ error: '缺少prompt或image参数' }, 400);
    }

    const result = await callFoodPhotoAI(context, prompt, image);

    if (!result.ok) {
      return jsonResponse({ error: result.error }, result.status);
    }

    return jsonResponse({ text: result.text });
  } catch (err) {
    return jsonResponse(
      { error: err?.message || 'AI拍照识别暂时不可用' },
      500
    );
  }
}
