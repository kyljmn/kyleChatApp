const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const mongoose = require('mongoose');
const User = require('../models/user');
const Room = require('../models/room');

router.post('/add/:id', middleware.authenticatedOnly, (req, res) => {
    console.log("Hit add " + req.params.id);
    User.findById(req.params.id).lean().exec((err, user) => {
        if (err) {
            res.json({message: err});
        } else {
            let newRoom = new Room({
                members: [{id: req.body._id, username: req.body.username}, {id: user._id, username: user.username}]
            });
            newRoom.save();
            console.log("added");
        }
    });
})

module.exports = router;