const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Stripe = require("stripe");
const crypto = require("crypto");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { protect } = require("../middleware/auth");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ─── RAZORPAY ────────────────────────────────────────────────

// @POST /api/payment/razorpay/create-order
router.post("/razorpay/create-order", protect, async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise (INR × 100)
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/payment/razorpay/verify
router.post("/razorpay/verify", protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Create order in DB
    const order = await Order.create({
      ...orderData,
      user: req.user._id,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: { id: razorpay_payment_id, status: "paid" },
    });

    // Clear cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json({ order, message: "Payment successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── STRIPE ──────────────────────────────────────────────────

// @POST /api/payment/stripe/create-intent
router.post("/stripe/create-intent", protect, async (req, res) => {
  try {
    const { amount, currency = "inr" } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { userId: req.user._id.toString() },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── COD ─────────────────────────────────────────────────────

// @POST /api/payment/cod
router.post("/cod", protect, async (req, res) => {
  try {
    const { orderData } = req.body;
    const order = await Order.create({
      ...orderData,
      user: req.user._id,
      isPaid: false,
      paymentMethod: "cod",
    });
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
