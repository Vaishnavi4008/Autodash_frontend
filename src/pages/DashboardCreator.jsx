import React, { useEffect, useState } from "react";
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

const DashboardCreator = ({ pageNo, setpageNo }) => {
  const [openCSVUploader, setOpenCSVUploader] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [promptResult, setPromptResult] = useState(<></>);
  const [fileInput1, setFileInput1] = useState("");
  const [fileInput2, setFileInput2] = useState("");
  const [generatedChartData, setGeneratedChartData] = useState([
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
    setFileInput1(e.target.files[0]);
  };
  const fetchChartData = async () => {
    const response = await fetch("http://localhost:5000/generate_charts", {
      method: "POST",
      headers: {
        "Content-Type": fileInput1 ? "multipart/form-data" : "application/json",
      },
    });
    const data = await response.json();
    setIsDataFetched(true);
    if (!data) return;
    if (response.status !== 200) return console.log("Error fetching data");

    console.log("data fetched", data);
    setGeneratedChartData(data);
    return data;
  };

  useEffect(() => {
    fetchChartData();
  }, []);

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
            } else if (chart.chartType === "SCATTER PLOT" && chart.chartData) {
              return (
                <DashboardCard14
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
