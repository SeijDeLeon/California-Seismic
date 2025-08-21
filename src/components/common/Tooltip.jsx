import { useState } from "react";

const Tooltip = ({ children, content, value, unit = "", reference }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isFiniteNumber = (n) => typeof n === "number" && Number.isFinite(n);

  // Inline text: prefer children, then numeric value+unit, then content, else 'N/A'
  const inlineText =
    children ??
    (isFiniteNumber(value)
      ? `${value.toFixed(3)}${unit ? ` ${unit}` : ""}`
      : content ?? "N/A");

  // Tooltip body: if reference/value present, show structured; else show content if provided
  const hasStructured = reference || isFiniteNumber(value);
  const tooltipBody = hasStructured ? (
    <div>
      {reference && <div className="font-semibold mb-0.5">{reference}</div>}
      {isFiniteNumber(value) && (
        <div>
          Value: {value.toFixed(5)}
          {unit ? ` ${unit}` : ""}
        </div>
      )}
    </div>
  ) : content ? (
    <div>{content}</div>
  ) : null;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="cursor-help border-b border-dotted border-gray-500">
        {inlineText}
      </span>

      {isHovered && tooltipBody && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50 whitespace-nowrap">
          {tooltipBody}
          <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </span>
  );
};

export default Tooltip;
