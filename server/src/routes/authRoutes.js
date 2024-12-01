const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const {
  registerUser,
  loginUser,
  getProfile,
  updatePersonalData,
  updateSkills,
  updateExperience,
  updateProjects,
  logoutUser,
} = require("../controllers/USERCONTROLLER/index");
const protect = require("../middlewares/auth");
const checkBlacklist = require("../middlewares/checkBlacklist");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes with token blacklist check
router.post("/logout", protect, checkBlacklist, logoutUser);

// Profile routes (GET profile)
router.get("/profile", protect, checkBlacklist, getProfile);

// Update personal data (including profile pic)
router.put(
  "/profile/personal-data",
  protect,
  checkBlacklist,
  uploadMiddleware().single("profilePic"),
  updatePersonalData
);

// Update skills
router.put("/profile/skills", protect, checkBlacklist, updateSkills);

// Update experience (and optional file upload for images related to experience)
router.put(
  "/profile/experience",
  protect,
  checkBlacklist,
  uploadMiddleware().array("images", 5),
  updateExperience
);

// Update projects (single file upload for project image)
router.put(
  "/profile/projects",
  protect,
  checkBlacklist,
  uploadMiddleware().single("image"),
  updateProjects
);

module.exports = router;
