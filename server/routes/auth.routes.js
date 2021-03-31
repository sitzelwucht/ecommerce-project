const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const userModel = require('../models/User.model')


router.post('/signup', (req, res) => {
    const {firstName, lastName, email, password, password2} = req.body
})