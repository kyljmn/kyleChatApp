const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room: String,
    members: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }],
    messages: [{
        sender: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message"
            },
            username: String
        },
        body: String   
    }]
});

module.exports = mongoose.model('Room', roomSchema);