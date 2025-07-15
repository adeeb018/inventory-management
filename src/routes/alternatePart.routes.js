const express = require('express');
const router = express.Router();
const controller = require('../controllers/alternatePart.controller');

router.get('/', controller.getAllAlternateParts);
router.get('/:id', controller.getAlternatesForPart);
module.exports = router;
