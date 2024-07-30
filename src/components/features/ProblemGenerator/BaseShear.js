import baseShearImage from "./nonStructuralComponent.png";
import { MathJax } from "better-react-mathjax";
import BaseShearQuestion from './BaseShearQuestion';
//import BaseShearSolution from './BaseShearSolution'; will update when accessing staging branch

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

const LFRS = {
    "Special reinforced concrete shear walls": { R: 5.0, Cd: 5.0, omega: 2.5 },
    "Light-frame (wood) walls sheathed with wood structural panels rated for shear resistance": { R: 6.5, Cd: 4.0, omega: 3.0 },
    "Steel eccentrically braced frames": { R: 8.0, Cd: 4.0, omega: 2.0 },
    "Steel special moment frames": { R: 8.0, Cd: 5.5, omega: 3.0 }
};

const buildingOptions = {
    "Office": { RC: "II" },
    "Hospital": { RC: "IV" },
    "Detention Center": { RC: "III" },
    "Public Assembly": { RC: "III" }
};

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

function getSeismicImportanceFactor(RC) {
    switch (RC) {
        case "I":
        case "II":
            return 1.0;
        case "III":
            return 1.25;
        case "IV":
            return 1.50;
        default:
            return 0;
    }
}

function interpolate(min, max, randomizer) {
    return min + (max - min) * randomizer;
}

export const baseShear = () => {
  const selectedLFRS = getRandomFromKeyValueList(LFRS);
  const { key: LFRSname, value: LFRSDetails } = selectedLFRS;
  const { R, Cd, omega } = LFRSDetails;

  const selectedBuilding = getRandomFromKeyValueList(buildingOptions);
  const { key: buildingName, value: buildingDetails } = selectedBuilding;
  const { RC } = buildingDetails;
  const Ie = getSeismicImportanceFactor(RC);

  const SDSmin = 0.482; // g
  const SDSmax = 1.8; // g
  const SD1min = 0.253; // g
  const SD1max = 0.852; // g
  const S1min = 0.253; // g
  const S1max = 0.913; // g
  const zeroToOne = randomValGenSmall(0, 1);
  const stories = randomValGen(2, 10);
  const firstStoryHeight = randomValGen(10, 14); // ft
  const otherStoryHeights = randomValGen(10, 12); // ft
  const etswOtherLevels = randomValGen(2, 10); // kips
  const etswRoof = parseFloat(etswOtherLevels * 0.6).toFixed(1); // kips

  const T = parseFloat((stories / 10) * randomValGenSmall(0.8, 1.2)).toFixed(2); // seconds
  const TL = 12; // seconds
  const SDS = parseFloat(interpolate(SDSmin, SDSmax, zeroToOne)).toFixed(3); // g
  const SD1 = parseFloat(interpolate(SD1min, SD1max, zeroToOne)).toFixed(3); // g
  const S1 = parseFloat(interpolate(S1min, S1max, zeroToOne) * randomValGenSmall(0.9, 1.1)).toFixed(3); // g

  let question = (
    <BaseShearQuestion
      stories={stories}
      firstStoryHeight={firstStoryHeight}
      otherStoryHeights={otherStoryHeights}
      etswOtherLevels={etswOtherLevels}
      etswRoof={etswRoof}
      T={T}
      LFRSname={LFRSname}
      R={R}
      Cd={Cd}
      omega={omega}
      buildingName={buildingName}
      RC={RC}
      Ie={Ie}
      SDS={SDS}
      SD1={SD1}
      S1={S1}
      TL={TL}
    />
  );
  let image = baseShearImage;

  let answer = 100;
  let choices = shuffleArray([
    answer,
    answer - randomValGen(1, 2),
    answer + randomValGen(1, 2),
    answer + randomValGen(3, 6),
  ]);
  let solution = "Soon...";

  return {
    question: question,
    image: image,
    choices: choices,
    answer: answer,
    solution: solution,
    label: "forces?",
  };
};
