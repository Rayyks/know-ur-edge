const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (comment.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment." });
    }

    // Remove the comment from the post
    await Post.updateOne(
      { _id: comment.post },
      { $pull: { comments: comment._id } }
    );

    // Remove the comment and its replies
    await Comment.deleteMany({
      $or: [{ _id: comment._id }, { parentComment: comment._id }],
    });

    res.json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
