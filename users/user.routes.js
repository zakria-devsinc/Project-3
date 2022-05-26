const verifyToken = require("../jwt.js");

module.exports = (app) => {

  const users = require("./users.controller.js");

  let router = require("express").Router();

  router.post("/signup", users.create);

  router.post("/signin", users.login)


  app.use("/api", router);
};
