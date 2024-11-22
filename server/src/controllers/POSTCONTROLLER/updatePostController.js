const Post = require("../../models/Post");

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    // Find the post by its ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this post" });
    }

    // Update the fields if provided
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;

    // If new media is uploaded, update the media field with relative paths
    if (req.files && req.files.length > 0) {
      post.media = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedPost = await post.save();

    res.json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
