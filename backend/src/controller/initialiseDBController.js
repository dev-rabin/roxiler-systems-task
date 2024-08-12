const axios = require("axios");
const database = require("../../database");

const InitialiseDBController = async(req, res) => {
    try {
        const response = await axios.get(process.env.THIRD_PARTY_API_URL);
        const products = response.data;
        // console.log("Products : ", products);

        const insertQuery = "insert into products (title,price,description,category,image,sold,dateOfSale) values ?";
        const values = products.map(product => [
            product.title,
            product.price,
            product.description,
            product.category,
            product.image,
            product.sold,
            product.dateOfSale
        ])

        database.query(insertQuery,[values]);
        
        res.status(200).send("Database initialised with seed data");
        console.log("Data sent to database successfully!");
        
    } catch (error) {
        console.error("Error while seeding data",error);
        res.status(500).send('Failed to initialize the database.');
    }
}

module.exports = InitialiseDBController;