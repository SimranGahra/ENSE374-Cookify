const express = require("express");
const passport = require("passport");
const User = require("../model/user");
const app = express();

// User Registration Route
const register_post = async (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("home");
                });
            }
        }
    );
};

const login_post = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/"
    })(req, res, next);
};

// User Logout Route
const logout_get = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        console.log("User logged out successfully.");
        res.redirect("/");
    });
};

module.exports = {
    register_post,
    login_post,
    logout_get
};