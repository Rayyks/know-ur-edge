const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      type: [String], // Array of file paths (images/videos)
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Add a text index to optimize search
postSchema.index(
  {
    title: "text",
    content: "text",
    category: "text",
  },
  {
    weights: {
      title: 5, // Highest priority
      content: 3, // Medium priority
      category: 1, // Lowest priority
    },
  }
);

module.exports = mongoose.model("Post", postSchema);
