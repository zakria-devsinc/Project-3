module.exports = (router) => {
  const users = require("./users.controller.js");

  router.post("/signup", users.create);
  router.post("/signin", users.login);
  router.get("/signout", users.signout);
  router.get("/issigned", users.isSigned);
};
