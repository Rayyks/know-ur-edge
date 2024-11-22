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
      default: "", // Optional, default empty string
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // Adjust based on your needs
      default: "other", // Optional, default "other"
    },
    profilePic: {
      type: String,
      default: "", // Optional, default empty string
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
