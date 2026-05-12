const express = require('express');

const router = express.Router();

const multer = require('multer');

const {
  createVideo,
  deleteVideo,
} = require('../controllers/videoController');

const upload = multer({
  dest: 'uploads/',
});

router.post(
  '/',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  createVideo
);

router.delete('/:id', deleteVideo);

module.exports = router;