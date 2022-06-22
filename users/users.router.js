const { validateUserCreate, validateSignIn } = require("../middlewares/users");
const { login, create } = require("./users.controller");

module.exports = (router) => {
  router.post("/signup", validateUserCreate, create);
  router.post("/signin", validateSignIn, login);
};
