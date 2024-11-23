const recipeService = require("../services/recipeService.js");
const Recipe = require("../model/recipe");
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9); // Generates a short, unique string
}

// Generate Recipes Handler
async function generateRecipeHandler(req, res) {
    if (req.isAuthenticated()) {
        try {
            const { Ingredients: ingredients, maxPrepTime, dietaryPreference } = req.body;

            // Generate recipes from the service
            const recipes = await recipeService.generateRecipes(ingredients, maxPrepTime, dietaryPreference);

            // Add unique IDs to the recipes
            const recipesWithIds = recipes.map(recipe => ({
                ...recipe,
                generatedId: generateUniqueId(), // Assign a unique ID to each recipe
            }));

            // Store updated recipes in the session
            req.session.recipe = recipesWithIds;

            console.log("Generated Recipes:", recipesWithIds);
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
const recipe_page_get = async (req, res) => {
    if (req.isAuthenticated()) {
        const recipeId = req.params.recipeId;

        // Check session data first
        const sessionRecipe = req.session.recipe?.find(r => r.generatedId === recipeId);
        if (sessionRecipe) {
            return res.render("infopage", { 
                user: { username: req.user.username }, 
                data: sessionRecipe 
            });
        }

        // Check the database if not found in the session
        try {
            const recipe = await Recipe.findOne({ _id: recipeId });

            if (recipe) {
                return res.render("infopage", { 
                    user: { username: req.user.username }, 
                    data: recipe 
                });
            } else {
                res.status(404).send("Recipe not found");
            }
        } catch (error) {
            console.error("Error retrieving recipe:", error);
            res.status(500).send("Error retrieving recipe");
        }
    } else {
        res.redirect("/");
    }
};


// Saved Recipes Page
const saved_recipe_get = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
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
        const recipeId = req.params.recipeId;

        try {
            let recipe;

            // Check if the recipe is already in the database
            if (!isNaN(recipeId)) {
                // Handle saved recipes (MongoDB)
                recipe = await Recipe.findOne({ _id: Number(recipeId) });
            } else {
                // Handle API-generated recipes
                recipe = req.session.recipe.find(r => r.generatedId === recipeId);
            }

            if (!recipe) {
                return res.status(404).send("Recipe not found");
            }

            if (!recipe._id) {
                // Save API recipe to the database
                const newRecipe = new Recipe({
                    _id: Date.now(), // Generate a unique ID for the database
                    userId: req.user._id,
                    name: recipe.name,
                    description: recipe.description,
                    ingredients: recipe.ingredients,
                    method: recipe.method,
                    prep_time: recipe.prep_time,
                    calories: recipe.calories,
                    meal_type: recipe.meal_type,
                    isFavorited: true, // Set as favorited
                });
                await newRecipe.save();
                console.log("New recipe added to favorites:", newRecipe);
            } else if (!recipe.isFavorited) {
                // Update existing recipe
                recipe.isFavorited = true;
                recipe.userId = req.user._id;
                await recipe.save();
                console.log("Recipe marked as favorited:", recipe);
            }

            // Reflect the update in the session if it's an API recipe
            if (req.session.recipe) {
                req.session.recipe = req.session.recipe.map(r =>
                    r.generatedId === recipeId ? { ...r, isFavorited: true } : r
                );
            }

            res.redirect(`/search-result/recipe-${recipeId}`);
        } catch (error) {
            console.error("Error adding recipe to favorites:", error);
            res.status(500).send("Error adding recipe to favorites");
        }
    } else {
        res.redirect("/");
    }
};






module.exports = {
    generateRecipeHandler,
    search_result_get,
    recipe_page_get,
    saved_recipe_get,
    addto_favorites_get
};
