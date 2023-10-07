const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// We are commenting out the catch() block because we want that in case of connection failure, we should
// go to the unhandledException block written in server.js where the ,connection is closed and we exit
// from the process. If we write catch here then it's not an unhandled exception.

const connectDatabase = () =>
  mongoose
    .connect(DB)
    .then(() => console.log("Connected to MongoAtlas remote DB!"));
//.catch((err) => console.log("Error ❌. CONNECTION TO DB FAILED..."));

module.exports = connectDatabase;
