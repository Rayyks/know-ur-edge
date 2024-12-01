const { registerUser } = require("./registerController");
const { loginUser } = require("./loginController");
const { getProfile } = require("./profileController");
const { getUserProfileByUsername } = require("./getUserProfileController");
const {
  updatePersonalData,
  updateSkills,
  updateExperience,
  updateProjects,
} = require("./updateProfileController");
const { followUser } = require("./followController");
const { unfollowUser } = require("./unfollowController");
const { logoutUser } = require("./logoutController");

// ACCOUNT DELETION
const { requestAccountDeletion } = require("./requestAccountDeletion");
const { cancelAccountDeletion } = require("./cancelAccountDeletion");
const { finalizeAccountDeletions } = require("./finalizeAccountDeletion");

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getUserProfileByUsername,
  updatePersonalData,
  updateSkills,
  updateExperience,
  updateProjects,
  followUser,
  unfollowUser,
  logoutUser,
  requestAccountDeletion,
  cancelAccountDeletion,
  finalizeAccountDeletions,
};
