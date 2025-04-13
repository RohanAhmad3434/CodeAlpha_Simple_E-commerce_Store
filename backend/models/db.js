// File: backend/models/db.js
const mysql = require('mysql2');
// Create connection with your DB credentials
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Rohan',
  password: 'root',         // use your DB password
  database: 'estore'    // use your DB name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;
