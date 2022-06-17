module.exports = (router) => {
  require("../posts/posts.controller")(router);
  require("../users/users.controller")(router);
};
