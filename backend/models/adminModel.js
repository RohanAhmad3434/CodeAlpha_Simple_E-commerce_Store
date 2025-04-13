// File: backend/models/adminModel.js
const db = require("./db");

const login = (username, password, callback) => {
    const query = 'SELECT * FROM admin WHERE username = ? AND password = ?';
    db.query(query, [username, password], callback);
};

// Add new product
const addProduct = (product, callback) => {
  const query = 'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)';
  const { name, description, price, image_url } = product;
  db.query(query, [name, description, price, image_url], callback);
};

  
  // Update product
  const updateProduct = (id, product, callback) => {
    const query = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
    const { name, description, price} = product;
    db.query(query, [name, description, price, id], callback);
  };
  
  // Delete product
  const deleteProduct = (id, callback) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], callback);
  };
  
  // Get all products
const getAllProducts = (callback) => {
  const query = 'SELECT * FROM products';
  db.query(query, callback);
};

module.exports = { login 
, addProduct, updateProduct, deleteProduct , getAllProducts ,
};
