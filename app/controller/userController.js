// Routes for User Registration
app.post("/register", (req, res) => {
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
});

// Routes for User Login
app.post("/login", passport.authenticate("local", {
    successRedirect: "home",
    failureRedirect: "/login"
}));


// Logout route
app.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect("/");
    });
});
