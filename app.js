require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/api/users.js')
const quizRoutes = require('./routes/api/quizzes.js')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/quizzes', quizRoutes)

module.exports = app