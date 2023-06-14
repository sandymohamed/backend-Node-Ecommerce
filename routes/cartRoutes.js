const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getCartItems, getCartByID, addCartItems, deleteCart } = require('../controller/cartController');

router.get('/', protect, getCartItems);
router.get('/:id', protect, getCartByID);
router.post('/', addCartItems);
router.delete('/:id', deleteCart);



module.exports = {
    cartRouter: router
}