import React from 'react';
import { renderArrow } from './Arrow';

const RenderSVG = ({ floors, forces, storyVs, totalBaseShear, totalHeight }) => {
  const scale = 4;
  const formatted_total_height = Number.isInteger(totalHeight) ? totalHeight : parseFloat(totalHeight.toFixed(2))
  
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
              <marker
                id="arrowhead"
                markerWidth="5"       
                markerHeight="3.5"     
                refX="3"             
                refY="1.75"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <polygon points="0 0, 5 1.75, 0 3.5" fill="black" />
              </marker>
              <marker
                id="arrowhead-up"
                markerWidth="5"       
                markerHeight="3.5"     
                refX="3"             
                refY="1.75"
                orient="270"
                markerUnits="strokeWidth"
              >
                <polygon points="0 0, 5 1.75, 0 3.5" fill="#888" />
              </marker>
              <marker
                id="arrowhead-down"
                markerWidth="5"       
                markerHeight="3.5"     
                refX="3"             
                refY="1.75"
                orient="90"
                markerUnits="strokeWidth"
              >
                <polygon points="0 0, 5 1.75, 0 3.5" fill="#888" />
              </marker>
                <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8">
                  <path d="M0,8 l8,-8 M-2,6 l4,4 M6,-2 l4,4" stroke="#999" strokeWidth="1" />
                </pattern>
            </defs>

            {(() => {
            const rectX = 150;
            const rectWidth = 200;
            let y = 50 + totalHeight * scale;

            return floors.map((floor, i) => {
                const h = floor.height * scale;
                const yTop = y - h;

                const Fx = Math.round(forces[i]);
                const Wx = Math.round(floor.weight);
                const storyV = Math.round(storyVs[i]);
                const formatted_height = Number.isInteger(floor.bottom) ? floor.bottom : parseFloat(floor.bottom.toFixed(1))
              
                const group = (
                <g key={i}>
                    {/* Black border */}
                    <line x1={rectX - 2} y1={yTop} x2={rectX + rectWidth + 2} y2={yTop} stroke="black" strokeWidth="4" />
                    <line x1={rectX} y1={yTop + 2} x2={rectX} y2={yTop + h - 2} stroke="black" strokeWidth="4" />
                    <line x1={rectX + rectWidth} y1={yTop + 2} x2={rectX + rectWidth} y2={yTop + h - 2} stroke="black" strokeWidth="4" />

                    {/* Gray frame inside */}
                    <line x1={rectX - 1} y1={yTop} x2={rectX + rectWidth + 1} y2={yTop} stroke="#D3D3D3" strokeWidth="2" />
                    <line x1={rectX} y1={yTop} x2={rectX} y2={yTop + h - 2} stroke="#D3D3D3" strokeWidth="2" />
                    <line x1={rectX + rectWidth} y1={yTop} x2={rectX + rectWidth} y2={yTop + h - 2} stroke="#D3D3D3" strokeWidth="2" />

                    {/* Fx arrow and label */}
                    {renderArrow({
                        xEnd: 142,
                        y: yTop,
                        forceValue: Fx,
                        label: `Fₓ = ${Fx.toLocaleString()} lb`,
                        direction: 'right',
                        labelPosition: 'start',
                        scaleFactor: 100
                    })}

                    {/* Wx and storyV */}
                    <text x={rectX + rectWidth / 2} y={yTop - 25} fontSize="11" textAnchor="middle">
                    <tspan>W</tspan><tspan baselineShift="sub" fontSize="10" dy="-4">x</tspan><tspan dy="4"> = {Wx}</tspan><tspan dx="3">lb</tspan>
                    </text>
                    <text x={rectX + rectWidth / 2} y={yTop - 10} fontSize="11" textAnchor="middle">
                    <tspan>story</tspan><tspan baselineShift="sub" fontSize="10" dy="-2">V</tspan><tspan dy="2"> = {storyV}</tspan><tspan dx="3">lb</tspan>
                    </text>

                    {/* Gray tick at floor top */}
                    <line
                    x1={rectX + rectWidth + 5}
                    y1={yTop}
                    x2={rectX + rectWidth + 45}
                    y2={yTop}
                    stroke="#888"
                    strokeWidth="1"
                    />

                    {/* Height arrow (two-way) */}
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
                    x={rectX + rectWidth + 35}
                    y={yTop + h / 2 - 10}
                    fontSize="11"
                    fill="#666"
                    dominantBaseline="middle"
                    transform={`rotate(-270, ${rectX + rectWidth + 40}, ${yTop + h / 2 - 10})`}
                    >
                    {formatted_height} ft
                    </text>
                </g>
                );

                y = yTop;
                return group;
            });
            })()}

            {/* Base platform with hatch */}
            <rect
              x={150 - 20}                    
              y={50 + totalHeight * scale}
              width={240}                
              height={20}
              fill="url(#hatch)"
            />

            {/* Top line of base platform */}
            <line
              x1={150 - 20}                  
              y1={50 + totalHeight * scale}
              x2={150 + 200 + 20}             
              y2={50 + totalHeight * scale}
              stroke="#999"
              strokeWidth={1}
            />

            {/* V Arrow at base */}
            {renderArrow({
              xEnd: (150 + 200) / 2, // center of building
              y: 50 + totalHeight * scale + 35,
              forceValue: totalBaseShear,
              label: `V = ${Math.round(totalBaseShear)} lb`,
              direction: 'left',
              labelPosition: 'middle',
              labelOffsetX: 50,
              scaleFactor: 100
            })}

            {/* Total hn arrow outside the building */}
            <line
              x1={150 + 200 + 70}
              y1={50 + 4}
              x2={150 + 200 + 70}
              y2={50 + totalHeight * scale - 4}
              stroke="#888"
              strokeWidth="1.5"
              markerStart="url(#arrowhead-up)"
              markerEnd="url(#arrowhead-down)"
            />
            <text
              x={150 + 200 + 85}
              y={25 + (totalHeight * scale) / 2}
              fontSize="11"
              fill="#666"
              dominantBaseline="middle"
              transform={`rotate(-270, ${150 + 200 + 85}, ${25 + (totalHeight * scale) / 2})`}
            >
              <tspan>h</tspan>
              <tspan baselineShift="sub" fontSize="12" dy="-2">n</tspan>
              <tspan dy="2"> = {formatted_total_height}</tspan>
              <tspan dx="3">ft</tspan>
            </text>
          </g>
      </svg>
    </div>
  );
};

export default RenderSVG;