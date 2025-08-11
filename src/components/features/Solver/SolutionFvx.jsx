import { MathJax } from 'better-react-mathjax';

const SolutionFvx = ({ inputs, result }) => {
  const { Cvx, V } = inputs;

  let parsedCvx = [];
  try {
    parsedCvx = JSON.parse(Cvx) || [];
  } catch (error) {
    console.error("Error parsing Cvx input:", error);
  }

  const filledEquation = result.map((fvx, index) => `F_{vx,${index + 1}} = ${parsedCvx[index]} \\cdot ${V} = ${fvx}`);
  const solution = `F_{vx} = ${result}`;

  return (
    <>
      <p className="mb-2">The story shear, F<sub>vx</sub>, is calculated using Equation 12.8-13 from ASCE 7:</p>
      <a href="/ASCE7/12.8.4" target="_blank" rel="noopener noreferrer">
        <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
          {`\\[F_{vx} = C_{vx} V \\tag{12.8-13} \\]`}
        </MathJax>
      </a>

      <p className="mt-6">Substituting the provided values into the equation for each story:</p>
      {filledEquation.map((filledEquation, index) => (
        <MathJax key={index}>{`\\(${filledEquation}\\)`}</MathJax>
      ))}

      <p className="mt-6">After performing the calculations, the story shear is found to be:</p>
      <MathJax>{`\\(${solution}\\)`}</MathJax>
    </>
  );
};

export default SolutionFvx;