const userServices = require("./users.services");

// user creation using
const create = (req, res, next) => {
  userServices.create(req, res);
};

//  user authenticate and login
const login = (req, res, next) => {
  userServices.signIn(req, res);
};

module.exports = { create, login };
