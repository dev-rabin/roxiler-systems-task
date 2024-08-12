const mysql = require("mysql2/promise");
require("dotenv").config();

let database;

async function initializeDatabase() {
    try {
        database = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASENAME,
        });
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err; 
    }
}

initializeDatabase(); 

module.exports = {
    query: async (...args) => {
        if (!database) {
            throw new Error("Database connection is not initialized");
        }
        return database.query(...args);
    },
};
