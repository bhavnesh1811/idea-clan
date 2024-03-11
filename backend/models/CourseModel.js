const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
});

const CourseModel = mongoose.model("course", courseSchema);

module.exports = { CourseModel };
