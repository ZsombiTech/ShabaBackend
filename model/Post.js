const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [String],
  url: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", PostSchema);
