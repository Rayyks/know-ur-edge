const Post = require("../../models/Post");

/**
 * Get a single post by ID
 */
exports.getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params; // Get the post ID from the route params

    const post = await Post.findById(postId)
      .populate("author", "username profilePic") // Populate the author details
      .populate({
        path: "likes",
        select: "username profilePic", // Populate likes with user data
      })
      .populate({
        path: "comments",
        populate: { path: "author", select: "username profilePic" }, // Populate comments with author data
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching single post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
