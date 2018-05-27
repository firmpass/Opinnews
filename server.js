//Server.js - This file is the initial starting point for the Node/Express server.
// *************************
// *** Dependencies
// *************************

//Sets up the Express App
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const exphbs = require("express-handlebars");
const sequelize = require("sequelize");


const app = express();
const PORT = process.env.PORT || 8081;

// Requiring our models for syncing 
// ***HERE***

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());


// Static directory
app.use(express.static("public"));


// Routes 
// ======================================================
// require("./routes/html-routes.js")(app);
// require("./routes/*****")(app);
// require("./routes/*****")(app);
// require("./routes/*****")(app);

// ======================================================

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('index');
});
 
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});


