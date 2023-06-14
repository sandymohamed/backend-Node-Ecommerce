const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        unique: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],

    total: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },



}, { timestamps: true });

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
