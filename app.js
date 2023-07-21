require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/api/users.js')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)

module.exports = app