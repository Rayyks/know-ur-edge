const express = require("express");
const { likePost, unlikePost } = require("../controllers/POSTCONTROLLER/index");
const protect = require("../middlewares/auth");
const checkBlacklist = require("../middlewares/checkBlacklist");

const router = express.Router();

// Like a post
router.post("/:postId/like", protect, checkBlacklist, likePost);

// Unlike a post
router.post("/:postId/unlike", protect, checkBlacklist, unlikePost);

module.exports = router;
