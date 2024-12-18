const Post = require("../../models/Post");

const MAX_DEPTH = 3; // Max depth for nesting
const REPLIES_PER_PAGE = 10;

exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate("author", "username profilePic")
      .populate({
        path: "likes",
        select: "username profilePic",
      })
      .populate({
        path: "comments",
        populate: [
          { path: "author", select: "username profilePic" },
          {
            path: "replies",
            options: { limit: REPLIES_PER_PAGE },
            populate: [
              { path: "author", select: "username profilePic" },
              {
                path: "parentComment", // Include the parent comment
                populate: { path: "author", select: "username profilePic" }, // Populate its author
              },
              {
                path: "replies",
                options: { limit: REPLIES_PER_PAGE },
                populate: [
                  { path: "author", select: "username profilePic" },
                  {
                    path: "parentComment", // Include the parent comment in nested replies
                    populate: { path: "author", select: "username profilePic" },
                  },
                ],
              },
            ],
          },
        ],
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
