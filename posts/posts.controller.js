const { db } = require("../db");
const Post = db.posts;

//create userid
exports.create = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.session?.user?._id;

  if (!(title && content)) {
    return res.status(400).send({ message: "All inputs required" });
  } else if (!userId) {
    return res.status(400).send({ message: "Session Timeout Please SignIn" });
  }

  const post = new Post({
    title: title,
    content: content,
    userId: userId,
    isPublished: false,
  });

  await post.save((error, result) => {
    if (error) {
      return res.status(500).send({
        message:
          error.message || "Some error occurred while creating the draft post",
      });
    } else {
      res.status(200).send({
        post_id: result._id,
        title: result.title,
        content: result.content,
        isPublished: result.isPublished,
      });
    }
  });
};

// edit posts
exports.edit = async (req, res) => {
  const { post_id, title, content } = req.body;

  if (!(post_id, title && content)) {
    return res.status(400).send({ message: "All inputs required" });
  }

  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: post_id },
      { title, content }
    );

    if (!updatedPost) {
      return res
        .status(400)
        .send({ message: "post not found with given id for updation" });
    } else {
      return res.status(201).send({ message: "post updated" });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while updating the post",
    });
  }
};

// publish post
exports.publish = async (req, res) => {
  const post_id = req.params.post_id;

  if (!post_id) {
    return res.status(400).send({ message: "All inputs required" });
  }

  try {
    const publishPost = await Post.findOneAndUpdate(
      { _id: post_id },
      { isPublished: true }
    );

    if (!publishPost) {
      return res
        .status(400)
        .send({ message: "post not found with given id for publishing" });
    } else {
      return res.status(201).send({ message: "post published" });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while publishing the post",
    });
  }
};

// get drafts
exports.getDrafts = async (req, res) => {
  const userId = req.session?.user?._id;

  if (!userId) {
    return res.status(400).send({ message: "Session Timeout Please SignIn" });
  }

  try {
    const draftPosts = await Post.find({ userId: userId, isPublished: false });

    if (!draftPosts) {
      return res
        .status(400)
        .send({ message: "drafts posts not found with given id " });
    } else {
      return res.status(201).json(draftPosts);
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while fetching the drafts",
    });
  }
};

// delete posts
exports.delete = async (req, res) => {
  const post_id = req.params.post_id;

  if (!post_id) {
    return res.status(400).send({ message: "All inputs required" });
  }

  try {
    const deletedPost = await Post.findOneAndDelete({ _id: post_id });

    if (!deletedPost) {
      return res
        .status(400)
        .send({ message: "Post not found with given id for deletion" });
    } else {
      return res.status(201).send({ message: "Post deleted" });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while deleting the post",
    });
  }
};

// get all published posts
exports.getAll = async (req, res) => {
  try {
    const publishedPosts = await Post.find({ isPublished: true });

    if (!publishedPosts) {
      return res.status(400).send({ message: "published post not founds " });
    } else {
      return res.status(201).json(publishedPosts);
    }
  } catch (error) {
    return res.status(500).send({
      message:
        error.message ||
        "Some error occurred while fetching the published posts",
    });
  }
};

//  get my posts
exports.getMyPosts = async (req, res) => {
  const userId = req.session?.user?._id;
  if (!userId) {
    return res.status(400).send({ message: "Session Timeout Please SignIn" });
  }

  try {
    const publishedPosts = await Post.find({
      isPublished: true,
      userId: userId,
    });

    if (!publishedPosts) {
      return res.status(400).send({ message: "my post not founds " });
    } else {
      return res.status(201).json(publishedPosts);
    }
  } catch (error) {
    return res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the my posts",
    });
  }
};
