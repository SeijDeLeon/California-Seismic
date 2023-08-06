import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
//as reference https://clearcalcs.com/calculations/seismicAnalysisUS
const BaseShearDiagram = () => {
  const chartRef = useRef();
  const [userInput, setUserInput] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });

  useEffect(() => {
    drawChart();
  }, [userInput]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  //thinking about using a for loop to populate the forces for the floors.

  const padding = 10; // padding used to be arrowSize

  const drawChart = () => {
    console.log('drawChart called');
    const forces = [ //value is the height. each rectangle shares the same bottom axis.
      { floor: 1, value: 100 }, // Example forces for each floor
      { floor: 1, value: 200 }, // by having floor as 1, the rectangles stack
      { floor: 1, value: 300 },
      { floor: 1, value: 400 }
    ];

    // Calculate the total base shear (should be renamed to Y axis max)
    //const totalBaseShear = 400; //Currently using this as the y-axis max
    const yAxisMax = d3.max(forces, force => force.value);

    // Set up scales and axes
    const xScale = d3.scaleBand()
      .domain(forces.map(force => force.floor))
      .range([50, yAxisMax]) //second argument to be rewritten
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, yAxisMax + padding])
      .range([250, 50]);

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d => `Base Shear`) // Custom label format (long term need to get rid of ticks on x-axis)
    const yAxis = d3.axisLeft(yScale);

    //Creating the SVG Width and Height
    const svgWidth = yAxisMax + 100; // Adding extra space
    const svgHeight = 300; // Set a height

    // Set up SVG container using D3
    let svg = d3.select(chartRef.current).select('svg'); //might need to hardcode this to make it show up nicely

    if (svg.empty()) {
      svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', svgWidth)//Uses the entire div the 100%
        .attr('height', svgHeight)
        .style('display', 'block')// SVG is displayed as a block element
        .style('margin', '0 auto');// Centering with margin
    } else {
      svg.selectAll('*').remove(); // Clear the SVG contents if it already exists
    }

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

    // Add labels to the rectangles, this is the numbers in the middle of the rectangle
    svg.selectAll('.label')
      .data(forces)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', force => xScale(force.floor) + xScale.bandwidth() / 2) // Position in the middle of the rectangle
      .attr('y', force => yScale(force.value) + 15) // y position(+15) to place it above the rectangle
      .attr('text-anchor', 'middle') // Anchor the text in the middle
      .text(force => force.value) // Use the value as the label text
      .style("font-size", "12px")
      .style("font-weight", "bold");

    // Define the arrow marker
    svg.append("svg:defs").selectAll("marker")
      .data(["arrow-end"]) // Unique identifier for the marker
      .enter().append("svg:marker")
      .attr("id", "arrow-end")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 2) // Set the refX to a negative value to position the arrowhead to the left of the starting point
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")
      .style("fill", "blue");

    //Arrows consts
    const arrowOffset = 100;
    const barCoordinates = [];

    //Creating the arrows
    svg.selectAll(".arrow")
      .data(forces)
      .enter()
      .append("g")
      .attr("class", "arrow")
      .each(function (d, i) {
        const barX = 0;
        const barY = yScale(d.value);
        //console.log(d.value);
        const arrowX = barX + arrowOffset;
        const arrowY = barY;

        d3.select(this)
          .append("path")
          .attr("d", `M ${barX} ${barY} L ${arrowX} ${arrowY}`)
          .attr("stroke", "blue")
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrow-end)");

        const midX = (barX + arrowX) / 2;
        const midY = (barY + arrowY) / 2;

        const textOffsetX = 10;
        svg.append("text")
          .attr("x", midX + textOffsetX)
          .attr("y", midY)
          .attr("text-anchor", "start")
          .text((i === 0) ? `F${i + 1}` : `F${i + 2}`);
        barCoordinates.push({ x: barX, y: barY });
      });
    console.log(barCoordinates);

    const arrowOffset2 = 80;
    // Draw the sloped line connecting the arrow lines
    const lineGenerator = d3.line()
      .x(d => d.x)
      .y(d => d.y);

    const firstArrow = forces[0];
    const lastArrow = forces[forces.length - 1];

    console.log("First");
    console.log(arrowOffset2 + xScale(firstArrow.floor) + xScale.bandwidth() / 2);
    console.log(yScale(firstArrow.value) + padding / 2);

    console.log("2");
    console.log(arrowOffset2 + xScale(lastArrow.floor) + xScale.bandwidth());
    console.log(yScale(lastArrow.value) + padding / 2);

    svg.append("path")
      .attr("d", lineGenerator(barCoordinates))
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    const triangleHeight = 200;
    const triangleBase = 300;
      

    svg.select("#triangle-container")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Define the points of the upside-down triangle
    const trianglePoints = [
      { x: barCoordinates[3].x , y: barCoordinates[3].y }, //Top Left Point
      { x: barCoordinates[3].x+100 , y: barCoordinates[3].y  }, //Top Right Point
      { x: barCoordinates[0].x+100 , y: 250 } //Bottom Point //y: barCoordinates[0].y
    ];

    console.log("x");
    console.log(barCoordinates[0].x+100);
    console.log("y");
    console.log(barCoordinates[0].y );


    //Create a path element for the triangle
    svg.append("path")
      .attr("d", `M ${trianglePoints[0].x} ${trianglePoints[0].y} L ${trianglePoints[1].x} ${trianglePoints[1].y} L ${trianglePoints[2].x} ${trianglePoints[2].y} Z`)
      .attr("fill", "none") 
      .attr("stroke", "blue")  //Set the stroke color to blue
      .attr("stroke-width", 2)   

    //Append the axes to the SVG container
    svg.append('g') //creating the x-axis
      .attr('transform', 'translate(0, 250)')
      .call(xAxis);

    svg.append('g') //creating the y-axis
      .attr('transform', 'translate(50, 0)')
      .call(yAxis)
      .style("opacity", 0);

  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-center text-6xl text-black font-bold mb-4">Base Shear Diagram</h1>
      </div>
      <div className='flex justify-evenly items-center'>
        <div className="flex flex-col">
          <div className="p-4">
            <label htmlFor="userInput" className="block mb-2">
              Input 1:
            </label>
            <input
              type="text"
              id="input1"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input1}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input2" className="block mb-2">
              Input 2:
            </label>
            <input
              type="text"
              id="input2"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input2}
              onChange={(event) => handleInputChange(event, 'input2')}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input2" className="block mb-2">
              Input 3:
            </label>
            <input
              type="text"
              id="input2"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input3}
              onChange={(event) => handleInputChange(event, 'input3')}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input2" className="block mb-2">
              Input 4:
            </label>
            <input
              type="text"
              id="input2"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input4}
              onChange={(event) => handleInputChange(event, 'input4')}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="p-4">
            <label htmlFor="userInput" className="block mb-2">
              Input 1:
            </label>
            <input
              type="text"
              id="input1"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input1}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input2" className="block mb-2">
              Input 2:
            </label>
            <input
              type="text"
              id="input2"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input2}
              onChange={(event) => handleInputChange(event, 'input2')}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input2" className="block mb-2">
              Input 3:
            </label>
            <input
              type="text"
              id="input2"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input3}
              onChange={(event) => handleInputChange(event, 'input3')}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input2" className="block mb-2">
              Input 4:
            </label>
            <input
              type="text"
              id="input2"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input4}
              onChange={(event) => handleInputChange(event, 'input4')}
            />
          </div>
        </div>
        <div>
          <div className="w-1/2 h-3/4 justify-end p-6" ref={chartRef}></div>
        </div>
      </div>
    </>
  );
};

export default BaseShearDiagram;
