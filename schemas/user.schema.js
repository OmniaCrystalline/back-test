/** @format */

const { Schema, model } = require("mongoose");
const Joi = require("joi");


const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    unique: true,
  },
  token: {
    type: String,
    unique: true,
    default: null,
  },
});

const User = model("user", UserSchema);


const userRegister = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).alphanum().required(),
  username: Joi.string().required(),
});

const userLogin = Joi.object({
  password: Joi.string().min(5).alphanum().required(),
  email: Joi.string().email().required(),
});

module.exports = {
  User,
  UserSchema,
  userRegister,
  userLogin,
};
