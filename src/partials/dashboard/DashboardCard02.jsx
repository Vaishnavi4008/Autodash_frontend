import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// LineChartExample Component
const LineChartExample = ({ chartData }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Total Profit',
        data: chartData.data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Makes the line curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: chartData.chartTitle || 'Line Chart Example',
      },
      // Do not use datalabels plugin
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Profit',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

// DashboardCard02 Component
function DashboardCard02({ fetchedChartData }) {
  if (!fetchedChartData) {
    console.error('No chart data available');
    return null;
  }

  // Prepare the data for the LineChartExample component
  const chartData = {
    chartTitle: fetchedChartData.chartTitle,
    labels: fetchedChartData.labels,
    data: fetchedChartData.dataset[0].data, // Assuming there's only one dataset
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{fetchedChartData.chartTitle}</h2>
        </header>
        <div className="grow max-sm:max-h-[328px] max-h-[300px]">
          <LineChartExample chartData={chartData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;
