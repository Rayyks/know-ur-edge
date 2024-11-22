const User = require("../../models/User");
const { comparePassword } = require("../../utils/hashUtils");
const { generateToken } = require("../../utils/tokenUtils");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
        error: "NotFound",
        details: "No user found with the provided email address.",
      });
    }

    // Compare the provided password with the stored hash
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        error: "Unauthorized",
        details: "The password you entered is incorrect. Please try again.",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token: generateToken({ id: user._id }),
    });
  } catch (error) {
    // Handle errors with detailed messages
    res.status(500).json({
      message: "Server error",
      error: error.name,
      details: error.message,
    });
  }
};
