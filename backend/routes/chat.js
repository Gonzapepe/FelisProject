const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

// ! Send Message
// ! Info Private Access
router.get('/:FromId/:TowardId', auth, async (req, res) => {
    try {
        console.log(req.socket);
        /*req.socket.on('messagesChat',  message => {
            req.io.emit('messagesChat' , message)
        })*/
    } catch (error) {

    }
});

module.exports = router
