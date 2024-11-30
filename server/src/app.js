const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const followRoutes = require("./routes/followRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const searchRoutes = require("./routes/searchRoutes");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/database");
const path = require("path");

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(helmet()); // Security headers

// Enable CORS for all routes (frontend access from localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", (req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Handling preflight requests (for OPTIONS)
app.options("/uploads", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});
// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON requests
app.use(morgan("dev")); // Request logging

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Dev Social API");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/search", searchRoutes);

// Celebrate validation error handler
app.use(errors());

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;
