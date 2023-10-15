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
