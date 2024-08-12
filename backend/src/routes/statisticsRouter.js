const express = require("express");
const StatisticsController = require("../controller/statisticsController");
const StatisticsRouter = express.Router();

StatisticsRouter.get("/statistics", StatisticsController);

module.exports = StatisticsRouter;