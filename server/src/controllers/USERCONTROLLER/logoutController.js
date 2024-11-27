const Blacklist = require("../../models/Blacklist");

exports.logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token
    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    // Decode token to get its expiration time (assuming JWT is used)
    const { exp } = require("jsonwebtoken").decode(token);

    // Calculate expiration date for blacklist entry
    const expiresAt = new Date(exp * 1000); // Convert exp (in seconds) to milliseconds

    // Save token in the blacklist
    await Blacklist.create({ token, expiresAt });

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
