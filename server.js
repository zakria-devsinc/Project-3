const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();

let urlEncodedParser = bodyParser.urlencoded({ extended: true });

let corsOptions = {
  origin: "*",
};

app.use(urlEncodedParser);
app.use(cors(corsOptions));
app.use(bodyParser.json());

const db = require("./db");
const verifyToken = require("./jwt");

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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.post("/welcome", verifyToken, (req, res) => {
  res.json({ message: "Welcome to my appli  cation" });
});

//users routes
require("./users/user.routes")(app);
// posts routes
require("./posts/posts.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is runnig on the port ${PORT}`);
});
