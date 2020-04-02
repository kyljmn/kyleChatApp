const passport = require('passport');

const User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
passport.deserializeUser(function(username, done) {
    User.findOne({username: username}).exec((error, user) => {
      done(error, user);
    });
  });

const signupStrategy = require('./signupStrategy');
const loginStrategy = require('./loginStrategy');

passport.use('signup', signupStrategy);
passport.use('login', loginStrategy);

module.exports = passport;