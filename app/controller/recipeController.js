const recipeService = require("../services/recipeService.js");
const Recipe = require("../model/recipe");

// Generate Recipes Handler
async function generateRecipeHandler(req, res) {
    if (req.isAuthenticated()) {
        try {
            const { Ingredients: ingredients, maxPrepTime, dietaryPreference } = req.body;

            // Generate recipes from the service
            const recipes = await recipeService.generateRecipes(ingredients, maxPrepTime, dietaryPreference);

            // Store generated recipes in session temporarily
            req.session.recipe = recipes;

            console.log("Generated Recipes:", recipes);
            return res.redirect("/search-result");
        } catch (error) {
            console.error("Error generating recipes:", error);
            return res.status(500).json({ error: "Failed to generate recipes." });
        }
    } else {
        return res.redirect("/");
    }
}

// Search Results Page
const search_result_get = (req, res) => {
    if (req.isAuthenticated()) {
        const recipes = req.session.recipe || [];
        return res.render("results", { user: { username: req.user.username }, data: recipes });
    } else {
        return res.redirect("/");
    }
};

// Recipe Details Page
const recipe_page_get = (req, res) => {
    if (req.isAuthenticated()) {
        const recipeId = parseInt(req.params.recipeId);
        const selectedRecipe = req.session.recipe ? req.session.recipe[recipeId] : null;

        if (selectedRecipe) {
            return res.render("infopage", {
                user: { username: req.user.username },
                data: selectedRecipe
            });
        } else {
            return res.status(404).send("Recipe not found.");
        }
    } else {
        return res.redirect("/");
    }
};

// Saved Recipes Page
const saved_recipe_get = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            // Query saved recipes from the database for the logged-in user
            const savedRecipes = await Recipe.find({ userId: req.user._id, isFavorited: true });

            return res.render("savedrecipes", {
                user: { username: req.user.username },
                data: savedRecipes
            });
        } catch (error) {
            console.error("Error fetching saved recipes:", error);
            return res.status(500).send("Failed to load saved recipes.");
        }
    } else {
        return res.redirect("/");
    }
};

// Add Recipe to Favorites
const addto_favorites_get = async (req, res) => {
    if (req.isAuthenticated()) {
        const recipeId = parseInt(req.params.recipeId);
        const selectedRecipe = req.session.recipe ? req.session.recipe[recipeId] : null;

        if (selectedRecipe) {
            try {
                // Add recipe to the database with `isFavorited` set to true
                const favoriteRecipe = new Recipe({
                    _id: recipeId, // Assuming recipe ID is generated here
                    userId: req.user._id,
                    ...selectedRecipe,
                    isFavorited: true
                });

                await favoriteRecipe.save();

                console.log("Recipe added to favorites:", favoriteRecipe);
                return res.redirect("/search-result");
            } catch (error) {
                console.error("Error adding recipe to favorites:", error);
                return res.status(500).send("Failed to add recipe to favorites.");
            }
        } else {
            return res.status(404).send("Recipe not found.");
        }
    } else {
        return res.redirect("/");
    }
};

module.exports = {
    generateRecipeHandler,
    search_result_get,
    recipe_page_get,
    saved_recipe_get,
    addto_favorites_get
};
