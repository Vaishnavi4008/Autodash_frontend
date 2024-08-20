import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04({ fetchedChartData }) {
  const legend = useRef(null);

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
        display: false, // Disable the default legend
      },
      title: {
        display: true,
        text: 'Comparison of Different Stores',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Stores',
        },
        ticks: {
          font: {
            size: 8, // Set the font size of the x-axis labels
          },
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
  };
  

  useEffect(() => {
    const ul = legend.current;
    if (!ul) return;

    // Clear previous legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Generate custom legend items
    chartData.datasets.forEach((dataset, index) => {
      const li = document.createElement('li');
      li.style.margin = tailwindConfig().theme.margin[1];

      // Button element
      const button = document.createElement('button');
      button.classList.add('btn-xs', 'bg-white', 'dark:bg-gray-700', 'text-gray-500', 'dark:text-gray-400', 'shadow-sm', 'shadow-black/[0.08]', 'rounded-full');
      button.style.opacity = dataset.hidden ? '.3' : '';

      // Color box
      const box = document.createElement('span');
      box.style.display = 'block';
      box.style.width = tailwindConfig().theme.width[2];
      box.style.height = tailwindConfig().theme.height[2];
      box.style.backgroundColor = dataset.backgroundColor;
      box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
      box.style.marginRight = tailwindConfig().theme.margin[1];
      box.style.pointerEvents = 'none';

      // Label
      const label = document.createElement('span');
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      const labelText = document.createTextNode(dataset.label);
      label.appendChild(labelText);

      li.appendChild(button);
      button.appendChild(box);
      button.appendChild(label);
      ul.appendChild(li);
    });
  }, [chartData]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Pune Store VS Outside Pune
        </h2>
      </header>
      <div className="grow max-sm:max-h-[350px] xl:max-h-[450px]">
        {/* Render the bar chart */}
        <Bar data={chartData} options={options} width={395} height={148} />
      </div>
      <div className="px-5 pt-2 pb-6">
        {/* Custom legend */}
        <ul ref={legend} className="flex flex-wrap justify-center -m-1"></ul>
      </div>
    </div>
  );
}

export default DashboardCard04;
