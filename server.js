//Server.js - This file is the initial starting point for the Node/Express server.
// *************************
// *** Dependencies
// *************************

//Sets up the Express App
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const exphbs = require("express-handlebars");
const volleyball = require("volleyball");
const Sequelize = require("sequelize");
const path = require("path");
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const db = require('./models');


const PORT = process.env.PORT || 8080;
const routes = require('./routes/index.js');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        domain: 'canbat.auth0.com',
        clientID: '3IXjrTHrpfEpFLMsfASoLUhrU9SEDSAN',
        clientSecret: 'fUEE7l78zWDF1zrSnZpIkDfiaz062Y7_EZc7kJGa1xmR7oH9_Rg3XdXND2TKnQmw',
        callbackURL: 'http://localhost:8080/callback'
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
    }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

const app = express();


// Requiring our models for syncing
// ***HERE***
let connection = new Sequelize('postDB', 'localhost', 'root',{
    dialect: 'mysql'
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "public")));
app.use(volleyball);
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    session({
        secret: 'shhhhhhhhh',
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Check logged in
app.use(function(req, res, next) {
    res.locals.loggedIn = false;
    if (req.session.passport && typeof req.session.passport.user != 'undefined') {
        res.locals.loggedIn = true;
    }
    next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
require("./routes/post-api-routes")(app);
require("./routes/html-routes")(app);


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
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



