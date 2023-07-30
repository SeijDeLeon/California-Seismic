import React, { useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

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

  const arrowSize = 10; // Size of the arrow

  const drawChart = () => {
    console.log('drawChart called');
    const forces = [
      { floor: 1, value: 100 }, // Example forces for each floor
      { floor: 1, value: 200 }, // by having floor as 1, the rectangles stack
      { floor: 1, value: 300 }, 
      { floor: 1, value: 400 } 
    ];

    // Calculate the total base shear
    //const totalBaseShear = 400; //Currently using this as the y-axis max
    const totalBaseShear = d3.max(forces, force => force.value);

        // Set up scales and axes
        const xScale = d3.scaleBand()
        .domain(forces.map(force => force.floor)) 
        .range([50, totalBaseShear])
        .padding(0.3);

      const yScale = d3.scaleLinear()
        .domain([0, totalBaseShear + arrowSize])
        .range([250, 50]);
  
      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => `Base Shear`) // Custom label format 
      const yAxis = d3.axisLeft(yScale);

      const svgWidth = totalBaseShear + 100; // Adding extra space for better visualization
      const svgHeight = 300; // Set an appropriate height

      // Set up SVG container using D3
      let svg = d3.select(chartRef.current).select('svg'); //might hardcode this
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

    // // Add labels to the rectangles
    // svg.selectAll('.label')
    //   .data(forces)
    //   .enter()
    //   .append('text')
    //   .attr('class', 'label')
    //   .attr('x', force => xScale(force.floor) + xScale.bandwidth() / 2) // Position in the middle of the rectangle
    //   .attr('y', force => yScale(force.value) +15) // y position(+15) to place it above the rectangle
    //   .attr('text-anchor', 'middle') // Anchor the text in the middle
    //   .text(force => force.value) // Use the value as the label text
    //   .style("font-size", "12px")
    //   .style("font-weight", "bold");

      // Sample data for the bar graph
    const barData = [10, 20, 30, 40, 50];

    // Sample data for vertical forces (base shear)
    const baseShearData = [15, 25, 10, 35, 30];

    // Create a separate x scale for the arrows
    const xArrowScale = d3.scaleLinear()
     .domain([0, forces.length - 1]) // Using sequential indices (0, 1, 2, ...)
     .range([50, totalBaseShear]);

    // // Define the arrow marker
    // svg.append("svg:defs").selectAll("marker")
    //   .data(["arrow-end"]) // Unique identifier for the marker
    //   .enter().append("svg:marker")
    //   .attr("id", "arrow-end")
    //   .attr("viewBox", "0 -5 10 10")
    //   .attr("refX", arrowSize + 2) // Adjust the refX based on the arrowSize to position the arrow correctly
    //   .attr("refY", 0)
    //   .attr("markerWidth", 6)
    //   .attr("markerHeight", 6)
    //   .attr("orient", "auto")
    //   .append("svg:path")
    //   .attr("d", "M0,-5L10,0L0,5")
    //   .style("fill", "blue"); 

    // // Add arrows pointing to the rectangles
    // svg.selectAll('.arrow')
    //   .data(forces)
    //   .enter()
    //   .append('path')
    //   .attr('class', 'arrow')
    //   .attr('d', (d, i) => {
    //     const barX = xScale(d.floor) + xScale.bandwidth() / 2;
    //     const barY = yScale(d.value);
    //     const arrowX = barX;
    //     const arrowY = barY - arrowSize; // Point the arrowhead to the top of the rectangle
    //     return `M ${barX} ${barY} L ${arrowX - arrowSize / 2} ${arrowY} M ${barX} ${barY} L ${arrowX + arrowSize / 2} ${arrowY}`;
    //   })
    //   .attr('stroke', 'blue')
    //   .attr('stroke-width', 2)
    //   .attr("marker-end", "url(#arrow-end)"); // Attach the arrowhead marker to the arrow

      // Define the arrow marker
    svg.append("svg:defs").selectAll("marker")
    .data(["arrow-end"]) // Unique identifier for the marker
    .enter().append("svg:marker")
    .attr("id", "arrow-end")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", -arrowSize) // Set the refX to a negative value to position the arrowhead to the left of the starting point
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .style("fill", "blue"); // Set the fill color of the arrowhead (optional)

  // Add arrows pointing to the rectangles
  svg.selectAll(".arrow")
    .data(forces)
    .enter()
    .append("path")
    .attr("class", "arrow")
    .attr("d", (d, i) => {
      const barX = xScale(d.floor) + xScale.bandwidth() / 2;
      const barY = yScale(d.value);
      const arrowX = xScale(d.floor); // Set the arrowX to the left of the rectangle
      const arrowY = barY; // Set the arrowY to the top edge of the rectangle
      return `M ${barX} ${barY} L ${arrowX} ${arrowY}`;
    })
    .attr("stroke", "blue") // Color of the arrow lines
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-end)"); // Attach the arrowhead marker to the arrow

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
