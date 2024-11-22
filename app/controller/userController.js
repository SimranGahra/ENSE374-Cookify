
const passport = require("passport");
const User = require("../model/user");

// User Registration Route
const register_post = (req, res) => {
    User.register({ username : req.body.username }, 
        req.body.password, 
        ( err, user ) => {
    if ( err ) {
    console.log( err );
        res.redirect( "/" );
    } else {
        passport.authenticate( "local" )( req, res,async () => {
        return res.render("home", { user: { username: req.user.username}});
    });
}});
}

const login_post = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/"
    })(req, res, next);
};

// User Logout Route
const logout_post = (req, res, next) => {
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
    logout_post,
};