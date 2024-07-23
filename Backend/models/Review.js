const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    rating: Number,
    message: String,
    date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;