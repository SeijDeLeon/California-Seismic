import React from 'react';
import MathJax from 'react-mathjax2';

const SolutionCvx = ({ inputs, result }) => {
  const { weights, heights } = inputs;
  const parsedWeights = JSON.parse(weights);
  const parsedHeights = JSON.parse(heights);
  const totalWeightHeight = parsedWeights.reduce((sum, weight, index) => sum + weight * parsedHeights[index], 0);
  const equation = `C_{vx} = \\frac{w_{i} h_{i}}{\\sum w_{i} h_{i}}`;
  const filledEquation = result.map((cvx, index) => `C_{vx,${index + 1}} = \\frac{${parsedWeights[index]} \\cdot ${parsedHeights[index]}}{${totalWeightHeight}} = ${cvx}`);
  const solution = `Cvx = ${result}`;
  
  return (
    <MathJax.Context input="tex">
      <div>
        <MathJax.Node>{equation}</MathJax.Node>
        {filledEquation.map((filledEquation, index) => (
          <MathJax.Node key={index}>{filledEquation}</MathJax.Node>
        ))}
        <MathJax.Node>{solution}</MathJax.Node>
      </div>
    </MathJax.Context>
  );
};

export default SolutionCvx;



