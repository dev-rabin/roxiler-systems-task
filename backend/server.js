const express = require("express")
const app = express();
const port = "1002";
const cors = require("cors");
const database = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    database.ping((err) => {
        if (err) {
            res.send("Server down...");
            console.error("Server down...",err);
        } else {
            res.send("Server is online...");
            console.log("Server is online...");
        }
    })
})

const InitialiseDBRouter = require("./src/routes/initialiseDBRoute");
app.use("/api", InitialiseDBRouter);

const TransactionsRouter = require("./src/routes/transactionsRouter");
app.use("/api", TransactionsRouter);

const StatisticsRouter = require("./src/routes/statisticsRouter");
app.use("/api", StatisticsRouter);

const BarchartRouter = require("./src/routes/barchartRouter");
app.use("/api", BarchartRouter);

const PiechartRouter = require("./src/routes/picahartRouter");
app.use("/api",PiechartRouter);

app.listen(port, ()=>{
    console.log(`Server is online at port ${port}`);
});

