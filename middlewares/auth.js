/** @format */

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../schemas/user.schema");

const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";

  const [tokenType, token] = authHeader.split(" ");
  if (tokenType === "Bearer" && token) {
    try {
      const verifiedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findOne({ _id: verifiedToken.userId });
      if (!user) {
        throw new Unauthorized("No user with such id");
      }
      if (!user.token) {
        throw new Unauthorized("token is invalid");
      }
      req.user = user;
      return next();
    } catch (error) {
      next(error);
    }
  } else {
    next(new Unauthorized("No token"));
  }
}

module.exports = {
  auth,
};
