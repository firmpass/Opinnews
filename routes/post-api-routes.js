var db = require("../models");

module.exports = function(app) {
    console.log("post-api-route");
    app.get("/", function(req, res) {
        db.Post.findAll({})
        .then(function(dbPost) {
            var hbsObject = {
                posts: dbPost
            };
            console.log(hbsObject);
            res.render("index", hbsObject);
        });
    });
};