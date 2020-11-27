const express = require('express');
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') +  file.originalname)
    }
}) 

const fileFilter = (req, file, cb) => {
    
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true)
    } else {
        cb(null, false)
    }

    
    
}

const upload = multer({
     storage: storage, 
    limits: {
    fileSize: 1024*1024 * 10
    },
    fileFilter: fileFilter
})

const auth = require('../middleware/auth')
require('dotenv').config()

// Ruta Home
// De acceso privado

// * Controllers
const User = require('../controllers/User')



// ! Info User Login
// ! Info Private Access
router.get('/', auth,  User.userLogin);

// ! Search Contacts
router.get('/users', User.searchContact);

// ! Receive all Users
// ! Private access
router.get('/all-users', auth,  User.getAllUsers)
// ! Receive all Users Id's
// ! Private access
router.get('/contacts', auth, User.getMyContacts)
// ! Retrieve info from user
router.get('/:id', auth, User.retrieveInfo)

router.put('/photo', upload.single('avatar'), auth, User.changePhoto)


module.exports = router;