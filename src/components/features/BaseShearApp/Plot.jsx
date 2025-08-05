// src/DisplacementPlot.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const DisplacementPlot = ({ floors, displacementType, totalBaseShear }) => {
  // Build Y-axis story labels (Story 1 at bottom, Story N at top)
  const storyLabels = floors.map((_, index) => `Story ${index + 1}`).reverse();

  // Extract displacement values from floor data
  const displacements = floors
    .map((floor) =>
      
      displacementType === 'horizontal'
        ? floor.displacementX ?? 0
        : floor.displacementY ?? 0
    )
    .reverse(); // Reverse so top story appears at top in plot

  const titleText =
    displacementType === 'horizontal'
      ? 'Horizontal Displacement (in)'
      : 'Vertical Displacement (in)';

  const color = displacementType === 'horizontal' ? 'blue' : 'red';
  const symbol = displacementType === 'horizontal' ? 'circle' : 'square';

  return (
    <Plot
      data={[
        {
          x: displacements,
          y: storyLabels,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color, symbol },
          line: { color },
          name: titleText,
        },
      ]}
      layout={{
        width: 400,
        height: 400,
        title: {
          text: `<i>${titleText}</i>`,
          font: { size: 18 },
        },
        xaxis: {
          title: 'Displacement (in)',
          zeroline: false,
        },
        yaxis: {
          title: 'Story',
          autorange: 'reversed', // Top story appears at top
          tickmode: 'array',
          tickvals: storyLabels,
          ticktext: storyLabels,
        },
        margin: { l: 70, r: 30, b: 50, t: 50 },
        plot_bgcolor: '#f9f9f9',
      }}
      config={{ responsive: true }}
    />
  );
};

export default DisplacementPlot;