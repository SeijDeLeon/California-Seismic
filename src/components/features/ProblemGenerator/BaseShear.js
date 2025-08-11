import baseShearImage from "./baseShear.png";
import BaseShearQuestion from './BaseShearQuestion';
import calculateCs from '../../../assets/data/calculations/calculateCs';
import calculateV from '../../../assets/data/calculations/calculateV';
import calculateCvx from '../../../assets/data/calculations/calculateCvx';
import calculateFvx from '../../../assets/data/calculations/calculateFvx';
import BaseShearSolution from './BaseShearSolution';

const shuffleArrayOfArrays = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  
    return array.map(subArray => 
      subArray.map(value => parseFloat(value.toFixed(4)))
    );
};
const randomValGen = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomValGenSmall = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(1));

const randomValGenSmaller = (min, max) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(4));

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
  const T0 = parseFloat(0.2 * (SD1 / SDS)).toFixed(3); // seconds

  let weights = [];
  for (let i = 1; i < stories; i++) {
    weights.push(etswOtherLevels);
  }
  weights.push(etswRoof);

  let heights = [];
  heights.push(firstStoryHeight);
  for (let i = 1; i < stories; i++) {
      heights.push(otherStoryHeights);
  }

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
      T0={T0}
      TL={TL}
    />
  );
  let image = baseShearImage;

  let Cs = parseFloat(calculateCs(SDS, SD1, T, Ie, R, T0, TL)).toFixed(4);
  let V = parseFloat(calculateV(Cs, weights)).toFixed(4);
  const totalWeightHeight = weights.reduce((sum, weight, index) => sum + parseFloat(weight || 0) * parseFloat(heights[index] || 0), 0);
  let Cvx = calculateCvx(weights, heights, totalWeightHeight);
  let CvxFixedFourPlaces = Cvx.map(num => parseFloat(num.toFixed(4)));
  let answer = calculateFvx(Cvx, V);
  let FvxFixedFourPlaces = answer.map(num => parseFloat(num.toFixed(4)));
  let fakeAnswer1 = [];
  let fakeAnswer2 = [];
  let fakeAnswer3 = [];
  for (let i = 0; i < stories; i++) {
      fakeAnswer1.push(randomValGenSmaller(0, 1));
      fakeAnswer2.push(randomValGenSmaller(0, 1));
      fakeAnswer3.push(randomValGenSmaller(0, 1));
  }
  let choices = shuffleArrayOfArrays([
    answer,
    fakeAnswer1,
    fakeAnswer2,
    fakeAnswer3
  ]);
  choices = choices.map(subArray => `[${subArray.map(num => num.toFixed(4)).join(', ')}]`);
  answer = `[${answer.map(num => num.toFixed(4)).join(', ')}]`;

  const CsInputs = {
    SDS: SDS,
    SD1: SD1,
    T: T,
    Ie: Ie,
    R: R,
    T0: T0,
    TL: TL
  };
  const VInputs = {
    weights: JSON.stringify(weights),
    Cs: Cs
  };
  const CvxInputs = {
    weights: JSON.stringify(weights),
    heights: JSON.stringify(heights)
  };
  const FvxInputs = {
    Cvx: JSON.stringify(CvxFixedFourPlaces),
    V: V
  };
  let solution = (
    <BaseShearSolution 
      CsInputs={CsInputs}
      Cs={Cs}
      VInputs={VInputs}
      V={V}
      CvxInputs={CvxInputs}
      Cvx={CvxFixedFourPlaces}
      FvxInputs={FvxInputs}
      FvxFixedFourPlaces={FvxFixedFourPlaces}
    />
  );

  return {
    question: question,
    image: image,
    choices: choices,
    answer: answer,
    solution: solution,
    label: "kips",
  };
};
