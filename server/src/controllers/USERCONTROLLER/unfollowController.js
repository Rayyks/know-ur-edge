const User = require("../../models/User");

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { id } = req.params; // ID of the user to unfollow
    const currentUser = req.user.id; // Logged-in user

    const userToUnfollow = await User.findById(id);
    const userUnfollowing = await User.findById(currentUser);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if already not following
    if (!userToUnfollow.followers.includes(currentUser)) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    // Remove current user from the user's followers
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (followerId) => followerId.toString() !== currentUser
    );
    await userToUnfollow.save();

    // Remove the user from current user's following list
    userUnfollowing.following = userUnfollowing.following.filter(
      (followingId) => followingId.toString() !== id
    );
    await userUnfollowing.save();

    res.json({ message: `You have unfollowed ${userToUnfollow.username}.` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
