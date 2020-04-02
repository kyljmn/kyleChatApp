const express = require('express');
const router = express.Router();
const passport = require('../passport/index');
const middleware = require('../middleware');

router.post('/signup', middleware.checkAuthenticated, (req, res, next) => {
    passport.authenticate('signup', (error, user) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        }

        req.logIn(user, (error) => {
            if(error) {return res.status(500).json({
                message: error
            });}
            res.json(req.user);
        });
    })(req, res, next);
});

router.post('/login', middleware.checkAuthenticated, (req, res, next) => {
    passport.authenticate('login', (error, user) => {
        if(error) {
            return res.status(500).json({
                message: error.message
            });
        }

        req.logIn(user, (error) => {
            if(error) {return res.status(500).json({
                message: error
            });}
            res.json(req.user);
        });
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logOut();
    req.session = null;
    res.json({logout: true});
});

router.get('/test', (req, res, next) => {
    res.json({hello: 'hello'});
    console.log('hit');
})

module.exports = router;