import { MathJax } from 'better-react-mathjax';

const SolutionCvx = ({ inputs, result }) => {
  const { weights, heights } = inputs;

  let parsedWeights = [];
  let parsedHeights = [];
  try {
    parsedWeights = JSON.parse(weights) || [];
    parsedHeights = JSON.parse(heights) || [];
  } catch (error) {
    console.error("Error parsing weights or heights input:", error);
  }

  const totalWeightHeight = parsedWeights.reduce((sum, weight, index) => sum + weight * parsedHeights[index], 0);
  const filledEquation = result.map((cvx, index) => `C_{vx,${index + 1}} = \\frac{${parsedWeights[index]} \\cdot ${parsedHeights[index]}}{${totalWeightHeight}} = ${cvx}`);
  const solution = `C_{vx} = ${result}`;

  return (
    <>
      <p className="mb-2">The vertical distribution factor, C<sub>vx</sub>, is calculated using Equation 12.8-12 from ASCE 7:</p>
      <a href="/ASCE7/12.8.3" target="_blank" rel="noopener noreferrer">
        <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
          {`\\[C_{vx} = \\frac{w_{i} h_{i}}{\\sum w_{i} h_{i}} \\tag{12.8-12} \\]`}
        </MathJax>
      </a>

      <p className='mt-6'>Substituting the provided values into the equation for each level:</p>
      {filledEquation.map((filledEq, index) => (
        <MathJax key={index}>{`\\(${filledEq}\\)`}</MathJax>
      ))}

      <p className='mt-6'>After performing the calculations, the vertical distribution factor is found to be:</p>
      <MathJax>{`\\(${solution}\\)`}</MathJax>
    </>
  );
};

export default SolutionCvx;