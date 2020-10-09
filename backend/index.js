const express = require('express');
const app = express();
const login = require('./routes/login')
const morgan = require('morgan')
const mongoose = require('mongoose')
const register = require('./routes/register')
const home = require('./routes/home')
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const Messages = require('./database/messages')
const User = require('./database/user')
const cors = require('cors')
const bodyParser = require('body-parser')
const contact = require('./routes/contact');
const chat = require('./routes/chat');
require('dotenv').config()


io.on('connection' , socket => {
    console.log('Socket connection')
    console.log('Cliente connected to '+ socket.id)
    app.use((req, res, next) => {
        req.socket = socket
        next()
    })
    socket.on('sendId', mongoId => {
        socket.id = mongoId
        console.log('mongo: ', mongoId)
        console.log('socket: ', socket.id)
    })
    socket.on('messagesChat' , (message) => {
        io.emit('messagesChat' , message)
    });


});

//settings
//hacer accesible socket.io desde las rutas
app.use((req, res, next) => {
    req.io = io
    next();
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }))

//conexion a base de datos
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))

db.once('open', () => {
    console.log('Base de datos conectada')
})

//middleware
app.use(morgan('dev'))
//rutas
app.use('/login', login);
app.use('/register', register);
app.use('/home', home);
app.use('/contact', contact);
app.use('/chat', chat);
const puerto = 3000 || process.env.PORT

server.listen(puerto, () => {
    console.log('Corriendo en el puerto: ', puerto)
});

module.exports =  app ;