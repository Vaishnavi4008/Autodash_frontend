import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import EditMenu from '../../components/DropdownEditMenu';
import { tailwindConfig } from '../../utils/Utils';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js modules
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

function DashboardCard03({ fetchedChartData }) {
  const canvasRef = useRef(null);
  const legendRef = useRef(null);
  const chartInstanceRef = useRef(null);

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

  useEffect(() => {
    if (canvasRef.current) {
      // Create chart instance
      chartInstanceRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: fetchedChartData.labels || [],
          datasets: fetchedChartData.dataset.map((dataItem, index) => ({
            label: dataItem.label || `Dataset ${index + 1}`,
            data: dataItem.data || [],
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length],
            fill: false,
            tension: 0.4,
          })),
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false, // Disable default legend
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
        },
      });

      // Generate custom legend
      const ul = legendRef.current;
      if (ul) {
        ul.innerHTML = ''; // Clear previous legend items
        chartInstanceRef.current.data.datasets.forEach((dataset, index) => {
          const li = document.createElement('li');
          li.style.display = 'flex';
          li.style.alignItems = 'center';
          li.style.marginRight = '10px';

          const colorBox = document.createElement('span');
          colorBox.style.backgroundColor = dataset.borderColor;
          colorBox.style.width = '12px';
          colorBox.style.height = '12px';
          colorBox.style.display = 'inline-block';
          colorBox.style.marginRight = '8px';

          const text = document.createTextNode(dataset.label);

          li.appendChild(colorBox);
          li.appendChild(text);
          ul.appendChild(li);
        });
      }
    }

    return () => {
      // Cleanup on unmount
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [fetchedChartData, colors]);

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
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className="px-5 pt-2 pb-6">
          <ul ref={legendRef} className="flex flex-wrap justify-center -m-1"></ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard03;
