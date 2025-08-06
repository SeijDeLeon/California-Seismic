import { MathJax } from "better-react-mathjax";
import examineWall from "./chordForceWorkflow.js";
import calculateRx from "../../../assets/data/calculations/diaphragmCalculations/calculateRx.js";
import calculateVWall from "../../../assets/data/calculations/diaphragmCalculations/calculatevwall";
import calculateCollector from "../../../assets/data/calculations/diaphragmCalculations/calculateCollector.js";
import calculateTotalShear from "../../../assets/data/calculations/diaphragmCalculations/calculateTotShear.js";
import calculateUnitShear from "../../../assets/data/calculations/diaphragmCalculations/calculateuv.js";
function hasGap(wallGap){
    
    for (const key in wallGap) {
        if (wallGap[key] != "noGap") {
            return [true,key];
        }
    }
    return [false,null];


}
// calc total wall segment distance of a wall with an opening
function wallDistanceCovered(wall, wallNameWithGap){
    let distanceCovered = 0; // diaphragm depth of wall
    let distList = [] // list of distances for each segment
    for (const item in wall[wallNameWithGap]) {
        if (item.type === "wall segment"){
            distanceCovered += item.value;
            distList.push(item.value);

        }
    return {distanceCovered, distList};
}
}
export default function collectorFWorkflow({wall, input}) {
    const { length, width, load } = input;
    const w = Number(load);
    const L = Number(width);
    const d = Number(length);

    // Check if the wall has three walls and gaps
    const { wallGaps, hasThreeWalls } = examineWall(wall);
    const [hasWallGap, wallNameWithGap ] = hasGap(wallGaps);// identify walls with gap
    const {distanceOfWall, segmentsOfWall} = wallDistanceCovered(wall, wallNameWithGap);


    const CalculateReactionForce = {
        title: "Calculate Reaction Force On Wall With Gap",
        content: null,
    };
    const CalculateUnitWallShear = {
        title: "Calculate and Find The Unit Wall Shear For Walls With a Gap",
        content: null,
    };
    const CalculateCollectorForce= {
        title: "Create Collector Force Diagram",
        content: null,
    };
    let totShear, diaphragmShear, R, vWall;

    if (!hasWallGap){
        return {
            title: "No Gaps Detected",
            content: (
                <div>
                    <p>No Collector Force.</p>
                </div>
            )
        };
    } else if (!hasThreeWalls){
        totShear = calculateTotalShear(w, L);
        diaphragmShear = calculateUnitShear(totShear, d);
        R = calculateRx(L, w);
        vWall = calculateVWall(R,wallDistanceCovered)
        let {maxCollectorForce, longestSeg, netUnitWallShear} = calculateCollector(diaphragmShear, vWall, segmentsOfWall);
        

        CalculateReactionForce.content = (
            <div className="font-mono text-sm">
                <MathJax>{`\\(R_${wallNameWithGap}=\\frac{wL}{2}=\\frac{${w}\\times${L}}{2}=${R} lb\\)`}</MathJax>
                <br />
            </div>

        );
        CalculateUnitWallShear.content = (
            <div className="font-mono text-sm">
                <MathJax>{`\\(v_{${wallNameWithGap}}=\\frac{R}{d}=\\frac{${R}}{${distanceOfWall}}=${vWall} plf\\)`}</MathJax>
            </div>
        );
        CalculateCollectorForce.content = (
            <div className="font-mono text-sm">
                <p>Net Unit Shear = Wall Unit Shear - uniform load = {vWall} - {L} = {netUnitWallShear}</p>
                <MathJax>
                    {`\\(\\text{Net Unit SHear} = \\text{Wall Unit Shear} - \\text{Uniform Load} = ${vWall} \\times ${L} = ${netUnitWallShear} plf\\)`}
                </MathJax>
                <br />
                <MathJax>
                {`\\(\\text{Max Collector}_${wallNameWithGap} = \\text{Net Unit Shear} \\times \\text{Max Segment Length} = ${netUnitWallShear} \\times ${longestSeg} = ${maxCollectorForce} \\text{ plf}\\)`}
                </MathJax>
                <br />
                
            </div>
        );



    }

    return [CalculateReactionForce, CalculateUnitWallShear, CalculateCollectorForce];

    

}