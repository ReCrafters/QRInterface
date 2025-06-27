const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Form = require('../models/form');
const QRInfo = require('../models/qrInfo');
const BaseUser = require('../models/baseUser'); 

router.get('/:id', async (req, res) => {
  try {
    const productID = req.params.id;

    const product = await Product.findById(productID).populate('sellerId');
    const form = await Form.findOne({ productID });
    const qrInfo = await QRInfo.findOne({ productID });

    if (!product || !form || !qrInfo) {
      return res.status(404).send('Transparency data not found.');
    }

    const qrData = {
      productID: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      images: product.images,
      tags: Array.isArray(product.tags) ? product.tags : JSON.parse(product.tags),
      stock: product.stock,
      sellerId: product.sellerId._id,
      sellerName: product.sellerId.name,
      verifiedDocuments: product.verifiedDocuments,
      verifiedAt: product.verifiedAt,
      verifiedBy: product.verifiedBy,
      sustainability: {
        TSV: form.assignedTSV,
        SSV: form.assignedSSV,
        ...form.metrices
      },
      formReview: {
        reviewedBy: form.reviewedBy,
        reviewedAt: form.reviewedAt,
        isApproved: form.isApproved,
        feedback: form.feedback
      },
      ...qrInfo.toObject()
    };
    console.log('QR Data:', qrData);
    res.render('qr', { qrData });
  } catch (err) {
    console.error('QR display error:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
