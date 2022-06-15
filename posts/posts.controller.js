const post_service = require("./posts.service");

module.exports = (router) => {
  router.post("/posts/drafts/:userId", create);
  router.patch("/post", edit);
};

// create drafts
function create(req, res, next) {
  console.log("res");
  post_service
    .create(req, res)
    .then((response) => {
      console.info(response);
    })
    .catch((error) => console.info(error));
}

// // edit posts
function edit(req, res, next) {
  post_service
    .edit(req.body)
    .then((response) => {
      console.info(response);
    })
    .catch((error) => {
      console.info(error);
    });
}

// exports.edit = async (req, res) => {
//   const { postId, title, content } = req.body;

//   if (!(postId, title && content)) {
//     return res.status(400).send({ message: "All inputs required" });
//   }

//   try {
//     const updatedPost = await Post.findOneAndUpdate(
//       { _id: postId },
//       { title, content }
//     );

//     if (!updatedPost) {
//       return res
//         .status(400)
//         .send({ message: "post not found with given id for updation" });
//     } else {
//       return res.status(201).send({ message: "post updated" });
//     }
//   } catch (error) {
//     return res.status(500).send({
//       message: error.message || "Some error occurred while updating the post",
//     });
//   }
// };

// // publish post
// exports.publish = async (req, res) => {
//   const postId = req.params.postId;

//   if (!postId) {
//     return res.status(400).send({ message: "All inputs required" });
//   }

//   try {
//     const publishPost = await Post.findOneAndUpdate(
//       { _id: postId },
//       { isPublished: true }
//     );

//     if (!publishPost) {
//       return res
//         .status(400)
//         .send({ message: "post not found with given id for publishing" });
//     } else {
//       return res.status(201).send({ message: "post published" });
//     }
//   } catch (error) {
//     return res.status(500).send({
//       message: error.message || "Some error occurred while publishing the post",
//     });
//   }
// };

// // get drafts
// exports.getDrafts = async (req, res) => {
//   const userId = req.params.userId;

//   if (!userId) {
//     return res.status(400).send({ message: "Session Timeout Please SignIn" });
//   }

//   try {
//     const draftPosts = await Post.find({ userId: userId, isPublished: false });

//     if (!draftPosts) {
//       return res
//         .status(400)
//         .send({ message: "drafts posts not found with given id " });
//     } else {
//       return res.status(201).json(draftPosts);
//     }
//   } catch (error) {
//     return res.status(500).send({
//       message: error.message || "Some error occurred while fetching the drafts",
//     });
//   }
// };

// // delete post
// exports.delete = async (req, res) => {
//   const postId = req.params.postId;

//   if (!postId) {
//     return res.status(400).send({ message: "All inputs required" });
//   }

//   try {
//     const deletedPost = await Post.findOneAndDelete({ _id: postId });

//     if (!deletedPost) {
//       return res
//         .status(400)
//         .send({ message: "Post not found with given id for deletion" });
//     } else {
//       return res.status(201).send({ message: "Post deleted" });
//     }
//   } catch (error) {
//     return res.status(500).send({
//       message: error.message || "Some error occurred while deleting the post",
//     });
//   }
// };

// // get all published posts
// exports.getAll = async (req, res) => {
//   try {
//     const publishedPosts = await Post.find({ isPublished: true });

//     if (!publishedPosts) {
//       return res.status(400).send({ message: "published post not founds " });
//     } else {
//       return res.status(201).json(publishedPosts);
//     }
//   } catch (error) {
//     return res.status(500).send({
//       message:
//         error.message ||
//         "Some error occurred while fetching the published posts",
//     });
//   }
// };

// //  get my posts
// exports.getMyPosts = async (req, res) => {
//   const userId = req.params.userId;
//   if (!userId) {
//     return res.status(400).send({ message: "Session Timeout Please SignIn" });
//   }

//   try {
//     const publishedPosts = await Post.find({
//       isPublished: true,
//       userId: userId,
//     });

//     if (!publishedPosts) {
//       return res.status(400).send({ message: "my post not founds " });
//     } else {
//       return res.status(201).json(publishedPosts);
//     }
//   } catch (error) {
//     return res.status(500).send({
//       message:
//         error.message || "Some error occurred while fetching the my posts",
//     });
//   }
// };
