import { useEffect } from 'react';
import { EquationFormat } from '../../common/EquationFormat';
import { BentoInput } from '../../common/BentoInput';
import { BentoBox } from '../../common/BentoBox';
import { BentoContainer } from '../../common/BentoContainer';
import InputTable from './InputSection';
import RenderSVG from './RenderSVG';
import DisplacementPlot from './Plot';
import { useBaseShearState } from './useBaseShearState';

const BaseShearApp = () => {
  const {
    inputs, setInputs, results, updatedFloors, resetInputs
  } = useBaseShearState();

  const handleInputChange = (key) => (valOrEvent) => {
    const value = valOrEvent?.target?.value ?? valOrEvent;
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const addFloor = () => {
    setInputs((prev) => ({
      ...prev,
      floors: [...prev.floors, { height: 20, weight: 1000 }]
    }));
  };

  const deleteFloor = (index) => {
    const newFloors = [...inputs.floors];
    newFloors.splice(index, 1);
    setInputs((prev) => ({ ...prev, floors: newFloors }));
  };

  const handleChange = (index, key, value) => {
    const newFloors = [...inputs.floors];
    if (value === '' || value === null) {
      newFloors[index][key] = '';
    } else {
      const num = parseFloat(value);
      newFloors[index][key] = isNaN(num) ? '' : num;
    }
    setInputs((prev) => ({ ...prev, floors: newFloors }));
  };

  useEffect(() => {
    const Ie_map = {
      "I - Low Risk": "1.00",
      "II - Regular Building": "1.00",
      "III - Substantial Risk": "1.25",
      "IV - Essential Facilities": "1.50",
    };
    setInputs((prev) => ({ ...prev, Ie: Ie_map[prev.selectedRisk] }));
  }, [inputs.selectedRisk, setInputs]);

  const totalBaseShear = (results || []).find(result => result.key === 'V')?.value;
  
  // The values that would want to be shown in solutions bento
  // const keysToShow = [
  //   'Fv', 'Fa', 'SMS', 'SM1', 'SDS', 'SD1', 'Ts',
  //   'Cs_initial', 'Cs_min', 'Cs_max', 'Cs_final'
  //   ]
  
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
        <button onClick={resetInputs} className="my-3 mb-5 font-bold w-auto rounded hover:text-red-700 text-sm self-end">
          Reset All Inputs
        </button>
        <h5 className="font-semibold mb-2 text-md">Building Properties:</h5>
        <InputTable
          floors={updatedFloors}
          addFloor={addFloor}
          deleteFloor={deleteFloor}
          handleChange={handleChange}
        />
      </BentoBox>

      <BentoBox title="DIAGRAM:">
        <RenderSVG
        floors={updatedFloors}
        forces={results.find(result => result.key === 'Fvx')?.value || []}
        storyVs={results.find(result => result.key === 'storyVs')?.value || []}
        totalBaseShear={totalBaseShear}
        totalHeight={results.find(result => result.key === 'totalHeight')?.value || 0}
        />
      </BentoBox>

      <BentoBox title="SOLUTIONS:">
        {(
          !inputs.shortPeriodSpectralAcceleration ||
          !inputs.longPeriodSpectralAcceleration ||
          !inputs.longPeriodTransitionPeriod
        ) ? (
          <p className="text-red-600 font-semibold">
            Please provide Short Period Acceleration (Ss), Long Period Acceleration (S1), and Long Period Transition Period (TL) to see results.
          </p>
        ) : (
          <section className="flex gap-1 flex-col text-sm text-gray-700 justify-start items-start align-start pl-3">
            {/* {results
              .filter(({ key }) => keysToShow.includes(key))
              .map(({ key, value, label }) => (
                <EquationFormat
                  key={key}
                  value={`\\(${label} =\\)`}
                  result={typeof value === 'number' ? value.toFixed(2) : value}
                />
              ))}
            {results.filter(({ key }) => key === 'SDC').map(({ key, value }) => (
              <EquationFormat
                key={key}
                value={`Seismic Design Category (${key}) =`}
                result={value || 'N/A'}
              />
            ))} */}
            <p className="font-bold text-2xl">Total Base Shear (V): {
              typeof totalBaseShear === 'number' && !isNaN(totalBaseShear)
                ? `${totalBaseShear.toFixed(2)} kips`
                : 'N/A'
            }</p>
          </section>
        )}

        {/* Side-by-side plots */}
        <div className="w-full flex flex-col items-center px-4 mt-6">
          <h4 className="font-semibold mb-2 text-md">Plots:</h4>
          <div className="w-full flex justify-center items-start gap-6">
            <div className="w-1/2">
              <DisplacementPlot
                floors={updatedFloors}
                results={results}
                displacementType="horizontal"
              />
            </div>
            <div className="w-1/2">
              <DisplacementPlot
                floors={updatedFloors}
                results={results}
                displacementType="vertical"
              />
            </div>
          </div>
        </div>
      </BentoBox>

    </BentoContainer>
  );
};

export default BaseShearApp;
