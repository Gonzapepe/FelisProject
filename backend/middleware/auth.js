const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorization = (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token) {
        return res.status(400).json({ msg: 'No hay token, autorización denegada.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SecretToken)
        req.user = decoded.user;
        next()
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
}

module.exports = authorization