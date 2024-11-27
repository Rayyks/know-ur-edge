const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware"); // Import the upload middleware
const {
  createPost,
  updatePost,
  deletePost,
  getFeed,
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

// Get feed (retrieve posts)
router.get("/feed", protect, checkBlacklist, getFeed);

module.exports = router;
