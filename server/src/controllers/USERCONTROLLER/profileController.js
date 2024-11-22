const User = require("../../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the full profile (without password)
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio, // Include bio
      gender: user.gender, // Include gender
      profilePic: user.profilePic, // Include profilePic
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
