const { verifyUserCreate, verifySignIn } = require("../middlewares/users");
const user_service = require("./users.services");

module.exports = (router) => {
  router.post("/signup", verifyUserCreate, create);
  router.post("/signin", verifySignIn, login);
};

// user creation using
function create(req, res, next) {
  user_service
    .create(req, res)
    .then((response) => {
      return response;
    })
    .catch((error) => console.info(error));
}

//  user authenticate and login
function login(req, res, next) {
  user_service
    .signIn(req, res)
    .then((response) => {
      return response;
    })
    .catch((error) => console.info(error));
}
