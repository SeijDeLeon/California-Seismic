import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BaseShearDiagram = () => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, []);


  const drawChart = () => {
    console.log('drawChart called');
    const forces = [
      { floor: 1, value: 100 }, // Example forces for each floor
      { floor: 1, value: 200 }, // by having floor as 1, the rectangles stack
      { floor: 1, value: 300 }, 
      { floor: 1, value: 400 } 
    ];

    // Calculate the total base shear
    const totalBaseShear = 400; //Currently using this as the y-axis max

    // Set up SVG container using D3
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', '100%') //Uses the entire div the 100%
      .attr('height', '100%')
      .style('display', 'block') // SVG is displayed as a block element
      .style('margin', '0 auto'); // Centering with margin

    // Set up scales and axes
    const xScale = d3.scaleBand()
      .domain(forces.map(force => force.floor))
      .range([50, totalBaseShear])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, totalBaseShear])
      .range([250, 50]);

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d => `Base Shear`) // Custom label format 
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
      .attr('height', force => 250 - yScale(force.value))
      .style("fill", "none") // Creating a outline rectangle
      .style("stroke", "black") // Creating a outline rectangle
      .style("stroke-width", "2px"); //Set the stroke to thicker

    // Add labels to the rectangles
    svg.selectAll('.label')
      .data(forces)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', force => xScale(force.floor) + xScale.bandwidth() / 2) // Position in the middle of the rectangle
      .attr('y', force => yScale(force.value) +15) // y position(+15) to place it above the rectangle
      .attr('text-anchor', 'middle') // Anchor the text in the middle
      .text(force => force.value) // Use the value as the label text
      .style("font-size", "12px")
      .style("font-weight", "bold");

    // Append the axes to the SVG container
    svg.append('g')
      .attr('transform', 'translate(0, 250)')
      .call(xAxis);

    svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis)
      .style("opacity", 0);;
  };

  return (
      <>
      <div className="flex justify-center items-center">
        <h1 className="text-center text-6xl text-black font-bold mb-4">Base Shear Diagram</h1>
      </div>
      <div className="justify-end flex items-center">
        <div className="w-1/2 h-screen " ref={chartRef}></div>
      </div>
      
    </>
  );
};

export default BaseShearDiagram;
