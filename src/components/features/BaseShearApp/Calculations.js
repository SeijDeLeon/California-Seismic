import calculateCs from '../../../assets/data/calculations/calculateCs';
import calculateCvx from '../../../assets/data/calculations/calculateCvx';
import calculateFvx from '../../../assets/data/calculations/calculateFvx';
import calculateV from '../../../assets/data/calculations/calculateV';

export const getFloorsFromBottom = (floors) => {
  let heightBottomToTop = 0;
  return floors.map((floor) => {
    const updated = { ...floor, bottom: heightBottomToTop };
    heightBottomToTop += floor.height;
    return updated;
  });
};

export const calculateForces = (floors, seismicParams) => {
  const { SDS, SD1, T, Ie, R, T0, TL } = seismicParams;

  // Heights to center of mass
  const heights = floors.map(f => f.bot + f.height / 2);
  const weights = floors.map(f => f.weight);
  const totalWeightHeight = weights.reduce((sum, w, i) => sum + w * heights[i], 0);

  const Cs = calculateCs(SDS, SD1, T, Ie, R, T0, TL); // Seismic coefficient
  const V = calculateV(Cs, weights);  // Base shear
  const Cvx = calculateCvx(weights, heights, totalWeightHeight); // Vertical distribution factor
  const forces = calculateFvx(Cvx, V); // Lateral force at each floor
  const storyVs = forces.map((_, i) => forces.slice(i).reduce((sum, fx) => sum + fx, 0)); // storyV = cumulative sum from top down

  const totalHeight = floors.reduce((sum, f) => sum + f.height, 0);

  return { Cs, totalBaseShear: V, totalHeight, forces, storyVs };
};