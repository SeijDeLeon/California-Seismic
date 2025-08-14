import React, { useState } from "react";
import { MathJax } from "better-react-mathjax";

function FormulaTooltip({ reference, link, children }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!reference) {
    return children;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 whitespace-nowrap">
          <div className="font-semibold">
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                {reference}
              </a>
            ) : (
              reference
            )}
          </div>
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
}

export default function Formulas({ items }) {
  return (
    <div>
      {items.map((item, idx) => (
        <FormulaTooltip key={idx} reference={item.reference} link={item.link}>
          <div className={`font-mono text-sm mb-2 ${item.reference ? 'cursor-help' : ''}`}>
            <MathJax>{item.formula}</MathJax>
            <p className="text-[12px] text-muted-foreground block mt-1">
              {item.label}
            </p>
          </div>
        </FormulaTooltip>
      ))}
    </div>
  );
}
