import React, { useState } from "react";
import OutputTemplate from "./OutputTemplate";
import Description from "./Description";
import Formulas from "./Formulas";
import Workflow from "./Workflow";
import { MathJax } from "better-react-mathjax";
import ChevronCard from "./ChevronCard";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ChordForceCard({ inputs, solution, setSolution }) {

  const formulas = [
    { formula: "\\( V=\\frac{wL}{2} \\)", label: "Total Shear" },
    { formula: "\\( v=\\frac{V}{d} \\)", label: "Unit Shear" },
    { formula: "\\( M=\\frac{wL^2}{8} \\)", label: "Max Moment" },
    { formula: "\\( C=\\frac{M}{d} \\)", label: "Chord Force" },
  ];

  const workflow = [
    {
      title: "Calculate Unit Shear",
      content: (
        <div className="font-mono text-sm">
          <MathJax>{"\\(V=\\frac{wL}{2}\\)"}</MathJax>
          <br />
          <MathJax>{"\\(v=\\frac{V}{d} \\)"}</MathJax>
        </div>
      ),
    },
    {
      title: "Calculate Max Moment",
      content: (
        <div>
          <p>
            Max bending occurs at <MathJax inline>{"\\(x=L/2 \\)"}</MathJax>
          </p>
          <span className="font-mono text-sm">
            <MathJax inline>{"\\(M=\\frac{wL^2}{8} \\)"}</MathJax>
          </span>
        </div>
      ),
    },
    {
      title: "Find Max Chord Force",
      content: (
        <div className="font-mono text-sm">
          <MathJax>{"\\(C=\\frac{M}{d}\\)"}</MathJax>
        </div>
      ),
    },
  ];
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
