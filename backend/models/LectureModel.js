// For each course, admins can schedule lectures by providing essential details like the course name, lecture title, start and end times, an optional description, and a link (e.g., Zoom or Google Meet) for students to join the live session.
const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

const LectureModel = mongoose.model("lecture", lectureSchema);

module.exports = { LectureModel };
