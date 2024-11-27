const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true }, // The blacklisted token
  expiresAt: { type: Date, required: true }, // Expiration of the token
});

module.exports = mongoose.model("Blacklist", blacklistSchema);
