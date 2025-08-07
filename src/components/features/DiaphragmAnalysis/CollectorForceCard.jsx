import React, { useState } from "react";
import OutputTemplate from "./OutputTemplate";
import Description from "./Description";
import Formulas from "./Formulas";
import Workflow from "./Workflow";
import { MathJax } from "better-react-mathjax";
import ChevronCard from "./ChevronCard";

export default function CollectorForceCard({ inputs, solution, setSolution }) {
  // array for object of walls
  const [isOpen, setIsOpen] = useState(false);

  const formulas = [
    { formula: "\\( R_x=L/2*w \\)", label: "Reaction Force" },
    { formula: "\\( v=\\frac{R_x}{d_x} \\)", label: "Unit Wall Shear" },
  ];

  const workflow = [
    {
      title: "Calculate Reaction Force On Every Shearwall",
      content: (
        <div className="font-mono text-sm">
          <MathJax>{"\\(R_a=L/2*w\\)"}</MathJax>
          <br />
          <MathJax>{"\\(R_b=L/2*w \\)"}</MathJax>
        </div>
      ),
    },
    {
      title: "Calculate and Find The Unit Wall Shear For Walls With a Gap",
      content: (
        <div>
          <p>
            <MathJax inline>{"\\(v_x=\\frac{R_x}{d_x} \\)"}</MathJax>
          </p>
          <br></br>
          <p className="font-mono text-sm">
            <MathJax inline>{"\\(v_y=\\frac{R_y}{d_y} \\)"}</MathJax>
          </p>
        </div>
      ),
    },
    {
      title: "Calculate Max Collector Force",
      content: (
        <div className="font-mono text-sm">
          <p>Create Collector Force Diagram</p>
        </div>
      ),
    },
  ];
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
