const { constants } = require("../constants/constants.js");
const { INPUTS_REQUIRED } = constants;

const validateUserCreate = (request, response, next) => {
  const { name, email, password } = request.body;

  if (!(name && email && password)) {
    return response.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

const validateSignIn = (request, response, next) => {
  const { email, password } = request.body;

  if (!(email && password)) {
    return response.status(400).send({ message: INPUTS_REQUIRED });
  }

  next();
};

module.exports = { validateSignIn, validateUserCreate };
