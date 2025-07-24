import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

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
    <MathJaxContext>
      <div>
        <p>
          The vertical distribution factor, C<sub>vx</sub>, is calculated using Equation 12.8-12 from ASCE 7:
        </p>
        <ul>
          <li>
            <a href="/ASCE7/12.8.3" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              <MathJax>{`\\(C_{vx} = \\frac{w_{i} h_{i}}{\\sum w_{i} h_{i}}\\)`}</MathJax>
              &nbsp;(Equation 12.8-12)
            </a>
          </li>
        </ul>
        <p>
          Substituting the provided values into the equation for each level:
        </p>
        {filledEquation.map((filledEq, index) => (
          <MathJax key={index}>{`\\(${filledEq}\\)`}</MathJax>
        ))}
        <p>
          After performing the calculations, the vertical distribution factor is found to be:
        </p>
        <MathJax>{`\\(${solution}\\)`}</MathJax>
      </div>
    </MathJaxContext>
  );
};

export default SolutionCvx;