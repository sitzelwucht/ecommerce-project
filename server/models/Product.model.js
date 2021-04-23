const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
require('./Category.model.js')

let ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
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