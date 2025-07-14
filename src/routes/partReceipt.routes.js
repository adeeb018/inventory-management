const express = require('express');
const router = express.Router();
const controller = require('../controllers/partReceipt.controller');

router.get('/', controller.getAllReceipts);
router.get('/:id', controller.getReceiptById);
router.post('/', controller.createReceipt);

module.exports = router;
