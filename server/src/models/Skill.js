const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "expert"],
    required: true,
  },
});

module.exports = mongoose.model("Skill", SkillSchema);
