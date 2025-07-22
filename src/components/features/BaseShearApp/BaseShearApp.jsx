import React, { useState } from 'react';
import InputTable from './InputSection';
import RenderSVG from './RenderSVG';
import DisplacementPlot from './Plot';
import { getFloorsWithBot, calculateForces } from './Calculations';

const BaseShearApp = () => {
  const [floors, setFloors] = useState([{ height: 20, weight: 100000 }]);

  const updatedFloors = getFloorsWithBot(floors);

  const seismicParams = {
    SDS: 1.0,
    SD1: 0.6,
    T: 1.2,
    Ie: 1.0,
    R: 5.5,
    T0: 0.12,
    TL: 8.0
  };

  const { totalBaseShear, totalHeight, forces, storyVs } = calculateForces(updatedFloors, seismicParams);

  const addFloor = () => {
    setFloors([...floors, { height: 20, weight: 1000 }]);
  };

  const deleteFloor = (index) => {
    const newFloors = [...floors];
    newFloors.splice(index, 1);
    setFloors(newFloors);
  };

  const handleChange = (index, key, value) => {
    const newFloors = [...floors];
    newFloors[index][key] = parseFloat(value) || 0;
    setFloors(newFloors);
  };

  return (
    <div className="p-6 font-sans max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Base Shear Diagram</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <InputTable
          floors={updatedFloors}
          addFloor={addFloor}
          deleteFloor={deleteFloor}
          handleChange={handleChange}
        />
        <RenderSVG
          floors={updatedFloors}
          forces={forces}
          storyVs={storyVs}
          totalBaseShear={totalBaseShear}
          totalHeight={totalHeight}
        />
      </div>
      <div className="mt-10">
        <DisplacementPlot />
      </div>
    </div>
  );
};

export default BaseShearApp;