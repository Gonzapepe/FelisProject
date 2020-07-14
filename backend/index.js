const express = require('express');
const app = express();
const login = require('./routes/login')
const morgan = require('morgan')
const mongoose = require('mongoose')
const register = require('./routes/register')
const home = require('./routes/home')
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


//socket

io.on('connection' , socket => {
    console.log('Socket connection')

    socket.on('messagesChat' , (messages)=>{

        io.emit('messagesChat', messages)
        console.log(messages)
    })
})


//settings

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }))

//conexion a base de datos
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))

db.once('open', () => {
    console.log('Base de datos conectada')
})

//middleware
app.use(morgan('dev'))
//rutas
app.use('/login', login)
app.use('/register', register)
app.use('/home', home)
const puerto = 3000 || process.env.PORT

server.listen(puerto, () => {
    console.log('Corriendo en el puerto: ', puerto)
});

module.exports =  app ;