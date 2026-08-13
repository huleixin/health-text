/**
 * Shared DashScope utility for Cloudflare Pages Functions.
 * Provides CORS headers, JSON response helper, and a unified
 * callDashScope() that reads the API key from environment secrets.
 *
 * No API key is ever exposed to the frontend.
 */

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

/**
 * Call DashScope chat completions API.
 *
 * @param {object} context - Cloudflare Pages Function context
 * @param {object} body    - Request body for DashScope (model, messages, temperature, response_format, etc.)
 * @returns {Promise<{ok:boolean, status?:number, error?:string, text?:string}>}
 */
async function callDashScope(context, body) {
  const apiKey =
    context.env.DASHSCOPE_API_KEY ||
    context.env.QWEN_API_KEY ||
    context.env.BAILIAN_API_KEY;

  if (!apiKey) {
    return { ok: false, status: 500, error: 'AI服务未配置' };
  }

  const response = await fetch(
    'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error:
        data?.error?.message ||
        data?.message ||
        `AI请求失败：${response.status}`,
    };
  }

  const text = data?.choices?.[0]?.message?.content || '';
  return { ok: true, text };
}

/**
 * Resolve the DashScope model, preferring env override then falling back
 * to the default used by the frontend before migration.
 */
function getDashScopeModel(context, fallback = 'qwen3-vl-flash') {
  return context.env.DASHSCOPE_MODEL || context.env.QWEN_MODEL || fallback;
}

export { CORS_HEADERS, jsonResponse, callDashScope, getDashScopeModel };
