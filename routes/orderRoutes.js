const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addOrderItems, addPayment, capturePayment } = require('../controller/orderController');

router.post('/', protect, addOrderItems);
router.post('/create-payment',  addPayment);
router.post('/capture-payment',  capturePayment);


module.exports = {
    ordersRouter: router
}