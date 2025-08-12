// this needs some styling work - but is functional at least
import React from "react";
import Plot from "react-plotly.js";
import calculateTotalShear from "../../../assets/data/calculations/diaphragmCalculations/calculateTotShear";
import calculateMaxMoment from "../../../assets/data/calculations/diaphragmCalculations/calculateMaxMoment";
import calculateChordForce from "../../../assets/data/calculations/diaphragmCalculations/calculateMaxChordForce";

export default function ChordPlots({
  leftWidthFt,
  rightWidthFt,
  wTop,
  heightFt,
  showRightWall,
}) {
  const pointsPerSpan = 100;
  const peakColor = "#60A5FA";

  const findLocalMaxima = (arr = [], minSeparation = 3) => {
    const n = arr.length;
    const peaks = [];
    if (n === 0) return peaks;

    for (let i = 0; i < n; i++) {
      const prev = i > 0 ? arr[i - 1] : -Infinity;
      const next = i < n - 1 ? arr[i + 1] : -Infinity;
      if (
        arr[i] >= prev &&
        arr[i] >= next &&
        (arr[i] > prev || arr[i] > next)
      ) {
        // Only add if it's far enough from the last peak
        if (peaks.length === 0 || i - peaks[peaks.length - 1] > minSeparation) {
          peaks.push(i);
        }
      }
    }
    return peaks;
  };

  const genShear = (w, span, startX) => {
    const Vmax = calculateTotalShear(w, span);
    const dx = span / (pointsPerSpan - 1);
    const x = [];
    const y = [];
    for (let i = 0; i < pointsPerSpan; i++) {
      const xi = startX + i * dx;
      const ratio = (i / (pointsPerSpan - 1)) * 2 - 1;
      x.push(xi);
      y.push(-ratio * Vmax);
    }
    return { x, y };
  };

  const genMoment = (w, span, startX) => {
    const Mmax = calculateMaxMoment(w, span);
    const dx = span / (pointsPerSpan - 1);
    const x = [];
    const y = [];
    for (let i = 0; i < pointsPerSpan; i++) {
      const xi = startX + i * dx;
      const sineVal = Math.sin(Math.PI * (i / (pointsPerSpan - 1)));
      x.push(xi);
      y.push(sineVal * Mmax);
    }
    return { x, y };
  };

  const genChord = (w, span, startX, height) => {
    const Mmax = calculateMaxMoment(w, span);
    const Cmax = calculateChordForce(Mmax, height);
    const dx = span / (pointsPerSpan - 1);
    const x = [];
    const y = [];
    for (let i = 0; i < pointsPerSpan; i++) {
      const xi = startX + i * dx;
      const sineVal = Math.sin(Math.PI * (i / (pointsPerSpan - 1)));
      x.push(xi);
      y.push(sineVal * Cmax);
    }
    return { x, y };
  };

  const shearLeft = genShear(wTop, leftWidthFt, 0);
  const momentLeft = genMoment(wTop, leftWidthFt, 0);
  const chordLeft = genChord(wTop, leftWidthFt, 0, heightFt);

  let shearX = [...shearLeft.x];
  let shearY = [...shearLeft.y];
  let momentX = [...momentLeft.x];
  let momentY = [...momentLeft.y];
  let chordX = [...chordLeft.x];
  let chordY = [...chordLeft.y];

  if (showRightWall) {
    const shearRight = genShear(wTop, rightWidthFt, leftWidthFt);
    const momentRight = genMoment(wTop, rightWidthFt, leftWidthFt);
    const chordRight = genChord(wTop, rightWidthFt, leftWidthFt, heightFt);

    shearX = [...shearX, ...shearRight.x];
    shearY = [...shearY, ...shearRight.y];
    momentX = [...momentX, ...momentRight.x];
    momentY = [...momentY, ...momentRight.y];
    chordX = [...chordX, ...chordRight.x];
    chordY = [...chordY, ...chordRight.y];
  }

  const momentPeaks = findLocalMaxima(momentY);
  const chordPeaks = findLocalMaxima(chordY);

  const makeAnnotations = (xArr, yArr, peaks) =>
    peaks.map((i) => ({
      x: xArr[i],
      y: yArr[i],
      text: `Max: ${yArr[i].toFixed(2)}`,
      showarrow: false,
      font: { size: 11, color: peakColor },
      yanchor: "bottom",
      yshift: 6,
      xanchor: "center",
      xshift: 0,
      ax: 0,
      ay: 0,
    }));

  const baseLayout = (title, yTitle, legendBelow = true, annotations = []) => ({
    title: { text: title, font: { size: 16 } },
    autosize: true,
    height: 340,
    margin: { t: 40, b: legendBelow ? 80 : 50, l: 60, r: 30 }, // more bottom margin for legends
    xaxis: { title: "Length (ft)", automargin: true },
    yaxis: { title: yTitle, automargin: true },
    annotations,
    ...(legendBelow && {
      legend: {
        orientation: "h",
        y: -0.45, // move further down
        x: 0.5,
        xanchor: "center",
      },
    }),
  });

  const plotConfig = { responsive: true, displaylogo: false };

  return (
    <div className="w-full flex flex-col gap-10 p-4 items-center">
      {/* Shear */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[60%]" style={{ overflow: "visible" }}>
          <Plot
            data={[
              {
                x: shearX,
                y: shearY,
                type: "scatter",
                mode: "lines",
                name: "Shear",
                line: { width: 2 },
              },
            ]}
            layout={baseLayout("Shear Diagram", "V (plf)")}
            config={plotConfig}
            useResizeHandler
            style={{ width: "100%", height: 340 }}
          />
        </div>
      </div>

      {/* Moment + Chord side-by-side */}
      <div className="w-full flex flex-col md:flex-row gap-10 justify-center items-stretch">
        {/* Moment */}
        <div
          className="flex-1 max-w-[560px] min-w-0"
          style={{ overflow: "visible" }}
        >
          <Plot
            data={[
              {
                x: momentX,
                y: momentY,
                type: "scatter",
                mode: "lines",
                name: "Moment",
                line: { width: 2 },
              },
              {
                x: momentPeaks.map((i) => momentX[i]),
                y: momentPeaks.map((i) => momentY[i]),
                type: "scatter",
                mode: "markers",
                name: "Peak Moment",
                marker: { color: peakColor, size: 8 },
                cliponaxis: false,
              },
            ]}
            layout={baseLayout(
              "Moment Diagram",
              "M (ft-lb)",
              true,
              makeAnnotations(momentX, momentY, momentPeaks)
            )}
            config={plotConfig}
            useResizeHandler
            style={{ width: "100%", height: 340 }}
          />
        </div>

        {/* Chord */}
        <div
          className="flex-1 max-w-[560px] min-w-0"
          style={{ overflow: "visible" }}
        >
          <Plot
            data={[
              {
                x: chordX,
                y: chordY,
                type: "scatter",
                mode: "lines",
                name: "Chord Force",
                line: { width: 2 },
              },
              {
                x: chordPeaks.map((i) => chordX[i]),
                y: chordPeaks.map((i) => chordY[i]),
                type: "scatter",
                mode: "markers",
                name: "Peak Chord",
                marker: { color: peakColor, size: 8 },
                cliponaxis: false,
              },
            ]}
            layout={baseLayout(
              "Chord Force",
              "C (lb)",
              true,
              makeAnnotations(chordX, chordY, chordPeaks)
            )}
            config={plotConfig}
            useResizeHandler
            style={{ width: "100%", height: 340 }}
          />
        </div>
      </div>
    </div>
  );
}
