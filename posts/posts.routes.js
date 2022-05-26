const verifyToken = require("../jwt.js");

module.exports = (app) => {

    const posts = require("./posts.controller.js")

    let router = require("express").Router();

    router.post("/drafts", verifyToken, posts.create);

    router.put("/updatepost", verifyToken, posts.edit);

    router.put("/publish", verifyToken, posts.publish);

    router.delete("/deletepost", verifyToken, posts.delete);

    router.get("/drafts/:id", verifyToken, posts.getDrafts);

    router.get("/posts", posts.getAll)


    app.use("/api", router)
}