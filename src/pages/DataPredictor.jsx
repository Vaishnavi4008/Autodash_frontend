import React, { useState } from "react";
import Papa from "papaparse";

const DataPredictor = () => {
  const [fileInput1, setFileInput1] = useState("");
  const [columns, setColumns] = useState([]);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInput1(file.name);

      // Parse the CSV file
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          // Get the column names
          const colNames = results.meta.fields;
          setColumns(colNames);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  return (
    <div>
      {fileInput1 ? (
        <>
          <div>{fileInput1} uploaded successfully</div>
          <div>
            <h3>Columns in the CSV file:</h3>
            <ul>
              {columns.map((col, index) => (
                <li key={index}>{col}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="border-[3px] border-gray-500 border-dashed p-2.5 rounded-[10px]">
          <div
            className="relative flex flex-col text-gray-400 border-dashed rounded cursor-pointer"
          >
            <input
              accept=".csv"
              type="file"
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
              <p className="m-0">Drag your CSV file here or click in this area.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPredictor;
