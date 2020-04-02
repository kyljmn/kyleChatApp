const Strategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const signupStrategy = new Strategy({}, (username, password, done) => {
        User.findOne({ username: username}).exec((error, user) => {
            if(error) {return done({ message: 'Internal server error', statusCode: 500}, null);}
            if(user) {return done({message: 'User already exists'}, null);}
            let hashedPassword = bcrypt.hashSync(password, salt);
            let newUser = new User({
                username: username,
                password: hashedPassword,
            });
            newUser.save((error, user) => {
                if(error) {return done({ message: 'Internal server error'}, null);}
                return done(null, user);
            });
        });
    }
);

module.exports = signupStrategy;