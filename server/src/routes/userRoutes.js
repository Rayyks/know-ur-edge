const express = require("express");
const {
  getUserProfileByUsername,
  requestAccountDeletion,
  cancelAccountDeletion,
} = require("../controllers/USERCONTROLLER/index"); // Import the controller function\

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

// Protected route to request account deletion
router.post(
  "/account-deletion",
  protect,
  checkBlacklist,
  requestAccountDeletion
);

// Protected route to cancel account deletion
router.delete(
  "/account-deletion",
  protect,
  checkBlacklist,
  cancelAccountDeletion
);

module.exports = router;
