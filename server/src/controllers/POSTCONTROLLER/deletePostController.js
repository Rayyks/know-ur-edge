const Post = require("../../models/Post");

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the author
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    // Delete the post
    await Post.deleteOne({ _id: id });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
