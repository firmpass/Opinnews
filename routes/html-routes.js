// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = (app) => {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    //index route loads home.html
    app.get("/", (req, res) => {
        console.log("index route successful");
        res.render("index");
    });

    app.get("/login", (req, res) => {
        console.log("login route successful");
        res.sendFile(path.join(__dirname, "../views/login.handlebars"));
    });

    app.get("/user-post", (req, res) => {
        console.log("user-post route successful");
        res.sendFile(path.join(__dirname, "../views/user-post.handlebars"));
    });

    app.post('/user-post/submit', (req, res, next) => {
        res.redirect('/user-post');
        console.log('User post successful');
    });

};