const mongoose = require("mongoose");
require("dotenv").config();
const db = {};

db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.users = require("./users/users.model");
db.posts = require("./posts/posts.model");

db.connectDatabase = () => {
  mongoose
    .connect(db.url, {
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
module.exports = { db };
