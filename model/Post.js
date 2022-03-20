const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", PostSchema);
