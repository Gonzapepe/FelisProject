const mongoose = require('mongoose');
const Schema = mongoose.Schema

const registerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tag: {
        type: Number,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    contacts: [{
        contact: {
        type: Schema.Types.ObjectId,
        unique: true,
    }
    }],
})

module.exports = User = mongoose.model('User', registerSchema)

