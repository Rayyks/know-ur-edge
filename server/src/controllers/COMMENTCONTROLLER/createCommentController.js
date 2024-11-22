const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Create the comment
    const comment = await Comment.create({
      content,
      author: req.user.id,
      post: postId,
      parentComment: parentCommentId || null, // Set parentComment if it's a reply
    });

    // Add the comment to the post
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({
      message: "Comment created successfully.",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
