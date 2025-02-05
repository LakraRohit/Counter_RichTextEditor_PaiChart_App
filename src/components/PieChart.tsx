// components/PieChart.tsx
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

interface PieChartProps {
  data: { [key: string]: number }; // Object with city names as keys and their corresponding counts as values
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<{ [key: string]: number }>({});

  // Effect to check for saved data in localStorage and update state
  useEffect(() => {
    const savedData = localStorage.getItem('pieChartData');
    if (savedData) {
      setChartData(JSON.parse(savedData)); // Set data from localStorage
    } else {
      setChartData(data); // Set initial data if no saved data
      localStorage.setItem('pieChartData', JSON.stringify(data)); // Store data in localStorage
    }
  }, [data]);

  // Update localStorage and state when data changes
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      localStorage.setItem('pieChartData', JSON.stringify(data)); // Save updated data to localStorage
    }
  }, [data]);

  // Clear data from localStorage and reset the chart
  const clearChartData = () => {
    localStorage.removeItem('pieChartData'); // Remove data from localStorage
    setChartData({}); // Reset state to an empty object
  };

  // Prepare data for Pie Chart
  const chartOptions = {
    labels: Object.keys(chartData), // Labels are city names from state
    datasets: [
      {
        label: 'Number of People',
        data: Object.values(chartData), // Values of counts from state
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#C9CBCF',
        ], // Colors for the chart
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-4">
      <h2 className="text-lg font-bold mb-4">People Distribution by City</h2>
      <Pie data={chartOptions} /> {/* Render the Pie chart */}
      
      {/* Button to clear data */}
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
