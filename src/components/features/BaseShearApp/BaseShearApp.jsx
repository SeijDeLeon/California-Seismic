import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import InputSection from './InputSection';
import Chart from './Chart';

const BaseShearApp = () => {
  const chartRef = useRef();
  const [userInput, setUserInput] = useState({ input1: '' });
  const [inputs, setInputs] = useState({
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
    input7: '',
    input8: '',
  });
  const [numOfFloors, setNumOfFloors] = useState(0);
  const [floorHeight, setFloorHeights] = useState(() => {
    const storedHeights = JSON.parse(localStorage.getItem('floorHeight'));
    return storedHeights || {};
  });

  const handleInputChange = (event, inputName) => {
    const newValue = parseInt(event.target.value);
    if (inputName === 'input1') {
      const newFloorValue = isNaN(newValue) || newValue < 1 ? 1 : newValue;
      setNumOfFloors(newFloorValue);
      setUserInput(prevState => ({ ...prevState, input1: newFloorValue }));
      setFloorHeights(prevFloorHeights => {
        const adjustedHeights = { ...prevFloorHeights };
        for (let i = 1; i <= newFloorValue; i++) {
          if (!adjustedHeights[i]) {
            adjustedHeights[i] = 10;
          }
        }
        for (let i = newFloorValue + 1; i <= numOfFloors; i++) {
          delete adjustedHeights[i];
        }
        return adjustedHeights;
      });
      localStorage.setItem('floorHeight', JSON.stringify(floorHeight));
    } else {
      setInputs(prevState => ({ ...prevState, [inputName]: newValue }));
    }
  };

  const handleFloorHeightChange = (event, floorNum) => {
    const newHeight = parseInt(event.target.value);
    setFloorHeights(prevFloorHeights => ({ ...prevFloorHeights, [floorNum]: newHeight }));
    localStorage.setItem('floorHeight', JSON.stringify({ ...floorHeight, [floorNum]: newHeight }));
  };

  const padding = 100;

  
//----------------------------------------------------- Start of drawChart ----------------------------------------------------------
const drawChart = useCallback(() => {
  //console.log('drawChart called');
  //console.log('drawChart called with numOfFloors:', numOfFloors);

  // console.log("In draw");
  // console.log("floorNum");
  // console.log(numOfFloors);

  console.log("floorHeight: ", floorHeight);
  

  const forces = [];
  let valueIncrease = 0;
  let multiplerFloor = 10

  for (let i = 1; i <= numOfFloors; i++) {
    forces.push({ floor: 1, value: (multiplerFloor * floorHeight[i]) + valueIncrease });
    console.log("math");
    console.log((multiplerFloor * floorHeight[i]) + valueIncrease);
    if (numOfFloors >= 10) {
      valueIncrease += 200;
    }
    else {
      valueIncrease += 100;
    }

  }

  console.log("forces: ", forces);
  

  //this variable help determine the max of Y
  const yAxisMax = numOfFloors * 100;

  // Set up scales and axes
  const xScale = d3.scaleBand()
    .domain(forces.map((force => force.floor)))
    .range([50, yAxisMax]) //second argument to be rewritten
    .padding(0.3);

  const yScale = d3.scaleLinear()
    .domain([0, yAxisMax + padding])
    .range([250, 50]);

  const xAxis = d3.axisBottom(xScale)
    //.tickFormat(d => `Base Shear`) // Custom label format (long term need to get rid of ticks on x-axis)
    .tickValues([]);

  const yAxis = d3.axisLeft(yScale);

  //Creating the SVG Width and Height
  const svgWidth = 500 + yAxisMax;
  const svgHeight = 500 + yAxisMax;

  // Set up SVG container using D3
  let svg = d3.select(chartRef.current).select('svg'); // might need to hardcode this to make it show up nicely
  svg.style("overflow", "visible");

  //had a weird bug of 2 svgs being created so I used a if statement to correct it.
  if (svg.empty()) {
    svg = d3 //creating the svg
      .select(chartRef.current)
      .append('svg')
      .attr('width', "100%")// Uses the entire div the 100%
      .attr('height', "100%")
      .attr("viewBox", `0 -150 ${svgWidth} ${svgHeight}`) //-150 dtermines the position of where the svg starts //this can also zoom in and make the chart bigger
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
    .attr('width', 200)   // .attr('width', xScale.bandwidth()) old code --- this forces the rectangles to be 200 px
    .attr('height', force => 250 - yScale(force.value)) //this will be changing as the user enter in heights
    .style("fill", "none") // Creating a outline rectangle
    .style("stroke", "black") // Creating a outline rectangle
    .style("stroke-width", "2px"); //Set the stroke to thicker

  // Add labels to the rectangles, this is the numbers in the middle of the rectangle
  svg.selectAll('.label')
    .data(forces)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', force => xScale(force.floor) + 200 / 2) // Position in the middle of the rectangle
    .attr('y', force => yScale(force.value) + 15) // y position(+15) to place it above the rectangle
    .attr('text-anchor', 'middle') // Anchor the text in the middle
    .text(force => force.value) // Use the value as the label text
    .style("font-size", "12px")
    .style("font-weight", "bold");

  //Define the arrow marker
  svg.append("svg:defs").selectAll("marker")
    .data(["arrow-end"]) //Unique identifier for the marker
    .enter().append("svg:marker")
    .attr("id", "arrow-end")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 2) //Set the refX to a value to position the arrowhead to the left of the starting point
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .style("fill", "blue");

  //Arrows consts
  const arrowOffset = 100 + (xScale.bandwidth() % 10) + (svgWidth % 100); //100 + (xScale.bandwidth() % 10) + (svgWidth / 100);
  const barCoordinates = []; //this is needed to set the hyp

  let minus = 0;
  let barX = 0;
  let lineLengthShortener = 50; //this helps determine how line the arrow line will be

  // Creating the arrows
  svg.selectAll(".arrow")
    .data(forces)
    .enter()
    .append("g")
    .attr("class", "arrow")
    .each(function (d, i) {
      //the lower barX is the more distance there is between the graph and arrows
      if (numOfFloors === 1) {
        barX = -60
      }
      else if (numOfFloors === 2) {
        barX = -30
      }
      else if (numOfFloors === 3 && numOfFloors < 6) {
        barX = -10;
      }
      else if (numOfFloors === 4 && numOfFloors < 6) {
        barX = numOfFloors;
      }
      else if (numOfFloors >= 5 && numOfFloors < 17) {
        barX = numOfFloors * (numOfFloors + 2);
      }
      else {
        barX = numOfFloors * (numOfFloors - 1); //good till 20 floors
      }
      const barY = yScale(d.value);
      let arrowX = barX + arrowOffset;
      let arrowY = barY;

      //console.log(minus);

      d3.select(this)
        .append("path")
        .attr("d", `M ${barX + lineLengthShortener - minus} ${barY} L ${arrowX} ${arrowY}`)
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow-end)");

      let midX = (barX + arrowX) / 2;
      if (numOfFloors === 1) {
        midX = (barX + arrowX) / 2;
      }
      if (numOfFloors >= 4) {
        midX = (barX + arrowX) / 3;
      }
      const midY = (barY + arrowY) / 2;

      let textOffsetX = midX / 2;
      if (numOfFloors === 1) {
        textOffsetX -= midX - 25;
      }
      else if (numOfFloors <= 2 && numOfFloors <= 8) {
        textOffsetX -= midX - (15 + (numOfFloors * 10));
      }
      else if (numOfFloors === 9) {
        textOffsetX -= midX - (25 + (numOfFloors * 10));
      }
      else if (numOfFloors >= 10 && numOfFloors <= 14) {
        textOffsetX -= midX - ((25 * (numOfFloors / 7)) + (numOfFloors * 10));
      }
      else {
        textOffsetX -= midX - ((25 * (numOfFloors / 5)) + (numOfFloors * 9.5));
      }
      svg.append("text")
        .attr("x", midX + textOffsetX)
        .attr("y", midY)
        .attr("text-anchor", "start")
        .text((i === 0) ? `F${i + 1}` : `F${i + 1}`);
      barCoordinates.push({ x: barX + lineLengthShortener - minus, y: barY }); //this helps set up the hyp line
      minus += 10;
    });

  //hypotenuse line - this is meant to connect the force 1 to force n
  let hypotenusePoints = [];
  if (numOfFloors === 1) { //hard code if there is one floor
    hypotenusePoints.push({ x: barCoordinates[0].x, y: barCoordinates[0].y });
    hypotenusePoints.push({ x: 50, y: 250 });
  }
  else if (numOfFloors > 1) {
    hypotenusePoints.push({ x: barCoordinates[barCoordinates.length - 1].x, y: barCoordinates[barCoordinates.length - 1].y });
    hypotenusePoints.push({ x: barCoordinates[0].x + 4, y: 250 }); //({ x: barCoordinates[0].x, y: barCoordinates[0].y });
  }

  if (numOfFloors >= 1) {
    svg.append("path")
      .attr("d", `M ${hypotenusePoints[0].x} ${hypotenusePoints[0].y}
      L ${hypotenusePoints[hypotenusePoints.length - 1].x}
      ${hypotenusePoints[hypotenusePoints.length - 1].y}`)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2);
  }

  //Append the axes to the SVG container
  svg.append('g') //creating the x-axis
    .attr('transform', 'translate(0, 0 )')
    .call(xAxis);

  svg.append('g') //creating the y-axis
    .attr('transform', 'translate(50, 0)')
    .call(yAxis)
    .style("opacity", 0);

}, [numOfFloors, floorHeight]); //how to share the variables across consts

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('floorHeight', JSON.stringify(floorHeight));
    drawChart();
    const clearLocalStorage = () => localStorage.removeItem('floorHeight');
    window.addEventListener('beforeunload', clearLocalStorage);
    return () => window.removeEventListener('beforeunload', clearLocalStorage);
  }, [numOfFloors, floorHeight, drawChart]);

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-center text-6xl text-black font-bold mb-4">Base Shear Diagram</h1>
      </div>
      <div className='flex justify-start items-center'>
        <InputSection
          userInput={userInput}
          inputs={inputs}
          floorHeight={floorHeight}
          handleInputChange={handleInputChange}
          handleFloorHeightChange={handleFloorHeightChange}
        />
        <Chart chartRef={chartRef} />
      </div>
    </div>
  );
};

export default BaseShearApp;
