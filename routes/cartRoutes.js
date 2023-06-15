const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getCartItems, getCartByID, addCartItems, deleteCart, getCartByUser } = require('../controller/cartController');

router.get('/', protect, getCartItems);
router.get('/:id', protect, getCartByID);
router.get('/user/:user', protect, getCartByUser);
router.post('/', addCartItems);
router.delete('/:user', deleteCart);



module.exports = {
    cartRouter: router
}