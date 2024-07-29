import nonStructuralComponentImage from "./nonStructuralComponent.png";
import { MathJax } from "better-react-mathjax";
import calculateFpOriginal from '../../../assets/data/calculations/calculateFpOriginal';
import calculateFpmax from '../../../assets/data/calculations/calculateFpmax';
import calculateFpmin from '../../../assets/data/calculations/calculateFpmin';
import calculateFp from '../../../assets/data/calculations/calculateFp';
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

const randomValGenSmall = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(1));

const randomValGenSmaller = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

const equipment = {
  "interior partial height partition wall": { ap: 1.0, Rp: 2.5, attachmentPoint: "ground", table: "13.5-1", tableName: "All other walls and partitions" },
  "ductwork with high deformability and welded joints": { ap: 2.5, Rp: 9.0, attachmentPoint: "second floor", table: "13.6-1", tableName: "Ductwork, including in-line components, constructed of high-deformability materials, with joints made by welding or brazing" },
  "cabinet": { ap: 1.0, Rp: 2.5, attachmentPoint: "second floor", table: "13.5-1", tableName: "Cabinets" },
  "air handling unit": { ap: 2.5, Rp: 6.0, attachmentPoint: "roof", table: "13.6-1", tableName: "Airside HV ACR, fans, air handlers, air conditioning units, cabinet heaters, air distribution boxes, and other mechanical components constructed of sheet metal framing" }
  };
const heightOptions = [
    16,
    18,
    20,
    24
]; // ft

function getRandomFromKeyValueList(list) {
  if (!list || typeof list !== 'object') {
      console.error("Invalid list:", list);
      return null;
  }
  const keys = Object.keys(list);
  if (keys.length === 0) {
      console.error("List is empty:", list);
      return null;
  }
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  return { key: randomKey, value: list[randomKey] };
}

export const nonStructuralComponent = () => {
  const SDS = randomValGenSmall(0.8, 1.8);
  const Wp = randomValGen(20, 40); // lb

  const selectedEquipment = getRandomFromKeyValueList(equipment);
  const { key: equipmentName, value: equipmentDetails } = selectedEquipment;
  const { ap, Rp, attachmentPoint, table, tableName } = equipmentDetails;
  const randomHeightIndex = Math.floor(Math.random() * heightOptions.length);
  const h = heightOptions[randomHeightIndex]; // ft
  let z = 1;
  if (attachmentPoint === "ground") {
      z = 0;
  }
  else if (attachmentPoint === "second floor") {
      z = h / 2;
  } else if (attachmentPoint === "roof") {
    z = h;
  }
  const Ip = 1.0;
  let questionText = `Given the ${equipmentName} attached to the ${attachmentPoint} of an
          office building with a component weight of \\(${Wp}\\ lb\\), determine
          the component force \\(F_{p}\\). The building is
          \\(${h}\\ ft\\) tall, and the ${attachmentPoint} is at
          \\(${z}\\ ft\\) from the ground level. \\(S_{DS}\\ =\\ ${SDS}.\\)`;
  let question = <MathJax>{questionText}</MathJax>
  let image = nonStructuralComponentImage;
  let Fp_original = parseFloat(calculateFpOriginal(ap, SDS, Wp, Rp, Ip, z, h).toFixed(2));
  let Fp_max = parseFloat(calculateFpmax(SDS, Wp, Ip).toFixed(2));
  let Fp_min = parseFloat(calculateFpmin(SDS, Wp, Ip).toFixed(2));
  let answer = parseFloat(calculateFp(Fp_original, Fp_max, Fp_min).toFixed(2));
  let choices;
  if (answer === Fp_original) {
    choices = shuffleArray([
      answer,
      Fp_max,
      Fp_min,
      answer + randomValGenSmaller(0, 1),
    ]);
  }
  else if (answer === Fp_max) {
    choices = shuffleArray([
      answer,
      Fp_original,
      Fp_min,
      answer + randomValGenSmaller(0, 1),
    ]);
  }
  else if (answer === Fp_min) {
    choices = shuffleArray([
      answer,
      Fp_original,
      Fp_max,
      answer - randomValGenSmaller(0, 1),
    ]);
  }
  else {
    choices = shuffleArray([
      answer,
      answer - randomValGen(1, 2),
      answer + randomValGen(1, 2),
      answer + randomValGen(3, 6),
    ]);
  }
  let solution = (
    <NonStructuralComponentSolution
      equipmentName={equipmentName}
      table={table}
      tableName={tableName}
      ap={ap}
      SDS={SDS}
      Wp={Wp}
      Rp={Rp}
      Ip={Ip}
      z={z}
      h={h}
      Fp_original={Fp_original}
      Fp_max={Fp_max}
      Fp_min={Fp_min}
      answer={answer}
    />
  );

  return {
    question: question,
    image: image,
    choices: choices,
    answer: answer,
    solution: solution,
    label: "lb",
  };
};
