const express = require('express');
const router = express.Router();
const { getProducts, getProductByID, addNewProduct, editProduct, deleteProductByID, getProductByCategory, getProductByName, getProductByBrand, getProductByRate, getBrandsNames, getCategoriesNames } = require('../controller/productController')
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/authMiddleware');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original filename for the uploaded file
  }
});


// Create Multer instance
const upload = multer({ storage: storage });



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