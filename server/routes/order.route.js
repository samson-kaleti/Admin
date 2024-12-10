const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.get("/", orderController.listOrders); // List all orders
router.get("/:id", orderController.getOrderById); // Get an order by ID
router.post("/", orderController.createOrder); // Create a new order
router.get("/vendor/:vendorId", orderController.listOrdersByVendor); // List orders by vendor
router.delete("/:id", orderController.deleteOrder); // Delete an order by ID

module.exports = router;
