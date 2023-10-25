// this file is for  context path definition of APIs
console.log("App.js Called");
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev")); //morgan middleware for capturing req and res
app.use(express.json()); //middleware to modify incoming json requests

const defaultRouter = require("./routes/defaultRouter");
app.use("/", defaultRouter);

module.exports = app;
