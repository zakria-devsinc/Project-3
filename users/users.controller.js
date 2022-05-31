const { db } = require("../db");

const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user creation using
exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    res.status(400).send({ message: "All inputs is required" });
    return;
  }

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    res.status(409).send({ message: "User Already Exist" });
    return;
  }

  const user = new User({
    name: name,
    email: email.toLowerCase(),
    password: password,
  });

  await user.save((error, result) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the user",
      });
    } else {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_DURATION }
      );

      user.token = token;
      res.status(200).send({ message: "Signed Up Succesfully" });
    }
  });
};

//  user authenticate and login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send({ message: "All input is required" });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_DURATION }
      );

      user.token = token;
      req.session.user = user;
      res.status(201).send({ name: user.name, token: user.token });
    } else res.status(400).send({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the user in login",
    });
  }
};

// signout

exports.signout = (req, res) => {
  if (req.session?.user) {
    req.session.user = null;
    res.send({ message: "Signed out Succesfully" });
  } else {
    res.send({ message: "Not logged in" });
  }
};

//is signed

exports.isSigned = (req, res) => {
  if (req.session?.user) {
    return res.send({ message: "User Signed in" });
  } else {
    return res.send({ message: "Session Timeout Please SignIn" });
  }
};
