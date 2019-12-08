const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// SECTION Post Routes
router.get('/', ctrl.users.searchUsers);
router.get('/:id', ctrl.users.showUser);
router.put('/', ctrl.users.updateUser);

module.exports = router;