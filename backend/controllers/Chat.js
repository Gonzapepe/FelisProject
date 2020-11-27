const { Chat } = require('../database/user')
const mongoose = require('mongoose')

exports.CreateChat = async (req, res) => {
    const { user } = req.body
    const { id } = req.user

    const newChat = new Chat()

    newChat.participants.push(id)
    newChat.participants.push(user)

    await newChat.save((err) => {
        if (!err) {
            res.status(201).send("Chat created succesfully")
        }
    })
}

exports.NewMessage = async ( req, res ) => {
    const { id } = req.params
    const { message } = req.body
    const { id: user_id } = req.user

    await Chat.findByIdAndUpdate({ _id: id }, {
        $push: {
            messages: {
                id: mongoose.Types.ObjectId(),
                author: user_id,
                date: Math.round(+new Date()/1000),
                content: message
            }
        }
    }, { $upsert: true, $new: true })
}