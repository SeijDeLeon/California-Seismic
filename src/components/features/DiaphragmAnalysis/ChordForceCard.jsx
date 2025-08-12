import React, { useState } from "react";
import OutputTemplate from "./OutputTemplate";
import Description from "./Description";
import Formulas from "./Formulas";
import Workflow from "./Workflow";
import { MathJax } from "better-react-mathjax";
import ChevronCard from "./ChevronCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { chordFWorkflow } from "./chordForceWorkflow";

export default function ChordForceCard({ inputs, solution, setSolution }) {

  const formulas = [
    { formula: "\\( V=\\frac{wL}{2} \\)", label: "Total Shear" },
    { formula: "\\( v=\\frac{V}{d} \\)", label: "Unit Shear" },
    { formula: "\\( M=\\frac{wL^2}{8} \\)", label: "Max Moment" },
    { formula: "\\( C=\\frac{M}{d} \\)", label: "Chord Force" },
  ];

  const workflow = chordFWorkflow(inputs, solution)
  const description = "Chord forces are axial forces that develop in the perimeter elements (chords) of a diaphragm where it resists lateral loads, such as those from wind or seismic events."
  return (
    // fragment
    <>
      
      {/* Chord Force */}
      <ChevronCard title="Chord Force" >
        <OutputTemplate
          description={
            <Description text={description} />
          }
          formulas={<Formulas items={formulas} />}
          workflow={<Workflow steps={workflow} />}
        />
      </ChevronCard>
    </>
  );
}
