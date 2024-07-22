const calculateFundamentalPeriod = (W, stiffness) => {
    const fundamentalPeriod = 2 * Math.PI * Math.sqrt((W * 1000) / (386.09 * stiffness));

    return fundamentalPeriod;
};

export default calculateFundamentalPeriod;