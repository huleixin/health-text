/**
 * Volcengine Ark (Doubao) chat completions helper for Cloudflare Pages Functions.
 * OpenAI-compatible API; does not affect existing DashScope/Qwen calls.
 */

const DEFAULT_ARK_BASE_URL = 'https://ark.cn-beijing.volces.com/api/v3';
const DEFAULT_DOUBAO_TURBO_MODEL = 'doubao-seed-2-1-turbo-260628';
const DEFAULT_DOUBAO_TIMEOUT_MS = 12000;

function getDoubaoApiKey(context) {
  return (
    context.env.ARK_API_KEY ||
    context.env.VOLCENGINE_API_KEY ||
    ''
  );
}

function getDoubaoTurboModel(context, fallback = DEFAULT_DOUBAO_TURBO_MODEL) {
  return (
    context.env.DOUBAO_TURBO_MODEL ||
    context.env.ARK_MODEL ||
    fallback
  );
}

function getDoubaoBaseUrl(context) {
  const base = context.env.ARK_BASE_URL || DEFAULT_ARK_BASE_URL;
  return String(base).replace(/\/+$/, '');
}

/**
 * Call Volcengine Ark chat completions API.
 *
 * @param {object} context - Cloudflare Pages Function context
 * @param {object} body    - Request body (model, messages, max_tokens, response_format, etc.)
 * @param {object} [options]
 * @param {number} [options.timeoutMs] - Request timeout in milliseconds
 * @returns {Promise<{ok:boolean, status?:number, error?:string, text?:string}>}
 */
async function callDoubao(context, body, options = {}) {
  const apiKey = getDoubaoApiKey(context);
  if (!apiKey) {
    return { ok: false, status: 500, error: 'Doubao API未配置' };
  }

  const timeoutMs = Number(
    options.timeoutMs ||
      context.env.DOUBAO_TIMEOUT_MS ||
      DEFAULT_DOUBAO_TIMEOUT_MS
  );
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${getDoubaoBaseUrl(context)}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error:
          data?.error?.message ||
          data?.message ||
          `Doubao请求失败：${response.status}`,
      };
    }

    const text = data?.choices?.[0]?.message?.content || '';
    if (!text) {
      return { ok: false, status: 502, error: 'Doubao返回为空' };
    }

    return { ok: true, text };
  } catch (err) {
    if (err?.name === 'AbortError') {
      return { ok: false, status: 504, error: 'Doubao请求超时' };
    }
    return {
      ok: false,
      status: 500,
      error: err?.message || 'Doubao请求失败',
    };
  } finally {
    clearTimeout(timer);
  }
}

export {
  callDoubao,
  getDoubaoApiKey,
  getDoubaoTurboModel,
};
