// async errors cannot be handled by the following error
// handler. it requires try catch blocks in the async
// function. But it is not ideal to write try catch in
// every controller.

const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongodb id error - if the id is not in the format, mongodb will give error
  // Cast to object failed
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    err = new ErrorHandler(message, 400);
  }

  // JSON web token error
  if (err.name === "JSONWebTokenError") {
    const message = `JSON web token is invalid, try again.`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expire error
  if (err.name === "TokenExpireError") {
    const message = `JSON web token is expired. Try again with a new token.`;
    err = new ErrorHandler(message, 400);
  }

  if (process.env.PROCESS_ENV == "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stackTrace: err.stack,
    });
  } else if (process.env.PROCESS_ENV == "production") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
};
