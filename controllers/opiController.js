var express = require("express");
var router = express.Router();
var post = require("./model/post");


router.get("/", function(req, res) {
    post.selectAll(function(data) {
        var hbsObject = {
            posts: data
        };
        res.render("index", hbsObject);
    });
});

