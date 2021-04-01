const { findByIdAndUpdate } = require('../database/user')
const { User } = require('../database/user')

/*const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}*/

// ! User Information
exports.searchContact =  async (req, res) => {
    try {
        if(!req.query){
            return res.status(400).json({ error: 'No se realizó ninguna búsqueda' })
        }

        console.log('QUERY SEARCH', req.query.search)
        //const regex = new RegExp(escapeRegex(req.query.search))

        const user = await User.find({ "name": {$regex: req.query.search, $options: 'i' } }).select('-password')

        res.json(user)
        
    } catch (err) {
        res.status(500)
        console.log(err)
    }
}


// ! Info User login
 exports.userLogin =  async (req, res) => {
    try {
        const data = await User.findById(req.user.id).select('-password')
        
        res.json(data)
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

exports.getAllUsers = async ( req, res ) => {
    try {
        const You = await User.findOne({_id: req.user.id}).select('contacts')
        const AllUsersButYou = await  User.find({_id: {$ne: req.user.id}}).select('-password')
     
        let filteredContacts = []

        You.contacts.forEach(contacto => {
           filteredContacts =  AllUsersButYou.filter( user => user._id.toString() !== contacto.toString() )
        });
        
       res.json(filteredContacts)
    } catch (err) {
        res.status(500).json({ msg: err })
        console.log('Hubo un error: ', err)
    }
}

exports.changePhoto = async ( req, res ) => {
    try {
        const { file } = req
        const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: file.path }) 
        if(!updatedAvatar) {
            res.status(400).json({ error: 'Debes iniciar sesión para poder cambiar tu foto.' })
        }
        await updatedAvatar.save()
        res.json(updatedAvatar)
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

exports.getMyContacts = async (req, res) => {
    try {

        // Selecciono mis contactos
        const myContacts = await User.findById(req.user.id).select('contacts')
        if(!myContacts) {
            res.status(400).json({ error: 'Debes iniciar sesión para poder acceder a tus contactos.' })
        }
        //creo Array para almacenar la info de los contactos seleccionados mediante su id
        const contactInfoArray = []
        //Saco información de los contactos
        for await (const contactInfo of User.findById(myContacts.contacts).select('-password')) {
            contactInfoArray.push(contactInfo)
        }

        res.json(contactInfoArray)
    } catch (err) {
        res.status(500).json({ msg: err })
        console.log('Hubo un error: ', err)
    }
}

exports.retrieveInfo = async (req, res) => {
    try {
        
        const { id } = req.params
        if(!id) {
            res.status(400).json({ error: 'No existe ese usuario' })
                }
        const userInfo = await User.findById(id).select('-password')
        

        res.json(userInfo)
    } catch (err) {
        res.status(500).json({ msg: err })
        console.log('Hubo un error: ', err)
    }
}