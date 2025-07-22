import Plot from "react-plotly.js";

export default function ChordPlots() {
  return (
    <div>
      <div>
        <Plot
          className="Shear"
          data={[
            {
              x: [-10, -10, 10, 10],
              y: [0, 1000, -1000, 0],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "black" },
            },
          ]}
          layout={{ width: 500, height: 300, title: { text: "Shear Force" } }}
        />
      </div>
      <Plot
        className="Moment"
        data={[
          {
            x: [0, 5, 10],
            y: [0, 20, 0],
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
          xaxis: {
            range: [0, 10], // Explicitly set x-axis range
            showgrid: false,
          },
          yaxis: {
            range: [0, 21], // Explicitly set y-axis range
            showticklabels: true,
            showgrid: false,
            tickformat: ".1f", // Format y-axis tick labels
          },
        }}
      />
      <Plot
        className="Chord"
        data={[
          {
            x: [0, 5, 10],
            y: [0, 10, 0],
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
          xaxis: {
            range: [0, 10], // Explicitly set x-axis range
            showgrid: false,
          },
          yaxis: {
            range: [0, 21], // Explicitly set y-axis range
            showticklabels: true,
            showgrid: false,
            tickformat: ".1f", // Format y-axis tick labels
          },
        }}
      />
    </div>
  );
}

{
  /* the chord function here */
}
{
  /* force * length/2 */
}

{
  /* the moment diagram here */
}
{
  /* force * length^2/8(depth)  is the peak moment */
}
