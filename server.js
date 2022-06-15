const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { db } = require("./db");

require("dotenv").config();

let urlEncodedParser = bodyParser.urlencoded({
  extended: true,
});
let corsOptions = {
  origin: "*",
};
let router = require("express").Router();

app.use(urlEncodedParser);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api", router);

db.connectDatabase();

router.get("/", (req, res) => {
  res.send({ message: "Welcome to my application" });
});

//users routes created
require("./users/user.routes")(router);
// posts routes created
require("./posts/posts.routes")(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is runnig on the port ${PORT}`);
});
