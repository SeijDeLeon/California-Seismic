import React, { useState } from "react";
import OutputTemplate from "./OutputTemplate";
import Description from "./Description";
import Formulas from "./Formulas";
import Workflow from "./Workflow";
import { MathJax } from "better-react-mathjax";
import ChevronCard from "./ChevronCard";
import collectorFWorkflow from "./diaUtilities/collectorForceWorkflow";
import { getCollectorFormulas } from "./diaUtilities/formulas";

export default function CollectorForceCard({ inputs, solution, setSolution }) {
  // array for object of walls
  const [isOpen, setIsOpen] = useState(false);

  const formulas = getCollectorFormulas(inputs);

  const workflow = collectorFWorkflow({ input: inputs, solution: solution });

  const description =
    "The collector force is a force that accumulates within a diaphragm and is transferred to vertical lateral force-resisting elements (like shear walls or frames) of a building during seismic or wind events";

  return (
    <>
      <ChevronCard title="Collector Force">
        <OutputTemplate
          description={<Description text={description} />}
          formulas={<Formulas items={formulas} />}
          workflow={<Workflow steps={workflow} />}
        />
      </ChevronCard>
    </>
  );
}
