// src/routes/projectPartUsage.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectPartUsage.controller');

router.get('/', controller.getAllUsages);
router.post('/', controller.addUsage);

module.exports = router;
