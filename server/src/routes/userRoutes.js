const express = require("express");
const {
  getUserProfileByUsername,
} = require("../controllers/USERCONTROLLER/index"); // Import the controller function
const protect = require("../middlewares/auth");
const checkBlacklist = require("../middlewares/checkBlacklist");

const router = express.Router();

// Protected route to get a user profile by username
router.get(
  "/profile/:username",
  protect,
  checkBlacklist,
  getUserProfileByUsername
);

module.exports = router;
