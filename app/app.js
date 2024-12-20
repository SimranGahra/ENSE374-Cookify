const express = require ( "express" );
const recipeController = require("./controller/recipeController");
const userController = require("./controller/userController");
const User = require("./model/user");

const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();


const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy Initialization
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect("mongodb://localhost:27017/Cookify", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

// Default Routes
app.get("/", (req, res) => {
    res.render("index"); 
});

app.get("/home", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home", { user: { username: req.user.username}}); 
     } else {
         res.redirect("/"); 
    }
});

// Recipe Routes
app.post("/generate-recipe", recipeController.generateRecipeHandler);
app.get("/search-result", recipeController.search_result_get);
app.get("/search-result/recipe-:recipeId", recipeController.recipe_page_get);
app.get("/saved-recipe", recipeController.saved_recipe_get);
app.get("/addto_favorites/:recipeId", recipeController.addto_favorites_get);

//auth routes
app.post("/register", userController.register_post);
app.post("/login", userController.login_post);
app.post("/logout", userController.logout_post);


// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);})
