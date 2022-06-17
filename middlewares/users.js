const { constants } = require("../constants/constants.js");
const { INPUTS_REQUIRED } = constants;
exports.verifyUserCreate = (request, response, next) => {
  const { name, email, password } = request.body;

  if (!(name && email && password)) {
    return response.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

exports.verifySignIn = (request, response, next) => {
  const { email, password } = request.body;

  if (!(email && password)) {
    return response.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};
