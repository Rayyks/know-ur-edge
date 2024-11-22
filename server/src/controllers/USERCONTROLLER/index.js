const { registerUser } = require("./registerController");
const { loginUser } = require("./loginController");
const { getProfile } = require("./profileController");
const { updateProfile } = require("./updateProfileController");
const { followUser } = require("./followController");
const { unfollowUser } = require("./unfollowController");

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  followUser,
  unfollowUser,
};
