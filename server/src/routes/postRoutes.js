const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware"); // Import the upload middleware
const {
  createPost,
  updatePost,
  deletePost,
  getFollowingFeed,
  getRandomFeed,
  getSinglePost,
} = require("../controllers/POSTCONTROLLER/index");
const protect = require("../middlewares/auth");
const checkBlacklist = require("../middlewares/checkBlacklist");

const router = express.Router();

// Routes for posts

// Create post (with media upload)
router.post(
  "/",
  protect,
  checkBlacklist,
  uploadMiddleware().array("media", 5), // "posts" context, allow up to 5 files (images/videos)
  createPost
);

// Update post (with media upload)
router.put(
  "/:id",
  checkBlacklist,
  protect,
  uploadMiddleware().array("media", 5), // "posts" context, allow up to 5 files (images/videos)
  updatePost
);

// Delete post
router.delete("/:id", protect, checkBlacklist, deletePost);

// Get posts from followed users
router.get("/following-feed", protect, checkBlacklist, getFollowingFeed);

// Get random posts
router.get("/random-feed", getRandomFeed);

// Get a single post by ID
router.get("/:postId", getSinglePost);

module.exports = router;
