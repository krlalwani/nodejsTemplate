const { SchemaTypeOptions } = require("mongoose");
const jwt = require("jsonwebtoken");
const defaultModel = require("./../models/defaultModel");
const catchAsyncError = require("./../utils/catchAsyncError");
const { deleteOne } = require("./factoryController");

exports.default = async (req, res) => {
  //user id can be passed in empty braces which will get checked in decoded function to ascertain if it's same user accessing the service
  const token = jwt.sign({ user: "kumar" }, process.env.JWT_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ), //convert days to millisec
    secure: true, ///sending only over secured connection
    httpOnly: true, //http only cookie
  });
  res.status(200).json({
    status: "success",
    data: token, //send JWT Token to response
  });
};

exports.create = catchAsyncError(async (req, res, next) => {
  const user = req.body;
  //pass only the required parameters for user creation. e.g., role should not be passed in user creation else anybody can pass role and get admin access
  await defaultModel.create(user);
  res.status(201).json({
    status: "created",
    results: 1,
    data: user,
  });
});

exports.readAll = readAll(defaultModel);

exports.readOne = catchAsyncError(async (req, res, next) => {
  const user = req.body.name;
  // const tour = await tours.findOne({}).sort({ createdAt: -1 }).limit(1).exec();
  const users = await defaultModel.find({ name: user }).exec(); //exact name match
  if (users.length === 0) {
    const regex = new RegExp(users, "i");
    users = await defaultModel.find({ name: regex }).exec(); //LIKE match
  }
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.update = catchAsyncError(async (req, res, next) => {
  const name = req.body.name;
  const users = await defaultModel.findOneAndUpdate(
    { name: name },
    { remarks: req.body.remarks }
  );
  res.status(200).json({
    status: "success",
    results: users.length,
  });
});

exports.delete = deleteOne(defaultModel);
