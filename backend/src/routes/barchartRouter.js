const express = require("express");
const BarchartRouter = express.Router();
const BarchartController = require("../controller/barchartController");

BarchartRouter.get("/barchart", BarchartController);

module.exports = BarchartRouter;
