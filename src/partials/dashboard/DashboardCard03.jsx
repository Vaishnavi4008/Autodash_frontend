import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import EditMenu from '../../components/DropdownEditMenu';

// Register Chart.js modules
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DashboardCard03({ fetchedChartData }) {
  const canvasRef = useRef(null);
  const legendRef = useRef(null);
  const chartInstanceRef = useRef(null);

  if (!fetchedChartData || !fetchedChartData.dataset) return null;

  const colors = [
    '#ef4444', // red
    '#10b981', // green
    '#3b82f6', // blue
    '#f59e0b', // yellow
    '#8b5cf6', // purple
  ];

  useEffect(() => {
    if (canvasRef.current) {
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
          maintainAspectRatio: false, // Disable the aspect ratio
          responsive: true, // Ensure the chart is responsive
          plugins: {
            legend: {
              display: false, // Disable default legend
            },
            title: {
              display: true,
              text: 'Multiple Line Chart Example',
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

      const ul = legendRef.current;
      if (ul) {
        ul.innerHTML = '';
        chartInstanceRef.current.data.datasets.forEach((dataset) => {
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
        <div className="grow max-sm:max-h-[250px] xl:max-h-[250px]" style={{ height: '300px' }}>
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
