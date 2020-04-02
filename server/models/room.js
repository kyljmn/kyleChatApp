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
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});

module.exports = mongoose.model('Room', roomSchema);