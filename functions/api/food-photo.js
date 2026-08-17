/**
 * POST /api/food-photo
 *
 * Server-side proxy for AI food photo recognition (Qwen-VL multimodal).
 * The frontend sends the prompt text and base64 image URL; the server
 * adds the DashScope API key, model, and constructs the multimodal
 * message content.
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

    const model = getDashScopeModel(context);
    const result = await callDashScope(context, {
      model,
      ...FOOD_QWEN_LOW_LATENCY_OPTIONS,
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
    });

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
