import calculateCs from '../../../assets/data/calculations/calculateCs';
import calculateV from '../../../assets/data/calculations/calculateV';
import calculateCvx from '../../../assets/data/calculations/calculateCvx';
import calculateFvx from '../../../assets/data/calculations/calculateFvx';

const interpolate = (value, valueArray, map, siteClass) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return null;
  
  if (numValue <= valueArray[0]) return map[valueArray[0]][siteClass];
  if (numValue >= valueArray[valueArray.length - 1]) return map[valueArray[valueArray.length - 1]][siteClass];

  for (let i = 0; i < valueArray.length - 1; i++) {
    if (numValue > valueArray[i] && numValue < valueArray[i + 1]) {
      const slope = (map[valueArray[i + 1]][siteClass] - map[valueArray[i]][siteClass]) / 
                    (valueArray[i + 1] - valueArray[i]);
      return map[valueArray[i]][siteClass] + slope * (numValue - valueArray[i]);
    }
  }
  return null;
}

const getFv = (s1, siteClass) => {
    const numS1 = parseFloat(s1);
    const s1Values = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
    const FvMap = {
      0.1: { A: 0.8, B: 0.8, C: 1.5, D: 2.4, E: 4.2, F: null },
      0.2: { A: 0.8, B: 0.8, C: 1.5, D: 2.2, E: null, F: null },
      0.3: { A: 0.8, B: 0.8, C: 1.5, D: 2.0, E: null, F: null },
      0.4: { A: 0.8, B: 0.8, C: 1.5, D: 1.9, E: null, F: null },
      0.5: { A: 0.8, B: 0.8, C: 1.5, D: 1.8, E: null, F: null },
      0.6: { A: 0.8, B: 0.8, C: 1.4, D: 1.7, E: null, F: null },
    };
    return FvMap[numS1]?.[siteClass] ?? interpolate(numS1, s1Values, FvMap, siteClass);
}

const getFa = (Ss, siteClass) => {
    const numSs = parseFloat(Ss);
    const SsValues = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5];
    const FaMap = {
      0.25: { A: 0.8, B: 0.9, C: 1.3, D: 1.6, E: 2.4, F: null },
      0.5: { A: 0.8, B: 0.9, C: 1.3, D: 1.4, E: 1.7, F: null },
      0.75: { A: 0.8, B: 0.9, C: 1.2, D: 1.2, E: 1.3, F: null },
      1.0: { A: 0.8, B: 0.9, C: 1.2, D: 1.1, E: null, F: null },
      1.25: { A: 0.8, B: 0.9, C: 1.2, D: 1.0, E: null, F: null },
      1.5: { A: 0.8, B: 0.9, C: 1.2, D: 1.0, E: null, F: null },
    };

    return FaMap[numSs]?.[siteClass] ?? interpolate(numSs, SsValues, FaMap, siteClass);
}

const getSMS = (Fa, Ss) => {
    const SMS = Fa * Ss;
    return SMS;
}

const getSM1 = (Fv, S1) => {
    const SM1 = Fv * S1;
    return SM1;
}

const getSDS = (SMS) => {
    const SDS = 2 / 3 * SMS;
    return SDS;
};

const getSD1 = (SM1) => {
    const SD1 = 2 / 3 * SM1;
    return SD1;
};

const getTs = (SDS, SD1) => {
  const Ts = SD1/SDS;
  return Ts;
}

const getCs = (SDS, SD1, T, Ie, R, S1, TL, siteClass) => {
  const data = calculateCs(SDS, SD1, T, Ie, R, S1, TL, siteClass);
  const Cs_initial = data.Cs_initial;
  const Cs_min = data.Cs_min;
  const Cs_max = data.Cs_max;
  const Cs_final = data.Cs_final;
  return { Cs_initial, Cs_min, Cs_max, Cs_final };
};

const getV = (Cs, W) => {
  return calculateV(Cs, W);
};

const getSDC = (SDS, SD1, riskCategory) => {
  const riskLevel = {
    "I - Low Risk": 1,
    "II - Regular Building": 2,
    "III - Substantial Risk": 3,
    "IV - Essential Facilities": 4,
  }[riskCategory];

  // (Table 11.6-1)
  let sdcS;
  if (riskLevel === 1 || riskLevel === 2 || riskLevel === 3) {
    if (SDS < 0.167) sdcS = 'A';
    else if (SDS < 0.33) sdcS = 'B';
    else if (SDS < 0.50) sdcS = 'C';
    else if (SDS >= 0.50) sdcS = 'D';
  } else if (riskLevel === 4) {
    if (SDS < 0.167) sdcS = 'A';
    else if (SDS < 0.33) sdcS = 'C';
    else if (SDS >= 0.33) sdcS = 'D';
  } else {
    sdcS = 'D';
  }

  // (Table 11.6-2)
  let sdc1;
  if (riskLevel === 1 || riskLevel === 2 || riskLevel === 3) {
    if (SD1 < 0.067) sdc1 = 'A';
    else if (SD1 < 0.133) sdc1 = 'B';
    else if (SD1 < 0.20) sdc1 = 'C';
    else if (SD1 >= 0.20) sdc1 = 'D';
  } else if (riskLevel === 4) {
    if (SD1 < 0.067) sdc1 = 'A';
    else if (SD1 < 0.133) sdc1 = 'C';
    else if (SD1 >= 0.133) sdc1 = 'D';
  } else {
    sdc1 = 'D';
  }

  const severityRank = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5 };
  // based on which is more severe
  let SDC = severityRank[sdcS] > severityRank[sdc1] ? sdcS : sdc1;

  return SDC;
};

const getCvx = (weights, heights, totalWeightHeight) => {
  return calculateCvx(weights, heights, totalWeightHeight);
};

const getFvx = (Cvx, V) => {
  return calculateFvx(Cvx, V);
};

const getFloorsFromBottom = (floors) => {
  let heightBottomToTop = 0;
  return floors.map((floor) => {
    const updated = { ...floor, bottom: heightBottomToTop };
    heightBottomToTop += floor.height;
    return updated;
  });
};

export const calculateBaseShearUnits = {
  getFv,
  getFa,
  getSMS,
  getSM1,
  getSDS,
  getSD1,
  getTs,
  getCs,
  getV,
  getSDC,
  getCvx,
  getFvx,
  getFloorsFromBottom,
};