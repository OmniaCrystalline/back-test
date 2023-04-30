/** @format */

const {
  movieAddValid,
  movieOneValid,
  movieDeleteValid,
  movieUpdate,
} = require("../schemas/movie.schema");
const { Movie } = require("../schemas/movie.schema");
const { pagValidator, getPagedData } = require("../middlewares/paginator");
const { ObjectId } = require("mongodb");

async function add(req, res, next) {
  const { user } = req;
  const { value, error } = movieAddValid.validate(req.body);
  if (error) return res.status(500).json({ message: error.message });
  if (value) {
    value.owner = user._id;
    const movie = await Movie.create(value);
    return res.json({ message: movie });
  }
}

async function current(req, res, next) {
  // page, limit or {} in req
  const { user } = req;
  if (req.body.length === 0) {
    const movies = await Movie.find({ owner: user._id });
    return res.json({ allUserMovies: movies });
  } else {
    const { error, value } = pagValidator.validate(req.body);
    if (error) return res.status(500).json({ message: error.message });
    if (value) {
      const response = await getPagedData(Movie, value.page, value.limit);
      return res.json({ pagedData: response });
    }
  }
}

async function one(req, res, next) {
  const { user } = req;
  const { value, error } = movieOneValid.validate(req.body);
  if (error) return res.status(500).json({ message: error.message });
  if (value) {
    const item = await Movie.findById(value._id);
    if (item.owner === new ObjectId(user._id).toString()) {
      return res.json({ one: item });
    }
  }
}

async function remove(req, res, next) {
  const { user } = req;
  const { value, error } = movieDeleteValid.validate(req.body);
  if (error) return res.status(500).json({ message: error.message });
  if (value) {
    const item = await Movie.findOne(value);
    if (item.owner === new ObjectId(user._id).toString()) {
      await Movie.deleteOne(item);
      return res.json({ deleted: item });
    }
  }
}

async function update(req, res, next) {
  const { user } = req;
  const { value, error } = movieUpdate.validate(req.body);
  if (error) return res.status(500).json({ message: error.message });
  if (value.length === 0)
    return res
      .status(500)
      .json({ message: "requires at list one fileld to be updated" });
  if (value) {
    const item = await Movie.findById(value._id);
    if (item.owner === new ObjectId(user._id).toString()) {
      const updatedItem = await Movie.findByIdAndUpdate(item._id, value, {
        new: true,
      });
      return res.json({ udpeted: updatedItem });
    }
  }
}
module.exports = {
  add,
  current,
  one,
  remove,
  update,
};
