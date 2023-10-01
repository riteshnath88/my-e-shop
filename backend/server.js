const app = require("./app");

// import and path should be placed together
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
const connectDatabase = require("./config/database");

// CONNECTING TO DATABASE
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
