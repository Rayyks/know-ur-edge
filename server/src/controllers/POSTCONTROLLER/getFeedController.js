const Post = require("../../models/Post");
const User = require("../../models/User");

exports.getFeed = async (req, res) => {
  try {
    // Get the current user's "following" list
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followedUsers = user.following;

    // Fetch posts from followed users
    const followedPosts = await Post.find({ author: { $in: followedUsers } })
      .populate("author", "username profilePic")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username profilePic" }, // Populate comment authors
      })
      .sort({ createdAt: -1 });

    // Fetch random posts (not from followed users)
    const randomPosts = await Post.find({ author: { $nin: followedUsers } })
      .populate("author", "username profilePic")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username profilePic" },
      })
      .sort({ createdAt: -1 })
      .limit(20); // Limit for performance

    // Combine followed posts (on top) and random posts
    const feed = [...followedPosts, ...randomPosts];

    res.json({ feed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
