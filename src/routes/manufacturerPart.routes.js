const express = require('express');
const router = express.Router();
const controller = require('../controllers/manufacturerPart.controller');

router.post('/', controller.createManufacturerPart);
router.get('/', controller.getAllManufacturerParts);
router.get('/:id', controller.getManufacturerPartById);
router.put('/:id', controller.updateManufacturerPart);
router.delete('/:id', controller.deleteManufacturerPart);
router.get('/:id/usage', controller.getPartUsageByManufacturerPartId);

module.exports = router;

