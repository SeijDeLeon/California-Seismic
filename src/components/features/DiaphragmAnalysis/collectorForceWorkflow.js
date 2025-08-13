import { MathJax } from "better-react-mathjax";
import examineWall from "./chordForceWorkflow.js";
import calculateRx from "../../../assets/data/calculations/diaphragmCalculations/calculateReactionForce.js";
import calculateVWall from "../../../assets/data/calculations/diaphragmCalculations/calculateWallUnitShear.js";
import calculateCollector from "../../../assets/data/calculations/diaphragmCalculations/calculateMaxCollector.js";
import calculateTotalShear from "../../../assets/data/calculations/diaphragmCalculations/calculateTotShear.js";
import calculateUnitShear from "../../../assets/data/calculations/diaphragmCalculations/calculateUnitShear.js";

// returns if diaphragm has gaps and list of the wall names with the gaps
function hasGap(input){

    let inputWallLines = input.wallLines; // list of wall objects [ {wall A}, {wallB}]
    let hasWallGap = false;
    let wallGaps = [];
    for (const wall of inputWallLines) {
        if (wall.openings && wall.openings.length > 0) {
            hasWallGap = true;
            const wallNameWithGap = wall.wall; // name of wall
            wallGaps.push(wallNameWithGap);
        }
    }

    return { hasWallGap, wallGaps };

}
// calc total wall segment distance of a wall with an opening
function wallDistanceCovered(segmentList){
    let distanceCovered = 0;
    for (const segment of segmentList) {
        distanceCovered += segment;
    }
    return distanceCovered;
}

function calculateWallSegments(inputWallLines, solution){
    let segmentList = {};
    //[0,10] // [10,40]
    //possible rework for gap at beginning & bottom since opening lst could just be 1
    
    for (const wall of inputWallLines) {
        if (wall.openings.length > 0) {
            let segment = []
            //gap at beginning of wall
            if (wall.openings[0][0] === 0){
                

                segment.push(wall.length-wall.openings[0][1]);
            }
            // gap at bottom of wall
            else if (wall.openings[0][1] === wall.length){
                segment.push(wall.openings[0][0]);
            } 
            //gap at middle of wall
            else{
                console.log(wall.openings[0][1])
                segment.push(wall.openings[0][0]);
                segment.push(wall.length-wall.openings[0][1]-wall.openings[0][0]);

            }
            const matchingWall = solution.wallLines.find(solWall => solWall.wall === wall.wall);
            const reactionForce = matchingWall ? matchingWall.wallShear : 0;
            const distCovered = wallDistanceCovered(segment)
            const wallUnitShear = calculateVWall(reactionForce, distCovered);
            // calculate collector force
            // unit dia shear, unit wall Shear, segments
            // need to print out wall unit shear, unit diaphragm shear, length of longest segment
            let unitDiaShear;

            unitDiaShear =
                matchingWall.diaUnitShearLeft === null ? matchingWall.diaUnitShearRight :
                matchingWall.diaUnitShearRight === null ? matchingWall.diaUnitShearLeft :
                matchingWall.diaUnitShearLeft + matchingWall.diaUnitShearRight;

            const [collectorForce, longestSeg, netShear] = calculateCollector(unitDiaShear,wallUnitShear,segment);




            // contains all information for calculations of collector force within each file
            segmentList[wall.wall] = {wallName: wall.wall, segments: segment, 
                distanceCovered: distCovered, reactionForce: reactionForce, 
                wallUnitShear: wallUnitShear,
                collectorForce: collectorForce,
                longestSeg: longestSeg,
                netShear: netShear,
                unitDiaShear: unitDiaShear
            };
    }
}
    return segmentList; //dictionary of wall names only with gaps with value of segments and distcovered
}


