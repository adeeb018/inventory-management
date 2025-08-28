const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', controller.refreshToken); // ✅ new route for refresh
router.post('/logout', controller.logout);        // ✅ optional logout route

module.exports = router;
