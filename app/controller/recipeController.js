const { session } = require("passport");
const recipeService = require("../services/recipeService.js");

async function generateRecipeHandler(req, res) {
    if (req.isAuthenticated()) {
        try {
            console.log("HELLO11");
            const ingredients = req.body.Ingredients;
            const maxPrepTime = req.body.maxPrepTime;
            const dietaryPreference = req.body.dietaryPreference;
            let recipe = await recipeService.generateRecipes(ingredients, maxPrepTime, dietaryPreference);
            JSON.stringify(recipe, null, 2);
    
            req.session.recipe = recipe; //adding the recipe to the session varible so this API can be used in other part of webpage 
    
            console.log("ALLL RECIPIES");
            console.log(recipe);
            console.log("1IST");
    
            console.log(recipe[0]);
    
    
            return res.render("results", { user: { username: req.user.username }, data: recipe });

        
    
           
        } catch (error) {
            console.error("Error generating recipe:", error);
            res.status(500).json({ error: "Failed to generate recipe" });
        }

     } else {
         res.redirect("/"); 
    }
   
}


const recipe_result_get =  (req, res) => {

    const recipeId = parseInt(req.params.recipeId); 
    console.log("H!!!!");
    const recipe = req.session.recipe[recipeId];
    
   
    console.log(recipe );

    if(recipe)
        {
            console.log("H!!!!!!!!!");
            res.render("infopage", { user: { username: req.user.username }, data: recipe });

        }
        else
        {
            res.status(500).json({ error: "Failed to generate recipe" });
        }

   


   
};


const saved_recipe_get = (req, res) =>
    {
        return res.render("results", { user: { username: req.user.username }, data: req.session.recipe });


    }
module.exports = { 
    generateRecipeHandler,
    recipe_result_get,
    saved_recipe_get

 };
