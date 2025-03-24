import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoaderComponent from "./Loader";

const Main = ({ pageNo, setpageNo }) => {
  const [openCSVUploader, setOpenCSVUploader] = useState(false);
  const [fileInput1, setFileInput1] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(true);
  const [openSQLUploader, setOpenSQLUploader] = useState(false);

  const handleFileInput = (e) => {
    console.log(e.target.files[0]);
    setFileInput1(e.target.files[0]);
  };
  const fetchChartData = async () => {
    setIsDataFetched(false);

    // simulate time taken to fetch data
    setTimeout(() => {
      setIsDataFetched(true);
      setpageNo(2);
    }, 8000);
  };

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
            <button
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              onClick={() => setOpenSQLUploader(true)}
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

          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={openSQLUploader}
            onClick={(e) => {
              if (!e) return;
              if (!e.target.className.startsWith) return;
              if (!e.target.className.startsWith("MuiBackdrop-root")) return;
              setOpenSQLUploader(false);
            }}
          >
            <div className="bg-white p-7 rounded mx-auto">
              <form style={{color:"black"}} onSubmit={(e)=>{
                e.preventDefault();
                setpageNo(3);
              }}>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="host"
                    placeholder="Host"
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="port"
                    placeholder="Port"
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="database"
                    placeholder="Database"
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
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
          </Backdrop>
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
                  className="relative flex flex-col p-4 text-gray-400 border border-gray-500 rounded ml-4 mr-4 mt-4"
                >
                  {fileInput1 ? (
                    <>{fileInput1?.name} uploaded successfully</>
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
                      // setIsDataFetched(false);
                      fetchChartData();
                      // setTimeout(() => {
                      //   setIsDataFetched(true);
                      //   setpageNo(2);
                      // }, 15000);
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
      {pageNo == 2 && (
        <iframe
          src="http://127.0.0.1:7862"
          style={{ height: "70vh", width: "100%" }}
          frameBorder="0"
        ></iframe>
      )}
      {pageNo == 3 && (
        <iframe
          src="http://127.0.0.1:7861"
          style={{ height: "70vh", width: "100%" }}
          frameBorder="0"
        ></iframe>
      )}
    </>
  );
};

export default Main;
