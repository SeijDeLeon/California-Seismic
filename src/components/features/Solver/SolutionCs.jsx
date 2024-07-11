import React from 'react';
import MathJax from 'react-mathjax2';

const SolutionCs = ({ inputs, result }) => {
  const { SDS, SD1, T, Ie, R, T0, TL } = inputs;
  const equation = `Cs = \\frac{S_{DS} I_e}{R} \\left(\\frac{T_{0}}{T}\\right) \\left(1 + \\frac{S_{D1} T}{T_{L}}\\right)`;
  const filledEquation = `Cs = \\frac{${SDS} \\cdot ${Ie}}{${R}} \\left(\\frac{${T0}}{${T}}\\right) \\left(1 + \\frac{${SD1} \\cdot ${T}}{${TL}}\\right)`;
  const solution = `Cs = ${result}`;

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

export default SolutionCs;




