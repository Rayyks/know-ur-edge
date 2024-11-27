const express = require("express");
const {
  followUser,
  unfollowUser,
} = require("../controllers/USERCONTROLLER/index");
const protect = require("../middlewares/auth");
const checkBlacklist = require("../middlewares/checkBlacklist");

const router = express.Router();

// Follow a user
router.post("/follow/:id", protect, checkBlacklist, followUser);

// Unfollow a user
router.post("/unfollow/:id", protect, checkBlacklist, unfollowUser);

module.exports = router;
