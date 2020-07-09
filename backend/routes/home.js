const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../database/user')
require('dotenv').config()

// Ruta Home
// De acceso privado

router.get('/', auth, async (req, res) => {
    try {
        const data = await User.findById(req.user.id).select('-password')
        

        res.json({ data: data })
    } catch (err) {
        res.status(500).json({ msg: 'Server error' })
    }
})

module.exports = router