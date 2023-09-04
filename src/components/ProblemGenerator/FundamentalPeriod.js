import fundamentalPeriodImage from "../../assets/fundmentalPeriod.png";
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
  let height = randomValGen(8, 30);
  let ksi = randomValGen(1, 29000);
  let kips = randomValGen(5, 100);
  let question = `Determine the fundamental period of the below SDOF structure. The
          height is ${height} ft, the modulus of elasticity for the column is
          ${ksi} ksi, and the mass at the top weighs ${kips} kips?`;
  let image = fundamentalPeriodImage;
  let answer = parseFloat(
    (
      2 *
      Math.PI *
      Math.sqrt((kips * Math.pow(height, 3)) / (ksi * 386.09))
    ).toFixed(2)
  );
  let choices = shuffleArray([
    answer,
    answer + randomValGen(1, 5),
    answer + randomValGen(6, 10),
    answer + randomValGen(11, 20),
  ]);

  return { question: question, image: image, choices: choices, answer: answer };
};
