const {
  validatePostCreate,
  validatePostId,
  validateEdit,
  validateUserId,
} = require("../middlewares/posts");
const {
  getAllPosts,
  getMyPosts,
  deletePost,
  getDrafts,
  publish,
  edit,
  create,
} = require("./posts.controller");

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
