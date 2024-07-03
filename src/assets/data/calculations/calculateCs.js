const calculateCs = (SDS, SD1, T, Ie, R, T0, TL) => {
  let Cs = SDS / (R / Ie);

  // 12.8-2
  Cs = Math.min(Cs, SD1 / (T * (R / Ie)));

  // 12.8-3
  const Cs_min = 0.044 * SDS * Ie > 0.01 ? 0.044 * SDS * Ie : 0.01;
  Cs = Math.max(Cs, Cs_min);

  // 12.8-4
  if (T <= TL) {
    const Cs_max = 0.044 * SDS * Ie;
    Cs = Math.min(Cs, Cs_max);
  } else {
    const Cs_max_TL = (0.044 * SDS * TL) / T;
    Cs = Math.min(Cs, Cs_max_TL);
  }

  // 12.8-5
  const Cs_exception = 0.5 * SDS * Ie / R;
  if (T >= T0 && T <= TL) {
    Cs = Math.min(Cs, Cs_exception);
  }

  // 12.8-6
  const Cs_near_fault = 0.044 * SDS * Ie;
  if (T <= TL) {
    Cs = Math.max(Cs, Cs_near_fault);
  }

  return Cs;
};

export default calculateCs;

