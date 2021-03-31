const mongoose = require("mongoose");

const CourseTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    description: String,
    totalRides: {
      type: Number,
      default: 30
    },
    totalTheories: {
      type: Number,
      default: 25
    },
    price: {
      type: Number,
      default: 600
    }
  }
);

module.exports = CourseType = mongoose.model("courseTypes", CourseTypeSchema);