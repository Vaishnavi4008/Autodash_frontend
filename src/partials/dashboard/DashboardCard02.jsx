import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register Chart.js modules and the zoom plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const LineChartExample = ({ chartData }) => {
  const canvasRef = useRef(null);
  const legendRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Create chart instance
      chartInstanceRef.current = new ChartJS(canvasRef.current, {
        type: 'line',
        data: {
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
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false, // Disable default legend
            },
            title: {
              display: true,
              text: chartData.chartTitle || 'Line Chart Example',
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy', // Allow panning in both directions
              },
              zoom: {
                enabled: true,
                mode: 'xy', // Allow zooming in both directions
                drag: {
                  enabled: true, // Enable drag-to-zoom feature
                  backgroundColor: 'rgba(0,0,0,0.15)', // Optional: Customize the drag area color
                },
                limits: {
                  x: { min: 'original', max: 'original' },
                  y: { min: 'original', max: 'original' },
                },
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
                text: 'Profit',
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
  }, [chartData]);

  // Function to reset zoom
  const resetZoom = () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.resetZoom();
    }
  };

  return (
    <>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="px-5 pt-2 pb-6">
        <ul ref={legendRef} className="flex flex-wrap justify-center -m-1"></ul>
        <button 
          onClick={resetZoom} 
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Reset Zoom
        </button>
      </div>
    </>
  );
};

function DashboardCard02({ fetchedChartData }) {
  if (!fetchedChartData) {
    console.error('No chart data available');
    return null;
  }

  const chartData = {
    chartTitle: fetchedChartData.chartTitle,
    labels: fetchedChartData.labels,
    data: fetchedChartData.dataset[0].data,
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{fetchedChartData.chartTitle}</h2>
        </header>
        <div className="grow max-sm:max-h-[1000px] max-h-[1000px]">
          <LineChartExample chartData={chartData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;
