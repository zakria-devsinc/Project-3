const { database } = require("../db");
const Post = database.posts;
const User = database.users;
const { constants } = require("../constants/constants.js");
const {
  DRAFT_CREATED,
  DRAFT_ERROR,
  POST_NOT_FOUND,
  POST_UPDATED,
  POST_PUBLISHED,
  POST_DELETED,
  USER_NOT_FOUND,
} = constants;

module.exports = {
  create,
  edit,
  publish,
  getDrafts,
  getAll,
  deletePost,
  getMyPosts,
};

// draft create service
async function create(request, response) {
  const { title, content } = request.body;
  const userId = request.params.userId;

  User.find({ _id: userId })
    .then((resp) => {
      if (resp.length) {
        const post = new Post({
          title: title,
          content: content,
          userId: userId,
        });

        (async () =>
          await post.save((error, result) => {
            if (error) {
              return response.status(500).send({
                message: error.message || DRAFT_ERROR,
              });
            } else {
              response.status(201).send({
                message: DRAFT_CREATED,
              });
            }
          }))();
      } else {
        return response.status(404).send({ message: USER_NOT_FOUND });
      }
    })
    .catch((error) => {
      return response.status(500).send({
        message: error.message,
      });
    });
}

//post edit service
async function edit(request, response) {
  const { post_id, title, content } = request.body;
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: post_id },
      { title: title, content: content }
    );

    if (!updatedPost) {
      return response.status(404).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(201).send({ message: POST_UPDATED });
    }
  } catch (error) {
    return response.status(500).send({
      message: error.message,
    });
  }
}

// post publish service
async function publish(request, response) {
  const postId = request.params.postId;

  try {
    const publishPost = await Post.findOneAndUpdate(
      { _id: postId },
      { isPublished: true }
    );

    if (!publishPost) {
      return response.status(400).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(201).send({ message: POST_PUBLISHED });
    }
  } catch (error) {
    return response.status(400).send({
      message: error.message,
    });
  }
}

// get Drafts service
async function getDrafts(request, response) {
  const userId = request.params.userId;

  try {
    const draftPosts = await Post.find({
      userId: userId,
      isPublished: false,
    })
      .populate("userId")
      .sort({ createdAt: -1 });

    if (!draftPosts) {
      return response.status(400).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(200).json(draftPosts);
    }
  } catch (error) {
    return response.status(500).send({
      message: error.message,
    });
  }
}

// delete post service
async function deletePost(request, response) {
  const postId = request.params.postId;

  try {
    const deletedPost = await Post.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return response.status(400).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(200).send({ message: POST_DELETED });
    }
  } catch (error) {
    return response.status(500).send({
      message: error.message,
    });
  }
}

//get All posts
async function getAll(response) {
  try {
    const publishedPosts = await Post.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate("userId");

    if (!publishedPosts) {
      return response.status(404).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(200).json(publishedPosts);
    }
  } catch (error) {
    return response.status(500).send({
      message: error.message,
    });
  }
}

// get My Posts
async function getMyPosts(request, response) {
  const userId = request.params.userId;

  try {
    const publishedPosts = await Post.find({
      isPublished: true,
      userId: userId,
    })
      .sort({ createdAt: -1 })
      .populate("userId");

    if (!publishedPosts) {
      return response.status(404).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(200).json(publishedPosts);
    }
  } catch (error) {
    return response.status(500).send({
      message: error.message,
    });
  }
}
