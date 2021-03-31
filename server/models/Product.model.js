const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

let ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    }
})

let ProductModel = model('product', ProductSchema)

module.exports = ProductModel