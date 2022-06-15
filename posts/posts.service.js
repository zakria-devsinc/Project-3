const { db } = require("../db");
const Post = db.posts;
const { constants } = require("../constants/constants.js");
const {
  DRAFT_CREATED,
  DRAFT_ERROR,
  POST_NOT_FOUND,
  POST_UPDATED,
  UPDATION_ERROR,
} = constants;

module.exports = {
  create,
  edit,
};

// draft create service
async function create(request, response) {
  const { title, content } = request.body;
  const userId = request.params.userId;

  const post = new Post({
    title: title,
    content: content,
    userId: userId,
  });

  await post.save((error, result) => {
    if (error) {
      return response.status(500).send({
        message: error.message || DRAFT_ERROR,
      });
    } else {
      response.status(200).send({
        message: DRAFT_CREATED,
      });
    }
  });
}

async function edit(request, response) {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: request.body.postId },
      { title: request.body.title, content: request.body.content }
    );

    if (!updatedPost) {
      return response.status(400).send({ message: POST_NOT_FOUND });
    } else {
      return res.status(201).send({ message: POST_UPDATED });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || UPDATION_ERROR,
    });
  }
}

// post edit service
