const express = require("express");
const InitialiseDBRouter = express.Router();
const InitialiseDBController = require("../controller/initialiseDBController");


InitialiseDBRouter.get("/init", InitialiseDBController);


module.exports = InitialiseDBRouter;