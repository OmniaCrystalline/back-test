/** @format */

const { Schema, model } = require("mongoose");
const Joi = require("joi").extend(require('@joi/date'))

const MovieSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  director: {
    type: String,
    required: [true, "director is required"],
  },
  date: {
    type: Date,
    required: [true, "DD-MM-YYYY is required"],
  },
  owner: {
    type: String,
    required: [true, "owner is reqired"],
  },
});

const Movie = model("movie", MovieSchema);

const movieAddValid = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  date: Joi.date().format("DD-MM-YYYY").less("now").required(),
});

const movieOneValid = Joi.object({
    _id: Joi.string().required(),
})

const movieDeleteValid = Joi.object({
  _id: Joi.string().required(),
});

const movieUpdate = Joi.object()
  .keys({
    _id: Joi.string().required(),
    title: Joi.string(),
    director: Joi.string(),
    date: Joi.date().format("DD-MM-YYYY").less("now"),
  })
  .or("title", "director", "date");

module.exports = {
  Movie,
  movieAddValid,
  movieOneValid,
  movieDeleteValid,
  movieUpdate,
};
