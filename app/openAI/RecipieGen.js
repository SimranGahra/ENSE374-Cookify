import openai from "./openAIAPI.js"

async function generateRecipe(ingredients, maxPrepTime, dietaryPreference) {
    const ingredientsList = ingredients.join(", ");

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: `
                    Based on the following inputs:
                    - Ingredients: "${ingredientsList}"
                    - Maximum Preparation Time: "${maxPrepTime} minutes"
                    - Dietary Preference: "${dietaryPreference}"
                    Generate a recipe in the following JSON format:
                    {
                        "name": "Recipe Name",
                        "description": "Short description of the recipe.",
                        "ingredients": [
                            "Ingredient 1 with quantity",
                            "Ingredient 2 with quantity"
                        ],
                        "method": [
                            "Step 1",
                            "Step 2"
                        ],
                        "prep_time": "Time in minutes",
                        "calories": "Approximate calorie count",
                        "meal_type": "Breakfast/Lunch/Dinner/Snack"
                    }
                    Ensure the response is a valid JSON object without any extra text or explanation.
                `
            }
        ]
    });

    const content = response.choices[0].message.content.trim();

    // Parse the content as JSON
    try {
        return JSON.parse(content);
    } catch (error) {
        console.error("Error parsing JSON response:", error, content);
        throw new Error("Failed to generate a valid JSON recipe");
    }
}


generateRecipe(["chicken", "broccoli"], 30,"keto");