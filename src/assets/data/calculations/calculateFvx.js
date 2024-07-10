const calculateFvx = (Cvx, V) => {
  const Fvx = Cvx.map(cvx => cvx * V);

  return Fvx;
};

export default calculateFvx;

