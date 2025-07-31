// DiaphragmViewer.jsx
import React, { useState, useEffect, useRef } from "react";
import WallInputs from "./WallInputs";
import Solution from "../Solver/Solution";
import ChordPlots from "./ChordPlots";

// Custom hook
const useResizeObserver = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(1);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
};

export default function DiaphragmViewer() {
  const [wTop, setwTop] = useState(100);
  const [showRightWall, setShowRightWall] = useState(false);
  const [showGhostWall, setShowGhostWall] = useState(false);
  const [leftWidthFt, setLeftWidthFt] = useState(50);
  const [rightWidthFt, setRightWidthFt] = useState(25);
  const [heightFt, setHeightFt] = useState(40);
  const [calculations, setCalculations] = useState({
    Vmax: 0,
    moment: 0,
    chord: 0,
    width: 1,
  });

  const { ref, width = 1 } = useResizeObserver();

  const ftToPx = (ft) => ft * 3;

  const heightPx = ftToPx(heightFt);
  const leftWidthPx = ftToPx(leftWidthFt);
  const rightWidthPx = ftToPx(rightWidthFt);
  const totalStructureWidth = leftWidthPx + (showRightWall ? rightWidthPx : 0);

  const paddingX = 60;
  const paddingY = 80;

  const viewBoxWidth =
    totalStructureWidth +
    paddingX * 2 +
    (showGhostWall && !showRightWall ? rightWidthPx : 0);
  const viewBoxHeight = heightPx + paddingY * 2;

  const leftWallX = paddingX;
  const rightWallX = leftWallX + leftWidthPx;

  const topArrowSpacing = 20;
  const topArrowStart = leftWallX;
  const topArrowEnd =
    rightWallX +
    (showRightWall ? rightWidthPx : showGhostWall ? rightWidthPx : 0);
  const topArrowY1 = paddingY - 30;
  const topArrowY2 = paddingY - 10;

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

  const fxLabelX = leftWallX + (topArrowEnd - topArrowStart) / 2;
  const bottomY = paddingY + heightPx + 20;

  const handleToggleWall = () => {
    setShowRightWall((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <WallInputs
        leftWidthFt={leftWidthFt}
        setLeftWidthFt={setLeftWidthFt}
        rightWidthFt={rightWidthFt}
        setRightWidthFt={setRightWidthFt}
        heightFt={heightFt}
        setHeightFt={setHeightFt}
        wTop={wTop}
        setwTop={setwTop}
        showRightWall={showRightWall}
      />

      <button
        onClick={handleToggleWall}
        onMouseEnter={() => setShowGhostWall(true)}
        onMouseLeave={() => setShowGhostWall(false)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showRightWall ? "Remove Right Wall" : "Add Right Wall"}
      </button>

      <div ref={ref} className="w-full mb-4">
        <svg
          className="w-full h-auto bg-white"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
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

          {/* Walls and annotations */}
          <rect
            x={leftWallX}
            y={paddingY}
            width={leftWidthPx}
            height={heightPx}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          <rect
            x={leftWallX + 5}
            y={paddingY + 5}
            width={leftWidthPx - 10}
            height={heightPx - 10}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />

          {showRightWall && rightWidthFt > 0 && (
            <>
              <rect
                x={rightWallX}
                y={paddingY}
                width={rightWidthPx}
                height={heightPx}
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <rect
                x={rightWallX + 5}
                y={paddingY + 5}
                width={rightWidthPx - 10}
                height={heightPx - 10}
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
            </>
          )}

          {!showRightWall && showGhostWall && (
            <>
              <rect
                x={rightWallX}
                y={paddingY}
                width={rightWidthPx}
                height={heightPx}
                fill="gray"
                stroke="#000"
                strokeWidth="2"
                opacity={0.3}
                strokeDasharray="5,5"
              />
              <rect
                x={rightWallX + 5}
                y={paddingY + 5}
                width={rightWidthPx - 10}
                height={heightPx - 10}
                fill="gray"
                stroke="#000"
                strokeWidth="2"
                opacity={0.3}
                strokeDasharray="5,5"
              />
            </>
          )}

          {/* Dimension lines */}
          <line
            x1={leftWallX + 5}
            y1={bottomY}
            x2={leftWallX + leftWidthPx - 5}
            y2={bottomY}
            stroke="gray"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={leftWallX + leftWidthPx / 2}
            y={bottomY + 15}
            fontSize="12"
            fill="gray"
            textAnchor="middle"
          >
            {leftWidthFt} ft
          </text>

          {showRightWall && (
            <>
              <line
                x1={rightWallX + 5}
                y1={bottomY}
                x2={rightWallX + rightWidthPx - 5}
                y2={bottomY}
                stroke="gray"
                markerStart="url(#arrow)"
                markerEnd="url(#arrow)"
              />
              <text
                x={rightWallX + rightWidthPx / 2}
                y={bottomY + 15}
                fontSize="12"
                fill="gray"
                textAnchor="middle"
              >
                {rightWidthFt} ft
              </text>
            </>
          )}

          {/* Height line */}
          <line
            x1={leftWallX + totalStructureWidth + 20}
            y1={paddingY}
            x2={leftWallX + totalStructureWidth + 20}
            y2={paddingY + heightPx}
            stroke="gray"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={leftWallX + totalStructureWidth + 25}
            y={paddingY + 10 + heightPx / 2}
            fontSize="12"
            fill="gray"
            transform={`rotate(-90, ${leftWallX + totalStructureWidth + 25}, ${
              paddingY + heightPx / 2
            })`}
            textAnchor="middle"
          >
            {heightFt} ft
          </text>

          {/* Force Arrows */}
          {topForceArrows}
          <text
            x={fxLabelX}
            y={paddingY - 40}
            fontSize="12"
            fill="black"
            textAnchor="middle"
          >
            Fₓ = {wTop} lb/ft
          </text>
        </svg>
      </div>

      <Solution
        leftWidthFt={leftWidthFt}
        rightWidthFt={rightWidthFt}
        heightFt={heightFt}
        wTop={wTop}
        showRightWall={showRightWall}
        setCalculations={setCalculations} // ✅ THIS LINE IS ESSENTIAL
      />

      <ChordPlots
        Vmax={calculations.Vmax}
        moment={calculations.moment}
        chord={calculations.chord}
        width={calculations.width}
      />
    </div>
  );
}
