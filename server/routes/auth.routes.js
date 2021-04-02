const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const UserModel = require('../models/User.model')


router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, password2 } = req.body
 
    if (!firstName || !lastName || !email || !password || !password2) {
        res.status(500).json({errorMessage: 'Please fill out all fields'})
    }

    if (password !== password2) {
        res.status(500).json({errorMessage: 'Passwords do not match'})
    }

    let salt = bcrypt.genSaltSync(10)
    let hashPw = bcrypt.hashSync(password, salt)

    UserModel.create({ firstName, lastName, email, password: hashPw })
    .then(user => { res.status(200).json(user) })
    .catch(err => {
        if (err.code === 11000) {
            res.status(500).json({
                errorMsg: 'email already registered'
            })
        }
        else {
            res.status(500).json({
                errorMsg: 'something went wrong'
            })
        }
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body

    UserModel.findOne({ email })
    .then(userData => {
        bcrypt.compare(password, userData.password)
        .then(isMatch => {
            if (isMatch) {
                userData.password = '****'
                req.session.loggedInUser = userDatares.status(200).json(userData)
            }
            else {
                res.status(500).json({ errorMsg: 'Login details incorrect'})
                return
            }
        })
        .catch(() => {
            res.status(500).json({ errorMsg: 'Invalid email format' })
            return
        })
    })
    .catch(err => {
        res.status(500).json({ errorMsg: 'Email not registered' })
        return
    })
})


module.exports = router