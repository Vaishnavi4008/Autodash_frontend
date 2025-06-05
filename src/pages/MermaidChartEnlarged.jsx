import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import panzoom from "@panzoom/panzoom";

const MermaidChartEnlarged = ({ chart, ...props }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const panzoomInstanceRef = useRef(null); // store panzoom instance

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });

    if (chartRef.current) {
      mermaid.contentLoaded();

      const instance = panzoom(chartRef.current, {
        maxZoom: 5,
        minZoom: 0.5,
        smoothScroll: true,
      });

      panzoomInstanceRef.current = instance;

      // return () => {
      //   instance.dispose();
      // };
    }
  }, [chart]);

  // Zoom control functions
  const zoomIn = () => panzoomInstanceRef.current?.zoomIn();
  const zoomOut = () => panzoomInstanceRef.current?.zoomOut();

  return (
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "0.5rem",
        maxHeight: "90vh",
        overflow: "auto",
        position: "relative",
      }}
    >
      {/* Control buttons */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          gap: "0.5rem",
          zIndex: 2,
        }}
      >
        <button onClick={zoomIn} style={buttonStyle}>
          ➕
        </button>
        <button onClick={zoomOut} style={buttonStyle}>
          ➖
        </button>
      </div>

      <div
        ref={chartRef}
        {...props}
        className="mermaid"
        style={{ cursor: "grab" }}
      >
        {chart}
      </div>
    </div>
  );
};

// Simple button style
const buttonStyle = {
  padding: "0.4rem 0.6rem",
  fontSize: "1.2rem",
  borderRadius: "0.4rem",
  border: "none",
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

export default MermaidChartEnlarged;
