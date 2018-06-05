var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Post.findAll({
            order: [['createdAt', 'DESC']]
        })
            .then(function (dbPost) {
                var hbsObject = {
                    posts: dbPost
                };
                res.render("index", hbsObject);
            });
    });

    app.post("/api/posts", function (req, res) {
        db.Post.create({
            user: req.body.user,
            body: req.body.body,
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.put("/api/posts/:id/true", function (req, res) {
        db.Post.findOne(
            {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                return dbPost.increment('legitNews');
            })
            .then(function (dbPost) {
                return dbPost.reload();
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });


    });

    app.put("/api/posts/:id/fake", function (req, res) {
        db.Post.findOne(
            {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                return dbPost.increment('fakeNews');
            })
            .then(function (dbPost) {
                return dbPost.reload();
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });


    });

    app.put("/api/posts/:id/questionable", function (req, res) {
        db.Post.findOne(
            {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPost) {
                console.log("this is the one:" + req.params.id);
                return dbPost.increment('seemsLegitNews', {
                    where: {
                        id: req.params.id
                    }
                });
            })
            .then(function (dbPost) {
                return dbPost.reload();
            })
            .then(function (dbPost) {
                res.json(dbPost);
            });


    });
};