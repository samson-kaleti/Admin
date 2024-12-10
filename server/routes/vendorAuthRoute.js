const express = require("express");
const router = express.Router();
const vendorAuthController = require("../controllers/vendorAuthController");

/**
 * POST /api/auth/login
 * Login a vendor or vendor user and return a token.
 */
router.post("/login", vendorAuthController.login);
router.post("/reset-password", vendorAuthController.resetPassword);

module.exports = router;
