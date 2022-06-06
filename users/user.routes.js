module.exports = (router) => {
  const users = require("./users.controller.js");

  router.post("/signup", users.create);
  router.post("/signin", users.login);
};
