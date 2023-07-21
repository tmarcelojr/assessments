const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log(`Connected to Mongo`))

module.exports = mongoose