/** @format */
const { userRegister, userLogin } = require("../schemas/user.schema");
const { User } = require("../schemas/user.schema");
const { hashPassword, verifyPassword } = require("../middlewares/bcrypt");
const { generateToken, verifyToken } = require("../middlewares/jwt");

async function register(req, res, next) {
  const { value, error } = userRegister.validate(req.body);
  if (error) return res.status(500).json({ message: error.message });
  const alreadyRegistered = await User.findOne({ email: value.email });
  if (alreadyRegistered)
    return res.status(500).json({ message: "this email already registered" });
  if (!alreadyRegistered) {
    value.password = await hashPassword(value.password);
    value.token = null;
    const user = new User(value);
    const result = await user.save();
    return res.json({
      message: `user ${result.username} was created`,
    });
  }
}

async function login(req, res, next) {
  const { error, value } = userLogin.validate(req.body);
  if (error) return res.status(500).json({ message: error.message });
  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(500).json({ message: "register email" });
  const passwordCorrect = verifyPassword(value.password, user.password);
  if (!passwordCorrect)
    return res.status(500).json({ message: "password is not correct" });
  if (user && passwordCorrect) {
    const token = generateToken(user._id);
    user.token = token;
    const update = await User.findByIdAndUpdate(user._id, user, { new: true });
    return res.json({
      message: update.token,
    });
  }
}

async function current(req, res, next) {
  const { user } = req;
  return res.json({
    username: user.username,
    email: user.email,
  });
}

async function logout(req, res, next) {
  const { user } = req;
  user.token = null;
  const response = await User.findByIdAndUpdate(user._id, user, { new: true });
  return res.status(204).json({ message: `${user.username} has been logout` });
}

module.exports = {
  register,
  login,
  current,
  logout,
};
