const User = require("../../models/User");
const { hashPassword } = require("../../utils/hashUtils");
const { generateToken } = require("../../utils/tokenUtils");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

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
