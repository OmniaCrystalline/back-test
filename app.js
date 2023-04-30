/** @format */
const express = require("express");
const app = express();
const { userRouter } = require("./routes/user.routes");
const { Types } = require("mongoose");
const { errorHandler } = require("./middlewares/errorHandler");
const {movieRouter} = require("./routes/movie.routes")


app.use(express.json());
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use(errorHandler);



app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
    console.log('req 500', req)
  console.log("500", err);
  if (!Types.ObjectId.isValid(req.params.id))
    res.status(404).json({ message: "Not found" });
  return res.status(500).json({ message: err.message });
});


module.exports = {
    app,
}

