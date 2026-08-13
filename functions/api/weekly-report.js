/**
 * POST /api/weekly-report
 *
 * Server-side proxy for AI weekly health report generation.
 * The frontend sends the fully-built prompt; the server adds the
 * DashScope API key, model, and fixed parameters (temperature, response_format).
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

    const model = getDashScopeModel(context);
    const result = await callDashScope(context, {
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.25,
      response_format: { type: 'json_object' },
    });

    if (!result.ok) {
      return jsonResponse({ error: result.error }, result.status);
    }

    return jsonResponse({ text: result.text });
  } catch (err) {
    return jsonResponse(
      { error: err?.message || 'AI周报暂时不可用' },
      500
    );
  }
}
