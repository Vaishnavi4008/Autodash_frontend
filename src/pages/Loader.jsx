import React, { useState, useEffect } from "react";
import { loadersArray, tasksArray } from "./loadersData";
import "./loaders.scss";

const LoaderComponent = () => {
  const [loaderIndex, setLoaderIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setLoaderIndex((prevIndex) => (prevIndex + 1) % loadersArray.length);
    }, 3000);

    const taskInterval = setInterval(() => {
      setTaskIndex((prevIndex) => (prevIndex + 1) % tasksArray.length);
    }, 3000);

    return () => {
      clearInterval(loaderInterval);
      clearInterval(taskInterval);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ fontSize: "2rem" }} className="loader-parent-wrapper">
        {loadersArray[loaderIndex]}
      </div>
      <div style={{ marginTop: "10px", fontSize: "1.2rem" }}>
        {tasksArray[taskIndex]}
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default LoaderComponent;
