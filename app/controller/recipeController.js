const recipeService = require("../services/recipeService.js");

async function generateRecipeHandler(req, res) {
    const ingredients = req.query.ingredients ? req.query.ingredients.split(",") : ["chicken", "broccoli"];
    const maxPrepTime = req.query.maxPrepTime || 30;
    const dietaryPreference = req.query.dietaryPreference || "Keto";

    try {
        const recipe = await recipeService.generateRecipe(ingredients, maxPrepTime, dietaryPreference);

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(recipe, null, 2)); // Pretty-printed JSON
    } catch (error) {
        console.error("Error generating recipe:", error);
        res.status(500).json({ error: "Failed to generate recipe" });
    }
}

module.exports = { generateRecipeHandler };
