const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateInputFromLogin(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if(!Validator.isEmail(data.email)) {
        errors.email = 'El email es inválido.'
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'El Email es requerido.'
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'La contraseña es requerida.'
    }

    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'La contraseña debe tener entre 6 y 30 caracteres.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}