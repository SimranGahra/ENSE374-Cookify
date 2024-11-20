// Routes for User Registration
app.post("/register", (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                console.error(err);
                return res.send("Registration failed");
            }
            passport.authenticate("local")(req, res, () => {
                res.send("Successfully registered");
            });
        }
    );
});

// Routes for User Login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}));


// Logout route
app.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect("/");
    });
});
