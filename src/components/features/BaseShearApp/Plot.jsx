// src/DisplacementPlot.jsx
import Plot from 'react-plotly.js';

const DisplacementPlot = ({ floors, results, displacementType }) => {
  const FvxArr = results.find(r => r.key === 'Fvx')?.value ?? [];

  const floorsWithDisplacement = floors.map((floor, index) => {
    const Fvx = FvxArr[index] || 0;
    const cumulativeV = FvxArr.slice(index).reduce((sum, v) => sum + v, 0) || 0;
    return { ...floor, Fvx, cumulativeV };
  });

  const storyLabels = [
    'Level 1',
    ...floorsWithDisplacement.map((_, i) => `Level ${i + 2}`)
  ];

  const displacements = [
    0,
    ...floorsWithDisplacement.map(f =>
      displacementType === 'horizontal' ? f.cumulativeV : f.Fvx
    )
  ];

  const titleText =
    displacementType === 'horizontal'
      ? 'Horizontal Force Distribution'
      : 'Vertical Force Distribution';

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={[
          {
            x: displacements,
            y: storyLabels,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: "#60A5FA", symbol: 'circle' },
            line: { color: "#60A5FA" },
            name: titleText,
          },
        ]}
        layout={{
          title: { text: `<i>${titleText}</i>`, font: { size: 18 } },
          autosize: true,
          xaxis: { title: 'Displacement (in)' },
          yaxis: {
            title: 'Levels',
            tickmode: 'array',
            tickvals: storyLabels,
            ticktext: storyLabels,
          },
          margin: { l: 60, r: 55, b: 50, t: 50 },
          plot_bgcolor: '#f9f9f9',
        }}
        config={{
          responsive: true,
          modeBarButtonsToRemove: [
            'toImage','sendDataToCloud','editInChartStudio',
            'zoom2d','select2d','pan2d','lasso2d'
          ],
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default DisplacementPlot;
