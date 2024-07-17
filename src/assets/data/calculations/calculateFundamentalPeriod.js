const calculateFundamentalPeriod = (W, G, stiffness) => {
    const fundamentalPeriod = 2 * Math.PI * Math.sqrt((W * 1000) / (G * stiffness));

    return fundamentalPeriod;
};

export default calculateFundamentalPeriod;