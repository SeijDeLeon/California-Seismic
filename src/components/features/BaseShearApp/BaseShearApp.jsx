import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { EquationFormat } from '../../common/EquationFormat';
import { BentoInput } from '../../common/BentoInput';
import { BentoBox } from '../../common/BentoBox';
import { BentoContainer } from '../../common/BentoContainer';
import { Loader } from '../../common/Loader';
import InputTable from './InputSection';
import RenderSVG from './RenderSVG';
import DisplacementPlot from './Plot';
import BaseShearOutput from './BaseShearOutput';
import { useBaseShearState } from './useBaseShearState';

const BaseShearApp = React.memo(() => {
  const {
    inputs, setInputs, results, updatedFloors, isLoading, resetInputs
  } = useBaseShearState();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUltraWide, setIsUltraWide] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 2560;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsUltraWide(window.innerWidth >= 2560);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = useCallback((key) => (valOrEvent) => {
    const value = valOrEvent?.target?.value ?? valOrEvent;
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, [setInputs]);

  const addFloor = useCallback(() => {
    setInputs((prev) => ({
      ...prev,
      floors: [...prev.floors, { height: 20, weight: 1000 }]
    }));
  }, [setInputs]);

  const deleteFloor = useCallback((index) => {
    const newFloors = [...inputs.floors];
    newFloors.splice(index, 1);
    setInputs((prev) => ({ ...prev, floors: newFloors }));
  }, [inputs.floors, setInputs]);

  const handleChange = useCallback((index, key, value) => {
    const newFloors = [...inputs.floors];
    if (value === '' || value === null) {
      newFloors[index][key] = '';
    } else {
      const num = parseFloat(value);
      newFloors[index][key] = isNaN(num) ? '' : num;
    }
    setInputs((prev) => ({ ...prev, floors: newFloors }));
  }, [inputs.floors, setInputs]);

  const totalBaseShear = useMemo(() =>
    (results || []).find(result => result.key === 'V')?.value,
    [results]
  );

  const forceResults = useMemo(() => ({
    forces: results.find(result => result.key === 'Fvx')?.value || [],
    storyVs: results.find(result => result.key === 'storyVs')?.value || [],
    totalHeight: results.find(result => result.key === 'totalHeight')?.value || 0
  }), [results]);

  useEffect(() => {
    const Ie_map = {
      "I - Low Risk": "1.00",
      "II - Regular Building": "1.00",
      "III - Substantial Risk": "1.25",
      "IV - Essential Facilities": "1.50",
    };
    setInputs((prev) => ({ ...prev, Ie: Ie_map[prev.selectedRisk] }));
  }, [inputs.selectedRisk, setInputs]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isDrawerOpen && !isUltraWide) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isDrawerOpen, isUltraWide]);

  return (
    <BentoContainer title="Base Shear Calculator">
      <BentoBox title="USER INPUTS:">
        <BentoInput
          label="Risk Category"
          value={inputs.selectedRisk}
          listItems={[
            "I - Low Risk",
            "II - Regular Building",
            "III - Substantial Risk",
            "IV - Essential Facilities",
          ]}
          onChange={handleInputChange("selectedRisk")}
          inputType="list"
          tooltip="Defines the building’s occupancy importance. Category II is standard for most structures; Categories III and IV are for critical or high-occupancy facilities."
        />
        <BentoInput
          label="Site Class"
          value={inputs.selectedSiteClass}
          listItems={[
            "A - Hard Rock", "B - Rock", "C - Very Dense Soil and Soft Rock",
            "D - Stiff Soil", "D - Default", "E - Soft Clay Soil"
          ]}
          onChange={handleInputChange("selectedSiteClass")}
          inputType="list"
          tooltip="Select the soil classification at the site. Class D is most common for general use when geotechnical data is unavailable."
        />
        <BentoInput
          label="Lateral Force-Resisting System"
          value={inputs.selectedSystem}
          listItems={[
            "Unreinforced Masonry (R = 1.5)",
            "Shear Wall (R = 5.0)",
            "Concrete Moment Frame (R = 5.0)",
            "Steel Moment Frame (R = 5.5)",
            "Braced Frame (R = 6.0)",
            "Special Steel Moment Frame (R = 8.0)",
            "Base Isolation (R = 10.0)"
          ]}
          onChange={(val) => {
            const match = val.match(/\(R = ([\d.]+)\)/);
            const R = match ? parseFloat(match[1]) : 5.5;
            setInputs((prev) => ({ ...prev, selectedSystem: val, R }));
          }}
          equation={<EquationFormat value={"\\(R =\\)"} />}
          inputType="list"
          tooltip="Select the lateral force-resisting system. This determines the response modification factor R."
        />
        <BentoInput
          label="Short Period Spectral Acceleration"
          value={inputs.shortPeriodSpectralAcceleration}
          equation={<EquationFormat value={"\\(S_{s,input} =\\)"} />}
          onChange={handleInputChange("shortPeriodSpectralAcceleration")}
          inputType="default"
          tooltip="Mapped acceleration parameter (Ss) at a 0.2-second period. Typical values range from 0.25 to 2.0 g depending on seismicity."
        />
        <BentoInput
          label="Long Period Spectral Acceleration"
          value={inputs.longPeriodSpectralAcceleration}
          equation={<EquationFormat value={"\\(S_{1,input} =\\)"} />}
          onChange={handleInputChange("longPeriodSpectralAcceleration")}
          inputType="default"
          tooltip="Mapped acceleration parameter (S1) at a 1.0-second period. Typical values range from 0.1 to 1.0 g."
        />
        <BentoInput
          label="Long Period Transition Period"
          value={inputs.longPeriodTransitionPeriod}
          equation={<EquationFormat value={"\\(T_{L,input} =\\)"} />}
          onChange={handleInputChange("longPeriodTransitionPeriod")}
          inputType="default"
          tooltip="Transition period (TL) between constant acceleration and velocity response. Common values range from 4 to 8 seconds."
        />
        <BentoInput
          label="Importance Factor"
          value={inputs.Ie}
          equation={<EquationFormat value={"\\(I_{e} =\\)"} />}
          listItems={[
            "1.0", "1.25", "1.50"
          ]}
          onChange={handleInputChange("Ie")}
          inputType="list"
          tooltip="Amplifies seismic forces for critical facilities. 1.0 for most buildings; 1.25 or 1.5 for essential or hazardous structures."
        />
        <BentoInput
          label="Fundamental Period"
          value={inputs.T}
          equation={<EquationFormat value={"\\(T =\\)"} />}
          onChange={handleInputChange("T")}
          inputType="default"
          tooltip="Estimated vibration period of the structure in seconds. Typical range is 0.1 to 3.0 seconds depending on height and stiffness."
        />
        <button onClick={resetInputs} className="my-3 mb-5 font-bold w-auto rounded hover:text-red-700 text-xs sm:text-sm self-end px-2 py-1">
          Reset All Inputs
        </button>
        <h5 className="font-semibold mb-2 text-sm sm:text-md">Building Properties:</h5>
        <InputTable
          floors={updatedFloors}
          addFloor={addFloor}
          deleteFloor={deleteFloor}
          handleChange={handleChange}
        />
      </BentoBox>

      <BentoBox title="DIAGRAM:">
        <div className="relative overflow-hidden">
          {!isUltraWide && (
            <div className="absolute top-0 -right-2 z-10">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className={`bg-blue-500 hover:bg-blue-600 text-white p-2 shadow-lg text-sm font-medium flex flex-col items-center gap-2 transition-all duration-300 ease-in-out
                  ${isDrawerOpen ? 'rounded-l-lg rounded-r-none bg-blue-600' : 'rounded-l-lg rounded-r-lg'}
                  min-h-[120px]`}
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed'
                }}
              >
                <span className="rotate-0 whitespace-nowrap tracking-wide">
                  Solutions
                </span>
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="min-h-[50vh] flex items-center justify-center">
              <Loader title={"Loading seismic diagrams..."} />
            </div>
          ) : (
            <>
              <RenderSVG
                floors={updatedFloors}
                forces={forceResults.forces}
                storyVs={forceResults.storyVs}
                totalBaseShear={totalBaseShear}
                totalHeight={forceResults.totalHeight}
              />
              {/* Side-by-side plots */}
              <div className="w-full flex flex-col items-center px-2 sm:px-4 mt-6">
                <h4 className="font-semibold mb-2 text-sm sm:text-md">Plots:</h4>
                <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-6">
                  <div className="w-full h-full lg:w-1/2">
                    <DisplacementPlot
                      floors={updatedFloors}
                      results={results}
                      displacementType="horizontal"
                    />
                  </div>
                  <div className="w-full h-full lg:w-1/2">
                    <DisplacementPlot
                      floors={updatedFloors}
                      results={results}
                      displacementType="vertical"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {!isUltraWide && isDrawerOpen && (
            <div className="fixed inset-y-0 right-0 z-50 flex">
              <div
                className={`relative w-full max-w-2xl bg-white shadow-2xl border-2 border-blue-200 flex flex-col`}
              >
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-200 flex justify-between items-center flex-shrink-0">
                  <h3 className="text-blue-600 text-lg font-semibold">Base Shear Analysis Results</h3>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto overscroll-y-contain touch-pan-y bg-white p-4">
                  <BaseShearOutput results={results} inputs={inputs} isLoading={isLoading} />
                </div>
              </div>
            </div>
          )}
        </div>
      </BentoBox>

      {isUltraWide && (
        <BentoBox title="SOLUTIONS:">
          <BaseShearOutput results={results} inputs={inputs} isLoading={isLoading} />
        </BentoBox>
      )}

    </BentoContainer>
  );
});

export default BaseShearApp;
