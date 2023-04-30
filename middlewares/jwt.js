/** @format */

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { ObjectId } = require("mongodb");


function generateToken(userId) {
  const payload = { userId: new ObjectId(userId).toString() };
  const secretKey = JWT_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}

function verifyToken(token) {
  const secretKey = JWT_SECRET
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
