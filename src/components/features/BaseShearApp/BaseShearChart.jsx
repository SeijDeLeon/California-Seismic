import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BaseShearChart = ({ numOfFloors, floorHeight, drawChart }) => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart(chartRef.current);
  }, [numOfFloors, floorHeight, drawChart]);

  return (
    <div className='w-full h-screen' ref={chartRef}></div>
  );
};

export default BaseShearChart;
