const database = require("../../database");

const StatisticsController = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).send("Month is required!");
        }

        const totalSalesQuery = `
            SELECT SUM(price) as totalSalesAmount
            FROM products
            WHERE MONTHNAME(dateOfSale) = ? AND sold = 1
        `;

        const totalItemsSoldQuery = `
            SELECT COUNT(*) as totalSoldItems
            FROM products
            WHERE MONTHNAME(dateOfSale) = ? AND sold = 1
        `;

        const totalUnsoldItemsQuery = `
            SELECT COUNT(*) as totalUnsoldItems
            FROM products
            WHERE MONTHNAME(dateOfSale) = ? AND sold = 0
        `;

        const [totalSalesAmountRows] = await database.query(totalSalesQuery, [month]);
        const [totalItemsSoldRows] = await database.query(totalItemsSoldQuery, [month]);
        const [totalUnsoldItemsRows] = await database.query(totalUnsoldItemsQuery, [month]);

  
        const totalSalesAmount = totalSalesAmountRows[0].totalSalesAmount || 0;
        const totalSoldItems = totalItemsSoldRows[0].totalSoldItems || 0;
        const totalUnsoldItems = totalUnsoldItemsRows[0].totalUnsoldItems || 0;

     
        console.log("totalSalesAmount: ", totalSalesAmount);
        console.log("totalSoldItems: ", totalSoldItems);
        console.log("totalUnsoldItems: ", totalUnsoldItems);

    
        res.status(200).json({
            success: true,
            data: {
                totalSalesAmount,
                totalSoldItems,
                totalUnsoldItems
            }
        });

    } catch (err) {
        console.error("Error while fetching statistics", err);
        if (!res.headersSent) {
            res.status(500).send("Failed to fetch statistics");
        }
    }
};

module.exports = StatisticsController;
