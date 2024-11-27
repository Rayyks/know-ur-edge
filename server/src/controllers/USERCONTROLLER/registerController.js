const User = require("../../models/User");
const { hashPassword } = require("../../utils/hashUtils");
const { generateToken } = require("../../utils/tokenUtils");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Define the list of forbidden words
  const forbiddenWords = ["nigger", "fuck", "fucking", "shit", "nigga"];

  // Username validation regex: must contain only letters, numbers, and underscores,
  // and at least one underscore is required
  const usernameRegex = /^(?=.*_)[A-Za-z0-9_]+$/;

  try {
    // Check if the email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email is already registered",
        error: "Conflict",
        details:
          "The email provided is already associated with another account.",
      });
    }

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
        error: "BadRequest",
        details:
          "Please provide all required fields: username, email, and password.",
      });
    }

    // Check if username contains any forbidden words (case-insensitive)
    const containsForbiddenWord = forbiddenWords.some((word) =>
      username.toLowerCase().includes(word)
    );
    if (containsForbiddenWord) {
      return res.status(400).json({
        message: "Invalid username",
        error: "BadRequest",
        details: "Username contains forbidden words.",
      });
    }

    // Validate username format
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "Invalid username",
        error: "BadRequest",
        details:
          "Username must only contain letters, numbers, and underscores, and must include at least one underscore.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token: generateToken({ id: user._id }),
    });
  } catch (error) {
    // Handle different types of errors with specific messages
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate entry error",
        error: "Conflict",
        details: `The value for ${
          Object.keys(error.keyValue)[0]
        } already exists.`,
      });
    }
    res.status(500).json({
      message: "Server error",
      error: error.name,
      details: error.message,
    });
  }
};
