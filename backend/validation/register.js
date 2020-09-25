const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateInputFromRegister(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.name = !isEmpty(data.name) ? data.name : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ''

    if(!Validator.isLength(data.name, { min: 4, max: 20 })) {
        errors.name = 'El nombre debe tener entre 4 y 20 caracteres.'
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'El nombre es requerido.'
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'El email es requerido.'
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'El email es inválido.'
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'La contraseña es requerida.'
    }

    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'La contraseña es requerida.'
    }

    if(Validator.isEmpty(data.confirmPassword)) {
        errors.password = 'Confirmar contraseña es requerida.'
    }

    if(!Validator.equals(data.password, data.confirmPassword)) {
        errors.password = 'Confirmar contraseña es requerida.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}