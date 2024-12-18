const express = require("express");
const {
  createComment,
  deleteComment,
} = require("../controllers/COMMENTCONTROLLEr/index");
const protect = require("../middlewares/auth");
const checkBlacklist = require("../middlewares/checkBlacklist");

const router = express.Router();

// Create a comment (or reply)
router.post("/:postId/comment", protect, checkBlacklist, createComment);

// Delete a comment
router.delete("/comment/:commentId", protect, checkBlacklist, deleteComment);

module.exports = router;
