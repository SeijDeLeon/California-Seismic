import React from 'react';

export const renderArrow = ({
  xEnd,
  y,
  forceValue,
  label = '',
  direction = 'left',
  labelPosition = 'end',
  labelOffsetX = 0,
  scaleFactor = 100,
  minLength = 10,
  maxLength = 100,
  onMetrics,             
}) => {
  const rawLength = forceValue / scaleFactor;
  const arrowLength = Math.min(maxLength, Math.max(minLength, rawLength));

  const xStart = direction === 'left' ? xEnd + arrowLength : xEnd - arrowLength;

  // Label positioning
  const textOffset = 10;
  let labelX = xEnd;
  let anchor = 'start';

  if (labelPosition === 'start') {
    labelX = direction === 'left' ? xStart + textOffset : xStart - textOffset;
    anchor = direction === 'left' ? 'start' : 'end';
  } else if (labelPosition === 'end') {
    labelX = direction === 'left' ? xEnd - textOffset : xEnd + textOffset;
    anchor = direction === 'left' ? 'end' : 'start';
  } else if (labelPosition === 'middle') {
    labelX = (xStart + xEnd) / 2 + (direction === 'left' ? labelOffsetX : 0);
    anchor = 'middle';
  }

  // Report metrics to caller if provided
  if (typeof onMetrics === 'function') {
    onMetrics({ xStart, xEnd, y, arrowLength, direction });
  }

  return (
    <>
      <line
        x1={xStart}
        y1={y}
        x2={xEnd}
        y2={y}
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <text x={labelX} y={y} fontSize="11" textAnchor={anchor} dominantBaseline="middle">
        {label}
      </text>
    </>
  );
};