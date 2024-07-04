import React, { useState, useCallback } from 'react';
import * as d3 from 'd3';
import Header from './Header';
import FloorControls from './FloorControls';
import UserInputs from './UserInputs';
import BaseShearChart from './BaseShearChart';

const BaseShearDiagram = () => {
  const [userInput, setUserInput] = useState({
    input1: '',
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
    switch (inputName) {
      case 'input2':
        setUserInput({ ...userInput, input2: newValue });
        break;
      case 'input3':
        setUserInput({ ...userInput, input3: newValue });
        break;
      case 'input4':
        setUserInput({ ...userInput, input4: newValue });
        break;
      case 'input5':
        setUserInput({ ...userInput, input5: newValue });
        break;
      case 'input6':
        setUserInput({ ...userInput, input6: newValue });
        break;
      case 'input7':
        setUserInput({ ...userInput, input7: newValue });
        break;
      case 'input8':
        setUserInput({ ...userInput, input8: newValue });
        break;
      default:
        const newFloorValue = isNaN(newValue) || newValue < 1 ? 1 : newValue;
        setNumOfFloors(newFloorValue);
        setUserInput(prevState => ({
          ...prevState,
          [inputName]: newFloorValue,
        }));

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
        break;
    }
  };

  const handleFloorHeightChange = (event, floorNum) => {
    const newHeight = parseInt(event.target.value);

    setFloorHeights(prevFloorHeights => ({
      ...prevFloorHeights,
      [floorNum]: newHeight,
    }));

    const updatedFloorHeights = {
      ...floorHeight,
      [floorNum]: newHeight,
    };

    localStorage.setItem('floorHeight', JSON.stringify(updatedFloorHeights));
  };

  const drawChart = useCallback((chartRef) => {
    // Chart drawing logic here (same as before)
  }, [numOfFloors, floorHeight]);

  return (
    <>
      <Header />
      <div className='flex justify-start items-center'>
        <FloorControls
          userInput={userInput}
          floorHeight={floorHeight}
          handleInputChange={handleInputChange}
          handleFloorHeightChange={handleFloorHeightChange}
        />
        <UserInputs userInput={userInput} handleInputChange={handleInputChange} />
        <BaseShearChart numOfFloors={numOfFloors} floorHeight={floorHeight} drawChart={drawChart} />
      </div>
    </>
  );
};

export default BaseShearDiagram;
