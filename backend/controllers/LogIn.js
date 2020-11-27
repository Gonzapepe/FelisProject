const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const validateInputFromLogin = require('../validation/login')

const { User } = require('../database/user')

exports.login = async (req, res) => {
    const {errors, isValid} = validateInputFromLogin(req.body);

    if(!isValid) {
        return res.status(400).json(errors)
    }

   

    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email: email })
        const comparedPassword = await bcrypt.compare(password, user.password)
        console.log('PASSWORD: ', user.password)
        const payload = {
            user: {
                id: user.id
            }
        }
       
    
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
}