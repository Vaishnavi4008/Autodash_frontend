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
      const dataLength = chartData.labels.length;
      const initialDisplayCount = 15;
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
          maintainAspectRatio: false, // Allows the chart to take the full height of the container
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
                mode: 'x',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
              },
              min:( dataLength - initialDisplayCount) - 1 < dataLength ? ( dataLength - initialDisplayCount) - 1 : dataLength - 1 , 
              max:  dataLength - 1, 
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

          const text = document.createTextNode(dataset.lineLabels
          );

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

  return (
    <>
      <div style={{ height: '300px' }}> {/* Set the fixed height of the chart container */}
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="px-5 pt-2 pb-6">
        <ul ref={legendRef} className="flex flex-wrap justify-center -m-1"></ul>
      </div>
    </>
  );
};

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
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
  {fetchedChartData.chartName ? fetchedChartData.chartName : 'Default Chart Title'}
</h2>

        </header>
        <div className="grow h-[300px]"> {/* Adjust this div's height to 300px */}
          <LineChartExample chartData={chartData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;
