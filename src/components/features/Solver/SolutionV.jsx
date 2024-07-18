import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const SolutionV = ({ inputs, result }) => {
  const { weights, Cs } = inputs;

  // Safely parse weights input
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






