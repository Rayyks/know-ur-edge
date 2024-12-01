const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    profilePic: { type: String, default: "" },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    experience: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

userSchema.index({ username: "text", email: "text" });

module.exports = mongoose.model("User", userSchema);
