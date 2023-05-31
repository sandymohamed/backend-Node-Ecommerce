const express = require('express');
const router = express.Router();
const ProductModel = require('../models/ProductModel');
const { getProducts, getProductByID } = require('../controller/productController')

router.get('/',getProducts )


router.get('/:id', getProductByID)


module.exports={
    productsRouter : router
}