const express = require("express");
const {
  followUser,
  unfollowUser,
} = require("../controllers/USERCONTROLLER/index");
const protect = require("../middlewares/auth");

const router = express.Router();

// Follow a user
router.post("/follow/:id", protect, followUser);

// Unfollow a user
router.post("/unfollow/:id", protect, unfollowUser);

module.exports = router;
