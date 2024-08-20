import React, {useState} from "react";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import DashboardCard14 from "../partials/dashboard/DashboardCard14";
import DashboardCard15 from "../partials/dashboard/DashboardCard15";
import DashboardCard16 from "../partials/dashboard/DashboardCard16";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoaderComponent from "./Loader";

const DashboardCreator = ({pageNo}) => {
  const [openCSVUploader, setOpenCSVUploader] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [promptResult, setPromptResult] = useState(<></>);
  const [fileInput1, setFileInput1] = useState("");
  const [fileInput2, setFileInput2] = useState("");
  const [generatedChartData, setGeneratedChartData] = useState([
    {
      chartType: "BAR CHART",
      chartData: {
        labels: [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Month 6",
          "Month 7",
          "Month 8",
          "Month 9",
          "Month 10",
          "Month 11",
          "Month 12",
        ],
        dataset: [
          {
            barLabel: "Total Profit",
            data: [
              211000, 183300, 224700, 222700, 209600, 201400, 295500, 361400,
              234000, 266700, 412800, 300200,
            ],
          },
        ],
        chartTitle: "Total Profit by Month",
      },
      code: "import pandas as pd\n\ndef read_csv_and_process(path):\n    # Read the CSV file\n    df = pd.read_csv(path)\n\n    # Extract the data for the \"total_profit\" column\n    data = df['total_profit'].tolist()\n\n    # Create the result dictionary\n    result = {\n        'labels': [f'Month {i+1}' for i in range(len(data))],\n        'dataset': [\n            {\n                'barLabel': 'Total Profit',\n                'data': data\n            }\n        ],\n        'chartTitle': 'Total Profit by Month'\n    }\n\n    return result\n\n# Call the function and store the result in the \"results\" variable\npath = \"F:/Mayur/vit/innov8ors/ollama/AutoDash/app/csv/test-new.csv\"  # Replace with your actual path\nresults = read_csv_and_process(path)",
    },
    {
      chartType: "PIE CHART",
      chartData: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        data: [
          21100, 18330, 22470, 22270, 20960, 20140, 20760, 25180, 23400, 26670,
          29540, 30020, 21100, 18330, 22470, 22270, 20960, 20140, 29550, 36140,
          23400, 26670, 41280, 30020, 211000, 183300, 224700, 222700, 209600,
          201400, 295500, 361400, 234000, 266700, 412800, 300200,
        ],
        chartTitle: "Total Sales and Units by Month",
      },
      code: 'import pandas as pd\nimport numpy as np\n\ndef process_data(csv_path):\n    # Read the CSV file\n    df = pd.read_csv(csv_path)\n\n    # Calculate the total sales for each month\n    total_sales = df[["facecream", "facewash", "toothpaste", "bathingsoap", "shampoo", "moisturizer"]].sum(axis=1)\n\n    # Calculate the total units for each month\n    total_units = df[["total_units"]].sum(axis=1)\n\n    # Calculate the total profit for each month\n    total_profit = df[["total_profit"]].sum(axis=1)\n\n    # Create the result dictionary\n    results = {\n        "labels": list(df["month_number"].astype(str)),\n        "data": total_sales.tolist() + total_units.tolist() + total_profit.tolist(),\n        "chartTitle": "Total Sales and Units by Month"\n    }\n\n    return results\n\n# Call the function\nresults = process_data("F:/Mayur/vit/innov8ors/ollama/AutoDash/app/csv/test-new.csv")\n\nprint(results)',
    },
    {
      chartType: "LINE CHART SINGLE",
      chartData: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        dataset: [
          {
            "x-axis": "Month Number",
            "y-axis": "Total Profit",
            lineLabel: "Total Profit by Month",
            data: [
              211000, 183300, 224700, 222700, 209600, 201400, 295500, 361400,
              234000, 266700, 412800, 300200,
            ],
          },
        ],
        chartTitle: "Total Profit by Month",
      },
      code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndef read_csv_and_plot(path_to_csv_file):\n    # Read the CSV file\n    dfs = pd.read_csv(path_to_csv_file)\n    \n    # Extract data for a single line chart\n    data = dfs[['month_number', 'total_profit']].values.tolist()\n    \n    # Create the result dictionary\n    result = {\n        'labels': [x[0] for x in data],  # x-axis labels\n        'dataset': [\n            {\n                'x-axis': 'Month Number',\n                'y-axis': 'Total Profit',\n                'lineLabel': 'Total Profit by Month',\n                'data': [x[1] for x in data]  # y-axis values\n            }\n        ],\n        'chartTitle': 'Total Profit by Month'\n    }\n    \n    return result\n\n# Call the function and store the result in the \"results\" variable\nresults = read_csv_and_plot(\"F:/Mayur/vit/innov8ors/ollama/AutoDash/app/csv/test-new.csv\")",
    },
    {
      chartType: "LINE CHART MULTIPLE",
      chartData: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        dataset: [
          {
            "x-axis": "",
            "y-axis": "",
            lineLabels: "",
            data: [],
          },
          {
            "x-axis": "Month Number",
            "y-axis": "facecream",
            lineLabels: "facecream",
            data: [
              2500, 2630, 2140, 3400, 3600, 2760, 2980, 3700, 3540, 1990, 2340,
              2900,
            ],
          },
          {
            "x-axis": "Month Number",
            "y-axis": "facewash",
            lineLabels: "facewash",
            data: [
              1500, 1200, 1340, 1130, 1740, 1555, 1120, 1400, 1780, 1890, 2100,
              1760,
            ],
          },
          {
            "x-axis": "Month Number",
            "y-axis": "toothpaste",
            lineLabels: "toothpaste",
            data: [
              5200, 5100, 4550, 5870, 4560, 4890, 4780, 5860, 6100, 8300, 7300,
              7400,
            ],
          },
          {
            "x-axis": "Month Number",
            "y-axis": "bathingsoap",
            lineLabels: "bathingsoap",
            data: [
              9200, 6100, 9550, 8870, 7760, 7490, 8980, 9960, 8100, 10300,
              13300, 14400,
            ],
          },
          {
            "x-axis": "Month Number",
            "y-axis": "shampoo",
            lineLabels: "shampoo",
            data: [
              1200, 2100, 3550, 1870, 1560, 1890, 1780, 2860, 2100, 2300, 2400,
              1800,
            ],
          },
          {
            "x-axis": "Month Number",
            "y-axis": "moisturizer",
            lineLabels: "moisturizer",
            data: [
              1500, 1200, 1340, 1130, 1740, 1555, 1120, 1400, 1780, 1890, 2100,
              1760,
            ],
          },
          {
            "x-axis": "Month Number",
            "y-axis": "total_units",
            lineLabels: "total_units",
            data: [
              21100, 18330, 22470, 22270, 20960, 20140, 29550, 36140, 23400,
              26670, 41280, 30020,
            ],
          },
          {
            "x-axis": "Month Number",
            "y-axis": "total_profit",
            lineLabels: "total_profit",
            data: [
              211000, 183300, 224700, 222700, 209600, 201400, 295500, 361400,
              234000, 266700, 412800, 300200,
            ],
          },
        ],
        chartTitle: "Total Units and Total Profit by Month",
      },
      code: "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndef read_csv_and_create_chart(csv_path):\n    # Read the CSV file\n    df = pd.read_csv(csv_path)\n\n    # Extract the columns of interest\n    cols_of_interest = ['month_number', 'facecream', 'facewash', 'toothpaste', 'bathingsoap', 'shampoo', 'moisturizer', 'total_units', 'total_profit']\n\n    # Create the dataset structure\n    results = {\n        'labels': [],\n        'dataset': [{'x-axis': '', 'y-axis': '', 'lineLabels': '', 'data': []}],\n        'chartTitle': ''\n    }\n\n    # Create the x-axis labels\n    results['labels'] = df['month_number'].tolist()\n\n    # Create the multiple line chart\n    for col in cols_of_interest[1:]:  # Iterate over the columns starting from the second one\n        results['dataset'].append({\n            'x-axis': 'Month Number',\n            'y-axis': col,\n            'lineLabels': col,\n            'data': df[col].tolist()\n        })\n\n    # Set the chart title\n    results['chartTitle'] = 'Total Units and Total Profit by Month'\n\n    return results\n\n# Call the function\nresults = read_csv_and_create_chart('F:/Mayur/vit/innov8ors/ollama/AutoDash/app/csv/test-new.csv')",
    },
  ]);
  const [isDataFetched, setIsDataFetched] = useState(true);

  const promptMap = {
    "Compare the sales of the cities Pune, Mumbai, Chennai with a line graph": (
      <DashboardCard08 />
    ),
    "What is the average sales of Pune stores in 2024": <DashboardCard14 />,
    "Compare the revenue generated by Market Yard Store vs Viman Nagar Store": (
      <DashboardCard06 />
    ),
    "Display the popularity trends of products in different seasons": (
      <DashboardCard06 />
    ),
    "What is the average sales for the month of March?": <DashboardCard14 />,
  };

  const handleFileInput = (e) => {
    console.log(e.target.files[0]);
    setFileInput1(e.target.files[0].name);
  };
  const fetchChartData = async () => {
    const response = await fetch("http://localhost:5000/generate_charts", {
      method: "POST",
    });
    const data = await response.json();
    setIsDataFetched(true);
    if (!data) return;
    if (response.status !== 200) return console.log("Error fetching data");

    console.log("data fetched", data);
    setGeneratedChartData(data);
    return data;
  };

  // useEffect(() => {
  //   fetchChartData();
  // }, []);

  return (
    <>
      {pageNo == 0 && (
        <>
          {/* upload csv or connect with mysql option */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              onClick={() => setOpenCSVUploader(true)}
            >
              <svg
                className="fill-current shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-3 max-xs:sr-only"> Upload CSV</span>
            </button>
            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
              <svg
                className="fill-current shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-3 max-xs:sr-only">Connect with MySQL</span>
            </button>
            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
              <svg
                className="fill-current shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-3 max-xs:sr-only">
                Connect with Air Table
              </span>
            </button>
            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
              <svg
                className="fill-current shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-3 max-xs:sr-only">
                Connect with Data Bricks
              </span>
            </button>
            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
              <svg
                className="fill-current shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-3 max-xs:sr-only">
                Connect with Google Big Query
              </span>
            </button>
            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
              <svg
                className="fill-current shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-3 max-xs:sr-only">Connect with mongoDB</span>
            </button>
          </div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={openCSVUploader}
            onClick={(e) => {
              if (!e) return;
              if (!e.target.className.startsWith) return;
              if (!e.target.className.startsWith("MuiBackdrop-root")) return;
              setOpenCSVUploader(false);
            }}
          >
            <div className="flex flex-col items-center justify-center h-screen">
              {/* click here to upload file or drag and drop a file*/}
              <div className="bg-white p7 rounded mx-auto">
                <div
                  x-data="dataFileDnD()"
                  className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded ml-4 mr-4 mt-4"
                >
                  {fileInput1 ? (
                    <>{fileInput1} uploaded successfully</>
                  ) : (
                    <div
                      x-ref="dnd"
                      className="relative flex flex-col text-gray-400 border-dashed rounded cursor-pointer"
                    >
                      <input
                        accept="*"
                        type="file"
                        multiple
                        className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                        title=""
                        onChange={handleFileInput}
                      />

                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <svg
                          className="w-6 h-6 mr-1 text-current-50"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="m-0">
                          Drag your files here or click in this area.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* next  button */}
                <div style={{ display: "flex" }}>
                  <button
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                    onClick={() => {
                      setpageNo(1);
                      setTimeout(() => {
                        setpageNo(2);
                      }, 15000);
                    }}
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {" "}
                    Next{" "}
                  </button>
                </div>
              </div>
            </div>
          </Backdrop>
        </>
      )}
      {!isDataFetched && (
        <>
          <LoaderComponent />
        </>
      )}

      {/* Cards */}
      {pageNo == 2 && generatedChartData && (
        <div className="grid grid-cols-12 gap-6">
          {generatedChartData.map((chart, index) => {
            console.log(chart.chartType);
            console.log(chart.chartData);
            if (chart.chartType === "BAR CHART" && chart.chartData) {
              return (
                <DashboardCard04
                  key={index}
                  fetchedChartData={chart.chartData}
                />
              );
            } else if (chart.chartType === "PIE CHART" && chart.chartData) {
              return (
                <DashboardCard16
                  key={index}
                  fetchedChartData={chart.chartData}
                />
              );
            } else if (
              chart.chartType === "LINE CHART SINGLE" &&
              chart.chartData
            ) {
              return (
                <DashboardCard02
                  key={index}
                  fetchedChartData={chart.chartData}
                />
              );
            } else if (
              chart.chartType === "LINE CHART MULTIPLE" &&
              chart.chartData
            ) {
              return (
                <DashboardCard03
                  key={index}
                  fetchedChartData={chart.chartData}
                />
              );
            }
          })}
          {/* <DashboardCard06 /> */}
          {/* Line chart (Acme Plus) */}
          {/* <DashboardCard01 /> */}
          {/* Doughnut chart (Top Countries) */}
          {/* <DashboardCard16 /> */}
          {/* Line chart (Acme Professional) */}
          {/* <DashboardCard03 /> */}
          {/* Bar chart (Direct vs Indirect) */}
          {/* <DashboardCard04 /> */}
          {/* Line chart (Real Time Value) */}
          {/* <DashboardCard05 /> */}

          {/* Line chart (Acme Advanced) */}
          {/* <DashboardCard02 /> */}
          {/* Table (Top Channels) */}
          {/* <DashboardCard07 /> */}
          {/* Line chart (Sales Over Time) */}
          {/* <DashboardCard08 /> */}
          {/* Stacked bar chart (Sales VS Refunds) */}
          {/* <DashboardCard09 /> */}
          {/* Card (Customers) */}
          {/* <DashboardCard10 /> */}
          {/* Card (Reasons for Refunds) */}
          {/* <DashboardCard11 /> */}
          {/* Card (Recent Activity) */}
          {/* <DashboardCard12 /> */}
          {/* Card (Income/Expenses) */}
          {/* <DashboardCard13 /> */}
        </div>
      )}

      {/* enter prompt and click submit */}
      {pageNo == 3 && (
        <div className="flex flex-col items-center h-screen">
          <div
            className="bg-white p-7 rounded mx-auto"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="flex flex-col items-center justify-center py-10 text-center">
              {/* input csv file */}
              <div className="bg-white p7 rounded mx-auto">
                <div
                  x-data="dataFileDnD()"
                  className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded"
                >
                  {fileInput2 ? (
                    <>{fileInput2} Uploaded successfully</>
                  ) : (
                    <div
                      x-ref="dnd"
                      className="relative flex flex-col text-gray-400 border-dashed rounded cursor-pointer"
                    >
                      <input
                        accept="*"
                        type="file"
                        multiple
                        className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                        title=""
                        onChange={handleFileInput2}
                      />

                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <svg
                          className="w-6 h-6 mr-1 text-current-50"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="m-0">
                          Drag your files here or click in this area.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="m-0 mt-10">Enter the prompt and click on submit</p>
              <textarea
                type="text"
                className="border border-gray-200 rounded p-2"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ marginTop: "20px" }}
                rows="4"
              />
              <button
                className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  setPromptResult(<CircularProgress />);

                  setTimeout(() => {
                    setPromptResult(promptMap[prompt]);
                  }, 5000);
                }}
              >
                {" "}
                Submit{" "}
              </button>
            </div>
            <div>{promptResult}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardCreator;
