const express = require('express');
const app = express.Router();
const Messages = require('./../database/messages')
const User = require('../database/user');
const { findOne } = require('../database/user');


app.get('/:id', async (req, res) => {
    const { id } = req.params
    try {

    const totalMessages
    = await Messages.
    find().
    where('towardId').equals(id).
    where('fromId').equals(id)



    } catch (err) {
        res.status(500).json({ err: err })
    }

})
