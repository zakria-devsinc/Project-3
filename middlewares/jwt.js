const jwt = require("jsonwebtoken");
const { constants } = require("../constants/constants.js");
const { TOKEN_REQUIRED, TOKEN_TYPE, INVALID_TOKEN } = constants;

const verifyToken = (req, res, next) => {
  const excludedUrls = ["/api/signup", "/api/signin", "/api/posts"];
  const token = req.body.token || req.query.token || req.headers[TOKEN_TYPE];

  if (excludedUrls.indexOf(req.url) > -1) {
    return next();
  }

  if (!token) {
    return res.status(403).send({ message: TOKEN_REQUIRED });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_DURATION,
      });

      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(403).send({ message: INVALID_TOKEN });
    }
  }
};

module.exports = verifyToken;
