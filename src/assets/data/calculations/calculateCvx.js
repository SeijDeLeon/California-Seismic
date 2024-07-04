const calculateCvx = (weights, heights, totalWeightHeight) => {
  return weights.map((weight, index) => (weight * heights[index]) / totalWeightHeight);
};

export default calculateCvx;
