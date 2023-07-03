const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { addOrderItems, addPayment, capturePayment, getOrders, getOrderByID, ordersDetails, ordersEachMonthDetails, productMostSell } = require('../controller/orderController');

router.get('/', protect, getOrders);
router.post('/', protect, addOrderItems);

router.get('/details', protect, adminOnly, ordersDetails);
router.get('/month-details', protect, adminOnly, ordersEachMonthDetails);
router.get('/products-most-sold', protect, adminOnly, productMostSell);


router.get('/:id', protect, getOrderByID);




// router.post('/create-payment',  addPayment);
// router.post('/capture-payment',  capturePayment);


module.exports = {
    ordersRouter: router
}