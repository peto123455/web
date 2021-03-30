const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users"
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "courseTypes"
    },
    status: {
      type: Number,
      default: 0
    },
    drivesRemaining: Number
  }
);

module.exports = Course = mongoose.model("courses", CourseSchema);