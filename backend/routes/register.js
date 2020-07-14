const express = require('express')
const router = express.Router()
const User = require('../database/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, check, validationResult } = require('express-validator')
require('dotenv').config()

router.post('/', [
    check('name', 'Nombre es requerido').not().isEmpty(),
    check('email', 'Email es requerido').isEmail(),
    check('password', 'Debe tener 6 o más caracteres.').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    if(req.body.password !== req.body.confirmPassword){
        res.status(400).json({ error: 'Las contraseñas no son iguales.' })
    }
    const { email, password, name } = req.body
  try {
      const existentUser = await User.findOne({ email })
    if(existentUser){
        return res.status(400).json({ error: 'El usuario ya existe.' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword
    })

    await user.save()

    res.json({ msg: 'Se creó la cuenta exitosamente.' })

  } catch (err) {
      res.status(500).send('Error en el server')
      console.log(err)
  }
})

module.exports = router

