const authRoutes = require("./routes/authRoutes");
const followRoutes = require("./routes/followRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

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
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON requests
app.use(morgan("dev")); // Request logging

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/comments", commentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/api/posts", require("./src/routes/postRoutes"));
// app.use("/api/comments", require("./src/routes/commentRoutes"));
// Add more routes as needed

// Celebrate validation error handler
app.use(errors());

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;
