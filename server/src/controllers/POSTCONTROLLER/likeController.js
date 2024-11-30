const Post = require("../../models/Post");

async function initializeLikesField() {
  try {
    await Post.updateMany(
      { likes: { $exists: false } }, // Find posts without the likes field
      { $set: { likes: [] } } // Set likes field to an empty array
    );
    console.log("Likes field initialized for all posts.");
  } catch (error) {
    console.error("Error initializing likes field:", error);
  }
}

initializeLikesField();

/**
 * Like a post
 */
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure likes is an array
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      message: "Post liked",
      likes: post.likes,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Unlike a post
 */
exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure likes is an array
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({
      message: "Post unliked",
      likes: post.likes,
    });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
