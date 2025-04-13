// file : backend/controllers/customerController.js
const db = require('../models/db');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO users SET ?', { name, email, password }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Registered successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, rows) => {
    if (err) return res.status(500).send(err);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: rows[0] });
  });
};

exports.getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};
