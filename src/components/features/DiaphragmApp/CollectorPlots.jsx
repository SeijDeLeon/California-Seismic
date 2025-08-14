import React from "react";
import Plot from "react-plotly.js";

export default function CollectorPlots({
  walls, // full wall objects from inputs.wallLines
  uniformForce,
  leftWidthFt,
  rightWidthFt,
  heightFt,
}) {
  let reactions = {};
  let wallSegments = []; // store { name, startY, endY, shearDiff, force }

  // Determine reactions for left/right spans
  if (walls.length === 2) {
    const reaction = (leftWidthFt / 2) * uniformForce;
    reactions = { left: reaction };
    walls.forEach((wall) => {
      const netLength =
        wall.length - wall.openings.reduce((sum, o) => sum + o, 0);
      const unitShear = reaction / netLength;
      const shearDiff = unitShear - reaction / heightFt;
      wallSegments.push({
        name: wall.wall,
        startY: 0,
        endY: heightFt,
        shearDiff,
        force: shearDiff * heightFt,
      });
    });
  }

  if (walls.length === 3) {
    const reactionLeft = (leftWidthFt / 2) * uniformForce;
    const reactionRight = (rightWidthFt / 2) * uniformForce;
    reactions = { left: reactionLeft, right: reactionRight };

    walls.forEach((wall, idx) => {
      const netLength =
        wall.length - wall.openings.reduce((sum, o) => sum + o, 0);
      const reactionForWall = idx < 2 ? reactionLeft : reactionRight;
      const unitShear = reactionForWall / netLength;
      const shearDiff = unitShear - reactionForWall / heightFt;

      // Treat openings as breaking the wall into top/bottom segments
      if (wall.openings.length > 0) {
        let openingHeight = wall.openings[0][1] - wall.openings[0][0];
        let topSegHeight = wall.openings[0][0];
        let bottomSegHeight = heightFt - wall.openings[0][1];

        if (topSegHeight > 0) {
          wallSegments.push({
            name: wall.wall,
            startY: wall.openings[0][1],
            endY: heightFt,
            shearDiff,
            force: shearDiff * topSegHeight,
          });
        }
        if (bottomSegHeight > 0) {
          wallSegments.push({
            name: wall.wall,
            startY: 0,
            endY: wall.openings[0][0],
            shearDiff,
            force: shearDiff * bottomSegHeight,
          });
        }
      } else {
        wallSegments.push({
          name: wall.wall,
          startY: 0,
          endY: heightFt,
          shearDiff,
          force: shearDiff * heightFt,
        });
      }
    });
  }

  // Prepare plot data for Net Shear Force (box shape)
  const netShearX = [];
  const netShearY = [];
  wallSegments.forEach((seg) => {
    netShearX.push(0, seg.shearDiff, seg.shearDiff, 0);
    netShearY.push(seg.startY, seg.startY, seg.endY, seg.endY);
  });

  // Prepare plot data for Collector Force
  const collectorX = [];
  const collectorY = [];
  wallSegments.forEach((seg) => {
    collectorX.push(0, seg.force, seg.force, 0);
    collectorY.push(seg.startY, seg.startY, seg.endY, seg.endY);
  });

  return (
    <div>
      <Plot
        data={[
          {
            x: netShearX,
            y: netShearY,
            type: "scatter",
            mode: "lines",
            fill: "toself",
            name: "Net Shear Diff",
            line: { color: "black" },
          },
        ]}
        layout={{
          width: 300,
          height: 500,
          title: { text: "Net Shear Force" },
          yaxis: { title: "Height (ft)" },
          xaxis: { title: "Shear Diff (plf)" },
        }}
      />

      <Plot
        data={[
          {
            x: collectorX,
            y: collectorY,
            type: "scatter",
            mode: "lines",
            fill: "toself",
            name: "Collector Force",
            line: { color: "black" },
          },
        ]}
        layout={{
          width: 300,
          height: 500,
          title: { text: "Collector Force" },
          yaxis: { title: "Height (ft)" },
          xaxis: { title: "Force (lbs)" },
        }}
      />
    </div>
  );
}
