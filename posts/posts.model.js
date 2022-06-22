const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 50,
      min: 5,
    },
    content: {
      type: String,
      required: true,
      min: 5,
    },
    isPublished: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("posts", PostSchema);

module.exports = Posts;
