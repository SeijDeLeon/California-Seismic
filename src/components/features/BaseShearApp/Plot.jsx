// src/DisplacementPlot.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const DisplacementPlot = ({ floors, results, displacementType }) => {
  const floorsWithDisplacement = floors.map((floor, index) => {
    const Fvx = results.find(r => r.key === 'Fvx')?.value[index] || 0;

    // cumulativeV = Fvx at this story + all stories above
    const cumulativeV = results
      .find(r => r.key === 'Fvx')
      ?.value.slice(index)
      .reduce((sum, v) => sum + v, 0) || 0;

    return { ...floor, Fvx, cumulativeV };
  });

  const storyLabels = floorsWithDisplacement.map((_, index) => `Story ${index + 1}`);
  const displacements = floorsWithDisplacement.map((floor) =>
    displacementType === 'horizontal' ? floor.cumulativeV : floor.Fvx
  );

  const titleText =
    displacementType === 'horizontal'
      ? 'Horizontal Displacement (in)'
      : 'Vertical Displacement (in)';

  return (
    <Plot
      data={[
        {
          x: displacements,
          y: storyLabels,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color:'black', symbol:'circle' },
          line: { color:'black' },
          name: titleText,
        },
      ]}
      layout={{
        width: 375,
        height: 500,
        title: {
          text: `<i>${titleText}</i>`,
          font: { size: 18 },
        },
        xaxis: {
          title: 'Displacement (in)',
        },
        yaxis: {
          title: 'Story',
          tickmode: 'array',
          tickvals: storyLabels,
          ticktext: storyLabels,
        },
        margin: { l: 60, r: 55, b: 50, t: 50 },
        plot_bgcolor: '#f9f9f9',
      }}
      config={{ 
        responsive: true, 
        modeBarButtonsToRemove: ['toImage', 'sendDataToCloud', 'editInChartStudio', 'zoom2d', 'select2d', 'pan2d', 'lasso2d'],
      }}
    />
  );
};

export default DisplacementPlot;