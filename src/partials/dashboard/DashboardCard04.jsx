import React from "react";
import { Bar } from "react-chartjs-2";
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04({ fetchedChartData }) {
  if (!fetchedChartData) return null;

  // Define a broader range of colors
  const colors = [
    tailwindConfig().theme.colors.sky[800],
    tailwindConfig().theme.colors.sky[500],
    tailwindConfig().theme.colors.violet[800],
    tailwindConfig().theme.colors.teal[500],
    tailwindConfig().theme.colors.orange[600],
    tailwindConfig().theme.colors.pink[500],
    tailwindConfig().theme.colors.red[500],
    tailwindConfig().theme.colors.green[600],
  ];

  // Prepare the chart data
  const chartData = {
    labels: fetchedChartData.labels,
    datasets: fetchedChartData.dataset.map((dataItem, index) => ({
      label: dataItem.label || `Dataset ${index + 1}`, // Use dataset's label
      data: dataItem.data,
      backgroundColor: colors[index % colors.length], // Cycle through colors
      hoverBackgroundColor: colors[index % colors.length],
      borderWidth: 1,
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
        text: 'Comparison of Different Stores',
      },
      // Disable data labels
      datalabels: {
        display: false, // Disable data labels if you use chartjs-plugin-datalabels
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Stores',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales Value',
        },
        beginAtZero: true,
      },
    },
    // Disable tooltips if you don't want to display values on hover
    tooltips: {
      enabled: false, 
    },
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Pune Store VS Outside Pune
        </h2>
      </header>
      <div className="grow max-sm:max-h-[250px] xl:max-h-[350px]">
        {/* Render the bar chart with multiple datasets */}
        <Bar data={chartData} options={options} width={595} height={248} />
      </div>
    </div>
  );
}

export default DashboardCard04;
