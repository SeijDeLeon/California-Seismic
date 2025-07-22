import React, { useState } from "react";
import ChordPlots from "./ChordPlots";

export default function DiaphragmViewer() {
  const [wTop, setwTop] = useState(100);
  const [showMiddleWall, setShowMiddleWall] = useState(true);
  const [leftWidthFt, setLeftWidthFt] = useState(25);
  const [rightWidthFt, setRightWidthFt] = useState(25);
  const [heightFt, setHeightFt] = useState(40);

  const ftToPx = (ft) => ft * 5;

  const svgWidth = 700;
  const heightPx = ftToPx(heightFt);
  const leftWidthPx = ftToPx(leftWidthFt);
  const rightWidthPx = ftToPx(rightWidthFt);
  const totalStructureWidth = leftWidthPx + rightWidthPx;

  const structureOffsetX = (svgWidth - totalStructureWidth) / 2;
  const leftWallX = structureOffsetX;
  const wallX = leftWallX + leftWidthPx;

  const handleToggleWall = () => {
    setShowMiddleWall((prev) => {
      const newState = !prev;
      if (newState) {
        // Restore previous total width split between left and right
        const total = rightWidthFt;
        const half = Math.round(total / 2);
        setLeftWidthFt(half);
        setRightWidthFt(total - half);
      } else {
        // Combine both into one width
        const total = leftWidthFt + rightWidthFt;
        setLeftWidthFt(0);
        setRightWidthFt(total);
      }
      return newState;
    });
  };

  const topArrowSpacing = 20;
  const topArrowStart = leftWallX;
  const topArrowEnd = wallX + rightWidthPx;
  const topArrowY1 = 90;
  const topArrowY2 = 110;

  const topForceArrows = [];
  for (let x = topArrowStart; x <= topArrowEnd; x += topArrowSpacing) {
    topForceArrows.push(
      <line
        key={`top-arrow-${x}`}
        x1={x}
        y1={topArrowY1}
        x2={x}
        y2={topArrowY2}
        stroke="black"
        markerEnd="url(#arrow)"
      />
    );
  }

  const fxLabelX = leftWallX + (rightWidthPx + leftWidthPx) / 2;
  const bottomY = 125 + heightPx + 20;

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="mb-4 flex gap-4 flex-wrap justify-center">
        {showMiddleWall && (
          <label className="flex flex-col text-sm">
            Left Width (ft)
            <input
              type="number"
              value={leftWidthFt}
              onChange={(e) => setLeftWidthFt(+e.target.value)}
              className="border px-1"
            />
          </label>
        )}
        <label className="flex flex-col text-sm">
          {showMiddleWall ? "Right Width (ft)" : "Width (ft)"}
          <input
            type="number"
            value={rightWidthFt}
            onChange={(e) => setRightWidthFt(+e.target.value)}
            className="border px-1"
          />
        </label>
        <label className="flex flex-col text-sm">
          Height (ft)
          <input
            type="number"
            value={heightFt}
            onChange={(e) => setHeightFt(+e.target.value)}
            className="border px-1"
          />
        </label>
        <label className="flex flex-col text-sm">
          W (lb/ft)
          <input
            type="number"
            value={wTop}
            onChange={(e) => setwTop(+e.target.value)}
            className="border px-1"
          />
        </label>
      </div>

      <button
        onClick={handleToggleWall}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showMiddleWall ? "Hide Middle Wall" : "Add Middle Wall"}
      </button>

      <div className="flex justify-center w-full">
        <svg width={svgWidth} height="400" viewBox={`0 0 ${svgWidth} 400`}>
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="black" />
            </marker>
          </defs>

          {/* Left Story */}
          {showMiddleWall && leftWidthFt > 0 && (
            <>
              <rect
                x={leftWallX}
                y="120"
                width={leftWidthPx}
                height={heightPx}
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <rect
                x={leftWallX + 5}
                y="125"
                width={leftWidthPx - 5}
                height={heightPx - 10}
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
            </>
          )}

          {/* Middle Wall */}
          {showMiddleWall && (
            <rect
              x={wallX}
              y="120"
              width="0"
              height={heightPx}
              stroke="#000"
              strokeWidth="2"
            />
          )}

          {/* Right Story */}
          <rect
            x={wallX}
            y="120"
            width={rightWidthPx}
            height={heightPx}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          <rect
            x={wallX + 5}
            y="125"
            width={rightWidthPx - 10}
            height={heightPx - 10}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />

          {/* Dimension Lines and Labels */}
          {showMiddleWall && leftWidthFt > 0 && (
            <>
              <line
                x1={leftWallX + 5}
                y1={bottomY}
                x2={wallX - 5}
                y2={bottomY}
                stroke="gray"
                markerStart="url(#arrow)"
                markerEnd="url(#arrow)"
              />
              <text
                x={leftWallX - 15 + leftWidthPx / 2}
                y={bottomY + 15}
                fontSize="12"
                fill="gray"
              >
                {leftWidthFt} ft
              </text>
            </>
          )}
          <line
            x1={wallX + 5}
            y1={bottomY}
            x2={wallX + rightWidthPx - 5}
            y2={bottomY}
            stroke="gray"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={wallX - 15 + rightWidthPx / 2}
            y={bottomY + 15}
            fontSize="12"
            fill="gray"
          >
            {rightWidthFt} ft
          </text>

          {/* Height Indicator */}
          <line
            x1={wallX + rightWidthPx + 20}
            y1="125"
            x2={wallX + rightWidthPx + 20}
            y2={125 + heightPx}
            stroke="gray"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={wallX + rightWidthPx + 25}
            y={135 + heightPx / 2}
            fontSize="12"
            fill="gray"
            transform={`rotate(-90, ${wallX + rightWidthPx + 25}, ${
              125 + heightPx / 2
            })`}
            textAnchor="middle"
          >
            {heightFt} ft
          </text>

          {/* Force Arrows and Label */}
          {topForceArrows}
          <text
            x={fxLabelX}
            y="80"
            fontSize="12"
            fill="black"
            textAnchor="middle"
          >
            Fₓ = {wTop} lb/ft
          </text>
        </svg>
      </div>
      <p className="border = 1x">
        TODO: add the input value states into the below plot components to have
        them update instantaneously with changes
      </p>
      <ChordPlots />
    </div>
  );
}
