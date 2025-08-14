import calculateTotalShear from "../../../../assets/data/calculations/diaphragmCalculations/calculateTotShear";
import calculateUnitShear from "../../../../assets/data/calculations/diaphragmCalculations/calculateUnitShear";
import calculateMaxMoment from "../../../../assets/data/calculations/diaphragmCalculations/calculateMaxMoment";
import calculateChordForce from "../../../../assets/data/calculations/diaphragmCalculations/calculateMaxChordForce";
import { MathJax } from "better-react-mathjax";

function chordObject(input,solution){
    const chordObj = {};

    const inputWallLines = input.wallLines;
    const outputWallLines = solution.wallLines;
    const load = input.uniformForces[0].startForce; // Assuming uniform load is the same for all walls
    const depth = inputWallLines[0].length; // Assuming depth is the same for all walls

    const L = Number(input.horizontalWallLengths[0]);
    let i = 0;
    const diaphragms = ["l","r"];
    for (const horizontalLength of input.horizontalWallLengths ){
        let totShear = calculateTotalShear(load, horizontalLength);
        let unitShear = calculateUnitShear(totShear, depth);
        let maxMoment = calculateMaxMoment(load, horizontalLength);
        let chordForce = calculateChordForce(maxMoment, depth);
        const key = inputWallLines.length >= 3 ? `D_${diaphragms[i]}` : '';

        chordObj[key] = {
            totShear: totShear,
            unitShear: unitShear,
            maxMoment: maxMoment,
            chordForce: chordForce,
            horizontalLength: horizontalLength,
            depth: depth,
            }
        i++;

    }

    return chordObj;

    

    
}

export function chordFWorkflow({input, solution}) {
    // input has R = V and unit diaphragm shear for each wall
    const inputWallLines = input.wallLines;
    const outputWallLines = solution.wallLines;
    const load = input.uniformForces[0].startForce; // Assuming uniform load is the same for all walls
    const chordObj = chordObject(input, solution);
    

    


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
  


        CalculateUnitShear.content = (
            <div className="font-mono text-sm">
                {Object.entries(chordObj).map(([key, value], index) => (

                    <div key={index}>

                       <MathJax>
{`\\(V_{${key}}=\\frac{wL_{${key}}}{2}=\\frac{${load}\\times${value.horizontalLength}}{2}=${value.totShear.toFixed(2)} \\text{lb}\\)`}                </MathJax>
                <br />
                <MathJax>{`\\(v_{${key}}=\\frac{V_{${key}}}{d}=\\frac{${value.totShear}}{${value.depth}}=${value.unitShear.toFixed(2)} \\text{plf}\\)`}</MathJax>
                        </div>
                ))}
                
            </div>
            
        );

        CalculateMaxMoment.content = ( 
            <div className="font-mono text-sm">
                {Object.entries(chordObj).map(([key, value], index) => (
                    <div key={index}>
                        <MathJax>
                            {`\\(M_{${key}}=\\frac{wL^2_{${key}}}{8}=\\frac{${load}\\times${value.horizontalLength}^2}{8}=${value.maxMoment.toFixed(2)} \\text{plf}\\)`}
                        </MathJax>
                        <br />
                    </div>
                ))}
                

            </div>
        );




        let maxCF = -Infinity;

        for (const [key, value] of Object.entries(chordObj)) {
            if (value.chordForce > maxCF) {
                maxCF = value.chordForce;
            }
        }
        CalculateMaxChordForce.content = (
            <div className="font-mono text-sm">
                {Object.entries(chordObj).map(([key, value], index) => (
                    
                    <div key={index}> 
                        <MathJax>
                            {`\\(C_{${key}}=\\frac{M_{${key}}}{d}=\\frac{${value.maxMoment}}{${value.depth}}=${value.chordForce.toFixed(2)}\\text{plf}\\)`}
                        </MathJax>
                        <br />

              
                    </div>
                    
        ))}
        <div>
            <MathJax>
                {`\\(C_{max}={${maxCF.toFixed(2)}} \\text{plf}\\)`}
                </MathJax>
        </div>
        
        </div>
        );
    

    return [CalculateUnitShear, CalculateMaxMoment, CalculateMaxChordForce];
}   
