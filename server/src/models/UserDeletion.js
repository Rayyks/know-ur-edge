const mongoose = require("mongoose");

const userDeletionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Ensure one deletion request per user
  },
  reason: {
    type: String,
    required: true,
  },
  customReason: {
    type: String,
  },
  requestedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("UserDeletion", userDeletionSchema);
