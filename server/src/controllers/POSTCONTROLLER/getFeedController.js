const Post = require("../../models/Post");
const User = require("../../models/User");

/**
 * Get posts from followed users
 */
exports.getFollowingFeed = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followedUsers = user.following;

    const posts = await Post.find({ author: { $in: followedUsers } })
      .populate("author", "username profilePic")
      .populate({
        path: "likes",
        select: "username profilePic",
      })
      .populate({
        path: "comments",
        populate: { path: "author", select: "username profilePic" },
      })
      .sort({ createdAt: -1 }) // Newest first
      .skip((page - 1) * limit) // Skip posts for previous pages
      .limit(parseInt(limit)); // Limit for the current page

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching following feed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get random posts (not from followed users)
 */
exports.getRandomFeed = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters
    const userId = req.user?.id;

    let excludedAuthors = [];
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      excludedAuthors = user.following;
    }

    const posts = await Post.find({ author: { $nin: excludedAuthors } }) // Exclude followed users
      .populate("author", "username profilePic")
      .populate({
        path: "likes",
        select: "username profilePic",
      })
      .populate({
        path: "comments",
        populate: { path: "author", select: "username profilePic" },
      })
      .sort({ createdAt: -1 }) // Newest first
      .skip((page - 1) * limit) // Skip posts for previous pages
      .limit(parseInt(limit)); // Limit for the current page

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching random feed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
