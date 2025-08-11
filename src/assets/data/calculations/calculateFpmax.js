const calculateFpmax = (SDS, Wp, Ip) => {
    // 13.3-2
    const Fpmax = 1.6 * SDS * Ip * Wp;
    return Fpmax;
  };
  
  export default calculateFpmax;