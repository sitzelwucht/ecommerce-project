const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const userModel = require('../models/User.model')


router.post('/signup', (req, res) => {
    const {firstName, lastName, email, password, password2} = req.body

    if (!firstName || !lastname || !password || !password2) {
        res.status(500).json({errorMessage: 'Please fill out all fields'})
    }

    if (password !== password2) {
        res.status(500).json({errorMessage: 'Passwords do not match'})
    }
})