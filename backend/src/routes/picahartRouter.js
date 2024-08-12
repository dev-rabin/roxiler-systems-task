const express = require("express");
const PieChartController = require("../controller/piechart");
const PiechartRouter = express.Router();

PiechartRouter.get("/piechart", PieChartController);

module.exports = PiechartRouter;