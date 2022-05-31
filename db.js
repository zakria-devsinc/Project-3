const mongoose = require("mongoose");
const db = {};

db.mongoose = mongoose;
db.url =
  process.env.MONGODB_URI ||
  "mongodb+srv://zakria:zakria3637@cluster0.etqfzty.mongodb.net/test";
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
