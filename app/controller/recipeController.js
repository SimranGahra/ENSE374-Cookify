const { session } = require("passport");
const recipeService = require("../services/recipeService.js");
const recipe = require("../model/recipe");

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
    
    
            return res.redirect("/search-result");

        
    
           
        } catch (error) {
            console.error("Error generating recipe:", error);
            res.status(500).json({ error: "Failed to generate recipe" });
        }

     } else {
         res.redirect("/"); 
    }
   
}
const  search_result_get = (req,res) =>{

    if(req.isAuthenticated())
        {
            return res.render("results", { user: { username: req.user.username }, data: req.session.recipe });
        }
    else
    {
        return res.redirect("/");
    }


    

}
const recipe_page_get =  (req, res) => {

    if (req.isAuthenticated()) {

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
    } else {
        res.redirect("/"); 
   }

   


   
};


const saved_recipe_get = (req, res) =>
    {
        if (req.isAuthenticated()) {

        // TODO:
        //do a db query to find the users recipie.
        // you might need to figure out a way on how to query only those recpies that are saved to that speicifc user
        // might need to something similar to table joins like it is SQL referencing the recipies based on if the user id is in the recipie schema
        // once you do that you can res.render to savedrecipies and change the data:req.session.recipie to the actual array of recipies
        return res.render("savedrecipes", { user: { username: req.user.username }, data: req.session.recipe });
        
    } else {
        res.redirect("/"); 
   }

        

    }

    const addto_favorites_get = (req,res) =>{
        if(req.isAuthenticated())
            {
                const recipeId = parseInt(req.params.recipeId); 
                const recipe = req.session.recipe[recipeId];

            
                console.log(recipe);
                console.log(recipeId);


                //TODO
                //ok now you will take this recipie JSON and extract each of the attributes like 
                //recipie.name ECT and add it to the DB be sure to add the isfavoite attribte 

                console.log("ADDED RECIPIE TO FAVOOTIES");

                return res.redirect("/search-result");


                
                

            } else {
                res.redirect("/"); 
           }
            
    }
module.exports = { 
    generateRecipeHandler,
    search_result_get,
    recipe_page_get,
    saved_recipe_get,
    addto_favorites_get

 };
