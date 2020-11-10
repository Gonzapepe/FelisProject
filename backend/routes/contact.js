const express = require('express');
const router = express.Router();
const Contact = require("../controllers/Contact");
const auth = require('../middleware/auth');

// ! PENDING CONTACT
router.put('/social/send/', auth, Contact.sendNotification);
router.delete('/delete', auth, Contact.removePendingContacts);

module.exports = router;