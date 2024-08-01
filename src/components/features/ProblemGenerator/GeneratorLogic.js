import { fundamentalPeriod } from "./FundamentalPeriod";
import { nonStructuralComponent } from "./NonStructuralComponent";
import { baseShear } from "./BaseShear";

const generatorLogic = (category) => {
  switch (category) {
    case "Fundamental Period":
      return fundamentalPeriod();
    case "Nonstructural Component":
      return nonStructuralComponent();
    case "Base Shear":
      return baseShear();
    case "category4":
      break;
    default:
    //  code...
  }
};
export default generatorLogic;
