import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

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
    <MathJaxContext>
      <div>
        <p>
          The story shear, F<sub>vx</sub>, is calculated using Equation 12.8-13 from ASCE 7:
        </p>
        <ul>
          <li>
            <a href="/ASCE7/12.8.4" className="text-blue-500 underline">
              <MathJax>{`\\(F_{vx} = C_{vx} V\\)`}</MathJax>
              &nbsp;(Equation 12.8-13)
            </a>
          </li>
        </ul>
        <p>
          Substituting the provided values into the equation for each story:
        </p>
        {filledEquation.map((filledEquation, index) => (
          <MathJax key={index}>{`\\(${filledEquation}\\)`}</MathJax>
        ))}
        <p>
          After performing the calculations, the story shear is found to be:
        </p>
        <MathJax>{`\\(${solution}\\)`}</MathJax>
      </div>
    </MathJaxContext>
  );
};

export default SolutionFvx;