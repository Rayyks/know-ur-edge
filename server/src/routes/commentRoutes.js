const express = require("express");
const {
  createComment,
  deleteComment,
} = require("../controllers/COMMENTCONTROLLEr/index");
const protect = require("../middlewares/auth");

const router = express.Router();

// Create a comment (or reply)
router.post("/:postId/comment", protect, createComment);

// Delete a comment
router.delete("/comment/:id", protect, deleteComment);

module.exports = router;
