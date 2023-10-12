const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Register a user
exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profileUrl",
    },
  });

  // getJWTToken() is a static method defined in the userModel
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user has given email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // To check if the password is correct - comparePassword() method is available in model
  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpsOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
