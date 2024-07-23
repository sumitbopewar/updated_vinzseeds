const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
    productName: String,
    price: String,
    oldPrice: String,
    weight: [Number],
    catImg: String,
    discount: String,
    category: String,
    productImages: [String],
    rating: Number,
    description: String
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
