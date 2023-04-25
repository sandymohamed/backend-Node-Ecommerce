const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,

    },
},
{    timestamps: true}
);


const Product = mongoose.model('product', productSchema);

module.exports = Product;
