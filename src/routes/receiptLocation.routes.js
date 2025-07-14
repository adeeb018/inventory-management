// src/routes/receiptLocation.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/receiptLocation.controller');

router.post('/', controller.createReceiptLocation);
router.get('/', controller.getAllReceiptLocations);

module.exports = router;
