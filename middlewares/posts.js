const { constants } = require("../constants/constants.js");
const { INPUTS_REQUIRED } = constants;

export const verifyDraftRequest = (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.params.userId;

  if (!(title && content && userId)) {
    return res.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};
