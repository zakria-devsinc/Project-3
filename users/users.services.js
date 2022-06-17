const { database } = require("../db");
const User = database.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { constants } = require("../constants/constants.js");
const { USER_EXISTS, SIGNED_UP, INVALID_CREDENTIALS } = constants;

module.exports = {
  create,
  signIn,
};

//create user service
async function create(request, response) {
  const { name, email, password } = request.body;

  try {
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      response.status(409).send({ message: USER_EXISTS });
      return;
    }

    const user = new User({
      name: name,
      email: email.toLowerCase(),
      password: password,
    });

    await user.save((error, result) => {
      if (error) {
        response.status(500).send({
          message: error.message,
        });
      } else {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.SECRET_KEY,
          { expiresIn: process.env.TOKEN_DURATION }
        );

        user.token = token;
        response.status(201).send({ message: SIGNED_UP });
      }
    });
  } catch (error) {
    return response.status(500).send({
      message: error.message,
    });
  }
}

//sign in user service
async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_DURATION }
      );

      user.token = token;
      res
        .status(200)
        .send({ user_id: user._id, name: user.name, token: user.token });
    } else res.status(400).send({ message: INVALID_CREDENTIALS });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
