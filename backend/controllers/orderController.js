// file: backend/controllers/orderController.js
const db = require('../models/db');
exports.placeOrder = (req, res) => {
  const { userId, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items selected' });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  db.query('INSERT INTO orders SET ?', { user_id: userId, total_amount: total }, (err, result) => {
    if (err) {
      console.error("Error inserting into orders:", err); // 🧠 LOG ERROR
      return res.status(500).send(err);
    }

    const orderId = result.insertId;
    const orderItems = items.map(i => [orderId, i.id, i.quantity]);

    db.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ?', [orderItems], (err2) => {
      if (err2) {
        console.error("Error inserting order items:", err2); // 🧠 LOG ERROR
        return res.status(500).send(err2);
      }

      console.log("Order placed successfully for user:", userId); // ✅ Success log
      res.json({ message: 'Order placed successfully' });
    });
  });
};


exports.getOrderHistory = (req, res) => {
  const customerId = req.params.customerId;

  db.query(`
    SELECT o.id AS order_id, o.total_amount, o.created_at,
           JSON_ARRAYAGG(JSON_OBJECT('product_id', p.id, 'name', p.name, 'qty', oi.quantity)) AS items
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.user_id = ?
    GROUP BY o.id
  `, [customerId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};


exports.cancelOrder = (req, res) => {
  const orderId = req.params.orderId;

  // First, check if order exists
  db.query('SELECT * FROM orders WHERE id = ?', [orderId], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete order items first (because of FK constraint)
    db.query('DELETE FROM order_items WHERE order_id = ?', [orderId], (err2) => {
      if (err2) return res.status(500).send(err2);

      // Now delete the order itself
      db.query('DELETE FROM orders WHERE id = ?', [orderId], (err3) => {
        if (err3) return res.status(500).send(err3);

        res.json({ message: 'Order cancelled successfully' });
      });
    });
  });
};
