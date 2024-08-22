import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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
import axios from "axios";

const DataChat = () => {
  const [fileInput2, setFileInput2] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [promptResult, setPromptResult] = useState(<></>);
  const [formData, setFormData] = useState({
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
    table: "",
    where: "",
  });
  const [formVisible, setFormVisible] = useState("");

  const handleFileInput2 = (e) => {
    console.log(e.target.files[0]);
    setFileInput2(e.target.files[0]);
  };

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

  const handleConnectClick = (dbType) => {
    setFormVisible(dbType);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Optionally, you can also hide the form after submission
    setFormVisible("");
  };

  console.log(fileInput2);
  console.log(Boolean(fileInput2)); 

  
  const handleAddHistory = async (request, response) => {
    try {
      const res = await fetch("https://localhost/java/api/chat/addHistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request, response }),
      });
  
      if (res.ok) {
        console.log("Chat history added successfully.");
      } else {
        console.error("Failed to add chat history");
      }
    } catch (error) {
      console.error("Error adding chat history:", error);
    }
  };
  
  

  const handleSubmit = () => {
    setIsDataFetched(false);
  
    const formData = new FormData();
    if (fileInput2) formData.append("code", fileInput2);
    formData.append("prompt", prompt);
  
    axios
      .post("http://localhost:5000/chat", formData, {
        headers: {
          "Content-Type": fileInput2 ? "multipart/form-data" : "application/json",
        },
      })
      .then((res) => {
        const output = res.data || {};
        setPromptResult(
          output.response_type === "Plot" ? (
            <img
              src={`http://localhost/${output.latest_image_url.split("html")[1]}`}
              alt="plot"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <p>{output.response}</p>
          )
        );
        handleAddHistory(prompt, output.response);
        setIsDataFetched(true);
      })
      .catch((err) => {
        console.log(err);
        setIsDataFetched(true);
      });
  };
  
  console.log({ promptResult });

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
          onClick={() => handleConnectClick("MySQL")}
        >
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

      {/* Conditionally render the form based on the selected DB */}
      {formVisible && (
        <div className="bg-white p-7 rounded mx-auto">
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="host"
                placeholder="Host"
                value={formData.host}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="port"
                placeholder="Port"
                value={formData.port}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="database"
                placeholder="Database"
                value={formData.database}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="table"
                placeholder="Table"
                value={formData.table}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="where"
                placeholder="Where"
                value={formData.where}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <div
        className="bg-white p-7 rounded mx-auto"
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* Input CSV File Section */}
        <div className="bg-white p-7 rounded mx-auto">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
              {fileInput2 ? (
                <>{fileInput2?.name} Uploaded successfully</>
              ) : (
                <div className="relative flex flex-col text-gray-400 border-dashed rounded cursor-pointer">
                  <input
                    accept="*"
                    type="file"
                    multiple
                    className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
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
        </div>

        {/* Prompt Input Section */}
        <div className="bg-white p-7 rounded mx-auto text-center">
          <p className="m-0 mt-10">Enter the prompt and click on submit</p>
          <textarea
            type="text"
            className="border-[2px] border-gray-500 rounded p-2"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ marginTop: "20px" }}
            rows="4"
          />
          <button
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            style={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div>{promptResult}</div>
        </div>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isDataFetched}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

export default DataChat;
