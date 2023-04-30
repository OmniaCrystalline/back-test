/** @format */

require("dotenv").config();
const {app} = require('./app')
const mongoose = require("mongoose");
const PORT = 3000;
const logger = require("morgan");
const cors = require("cors");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const { URL } = process.env

app.use(logger(formatsLogger));
app.use(cors());

async function main() {
  try {
    if (!URL) {
      throw new Error("HOST_DB not set!");
    }
    await mongoose.connect(URL);
    console.log("Database connection successful");
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main()
