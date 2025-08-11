const calculateFpOriginal = (ap, SDS, Wp, Rp, Ip, z, h) => {
    if (Rp === 0 || Ip === 0 || h === 0) {
      throw new Error("Rp, Ip, and h must be non-zero.");
    }

    // 13.3-1
    let FpOriginal = ((0.4 * ap * SDS * Wp) / (Rp / Ip)) * (1 + 2 * (z / h));
    return FpOriginal;
  };
  
  export default calculateFpOriginal;