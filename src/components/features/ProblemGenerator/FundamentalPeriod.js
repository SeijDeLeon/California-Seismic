import fundamentalPeriodImage from "./fundmentalPeriod.png";
import { MathJax } from "better-react-mathjax";
import FundamentalPeriodSolution from './FundamentalPeriodSolution';
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.map((choice) => parseFloat(choice.toFixed(2)));
};
const randomValGen = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
export const fundamentalPeriod = () => {
  let height = randomValGen(8, 30); //ft
  let E = randomValGen(10000000, 29000000); //lb/in^2
  let inertia = randomValGen(30000, 600000); //in^4
  let kips = randomValGen(5, 100); //kips
  let pounds = kips * 1000; //lb
  let G = 386.09; //in/s^2
  let questionText = `Determine the fundamental period of the below SDOF structure. The
          height is \\(${height}\\ ft\\), the modulus of elasticity for the column is
          \\(${E}\\ ksi\\), the moment of inertia is \\(${inertia}\\ in^{4}\\), and the
          mass at the top weighs \\(${kips}\\ kips\\)?`;
  let question = <MathJax>{questionText}</MathJax>
  let image = fundamentalPeriodImage;
  let stiffness = parseFloat(
    (
      ((3 * E * inertia) / Math.pow(height * 12, 3))
    ).toFixed(2)
  );
  let answer = parseFloat(
    (
      2 *
      Math.PI *
      Math.sqrt((pounds) / (stiffness * G))
    ).toFixed(2)
  );
  let choices = shuffleArray([
    answer,
    answer + randomValGen(1, 2),
    answer + randomValGen(3, 6),
    answer + randomValGen(7, 9),
  ]);
  let solution = (
    <FundamentalPeriodSolution
      height={height}
      kips={kips}
      E={E}
      inertia={inertia}
      G={G}
      stiffness={stiffness}
      pounds={pounds}
      answer={answer}
    />
  );

  return {
    question: question,
    image: image,
    choices: choices,
    answer: answer,
    solution: solution,
    label: "s",
  };
};
