const asyncHandler = require('express-async-handler')
const ProductModel = require('../models/ProductModel');


exports.getProducts = asyncHandler(async (req, res) => {

    const products = await ProductModel.find({})

    if (products) {
        return res.json(products)
    } else {
        res.status(404).json({ message: 'product not found!!' })
    }
}
)


exports.getProductByID = asyncHandler(async (req, res, next) => {
    const products = await ProductModel.findById(req.params.id)

    if (products) {
        res.json(products)
    } else {
        res.status(404).json({ message: 'product not found!!' })
    }

})


