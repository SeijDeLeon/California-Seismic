import fundamentalPeriodImage from "./fundmentalPeriod.png";
import { MathJax } from "better-react-mathjax";
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
  //let ksi = randomValGen(1, 29000); //ksi = 1000 lb/in^2
  let E = randomValGen(10000000, 29000000); //lb/in^2
  let inertia = randomValGen(30000, 600000);
  let kips = randomValGen(5, 100);
  let pounds = kips * 1000;
  let G = 386.09; //in/s^2
  let questionText = `Determine the fundamental period of the below SDOF structure. The
          height is \\(${height}\\ ft\\), the modulus of elasticity for the column is
          \\(${E}\\ ksi\\), the moment of inertia is \\(${inertia}\\ in^{4}\\), and the mass at the top
          weighs \\(${kips}\\ kips\\)?`;
  let question = <MathJax>{questionText}</MathJax>
  let image = fundamentalPeriodImage;
  let stiffness = parseFloat(
    (
      ((3 * E * inertia) / Math.pow(height * 12, 3))
    ).toFixed(2)
  );
  /*
  let answer = parseFloat(
    (
      2 *
      Math.PI *
      Math.sqrt((kips * Math.pow(height, 3)) / (E * 386.09))
    ).toFixed(2)
  );
  */
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
  
  let paragraph = `This is a cantilevered column SDOF structure, so we can first
  determine the stiffness of the SDOF and then plug the stiffness into
  the period equation for an SDOF system. Determine stiffness: k =
  3(EI)/h3`;

  let firstLine = `Provided Inputs: \\(h = ${height}\\ ft, W = ${kips}\\ kips, E = ${E}\\ ksi, I = ${inertia}\\ in^{4}\\)`;
  let secondLine = "Constants: \\(G = 386.09\\ in/s^{2}\\)";
  let thirdLine = "Step 1: Determine the stiffness of the system (cantilevered column)";
  let fourthLine = `\\(k = \\frac{3(EI)}{h^{3}} = \\frac{3(${E}\\ ksi)(${inertia}\\ in^{4})}{(${height}\\ ft \\ \\times \\ 12\\ in/ft)^{3}} = ${stiffness}\\ lb/in\\)`;
  let fifthLine = "Step 2: Determine the fundamental period";
  let sixthLine = `\\(T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{W}{Gk}} = 2\\pi\\sqrt{\\frac{${pounds}\\ lb}{(386.09\\ in/s^{2})(${stiffness}\\ lb/in)}} = ${answer}\\ s\\)`;
  let solution = <MathJax>{fourthLine} {sixthLine}</MathJax>;

  /*
  solution is expected to be a string, so this does not work:
  let solution = (
    `<div>
      <MathJax.Node>${firstLine}</MathJax.Node>
      <MathJax.Node>${secondLine}</MathJax.Node>
      <MathJax.Node>${thirdLine}</MathJax.Node>
      <MathJax.Node>${fourthLine}</MathJax.Node>
      <MathJax.Node>${fifthLine}</MathJax.Node>
      <MathJax.Node>${sixthLine}</MathJax.Node>
    </div>`
  );
  */

  return {
    question: question,
    image: image,
    choices: choices,
    answer: answer,
    solution: solution,
  };
};
