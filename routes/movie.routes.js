/** @format */

const express = require("express");
const movieRouter = express.Router();
const { tryCatchWrapper } = require("../middlewares/wrapper");
const movieController = require("../models/movie.model");
const { auth } = require("../middlewares/auth");

movieRouter.post(
  "/add",
  tryCatchWrapper(auth),
  tryCatchWrapper(movieController.add)
);
movieRouter.get(
  "/current",
  tryCatchWrapper(auth),
  tryCatchWrapper(movieController.current)
);
movieRouter.get(
  "/one",
  tryCatchWrapper(auth),
  tryCatchWrapper(movieController.one)
);
movieRouter.delete(
  "/delete",
  tryCatchWrapper(auth),
  tryCatchWrapper(movieController.remove)
);
movieRouter.patch(
  "/update",
  tryCatchWrapper(auth),
  tryCatchWrapper(movieController.update)
);

module.exports = {
  movieRouter,
  movieController,
};
