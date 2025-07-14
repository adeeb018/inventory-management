const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');

router.get('/summary', stockController.getManufacturerPartStock);
router.get('/location', stockController.getLocationStock);

module.exports = router;
