const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware"); // Updated middleware
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/USERCONTROLLER/index");
const protect = require("../middlewares/auth");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect, // Ensure the user is authenticated
  uploadMiddleware().single("profilePic"), // Handle single file upload for profile picture
  updateProfile // Update the profile
);

module.exports = router;
