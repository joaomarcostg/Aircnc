const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const routes = require('./routes.js')


mongoose.connect('mongodb+srv://aircnc:aircnc@aircnc-oikab.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)


app.listen(3333)

