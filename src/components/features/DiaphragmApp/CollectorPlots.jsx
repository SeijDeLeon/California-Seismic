import React from "react";
import Plot from "react-plotly.js";

// Linear interpolation between 2 points
const interpolateLine = (x, y, resolution = 50) => {
  const newX = [];
  const newY = [];

  for (let i = 0; i < x.length - 1; i++) {
    const x0 = x[i];
    const x1 = x[i + 1];
    const y0 = y[i];
    const y1 = y[i + 1];

    for (let j = 0; j < resolution; j++) {
      const t = j / resolution;
      newX.push(x0 + t * (x1 - x0));
      newY.push(y0 + t * (y1 - y0));
    }
  }
  newX.push(x[x.length - 1]);
  newY.push(y[y.length - 1]);

  return { x: newX, y: newY };
};

export default function CollectorPlots() {
  const mu1 = { x: [0, 5, 10], y: [0, 20, 0] };
  const mu2 = { x: [10, 30, 50], y: [0, 40, 0] };

  const mu1Interp = interpolateLine(mu1.x, mu1.y, 100);
  const mu2Interp = interpolateLine(mu2.x, mu2.y, 100);

  return (
    <div>
      <Plot
        data={[
          {
            x: [0, 1, 1, -2, -2, 1, 1, 0],
            y: [0, 0, 4, 4, 8, 8, 12, 12],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "black" },
          },
        ]}
        layout={{ width: 300, height: 500, title: { text: "Net Shear Force" } }}
      />
      <Plot
        data={[
          {
            x: [0, 2, -2, 0],
            y: [0, 4, 8, 12],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "black" },
          },
        ]}
        layout={{ width: 300, height: 500, title: { text: "Collector Force" } }}
      />
    </div>
  );
}

{
  /* ok so - we also need the total shear force ( the sideways one with the total shear ) */
}
{
  /* this is uniform force times the depth */
}
