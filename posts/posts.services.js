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

// draft create service
const create = async (request, response) => {
  const { title, content } = request.body;
  const userId = request.params.userId;

  try {
    const user = await User.find({ _id: userId });

    if (user) {
      const post = new Post({
        title: title,
        content: content,
        userId: userId,
      });
      await post.save((error, result) => {
        if (result) {
          return response.status(201).send({ message: DRAFT_CREATED });
        } else {
          return response.status(500).send({ message: DRAFT_ERROR });
        }
      });
    } else {
      return response.status(404).send({ message: USER_NOT_FOUND });
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

//post edit service
const edit = async (request, response) => {
  const { postId, title, content } = request.body;

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { title: title, content: content }
    );

    if (!updatedPost) {
      return response.status(404).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(201).send({ message: POST_UPDATED });
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

// post publish service
const publish = async (request, response) => {
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
};

// get Drafts service
const getDrafts = async (request, response) => {
  const userId = request.params.userId;

  try {
    const draftPosts = await Post.find({
      userId: userId,
      isPublished: false,
    })
      .populate("userId")
      .sort({ updatedAt: -1 });

    if (!draftPosts) {
      return response.status(400).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(200).json(draftPosts);
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

// delete post service
const deletePost = async (request, response) => {
  const postId = request.params.postId;

  try {
    const deletedPost = await Post.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return response.status(400).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(200).send({ message: POST_DELETED });
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

//get All posts
const getAll = async (response) => {
  try {
    const publishedPosts = await Post.find({ isPublished: true })
      .sort({ updatedAt: -1 })
      .populate("userId");

    if (!publishedPosts) {
      return response.status(404).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(200).json(publishedPosts);
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

// get My Posts
const getMyPosts = async (request, response) => {
  const userId = request.params.userId;

  try {
    const publishedPosts = await Post.find({
      isPublished: true,
      userId: userId,
    })
      .sort({ updatedAt: -1 })
      .populate("userId");

    if (!publishedPosts) {
      return response.status(404).send({ message: POST_NOT_FOUND });
    } else {
      return response.status(200).json(publishedPosts);
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

module.exports = {
  create,
  edit,
  publish,
  getDrafts,
  getAll,
  deletePost,
  getMyPosts,
};
