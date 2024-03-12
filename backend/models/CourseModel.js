const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lecture' }],
});

const CourseModel = mongoose.model("course", courseSchema);

module.exports = { CourseModel };
