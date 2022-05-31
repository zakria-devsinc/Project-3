const verifyToken = require("../jwt.js");

module.exports = (router) => {
  const posts = require("./posts.controller.js");

  router.post("/posts/drafts", verifyToken, posts.create);
  router.get("/posts", posts.getAll);
  router.patch("/post", verifyToken, posts.edit);
  router.patch("/post/publish/:post_id", verifyToken, posts.publish);
  router.delete("/post/:post_id", verifyToken, posts.delete);
  router.get("/user/posts", verifyToken, posts.getMyPosts);
  router.get("/posts/drafts", verifyToken, posts.getDrafts);
};
