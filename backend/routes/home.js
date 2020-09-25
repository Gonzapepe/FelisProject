const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
require('dotenv').config()

// Ruta Home
// De acceso privado

// * Controllers
const User = require('../controllers/User')
const user_login = User.userLogin
const search_contact = User.searchContact
const add_contact = User.addContact


// ! Info User Login
// ! Info Private Access
router.get('/', auth, (req, res) => user_login(req, res));

// ! Search Contacts
router.get('/users', (req, res) => search_contact(req, res));

// ! Add Contact
// ! Info Private Access
router.post('/contacts/:newContactId', auth, (req, res) => add_contact(req, res));


module.exports = router;