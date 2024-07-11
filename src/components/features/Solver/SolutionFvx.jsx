import React from 'react';
import MathJax from 'react-mathjax2';

const SolutionFvx = ({ inputs, result }) => {
  const { Cvx, V } = inputs;
  const parsedCvx = JSON.parse(Cvx);
  const equation = `F_{vx} = C_{vx} V`;
  const filledEquation = result.map((fvx, index) => `F_{vx,${index + 1}} = ${parsedCvx[index]} \\cdot ${V} = ${fvx}`);
  const solution = `Fvx = ${result}`;

  return (
    <MathJax.Context input="tex">
      <div>
        <MathJax.Node>{equation}</MathJax.Node>
        {filledEquation.map((filledEquation, index) => (
          <MathJax.Node key={index}>{filledEquation}</MathJax.Node>
        ))}
        <MathJax.Node>{equation}</MathJax.Node>
        <MathJax.Node>{solution}</MathJax.Node>
      </div>
    </MathJax.Context>
  );
};

export default SolutionFvx;




