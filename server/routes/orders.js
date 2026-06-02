const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/adminOnly");

// @GET /api/orders/mine  — user's orders
router.get("/mine", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name images")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders  — Admin: all orders
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { orderStatus: status } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    res.json({ orders, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @PUT /api/orders/:id/status  — Admin: update status
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { orderStatus, trackingNumber } = req.body;
    const update = { orderStatus };
    if (trackingNumber) update.trackingNumber = trackingNumber;
    if (orderStatus === "delivered") update.deliveredAt = Date.now();

    const order = await Order.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
