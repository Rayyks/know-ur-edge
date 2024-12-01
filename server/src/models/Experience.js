const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  field: { type: String, required: true },
  years: { type: Number, required: true },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("Experience", ExperienceSchema);
