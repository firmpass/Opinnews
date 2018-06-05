var post = require("../models/post");

module.exports = function (app) {
    app.get("/", function(req, res) {
            res.render("index", req.body);
    });
};
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

};