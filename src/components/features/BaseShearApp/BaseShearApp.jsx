import { useEffect, useRef, useState, useCallback } from 'react';
import { BentoContainer } from '../../common/BentoContainer';
import { EquationFormat } from '../../common/EquationFormat';
import { BentoInput } from '../../common/BentoInput';
import { BentoBox } from '../../common/BentoBox';
import InputTable from './InputSection';
import RenderSVG from './RenderSVG';
import DisplacementPlot from './Plot';
import { getFloorsWithBot, calculateForces } from './Calculations';

const BaseShearApp = () => {

  const [selectedRisk, setSelectedRisk] = useState("II - Regular Building");
  const [selectedSiteClass, setSelectedSiteClass] = useState("D - Default");
  const [shortPeriodSpectralAcceleration, setShortPeriodSpectralAcceleration] = useState(0);
  const [longPeriodSpectralAcceleration, setLongPeriodSpectralAcceleration] = useState(0);
  const [longPeriodTransitionPeriod, setLongPeriodTransitionPeriod] = useState(0);
  const [showDiagramType, setShowDiagramType] = useState('svg'); // or 'plot'
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
    <BentoContainer title="Base Shear Calculator">
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

        <section className="mt-2 text-black grid grid-cols-2 gap-2 text-xs w-full justify-between items-center">
          <p className="text-start">Design Short-Period Spectral Acceleration:</p>
          <EquationFormat value={"\\(S_{DS} =\\)"} result={"2.52"} />

          <p className="text-start">Design Long-Period Spectral Acceleration:</p>
          <EquationFormat value={"\\(S_{DS} =\\)"} result={"2.12"} />

          <p className="text-start">Seismic Design Category:</p>
          <EquationFormat value={"\\(S_{DS} =\\)"} result={"E"} />

          <p className="text-start">Seismic Base Shear:</p>
          <EquationFormat value={"\\(V =\\)"} result={"121,851lb"} />
        </section>
      </BentoBox>

      <BentoBox title="BUILDING STORIES:">
        <InputTable
          floors={updatedFloors}
          addFloor={addFloor}
          deleteFloor={deleteFloor}
          handleChange={handleChange}
        />
      </BentoBox>

      <BentoBox title="DIAGRAM:">
        {/* Truly centered toggle switch */}
        <div className="w-full flex justify-center mb-4">
          <div className="relative flex items-center bg-gray-500 rounded-full w-28 h-10">
            {/* Sliding background highlight */}
            <div
              className={`absolute inset-y-1 h-8 w-1/2 rounded-full transition-all duration-300 bg-gray-800 ${
                showDiagramType === 'plot' ? 'right-1' : 'left-1'
              }`}
            ></div>

            {/* SVG label */}
            <button
              className="z-10 w-1/2 text-center text-white text-sm font-medium pl-1"
              onClick={() => setShowDiagramType('svg')}
            >
              SVG
            </button>

            {/* Plot label */}
            <button
              className="z-10 w-1/2 text-center text-white text-sm font-medium pr-1"
              onClick={() => setShowDiagramType('plot')}
            >
              Plot
            </button>
          </div>
        </div>

        {/* Diagram rendering */}
        <div className="w-full flex justify-center items-center">
          {showDiagramType === 'svg' ? (
            <RenderSVG
              floors={updatedFloors}
              forces={forces}
              storyVs={storyVs}
              totalBaseShear={totalBaseShear}
              totalHeight={totalHeight}
            />
          ) : (
            <DisplacementPlot />
          )}
        </div>
      </BentoBox>

      <BentoBox title="SOLUTIONS:">
        {/* FILL IN WITH JASON'S SOLUTION CODE WHEN ITS FINISHED */}
      </BentoBox>
    </BentoContainer>
  );
};

export default BaseShearApp;