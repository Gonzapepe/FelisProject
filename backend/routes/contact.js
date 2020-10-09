const express = require('express');
const router = express.Router();
const Contact = require("../controllers/Contact");
const auth = require('../middleware/auth');

router.post('/', auth, Contact.contacts);
router.delete('/delete', auth, Contact.delete);

module.exports = router;