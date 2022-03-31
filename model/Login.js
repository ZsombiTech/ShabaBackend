const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Write a bio here...",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Login", LoginSchema);
