import { renderArrow } from './Arrow';

const RenderSVG = ({ floors, forces, storyVs, totalBaseShear, totalHeight }) => {
  const scale = 4;

  const formatFeetInches = (ft) => {
    if (typeof ft !== 'number' || !isFinite(ft)) return '—';
    const FEET = '\u2032', INCH = '\u2033';
    const totalInches = Math.round(ft * 12);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}${FEET}-${inches}${INCH}`;
  };

  const rectX = 150;
  const rectWidth = 200;

  const fxScale = 100;          
  const fxArrowTipX = 142;      

  const fxTailPts = [];

  const groundY = 50 + totalHeight * scale;
  const tickX1 = rectX + rectWidth + 100;
  const tickX2 = rectX + rectWidth + 130;
  const circleX = rectX + rectWidth + 150;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width="800"
        height={`${totalHeight * scale + 100}px`}
        viewBox={`0 0 600 ${totalHeight * scale + 100}`}
        className="mx-auto block"
        preserveAspectRatio="xMidYMax meet"
      >
        <g transform="translate(50,0)">
          <defs>
            <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="3" refY="1.75" orient="auto" markerUnits="strokeWidth">
              <polygon points="0 0, 5 1.75, 0 3.5" fill="black" />
            </marker>
            <marker id="arrowhead-up" markerWidth="5" markerHeight="3.5" refX="3" refY="1.75" orient="270" markerUnits="strokeWidth">
              <polygon points="0 0, 5 1.75, 0 3.5" fill="#888" />
            </marker>
            <marker id="arrowhead-down" markerWidth="5" markerHeight="3.5" refX="3" refY="1.75" orient="90" markerUnits="strokeWidth">
              <polygon points="0 0, 5 1.75, 0 3.5" fill="#888" />
            </marker>
            <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8">
              <path d="M0,8 l8,-8 M-2,6 l4,4 M6,-2 l4,4" stroke="#999" strokeWidth="1" />
            </pattern>
          </defs>

          {(() => {
            let y = 50 + totalHeight * scale;

            return floors.map((floor, i) => {
              const h = floor.height * scale;
              const yTop = y - h;

              const Fx = Math.round(forces[i]);
              const Wx = Math.round(floor.weight);
              const storyV = Math.round(storyVs[i]);

              const tickX1 = rectX + rectWidth + 100;
              const tickX2 = rectX + rectWidth + 130;
              const circleX = rectX + rectWidth + 150;

              const group = (
                <g key={i}>
                  {/* Story frame */}
                  <line x1={rectX - 2} y1={yTop} x2={rectX + rectWidth + 2} y2={yTop} stroke="black" strokeWidth="4" />
                  <line x1={rectX} y1={yTop + 2} x2={rectX} y2={yTop + h - 2} stroke="black" strokeWidth="4" />
                  <line x1={rectX + rectWidth} y1={yTop + 2} x2={rectX + rectWidth} y2={yTop + h - 2} stroke="black" strokeWidth="4" />

                  {/* Light inner frame */}
                  <line x1={rectX - 1} y1={yTop} x2={rectX + rectWidth + 1} y2={yTop} stroke="#D3D3D3" strokeWidth="2" />
                  <line x1={rectX} y1={yTop} x2={rectX} y2={yTop + h - 2} stroke="#D3D3D3" strokeWidth="2" />
                  <line x1={rectX + rectWidth} y1={yTop} x2={rectX + rectWidth} y2={yTop + h - 2} stroke="#D3D3D3" strokeWidth="2" />

                  {/* Fx arrow + capture tail for connector */}
                  {renderArrow({
                    xEnd: fxArrowTipX,
                    y: yTop,
                    forceValue: Fx,
                    label: `Fₓ = ${Fx.toLocaleString()} lb`,
                    direction: 'right',
                    labelPosition: 'start',
                    scaleFactor: fxScale,
                    onMetrics: ({ xStart, y }) => fxTailPts.push([xStart, y]),
                  })}

                  {/* Wx and storyV */}
                  <text x={rectX + rectWidth / 2} y={yTop - 25} fontSize="11" textAnchor="middle">
                    <tspan>W</tspan><tspan baselineShift="sub" fontSize="10" dy="-4">x</tspan><tspan dy="4"> = {Wx.toLocaleString()}</tspan><tspan dx="3">lb</tspan>
                  </text>
                  <text x={rectX + rectWidth / 2} y={yTop - 10} fontSize="11" textAnchor="middle">
                    <tspan>story</tspan><tspan baselineShift="sub" fontSize="10" dy="-2">V</tspan><tspan dy="2"> = {storyV.toLocaleString()}</tspan><tspan dx="3">lb</tspan>
                  </text>

                  {/* Height tick + arrow */}
                  <line x1={rectX + rectWidth + 5} y1={yTop} x2={rectX + rectWidth + 45} y2={yTop} stroke="#888" strokeWidth="1" />
                  <line
                    x1={rectX + rectWidth + 30}
                    y1={yTop + 4}
                    x2={rectX + rectWidth + 30}
                    y2={yTop + h - 4}
                    stroke="#888"
                    strokeWidth="1.5"
                    markerStart="url(#arrowhead-up)"
                    markerEnd="url(#arrowhead-down)"
                  />
                  <text
                    x={rectX + rectWidth + 30}
                    y={yTop + h / 2 - 10}
                    fontSize="12"
                    fill="#666"
                    dominantBaseline="middle"
                    transform={`rotate(-270, ${rectX + rectWidth + 40}, ${yTop + h / 2 - 10})`}
                  >
                    {formatFeetInches(floor.height)}
                  </text>

                  {/* Right-side tick + circled floor number */}
                  <line x1={tickX1} y1={yTop} x2={tickX2} y2={yTop} stroke="#555" strokeWidth="1.5" />
                  <circle cx={circleX} cy={yTop} r="14" fill="none" stroke="#333" strokeWidth="1.5" />
                  <text x={circleX} y={yTop + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="#333">
                    {i + 2}
                  </text>
                </g>
              );

              y = yTop;
              return group;
            });
          })()}

          {/* Connect all Fx arrow tails */}
          {fxTailPts.length > 1 && (
            <polyline
              points={fxTailPts.map(([x, y]) => `${x},${y}`).join(' ')}
              fill="none"
              stroke="#555"
              strokeWidth="2"
            />
          )}

          {/* Base platform */}
          <rect x={rectX - 20} y={50 + totalHeight * scale} width={rectWidth + 40} height={20} fill="url(#hatch)" />
          <line x1={rectX - 20} y1={50 + totalHeight * scale} x2={rectX + rectWidth + 20} y2={50 + totalHeight * scale} stroke="#999" strokeWidth={1} />

          {/* V at base */}
          {renderArrow({
            xEnd: (rectX + rectWidth) / 2,
            y: 50 + totalHeight * scale + 35,
            forceValue: totalBaseShear,
            label: `V = ${(Math.round(totalBaseShear)).toLocaleString()} lb`,
            direction: 'left',
            labelPosition: 'middle',
            labelOffsetX: 100,    
            scaleFactor: 100,
          })}

          {/* Level 1 label */}
          <line x1={tickX1} y1={groundY} x2={tickX2} y2={groundY} stroke="#555" strokeWidth="1.5" />
          <circle cx={circleX} cy={groundY} r="14" fill="none" stroke="#333" strokeWidth="1.5"/>
          <text x={circleX} y={groundY + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="#333"> 1 </text>

          {/* Total h_n */}
          <line
            x1={rectX + rectWidth + 70}
            y1={50 + 4}
            x2={rectX + rectWidth + 70}
            y2={50 + totalHeight * scale - 4}
            stroke="#888"
            strokeWidth="1.5"
            markerStart="url(#arrowhead-up)"
            markerEnd="url(#arrowhead-down)"
          />
          <text
            x={rectX + rectWidth + 80}
            y={25 + (totalHeight * scale) / 2}
            fontSize="12"
            fill="#666"
            dominantBaseline="middle"
            transform={`rotate(-270, ${rectX + rectWidth + 85}, ${25 + (totalHeight * scale) / 2})`}
          >
            <tspan>h</tspan>
            <tspan baselineShift="sub" fontSize="12" dy="-2">n</tspan>
            <tspan dy="2"> = {formatFeetInches(totalHeight)}</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default RenderSVG;