const express = require('express'); 
const { listProducts } = require("../controllers/product.controller"); 

const router = express.Router(); 

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', listProducts); 

module.exports = router;
