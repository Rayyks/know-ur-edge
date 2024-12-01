const User = require("../../models/User");

exports.getProfile = async (req, res) => {
  try {
    // Find the user and exclude the password
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("skills") // Populate the skills field with full skill details
      .populate("experience") // Populate the experience field with full experience details
      .populate("projects"); // Populate the projects field with full project details

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the full profile with populated details
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      gender: user.gender,
      profilePic: user.profilePic,
      skills: user.skills, // Full skill details
      experience: user.experience, // Full experience details
      projects: user.projects, // Full project details
      following: user.following, // Include following list
      followers: user.followers, // Include followers list
      createdAt: user.createdAt, // Include account creation date
      updatedAt: user.updatedAt, // Include last updated date
    });
  } catch (error) {
    console.error("Error fetching profile:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
