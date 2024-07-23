const express = require("express");
const router = express.Router();
const CartItem = require("../models/cartItem");

// Add other cart-related routes here...

// Add an item to the cart
router.post("/", async (req, res) => {
  const { product, quantity } = req.body;

  // Validate the input
  if (!product || !quantity) {
    return res
      .status(400)
      .json({ message: "Product and quantity are required" });
  }

  // Create a new cart item
  const newCartItem = new CartItem({ product, quantity });

  try {
    // Save the cart item to the database
    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
