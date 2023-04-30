/** @format */
const express = require("express");
const userRouter = express.Router();
const { tryCatchWrapper } = require("../middlewares/wrapper");
const userController = require("../models/user.model");
const { auth } = require("../middlewares/auth");

userRouter.post("/register", tryCatchWrapper(userController.register));
userRouter.post("/login", tryCatchWrapper(userController.login));
userRouter.get(
  "/current",
  tryCatchWrapper(auth),
  tryCatchWrapper(userController.current)
);
userRouter.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(userController.logout))

module.exports = {
  userController,
  userRouter,
};
