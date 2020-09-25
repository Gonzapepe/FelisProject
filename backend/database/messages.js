const mongoose = require('mongoose');
const Schema = mongoose.Schema

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },

    towardId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    fromId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:false
    },

    date: {
        type: Date,
        default: Date.now()
    }
})


module.exports = Messages = mongoose.model('Messages', messageSchema)