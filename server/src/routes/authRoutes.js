const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware"); // Updated middleware
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser,
} = require("../controllers/USERCONTROLLER/index");
const protect = require("../middlewares/auth");
const checkBlacklist = require("../middlewares/checkBlacklist"); // Import blacklist middleware

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes with token blacklist check
router.post("/logout", protect, checkBlacklist, logoutUser); // Apply blacklist check here

router.get("/profile", protect, checkBlacklist, getProfile); // Protect and ensure token is valid

router.put(
  "/profile",
  protect, // Ensure the user is authenticated
  checkBlacklist, // Ensure the token is not blacklisted
  uploadMiddleware().single("profilePic"), // Handle single file upload for profile picture
  updateProfile // Update the profile
);

module.exports = router;
