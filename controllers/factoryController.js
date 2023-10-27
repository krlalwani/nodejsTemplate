const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");

exports.deleteOne = (Model) =>
  catchAsyncError(async (req, res, next) => {
    await Model.deleteOne(req.body);
    res.status(202).json({
      status: "deleted",
    });
  });

exports.readAll = (Model) => {
  catchAsyncError(async (req, res, next) => {
    const users = await Model.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  });
};
