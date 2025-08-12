// src/routes/projectPartUsage.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectPartUsage.controller');

const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

router.get('/', controller.getAllUsages);
router.post('/', verifyToken,requireRole('Admin', 'Manager'), controller.createUsage);

module.exports = router;
