const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');
const asyncHandler = require('express-async-handler')


router.get('/', asyncHandler(async(req, res, next) => {
   
    const products = await ProductModel.find({})
   
    if (products) {
       return res.json(products)
    } else {
        res.status(404).json({ message: 'product not found!!' })
    }
}
))


router.get('/:id', asyncHandler(async(req, res, next) => {
    const products = await ProductModel.findById(req.params.id)

    if (products) {
        res.json(products)
    } else {
        res.status(404).json({ message: 'product not found!!' })
    }

}))


module.exports={
    productsRouter : router
}