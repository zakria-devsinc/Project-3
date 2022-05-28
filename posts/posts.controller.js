const db = require("../db");
const Post = db.posts;

//create userid
exports.create = (req, res) => {
  const { title, content, isPublished, userId } = req.body;

  if (!(title && content && isPublished && userId)) {
    return res.status(400).send({ message: "All inputs required" });
  }

  const post = new Post({
    title: title,
    content: content,
    userId: userId,
    isPublished: false,
  });

  post
    .save(post)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the draft post",
      });
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
  const { post_id } = req.body;

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
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: "All inputs required" });
  }

  try {
    const draftPosts = await Post.find({ userId: id, isPublished: false });

    if (!draftPosts) {
      return res
        .status(400)
        .send({ message: "draft post not found with given id " });
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
  const { post_id } = req.body;

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
    const publishedPOsts = await Post.find({ isPublished: true });

    if (!publishedPOsts) {
      return res.status(400).send({ message: "published post not founds " });
    } else {
      return res.status(201).json(publishedPOsts);
    }
  } catch (error) {
    return res.status(500).send({
      message:
        error.message ||
        "Some error occurred while fetching the published posts",
    });
  }
};
