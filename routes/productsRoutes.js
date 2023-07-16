const express = require('express');
const router = express.Router();
const { getProducts, getProductByID, addNewProduct, editProduct, deleteProductByID, getProductByCategory, getProductByName, getProductByBrand, getProductByRate, getBrandsNames, getCategoriesNames } = require('../controller/productController')
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('./multerConfig'); // Import the Multer configuration




router.get('/', getProducts)

router.get('/category/:category', getProductByCategory)

router.get('/name/:name', getProductByName)

router.get('/brand/:brand', getProductByBrand)

router.get('/rate/:rate', getProductByRate)

router.get('/all-brands', getBrandsNames)

router.get('/all-categories', getCategoriesNames)

router.get('/:id', getProductByID)

router.post('/', upload.single('image'), protect, addNewProduct);

router.put('/:id', upload.single('image'), protect, adminOnly, editProduct);

router.delete('/:id', protect, adminOnly, deleteProductByID);





module.exports = {
  productsRouter: router
}