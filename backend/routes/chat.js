const express = require("express");
const router = express.Router();

// Middlewares
const auth = require('../middleware/auth');

// Controllers
const Chat = require('../controllers/Chat')

// ! Send Message
// ! Info Private Access
router.post('/', auth, Chat.CreateChat);
router.post('/:id/messages', auth, Chat.NewMessage);

module.exports = router
