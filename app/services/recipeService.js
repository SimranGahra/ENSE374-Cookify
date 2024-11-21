const config = require("../config.js");

async function generateRecipes(ingredients, maxPrepTime, dietaryPreference) {
    const response = await config.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: `
                    Based on the following inputs:
                    - Ingredients: "${ingredients}"
                    - Maximum Preparation Time: "${maxPrepTime} minutes"
                    - Dietary Preference: "${dietaryPreference}"
                    Generate 5 recipes in the following JSON format:
                    [
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
                    ]
                    Ensure the response is a valid JSON array of exactly 5 recipes without any extra text or explanation.
                `
            }
        ],
    });

    const content = response.choices[0].message.content.trim();
    console.log("Raw Response Content:", content);

    // Clean the response by removing markdown formatting
    const jsonStart = content.indexOf("[");
    const jsonEnd = content.lastIndexOf("]");
    if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonString = content.substring(jsonStart, jsonEnd + 1); // Extract the JSON array
        try {
            return JSON.parse(jsonString); // Parse the JSON
        } catch (error) {
            console.error("Error parsing cleaned JSON:", error, jsonString);
            throw new Error("Failed to parse cleaned JSON response");
        }
    } else {
        console.error("No JSON array found in response:", content);
        throw new Error("No valid JSON array found in the response");
    }
}

module.exports = { generateRecipes };
