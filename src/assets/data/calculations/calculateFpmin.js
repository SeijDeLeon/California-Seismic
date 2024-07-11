const calculateFpmin = (SDS, Wp, Ip) => {
    // 13.3-3
    const Fpmin = 0.3 * SDS * Ip * Wp;
    return parseFloat(Fpmin.toFixed(2));
  };
  
  export default calculateFpmin;