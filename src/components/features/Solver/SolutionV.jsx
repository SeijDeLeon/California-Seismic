import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const SolutionV = ({ inputs, result }) => {
  const { weights, Cs } = inputs;
  const parsedWeights = JSON.parse(weights);
  const totalWeight = parsedWeights.reduce((sum, weight) => sum + weight, 0);
  const equation = `V = C_s W`;
  const filledEquation = `V = ${Cs} \\cdot ${totalWeight}`;
  const solution = `V = ${result}`;
  
  return (
    <MathJaxContext>
      <div>
        <MathJax>{`\\(${equation}\\)`}</MathJax>
        <MathJax>{`\\(${filledEquation}\\)`}</MathJax>
        <MathJax>{`\\(${solution}\\)`}</MathJax>
      </div>
    </MathJaxContext>
  );
};

export default SolutionV;





