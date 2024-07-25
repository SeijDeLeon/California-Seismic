const calculateFundamentalPeriod = (W, stiffness) => {
    const fundamentalPeriod = 2 * Math.PI * Math.sqrt((W * 1000) / (386.09 * stiffness));

    return parseFloat(fundamentalPeriod.toFixed(2));
};

export default calculateFundamentalPeriod;