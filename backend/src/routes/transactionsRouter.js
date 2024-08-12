const express = require("express");
const TransactionsRouter = express.Router();
const TransactionsController = require("../controller/transactionsController");

TransactionsRouter.get("/transactions", TransactionsController);


module.exports = TransactionsRouter;