const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
require('dotenv').config()

const RegisterUser = require('../controllers/Register');

router.post('/', [
    check('name', 'Nombre es requerido').not().isEmpty(),
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Debe tener 6 o más caracteres.').isLength({ min: 6 })
], (req, res) => RegisterUser(req, res));

module.exports = router;