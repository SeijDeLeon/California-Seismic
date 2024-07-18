import fundamentalPeriodImage from "./fundmentalPeriod.png";
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

//rather than having an array of equipment types and an object of equipment types, I would just have a single object of equipment type.
//the 'dry' principle says 'do not repeat yourself' and in this case we have repeated sthe name of the equipment.
//However it is difficult to randomize objects since we need to know their key value first... instead we can use Object.keys(equipmentValues) which returns an array of the keys... this would actually return what you have as equipmentOptions.
/* const equipmentOptions = [
"Interior partial height partition wall",
"Ductwork with high deformability and welded joints",
"Cabinet",
"Air handling unit"
]; */

//Just rename this to equipment
/* const equipmentValues = {
"Interior partial height partition wall": { ap: 1.0, Rp: 2.5, attachmentPoint: "ground", table: "13.5-1", tableName: "All other walls and partitions" },
"Ductwork with high deformability and welded joints": { ap: 2.5, Rp: 9.0, attachmentPoint: "second floor", table: "13.6-1", tableName: "Ductwork, including in-line components, constructed of high-deformability materials, with joints made by welding or brazing" },
"Cabinet": { ap: 1.0, Rp: 2.5, attachmentPoint: "second floor", table: "13.5-1", tableName: "Cabinets" },
"Air handling unit": { ap: 2.5, Rp: 6.0, attachmentPoint: "roof", table: "13.6-1", tableName: "Airside HV ACR, fans, air handlers, air conditioning units, cabinet heaters, air distribution boxes, and other mechanical components constructed of sheet metal framing" }
}; */

//here i renamed it to equipment. I prefer making the top level object name be as simple as possible and ensuring it is plural. it's also faster to type when we inevitably reference the keys in the nested object
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
]; //add the units here (ft)

export const nonStructuralComponent = () => {
  const SDS = randomValGen(0.8, 1.8);
  const Wp = randomValGen(20, 40); //add units (lb)


  //add a function that gets a random equipment
  function getRandomEquipment(equipment) {
    const keys = Object.keys(equipment); //returns an array of the equipment names
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    return equipment[randomKey];
  }

  //const randomEquipmentIndexOld = Math.floor(Math.random() * equipmentOptions.length);


  //const equipment = equipmentOptions[randomEquipmentIndex]; //I renamed this because equipment is plural, and we selected a single one.
  const selectedEquipment = getRandomEquipment(); //this variable name is a bit more singular, we want to be easy to read that this is a single selected Equipment.
  const { ap, Rp, attachmentPoint, table, tableName } = selectedEquipment;
  const randomHeightIndex = Math.floor(Math.random() * heightOptions.length);
  const h = heightOptions[randomHeightIndex]; //add units (ft)
  let z = h;
  if (attachmentPoint === "ground") {
      z = 0;
  }
  else if (attachmentPoint === "second floor") {
      z = h / 2;
  } else if (attachmentPoint === "roof") {
    z = h; //Added this additional else if statement to cover roof condition
  }
  const Ip = 1;
  let questionText = `Given the ${equipment} attached to the ${attachmentPoint} of an
          office building with a component weight of \\(${Wp}\\ lb\\), determine
          the component force \\(F\\ _{p}\\). The building is
          \\(${h}\\ ft\\) tall, and the ${attachmentPoint} is at
          \\(${z}\\ ft\\) from the ground level. \\(S_{DS}\\ =\\ ${SDS}\\)`;
  let question = <MathJax>{questionText}</MathJax>
  let image = fundamentalPeriodImage;
/*   let original = calculateFpOriginal(ap, SDS, Wp, Rp, Ip, z, h);
  let max = calculateFpmax(SDS, Wp, Ip);
  let min = calculateFpmin(SDS, Wp, Ip); */
  //renamed these variables to be more specific
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
  };
};
