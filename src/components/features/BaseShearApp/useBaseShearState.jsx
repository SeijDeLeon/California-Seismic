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
  const [results, setResults] = useState([
    { key: 'Fv', value: 0, label: '\\mathrm{F}_v' },
    { key: 'Fa', value: 0, label: '\\mathrm{F}_a' },
    { key: 'SMS', value: 0, label: 'SMS' },
    { key: 'SM1', value: 0, label: 'SM1' },
    { key: 'SDS', value: 0, label: 'SDS' },
    { key: 'SD1', value: 0, label: 'SD1' },
    { key: 'Ts', value: 0, label: 'T_s' },
    { key: 'Cs_initial', value: 0, label: 'C_{s,\\initial}' },
    { key: 'Cs_min', value: 0, label: 'C_{s,\\min}' },
    { key: 'Cs_max', value: 0, label: 'C_{s,\\max}' },
    { key: 'Cs_final', value: 0, label: 'C_{s,\\final}' },
    { key: 'SDC', value: '', label: '\\mathrm{SDC}' },
  ]);

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

    setResults([
      { key: 'Fv', value: Fv, label: '\\mathrm{F}_v' },
      { key: 'Fa', value: Fa, label: '\\mathrm{F}_a' },
      { key: 'SMS', value: SMS, label: 'SMS' },
      { key: 'SM1', value: SM1, label: 'SM1' },
      { key: 'SDS', value: SDS, label: 'SDS' },
      { key: 'SD1', value: SD1, label: 'SD1' },
      { key: 'Ts', value: Ts, label: 'T_s' },
      { key: 'Cs_initial', value: Cs.Cs_initial, label: 'C_{s,\\text{initial}}' },
      { key: 'Cs_min', value: Cs.Cs_min, label: 'C_{s,\\min}' },
      { key: 'Cs_max', value: Cs.Cs_max, label: 'C_{s,\\max}' },
      { key: 'Cs_final', value: Cs.Cs_final, label: 'C_{s,\\text{final}}' },
      { key: 'SDC', value: SDC, label: '\\mathrm{SDC}' },
    ]);
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
