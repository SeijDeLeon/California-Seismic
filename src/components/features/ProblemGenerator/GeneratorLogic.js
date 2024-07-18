import { fundamentalPeriod } from "./FundamentalPeriod";

const generatorLogic = (category) => {
  switch (category) {
    case "Fundamental Period":
      return fundamentalPeriod();
    case "category2": //set this up for Nonstructural component and test
      break;
    default:
    //  code...
  }
};
export default generatorLogic;
