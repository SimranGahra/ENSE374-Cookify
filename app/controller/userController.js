const express = require("express");
const passport = require("passport");
const User = require("../model/user"); // Import User schema

const router = express.Router();

// User Registration Route
router.post("/register", async (req, res) => {
    try {
        const user = await User.register(
            new User({ username: req.body.username }),
            req.body.password
        );
        passport.authenticate("local")(req, res, () => {
            console.log("User registered and authenticated:", user.username);
            res.redirect("/home");
        });
    } catch (err) {
        console.error("Error during registration:", err.message);
        res.status(500).send("Registration failed: " + err.message);
    }
});

// User Login Route
router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
}));

// User Logout Route
router.get("/logout", (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        console.log("User logged out successfully.");
        res.redirect("/");
    });
});

module.exports = router;
