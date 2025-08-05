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
  minLength = 15,
  maxLength = 100
}) => {
  const rawLength = forceValue / scaleFactor;
  const arrowLength = Math.min(maxLength, Math.max(minLength, rawLength));

  const xStart = direction === 'left' ? xEnd + arrowLength : xEnd - arrowLength;

  // Position label depending on alignment
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
        if (direction === 'left') {
            labelX += (labelOffsetX + arrowLength);
        }
        else {
            labelX = (xStart + xEnd) / 2;
        }
        anchor = 'middle';
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
      <text
        x={labelX}
        y={y}
        fontSize="11"
        textAnchor={anchor}
        dominantBaseline="middle"
      >
        {label}
      </text>
    </>
  );
};