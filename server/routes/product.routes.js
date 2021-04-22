const express = require('express')
const router = express.Router()
const ProductModel = require('../models/Product.model')


router.post('/newproduct', (req, res) => {
    const { title, category, description, price, stock } = req.body

    ProductModel.create({ title, category, description, price, stock })
    .then(product => { res.status(200).json(product) })
    .catch(err => res.status(500).json(err))
})


module.exports = router