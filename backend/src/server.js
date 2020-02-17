const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes.js')

const app = express()

mongoose.connect('mongodb+srv://aircnc:aircnc@aircnc-oikab.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {}

io.on('connection', socket => {
    
    const {user_id} = socket.handshake.query
    
    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3333)

