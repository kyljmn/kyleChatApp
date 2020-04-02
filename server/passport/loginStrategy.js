const Strategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const loginStrategy = new Strategy({}, (username, password, done) => {
    User.findOne({ username: username}).exec((error, user) => {
        if(error) {return done({message: 'Internal server error', statusCode: 500}, null);}
        if(!user) {return done({message: 'Invalid username or password'}, null);}
        let isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return done({message: 'Invalid username or password'}, null);
        }
        done(null, user);

    });
});

module.exports = loginStrategy;