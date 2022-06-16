const { constants } = require("../constants/constants.js");
const { INPUTS_REQUIRED } = constants;

exports.verifyPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!(title && content)) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

exports.verifyPostId = (req, res, next) => {
  const postId = req.params.userId;

  if (!postId) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};
