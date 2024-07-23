const express = require('express');
const router = express.Router();
// const Product = require('../models/Product');
const Product = require('../models/product');  // Import the Product model

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('products/list', { products });
  });

// Render the form to add a new product
router.get('/add', (req, res) => {
    res.render('products/add');
});

// Add a new product
router.post('/add', async (req, res) => {
    const newProduct = new Product({
        productName: req.body.productName,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        // weight: req.body.weight.map(Number),
        catImg: req.body.catImg,
        discount: req.body.discount,
        category: req.body.category,
        productImages: req.body.productImages.split(','),
        rating: req.body.rating,
        description: req.body.description
    });
    await newProduct.save();
    res.redirect('/products');
    
});

// Render the form to edit a product
router.get('/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
});

// Edit a product
router.post('/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.productName = req.body.productName;
        product.price = req.body.price;
        product.oldPrice = req.body.oldPrice;
        // product.weight = req.body.weight.split(',').map(Number);
        product.catImg = req.body.catImg;
        product.discount = req.body.discount;
        product.category = req.body.category;
        product.productImages = req.body.productImages.split(',');
        product.rating = req.body.rating;
        product.description = req.body.description;
        await product.save();
    }
    res.redirect('/products');
});

// Delete a product
router.post('/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
});


// Route to get all products
router.get('/getdata', async (req, res) => {
    try {
        const products = await Product.find({});  // Find all documents in the collection
        res.json(products);  // Respond with the found products in JSON format
    } catch (err) {
        res.status(500).json({ error: err.message });  // Handle any errors
    }
});


module.exports = router;