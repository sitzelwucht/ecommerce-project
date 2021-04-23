const { Schema, model } = require('mongoose')

let CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

let CategoryModel = model('category', CategorySchema)

module.exports = CategoryModel