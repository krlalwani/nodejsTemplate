const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const { promisify } = require("util");

exports.protect = catchAsyncError(async (req, res, next) => {
  //1 check token if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; //removing Bearer from start of authorization header
  }
  //2 token verify
  if (!token) {
    return next(
      new AppError("You are not logged in, Please generate token", 401)
    );
  }
  console.log(jwt.verify(token, process.env.JWT_KEY));
  const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_KEY);
  console.log(decodedToken); //retrieving user id from token

  //3 check if user exists
  //4 chk if user changed password after token issued
  next();
});
