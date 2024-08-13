const axios = require("axios");

const baseUrl = process.env.BASE_URL;
console.log("baseUrl : ",baseUrl);


require("dotenv").config();

const CombinedAPIController = async(req, res) => {
    try {
        const {month, search = '', page = 1 , perPage = 10} = req.query;
        if (!month) {
            return res.status(401).send("Month is required!");
        }

        const statisticsAPI = await axios.get(`${baseUrl}/statistics`,{params : {month}});
        const trasnsactionsAPI = await axios.get(`${baseUrl}/transactions`, {params : {month}});
        const barchartAPI = await axios.get(`${baseUrl}/barchart`, {params : {month}});
        const piechartAPI = await axios.get(`${baseUrl}/piechart`, {params : {month}});

        const [statisticsAPIResponse,trasnsactionsAPIResponse,barchartAPIResponse,piechartAPIResponse] = await Promise.all([
            statisticsAPI,
            trasnsactionsAPI,
            barchartAPI,
            piechartAPI
        ])

        const statisticsData = statisticsAPIResponse.data;
        const transactionsData = trasnsactionsAPIResponse.data;
        const barchartData = barchartAPIResponse.data;
        const piechartData = piechartAPIResponse.data

        const combinedData = {
            statistics : statisticsData,
            transactions : transactionsData,
            barchart : barchartData,
            piechart : piechartData
        }
        
        res.status(200).json({success : true,message : "Combined data fetched successfully!", data : combinedData});

    } catch (err) {
        console.error("Error while fetching Combined API : ", err);
        if (!res.headerSent) {
            res.status(500).send("Error fetching combined data!");
        }
    }
}

module.exports = CombinedAPIController;