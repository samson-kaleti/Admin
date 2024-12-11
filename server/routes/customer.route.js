const express = require('express');

const { getAllCustomers } = require("../controllers/customer.controller");
const router = express.Router();

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Retrieve all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of all customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get('/customers', getAllCustomers);

module.exports = router;
