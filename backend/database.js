const mysql = require("mysql2");
require("dotenv").config();

const database = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_DATABASENAME
})

database.ping((err)=> {
    if (err) {
        console.error("Database not connected!");
    } else {
        console.log("Database is connected");
    }
})


module.exports = database;