import axios from "axios";

async function GetNutritionInformation(barcode) {
  const response = await axios.get(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );

  return ParseNutrition(response.data);
}

function ParseNutrition(data) {
  if (!data.product) {
    return null;
  }

  const nutriments = data.product.nutriments || {
    carbohydrates: 0, // yelllow
    carbohydrates_unit: "g",
    energy: 0, // red
    energy_unit: "kcal",
    fat: 0, // orange
    fat_unit: "g",
    fiber: 0, // green
    fiber_unit: "g",
    proteins: 0, // blue
    proteins_unit: "g",
    salt: 0, // purple #d8b4fe
    salt_unit: "mg",
    sodium: 0, // #fb7185
    sodium_unit: "mg",
    sugars: 0, // teal #0d9488
    sugars_unit: "g",
  };
  const nutrition = {
    carbohydrates: [
      nutriments.carbohydrates_serving || nutriments.carbohydrates || 0,
      nutriments.carbohydrates_unit || "g",
    ],
    energy: [
      nutriments["energy-kcal_100g"] ||
        nutriments.energy_serving ||
        nutriments.energy ||
        0,
      nutriments.energy_unit || "kcal",
    ],
    fat: [nutriments.fat_serving || nutriments.fat || 0, nutriments.fat || "g"],
    fiber: [
      nutriments.fiber_serving || nutriments.fiber || 0,
      nutriments.fiber_unit || "g",
    ],
    proteins: [
      nutriments.proteins_serving || nutriments.proteins || 0,
      nutriments.proteins_unit || "g",
    ],
    salt: [
      nutriments.salt_serving || nutriments.salt || 0,
      nutriments.salt_unit || "mg",
    ],
    sodium: [
      nutriments.sodium_serving || nutriments.sodium || 0,
      nutriments.sodium_unit || "mg",
    ],
    sugars: [
      nutriments.sugars_serving || nutriments.sugars || 0,
      nutriments.sugars_unit || "g",
    ],
  };

  let nutritionString = "";
  for (const [key, value] of Object.entries(nutrition)) {
    nutritionString += `${key}: ${value.join("")} `;
  }

  return {
    name: data.product.product_name,
    ingredients:
      data.product.ingredients_text_en || data.product.ingredients_text,
    nutrition,
    nutritionString,
  };
}

export { GetNutritionInformation, ParseNutrition };
