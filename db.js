const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL || "mongodb://localhost:27017/posts";
db.users = require("./users/users.model");
db.posts = require("./posts/posts.model");
module.exports = db;
