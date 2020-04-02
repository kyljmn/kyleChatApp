const User = require("../models/user");
const Room = require('../models/room');

const middlewareObj = {};

middlewareObj.checkAuthenticated = (req, res, next) => {
    if(req.user) { return res.json({message: "You are already logged in"}); }
    next();
}

middlewareObj.authenticatedOnly = (req, res, next) => {
    if(req.user) { return res.json({message: "You need to log in for this action"}); }
    next();
}

module.exports = middlewareObj;
