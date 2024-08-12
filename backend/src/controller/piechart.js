const database = require("../../database");

const PieChartController = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).send("Month is required!");
        }

        const query = `
            SELECT category, COUNT(*) AS itemCount
            FROM products
            WHERE MONTHNAME(dateOfSale) = ?
            GROUP BY category;
        `;


        const [rows] = await database.query(query, [month]);

        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No data found for the specified month." });
        }

        
        res.status(200).json({
            success: true,
            data: rows
        });

    } catch (error) {
        console.error("Error fetching pie chart data:", error);
        if (!res.headersSent) {
            res.status(500).send("Failed to fetch pie chart data");
        }
    }
};

module.exports = PieChartController;
