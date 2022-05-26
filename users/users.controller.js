const db = require("../db");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../db.config.js");

// user creation
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

  user
    .save(user)
    .then(() => {
      const token = jwt.sign({ user_id: user._id, email }, config.secretKey, {
        expiresIn: "2h",
      });

      user.token = token;
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user",
      });
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
      const token = jwt.sign({ user_id: user._id, email }, config.secretKey, {
        expiresIn: "2h",
      });

      user.token = token;
      res.status(201).json(user);
    } else res.status(400).send({ message: "InValid Credentials" });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the user in login",
    });
  }
};
