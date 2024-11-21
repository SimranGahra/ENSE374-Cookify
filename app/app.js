const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const userController = require("./controller/userController");
const User = require("./model/user");

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

// Routes
app.use("/", userController);

mongoose.connect("mongodb://localhost:27017/Cookify", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.set("view engine", "ejs");
app.use(express.static("public"));

// Default Routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/reviews", (req, res) => {
    res.render("reviews");
});

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.post("/search-result", (req, res) => {
    res.sendFile(__dirname + "/views/results.html");
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
