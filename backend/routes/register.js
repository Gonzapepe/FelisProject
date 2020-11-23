const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
require('dotenv').config()

const RegisterUser = require('../controllers/Register');

router.post('/', RegisterUser.register);

module.exports = router;