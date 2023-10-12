const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
// ROUTE IMPORTS
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);

// MIDDLEWARE FOR ERROR
app.use(errorMiddleware);

module.exports = app;
