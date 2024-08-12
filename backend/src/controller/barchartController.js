const database = require("../../database");

const BarchartController = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).send("Month is required!");
        }

        const query = `
            SELECT 
                SUM(CASE WHEN price BETWEEN 0 AND 100 THEN 1 ELSE 0 END) AS range_0_100,
                SUM(CASE WHEN price BETWEEN 101 AND 200 THEN 1 ELSE 0 END) AS range_101_200,
                SUM(CASE WHEN price BETWEEN 201 AND 300 THEN 1 ELSE 0 END) AS range_201_300,
                SUM(CASE WHEN price BETWEEN 301 AND 400 THEN 1 ELSE 0 END) AS range_301_400,
                SUM(CASE WHEN price BETWEEN 401 AND 500 THEN 1 ELSE 0 END) AS range_401_500,
                SUM(CASE WHEN price BETWEEN 501 AND 600 THEN 1 ELSE 0 END) AS range_501_600,
                SUM(CASE WHEN price BETWEEN 601 AND 700 THEN 1 ELSE 0 END) AS range_601_700,
                SUM(CASE WHEN price BETWEEN 701 AND 800 THEN 1 ELSE 0 END) AS range_701_800,
                SUM(CASE WHEN price BETWEEN 801 AND 900 THEN 1 ELSE 0 END) AS range_801_900,
                SUM(CASE WHEN price >= 901 THEN 1 ELSE 0 END) AS range_901_above
            FROM products
            WHERE MONTHNAME(dateOfSale) = ?
        `;

        const [rows] = await database.query(query, [month]);

        const data = {
            "0-100": rows[0].range_0_100 || 0,
            "101-200": rows[0].range_101_200 || 0,
            "201-300": rows[0].range_201_300 || 0,
            "301-400": rows[0].range_301_400 || 0,
            "401-500": rows[0].range_401_500 || 0,
            "501-600": rows[0].range_501_600 || 0,
            "601-700": rows[0].range_601_700 || 0,
            "701-800": rows[0].range_701_800 || 0,
            "801-900": rows[0].range_801_900 || 0,
            "901-above": rows[0].range_901_above || 0,
        };

        console.log("Bar chart data : ",data);
        
        res.status(200).json({
            success: true,
            data
        });

    } catch (err) {
        console.error("Error while fetching bar chart data", err);
        if (!res.headersSent) {
            res.status(500).send("Failed to fetch bar chart data");
        }
    }
};

module.exports = BarchartController;
