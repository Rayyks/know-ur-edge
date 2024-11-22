const jwt = require("jsonwebtoken");

// Auth middleware
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, token invalid or expired" });
  }
};

module.exports = protect;
