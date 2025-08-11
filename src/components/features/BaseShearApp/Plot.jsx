// src/Plot.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const DisplacementPlot = () => {
  const storyLabels = ['1', '2', '3']; // Bottom to top: Story 1 at base

  const redDisplacement = [0.176, 0.176, 0];   // Story 1 → 2 → 3
  const blueDisplacement = [0.352, 0.176, 0];  // Story 1 → 2 → 3
  const baseShear = 0.352;

  return (
    <Plot
      data={[
        {
          x: redDisplacement,
          y: storyLabels,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red', symbol: 'square' },
          name: 'Vertical Force Distribution (Fx)',
        },
        {
          x: blueDisplacement,
          y: storyLabels,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'blue', symbol: 'circle' },
          name: 'Horizontal Force Distribution (Vx)',
        },
        {
          x: [baseShear],
          y: ['1'], // base only
          type: 'scatter',
          mode: 'markers',
          marker: { color: 'green', size: 12, symbol: 'diamond' },
          name: 'Base Shear (V)',
        },
      ]}
      layout={{
        width: 500,
        height: 600,
        title: {
          text: '<i>Base Shear Plot</i>',
          font: { size: 20 },
        },
        xaxis: {
          title: 'Displacement, in',
          tickmode: 'array',
          zeroline: false,
        },
        yaxis: {
          title: 'Story level',
          tickmode: 'array',
          tickvals: storyLabels,
          ticktext: storyLabels.map((label) => `Story ${label}`),
          zeroline: false,
          autorange: 'reversed', // Stories from top to bottom
        },
        plot_bgcolor: '#f9f9f9',
      }}
    />
  );
};

export default DisplacementPlot;