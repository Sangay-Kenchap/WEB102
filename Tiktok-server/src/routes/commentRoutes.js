const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.delete('/:id', protect, commentController.deleteComment);

module.exports = router;