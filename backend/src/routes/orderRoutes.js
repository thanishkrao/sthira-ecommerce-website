// backend/src/routes/orderRoutes.js
const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new order (user must be logged in)
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/myorders", protect, getMyOrders);

// Get all orders (Admin only)
router.get("/", protect, admin, getAllOrders);

// Get order by ID (User + Admin)
router.get("/:id", protect, getOrderById);

// Update order to paid (User + Admin)
router.put("/:id/pay", protect, updateOrderToPaid);

// Update order to delivered (Admin only)
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

module.exports = router;
