const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    applied: { type: Boolean,default: false },
    role: { type: String, required: true, default: "student" },
    currentCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
