const express = require('express')
const router = express.Router()


const LogIn = require('../controllers/LogIn');

router.post('/', LogIn.login);

module.exports = router;