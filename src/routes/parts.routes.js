const express = require('express');
const router = express.Router();
const partsController = require('../controllers/parts.controller');

router.get('/', partsController.getAllParts);
router.get('/:id', partsController.getPartById);
router.post('/', partsController.createPart);
router.put('/:id', partsController.updatePart);
router.delete('/:id', partsController.deletePart);

module.exports = router;
