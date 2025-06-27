const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const cors = require('cors')

const app = express();
require('./config/db')(); // DB connection

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// Routes
const qrRoutes = require('./routes/qr.js');
app.use('/', qrRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`QR Display Server running on port ${PORT}`);
});
