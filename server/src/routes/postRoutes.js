const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware"); // Import the upload middleware
const {
  createPost,
  updatePost,
  deletePost,
  getFeed,
} = require("../controllers/POSTCONTROLLER/index");
const protect = require("../middlewares/auth");

const router = express.Router();

// Routes for posts

// Create post (with media upload)
router.post(
  "/",
  protect, // Ensure the user is authenticated
  uploadMiddleware().array("media", 5), // "posts" context, allow up to 5 files (images/videos)
  createPost
);

// Update post (with media upload)
router.put(
  "/:id",
  protect, // Ensure the user is authenticated
  uploadMiddleware().array("media", 5), // "posts" context, allow up to 5 files (images/videos)
  updatePost
);

// Delete post
router.delete("/:id", protect, deletePost);

// Get feed (retrieve posts)
router.get("/feed", protect, getFeed);

module.exports = router;
