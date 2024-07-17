const calculateFundamentalPeriod = (W, G, stiffness) => {
    const fundamentalPeriod = 2 * Math.PI * Math.sqrt(W / (G * stiffness));

    return fundamentalPeriod;
};

export default calculateFundamentalPeriod;