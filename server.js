//Server.js - This file is the initial starting point for the Node/Express server.
// *************************
// *** Dependencies
// *************************

//Sets up the Express App
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const exphbs = require("express-handlebars");
const Sequelize = require("sequelize");

const app = express();
const PORT = process.env.PORT || 8081;

// Requiring our models for syncing 
// ***HERE***
let connection = new Sequelize('postDB', 'localhost', 'root',{
    dialect: 'mysql'
})
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
 
app.get('/', (req, res) => {
    console.log("index route successful");
    res.render('index');
});

app.get('/user-post', (req, res) => {
    console.log("user-post route successful");
    res.render('../views/user-post.handlebars');
});

// app.get('/user/:id', (req, res) => {
//     console.log ("Fetching user id: " + req.params.id)

//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         database: 'userDB'                                                                                                                                                                                                                                                                                                                                                                                                                                                            
//     })

//     connection.query("SELECT * From users", (err, row, fields) => {
//         console.log("I think we fetched users successfuly ")
//         res.json(rows)
//     })
// })

app.get('/login', (req, res) => {
    console.log("login route successful");
    res.render('../views/login.handlebars');
});
 
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});


