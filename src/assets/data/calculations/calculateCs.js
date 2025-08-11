// ASCE 7-16 §12.8.1.1: Seismic Response Coefficient (Cs) Calculator
const calculateCs = (SDS, SD1, T, Ie, R, S1, TL, siteClass) => {
  const Ts = SD1 / SDS;

  // Eqn 12.8-5: Minimum Cs value
  const Cs_min = Math.max(0.044 * SDS * Ie, 0.01);

  // Eqns 12.8-3 and 12.8-4: Maximum Cs based on period
  const Cs_max =
    T <= TL
      ? SD1 / (T * (R / Ie))              // Eqn 12.8-3
      : (SD1 * TL) / (T * T * (R / Ie));  // Eqn 12.8-4

  // Initial Cs calculation based on site conditions
  let Cs_initial;

  // Exception per 12.8.1.1 when S1 ≥ 0.6 and Site Class E or F
  const isException2 = siteClass === 'D' && S1 >= 0.2 && T <= 1.5 * Ts; // Exception 2
  const isException3 = siteClass === 'E' && S1 >= 0.2 && T <= Ts;  // Exception 3

  // Exception 2: Use Eqn 12.8-2 then scale by 1.5
  if (isException2) {
    const Cs_12_8_2 = SDS / (R / Ie);
    const Cs_scaled =
      T <= TL
        ? 1.5 * (SD1 / (T * (R / Ie))) // 12.8-3
        : 1.5 * ((SD1 * TL) / (T * T * (R / Ie))); // 12.8-4
    Cs_initial = Math.max(Cs_min, Math.min(Cs_12_8_2, Cs_scaled));
  }

  // Exception 3: Use Equivalent Lateral Force Procedure with standard equations
  else if (isException3) {
    Cs_initial = SDS / (R / Ie); // Eqn 12.8-2
  }

  // Exception from §12.8.1.1: S1 ≥ 0.6 and site class E or F
  else if ((siteClass === 'E' || siteClass === 'F') && S1 >= 0.6) {
    Cs_initial = (0.5 * S1) / (R / Ie);
  }

  // Standard calculation
  else if (T < Ts) {
    Cs_initial = SDS / (R / Ie); // Eqn 12.8-2
  } else if (T < TL) {
    Cs_initial = SD1 / (T * (R / Ie)); // Eqn 12.8-3
  } else {
    Cs_initial = (SD1 * TL) / (T * T * (R / Ie)); // Eqn 12.8-4
  }
  // Final Cs value clamped between Cs_min and Cs_max
  const Cs_final = Math.max(Cs_min, Math.min(Cs_initial, Cs_max));

  return {
    Cs_min,
    Cs_max,
    Cs_initial,
    Cs_final
  };
};

export default calculateCs;
