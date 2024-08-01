import React from 'react';

const Chart = ({ chartRef }) => {
  return (
    <div ref={chartRef} className="chart-container"></div>
  );
};

export default Chart;
