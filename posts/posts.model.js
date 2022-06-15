const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PostSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
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
