const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// SECTION Post Routes
router.get('/', ctrl.posts.indexPosts);
router.post('/', ctrl.posts.createPost);
router.put('/:id', ctrl.posts.editPost);
router.delete('/:id', ctrl.posts.deletePost);

module.exports = router;