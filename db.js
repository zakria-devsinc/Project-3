const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./users/users.model");
db.posts = require("./posts/posts.model");
module.exports = db;
