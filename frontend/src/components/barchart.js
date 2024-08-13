import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const baseUrl = process.env.REACT_APP_BASE_URL;

const Barchart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/barchart`, { params: { month } });
      const { data } = response.data;

      const labels = Object.keys(data);
      const dataValues = Object.values(data).map(Number);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Number of Items',
            data: dataValues,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1
          }
        ]
      };

      setChartData(chartData);

    } catch (err) {
      console.error("Error while fetching Barchart data!", err);
    }
  };

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Items Distribution',
      },
    },
  };
  
  return (
    <div className='w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg'>
      <h1 className='text-center text-xl font-bold mb-4 underline'>Bar Chart Stats</h1>
      {chartData ? <Bar data={chartData} options={options} /> : <p className='text-center'>Loading chart...</p>}
    </div>
  );
};

export default Barchart;
