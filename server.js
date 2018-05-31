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
const volleyball = require("volleyball");
const path = require("path");
//added userPosts for testing only.
const userPosts = require("./data/user-post");
var db = require('./models');


const app = express();
const PORT = process.env.PORT || 8081;

// Requiring our models for syncing 
// ***HERE***
let connection = new Sequelize('postDB', 'localhost', 'root',{
    dialect: 'mysql'
})

app.use(volleyball);
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Static directory
app.use(express.static(path.join(__dirname, "public")));


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
//Getting all userPosts
app.get('/userPosts', (req, res, next) => {
    console.log("returning all userPosts from user-posts.js");
    res.send(userPosts);
})
//Getting userPosts by "id"
app.get('/userPosts/:id', (req, res, next) => {
    var id = req.params.id;
    var query = req.query;
    var userpost = userPosts[id];
    var isEmptyQuery = Object.keys(query).length
    if (!isEmptyQuery) {
        res.send(userpost);
    } else {

    var responses = {}
    Object.keys(query).forEach((key) => {
        responses[key] = userpost[key]
    })
    //http://localhost:8081/userPosts/0?id&name&newPost <- Use in postman
    res.send(responses);
    }
})
//updating userpost
app.put('userPosts/:id', (req, res, next) => {
    var userpost = userPosts[req.params.id];
    console.log(req.body);
    Object.assign(userpost, req.body);
    res.send(userpost);
})

app.get('/login', (req, res) => {
    console.log("login route successful");
    res.render('../views/login.handlebars');
});

db.sequelize.sync().then(function() {    
    console.log("sequelize db sync connected.");
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
    // db.sync()
    //     .then(message => {
    //         console.log("and db is synced");
    //     })
    })
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



