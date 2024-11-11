const express = require ( "express" );

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 
// a common localhost test port
const port = 3000; 

// body-parser is now built into express!
app.use( express.urlencoded({ extended: true }) ); 
app.set( "view engine", "ejs" );

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
    
});