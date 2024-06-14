import React, { useState } from 'react';

const FloorHeightCalculator = () => {
  const [numFloors, setNumFloors] = useState(1);
  const [floorHeights, setFloorHeights] = useState([0]);

  const handleNumFloorsChange = (e) => {
    const floors = parseInt(e.target.value, 10);
    setNumFloors(floors);
    setFloorHeights(Array.from({ length: floors }, () => 0)); //each floor starts at 0, might change it.
  };

  const handleFloorHeightChange = (e, index) => {
    const height = parseInt(e.target.value, 10);
    setFloorHeights((prevFloorHeights) => {
      const newFloorHeights = [...prevFloorHeights];
      newFloorHeights[index] = height;
      return newFloorHeights;
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1>hi</h1>
        {/* <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Floor Height Calculator</h1>
          <div className="mb-4">
            <label htmlFor="numFloors" className="block mb-2">
              Number of Floors:
            </label>
            <input
              type="number"
              id="numFloors"
              value={numFloors}
              onChange={handleNumFloorsChange}
              className="w-full p-2 border"
            />
          </div> */}
          {/* {[...Array(numFloors)].map((_, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`floorHeight-${index + 1}`} className="block mb-2">
              Height of Floor {index + 1} (in meters):
            </label>
            <input
              type="number"
              id={`floorHeight-${index + 1}`}
              value={floorHeights[index]}
              onChange={(e) => handleFloorHeightChange(e, index)}
              className="w-full p-2 border"
            />
          </div>
        ))} */}
        {/* </div> */}
      </div>
    </>
  );
};

export default FloorHeightCalculator;