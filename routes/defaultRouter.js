const express = require("express");
const defaultRouter = express.Router();
const defaultController = require("../controllers/defaultController");
const authController = require("./../controllers/authController");
defaultRouter
  .route("/")
  .get(defaultController.default)
  .post(defaultController.default);
defaultRouter
  .route("/create")
  .post(authController.protect, defaultController.create);
defaultRouter
  .route("/readAll")
  .post(authController.protect, defaultController.readAll);
defaultRouter.route("/readOne").post(defaultController.readOne);
defaultRouter.route("/update").post(defaultController.update);
defaultRouter.route("/delete").post(defaultController.delete);

module.exports = defaultRouter;
