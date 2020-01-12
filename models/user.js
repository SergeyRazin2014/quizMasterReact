const mongoose = require('mongoose');;


const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const eventModel = mongoose.model('User', userSchema);

module.exports = eventModel;