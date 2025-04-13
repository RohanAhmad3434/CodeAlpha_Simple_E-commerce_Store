// File: backend/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customer = require('../controllers/customerController');

router.post('/register', customer.register);
router.post('/login', customer.login);
router.get('/products', customer.getProducts);

module.exports = router;
