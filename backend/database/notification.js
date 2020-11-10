const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotifySchema = new Schema({
    name : {
        type: String,
        required: true,
    },

    sendTo: [{
        type: mongoose.Types.ObjectId, 
        required: true,
        ref: 'User'
    }],

    sendFrom: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }],

    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Notification', NotifySchema);
