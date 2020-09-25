const User = require('../database/user')

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// ! User Information
module.exports = {

 searchContact: async function (req, res) {
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
},

// ! Add Contacts
 addContact: async function (req, res) {
    try {
        const existentUser = await User.findById(req.user.id).select('-password')
        if(!existentUser) {
            res.json({ error: 'Debe iniciar sesión o registrarse.' })
        }
        const existentContact = await User.findById(req.params.newContactId).select('-password')
        if(!existentContact) {
            res.json({ error: 'El usuario al que quiere añadir no existe.' })
        }
        const newContact = {
            contact: req.params.id
        }
        existentUser.contacts.unshift(newContact)
        await existentUser.save()
        res.json(existentUser)
    } catch (err) {
        res.status(500).json({ error: err })
    }
},

// ! Info User login
 userLogin: async function (req, res) {
    try {
        console.log(req.socket)
        const data = await User.findById(req.user.id).select('-password')

        res.json({ data })
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
}