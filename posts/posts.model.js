const mongoose = require("mongoose");

let PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isPublished: {
    type: String,
    required: true,
    default: false,
  },
});

const Posts = mongoose.model("posts", PostSchema);

module.exports = Posts;
