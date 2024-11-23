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
            "id": 0, // A unique integer ID for the recipe, starting at 0
            "name": "Recipe Name",
            "description": "Short description of the recipe.",
            "ingredients": [
                "Ingredient 1 with quantity",
                "Ingredient 2 with quantity"
            ],
            "method": [
                "Begin by rinsing the rice under cold water until the water runs clear. This helps remove excess starch.",
                "In a medium-sized saucepan, heat 1 tablespoon of olive oil over medium heat. Add the minced garlic and sauté for about 1-2 minutes until it becomes fragrant but not browned.",
                "Add the rinsed rice to the saucepan and stir to coat the rice with the garlic and oil. Pour in the chicken broth, increase the heat to high, and bring to a boil. Once boiling, reduce the heat to low, cover the pan, and let it simmer for about 18-20 minutes until the rice is cooked and absorbs all the liquid.",
                "While the rice is cooking, season the chicken breasts with salt and pepper. In a separate skillet, heat the remaining tablespoon of olive oil over medium-high heat. Add the chicken breasts and cook for 6-7 minutes on each side or until they reach an internal temperature of 165°F. Remove from heat and let them rest for a few minutes before slicing.",
                "Fluff the rice with a fork and serve it on a plate topped with the sliced garlic chicken. Garnish with chopped parsley."
            ],
            "prep_time": 30, // Time in minutes as an integer
            "calories": 300, // Calorie count as an integer
            "meal_type": "Breakfast/Lunch/Dinner/Snack"
        }
    ]
    Ensure the response is a valid JSON array of exactly 5 recipes without any extra text or explanation. Do not include numbering (e.g., Step 1, Step 2) in the "method" array. Write each step clearly as a sentence.
`

                
            }
        ],
    });

    const content = response.choices[0].message.content.trim();
    console.log("Raw Response Content:", content);

    // Clean the response by extracting the JSON array
    const jsonStart = content.indexOf("[");
    const jsonEnd = content.lastIndexOf("]");
    if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonString = content.substring(jsonStart, jsonEnd + 1); // Extract the JSON array
        try {
            const recipes = JSON.parse(jsonString); // Parse the JSON
            // Ensure prep_time, calories, and id are properly parsed
            recipes.forEach((recipe, index) => {
                recipe.id = parseInt(recipe.id || index, 10); // Assign an ID starting at 0 if missing
                recipe.prep_time = parseInt(recipe.prep_time, 10); // Parse prep_time
                recipe.calories = parseInt(recipe.calories, 10); // Parse calories
            });
            return recipes;
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
