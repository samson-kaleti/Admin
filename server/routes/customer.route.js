const express = require('express');

const { getAllCustomers, 
    createCustomer,
    LoginCustomer,
    getCustomerDetails, } = require("../controllers/customer.controller");
const router = express.Router(); 

/**
 * @swagger
 * /api/vendor/customers/signup:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: First name of the customer
 *                 example: John
 *               last_name:
 *                 type: string
 *                 description: Last name of the customer
 *                 example: Doe
 *               phone:
 *                 type: number
 *                 description: Phone number of the customer
 *                 example: 9908798484
 *               email:
 *                 type: string
 *                 description: Email of the customer
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the customer account
 *                 example: securePassword123
 *               vendor_id:
 *                 type: string
 *                 description: Vendor ID associated with the customer
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created customer
 *                   example: customer_12345
 *                 first_name:
 *                   type: string
 *                   description: First name of the created customer
 *                   example: John
 *                 last_name:
 *                   type: string
 *                   description: Last name of the created customer
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   description: Email of the created customer
 *                   example: johndoe@example.com
 *                 vendor_id:
 *                   type: string
 *                   description: Vendor ID of the customer
 *       400:
 *         description: Invalid input data
 */
router.post('/customers/signup', createCustomer);

/**
 * @swagger
 * /api/vendor/customers:
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

/**
 * @swagger
 * /api/vendor/customers/{id}:
 *   get:
 *     summary: Retrieve customer details by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the customer to retrieve
 *     responses:
 *       200:
 *         description: Customer details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 */
router.get('/customers/:id', getCustomerDetails);

/**
 * @swagger
 * /api/vendor/customers/login:
 *   post:
 *     summary: Customer login
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the customer
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the customer account
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated customer
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                 customer:
 *                   $ref: '#/components/schemas/Customer'
 *       401:
 *         description: Invalid email or password
 */
router.post('/customers/login', LoginCustomer);

module.exports = router;
