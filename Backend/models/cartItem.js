const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    oldPrice: Number,
    weight: [String],
    catImg: String,
    discount: String,
    productImages: [String],
    rating: Number,
    description: String,
    category: String
});

const CartItemSchema = new mongoose.Schema({
    product: ProductSchema,
    quantity: Number,
    weight: String,
    color: String
});

module.exports = mongoose.model('CartItem', CartItemSchema);
