const database = require("../../database");

const TransactionsController = async (req, res) => {
    try {
        const { month, search = "", page = 1, perPage = 10 } = req.query;

        const offset = (page - 1) * perPage;

        let query;
        let queryParams;

        if (search.trim() === "") {
            if (month) {
                query = `
                    SELECT * FROM products
                    WHERE MONTHNAME(dateOfSale) = ?
                    LIMIT ? OFFSET ?
                `;
                queryParams = [month, parseInt(perPage), parseInt(offset)];
            } else {
                query = `
                    SELECT * FROM products
                    LIMIT ? OFFSET ?
                `;
                queryParams = [parseInt(perPage), parseInt(offset)];
            }
        } else {
            if (month) {
                query = `
                    SELECT * FROM products
                    WHERE MONTHNAME(dateOfSale) = ? AND 
                    (title LIKE ? OR description LIKE ? OR price LIKE ?)
                    LIMIT ? OFFSET ?
                `;
                const searchQuery = `%${search}%`;
                queryParams = [
                    month,
                    searchQuery,
                    searchQuery,
                    searchQuery,
                    parseInt(perPage),
                    parseInt(offset),
                ];
            } else {
                query = `
                    SELECT * FROM products
                    WHERE (title LIKE ? OR description LIKE ? OR price LIKE ?)
                    LIMIT ? OFFSET ?
                `;
                const searchQuery = `%${search}%`;
                queryParams = [
                    searchQuery,
                    searchQuery,
                    searchQuery,
                    parseInt(perPage),
                    parseInt(offset),
                ];
            }
        }

        console.log("Executing query:", query);
        console.log("With parameters:", queryParams);

        const [rows] = await database.query(query, queryParams);

        if (rows.length === 0) {
            console.log("No results found!");
            return res
                .status(404)
                .json({ success: false, message: "No results found!" });
        }

        console.log("Rows:", rows);

        let countQuery;
        let countParams;

        if (search.trim() === "") {
            if (month) {
                countQuery = `
                    SELECT COUNT(*) as total FROM products 
                    WHERE MONTHNAME(dateOfSale) = ?
                `;
                countParams = [month];
            } else {
                countQuery = `
                    SELECT COUNT(*) as total FROM products
                `;
                countParams = [];
            }
        } else {
            if (month) {
                countQuery = `
                    SELECT COUNT(*) as total FROM products 
                    WHERE MONTHNAME(dateOfSale) = ? AND 
                    (title LIKE ? OR description LIKE ? OR price LIKE ?)
                `;
                countParams = [month, `%${search}%`, `%${search}%`, `%${search}%`];
            } else {
                countQuery = `
                    SELECT COUNT(*) as total FROM products
                    WHERE (title LIKE ? OR description LIKE ? OR price LIKE ?)
                `;
                countParams = [`%${search}%`, `%${search}%`, `%${search}%`];
            }
        }

        console.log("Executing count query:", countQuery);
        console.log("With count parameters:", countParams);

        const [[{ total }]] = await database.query(countQuery, countParams);

        const totalPages = Math.ceil(total / perPage);

        return res.status(200).json({
            success: true,
            data: rows,
            pagination: {
                total,
                page: parseInt(page),
                perPage: parseInt(perPage),
                totalPages,
            },
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        if (!res.headersSent) {
            res.status(500).send("Failed to fetch transactions");
        }
    }
};

module.exports = TransactionsController;
