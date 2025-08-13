import React, { useState } from "react";
import SolutionChord from "../Solver/SolutionChord";
import ChordPlots from "./ChordPlots";
import CollectorPlots from "./CollectorPlots";

export default function DiaphragmViewer({
  inputs,
  handleAddWall,
  handleDeleteWall,
  handleAddWallOpening,
  solution,
}) {
  const getWallByName = (name) => inputs.wallLines.find((w) => w.wall === name);

  const wallA = getWallByName("A"); //this was called for something earlier and isn't now - check later that it's still necessary
  const wallB = getWallByName("B");
  const wallC = getWallByName("C");

  // or by index (and map this)
  const firstWall = inputs.wallLines[0];

  // old usestates
  // const [wTop, setwTop] = useState(100);
  // const [leftWidthFt, setLeftWidthFt] = useState(50);
  // const [rightWidthFt, setRightWidthFt] = useState(25);
  // const [heightFt, setHeightFt] = useState(40);
  // const [showRightWall, setShowRightWall] = useState(false);
  const [showGhostWall, setShowGhostWall] = useState(false);

  const wTop = inputs.uniformForces?.[0]?.startForce || 100;
  const leftWidthFt = inputs.horizontalWallLengths[0] || 50;
  const rightWidthFt = inputs.horizontalWallLengths[1] || 30;
  const heightFt = inputs.wallLines?.[0]?.length || 40;
  const showRightWall = inputs.wallLines.some((w) => w.wall === "C");
  const totalWidth = leftWidthFt + (showRightWall ? rightWidthFt : 0);

  // const [wallGaps, setWallGaps] = useState({ A: 0, B: 0, C: 0 });
  const wallGaps = inputs.wallLines.reduce(
    (acc, wall) => {
      acc[wall.wall] = wall.openings?.[0]
        ? wall.openings[0][1] - wall.openings[0][0]
        : 0;
      return acc;
    },
    { A: 0, B: 0, C: 0 }
  );

  // const [calculations, setCalculations] = useState({
  //   Vmax: 0,
  //   moment: 0,
  //   chord: 0,
  //   width: 1,
  // });

  const [shearWalls, setShearWalls] = useState({
    A: false,
    B: false,
    C: false,
  });
  const [wallSegments, setWallSegments] = useState({ A: 0, B: 0, C: 0 });
  // change to this code below when you have the rest figured out -- mess with the inputs tn
  // const wallSegments = inputs.wallLines.reduce(
  //   (acc, wall) => {
  //     // If we treat "segments" as the solid length left after the first opening:
  //     const openingLength = wall.openings?.[0]
  //       ? wall.openings[0][1] - wall.openings[0][0]
  //       : 0;

  //     acc[wall.wall] = wall.length - openingLength; // remaining height as "segment"
  //     return acc;
  //   },
  //   { A: 0, B: 0, C: 0 }
  // );

  const [activeInputType, setActiveInputType] = useState(null); // "gap" | "segment" | null

  // For highlight hover & selected state
  const [hoveredWall, setHoveredWall] = useState(null); // "A" | "B" | "C" | null
  const [selectedWall, setSelectedWall] = useState(null); // same

  // structure functions
  const ftToPx = (ft) => ft * 3;
  const heightPx = ftToPx(heightFt);
  const leftWidthPx = ftToPx(leftWidthFt);
  const rightWidthPx = ftToPx(rightWidthFt);
  const structureWidth =
    leftWidthPx + (showRightWall || showGhostWall ? rightWidthPx : 0);

  //SVG constants
  const paddingX = 60;
  const basePaddingY = 80;

  const arrowLength = 10 + wTop * 0.1;
  const extraTopPadding = arrowLength + 20;
  const paddingTop = basePaddingY + extraTopPadding;

  const viewBoxWidth = structureWidth + paddingX * 2;
  const viewBoxHeight = heightPx + paddingTop + basePaddingY;

  //svg postions
  const structureStartX = paddingX;
  const structureEndX = structureStartX + structureWidth;
  const centerX = (structureStartX + structureEndX) / 2;

  //top force arrows - positions and setup
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

  // wall labels render function - translucent for ghost mode
  const renderWallLabels = (translucent = false) => {
    const strokeOpacity = translucent ? 0.3 : 1;
    const fillOpacity = translucent ? 0.4 : 1;
    const strokeDasharray = "4,4";
    const fillColor = `rgba(128, 128, 128, ${fillOpacity})`;
    const strokeColor = `rgba(128, 128, 128, ${strokeOpacity})`;

    return (
      <>
        {/* Left wall label */}
        <line
          x1={structureStartX}
          y1={topArrowTipY - 30}
          x2={structureStartX}
          y2={topArrowTipY}
          stroke={strokeColor}
          strokeWidth="1"
          strokeDasharray={strokeDasharray}
        />
        <text
          x={structureStartX}
          y={topArrowTipY - 35}
          fontSize="12"
          fill={fillColor}
          textAnchor="middle"
        >
          Wall A
        </text>

        {showRightWall || translucent ? (
          <>
            {/* Middle label Wall B at end of left wall */}
            <line
              x1={structureStartX + leftWidthPx - 5}
              y1={topArrowTipY - 30}
              x2={structureStartX + leftWidthPx - 5}
              y2={topArrowTipY}
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray={strokeDasharray}
            />
            <text
              x={structureStartX + leftWidthPx - 5}
              y={topArrowTipY - 35}
              fontSize="12"
              fill={fillColor}
              textAnchor="middle"
            >
              Wall B
            </text>

            {/* Right wall label Wall C */}
            <line
              x1={structureEndX}
              y1={topArrowTipY - 30}
              x2={structureEndX}
              y2={topArrowTipY}
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray={strokeDasharray}
            />
            <text
              x={structureEndX}
              y={topArrowTipY - 35}
              fontSize="12"
              fill={fillColor}
              textAnchor="middle"
            >
              Wall C
            </text>
          </>
        ) : (
          <>
            {/* Right wall label Wall B when right wall not shown */}
            <line
              x1={structureEndX}
              y1={topArrowTipY - 30}
              x2={structureEndX}
              y2={topArrowTipY}
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray={strokeDasharray}
            />
            <text
              x={structureEndX}
              y={topArrowTipY - 35}
              fontSize="12"
              fill={fillColor}
              textAnchor="middle"
            >
              Wall B
            </text>
          </>
        )}
      </>
    );
  };

  const bottomY = paddingTop + heightPx + 20;

  const handleToggleWall = () => {
    const rightWallIndex = inputs.wallLines.findIndex((w) => w.wall === "C");

    if (rightWallIndex === -1) {
      // Wall C not found → add it
      handleAddWall(
        inputs.wallLines.length, // insert at end
        "C",
        [], // no openings initially
        inputs.wallLines[0].length, // match height of first wall
        30 // horizontal wall length (example default)
      );
    } else {
      // Wall C exists → remove it
      handleDeleteWall(rightWallIndex);
    }

    setSelectedWall(null); // reset selection after toggle
  };

  // Highlight edges config
  const highlightEdgeWidth = 8;

  // X positions for edge highlights
  const wallAEdgeX = structureStartX + 3; // left edge of Wall A
  const wallBEdgeX = structureStartX + leftWidthPx - 3; // right edge of Wall A / left edge of Wall C or right edge Wall B
  const wallCEdgeX = structureEndX - 3; // right edge of Wall C

  const edgeHighlightY = paddingTop + 5;
  const edgeHighlightHeight = heightPx - 10;

  // Render highlight for edges
  const renderWallEdgeHighlight = (wall) => {
    let x;
    if (wall === "A") x = wallAEdgeX;
    else if (wall === "B") x = wallBEdgeX;
    else if (wall === "C") x = wallCEdgeX;
    else return null;

    const isActive = hoveredWall === wall || selectedWall === wall;
    if (!isActive) return null;

    const fillOpacity = selectedWall === wall ? 0.6 : 0.3;

    return (
      <rect
        key={`highlight-${wall}`}
        x={x - highlightEdgeWidth / 2}
        y={edgeHighlightY}
        width={highlightEdgeWidth}
        height={edgeHighlightHeight}
        fill="blue"
        fillOpacity={fillOpacity}
        pointerEvents="none"
      />
    );
  };

  // Button handlers
  const onWallButtonClick = (wall) => {
    setSelectedWall((prev) => (prev === wall ? null : wall));
  };

  const onWallButtonHover = (wall) => {
    setHoveredWall(wall);
  };
  const onWallButtonLeave = () => {
    setHoveredWall(null);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 max-w-screen-lg mx-auto">
      {/* <WallInputs
        leftWidthFt={leftWidthFt}
        setLeftWidthFt={setLeftWidthFt}
        rightWidthFt={rightWidthFt}
        setRightWidthFt={setRightWidthFt}
        heightFt={heightFt}
        setHeightFt={setHeightFt}
        wTop={wTop}
        setwTop={setwTop}
        showRightWall={showRightWall}
      /> */}
      <button
        onClick={handleToggleWall}
        onMouseEnter={() => {
          if (!showRightWall) setShowGhostWall(true);
        }}
        onMouseLeave={() => setShowGhostWall(false)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showRightWall ? "Remove Right Wall" : "Add Right Wall"}
      </button>
      <div className="flex gap-3 mb-6">
        {/* Wall A */}
        <button
          onClick={() => onWallButtonClick("A")}
          onMouseEnter={() => onWallButtonHover("A")}
          onMouseLeave={onWallButtonLeave}
          className={`px-4 py-2 rounded ${
            selectedWall === "A"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-blue-300"
          }`}
        >
          Wall A
        </button>

        {/* Wall B */}
        <button
          onClick={() => onWallButtonClick("B")}
          onMouseEnter={() => onWallButtonHover("B")}
          onMouseLeave={onWallButtonLeave}
          className={`px-4 py-2 rounded ${
            selectedWall === "B"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-blue-300"
          }`}
        >
          Wall B
        </button>

        {/* Wall C only if right wall shown */}
        {showRightWall && (
          <button
            onClick={() => onWallButtonClick("C")}
            onMouseEnter={() => onWallButtonHover("C")}
            onMouseLeave={onWallButtonLeave}
            className={`px-4 py-2 rounded ${
              selectedWall === "C"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-300"
            }`}
          >
            Wall C
          </button>
        )}
      </div>
      {selectedWall && (
        <button
          onClick={() => {
            setShearWalls((prev) => ({
              ...prev,
              [selectedWall]: !prev[selectedWall], // Toggle shear wall status
            }));

            // Reset gap and segments if turning off
            if (shearWalls[selectedWall]) {
              handleAddWallOpening(selectedWall, [0, 0]); // resets gap
              setWallSegments((prev) => ({ ...prev, [selectedWall]: 0 }));
              setActiveInputType(null);
            }
          }}
          className={`px-4 py-2 rounded ${
            shearWalls[selectedWall]
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-800 hover:bg-gray-700"
          } text-white`}
        >
          {shearWalls[selectedWall] ? "Remove Shear Wall" : "Make Shear Wall"}
        </button>
      )}
      {selectedWall && shearWalls[selectedWall] && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setActiveInputType("gap")}
            className={`px-4 py-2 rounded ${
              activeInputType === "gap"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 hover:bg-orange-300"
            }`}
          >
            + Gap
          </button>
          <button
            onClick={() => setActiveInputType("segment")}
            className={`px-4 py-2 rounded ${
              activeInputType === "segment"
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-green-400"
            }`}
          >
            + Segment
          </button>
        </div>
      )}
      {selectedWall && shearWalls[selectedWall] && (
        <div className="flex items-center gap-8 mt-4">
          {/* Gap input */}
          <label className="text-sm flex items-center gap-2">
            <span>Gap Height (ft):</span>
            <input
              type="number"
              min="0"
              max={heightFt}
              value={wallGaps[selectedWall] || 0}
              onChange={(e) => {
                const value = Number(e.target.value);
                const segmentValue = wallSegments[selectedWall] || 0;
                const total = value + segmentValue;
                const clamped =
                  total > heightFt ? heightFt - segmentValue : value;

                handleAddWallOpening(selectedWall, [0, Math.max(0, clamped)]);
              }}
              className="p-1 border rounded w-20"
            />
          </label>

          {/* Segment input */}
          <label className="text-sm flex items-center gap-2">
            <span>Segment Height (ft):</span>
            <input
              type="number"
              min="0"
              max={heightFt}
              value={wallSegments[selectedWall] || 0}
              onChange={(e) => {
                const value = Number(e.target.value);
                const gapValue = wallGaps[selectedWall] || 0;
                const total = value + gapValue;
                const clamped = total > heightFt ? heightFt - gapValue : value;

                setWallSegments((prev) => ({
                  ...prev,
                  [selectedWall]: Math.max(0, clamped),
                }));
              }}
              className="p-1 border rounded w-20"
            />
          </label>
        </div>
      )}
      <div className="w-full mb-4">
        <svg
          data-testid="svg-plot"
          className="w-full h-auto bg-white pt-8 max-h-[600px]"
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
            data-testid="rect-A"
            x={structureStartX}
            y={paddingTop}
            width={leftWidthPx}
            height={heightPx}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          <rect
            data-testid="rect-B"
            x={structureStartX + 5}
            y={paddingTop + 5}
            width={leftWidthPx - 10}
            height={heightPx - 10}
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />

          {(showRightWall || showGhostWall) && (
            <>
              <rect
                x={structureStartX + leftWidthPx}
                y={paddingTop}
                width={rightWidthPx}
                height={heightPx}
                fill={
                  showGhostWall && !showRightWall
                    ? "rgba(128,128,128,0.3)"
                    : "none"
                }
                stroke={
                  showGhostWall && !showRightWall
                    ? "rgba(128,128,128,0.5)"
                    : "#000"
                }
                strokeWidth="2"
              />
              <rect
                x={structureStartX + leftWidthPx}
                y={paddingTop + 5}
                width={rightWidthPx - 5}
                height={heightPx - 10}
                fill={
                  showGhostWall && !showRightWall
                    ? "rgba(128,128,128,0.2)"
                    : "none"
                }
                stroke={
                  showGhostWall && !showRightWall
                    ? "rgba(128,128,128,0.4)"
                    : "#000"
                }
                strokeWidth="2"
              />
            </>
          )}

          {/* Highlight edges */}
          {renderWallEdgeHighlight("A")}
          {renderWallEdgeHighlight("B")}
          {showRightWall && renderWallEdgeHighlight("C")}

          {["A", "B", "C"].map((wall) => {
            if (!shearWalls[wall] || (wall === "C" && !showRightWall))
              return null;

            const wallX =
              wall === "A"
                ? wallAEdgeX
                : wall === "B"
                ? wallBEdgeX
                : wallCEdgeX;

            return (
              <rect
                key={`shear-fill-${wall}`}
                x={wallX - highlightEdgeWidth / 2}
                y={edgeHighlightY}
                width={highlightEdgeWidth}
                height={heightPx - 10}
                fill="gray"
                pointerEvents="none"
                rx={2}
                ry={2}
              />
            );
          })}

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

          {(showRightWall || showGhostWall) && (
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
          {renderWallLabels(showGhostWall && !showRightWall)}

          <text
            x={centerX}
            y={topArrowTipY - 10}
            fontSize="12"
            fill="black"
            textAnchor="middle"
          >
            W = {wTop} plf
          </text>

          {/* Render wall gaps */}
          {["A", "B", "C"].map((wall) => {
            if ((wall === "C" && !showRightWall) || !shearWalls[wall])
              return null;

            const gapFt = wallGaps[wall];
            const segmentFt = wallSegments[wall];
            const gapPx = ftToPx(gapFt || 0);
            const segmentPx = ftToPx(segmentFt || 0);
            const wallX =
              wall === "A"
                ? wallAEdgeX
                : wall === "B"
                ? wallBEdgeX
                : wallCEdgeX;

            return (
              <g key={`shear-detail-${wall}`}>
                {/* White box for gap */}
                {gapFt > 0 && (
                  <>
                    {/* Gap box */}
                    <rect
                      x={wallX - 5}
                      width={highlightEdgeWidth + 2}
                      y={paddingTop + heightPx - gapPx - segmentPx - 6}
                      height={gapPx}
                      fill="white"
                    />
                    {/* Thin vertical black line through gap */}
                    <line
                      x1={wallX - 5 + (highlightEdgeWidth + 2) / 2}
                      x2={wallX - 5 + (highlightEdgeWidth + 2) / 2}
                      y1={paddingTop + heightPx - gapPx - segmentPx - 6}
                      y2={paddingTop + heightPx - segmentPx - 6}
                      stroke="black"
                      strokeWidth="1"
                    />
                  </>
                )}

                {/* Black box for segment (below gap) */}
                {segmentFt > 0 && (
                  <rect
                    x={wallX - 4}
                    width={highlightEdgeWidth}
                    y={paddingTop + heightPx - segmentPx - 6}
                    height={segmentPx}
                    fill="gray"
                  />
                )}
              </g>
            );
          })}

          {/* Horizontal labels on left side */}
          <line
            x1={structureStartX - 30}
            y1={paddingTop}
            x2={structureStartX}
            y2={paddingTop}
            stroke="rgba(128, 128, 128, 1)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <text
            x={structureStartX - 35}
            y={paddingTop}
            fontSize="12"
            fill="rgba(128, 128, 128, 1)"
            textAnchor="end"
            dominantBaseline="middle"
          >
            1
          </text>

          <line
            x1={structureStartX - 30}
            y1={paddingTop + heightPx}
            x2={structureStartX}
            y2={paddingTop + heightPx}
            stroke="rgba(128, 128, 128, 1)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <text
            x={structureStartX - 35}
            y={paddingTop + heightPx}
            fontSize="12"
            fill="rgba(128, 128, 128, 1)"
            textAnchor="end"
            dominantBaseline="middle"
          >
            2
          </text>
        </svg>
      </div>
      {/* <SolutionChord
        leftWidthFt={leftWidthFt}
        rightWidthFt={rightWidthFt}
        heightFt={heightFt}
        wTop={wTop}
        showRightWall={showRightWall}
        setCalculations={setCalculations}
      /> */}

      <ChordPlots
        leftWidthFt={leftWidthFt}
        rightWidthFt={rightWidthFt}
        wTop={wTop}
        heightFt={heightFt}
        showRightWall={showRightWall}
      />

      <CollectorPlots />
    </div>
  );
}
