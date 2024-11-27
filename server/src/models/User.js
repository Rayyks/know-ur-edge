const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    profilePic: {
      type: String,
      default: "",
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    skills: [
      {
        name: { type: String, required: true }, // Skill name
        level: {
          type: String,
          enum: ["beginner", "intermediate", "expert"],
          required: true,
        }, // Skill level
      },
    ],
    experience: [
      {
        title: { type: String, required: true }, // Job title or role
        field: { type: String, required: true }, // Field of experience (e.g., Computer Science, Psychology)
        years: { type: Number, required: true }, // Duration in years
        description: { type: String, default: "" }, // Optional description
      },
    ],
    projects: [
      {
        name: { type: String, required: true }, // Project name
        description: { type: String, default: "" }, // Project description
        image: { type: String, default: "" }, // Optional project image
        skillsUsed: [{ type: String }], // Skills used in the project
        link: { type: String, default: "" }, // Optional link to the project
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Add a text index to optimize search
userSchema.index({
  username: "text",
  email: "text",
});

module.exports = mongoose.model("User", userSchema);
