const User = require("../../models/User");
const Skill = require("../../models/Skill");
const Experience = require("../../models/Experience");
const Project = require("../../models/Project");
const { hashPassword } = require("../../utils/hashUtils");

// Define the list of forbidden words
const forbiddenWords = ["nigger", "fuck", "fucking", "shit", "nigga"];

// Username validation regex: must contain only letters, numbers, and underscores,
// and at least one underscore is required
const usernameRegex = /^(?=.*_)[A-Za-z0-9_]+$/;

exports.updatePersonalData = async (req, res) => {
  try {
    const { username, email, bio, gender } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate username
    if (username) {
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          message:
            "Username must contain only letters, numbers, and underscores, and at least one underscore.",
        });
      }
      if (
        forbiddenWords.some((word) => username.toLowerCase().includes(word))
      ) {
        return res
          .status(400)
          .json({ message: "Username contains inappropriate language." });
      }
      user.username = username;
    }

    // Validate bio
    if (bio) {
      if (bio.length > 500) {
        return res
          .status(400)
          .json({ message: "Bio must not exceed 500 characters." });
      }
      if (forbiddenWords.some((word) => bio.toLowerCase().includes(word))) {
        return res
          .status(400)
          .json({ message: "Bio contains inappropriate language." });
      }
      user.bio = bio;
    }

    if (email) user.email = email;
    if (gender) user.gender = gender;

    // Update profile picture if provided
    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      message: "Personal data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const { experience } = req.body; // Array of experience objects

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const experienceDocs = [];
    for (const exp of experience) {
      let existingExp = await Experience.findOne({
        title: exp.title,
        company: exp.company,
      }); // Unique check
      if (!existingExp) {
        existingExp = await Experience.create(exp); // Create if it doesn't exist
      }
      experienceDocs.push(existingExp._id);
    }

    // Update user's experience field with the found or newly created Experience ObjectIds
    user.experience = experienceDocs;
    await user.save();

    // Populate the user's experience with full document details
    await user.populate("experience");

    res.json({
      message: "Experience updated successfully",
      experience: user.experience, // Full experience details
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateSkills = async (req, res) => {
  try {
    const { skills } = req.body; // Array of skill objects

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Loop through each skill to check if it already exists, if not, insert it
    const skillDocs = [];
    for (const skill of skills) {
      let existingSkill = await Skill.findOne({ name: skill.name }); // Check by name or any unique identifier
      if (!existingSkill) {
        existingSkill = await Skill.create(skill); // Create if it doesn't exist
      }
      skillDocs.push(existingSkill._id);
    }

    // Update user's skills field with the found or newly created Skill ObjectIds
    user.skills = skillDocs;
    await user.save();

    // Populate the user's skills with full document details
    await user.populate("skills");

    res.json({
      message: "Skills updated successfully",
      skills: user.skills, // This will contain full skill details now
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateProjects = async (req, res) => {
  try {
    const { projects } = req.body; // Array of project objects

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const projectDocs = [];
    for (const project of projects) {
      let existingProject = await Project.findOne({ name: project.name }); // Unique check
      if (!existingProject) {
        existingProject = await Project.create(project); // Create if it doesn't exist
      }
      projectDocs.push(existingProject._id);
    }

    // Update user's projects field with the found or newly created Project ObjectIds
    user.projects = projectDocs;
    await user.save();

    // Populate the user's projects with full document details
    await user.populate("projects");

    res.json({
      message: "Projects updated successfully",
      projects: user.projects, // Full project details
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
