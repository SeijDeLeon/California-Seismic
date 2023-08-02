const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const randomValGen = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
export const fundamentalPeriod = () => {
  let height = randomValGen(8, 30);
  let ksi = randomValGen(1, 29000);
  let kips = randomValGen(5, 100);
  let question = `Determine the fundamental period of the below SDOF structure. The
          height is ${height} ft, the modulus of elasticity for the column is
          ${ksi}, and the mass at the top weighs ${kips}?`;
  let answer = 5;
  let choices = shuffleArray([
    answer,
    answer + randomValGen(1, 10),
    answer + randomValGen(20, 30),
    answer + randomValGen(30, 40),
  ]);
  return { question: question, choices: choices, answer: answer };
};
