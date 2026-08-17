/**
 * POST /api/recognize-expense
 *
 * Unified AI recognition for payment screenshots and order screenshots.
 * Uses Qwen-VL multimodal to analyze the image, determine its type,
 * and extract structured expense data + optional order items.
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

const EXPENSE_RECOGNITION_PROMPT = `你是一个智能图片识别助手。请分析图片并返回严格的JSON。

## 图片类型判断（imageType）
- payment: 微信/支付宝/银行卡等付款成功截图、付款凭证
- food_order: 餐饮订单截图（美团/饿了么/餐厅订单/外卖订单等）
- food_photo: 实拍食物照片（非截图，是真实拍摄的食物/菜品照片）
- hotel_order: 酒店预订/住宿订单截图
- transport_order: 交通出行订单截图（滴滴/高铁/机票/公交/地铁/充电桩等）
- shopping_order: 购物订单截图（淘宝/京东/拼多多等商品订单）
- other_order: 其他订单（电影票、景区门票、娱乐订单等不属于以上类别的订单）
- unknown: 无法可靠判断图片内容（如风景照、自拍等非账单图片）

## 多订单识别规则（非常重要）
请扫描整张图片，找出所有清晰可见的订单。
- 如果图片是"我的订单"/"订单列表"/"历史订单"等列表页面，其中包含多笔订单，必须将每笔订单分别作为orders数组的一个元素返回
- 按图片从上到下顺序返回
- 不允许只返回最显眼的第一笔
- 不允许把两笔订单合并成一笔
- 某笔缺少某字段时使用null，不允许因为某个字段缺失就整笔丢弃
- 如果只有一笔订单，orders数组长度为1

## 分类自动映射（categoryKey）
根据图片类型和内容，返回对应的分类key：
- food_order → food
- hotel_order → hotel
- transport_order → transport
- shopping_order → shopping
- payment/other_order → 根据付款对象或订单内容判断最合适的分类
- food_photo/unknown → categoryKey返回null

## 金额识别规则（最重要）
优先识别用户最终真实支付金额：
- 实付、支付金额、付款金额、合计实付、实付款
- 不要把原价、优惠前金额、商品小计、红包金额当作账单金额
- 如果存在多个金额且无法可靠判断哪个是实付金额，选择最可能的实付金额，并在warnings中添加"检测到多个候选金额，请确认"

## 商家识别
识别真实商家/店铺名称（如海底捞、喜茶、全季酒店、滴滴出行、星星充电）。
不要返回平台名称（微信支付、支付宝、美团、饿了么），除非截图确实无法取得实际商家。

## 日期时间
优先读取交易时间/支付时间/订单时间。格式为 YYYY-MM-DDTHH:mm:ss。
无法识别则返回null，不要编造日期。

## 分类（只能返回以下14个key之一）
food=餐饮, drinks=奶茶咖啡, snacks=零食甜品, hotel=酒店住宿, transport=交通出行, tickets=门票景点, entertainment=娱乐休闲, shopping=购物, daily=生活日用, gift=礼物, beauty=美容护理, healthcare=医疗健康, subscription=会员订阅, other=其他
无法确定返回 other。

## 订单商品（所有*_order类型）
如果图片中有订单明细，提取orderItems数组，每项包含：
- name: 商品名称（string）
- quantity: 数量（number，默认1）
- spec: 规格（string或null，如"中份"、"大杯"）
- amount: 单项金额（number或null，只有明确标注时才返回，不要自己计算分摊）

不要通过总金额自己乱分摊每道菜价格。

## 返回格式（严格JSON，不要包含任何其他文本）
{
  "ok": true,
  "imageType": "payment|food_order|food_photo|hotel_order|transport_order|shopping_order|other_order|unknown",
  "orders": [
    {
      "amount": 21.63,
      "merchant": "星星充电汽车充电站",
      "occurredAt": "2026-08-02T12:07:00",
      "categoryKey": "transport",
      "orderItems": [],
      "startTime": "12:07:22",
      "endTime": "13:24:47",
      "confidence": { "amount": 0.95, "merchant": 0.90, "occurredAt": 0.85, "category": 0.90 }
    }
  ],
  "warnings": []
}

## 兼容字段（自动填充）
除了orders数组外，同时返回以下兼容字段（取orders[0]的值）：
- "expense": orders[0]的 {amount, merchant, occurredAt, categoryKey}（如果orders为空则为null）
- "orderItems": orders[0].orderItems（如果orders为空则为[]）
- "confidence": orders[0].confidence（如果orders为空则为{}）

## 重要规则
- 识别不到的字段返回null
- food_photo类型：orders返回空数组，expense返回null，orderItems返回空数组
- 禁止编造任何数据
- amount使用数字（元），不要包含货币符号
- confidence范围0-1，低于0.5表示不太确定
- 如果图片无法识别（如风景照、自拍等），返回 {"ok":false,"imageType":"unknown","orders":[],"expense":null,"orderItems":[],"confidence":{},"warnings":["无法识别账单信息"]}
- 只返回JSON，不要包含markdown代码块标记或任何其他文字`;

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

    const model = getDashScopeModel(context);
    const result = await callDashScope(context, {
      model,
      ...FOOD_QWEN_LOW_LATENCY_OPTIONS,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: EXPENSE_RECOGNITION_PROMPT },
            { type: 'image_url', image_url: { url: image } },
          ],
        },
      ],
    });

    if (!result.ok) {
      return jsonResponse({ error: result.error }, result.status);
    }

    let parsed;
    try {
      parsed = JSON.parse(result.text);
    } catch (e) {
      const match = String(result.text).match(/\{[\s\S]*\}/);
      if (match) {
        try { parsed = JSON.parse(match[0]); } catch (e2) { parsed = null; }
      }
    }
    if (parsed) {
      const orders = Array.isArray(parsed.orders) ? parsed.orders : [];
      if (orders.length > 0) {
        const o0 = orders[0];
        if (!parsed.expense && o0) {
          parsed.expense = { amount: o0.amount, merchant: o0.merchant, occurredAt: o0.occurredAt, categoryKey: o0.categoryKey };
        }
        if (!Array.isArray(parsed.orderItems) && Array.isArray(o0?.orderItems)) {
          parsed.orderItems = o0.orderItems;
        }
        if (!parsed.confidence && o0?.confidence) {
          parsed.confidence = o0.confidence;
        }
      }
      return jsonResponse({ text: JSON.stringify(parsed) });
    }

    return jsonResponse({ text: result.text });
  } catch (err) {
    return jsonResponse(
      { error: err?.message || 'AI识别暂时不可用' },
      500
    );
  }
}
