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
    
    avatar: {
        type: String,
        default: 'uploads\\default.jpg'
    },
    estado: {
        type: String,
        default: 'disponible',
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    },

    pendingContacts: [{  
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    addedByYou: [{  
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    contacts: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const chatSchema = new Schema({
    messages: {
        type: Array,
        default: []
    },

    participants: {
        type: Array,
        default: []
    }
})

module.exports = {
    User: mongoose.model('User', registerSchema),
    Chat: mongoose.model('Chat', chatSchema)
}



