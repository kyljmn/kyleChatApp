const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        username: String
    },
    body: String
});

module.exports = mongoose.model('Message', messageSchema);