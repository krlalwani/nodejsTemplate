const express = require("express");
const defaultRouter = express.Router();
const defaultController = require("./../controllers/defaultController");

defaultRouter.route("/").get(defaultController.default);

module.exports = defaultRouter;
