// src/routes/stockAdjustment.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockAdjustment.controller');

router.get('/', controller.getAllAdjustments);
router.get('/:id', controller.getAdjustmentById);
router.post('/', controller.createAdjustment);
router.put('/:id', controller.updateAdjustment);
router.delete('/:id', controller.deleteAdjustment);

module.exports = router;
