// File: orderModel.js
const db = require("./db");

exports.createOrder = (name, email, items, callback) => {
  // First insert into orders table
  db.query(
    "INSERT INTO orders (customer_name, customer_email, total_amount) VALUES (?, ?, ?)",
    [name, email, 0],
    (err, orderResult) => {
      if (err) return callback(err);

      const orderId = orderResult.insertId;

      // Function to insert items recursively or using loop+callback
      let remaining = items.length;
      if (remaining === 0) return callback(null, orderId); // no items case

      items.forEach((item) => {
        db.query(
          "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
          [orderId, item.product_id, item.quantity],
          (itemErr) => {
            if (itemErr) return callback(itemErr);

            remaining--;
            if (remaining === 0) {
              callback(null, orderId);
            }
          }
        );
      });
    }
  );
};
