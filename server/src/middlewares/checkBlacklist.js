const Blacklist = require("../models/Blacklist");

const checkBlacklist = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the token exists in the blacklist
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(403).json({ message: "Token is blacklisted" });
    }

    next();
  } catch (error) {
    console.error("Error checking blacklist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = checkBlacklist;
