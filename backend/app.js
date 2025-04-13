// file:backend/app.js
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/orders', orderRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
