// src/routes/stockAdjustment.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockAdjustment.controller');

router.get('/', controller.getAllAdjustments);
router.post('/', controller.createAdjustment);

module.exports = router;
