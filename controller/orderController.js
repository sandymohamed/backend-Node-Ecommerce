const asyncHandler = require('express-async-handler')
const OrderModel = require('../models/OrderModel');
const paypal = require('paypal-rest-sdk');
const { CheckoutNodeJssdk } = require('@paypal/checkout-server-sdk');


exports.getProducts = asyncHandler(async (req, res) => {

  const products = await OrderModel.find({})

  if (products) {
    return res.json(products)
  } else {
    res.status(404).json({ message: 'product not found!!' })
  }
}
)


exports.getProductByID = asyncHandler(async (req, res, next) => {
  const products = await OrderModel.findById(req.params.id)

  if (products) {
    res.json(products)
  } else {
    res.status(404).json({ message: 'product not found!!' })
  }

})

exports.addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    user,
    products,
    totalPrice,
    shippingAddress,
    paymentMethods,
    paymentResult,
    taxPrice,
    shippingPrice,
    isPaid,
    paidAt,
    status,
    deliveredAt,
  } = req.body;

  if (!products || products.length === 0) {
    res.status(400).json({ message: 'No order items' });
  } else {
    const order = new OrderModel({
      user: req.user._id,
      products,
      totalPrice,
      shippingAddress,
      paymentMethods,
      paymentResult,
      taxPrice,
      shippingPrice,
      isPaid,
      paidAt,
      status,
      deliveredAt,
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});


exports.addPayment = asyncHandler(async (req, res) => {
  const { total, currency, description, returnUrl, cancelUrl } = req.body;
  console.log('create',  total, currency, description, returnUrl, cancelUrl );
  try {

    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
      transactions: [
        {
          amount: {
            total,
            currency,
          },
          description,
        },
      ],
    };

    if (paymentData) {
      // const { links } = paymentData;
      // const approvalUrl = links.find(link => link.rel === 'approval_url');
      // res.redirect(returnUrl);
      res.json({ status: 'success', paymentData });
    }
    else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.log('Error in create payment:', err);
    res.status(400).json({ message: 'Invalid data!' });
  }

});


exports.capturePayment = asyncHandler(async (req, res) => {
  console.log('capture');

  const { paymentId, payerId, total, currency } = req.body;
  try {

    const captureData = {
      amount: {
        currency,
        total,
      },
    };

    if (captureData) {
      res.json({ status: 'success', captureData, paymentId, payerId });
    }
    else {
      res.json({ status: 'failed', captureData });
    }
  } catch (err) {
    console.log('Error in create payment:', err);
    res.status(400).json({ message: 'Invalid data!' });
  }

});
