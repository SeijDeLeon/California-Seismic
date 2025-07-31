import { useState, useEffect } from 'react';
import { getFloorsFromBottom, calculateForces } from './Calculations';
import { calculateBaseShearUnits } from '../../../assets/data/calculations/calculateBaseShearUnits';

export const useBaseShearState = () => {
  const defaultInputs = {
    selectedRisk: "II - Regular Building",
    selectedSiteClass: "D - Default",
    selectedSystem: "Shear Wall (R = 5.0)",
    shortPeriodSpectralAcceleration: "1.50",
    longPeriodSpectralAcceleration: "0.60",
    longPeriodTransitionPeriod: "8.00",
    Ie: "1.00",
    R: "5.00",
    T: "1.00",
    buildingHeight: 0,
    floors: [{ height: 20, weight: 100000 }],
  };

  const [inputs, setInputs] = useState(() => {
    const saved = localStorage.getItem("baseShearInputs");
    return saved ? JSON.parse(saved) : defaultInputs;
  });

  const [results, setResults] = useState({
    Fv: 0, Fa: 0, SMS: 0, SM1: 0,
    SDS: 0, SD1: 0, Ts: 0,
    Cs_initial: 0, Cs_min: 0, Cs_max: 0, Cs_final: 0,
    SDC: '',
  });

  const parsedSiteClass = inputs.selectedSiteClass.charAt(0);
  const updatedFloors = getFloorsFromBottom(inputs.floors);

  useEffect(() => {
    const Fv = calculateBaseShearUnits.getFv(inputs.longPeriodSpectralAcceleration, parsedSiteClass);
    const Fa = calculateBaseShearUnits.getFa(inputs.shortPeriodSpectralAcceleration, parsedSiteClass);

    const SMS = calculateBaseShearUnits.getSMS(Fa, inputs.shortPeriodSpectralAcceleration);
    const SM1 = calculateBaseShearUnits.getSM1(Fv, inputs.longPeriodSpectralAcceleration);

    const SDS = calculateBaseShearUnits.getSDS(SMS);
    const SD1 = calculateBaseShearUnits.getSD1(SM1);
    const Ts = calculateBaseShearUnits.getTs(SDS, SD1);

    const Cs = calculateBaseShearUnits.getCs(
      SDS, SD1,
      parseFloat(inputs.T),
      parseFloat(inputs.Ie),
      parseFloat(inputs.R),
      inputs.longPeriodSpectralAcceleration,
      inputs.longPeriodTransitionPeriod || 8.0,
      parsedSiteClass
    );

    const SDC = calculateBaseShearUnits.getSDC(SDS, SD1, inputs.selectedRisk);

    setResults({
      Fv, Fa, SMS, SM1, SDS, SD1, Ts,
      Cs_initial: Cs.Cs_initial,
      Cs_min: Cs.Cs_min,
      Cs_max: Cs.Cs_max,
      Cs_final: Cs.Cs_final,
      SDC: SDC,
    });
  }, [inputs.shortPeriodSpectralAcceleration, inputs.longPeriodSpectralAcceleration, inputs.longPeriodTransitionPeriod, inputs.selectedRisk, inputs.selectedSiteClass, parsedSiteClass, inputs.T, inputs.R, inputs.Ie]);


  const seismicParams = {
    SDS: results.SDS,
    SD1: results.SD1,
    T: parseFloat(inputs.T),
    R: parseFloat(inputs.R),
    T0: 0.12,
    TL: inputs.longPeriodTransitionPeriod || 8.0,
  };

  const { totalBaseShear, totalHeight, forces, storyVs } = calculateForces(updatedFloors, seismicParams);

  const resetInputs = () => {
    const reset = {
      ...defaultInputs,
      R: 5.00,
    };

    setInputs(reset);
  };

  useEffect(() => {
    localStorage.setItem("baseShearInputs", JSON.stringify(inputs));
  }, [inputs]);

  return {
    inputs,
    setInputs,
    results,
    updatedFloors,
    totalBaseShear,
    totalHeight,
    forces,
    storyVs,
    resetInputs,
  };
};
