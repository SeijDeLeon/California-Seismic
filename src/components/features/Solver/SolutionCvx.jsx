import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const SolutionCvx = ({ inputs, result }) => {
  const { weights, heights } = inputs;
  const parsedWeights = JSON.parse(weights);
  const parsedHeights = JSON.parse(heights);
  const totalWeightHeight = parsedWeights.reduce((sum, weight, index) => sum + weight * parsedHeights[index], 0);
  const equation = `C_{vx} = \\frac{w_{i} h_{i}}{\\sum w_{i} h_{i}}`;
  const filledEquation = result.map((cvx, index) => `C_{vx,${index + 1}} = \\frac{${parsedWeights[index]} \\cdot ${parsedHeights[index]}}{${totalWeightHeight}} = ${cvx}`);
  const solution = `Cvx = ${result}`;
  
  return (
    <MathJaxContext>
      <div>
        <MathJax>{`\\(${equation}\\)`}</MathJax>
        {filledEquation.map((filledEquation, index) => (
          <MathJax key={index}>{`\\(${filledEquation}\\)`}</MathJax>
        ))}
        <MathJax>{`\\(${solution}\\)`}</MathJax>
      </div>
    </MathJaxContext>
  );
};

export default SolutionCvx;




