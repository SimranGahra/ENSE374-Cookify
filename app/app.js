const express = require ( "express" );
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
require("dotenv").config();

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 
// a common localhost test port
const port = 3000; 

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/Cookify", {
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


// body-parser is now built into express!

app.use( express.urlencoded({ extended: true }) ); 
app.set( "view engine", "ejs" );
//to use static files like css and js 
app.use(express.static("public"))


// Simple server operation
app.listen ( port, () => {
    // template literal
    console.log ( `Server is running on http://localhost:${port}` );
});

app.get( "/", ( req, res ) => {
    console.log( "A user is accessing the login/register route" );
    res.sendFile( __dirname + "/index.html" );
});

app.get( "/reviews", ( req, res ) => {
    console.log( "A user is accessing the reviews route using get" );
    res.render( "reviews" ); //pass data to EJS from the Database here
});

app.post( "/register", ( req, res ) => {
    console.log(req.body);
});

app.post( "/login", ( req, res ) => {
    console.log(req.body)
    res.redirect("home")

    //here we will be adding the database connection and checking if the user exists in database 

    //after checking we will send ejs file for the homepage
    res.redirect("home")
    
});


app.get("/home", (req, res) =>{

    res.sendFile(__dirname + "/views/home.html")
    console.log(req.body);


})



app.post("/search-result", (req, res) =>{

    console.log(req.body);

    res.sendFile(__dirname + "/views/results.html")


})