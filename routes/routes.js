module.exports = (router) => {
  require("../posts/posts.router")(router);
  require("../users/users.router")(router);
};
