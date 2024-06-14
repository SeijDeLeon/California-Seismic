import { fundamentalPeriod } from "./FundamentalPeriod";

const generatorLogic = (category) => {
  switch (category) {
    case "Fundamental Period":
      return fundamentalPeriod();
    case "category2":
      break;
    default:
    //  code...
  }
};
export default generatorLogic;
