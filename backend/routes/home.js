const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../database/user')
const { check, validationResult } = require('express-validator')
require('dotenv').config()

// Ruta Home
// De acceso privado

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.get('/', auth, async (req, res) => {
    try {
        const data = await User.findById(req.user.id).select('-password')


        res.json({ data: data })
    } catch (err) {
        res.status(500).json({ msg: 'Server error' })
    }
})

router.get('/add', async (req, res) => {
    try {
        if(!req.query){
            return res.status(400).json({ error: 'No se realizó ninguna búsqueda' })
        }
        const regex = new RegExp(escapeRegex(req.query.search))

        const user = await User.find({ "name": regex }).select('-password')

        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router