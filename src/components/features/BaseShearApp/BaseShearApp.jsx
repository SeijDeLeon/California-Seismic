import { useEffect, useRef, useState, useCallback } from 'react';
import { BentoContainer } from '../../common/BentoContainer';
import { EquationFormat } from '../../common/EquationFormat';
import { BentoInput } from '../../common/BentoInput';
import { BentoBox } from '../../common/BentoBox';
import InputTable from './InputSection';
import RenderSVG from './RenderSVG';
import DisplacementPlot from './Plot';
import { getFloorsWithBot, calculateForces } from './Calculations';
import { calculateBaseShearUnits } from '../../../assets/data/calculations/calculateBaseShearUnits';

const BaseShearApp = () => {

  const [selectedRisk, setSelectedRisk] = useState("II - Regular Building");
  const [selectedSiteClass, setSelectedSiteClass] = useState("D - Default");
  const [numberOfFloors, setNumberOfFloors] = useState(1);
  const [shortPeriodSpectralAcceleration, setShortPeriodSpectralAcceleration] = useState(0);
  const [longPeriodSpectralAcceleration, setLongPeriodSpectralAcceleration] = useState(0);
  const [longPeriodTransitionPeriod, setLongPeriodTransitionPeriod] = useState(0);
  const [floors, setFloors] = useState([{ height: 20, weight: 100000 }]);
  const [Cs_initial, setCs_initial] = useState(0);
  const [Cs_min, setCs_min] = useState(0);
  const [Cs_max, setCs_max] = useState(0);
  const [Cs_final, setCs_final] = useState(0);
  const [Fv, setFv] = useState(0);
  const [Fa, setFa] = useState(0);
  const [SMS, setSMS] = useState(0);
  const [SM1, setSM1] = useState(0);
  const [SDS, setSDS] = useState(0);
  const [SD1, setSD1] = useState(0);
  const [Ts, setTs] = useState(0);

  const updatedFloors = getFloorsWithBot(floors);

  useEffect(() => {
    const parsedSiteClass = selectedSiteClass.charAt(0);

    const Fv_local = calculateBaseShearUnits.getFv(longPeriodSpectralAcceleration, parsedSiteClass);
    const Fa_local = calculateBaseShearUnits.getFa(shortPeriodSpectralAcceleration, parsedSiteClass);

    const SMS_local = calculateBaseShearUnits.getSMS(Fa_local, shortPeriodSpectralAcceleration);
    const SM1_local = calculateBaseShearUnits.getSM1(Fv_local, longPeriodSpectralAcceleration);

    const SDS_local = calculateBaseShearUnits.getSDS(SMS_local);
    const SD1_local = calculateBaseShearUnits.getSD1(SM1_local);

    const Ts_local = calculateBaseShearUnits.getTs(SDS_local, SD1_local);

    const Cs = calculateBaseShearUnits.getCs(
      SDS_local,
      SD1_local,
      Ts_local,
      1.0,
      5.5,
      longPeriodSpectralAcceleration,
      longPeriodTransitionPeriod,
      parsedSiteClass
    );

    setFv(Fv_local);
    setFa(Fa_local);
    setSMS(SMS_local);
    setSM1(SM1_local);
    setSDS(SDS_local);
    setSD1(SD1_local);
    setTs(Ts_local);
    setCs_initial(Cs.Cs_initial);
    setCs_min(Cs.Cs_min);
    setCs_max(Cs.Cs_max);
    setCs_final(Cs.Cs_final);
    console.log(Fv_local, Fa_local, SMS_local, SM1_local, SDS_local, SD1_local, Ts_local, Cs);
  }, [
    longPeriodSpectralAcceleration,
    shortPeriodSpectralAcceleration,
    longPeriodTransitionPeriod,
    selectedRisk,
    selectedSiteClass,
  ]);

  const seismicParams = {
    SDS: SDS,
    SD1: SD1,
    T: 1.0,
    Ie: 1.0,
    R: 5.5,
    T0: 0.12,
    TL: longPeriodTransitionPeriod || 8.0
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
        />

        <section className="mt-2 text-black grid grid-cols-2 gap-2 text-xs w-full justify-between items-center">
          <p className="text-start">Design Short-Period Spectral Acceleration:</p>
          <EquationFormat value={"\\(S_{DS} =\\)"} result={SDS.toFixed(3)} />

          <p className="text-start">Design Long-Period Spectral Acceleration:</p>
          <EquationFormat value={"\\(S_{D1} =\\)"} result={SD1.toFixed(3)} />

          <p className="text-start">Seismic Design Category:</p>
          <EquationFormat value={"\\(S_{DS} =\\)"} result={"E"} />

          <p className="text-start">Seismic Base Shear:</p>
          <EquationFormat value={"\\(V =\\)"} result={totalBaseShear.toFixed(0)} />
        </section>
      </BentoBox>

      <BentoBox title="INPUTS:">
        <InputTable
          floors={updatedFloors}
          addFloor={addFloor}
          deleteFloor={deleteFloor}
          handleChange={handleChange}
        />
      </BentoBox>
      <BentoBox title="SVG:">
        <RenderSVG
          floors={updatedFloors}
          forces={forces}
          storyVs={storyVs}
          totalBaseShear={totalBaseShear}
          totalHeight={totalHeight}
        />
      </BentoBox>
      <BentoBox title="DIAGRAM:">
        <DisplacementPlot />
      </BentoBox>
      <BentoBox title="SOLUTIONS:">
        <p>Fv: {Fv.toFixed(2)}</p>
        <p>Fa: {Fa.toFixed(2)}</p>
        <p>SMS: {SMS.toFixed(2)}</p>
        <p>SM1: {SM1.toFixed(2)}</p>
        <p>SDS: {SDS.toFixed(2)}</p>
        <p>SD1: {SD1.toFixed(2)}</p>
        <p>Ts: {Ts.toFixed(2)}</p>
        <p>Cs Initial: {Cs_initial.toFixed(2)}</p>
        <p>Cs Min: {Cs_min.toFixed(2)}</p>
        <p>Cs Max: {Cs_max.toFixed(2)}</p>
        <p>Cs Final: {Cs_final.toFixed(2)}</p>
        <p>Total Base Shear: {totalBaseShear.toFixed(2)} kips</p>
      </BentoBox>
    </BentoContainer>
  );
};

export default BaseShearApp;
