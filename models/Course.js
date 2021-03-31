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
    drives: {  
      type: Number,
      default: 0
    },
    theories: {  
      type: Number,
      default: 0
    }
  }
);

module.exports = Course = mongoose.model("courses", CourseSchema);