const express = require("express");
const CombinedAPIController = require("../controller/combinedAPIController");
const CombinedAPIRouter = express.Router();

CombinedAPIRouter.get("/combined", CombinedAPIController);


module.exports = CombinedAPIRouter;