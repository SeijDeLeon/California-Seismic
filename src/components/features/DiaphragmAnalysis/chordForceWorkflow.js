import calculateTotalShear from "../../../assets/data/calculations/diaphragmCalculations/calculateTotShear";
import calculateUnitShear from "../../../assets/data/calculations/diaphragmCalculations/calculateUnitShear";
import calculateMaxMoment from "../../../assets/data/calculations/diaphragmCalculations/calculateMaxMoment";
import calculateChordForce from "../../../assets/data/calculations/diaphragmCalculations/calculateChordForce";
import { MathJax } from "better-react-mathjax";
export function examineWall(wall){
    let hasThreeWalls = false;
    
    let wallGaps = {}; //map for indicating which walls have gaps
    
    // check for gaps in walls
    for (const key in wall) {
        if (wall[key].length === 3) {
            wallGaps[key] = "midGap";
        }
        else if(wall[key].length === 2) {
            wallGaps[key] = "endGap";
    }
        else{
            wallGaps[key] = "noGap";
        }
    }
    // check if we have 3 walls
    let wallLength = Object.keys(wall).length;
    if (wallLength === 3) {
        hasThreeWalls = true;
    }
    return { wallGaps, hasThreeWalls };
};

export function chordFWorkflow({input, solution}) {
    const { length, width, load } = input;
    const w = Number(load);
    const L = Number(width);
    const d = Number(length);

    let {wallGaps, hasThreeWalls} = examineWall(wall);

    const CalculateUnitShear = {
        title: "Calculate Unit Shear",
        content: null,

    };

    const CalculateMaxMoment = {
        title: "Calculate Max Moment",
        content: null,  
    };
    const CalculateMaxChordForce = {
        title: "Find Max Chord Force",
        content: null,
    };
  
    // need to look at saumya finished wall representation
    // mid wall Shear = sum of both exterior walls
    // take moment of the split diaphragm wrt its span and take max of the two
    // use that max moment to calculate chord force
    let V, unitV, M, C; 
    if (hasThreeWalls){
        
        CalculateMaxMoment.content = (
            <div>
                <p>
                    Max bending occurs at <MathJax inline>{"\\(x=L/2 \\)"}</MathJax>
                </p>
                <span className="font-mono text-sm">
                    <MathJax inline>{"\\(M=\\frac{wL^2}{8} \\)"}</MathJax>
                </span>
            </div>
        );
        CalculateMaxChordForce.content = (
            <div className="font-mono text-sm">
                <MathJax>{"\\(C=\\frac{M}{d}\\)"}</MathJax>
            </div>
        );


    } else {
        V = calculateTotalShear(w, L);
        unitV = calculateUnitShear(V, d);
        M = calculateMaxMoment(w, L);
        C = calculateChordForce(M, d);
        CalculateUnitShear.content = (
            <div className="font-mono text-sm">
                <MathJax>
                    {`\\(V=\\frac{wL}{2}=\\frac{${w}\\times${L}}{2}=${V} lb\\)`}
                </MathJax>
                <br />
                <MathJax>{`\\(v=\\frac{V}{d}=\\frac{${V}}{${d}}=${unitV} plf\\)`}</MathJax>
                
            </div>
        );

        CalculateMaxMoment.content = ( 
            <div className="font-mono text-sm">
                <p> Max bending occurs at <MathJax inline>{"\\(x=L/2 \\)"}</MathJax></p>
                <MathJax>
                    {`\\(M=\\frac{wL^2}{8}=\\frac{${w}\\times${L}^2}{8}=${M} plf\\)`}
                </MathJax>

            </div>
        );
        CalculateMaxChordForce.content = (
            <div className="font-mono text-sm">
                <MathJax>
                    {`\\(C=\\frac{M}{d}=\\frac{${M}}{${d}}=${C} plf\\)`}
                </MathJax>
            </div>
        );
    }

    return [CalculateUnitShear, CalculateMaxMoment, CalculateMaxChordForce];
}   
 

