const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];

function extractJSONFromAIText(text) {
  if (!text) return null;
  const cleaned = String(text)
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const objectMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]);
      } catch (err) {
        // fall through
      }
    }
    const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      try {
        return JSON.parse(arrayMatch[0]);
      } catch (err2) {
        return null;
      }
    }
    return null;
  }
}

function toNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeIngredient(item) {
  if (typeof item === 'string') {
    const name = item.trim();
    return name ? { name, amount: '', unit: '' } : null;
  }
  if (!item || typeof item !== 'object') return null;
  const name = String(item.name || item.food || item.title || '').trim();
  if (!name) return null;
  return {
    name,
    amount: item.amount == null || item.amount === '' ? '' : item.amount,
    unit: String(item.unit || '').trim(),
  };
}

function normalizeRecipePayload(raw, fallbackMeal = 'lunch') {
  const parsed = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const nutrition =
    parsed.nutrition && typeof parsed.nutrition === 'object' && !Array.isArray(parsed.nutrition)
      ? parsed.nutrition
      : parsed;
  const mealType = MEAL_TYPES.includes(parsed.mealType) ? parsed.mealType : fallbackMeal;
  const ingredients = (Array.isArray(parsed.ingredients) ? parsed.ingredients : [])
    .map(normalizeIngredient)
    .filter(Boolean);
  const steps = (Array.isArray(parsed.steps) ? parsed.steps : [])
    .map((step) => String(step || '').trim())
    .filter(Boolean);
  const tags = (Array.isArray(parsed.tags) ? parsed.tags : [])
    .map((tag) => String(tag || '').trim())
    .filter(Boolean);
  return {
    title: String(parsed.title || '').trim(),
    mealType,
    reason: String(parsed.reason || '').trim(),
    nutrition: {
      calories: Math.max(0, Math.round(toNumber(nutrition.calories ?? parsed.calories))),
      protein: Math.max(0, toNumber(nutrition.protein ?? parsed.protein)),
      carbs: Math.max(0, toNumber(nutrition.carbs ?? parsed.carbs)),
      fat: Math.max(0, toNumber(nutrition.fat ?? parsed.fat)),
      fiber: Math.max(0, toNumber(nutrition.fiber ?? parsed.fiber)),
    },
    ingredients,
    steps,
    cookTime: Math.max(0, Math.round(toNumber(parsed.cookTime))),
    difficulty: String(parsed.difficulty || '简单').trim() || '简单',
    tags,
  };
}

function isValidRecipePayload(parsed) {
  const recipe = normalizeRecipePayload(parsed);
  if (!recipe.title) return false;
  if (!Number.isFinite(recipe.nutrition.calories) || recipe.nutrition.calories < 0) return false;
  return recipe.ingredients.length > 0;
}

function normalizeIdentifiedIngredients(raw) {
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.ingredients)
      ? raw.ingredients
      : [];
  return list.map(normalizeIngredient).filter(Boolean);
}

function isValidIngredientsPayload(parsed) {
  return normalizeIdentifiedIngredients(parsed).length > 0;
}

function compactHealthContext(healthContext = {}) {
  return {
    meal: healthContext.meal || '',
    goalType: healthContext.goalType || '',
    goalTitle: healthContext.goalTitle || '',
    remainingKcal: healthContext.remainingKcal ?? null,
    proteinGap: healthContext.proteinGap ?? null,
    carbsGap: healthContext.carbsGap ?? null,
    fatGap: healthContext.fatGap ?? null,
    hasFood: !!healthContext.hasFood,
    hasTarget: !!healthContext.hasTarget,
  };
}

function compactPreferences(preferences = {}) {
  return {
    allergies: Array.isArray(preferences.allergies) ? preferences.allergies.slice(0, 12) : [],
    dislikes: Array.isArray(preferences.dislikes) ? preferences.dislikes.slice(0, 12) : [],
    dietStyle: preferences.dietStyle || 'any',
    cookingEffort: preferences.cookingEffort || 'easy',
    maxCookTime: preferences.maxCookTime ?? 15,
    kitchenAppliances: Array.isArray(preferences.kitchenAppliances)
      ? preferences.kitchenAppliances.slice(0, 8)
      : [],
    mealPattern: preferences.mealPattern || '3_meals_snack',
  };
}

function buildRecipeOutputContract() {
  return `只返回一个 JSON 对象，不要 Markdown，不要代码块，不要解释。
字段：
{
  "title": "菜名",
  "mealType": "breakfast|lunch|dinner|snack",
  "reason": "结合用户当前缺口和偏好的一句推荐原因",
  "nutrition": { "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0 },
  "ingredients": [{ "name": "食材", "amount": 数字或字符串, "unit": "g" }],
  "steps": ["步骤1"],
  "cookTime": 分钟整数,
  "difficulty": "简单或中等",
  "tags": ["high_protein"]
}
营养值为这一份成品的估算，不要重算用户全天热量。
过敏原必须完全避开。忌口必须避开。
如果用户几乎没有热量空间，只给很轻的加餐，不要硬凑正餐。`;
}

export {
  MEAL_TYPES,
  extractJSONFromAIText,
  normalizeIngredient,
  normalizeRecipePayload,
  isValidRecipePayload,
  normalizeIdentifiedIngredients,
  isValidIngredientsPayload,
  compactHealthContext,
  compactPreferences,
  buildRecipeOutputContract,
};
