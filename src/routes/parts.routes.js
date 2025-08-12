const express = require('express');
const router = express.Router();
const partsController = require('../controllers/parts.controller');

const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');


router.get('/',verifyToken, partsController.getAllParts);
router.get('/:id',verifyToken, partsController.getPartById);
router.post('/',verifyToken, partsController.createPart);
router.put('/:id',verifyToken, partsController.updatePart);
router.delete('/:id',verifyToken, requireRole('Admin'), partsController.deletePart);

module.exports = router;
