const app = require("./app");

// import and path should be placed together
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
const connectDatabase = require("./config/database");

// Handling uncaught exceptions - like using a variable without defining it
// need to write it at the begining so that all such exceptions can be caught
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exceptions.`);
  process.exit(1);
});

// CONNECTING TO DATABASE
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
