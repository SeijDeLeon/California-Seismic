// ChordPlots.jsx
import Plot from "react-plotly.js";

export default function ChordPlots({ Vmax, moment, chord, width }) {
  const halfWidth = width / 2;
  const momentY = moment * 1.1 || 10; // prevent zero height plots
  const chordY = chord * 1.1 || 10; // prevent zero height plots

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Shear Force Plot */}
      <Plot
        className="Shear"
        data={[
          {
            x: [-halfWidth, -halfWidth, halfWidth, halfWidth],
            y: [0, Vmax, -Vmax, 0],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "black" },
          },
        ]}
        layout={{
          width: 500,
          height: 300,
          title: { text: "Shear Force" },
          yaxis: {
            title: "Force (lb)",
            tickformat: ".1f",
            showgrid: false,
          },
        }}
      />

      {/* Moment Diagram */}
      <Plot
        className="Moment"
        data={[
          {
            x: [0, halfWidth, width],
            y: [0, moment, 0],
            type: "scatter",
            mode: "lines",
            marker: { color: "black" },
            line: { shape: "spline" },
          },
        ]}
        layout={{
          width: 500,
          height: 300,
          title: { text: "Moment Diagram" },
          xaxis: { range: [0, width], showgrid: false, title: "Width (ft)" },
          yaxis: {
            range: [0, momentY],
            showticklabels: true,
            showgrid: false,
            title: "Moment (lb-ft)",
            tickformat: ".1f",
          },
        }}
      />

      {/* Chord Force Plot */}
      <Plot
        className="Chord"
        data={[
          {
            x: [0, halfWidth, width],
            y: [0, chord, 0],
            type: "scatter",
            mode: "lines",
            marker: { color: "black" },
            line: { shape: "spline" },
          },
        ]}
        layout={{
          width: 500,
          height: 300,
          title: { text: "Chord Force" },
          xaxis: { range: [0, width], showgrid: false, title: "Width (ft)" },
          yaxis: {
            range: [0, chordY],
            showticklabels: true,
            showgrid: false,
            title: "Force (lb)",
            tickformat: ".1f",
          },
        }}
      />
    </div>
  );
}
