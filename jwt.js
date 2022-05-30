const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, {
      expiresIn: process.env.token_duration,
    });

    req.user = decoded;
  } catch (error) {
    return res.status(403).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
