const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { database } = require("./db");
const verifyToken = require("./middlewares/jwt");
const { constants } = require("./constants/constants");
const { RUNNING_PORT } = constants;
const PORT = process.env.PORT;
require("dotenv").config();
database.connectDatabase();

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

require("./routes/routes")(router);

app.listen(PORT, () => {
  console.info(`${RUNNING_PORT} ${PORT}`);
});
