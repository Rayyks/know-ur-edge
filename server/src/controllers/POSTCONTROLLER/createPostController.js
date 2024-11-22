const Post = require("../../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Ensure title, content, and category are provided
    if (!title || !content || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Extract media file paths from multer upload and convert to relative paths
    const media = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    // Create a new post
    const post = await Post.create({
      title,
      content,
      category,
      author: req.user.id, // The logged-in user
      media, // Save media file paths in the post
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
