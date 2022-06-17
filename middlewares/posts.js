const { constants } = require("../constants/constants.js");
const { INPUTS_REQUIRED } = constants;

exports.verifyPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!(title && content)) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

exports.verifyEdit = (req, res, next) => {
  const { post_id, title, content } = req.body;

  if (!(post_id, title && content)) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

exports.verifyPostId = (req, res, next) => {
  const postId = req.params.postId;

  if (!postId) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

exports.verifyUserId = (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};
