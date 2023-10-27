// this file is for  context path definition of APIs
console.log("App.js Called");
const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit"); //for setting api rate limiting
const helmet = require("helmet"); //for setting http security headers
const hpp = require("hpp"); //for handling http parameter pollution

app.use(morgan("dev")); //morgan middleware for capturing req and res
app.use(express.json()); //middleware to modify incoming json requests

app.use(helmet()); //for http security,. check github of helmet to enable other more options
const limiter = rateLimit({
  max: 100, //rate limit to 100 requests
  windowMs: 60 * 64 * 1000, //rate limit to 1 hour,
  message: "Too Many Request, Please try later",
});
app.use("/", limiter); //invoking rate limiter middleware..added for only specified routes

const defaultRouter = require("./routes/defaultRouter");
app.use("/", defaultRouter);

app.all("*", (req, res, next) => {
  //if no route found
  //   const err = new Error("Cannot find ${req.originalUrl}!"); //code block incase appError class is not used.
  //   err.status = "fail";
  //   err.statusCode = 404;
  //   next(err);
  next(new AppError(`Cannot find ${req.originalUrl}!`, 404));
});
app.use(hpp());
app.use(globalErrorHandler);

module.exports = app;
