const mongoose = require("mongoose");
require("dotenv").config();
const database = {};

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
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log("cannot Connected to the database", err);
      process.exit();
    });
};
module.exports = { database };
