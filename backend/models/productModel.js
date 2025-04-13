// file: backend/models/productModel.js
const db = require('./db');

exports.getAllProducts = (callback) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};
