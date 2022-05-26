const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db");

require("dotenv").config();

let urlEncodedParser = bodyParser.urlencoded({
  extended: true,
});
let corsOptions = {
  origin: "*",
};

app.use(urlEncodedParser);
app.use(cors(corsOptions));
app.use(bodyParser.json());

db.mongoose
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

//users routes
require("./users/user.routes")(app);
// posts routes
require("./posts/posts.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is runnig on the port ${PORT}`);
});
