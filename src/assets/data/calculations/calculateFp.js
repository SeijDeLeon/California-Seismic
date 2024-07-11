const calculateFp = (ap, SDS, Wp, Rp, Ip, z, h) => {
    if (Rp === 0 || Ip === 0 || h === 0) {
      throw new Error("Rp, Ip, and h must be non-zero.");
    }

    // 13.3-1
    let Fp = ((0.4 * ap * SDS * Wp) / (Rp / Ip)) * (1 + 2 * (z / h));

    // 13.3-2
    const Fpmax = 1.6 * SDS * Ip * Wp;
  
    // 13.3-3
    const Fpmin = 0.3 * SDS * Ip * Wp;

    if (Fp > Fpmax) {
      Fp = Fpmax;
    }
    else if (Fp < Fpmin) {
      Fp = Fpmin;
    }

    return parseFloat(Fp.toFixed(2));
  };
  
  export default calculateFp;