const {
  verifyPost,
  verifyPostId,
  verifyUserId,
  verifyEdit,
} = require("../middlewares/posts");
const post_service = require("./posts.services");

module.exports = (router) => {
  router.post("/posts/drafts/:userId", verifyPost, verifyUserId, create);
  router.patch("/post", verifyEdit, edit);

  router.get("/posts", getAllPosts);
  router.patch("/post/publish/:postId", verifyPostId, publish);
  router.delete("/post/:postId", verifyPostId, deletePost);
  router.get("/user/posts/:userId", verifyUserId, getMyPosts);
  router.get("/posts/drafts/:userId", verifyUserId, getDrafts);
};

// create drafts
function create(req, res, next) {
  post_service
    .create(req, res)
    .then((response) => {
      return response;
    })
    .catch((error) => console.info(error));
}

// // edit posts
function edit(req, res, next) {
  post_service
    .edit(req, res)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.info(error);
    });
}

//publish post
function publish(req, res, next) {
  post_service
    .publish(req.body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.info(error);
    });
}

//get Drafts
function getDrafts(req, res, next) {
  post_service
    .getDrafts(req, res)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.info(error);
    });
}

// delete post
function deletePost(req, res, next) {
  post_service
    .deletePost(req, res)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.info(error);
    });
}

// get All posts
function getAllPosts(req, res, next) {
  post_service
    .getAll(res)
    .then((response) => {
      // return response
    })
    .catch((error) => {
      console.info(error);
    });
}

//get User posts
function getMyPosts(req, res, next) {
  post_service
    .getMyPosts(req, res)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.info(error);
    });
}
