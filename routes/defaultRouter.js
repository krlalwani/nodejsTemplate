const express = require("express");
const defaultRouter = express.Router();
const defaultController = require("../controllers/defaultController");

defaultRouter.route("/").get(defaultController.default);
defaultRouter.route("/create").post(defaultController.create);
defaultRouter.route("/readAll").post(defaultController.readAll);
defaultRouter.route("/readOne").post(defaultController.readOne);
defaultRouter.route("/update").post(defaultController.update);
defaultRouter.route("/delete").post(defaultController.delete);

module.exports = defaultRouter;
