import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
//as reference https://clearcalcs.com/calculations/seismicAnalysisUS
let floorValue = 0;
const newFloorHeights = {};
const forces = {};

const BaseShearDiagram = () => {
  const chartRef = useRef();
  const [userInput, setUserInput] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
  });

  const [floorLevel, setFloorHeights] = useState({});

  useEffect(() => {
    drawChart();
  }, [userInput]);

  const handleInputChange = (event, inputName) => {
    floorValue = parseInt(event.target.value);

    // Ensure the new value is at least 2
    floorValue = isNaN(floorValue) || floorValue < 2 ? 2 : floorValue;

    setUserInput(prevState => ({
      ...prevState,
      [inputName]: floorValue,
    }));

    for (let i = 1; i <= floorValue; i++) {
      newFloorHeights[`${i}`] = 10;
    }
    setFloorHeights(newFloorHeights);
  };

  const handleFloorHeightChange = (event, floorNum) => {
    setFloorHeights(prevHeights => ({
      ...prevHeights,
      [floorNum]: event.target.value,
    }));
  };

  // const forces = Object.keys(floorLevel).map(floor => ({
  //   floor: parseInt(floor.slice(5)), 
  //   value: parseInt(floorLevel[floor]) || 10, 
  // }));

  //thinking about using a for loop to populate the forces for the floors.

  const padding = 10; // padding used to be arrowSize

  const drawChart = () => {
    console.log('drawChart called');

    console.log([floorLevel, setFloorHeights]);

    const forces = [ //value is the height. each rectangle shares the same bottom axis.
      { floor: 1, value: 100 }, // Example forces for each floor
      { floor: 1, value: 200 }, // by having floor as 1, the rectangles stack
      { floor: 1, value: 300 },
      { floor: 1, value: 400 },
      { floor: 1, value: 500 }
    ];

    // const forces = Object.keys(floorLevel).map(floor => ({
    //   floor: parseInt(floor.slice(5)), 
    //   value: parseInt(floorLevel[floor]) || 10*10, 
    // }));

    

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
    let svg = d3.select(chartRef.current).select('svg'); // might need to hardcode this to make it show up nicely

    if (svg.empty()) {
      svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', svgWidth)// Uses the entire div the 100%
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

    // Arrows consts
    const arrowOffset = 100;
    const barCoordinates = [];

    let minus = 0;

    // Creating the arrows
    svg.selectAll(".arrow")
      .data(forces)
      .enter()
      .append("g")
      .attr("class", "arrow")
      .each(function (d, i) {
        const barX = 0;
        const barY = yScale(d.value);
        //console.log(d.value);
        let arrowX = barX + arrowOffset;
        let arrowY = barY;

        console.log(minus);

        d3.select(this)
          .append("path")
          .attr("d", `M ${barX + 60 - minus} ${barY} L ${arrowX} ${arrowY}`)
          .attr("stroke", "blue")
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrow-end)");

        const midX = (barX + arrowX) / 2;
        const midY = (barY + arrowY) / 2;

        const textOffsetX = midX / 2;
        svg.append("text")
          .attr("x", midX + textOffsetX)
          .attr("y", midY)
          .attr("text-anchor", "start")
          .text((i === 0) ? `F${i + 1}` : `F${i + 2}`);
        barCoordinates.push({ x: barX + 60 - minus, y: barY });
        minus += 10;
        console.log(minus);
      });
    console.log(barCoordinates);

    // Used to connect the arrows
    // const lineGenerator = d3.line()
    //   .x(d => d.x)
    //   .y(d => d.y);
    // svg.append("path")
    //   .attr("d", lineGenerator(barCoordinates))
    //   .attr("stroke", "red")
    //   .attr("stroke-width", 2)
    //   .attr("fill", "none");

    // Define the points of the upside-down triangle
    const hypotenusePoints = [
      { x: barCoordinates[barCoordinates.length - 1].x, y: barCoordinates[barCoordinates.length - 1].y }, // Top Left Point
      { x: barCoordinates[3].x + 100, y: barCoordinates[3].y }, // Top Right Point
      { x: barCoordinates[0].x + 100, y: 250 } //Bottom Point // y: barCoordinates[0].y
    ];

    //console.log(barCoordinates.length-1)

    // // Create a path element for the triangle
    // svg.append("path")
    //   .attr("d", `M ${hypotenusePoints[0].x} ${hypotenusePoints[0].y} L ${hypotenusePoints[1].x} ${hypotenusePoints[1].y} L ${hypotenusePoints[2].x} ${hypotenusePoints[2].y} Z`)
    //   .attr("fill", "none")
    //   .attr("stroke", "blue")  //Set the stroke color to blue
    //   .attr("stroke-width", 2)

    // Create a path element for the hypotenuse of the triangle
    svg.append("path")
      .attr("d", `M ${hypotenusePoints[0].x} ${hypotenusePoints[0].y} L ${hypotenusePoints[hypotenusePoints.length - 1].x - 90} ${hypotenusePoints[hypotenusePoints.length - 1].y}`) //hardcode 90 to get the hyp
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2);

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
        {/* Input Column 1 */}
        <div className="flex flex-col">
          {/* The Floors + - */}
          <div className="p-4">
            <label htmlFor="input1" className="block mb-2">
              Floors:
            </label>
            <div className="flex items-center">
              <button
                className="px-3 py-2 border rounded border-gray-300 mr-1"
                onClick={() => handleInputChange({ target: { value: userInput.input1 - 1 } }, 'input1')}
              >-</button>
              <input
                type="number"
                id="input1"
                className="p-2 border border-gray-300 rounded text-center"
                value={userInput.input1}
                onChange={event => handleInputChange(event, 'input1')}
              />
              <button
                className="px-3 py-2 border rounded border-gray-300 ml-1"
                onClick={() => handleInputChange({ target: { value: userInput.input1 + 1 } }, 'input1')}
              >+</button>
            </div>
          </div>
          {/* End of floor + - */}
          {/* Floor Heights */}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Floor Heights</h2>
            {Object.keys(floorLevel).map(floorNum => (
              <div key={floorNum} className="flex items-center mb-2">

                <span className="w-30 text-right pr-2">Floor {floorNum}'s Height</span>
                <input
                  type="number"
                  className="p-2 border border-gray-300 rounded text-center"
                  value={floorLevel[floorNum]}
                  onChange={event => handleFloorHeightChange(event, floorNum)}
                />
              </div>
            ))}
          </div>
          {/* Floor Height End */}

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
            <label htmlFor="input3" className="block mb-2">
              Input 3:
            </label>
            <input
              type="text"
              id="input3"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input3}
              onChange={(event) => handleInputChange(event, 'input3')}
            />
          </div>
        </div>

        {/* Input Column 2 */}
        <div className="flex flex-col">
          <div className="p-4">
            <label htmlFor="input4" className="block mb-2">
              Input 4:
            </label>
            <input
              type="text"
              id="input4"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input4}
              onChange={(event) => handleInputChange(event, 'input4')}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input5" className="block mb-2">
              Input 5:
            </label>
            <input
              type="text"
              id="input5"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input5}
              onChange={(event) => handleInputChange(event, 'input5')}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input6" className="block mb-2">
              Input 6:
            </label>
            <input
              type="text"
              id="input6"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input6}
              onChange={(event) => handleInputChange(event, 'input6')}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input7" className="block mb-2">
              Input 7:
            </label>
            <input
              type="text"
              id="input7"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input7}
              onChange={(event) => handleInputChange(event, 'input7')}
            />
          </div>
          <div className="p-4">
            <label htmlFor="input8" className="block mb-2">
              Input 8:
            </label>
            <input
              type="text"
              id="input8"
              className="p-2 border border-gray-300 rounded"
              value={userInput.input8}
              onChange={(event) => handleInputChange(event, 'input8')}
            />
          </div>
        </div>

        {/* Chart Column */}
        <div>
          <div className="w-1/2 h-3/4 justify-end p-6" ref={chartRef}></div>
        </div>
      </div>
    </>
  );
};

export default BaseShearDiagram;
