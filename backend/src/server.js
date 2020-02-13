const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes.js')


mongoose.connect('mongodb+srv://aircnc:aircnc@aircnc-oikab.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const app = express()
app.use(express.json())
app.use(routes)


app.listen(3333)

