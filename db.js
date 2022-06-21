const mongoose = require("mongoose");
const { constants } = require("./constants/constants");
require("dotenv").config();
const database = {};
const { CONNECTED, NOT_CONNECTED } = constants;

database.mongoose = mongoose;
database.url = process.env.MONGODB_URI;
database.users = require("./users/users.model");
database.posts = require("./posts/posts.model");

database.connectDatabase = () => {
  mongoose
    .connect(database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(CONNECTED);
    })
    .catch((err) => {
      console.log(NOT_CONNECTED, err);
      process.exit();
    });
};

module.exports = { database };
