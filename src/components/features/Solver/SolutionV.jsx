import React from 'react';
import MathJax from 'react-mathjax2';

const SolutionV = ({ inputs, result }) => {
  const { weights, Cs } = inputs;
  const parsedWeights = JSON.parse(weights);
  const totalWeight = parsedWeights.reduce((sum, weight) => sum + weight, 0);
  const equation = `V = C_s W`;
  const filledEquation = `V = ${Cs} \\cdot ${totalWeight}`;
  const solution = `V = ${result}`;
  
  return (
    <MathJax.Context input="tex">
      <div>
        <MathJax.Node>{equation}</MathJax.Node>
        <MathJax.Node>{filledEquation}</MathJax.Node>
        <MathJax.Node>{solution}</MathJax.Node>
      </div>
    </MathJax.Context>
  );
};

export default SolutionV;




