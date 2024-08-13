import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Statistics = ({ month }) => {
    const [data, setData] = useState({});

    const fetchStatisticsData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/statistics`, { params: { month } });
            setData(response.data.data);
            console.log("fetchStatisticsData response : ", response.data);
        } catch (err) {
            console.error("Error while fetching statistics data : ", err);
        }
    };

    useEffect(() => {
        fetchStatisticsData();
    }, [month]);

    return (
        <div className='w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg'>
            <h1 className='text-center text-xl font-bold mb-4 underline'>Statistics</h1>
            <Table striped bordered hover className='w-full'>
                <thead>
                    <tr>
                        <th>Total Sales Amount</th>
                        <th>Total Sold Items</th>
                        <th>Total Unsold Items</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${data.totalSalesAmount || 0}</td>
                        <td>{data.totalSoldItems || 0}</td>
                        <td>{data.totalUnsoldItems || 0}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default Statistics;
