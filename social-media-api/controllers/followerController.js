const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { followers, users } = require('../utils/mockData');

// @desc    Get all followers
// @route   GET /followers
// @access  Public
exports.getFollowers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = followers.length;

  const results = followers.slice(startIndex, endIndex);

  const pagination = {};

  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }

  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  res.status(200).json({
    success: true,
    count: results.length,
    page,
    total_pages: Math.ceil(total / limit),
    pagination,
    data: results
  });
});

// @desc    Get single follower
// @route   GET /followers/:id
// @access  Public
exports.getFollower = asyncHandler(async (req, res, next) => {
  const follower = followers.find(f => f.id === req.params.id);

  if (!follower) {
    return next(
      new ErrorResponse(`Follower not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: follower
  });
});

// @desc    Follow a user
// @route   POST /followers
// @access  Private (we'll simulate this)
exports.followUser = asyncHandler(async (req, res, next) => {
  const userId = req.header('X-User-Id');
  if (!userId) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  const userToFollow = users.find(u => u.id === req.body.following_id);
  if (!userToFollow) {
    return next(new ErrorResponse('User to follow not found', 404));
  }

  // Can't follow yourself
  if (userId === req.body.following_id) {
    return next(new ErrorResponse('You cannot follow yourself', 400));
  }

  // Check if already following
  const alreadyFollowing = followers.find(
    f => f.follower_id === userId && f.following_id === req.body.following_id
  );
  if (alreadyFollowing) {
    return next(new ErrorResponse('Already following this user', 400));
  }

  const newFollower = {
    id: (followers.length + 1).toString(),
    follower_id: userId,
    following_id: req.body.following_id,
    created_at: new Date().toISOString().slice(0, 10)
  };

  followers.push(newFollower);

  res.status(201).json({
    success: true,
    data: newFollower
  });
});

// @desc    Unfollow a user
// @route   DELETE /followers/:id
// @access  Private (we'll simulate this)
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  const userId = req.header('X-User-Id');
  if (!userId) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  const follower = followers.find(f => f.id === req.params.id);

  if (!follower) {
    return next(
      new ErrorResponse(`Follower not found with id of ${req.params.id}`, 404)
    );
  }

  if (follower.follower_id !== userId) {
    return next(new ErrorResponse('Not authorized to unfollow this user', 401));
  }

  const index = followers.findIndex(f => f.id === req.params.id);
  followers.splice(index, 1);

  res.status(200).json({
    success: true,
    data: {}
  });
});