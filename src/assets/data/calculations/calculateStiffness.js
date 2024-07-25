const calculateStiffness = (E, I, h) => {
    const stiffness = (3 * E * I) / (Math.pow(h * 12, 3));

    return parseFloat(stiffness.toFixed(2));
};

export default calculateStiffness;