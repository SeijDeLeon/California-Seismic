import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const SolutionCs = ({ inputs, result }) => {
  const { SDS, SD1, T, Ie, R, T0, TL } = inputs;
  const equation = `Cs = \\frac{S_{DS} I_e}{R} \\left(\\frac{T_{0}}{T}\\right) \\left(1 + \\frac{S_{D1} T}{T_{L}}\\right)`;
  const filledEquation = `Cs = \\frac{${SDS} \\cdot ${Ie}}{${R}} \\left(\\frac{${T0}}{${T}}\\right) \\left(1 + \\frac{${SD1} \\cdot ${T}}{${TL}}\\right)`;
  const solution = `Cs = ${result}`;

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

export default SolutionCs;




