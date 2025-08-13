import React from "react";
import { MathJax } from "better-react-mathjax";

export default function Formulas({ items }) {
  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx} className="font-mono text-sm mb-2">
          <MathJax>{item.formula}</MathJax>
          <p className="text-[12px] text-muted-foreground block mt-1">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
