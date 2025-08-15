import { MathJax } from 'better-react-mathjax';

const SolutionCs = ({ inputs, result }) => {
  const { SDS, SD1, T, Ie, R, T0, TL } = inputs;

  let filledEquation = `C_s = \\frac{${SDS} \\cdot ${Ie}}{${R}}`;
  let explanation = 'Found using Equation 12.8-2:';
  let usedEquation = '12.8-2';
  let Cs = SDS / (R / Ie);

  if (Cs < SD1 / (T * (R / Ie))) {
    Cs = SD1 / (T * (R / Ie));
    filledEquation = `C_s = \\frac{${SD1}}{${T} \\cdot \\frac{${R}}{${Ie}}}`;
    explanation = "Found using Equation 12.8-3 as it gives a lower value:";
    usedEquation = "12.8-3";
  } else {
    if (T <= TL) {
      const Cs_max = 0.044 * SDS * Ie;
      if (Cs > Cs_max) {
        Cs = Cs_max;
        filledEquation = `C_s = 0.044 \\cdot ${SDS} \\cdot ${Ie}`;
        explanation = "Found using Equation 12.8-4 for T <= TL:";
        usedEquation = "12.8-4";
      }
    } else {
      const Cs_max_TL = (0.044 * SDS * TL) / T;
      if (Cs > Cs_max_TL) {
        Cs = Cs_max_TL;
        filledEquation = `C_s = \\frac{0.044 \\cdot ${SDS} \\cdot ${TL}}{${T}}`;
        explanation = "Found using Equation 12.8-4 for T > TL:";
        usedEquation = "12.8-4-TL";
      }
    }

    const Cs_exception = 0.5 * SDS * Ie / R;
    if (T >= T0 && T <= TL) {
      if (Cs > Cs_exception) {
        Cs = Cs_exception;
        filledEquation = `C_s = 0.5 \\cdot \\frac{${SDS} \\cdot ${Ie}}{${R}}`;
        explanation = "Found using Equation 12.8-5 for T0 <= T <= TL:";
        usedEquation = "12.8-5";
      }
    }

    const Cs_near_fault = 0.044 * SDS * Ie;
    if (T <= TL) {
      if (Cs < Cs_near_fault) {
        Cs = Cs_near_fault;
        filledEquation = `C_s = 0.044 \\cdot ${SDS} \\cdot ${Ie}`;
        explanation = "Found using Equation 12.8-6 for near-fault conditions:";
        usedEquation = "12.8-6";
      }
    }
  }

  const solution = `C_s = ${result}`;

  return (
    <>
      <h2>Calculation of Seismic Response Coefficient (C<sub>s</sub>)</h2>
      <p className="mb-2">{explanation}</p>
      {usedEquation === "12.8-2" && (
        <a href="/ASCE7/12.8.1" target="_blank" rel="noopener noreferrer">
          <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
            {`\\[C_s = \\frac{S_{DS} I_e}{R} \\tag{12.8-2} \\]`}
          </MathJax>
        </a>
      )}
      {usedEquation === "12.8-3" && (
        <a href="/ASCE7/12.8.1" target="_blank" rel="noopener noreferrer">
          <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
            {`\\[C_s = \\frac{S_{D1}}{T \\cdot \\frac{R}{I_e}} \\tag{12.8-3} \\]`}
          </MathJax>
        </a>
      )}
      {usedEquation === "12.8-4" && (
        <a href="/ASCE7/12.8.1" target="_blank" rel="noopener noreferrer">
          <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
            {`\\[C_s = 0.044 S_{DS} I_e \\tag{12.8-4} \\]`}
          </MathJax>
        </a>
      )}
      {usedEquation === "12.8-4-TL" && (
        <a href="/ASCE7/12.8.1" target="_blank" rel="noopener noreferrer">
          <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
            {`\\[C_s = \\frac{0.044 S_{DS} T_L}{T} \\tag{12.8-4} \\]`}
          </MathJax>
        </a>
      )}
      {usedEquation === "12.8-5" && (
        <a href="/ASCE7/12.8.1" target="_blank" rel="noopener noreferrer">
          <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
            {`\\[C_s = 0.5 \\cdot \\frac{S_{DS} I_e}{R} \\tag{12.8-5} \\]`}
          </MathJax>
        </a>
      )}
      {usedEquation === "12.8-6" && (
        <a href="/ASCE7/12.8.1" target="_blank" rel="noopener noreferrer">
          <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
            {`\\[C_s = 0.044 S_{DS} I_e \\tag{12.8-6} \\]`}
          </MathJax>
        </a>
      )}

      <p className='mt-6'>Substituting the provided values into the equation:</p>
      <MathJax>{`\\(${filledEquation}\\)`}</MathJax>

      <p className='mt-6'>After performing the calculations, the seismic response coefficient is found to be:</p>
      <MathJax>{`\\(${solution}\\)`}</MathJax>
    </>
  );
};

export default SolutionCs;