const express = require('express');
const login = require('./routes/login')
const morgan = require('morgan')
const mongoose = require('mongoose')
const register = require('./routes/register')
const home = require('./routes/home')
const Messages = require('./database/messages')
const User = require('./database/user')
const cors = require('cors')
const bodyParser = require('body-parser')
const contact = require('./routes/contact');
const chat = require('./routes/chat');
const url = require('url')
const WebSocketServer = require('websocket').server;
const Connections = require('./websocket/connections/Connections')
const jwt = require('jsonwebtoken');

require('dotenv').config()

const app = express();
const server = require('http').createServer(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(cors({ origin: true, credentials: true }))


// Conexion a base de datos
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))

db.once('open', () => {
    console.log('Base de datos conectada')
})

// Middleware
app.use(morgan('dev'))

// Rutas
app.use('/login', login);
app.use('/register', register);
app.use('/home', home);
app.use('/contact', contact);
app.use('/chat', chat);
const puerto = 3000 || process.env.PORT

server.listen(puerto, () => {
    console.log('Corriendo en el puerto: ', puerto)
});

// Create pool of connections
let connections = new Connections().getInstance()

let typing = []

const addToTyping = username => {
    typing.push(username)

    return typing
}

const removeFromTyping = username => {
    typing.filter(u => u !== username)

    return typing
}

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

wsServer.on('request', (request) => {
    request.accept(null, request.origin)
})

wsServer.on('connect', (conn) => {
    conn.on('message', message => {
        if( message.type === 'utf8' ) {
            const { EVENT_TYPE, PAYLOAD } = JSON.parse(message.utf8Data)

            switch(EVENT_TYPE) {
                case 'USER_CONNECTED': {
                    const { id } = PAYLOAD
                    connections.saveConnection(id, conn)
                    console.log(connections)
                    break
                }

                case 'USER_DISCONNECTED': {
                    const { id } = PAYLOAD
                    connections.removeConnection(id)    
                    break                
                }

                case 'NEW_MESSAGE': {
                    const { id, author, date, content, destination } = PAYLOAD
                    let destination_conn = connections.connections.find(connection => connection.id === destination)
                    console.log(connections)
                    console.log(destination_conn)
                    destination_conn.conn.sendUTF(PAYLOAD)
                    break
                }
                    
                case 'USER_TYPING': 
                    console.log(PAYLOAD)
                    break
                default:
                    break
            }
        }

    })
})

wsServer.on('close', (conn) => {

})

module.exports = app