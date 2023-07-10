import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BaseShearDiagram = () => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    const forces = [
      { floor: 1, value: 100 }, // Example forces for each floor
      { floor: 2, value: 200 },
    ];

    // Calculate the total base shear
    const totalBaseShear = forces.reduce((sum, force) => sum + force.value, 0);

    // Set up SVG container using D3
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    // Set up scales and axes
    const xScale = d3.scaleBand()
      .domain(forces.map(force => force.floor))
      .range([50, 450])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, totalBaseShear])
      .range([250, 50]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Draw the base shear diagram
    svg.selectAll('.bar')
      .data(forces)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', force => xScale(force.floor))
      .attr('y', force => yScale(force.value))
      .attr('width', xScale.bandwidth())
      .attr('height', force => 250 - yScale(force.value));

    // Append the axes to the SVG container
    svg.append('g')
      .attr('transform', 'translate(0, 250)')
      .call(xAxis);

    svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis);
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-screen h-screen" ref={chartRef}></div>
    </div>
  );
};

export default BaseShearDiagram;
