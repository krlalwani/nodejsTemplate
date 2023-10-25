const { SchemaTypeOptions } = require("mongoose");
const defaultModel = require("./../models/defaultModel");

exports.default = async (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

exports.create = async (req, res) => {
  const user = req.body;
  await defaultModel.create(user);
  res.status(201).json({
    status: "created",
    results: 1,
    data: user,
  });
};

exports.readAll = async (req, res) => {
  const users = await defaultModel.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
};

exports.readOne = async (req, res) => {
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
};

exports.update = async (req, res) => {
  const name = req.body.name;
  const users = await defaultModel.findOneAndUpdate(
    { name: name },
    { remarks: req.body.remarks }
  );
  res.status(200).json({
    status: "success",
    results: users.length,
  });
};

exports.delete = async (req, res) => {
  await defaultModel.deleteOne(req.body);
  res.status(202).json({
    status: "deleted",
  });
};
