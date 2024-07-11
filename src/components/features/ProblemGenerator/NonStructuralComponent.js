import fundamentalPeriodImage from "./fundmentalPeriod.png";
import { MathJax } from "better-react-mathjax";
import calculateFp from '../../../assets/data/calculations/calculateFp';
import calculateFpmax from '../../../assets/data/calculations/calculateFpmax';
import calculateFpmin from '../../../assets/data/calculations/calculateFpmin';
import calculateFpOriginal from '../../../assets/data/calculations/calculateFpOriginal';
import NonStructuralComponentSolution from './NonStructuralComponentSolution';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.map((choice) => parseFloat(choice.toFixed(2)));
};
const randomValGen = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const equipmentOptions = [
"Interior partial height partition wall",
"Ductwork with high deformability and welded joints",
"Cabinet",
"Air handling unit"
];
const equipmentValues = {
"Interior partial height partition wall": { ap: 1.0, Rp: 2.5, attachmentPoint: "ground", table: "13.5-1", tableName: "All other walls and partitions" },
"Ductwork with high deformability and welded joints": { ap: 2.5, Rp: 9.0, attachmentPoint: "second floor", table: "13.6-1", tableName: "Ductwork, including in-line components, constructed of high-deformability materials, with joints made by welding or brazing" },
"Cabinet": { ap: 1.0, Rp: 2.5, attachmentPoint: "second floor", table: "13.5-1", tableName: "Cabinets" },
"Air handling unit": { ap: 2.5, Rp: 6.0, attachmentPoint: "roof", table: "13.6-1", tableName: "Airside HV ACR, fans, air handlers, air conditioning units, cabinet heaters, air distribution boxes, and other mechanical components constructed of sheet metal framing" }
};
const heightOptions = [
    16,
    18,
    20,
    24
];

export const nonStructuralComponent = () => {
  const SDS = randomValGen(0.8, 1.8);
  const Wp = randomValGen(20, 40);
  const randomEquipmentIndex = Math.floor(Math.random() * equipmentOptions.length);
  const equipment = equipmentOptions[randomEquipmentIndex];
  const { ap, Rp, attachmentPoint, table, tableName } = equipmentValues[equipment];
  const randomHeightIndex = Math.floor(Math.random() * heightOptions.length);
  const h = heightOptions[randomHeightIndex];
  let z = h;
  if (attachmentPoint === "ground") {
      z = 0;
  }
  else if (attachmentPoint === "second floor") {
      z = h / 2;
  }
  const Ip = 1;
  let questionText = `Given the ${equipment} attached to the ${attachmentPoint} of an
          office building with a component weight of \\(${Wp}\\ lb\\), determine
          the component force \\(F\\ _{p}\\). The building is
          \\(${h}\\ ft\\) tall, and the ${attachmentPoint} is at
          \\(${z}\\ ft\\) from the ground level. \\(S_{DS}\\ =\\ ${SDS}\\)`;
  let question = <MathJax>{questionText}</MathJax>
  let image = fundamentalPeriodImage;
  let answer = calculateFp(ap, SDS, Wp, Rp, Ip, z, h);
  let max = calculateFpmax(SDS, Wp, Ip);
  let min = calculateFpmin(SDS, Wp, Ip);
  let original = calculateFpOriginal(ap, SDS, Wp, Rp, Ip, z, h);
  let choices = shuffleArray([
    answer,
    answer - randomValGen(1, 2),
    answer + randomValGen(1, 2),
    answer + randomValGen(3, 6),
  ]);
  let solution = (
    <NonStructuralComponentSolution
      equipment={equipment}
      table={table}
      tableName={tableName}
      ap={ap}
      SDS={SDS}
      Wp={Wp}
      Rp={Rp}
      Ip={Ip}
      z={z}
      h={h}
      answer={answer}
      max={max}
      min={min}
      original={original}
    />
  );

  return {
    question: question,
    image: image,
    choices: choices,
    answer: answer,
    solution: solution,
  };
};
