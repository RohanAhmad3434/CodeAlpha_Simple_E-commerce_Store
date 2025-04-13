//file:backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');

router.post('/product', admin.addProduct);
router.get('/product', admin.getAllProducts);
router.post('/login', admin.login);
router.put('/product/:id', admin.updateProduct);
router.delete('/product/:id', admin.deleteProduct);
router.get('/orders', admin.viewAllOrders);

module.exports = router;
