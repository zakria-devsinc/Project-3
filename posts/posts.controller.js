const {
  validatePostCreate,
  validatePostId,
  validateEdit,
  validateUserId,
} = require("../middlewares/posts");
const postService = require("./posts.services");

// create drafts
const create = (req, res) => {
  postService
    .create(req, res)
    .then((response) => {
      return response;
    })
    .catch((error) => console.info(error));
};

// // edit posts
const edit = (req, res) => {
  postService.edit(req, res);
};

//publish post
const publish = (req, res) => {
  postService.publish(req, res);
};

//get Drafts
const getDrafts = (req, res) => {
  postService.getDrafts(req, res);
};

// delete post
const deletePost = (req, res) => {
  postService.deletePost(req, res);
};

// get All posts
const getAllPosts = (req, res) => {
  postService.getAll(res);
};

//get User posts
const getMyPosts = (req, res) => {
  postService.getMyPosts(req, res);
};

module.exports = (router) => {
  router.post(
    "/posts/drafts/:userId",
    validatePostCreate,
    validateUserId,
    create
  );
  router.patch("/post", validateEdit, edit);
  router.get("/posts", getAllPosts);
  router.patch("/post/publish/:postId", validatePostId, publish);
  router.delete("/post/:postId", validatePostId, deletePost);
  router.get("/user/posts/:userId", validateUserId, getMyPosts);
  router.get("/posts/drafts/:userId", validateUserId, getDrafts);
};