export default function collectorFWorkflow({ input, solution }) {
    const load = input.uniformForces[0].startForce; // Assuming uniform load is the same for all walls
    const wallCount = input.wallLines.length;
    
    // Check if the wall has gaps
    const { hasWallGap, wallGaps } = hasGap(input); // [boolean, list of wallName with gaps]
    
    if (!hasWallGap) {
        return [{
            title: "No Gaps Detected",
            content: (
                <div>
                    <p>No Collector Force.</p>
                </div>
            )
        }];
    }

    const collectorObj = calculateWallSegments(input.wallLines, solution);

    const CalculateReactionForce = {
        title: "Calculate Reaction Force On Wall With Gap",
        content: (
            <div className="font-mono text-sm">
                {Object.values(collectorObj).map((wall, index) => {
                    const wallIndex = input.wallLines.findIndex(w => w.wall === wall.wallName);
                    let formula;
                    
                    if (wallCount === 2) {
                        formula = `\\frac{${load} \\times ${input.horizontalWallLengths[0]}}{2}`;
                    } else if (wallCount === 3) {
                        if (wallIndex === 1) { // Middle wall - gets sum of both end reactions
                            formula = `\\frac{${load} \\times ${input.horizontalWallLengths[0]}}{2} + \\frac{${load} \\times ${input.horizontalWallLengths[1]}}{2}`;
                        } else if (wallIndex === 0) { // Left wall - uses first span
                            formula = `\\frac{${load} \\times ${input.horizontalWallLengths[0]}}{2}`;
                        } else { // Right wall - uses second span
                            formula = `\\frac{${load} \\times ${input.horizontalWallLengths[1]}}{2}`;
                        }
                    }
                    
                    return (
                        <div key={index}>
                            <MathJax>{`\\(R_{${wall.wallName}} = ${formula} = ${wall.reactionForce} \\text{ lb}\\)`}</MathJax>
                            <br />
                        </div>
                    );
                })}
            </div>
        )
    };

    const CalculateUnitWallShear = {
        title: "Calculate and Find The Unit Wall Shear For Walls With a Gap",
        content: (
            <div className="font-mono text-sm">
                {Object.values(collectorObj).map((wall, index) => (
                    <div key={index}>
                        <MathJax>{`\\(v_{${wall.wallName}} = \\frac{R_{${wall.wallName}}}{\\text{Effective Length}} = \\frac{${wall.reactionForce}}{${wall.distanceCovered}} = ${(wall.wallUnitShear || 0).toFixed(2)} \\text{ plf}\\)`}</MathJax>
                        <br />
                    </div>
                ))}
            </div>
        )
    };

    const CalculateCollectorForce = {
        title: "Calculate Collector Force",
        content: (
            <div className="font-mono text-sm">
                {Object.values(collectorObj).map((wall, index) => (
                    <div key={index} className="mb-4">
                        <h4 className="font-semibold mb-2">Wall {wall.wallName}:</h4>
                        <div className="mb-2">
                            <strong>Wall segments:</strong> [{wall.segments.join(', ')}] ft
                        </div>
                        <div className="mb-2">
                            <strong>Unit Diaphragm Shear:</strong> {(wall.unitDiaShear || 0).toFixed(2)} plf
                        </div>
                        <MathJax>{`\\(\\text{Net Unit Shear} = v_{${wall.wallName}} - v_{dia} = ${(wall.wallUnitShear || 0).toFixed(2)} - ${(wall.unitDiaShear || 0).toFixed(2)} = ${(wall.netShear || 0).toFixed(2)} \\text{ plf}\\)`}</MathJax>
                        <br />
<MathJax>{`
  \\[
    \\begin{aligned}
      \\text{Max Collector}_{${wall.wallName}} &= \\text{Net Unit Shear} \\times \\text{Longest Segment} \\\\
      &= ${(wall.netShear || 0).toFixed(2)} \\times ${wall.longestSeg} \\\\
      &= \\Omega${(wall.collectorForce || 0).toFixed(2)} \\text{ plf}
    \\end{aligned}
  \\]
`}</MathJax>
                        <br />
                    </div>
                ))}
            </div>
        )
    };

    return [CalculateReactionForce, CalculateUnitWallShear, CalculateCollectorForce];
}