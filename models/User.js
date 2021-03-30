const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: Number,
        default: 1
    },
    avatar: {
        type: Number,
        default: 7
    },
    email: {
        type: String,
        default: "Not set"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = User = mongoose.model("users", UserSchema);