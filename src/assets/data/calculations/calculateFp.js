const calculateFp = (FpOriginal, Fpmax, Fpmin) => {
    let Fp = FpOriginal;
    if (Fp > Fpmax) {
      Fp = Fpmax;
    }
    else if (Fp < Fpmin) {
      Fp = Fpmin;
    }

    return Fp;
  };
  
  export default calculateFp;