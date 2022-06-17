const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { database } = require("./db");
const verifyToken = require("./middlewares/jwt");
const { constants } = require("./constants/constants");
const { RUNNING_PORT } = constants;
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
app.use(verifyToken);
app.use("/api", router);

database.connectDatabase();

require("./routes/routes")(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`${RUNNING_PORT} ${PORT}`);
});
