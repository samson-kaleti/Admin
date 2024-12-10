const express = require("express");
const { signup, login } = require("../controllers/auth.controller")
const validateRequest = require('../middleware/validateRequest')

const router = express.Router();

router.post("/signup", validateRequest(["email", "first_name", "last_name", "password"]), signup);
router.post("/login", validateRequest(["email", "password"]), login);

module.exports = router;
