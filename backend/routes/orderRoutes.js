// File: backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const order = require('../controllers/orderController');

router.post('/', order.placeOrder);
router.get('/:customerId', order.getOrderHistory);
router.delete('/:orderId', order.cancelOrder); // 👈 New route

module.exports = router;
