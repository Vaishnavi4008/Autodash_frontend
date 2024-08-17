import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import EditMenu from '../../components/DropdownEditMenu';
import { tailwindConfig } from '../../utils/Utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the plugin
import { Chart } from 'chart.js';
Chart.register(ChartDataLabels);

function DashboardCard04({ fetchedChartData }) {
  // Check if fetchedChartData or its dataset is undefined or null
  if (!fetchedChartData || !fetchedChartData.dataset) return null;

  // Define a color palette
  const colors = [
    tailwindConfig().theme.colors.red[500],
    tailwindConfig().theme.colors.green[500],
    tailwindConfig().theme.colors.blue[500],
    tailwindConfig().theme.colors.yellow[500],
    tailwindConfig().theme.colors.purple[500],
  ];

  // Prepare the chart data
  const chartData = {
    labels: fetchedChartData.labels || [],
    datasets: fetchedChartData.dataset.map((dataItem, index) => ({
      label: dataItem.label || `Dataset ${index + 1}`,
      data: dataItem.data || [],
      borderColor: colors[index % colors.length], // Cycle through colors
      backgroundColor: colors[index % colors.length],
      fill: false,
      tension: 0.4,
    })),
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Multiple Line Chart Example',
      },
      datalabels: {
        display: true,
        color: 'white',
        align: 'top',
        
        font: {
          weight: 'bold',
        },
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
          text: 'Value',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Orders Delivered</h2>
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
                Option 1
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
                Option 2
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <div className="grow max-sm:max-h-[250px] xl:max-h-[250px]">
          {/* Render the line chart with multiple lines */}
          <Line data={chartData} options={options} width={389} height={250} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard04;
