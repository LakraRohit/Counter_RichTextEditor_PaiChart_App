
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

interface PieChartProps {
  data: { [key: string]: number }; 
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<{ [key: string]: number }>({});

  
  useEffect(() => {
    const savedData = localStorage.getItem('pieChartData');
    if (savedData) {
      setChartData(JSON.parse(savedData)); 
    } else {
      setChartData(data); 
      localStorage.setItem('pieChartData', JSON.stringify(data));
    }
  }, [data]);

  
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      localStorage.setItem('pieChartData', JSON.stringify(data)); 
    }
  }, [data]);

 
  const clearChartData = () => {
    localStorage.removeItem('pieChartData'); 
    setChartData({}); 
  };

  
  const chartOptions = {
    labels: Object.keys(chartData), 
    datasets: [
      {
        label: 'Number of People',
        data: Object.values(chartData), 
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#C9CBCF',
        ], 
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-4">
      <h2 className="text-lg font-bold mb-4">People Distribution by City</h2>
      <Pie data={chartOptions} /> 
      
     
      <button
        onClick={clearChartData}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Clear Chart Data
      </button>
    </div>
  );
};

export default PieChart;
