import React, { useState, useEffect, useRef } from "react";
import WallInputs from "./WallInputs";
import SolutionChord from "../Solver/SolutionChord";
import ChordPlots from "./ChordPlots";

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

  const { ref } = useResizeObserver();

  const ftToPx = (ft) => ft * 3;
  const heightPx = ftToPx(heightFt);
  const leftWidthPx = ftToPx(leftWidthFt);
  const rightWidthPx = ftToPx(rightWidthFt);
  const structureWidth =
    leftWidthPx +
    (showRightWall ? rightWidthPx : showGhostWall ? rightWidthPx : 0);

  const paddingX = 60;
  const basePaddingY = 80;

  const arrowLength = 10 + wTop * 0.1;
  const extraTopPadding = arrowLength + 20;
  const paddingTop = basePaddingY + extraTopPadding;

  const viewBoxWidth = structureWidth + paddingX * 2;
  const viewBoxHeight = heightPx + paddingTop + basePaddingY;

  const structureStartX = paddingX;
  const structureEndX = structureStartX + structureWidth;
  const centerX = (structureStartX + structureEndX) / 2;

  const topArrowBaseY = paddingTop - 10;
  const topArrowTipY = topArrowBaseY - arrowLength;

  const minSpacing = 50;
  const availableWidth = structureEndX - structureStartX;
  const arrowCount = Math.max(2, Math.floor(availableWidth / minSpacing));
  const arrowSpacing = availableWidth / (arrowCount - 1);

  const topForceArrows = [];
  for (let i = 0; i < arrowCount; i++) {
    const x = structureStartX + i * arrowSpacing;
    topForceArrows.push(
      <line
        key={`top-arrow-${i}`}
        x1={x}
        y1={topArrowTipY}
        x2={x}
        y2={topArrowBaseY}
        stroke="black"
        markerEnd="url(#arrow)"
      />
    );
  }

  const arrowConnectorLine = (
    <line
      x1={structureStartX}
      y1={topArrowTipY}
      x2={structureEndX}
      y2={topArrowTipY}
      stroke="black"
      strokeWidth="1"
    />
  );

  const wallLabels = (
    <>
      <line
        x1={structureStartX}
        y1={topArrowTipY - 30}
        x2={structureStartX}
        y2={topArrowTipY}
        stroke="gray"
        strokeWidth="1"
        strokeDasharray="4,4"
      />
      <text
        x={structureStartX}
        y={topArrowTipY - 35}
        fontSize="12"
        fill="gray"
        textAnchor="middle"
      >
        Wall A
      </text>
      <line
        x1={structureEndX}
        y1={topArrowTipY - 30}
        x2={structureEndX}
        y2={topArrowTipY}
        stroke="gray"
        strokeWidth="1"
        strokeDasharray="4,4"
      />
      <text
        x={structureEndX}
        y={topArrowTipY - 35}
        fontSize="12"
        fill="gray"
        textAnchor="middle"
      >
        Wall B
      </text>
    </>
  );

  const bottomY = paddingTop + heightPx + 20;

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
          className="w-full h-auto bg-white pt-8"
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

          {/* Walls */}
          <rect
            x={structureStartX}
            y={paddingTop}
            width={leftWidthPx}
            height={heightPx}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          <rect
            x={structureStartX + 5}
            y={paddingTop + 5}
            width={leftWidthPx - 10}
            height={heightPx - 10}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />

          {showRightWall && (
            <>
              <rect
                x={structureStartX + leftWidthPx}
                y={paddingTop}
                width={rightWidthPx}
                height={heightPx}
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <rect
                x={structureStartX + leftWidthPx}
                y={paddingTop + 5}
                width={rightWidthPx - 5}
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
                x={structureStartX + leftWidthPx}
                y={paddingTop}
                width={rightWidthPx}
                height={heightPx}
                fill="gray"
                stroke="#000"
                strokeWidth="2"
                opacity={0.2}
                strokeDasharray="5,5"
              />
              <rect
                x={structureStartX + leftWidthPx}
                y={paddingTop + 5}
                width={rightWidthPx - 5}
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
            x1={structureStartX + 5}
            y1={bottomY}
            x2={structureStartX + leftWidthPx - 5}
            y2={bottomY}
            stroke="gray"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={structureStartX + leftWidthPx / 2}
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
                x1={structureStartX + leftWidthPx + 5}
                y1={bottomY}
                x2={structureStartX + leftWidthPx + rightWidthPx - 5}
                y2={bottomY}
                stroke="gray"
                markerStart="url(#arrow)"
                markerEnd="url(#arrow)"
              />
              <text
                x={structureStartX + leftWidthPx + rightWidthPx / 2}
                y={bottomY + 15}
                fontSize="12"
                fill="gray"
                textAnchor="middle"
              >
                {rightWidthFt} ft
              </text>
            </>
          )}

          {/* Height */}
          <line
            x1={structureEndX + 20}
            y1={paddingTop + 5}
            x2={structureEndX + 20}
            y2={paddingTop + heightPx - 5}
            stroke="gray"
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
          />
          <text
            x={structureEndX + 25}
            y={paddingTop + heightPx / 2 + 10}
            fontSize="12"
            fill="gray"
            transform={`rotate(-90, ${structureEndX + 25}, ${
              paddingTop + heightPx / 2
            })`}
            textAnchor="middle"
          >
            {heightFt} ft
          </text>

          {/* Force arrows and labels */}
          {arrowConnectorLine}
          {topForceArrows}
          {wallLabels}

          <text
            x={centerX}
            y={topArrowTipY - 10}
            fontSize="12"
            fill="black"
            textAnchor="middle"
          >
            W = {wTop} plf
          </text>
        </svg>
      </div>

      <SolutionChord
        leftWidthFt={leftWidthFt}
        rightWidthFt={rightWidthFt}
        heightFt={heightFt}
        wTop={wTop}
        showRightWall={showRightWall}
        setCalculations={setCalculations}
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
