import { fundamentalPeriod } from "./FundamentalPeriod";
import { nonStructuralComponent } from "./NonStructuralComponent";

const generatorLogic = (category) => {
  switch (category) {
    case "Fundamental Period":
      return fundamentalPeriod();
    case "Nonstructural Component":
      return nonStructuralComponent();
    case "category3":
      break;
    default:
    //  code...
  }
};
export default generatorLogic;
