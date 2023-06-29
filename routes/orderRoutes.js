const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addOrderItems, addPayment, capturePayment, getOrders, getOrderByID, ordersDetails, ordersEachMonthDetails, productMostSell } = require('../controller/orderController');

router.get('/', protect, getOrders);
router.post('/', protect, addOrderItems);

router.get('/details', protect, ordersDetails);
router.get('/month-details', protect, ordersEachMonthDetails);
router.get('/products-most-sold', protect, productMostSell);


router.get('/:id', protect, getOrderByID);




// router.post('/create-payment',  addPayment);
// router.post('/capture-payment',  capturePayment);


module.exports = {
    ordersRouter: router
}