const express = require('express')
const Message = require('./../database/messages')

ingressMessage = async (messages) => {
    const { message, towardId, fromId } = messages

    const sender = new Message({
        message: message,
        towardId:towardId,
        fromId:fromId
    })

    return sender
}

module.exports = ingressMessage