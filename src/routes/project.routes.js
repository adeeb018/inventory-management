// ===============================
// 2. src/routes/project.routes.js
// ===============================
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { verifyToken } = require('../middleware/auth.middleware');


router.get('/', verifyToken, projectController.getAllProjects);
router.get('/:id', verifyToken, projectController.getProjectById);
router.post('/', verifyToken, projectController.createProject);
router.put('/:id', verifyToken, projectController.updateProject);
router.delete('/:id', verifyToken, projectController.deleteProject);
router.get('/:id/part-report', verifyToken, projectController.getPartReportForProject);

router.get('/:id/part-summary', verifyToken, projectController.getPartSummaryForProject);
module.exports = router;
