import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const SolutionFvx = ({ inputs, result }) => {
  const { Cvx, V } = inputs;

  // Safely parse Cvx input
  let parsedCvx = [];
  try {
    parsedCvx = JSON.parse(Cvx) || [];
  } catch (error) {
    console.error("Error parsing Cvx input:", error);
  }

  const equation = `F_{vx} = C_{vx} V`;
  const filledEquation = result.map((fvx, index) => `F_{vx,${index + 1}} = ${parsedCvx[index]} \\cdot ${V} = ${fvx}`);
  const solution = `Fvx = ${result}`;

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

export default SolutionFvx;




