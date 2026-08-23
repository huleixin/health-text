/**
 * POST /api/recognize-expense
 *
 * Unified AI recognition for payment screenshots and order screenshots.
 * Primary: Doubao Seed 2.1 Turbo; fallback: Qwen3.8-Max.
 * Uses multimodal analysis to determine image type and extract structured data.
 *
 * Request body: { image: string }
 *   - image: base64 data URL of the screenshot (e.g. "data:image/jpeg;base64,...")
 *
 * Response: { text: string } | { error: string }
 *   The `text` field contains a JSON string with the recognition result.
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

const ALLOWED_IMAGE_TYPES = new Set([
  'payment',
  'food_order',
  'food_photo',
  'hotel_order',
  'transport_order',
  'shopping_order',
  'other_order',
  'unknown',
]);

const ORDER_IMAGE_TYPES = new Set([
  'food_order',
  'hotel_order',
  'transport_order',
  'shopping_order',
  'other_order',
]);

const EXPENSE_RECOGNITION_PROMPT = `分析图片，只返回严格JSON，不要解释。

imageType 取值：
payment|food_order|food_photo|hotel_order|transport_order|shopping_order|other_order|unknown

优先提取：merchant、amount(实付)、occurredAt(YYYY-MM-DDTHH:mm:ss或null)、categoryKey、orderItems[{name,quantity,spec,amount}]。
categoryKey 仅用：food,drinks,snacks,hotel,transport,tickets,entertainment,shopping,daily,gift,beauty,healthcare,subscription,other。
food_order→food；hotel→hotel；transport→transport；shopping→shopping；food_photo/unknown→categoryKey=null。
多笔订单全部写入 orders[]，兼容字段：expense=orders[0]摘要，orderItems=orders[0].orderItems，confidence。
规则：只返回JSON；金额用数字；识别不到用null；禁止编造；food_photo时orders=[]、expense=null、orderItems=[]。

格式：
{"ok":true,"imageType":"food_order","orders":[{"amount":0,"merchant":"","occurredAt":null,"categoryKey":"food","orderItems":[{"name":"","quantity":1,"spec":null,"amount":null}],"confidence":{}}],"expense":null,"orderItems":[],"confidence":{},"warnings":[]}`;

function logRecognizeExpense(meta) {
  console.log('[recognize-expense]', {
    provider: meta.provider,
    fallback: !!meta.fallback,
    reason: meta.reason || '',
    ms: meta.ms,
  });
}

function logOrderAIFallback(reason, provider) {
  console.log('[FoodAI-Fallback]', {
    reason: String(reason || ''),
    provider: String(provider || 'order'),
  });
  console.log('[OrderAI-Fallback]', {
    reason: String(reason || ''),
    provider: String(provider || ''),
  });
}

function parseRecognizeExpenseJson(text) {
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

function isValidAmount(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0;
}

function resolveOrderItems(parsed) {
  if (Array.isArray(parsed.orderItems)) return parsed.orderItems;
  const orders = Array.isArray(parsed.orders) ? parsed.orders : [];
  if (orders[0] && Array.isArray(orders[0].orderItems)) {
    return orders[0].orderItems;
  }
  return null;
}

function validateOrderItems(items) {
  for (const item of items) {
    if (!item || typeof item !== 'object') return false;
    const name = String(item.name || '').trim();
    if (!name) return false;
  }
  return true;
}

function validatePaymentAmounts(parsed) {
  const expense = parsed.expense;
  if (expense !== null && expense !== undefined) {
    if (typeof expense !== 'object') return false;
    if (expense.amount !== null && expense.amount !== undefined) {
      if (!isValidAmount(expense.amount)) return false;
    }
  }

  const orders = Array.isArray(parsed.orders) ? parsed.orders : [];
  for (const order of orders) {
    if (!order || typeof order !== 'object') return false;
    if (order.amount !== null && order.amount !== undefined) {
      if (!isValidAmount(order.amount)) return false;
    }
  }

  return true;
}

function validateRecognizeExpenseResponse(parsed) {
  if (!parsed || typeof parsed !== 'object') return false;

  const imageType = String(parsed.imageType || '').trim();
  if (!ALLOWED_IMAGE_TYPES.has(imageType)) return false;

  if (imageType === 'unknown') return true;

  if (imageType === 'payment') {
    return validatePaymentAmounts(parsed);
  }

  if (imageType === 'food_order') {
    const orderItems = resolveOrderItems(parsed);
    if (!Array.isArray(orderItems)) return false;
    return validateOrderItems(orderItems);
  }

  if (ORDER_IMAGE_TYPES.has(imageType)) {
    const orderItems = resolveOrderItems(parsed);
    if (orderItems === null) return true;
    return validateOrderItems(orderItems);
  }

  return true;
}

function isUsableRecognizeExpenseResponse(parsed) {
  if (!parsed || typeof parsed !== 'object') return false;
  const imageType = String(parsed.imageType || '').trim();
  return ALLOWED_IMAGE_TYPES.has(imageType);
}

function normalizeRecognizeExpenseParsed(parsed) {
  const orders = Array.isArray(parsed.orders) ? parsed.orders : [];
  if (orders.length > 0) {
    const o0 = orders[0];
    if (!parsed.expense && o0) {
      parsed.expense = {
        amount: o0.amount,
        merchant: o0.merchant,
        occurredAt: o0.occurredAt,
        categoryKey: o0.categoryKey,
      };
    }
    if (!Array.isArray(parsed.orderItems) && Array.isArray(o0?.orderItems)) {
      parsed.orderItems = o0.orderItems;
    }
    if (!parsed.confidence && o0?.confidence) {
      parsed.confidence = o0.confidence;
    }
  }
  return parsed;
}

function buildRecognizeExpenseMessages(image) {
  return [
    {
      role: 'user',
      content: [
        { type: 'text', text: EXPENSE_RECOGNITION_PROMPT },
        { type: 'image_url', image_url: { url: image } },
      ],
    },
  ];
}

function formatRecognizeExpenseText(parsed, rawText) {
  if (parsed) {
    return JSON.stringify(normalizeRecognizeExpenseParsed(parsed));
  }
  return rawText;
}

async function callRecognizeExpenseAI(context, image) {
  const startedAt = Date.now();
  const requestBody = {
    max_tokens: 1600,
    temperature: 0.1,
    response_format: { type: 'json_object' },
    messages: buildRecognizeExpenseMessages(image),
  };
  let usedFallback = false;
  let fallbackReason = '';

  if (getDoubaoApiKey(context)) {
    const doubaoResult = await callDoubao(context, {
      model: getDoubaoTurboModel(context),
      ...requestBody,
      thinking: { type: 'disabled' },
    });

    if (doubaoResult.ok) {
      const parsed = parseRecognizeExpenseJson(doubaoResult.text);
      if (parsed && isUsableRecognizeExpenseResponse(parsed)) {
        logRecognizeExpense({
          provider: 'doubao',
          fallback: false,
          ms: Date.now() - startedAt,
        });
        return {
          ok: true,
          text: formatRecognizeExpenseText(parsed, doubaoResult.text),
          meta: {
            provider: 'doubao',
            fallback: false,
            ms: Date.now() - startedAt,
          },
        };
      }
      usedFallback = true;
      fallbackReason = parsed ? 'invalid_imageType' : 'unparseable';
    } else {
      usedFallback = true;
      fallbackReason =
        doubaoResult.error ||
        (doubaoResult.status === 504 ? 'timeout' : 'api_error');
    }
    logOrderAIFallback(fallbackReason, 'doubao');
  } else {
    usedFallback = true;
    fallbackReason = 'doubao_unavailable';
    logOrderAIFallback(fallbackReason, 'doubao');
  }

  const model = getDashScopeModel(context);
  const qwenResult = await callDashScope(context, {
    model,
    ...FOOD_QWEN_LOW_LATENCY_OPTIONS,
    ...requestBody,
  });

  logRecognizeExpense({
    provider: 'qwen',
    fallback: usedFallback,
    reason: fallbackReason,
    ms: Date.now() - startedAt,
  });

  if (!qwenResult.ok) {
    return { ok: false, error: qwenResult.error, status: qwenResult.status };
  }

  const parsed = parseRecognizeExpenseJson(qwenResult.text);
  return {
    ok: true,
    text: formatRecognizeExpenseText(parsed, qwenResult.text),
    meta: {
      provider: 'qwen',
      fallback: usedFallback,
      reason: fallbackReason,
      ms: Date.now() - startedAt,
    },
  };
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => ({}));
    const image = String(body.image || '').trim();

    if (!image) {
      return jsonResponse({ error: '缺少image参数' }, 400);
    }

    const result = await callRecognizeExpenseAI(context, image);

    if (!result.ok) {
      return jsonResponse({ error: result.error }, result.status);
    }

    return jsonResponse({ text: result.text, meta: result.meta || null });
  } catch (err) {
    return jsonResponse(
      { error: err?.message || 'AI识别暂时不可用' },
      500
    );
  }
}
