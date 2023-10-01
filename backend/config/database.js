const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const connectDatabase = () =>
  mongoose
    .connect(DB)
    .then(() => console.log("Connected to MongoAtlas remote DB!"))
    .catch((err) => console.log("Error ❌. CONNECTION TO DB FAILED..."));

module.exports = connectDatabase;
