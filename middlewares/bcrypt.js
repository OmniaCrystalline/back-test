/** @format */

const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function verifyPassword(password, hash) {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
};
