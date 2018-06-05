// routes/index.js
const express = require("express");
const userPosts = require("../data/user-post");
const passport = require("passport");
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();

const env = {
    AUTH0_CLIENT_ID: '3IXjrTHrpfEpFLMsfASoLUhrU9SEDSAN',
    AUTH0_DOMAIN: 'canbat.auth0.com',
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback'
};

/* GET home page. */
router.get('/', ensureLoggedIn(), function(req, res, next) {
    res.render('index');
});

// Perform the login
router.get('/login', passport.authenticate('auth0', {
        clientID: env.AUTH0_CLIENT_ID,
        domain: env.AUTH0_DOMAIN,
        redirectUri: env.AUTH0_CALLBACK_URL,
        responseType: 'code',
        audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
        scope: 'openid'
    }),
    function(req, res) {
        res.redirect("/");
    }
);

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/callback',
    passport.authenticate('auth0', {
        failureRedirect: '/failure'
    }),
    function(req, res) {
        res.redirect(req.session.returnTo || '/');
    }
);

router.get('/failure', function(req, res) {
    console.log("FAIL");
    res.redirect("/");
});

router.get('/main', ensureLoggedIn(), (req, res) => {
    console.log("user-post route successful");
    res.render('../views/layouts/main.handlebars');
});
//Getting all userPosts
router.get('/main', ensureLoggedIn(), (req, res, next) => {
    console.log("returning all userPosts from user-posts.js");
    res.send(userPosts);
});

//Getting userPosts by "id"
router.get('/main/:id', ensureLoggedIn(), (req, res, next) => {
    const id = req.params.id;
    const query = req.query;
    const userpost = userPosts[id];
    const isEmptyQuery = Object.keys(query).length;
    if (!isEmptyQuery) {
        res.send(userpost);
    } else {

        let responses = {};
        Object.keys(query).forEach((key) => {
            responses[key] = userpost[key]
        });
        //http://localhost:8080/userPosts/0?id&name&newPost <- Use in postman
        res.send(responses);
    }
});
//updating userpost
router.put('main/:id', ensureLoggedIn(), (req, res, next) => {
    const userpost = userPosts[req.params.id];
    console.log(req.body);
    Object.assign(userpost, req.body);
    res.send(userpost);
});


module.exports = router;