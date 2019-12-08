const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// SECTION Comment Routes
router.get('/', ctrl.comments.indexComments);
router.post('/', ctrl.comments.createComment);
router.put('/:id', ctrl.comments.editComment);
router.delete('/:id', ctrl.comments.deleteComment);

module.exports = router;