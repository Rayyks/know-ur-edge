const { registerUser } = require("./registerController");
const { loginUser } = require("./loginController");
const { getProfile } = require("./profileController");
const { getUserProfileByUsername } = require("./getUserProfileController");
const { updateProfile } = require("./updateProfileController");
const { followUser } = require("./followController");
const { unfollowUser } = require("./unfollowController");
const { logoutUser } = require("./logoutController");

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getUserProfileByUsername,
  updateProfile,
  followUser,
  unfollowUser,
  logoutUser,
};
