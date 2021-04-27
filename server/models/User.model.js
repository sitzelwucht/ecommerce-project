const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

let UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    postCode: {
        type: String,
    },
    city: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

let UserModel = model('user', UserSchema)

module.exports = UserModel