const User = require('../database/user')
const bcrypt = require('bcryptjs')


const validateInputFromRegister = require('../validation/register')


const randomTag = (tag) => {
    const newTag = Math.floor( 0000 + Math.random() * 9999)
    if(newTag === tag) {
        randomTag(newTag)
    }

    return newTag
}   

exports.register =  async (req, res) => {

    const {errors, isValid} = validateInputFromRegister(req.body)

    if(!isValid) {
        return res.status(400).json(errors)
    }

    if(req.body.password !== req.body.confirmPassword){
        errors.password = 'Las contraseñas no son iguales'
        res.status(400).json({ errors })
    }
    const { email, password, name } = req.body
  try {
      const existentUser = await User.findOne({ email })
    if(existentUser){
        errors.email = 'El email ya existe'
        return res.status(400).json({ errors })
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
}