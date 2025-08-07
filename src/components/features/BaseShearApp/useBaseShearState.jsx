import { useState, useEffect, useMemo } from 'react';
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
    { key: 'Fv', value: 0, label: 'F_v' },
    { key: 'Fa', value: 0, label: 'F_a' },
    { key: 'SMS', value: 0, label: 'S_{MS}' },
    { key: 'SM1', value: 0, label: 'S_{M1}' },
    { key: 'SDS', value: 0, label: 'S_{DS}' },
    { key: 'SD1', value: 0, label: 'S_{D1}' },
    { key: 'Ts', value: 0, label: 'T_s' },
    { key: 'Cs_initial', value: 0, label: 'C_{s,\\initial}' },
    { key: 'Cs_min', value: 0, label: 'C_{s,\\min}' },
    { key: 'Cs_max', value: 0, label: 'C_{s,\\max}' },
    { key: 'Cs_final', value: 0, label: 'C_{s,\\final}' },
    { key: 'SDC', value: '', label: 'S_{DC}' },
    { key: 'V', value: 0, label: 'V'},
    { key: 'Cvx', value: [], label: 'C_{vx}' },
    { key: 'Fvx', value: [], label: 'F_{vx}' },
    { key: 'totalHeight', value: 0, label: 'h_{total}' },
    { key: 'storyVs', value: [], label: 'Story_V' },
  ]);

  const parsedSiteClass = inputs.selectedSiteClass.charAt(0);
  const updatedFloors = useMemo(
    () => calculateBaseShearUnits.getFloorsFromBottom(inputs.floors),
    [inputs.floors]
  );

  useEffect(() => {
    const heights = updatedFloors.map(f => f.bottom + f.height / 2);
    const weights = updatedFloors.map(f => f.weight);
    const totalWeightHeight = weights.reduce((sum, w, i) => sum + w * heights[i], 0);

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

    const V = calculateBaseShearUnits.getV(Cs.Cs_final, weights);
    const Cvx = calculateBaseShearUnits.getCvx(weights, heights, totalWeightHeight);
    const Fvx = calculateBaseShearUnits.getFvx(Cvx, V); // Vertical distribution factor
    const totalHeight = updatedFloors.reduce((sum, f) => sum + f.height, 0);
    const storyVs = Fvx.map((_, i) => Fvx.slice(i).reduce((sum, fx) => sum + fx, 0)); // storyV = cumulative sum from top down

    setResults([
      { key: 'Fv', value: Fv, label: 'F_v' },
      { key: 'Fa', value: Fa, label: 'F_a' },
      { key: 'SMS', value: SMS, label: 'S_{MS}' },
      { key: 'SM1', value: SM1, label: 'S_{M1}' },
      { key: 'SDS', value: SDS, label: 'S_{DS}' },
      { key: 'SD1', value: SD1, label: 'S_{D1}' },
      { key: 'Ts', value: Ts, label: 'T_s' },
      { key: 'Cs_initial', value: Cs.Cs_initial, label: 'C_{s,\\text{initial}}' },
      { key: 'Cs_min', value: Cs.Cs_min, label: 'C_{s,\\min}' },
      { key: 'Cs_max', value: Cs.Cs_max, label: 'C_{s,\\max}' },
      { key: 'Cs_final', value: Cs.Cs_final, label: 'C_{s,\\text{final}}' },
      { key: 'SDC', value: SDC, label: 'S_{DC}' },
      { key: 'V', value: V, label: 'V'},
      { key: 'Cvx', value: Cvx, label: 'C_{vx}' },
      { key: 'Fvx', value: Fvx, label: 'F_{vx}' },
      { key: 'totalHeight', value: totalHeight, label: 'h_{total}' },
      { key: 'storyVs', value: storyVs, label: 'Story_V' },
    ]);
  }, [inputs.shortPeriodSpectralAcceleration, inputs.longPeriodSpectralAcceleration, inputs.longPeriodTransitionPeriod, inputs.selectedRisk, inputs.selectedSiteClass, parsedSiteClass, inputs.T, inputs.R, inputs.Ie, updatedFloors]);

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
    resetInputs,
  };
};