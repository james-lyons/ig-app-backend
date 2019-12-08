const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// SECTION Authentication Routes
router.get('/fetchUser', ctrl.auth.verify);
router.post('/userRegister', ctrl.auth.register);
router.post('/userLogin', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);

module.exports = router;