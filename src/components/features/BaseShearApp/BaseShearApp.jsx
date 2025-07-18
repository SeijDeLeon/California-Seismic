import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
// import InputSection from './InputSection';
import Chart from './Chart';
import { BentoContainer } from '../../common/BentoContainer';
import { EquationFormat } from '../../common/EquationFormat';
import { BentoInput } from '../../common/BentoInput';
import { BentoBox } from '../../common/BentoBox';
import { BentoColumn } from '../../common/BentoColumn.jsx';

const BaseShearApp = () => {
  const [selectedRisk, setSelectedRisk] = useState("II - Regular Building");
  const [selectedSiteClass, setSelectedSiteClass] = useState("D - Default");
  const [numberOfFloors, setNumberOfFloors] = useState(1);
  const [shortPeriodSpectralAcceleration, setShortPeriodSpectralAcceleration] = useState(0);
  const [longPeriodSpectralAcceleration, setLongPeriodSpectralAcceleration] = useState(0);
  const [longPeriodTransitionPeriod, setLongPeriodTransitionPeriod] = useState(0);

  const [settingsMenu, setSettingsMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [asceVersion, setAsceVersion] = useState('ASCE-17');


  const handleSettingsOpen = () => {
    setSettingsMenu(true);
  };

  const chartRef = useRef();
  // const [userInput, setUserInput] = useState({ input1: '' });
  // const [inputs, setInputs] = useState({
  //   input2: '',
  //   input3: '',
  //   input4: '',
  //   input5: '',
  //   input6: '',
  //   input7: '',
  //   input8: '',
  // });
  const [floorHeight, setFloorHeights] = useState(() => {
    const storedHeights = JSON.parse(localStorage.getItem('floorHeight'));
    return storedHeights || {};
  });

  // const handleInputChange = (event, inputName) => {
  //   const newValue = parseInt(event.target.value);
  //   if (inputName === 'input1') {
  //     const newFloorValue = isNaN(newValue) || newValue < 1 ? 1 : newValue;
  //     setNumberOfFloors(newFloorValue);
  //     setUserInput(prevState => ({ ...prevState, input1: newFloorValue }));
  //     setFloorHeights(prevFloorHeights => {
  //       const adjustedHeights = { ...prevFloorHeights };
  //       for (let i = 1; i <= newFloorValue; i++) {
  //         if (!adjustedHeights[i]) {
  //           adjustedHeights[i] = 10;
  //         }
  //       }
  //       for (let i = newFloorValue + 1; i <= numberOfFloors; i++) {
  //         delete adjustedHeights[i];
  //       }
  //       return adjustedHeights;
  //     });
  //     localStorage.setItem('floorHeight', JSON.stringify(floorHeight));
  //   } else {
  //     setInputs(prevState => ({ ...prevState, [inputName]: newValue }));
  //   }
  // };

  const handleFloorHeightChange = (event, floorNum) => {
    const newHeight = parseInt(event.target.value);
    setFloorHeights(prevFloorHeights => ({ ...prevFloorHeights, [floorNum]: newHeight }));
    localStorage.setItem('floorHeight', JSON.stringify({ ...floorHeight, [floorNum]: newHeight }));
  };

  const padding = 100;


  //----------------------------------------------------- Start of drawChart ----------------------------------------------------------
  const drawChart = useCallback(() => {
    //console.log('drawChart called');
    //console.log('drawChart called with numberOfFloors:', numberOfFloors);

    // console.log("In draw");
    // console.log("floorNum");
    // console.log(numberOfFloors);

    console.log("floorHeight: ", floorHeight);


    const forces = [];
    let valueIncrease = 0;
    let multiplerFloor = 10

    for (let i = 1; i <= numberOfFloors; i++) {
      forces.push({ floor: 1, value: (multiplerFloor * floorHeight[i]) + valueIncrease });
      console.log("math");
      console.log((multiplerFloor * floorHeight[i]) + valueIncrease);
      if (numberOfFloors >= 10) {
        valueIncrease += 200;
      }
      else {
        valueIncrease += 100;
      }

    }

    console.log("forces: ", forces);


    //this variable help determine the max of Y
    const yAxisMax = numberOfFloors * 100;

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
        if (numberOfFloors === 1) {
          barX = -60
        }
        else if (numberOfFloors === 2) {
          barX = -30
        }
        else if (numberOfFloors === 3 && numberOfFloors < 6) {
          barX = -10;
        }
        else if (numberOfFloors === 4 && numberOfFloors < 6) {
          barX = numberOfFloors;
        }
        else if (numberOfFloors >= 5 && numberOfFloors < 17) {
          barX = numberOfFloors * (numberOfFloors + 2);
        }
        else {
          barX = numberOfFloors * (numberOfFloors - 1); //good till 20 floors
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
        if (numberOfFloors === 1) {
          midX = (barX + arrowX) / 2;
        }
        if (numberOfFloors >= 4) {
          midX = (barX + arrowX) / 3;
        }
        const midY = (barY + arrowY) / 2;

        let textOffsetX = midX / 2;
        if (numberOfFloors === 1) {
          textOffsetX -= midX - 25;
        }
        else if (numberOfFloors <= 2 && numberOfFloors <= 8) {
          textOffsetX -= midX - (15 + (numberOfFloors * 10));
        }
        else if (numberOfFloors === 9) {
          textOffsetX -= midX - (25 + (numberOfFloors * 10));
        }
        else if (numberOfFloors >= 10 && numberOfFloors <= 14) {
          textOffsetX -= midX - ((25 * (numberOfFloors / 7)) + (numberOfFloors * 10));
        }
        else {
          textOffsetX -= midX - ((25 * (numberOfFloors / 5)) + (numberOfFloors * 9.5));
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
    if (numberOfFloors === 1) { //hard code if there is one floor
      hypotenusePoints.push({ x: barCoordinates[0].x, y: barCoordinates[0].y });
      hypotenusePoints.push({ x: 50, y: 250 });
    }
    else if (numberOfFloors > 1) {
      hypotenusePoints.push({ x: barCoordinates[barCoordinates.length - 1].x, y: barCoordinates[barCoordinates.length - 1].y });
      hypotenusePoints.push({ x: barCoordinates[0].x + 4, y: 250 }); //({ x: barCoordinates[0].x, y: barCoordinates[0].y });
    }

    if (numberOfFloors >= 1) {
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

  }, [numberOfFloors, floorHeight]); //how to share the variables across consts

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('floorHeight', JSON.stringify(floorHeight));
    drawChart();
    const clearLocalStorage = () => localStorage.removeItem('floorHeight');
    window.addEventListener('beforeunload', clearLocalStorage);
    return () => window.removeEventListener('beforeunload', clearLocalStorage);
  }, [numberOfFloors, floorHeight, drawChart]);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center bg-white z-10 px-4 py-2">
        <div className="flex-1 text-center">
          <h1 className="text-6xl font-bold">Base Shear Diagram</h1>
        </div>

        <button
          onClick={handleSettingsOpen}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Settings
        </button>
      </header>
      <main className="flex-1 overflow-y-auto snap-y snap-mandatory bg-gray-500">
        <section className="snap-start bg-gray-500">
          <BentoContainer>
            <BentoColumn>
              <BentoBox title="USER INPUTS:">
                <BentoInput
                  label="Risk Category"
                  value={selectedRisk}
                  listItems={[
                    "I - Low Risk",
                    "II - Regular Building",
                    "III - Substantial Risk",
                    "IV - Essential Facilities",
                  ]}
                  onChange={(newVal) => setSelectedRisk(newVal)}
                  inputType="list"
                />
                <BentoInput
                  label="Site Class"
                  value={selectedSiteClass}
                  listItems={[
                    "A - Hard Rock",
                    "B - Rock",
                    "C - Very Dense Soil and Soft Rock",
                    "D - Stiff Soil",
                    "D - Default",
                    "E - Soft Clay Soil",
                  ]}
                  onChange={(newVal) => setSelectedSiteClass(newVal)}
                  inputType="list"
                />
                <BentoInput
                  label="Short Period Spectral Acceleration"
                  value={shortPeriodSpectralAcceleration}
                  equation={<EquationFormat value={"\\(S_{s,input} =\\)"} />}
                  onChange={(e) => setShortPeriodSpectralAcceleration(e.target.value)}
                  inputType="default"
                />
                <BentoInput
                  label="Long Period Spectral Acceleration"
                  value={longPeriodSpectralAcceleration}
                  equation={<EquationFormat value={"\\(S_{1,input} =\\)"} />}
                  onChange={(e) => setLongPeriodSpectralAcceleration(e.target.value)}
                  inputType="default"
                />
                <BentoInput
                  label="Long Period Transition Period"
                  value={longPeriodTransitionPeriod}
                  equation={<EquationFormat value={"\\(T_{L,input} =\\)"} />}
                  onChange={(e) => setLongPeriodTransitionPeriod(e.target.value)}
                  inputType="default"
                // trailingUnit="ft"
                />
              </BentoBox>
              <BentoBox title="PROPERTIES:">
                <BentoInput
                  label="Building Stories"
                  value={numberOfFloors}
                  onChange={(e) => setNumberOfFloors(e)}
                  inputType="counter"
                />
                <section className="text-black grid grid-cols-2 gap-8 text-sm w-full justify-between items-center border-black border-t-2 border-l-2 border-b border-r rounded-lg p-2 bg-white">
                  <p className="text-start">Building Risk Category:</p>
                  <section>
                    <EquationFormat value={"\\(RC =\\)"} result={selectedRisk} />
                  </section>


                  <p className="text-start">Site Class:</p>
                  <section>
                    <EquationFormat value={"\\(S_{DS} =\\)"} result={selectedSiteClass} />
                  </section>

                  <p className="text-start">Short-Period Spectral Acceleration:</p>
                  <section>
                    <EquationFormat value={"\\(S_{DS} =\\)"} result={shortPeriodSpectralAcceleration} />
                  </section>


                  <p className="text-start">Long-Period Spectral Acceleration:</p>
                  <section>
                    <EquationFormat value={"\\(S_{1} =\\)"} result={longPeriodSpectralAcceleration} />
                  </section>

                  <p className="text-start">Long-Period Transition Period:</p>
                  <section>
                    <EquationFormat value={"\\(T_{L} =\\)"} result={`${longPeriodTransitionPeriod}s`} />
                  </section>

                  <section>

                    <table className="w-full">
                      <tbody>
                        {Array.from({ length: numberOfFloors }, (_, i) => (
                          <tr key={i} className="border-b border-gray-300">
                            <td className="py-2 px-4">{`F${i + 1}`}</td>
                            <td className="py-2 px-4">
                              <input
                                type="number"
                                value={floorHeight[i + 1] || ''}
                                onChange={(e) => handleFloorHeightChange(e, i + 1)}
                                className="border rounded p-1 w-full"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                </section>
              </BentoBox>
              <BentoBox title="DETAILS:">
              </BentoBox>
            </BentoColumn>
            <BentoColumn>
              <BentoBox title="SUMMARY:">
                <section className="text-black grid grid-cols-2 gap-4 text-sm">
                  <p className="text-start">Design Short-Period Spectral Acceleration:</p>
                  <section>
                    <EquationFormat value={"\\(S_{DS} =\\)"} result={"2.52"} />
                  </section>


                  <p className="text-start">Design Long-Period Spectral Acceleration:</p>
                  <section>
                    <EquationFormat value={"\\(S_{DS} =\\)"} result={"2.12"} />
                  </section>

                  <p className="text-start">Seismic Design Category:</p>
                  <section>
                    <EquationFormat value={"\\(S_{DS} =\\)"} result={"E"} />
                  </section>


                  <p className="text-start">Seismic Base Shear:</p>
                  <section>
                    <EquationFormat value={"\\(V =\\)"} result={"121,851lb"} />
                  </section>

                </section>

                <Chart chartRef={chartRef} />
              </BentoBox>


            </BentoColumn>

          </BentoContainer>
        </section>
      </main>
      <button
        className="fixed bottom-0 right-0 rounded m-4 p-2 bg-blue-500 text-white"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }>
        Scroll to Top
      </button>
      {settingsMenu && (
        <section className={`fixed inset-0 flex z-50 pointer-events-${settingsMenu ? 'auto' : 'none'}`}>
          <section className={`absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-200
              ${settingsMenu ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setSettingsMenu(false)}
          />
          <section className={'relative ml-auto w-72 h-full bg-white p-6 rounded-l shadow-lg'}>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <section className="space-y-4">
              <section className="inline-flex bg-gray-200 rounded-full p-1">
                <button
                  onClick={() => setAsceVersion('ASCE-17')}
                  className={`px-3 py-1 rounded-full transition-colors duration-150 ${asceVersion === 'ASCE-17'
                    ? 'bg-white text-black'
                    : 'text-gray-600'}`}>
                  ASCE‑17
                </button>
                <button
                  onClick={() => setAsceVersion('ASCE-22')}
                  className={`px-3 py-1 rounded-full transition-colors duration-150 ${asceVersion === 'ASCE-22'
                    ? 'bg-white text-black'
                    : 'text-gray-600'}`}>
                  ASCE‑22
                </button>
              </section>
            </section>
            <section className="flex items-center justify-between">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="h-5 w-5"
              />
            </section>

            <section className="flex items-center justify-between">
              <span>Notifications</span>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="h-5 w-5"
              />
            </section>

            <section>
              <label className="block mb-1">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </section>


            <button
              className="mt-6 w-full bg-red-500 text-white py-2 rounded"
              onClick={() => setSettingsMenu(false)}
            >
              Close
            </button>
          </section>
        </section>
      )}
    </div>
  );
};

export default BaseShearApp;
