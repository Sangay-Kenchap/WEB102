const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const commentController = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.post('/', protect, videoController.createVideo);
router.delete('/:id', protect, videoController.deleteVideo);
router.post('/:id/like', protect, videoController.likeVideo);
router.get('/:id/comments', commentController.getComments);
router.post('/:id/comments', protect, commentController.addComment);

module.exports = router;