const express = require('express')
const CategoryModel = require('../models/Category.model')
const router = express.Router()
const ProductModel = require('../models/Product.model')


router.post('/newproduct', (req, res) => {
    const { title, category, description, price, stock } = req.body

    ProductModel.create({ title, category, description, price, stock })
    .then(product => { res.status(200).json(product) })
    .catch(err => res.status(500).json(err))
})


router.post('/newcategory', (req, res) => {
    const { name } = req.body

    CategoryModel.create({ name })
    .then(category => { res.status(200).json(category) })
    .catch(err => res.status(500).json(err))
})


router.get('/categories', (req, res) => {
    CategoryModel.find()
    .then(categories => { res.status(200).json(categories) })
    .catch(err => res.status(500).json(err))
})


module.exports = router