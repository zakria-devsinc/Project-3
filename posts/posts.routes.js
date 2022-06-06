const verifyToken = require("../jwt.js");

module.exports = (router) => {
  const posts = require("./posts.controller.js");

  router.post("/posts/drafts/:userId", verifyToken, posts.create);
  router.get("/posts", posts.getAll);
  router.patch("/post", verifyToken, posts.edit);
  router.patch("/post/publish/:post_id", verifyToken, posts.publish);
  router.delete("/post/:post_id", verifyToken, posts.delete);
  router.get("/user/posts/:userId", verifyToken, posts.getMyPosts);
  router.get("/posts/drafts/:userId", verifyToken, posts.getDrafts);
};
