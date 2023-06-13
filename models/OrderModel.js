const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
    }],

    totalPrice: {
        type: Number,
        required: true
    },

    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    paymentMethods: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },

    taxPrice: {
        type: Number,
        default: 0.0,
        required: true,
    },

    shippingPrice: {
        type: Number,
        default: 0.0,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
        require: true,

    },
    paidAt: {
        type: Date,
    },

    status: {
        type: String,
        enum: ['placed', 'shipped', 'delivered'],
        default: 'placed'
    },
    delieverdAt: {
        type: Date,
    },

}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
