const { findByIdAndUpdate } = require('../database/user')
const User = require('../database/user')

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

        res.json({ data })
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

exports.getAllUsers = async ( req, res ) => {
    try {
       const AllUsersButYou = await  User.find({_id: {$ne: req.user.id}}).select('-password')
       
       res.json(AllUsersButYou)
    } catch (err) {
        res.status(500).json({ msg: err })
        console.log('Hubo un error: ', err)
    }
}

exports.changePhoto = async ( req, res ) => {
    try {
        console.log('REQ FILE: ', req.file)
        const { file } = req
        const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: file.path }) 
        await updatedAvatar.save()
        res.json(updatedAvatar)
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}