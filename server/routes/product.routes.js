const express = require('express')
const CategoryModel = require('../models/Category.model')
const router = express.Router()
const ProductModel = require('../models/Product.model')


// GET

router.get('/categories', (req, res) => {
    CategoryModel.find()
    .then(categories => { res.status(200).json(categories) })
    .catch(err => res.status(500).json(err))
})

router.get('/bycategory/:category', (req, res) => {
    const categoryQuery = req.params.category
    ProductModel.find({ category: categoryQuery })
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => console.log(err))
    
})

router.get('/productsearch/', (req, res) => {
    const queryStr = req.query.input
    ProductModel.find({ title: new RegExp(queryStr, 'i')})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({msg: 'no results'})
    })
})


// POST
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


// DELETE

router.delete('/products/:prodId', (req, res) => {
    const id = req.params.prodId
    ProductModel.findByIdAndDelete(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'Problem occurred while deleting',
            message: err
        })
    })
})

// PATCH

router.patch('/products/:prodId', (req, res) => {
    const id = req.params.prodId
    const { title, description, price, stock, category } = req.body

    ProductModel.findByIdAndUpdate(id, {$set: {
        title: title,
        description: description,
        price: price,
        stock: stock,
        category: category
    }}, {new: true})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'Problem occured while updating',
            message: err
        })
    })
})


router.get('/getproduct/:prodId', (req, res) => {
    const id = req.params.prodId
    ProductModel.findById(id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


// fetch a JSON object with all products
router.get('/allproducts', (req, res) => {
    ProductModel.find()
    .then(result => {
        res.status(200).json(JSON.stringify(result))
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


module.exports = router