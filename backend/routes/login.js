const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../database/user')
const bcrypt = require('bcryptjs')
require('dotenv').config()
// El Login
router.post('/', [
    check('email', 'Debes ingresar un email.').isEmail(),
    check('password', 'La contraseña debe tener 6 o más letras').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        const comparedPassword = await bcrypt.compare(password, user.password)
        const payload = {
            user: {
                id: user.id
            }
        }
        console.log(payload)

        if(comparedPassword) {
            jwt.sign(payload, process.env.SecretToken, (err, token) => {
                if(err) throw err

                res.json({ token: token })
            })
        }
    } catch (err) {
        res.status(500).send('Error del server')
        console.log(err)
    }
})

module.exports = router;