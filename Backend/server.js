const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product");
const CartItem = require("./models/cartItem");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cartRoutes = require("./routes/cart");
const Review = require("./models/Review");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch product by name
app.get("/api/products/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const product = await Product.findOne({ productName });
    if (!product) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Routes
app.use("/api/cart-data", cartRoutes);

// Delete a product by product name
app.delete("/api/products/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const product = await Product.findOneAndDelete({ productName });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post('/api/reviews', async (req, res) => {
  const { productId, name, email, rating, message } = req.body;
  const newReview = new Review({ productId, name, email, rating, message });

  try {
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/reviews/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId: mongoose.Types.ObjectId(productId) });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/cart", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/cart/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const cartItem = await CartItem.findOne({
      "product.productName": productName,
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(cartItem);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Route to delete a cart item by product name
app.delete("/api/cart/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const cartItem = await CartItem.findOneAndDelete({
      "product.productName": productName,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
