const User = require("../../models/User");
const { hashPassword } = require("../../utils/hashUtils");

exports.updateProfile = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      bio,
      gender,
      skills,
      experience,
      projects,
    } = req.body;

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (skills) user.skills = skills;
    if (experience) user.experience = experience;
    if (projects) user.projects = projects;

    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    if (password) {
      user.password = await hashPassword(password);
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
