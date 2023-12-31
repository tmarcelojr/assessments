require('dotenv').config()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send(`Not Authorized`)
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            res.status(400).send(`Wrong credentials`)
        } else {
            user.loggedIn = true
            await user.save()
            const token = await user.generateAuthToken()
            res.json({ user, token })
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
exports.logoutUser = async (req, res) => {
    try {
        req.user.loggedIn = false
        await req.user.save()
        res.json(req.user)
    } catch (error) {
        res.status(400).json(`Logout unsuccessful`)
    }
}
exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const user = req.user
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        await req.user.deleteOne()
        res.json(`Successfully deleted ${req.user.email}`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}