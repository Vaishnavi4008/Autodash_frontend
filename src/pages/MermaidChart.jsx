import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const MermaidChart = ({ chart, ...props }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    if (chartRef.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  return <div ref={chartRef} {...props} className="mermaid">{chart}</div>;
};

export default MermaidChart;
