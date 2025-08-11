const calculateV = (Cs, weights) => {
    const totalWeight = weights.reduce((sum, weight) => sum + parseFloat(weight || 0), 0);
    return Cs * totalWeight;
  };
  
  export default calculateV;
  
