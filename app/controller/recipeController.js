const recipeService = require("../services/recipeService.js");

async function generateRecipeHandler(req, res) {
    try {
        console.log("HELLO11");
        const ingredients = req.body.Ingredients;
        const maxPrepTime = req.body.maxPrepTime;
        const dietaryPreference = req.body.dietaryPreference;
        let recipe = await recipeService.generateRecipes(ingredients, maxPrepTime, dietaryPreference);
        JSON.stringify(recipe, null, 2);

        console.log("ALLL RECIPIES");
        console.log(recipe);
        console.log("1IST");

        console.log(recipe[0]);


       
        res.render("results", { data: recipe});

       
    } catch (error) {
        console.error("Error generating recipe:", error);
        res.status(500).json({ error: "Failed to generate recipe" });
    }
}

module.exports = { generateRecipeHandler };
