const User = require("../../models/User");

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const { id } = req.params; // ID of the user to follow
    const currentUser = req.user.id; // Logged-in user

    // Check if the user is trying to follow themselves
    if (id === currentUser) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    const userToFollow = await User.findById(id);
    const userFollowing = await User.findById(currentUser);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if already following
    if (userToFollow.followers.includes(currentUser)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    }

    // Add current user to the user's followers
    userToFollow.followers.push(currentUser);
    await userToFollow.save();

    // Add the user to current user's following list
    userFollowing.following.push(id);
    await userFollowing.save();

    res.json({ message: `You are now following ${userToFollow.username}.` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
