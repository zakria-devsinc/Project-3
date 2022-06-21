const { constants } = require("../constants/constants.js");
const { INPUTS_REQUIRED } = constants;

const validatePostCreate = (req, res, next) => {
  const { title, content } = req.body;

  if (!(title && content)) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

const validateEdit = (req, res, next) => {
  const { post_id, title, content } = req.body;

  if (!(post_id, title && content)) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

const validatePostId = (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

const validateUserId = (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

module.exports = {
  validateEdit,
  validatePostId,
  validatePostCreate,
  validateUserId,
};
