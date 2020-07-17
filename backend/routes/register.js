const express = require('express')
const router = express.Router()
const User = require('../database/user')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
require('dotenv').config()

const randomTag = (tag) => {
    const newTag = Math.floor( 0000 + Math.random() * 9999)
    if(newTag === tag) {
        randomTag(newTag)
    }

    return newTag
}   

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
        return res.status(400).json({ error: 'El email ya existe.' })
    }

    let tag = Math.floor(10000 + Math.random() * 99999)
    const existentTag = await User.find({ tag })
    if(existentTag.length) {
        tag = randomTag(tag)
        return tag
    }
    console.log(tag) 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        tag: tag
    })

    await user.save()

    res.json({ msg: 'Se creó la cuenta exitosamente.' })

  } catch (err) {
      res.status(500).send('Error en el server')
      console.log(err)
  }
})

module.exports = router