const Post = require("../../models/Post");
const User = require("../../models/User");

exports.searchEverything = async (req, res) => {
  try {
    const { query, limit = 10, page = 1 } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    // Pagination setup
    const perPage = parseInt(limit);
    const skip = (parseInt(page) - 1) * perPage;

    // Search logic
    const postResults = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .populate("author", "username profilePic")
      .limit(perPage)
      .skip(skip);

    const userResults = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }, // Optional, depending on your needs
      ],
    })
      .select("username profilePic email") // Return specific fields
      .limit(perPage)
      .skip(skip);

    res.json({
      message: "Search results retrieved successfully.",
      results: {
        posts: postResults,
        users: userResults,
      },
      pagination: {
        limit: perPage,
        page: parseInt(page),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
