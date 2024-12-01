const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  skillsUsed: [{ type: String }],
  link: { type: String, default: "" },
});

module.exports = mongoose.model("Project", ProjectSchema);
