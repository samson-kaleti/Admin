const express = require("express");
const router = express.Router();
const vendorUserController = require("../controllers/vendoruser.controller");

// Create a new VendorUser
router.post("/vendor-users", vendorUserController.createVendorUser);

// Update a VendorUser by ID
router.put("/vendor-users/:id", vendorUserController.updateVendorUser);

// Get a VendorUser by ID
router.get("/vendor-users/:id", vendorUserController.getVendorUser);

// Delete a VendorUser by ID
router.delete("/vendor-users/:id", vendorUserController.deleteVendorUser);

// Get all VendorUsers by Vendor ID
router.get("/vendor-users/vendor/:vendorId", vendorUserController.getUsersByVendor);

module.exports = router;
