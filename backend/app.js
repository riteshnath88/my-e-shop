const express = require("express");
const app = express();

app.use(express.json());

// ROUTE IMPORTS
const product = require("./routes/productRoutes");
const exp = require("constants");

app.use("/api/v1", product);

module.exports = app;
