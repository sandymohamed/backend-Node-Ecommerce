const express = require('express');
const router = express.Router();
const { getProducts, getProductByID, addNewProduct, editProduct, deleteProductByID, getProductByCategory, getProductByName, getProductByBrand, getProductByRate, getBrandsNames, getCategoriesNames, getnewProducts } = require('../controller/productController')
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('./multerConfig'); // Import the Multer configuration




router.get('/', getProducts)

router.get('/latest', getnewProducts)

router.get('/category/:category', getProductByCategory)

router.get('/name/:name', getProductByName)

router.get('/brand/:brand', getProductByBrand)

router.get('/rate/:rate', getProductByRate)

router.get('/all-brands', getBrandsNames)

router.get('/all-categories', getCategoriesNames)

router.get('/:id', getProductByID)

router.post('/', upload.single('image'),  addNewProduct);

router.put('/:id', upload.single('image'), adminOnly, editProduct);

router.delete('/:id', protect, adminOnly, deleteProductByID);





module.exports = {
  productsRouter: router
}