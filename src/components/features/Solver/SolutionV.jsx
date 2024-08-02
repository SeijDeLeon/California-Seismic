import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

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
    <MathJaxContext>
      <div>
        <p>
          The total design base shear, V, is calculated using Equation 12.8-1 from ASCE 7:
        </p>
        <ul>
          <li>
            <a href="/ASCE7/12.8.1" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              <MathJax>{`\\(V = C_s W\\)`}</MathJax>
              &nbsp;(Equation 12.8-1)
            </a>
          </li>
        </ul>
        <p>
          Substituting the provided values into the equation:
        </p>
        <MathJax>{`\\(${filledEquation}\\)`}</MathJax>
        <p>
          After performing the calculations, the total design base shear is found to be:
        </p>
        <MathJax>{`\\(${solution}\\)`}</MathJax>
      </div>
    </MathJaxContext>
  );
};

export default SolutionV;






