const express = require('express');
const router = express.Router();
const Contact = require("../controllers/Contact");
const auth = require('../middleware/auth');

router.get('/', auth, Contact.contacts)

module.exports = router;