import { MathJax } from 'better-react-mathjax';

const SolutionV = ({ inputs, result }) => {
  const { weights, Cs } = inputs;

  let parsedWeights = [];
  try {
    parsedWeights = JSON.parse(weights);
    if (!Array.isArray(parsedWeights)) {
      parsedWeights = [];
    }
  } catch (error) {
    console.error("Error parsing weights input:", error);
  }

  const totalWeight = parsedWeights.reduce((sum, weight) => sum + parseFloat(weight) || 0, 0);
  const filledEquation = `V = ${Cs} \\cdot ${totalWeight}`;
  const solution = `V = ${result}`;

  return (
    <>
      <p className='mb-2'>The total design base shear, V, is calculated using Equation 12.8-1 from ASCE 7:</p>
      <a href="/ASCE7/12.8.1" target="_blank" rel="noopener noreferrer">
        <MathJax className='bg-slate-200 p-1 pr-5 rounded'>
          {`\\[V = C_s W \\tag{12.8-1} \\]`}
        </MathJax>
      </a>

      <p className='mt-6'>Substituting the provided values into the equation:</p>
      <MathJax>{`\\(${filledEquation}\\)`}</MathJax>

      <p className='mt-6'>After performing the calculations, the total design base shear is found to be:</p>
      <MathJax>{`\\(${solution}\\)`}</MathJax>
    </>
  );
};

export default SolutionV;