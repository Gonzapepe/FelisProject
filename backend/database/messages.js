const mongoose = require('mongoose');
const Schema = mongoose.Schema

const registerSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    towardId: {
        type: String,
        unique: false,
        required: true
    },
    fromId: {
        type: String,
        required: true,
        unique:false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


module.exports = Messages = mongoose.model('Messages', registerSchema)