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
  (Math.random() * (max - min) + min).toFixed(1);

const equipment = {
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
]; // ft

export const nonStructuralComponent = () => {
  const SDS = randomValGenSmall(0.8, 1.8);
  const Wp = randomValGen(20, 40); // lb

  function getRandomEquipment(equipment) {
    if (!equipment || typeof equipment !== 'object') {
      console.error("Invalid equipment list:", equipment);
      return null;
    }
  
    const keys = Object.keys(equipment);
    if (keys.length === 0) {
      console.error("Equipment list is empty:", equipment);
      return null;
    }
  
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    return { key: randomKey, value: equipment[randomKey] };
  }

  const selectedEquipment = getRandomEquipment(equipment);
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
  let Fp_original = calculateFpOriginal(ap, SDS, Wp, Rp, Ip, z, h);
  let Fp_max = calculateFpmax(SDS, Wp, Ip);
  let Fp_min = calculateFpmin(SDS, Wp, Ip);
  let answer = calculateFp(Fp_original, Fp_max, Fp_min);
  //we will want to customize the fake choices later. probably they should be Fpmax , Fpmin, and something else.
  let choices = shuffleArray([
    answer,
    answer - randomValGen(1, 2),
    answer + randomValGen(1, 2),
    answer + randomValGen(3, 6),
  ]);
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
