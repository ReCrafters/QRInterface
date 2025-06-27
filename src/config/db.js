const mongoose = require('mongoose');
require('dotenv').config();
module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for QR display app');
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
};
