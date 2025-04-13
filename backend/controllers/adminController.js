//file: backend/controllers/adminController.js
const db = require('../models/db');
const adminModel = require('../models/adminModel');
const path = require('path');
const fs = require('fs');

exports.addProduct = (req, res) => {
  const { name, description, price } = req.body;
  const image = req.files?.image;

  if (!name || !price || !image) return res.status(400).json({ message: 'Missing data' });

  const imgPath = `uploads/${Date.now()}_${image.name}`;
  image.mv(imgPath, (err) => {
    if (err) return res.status(500).send("Image move error: " + err);

    const newProduct = { name, description, price, image_url: imgPath };

    adminModel.addProduct(newProduct, (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).send("DB insert error");
      }
      res.json({ message: 'Product added' });
    });
  });
};


exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, description, price } = req.body;

  db.query(
    'UPDATE products SET name=?, description=?, price=? WHERE id=?',
    [name, description, price, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Product updated' });
    }
  );
};


exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM products WHERE id=?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Product deleted' });
  });
};

exports.viewAllOrders = (req, res) => {
  db.query(`
    SELECT o.id AS order_id, u.name AS customer, o.total_amount, o.created_at,
           JSON_ARRAYAGG(JSON_OBJECT('product_id', p.id, 'name', p.name, 'qty', oi.quantity)) AS items
    FROM orders o
    JOIN users u ON o.user_id = u.id
    JOIN order_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    GROUP BY o.id
  `, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Admin Login
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  adminModel.login(username, password, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful', admin: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};

// Get All Products
exports.getAllProducts = (req, res) => {
  adminModel.getAllProducts((err, products) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    // Add full image URL
    const updatedProducts = products.map((p) => ({
      ...p,
      image: `http://localhost:3000/${p.image_url}`, // or use req.protocol + '://' + req.get('host')
    }));

    res.status(200).json(updatedProducts);
  });
};

