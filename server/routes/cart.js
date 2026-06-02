const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

// @GET /api/cart
router.get("/", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/cart  — add item
router.post("/", protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const existingItem = cart.items.find(
      (i) => i.product.toString() === productId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    await cart.save();
    await cart.populate("items.product");
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @PUT /api/cart/:productId  — update quantity
router.put("/:productId", protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === req.params.productId,
    );
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== req.params.productId,
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @DELETE /api/cart/:productId  — remove item
router.delete("/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(
      (i) => i.product.toString() !== req.params.productId,
    );
    await cart.save();
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @DELETE /api/cart  — clear cart
router.delete("/", protect, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
