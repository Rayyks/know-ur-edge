const User = require("../../models/User");
const { hashPassword } = require("../../utils/hashUtils");

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, password, bio, gender } = req.body;

    // Log the request body and file for debugging
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Find the user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;

    // If a new profile picture is uploaded, update it
    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    // If a new password is provided, hash it before saving
    if (password) {
      user.password = await hashPassword(password);
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        gender: updatedUser.gender,
        profilePic: updatedUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
