
import calculateTotalShear from "../../../assets/data/calculations/diaphragmCalculations/calculateTotShear";
import calculateUnitShear from "../../../assets/data/calculations/diaphragmCalculations/calculateUnitShear";


const instantiateBlankTemplate = (inputs) =>{
    const key = "wallLines"
    let solutionTemplate = {

        wallLines: []
    };

    for (const wall of inputs[key]) {
        solutionTemplate.wallLines.push({
            wall: wall.wall,
            wallShear: 0,
            diaUnitShearLeft: null,
            diaUnitShearRight: null
        });
    }

    return solutionTemplate;

}

const populateWallShear = (input,solution) => {
    const inputWallLines  = input.wallLines;
    const outputWallLines = solution.wallLines;
    const uniformLoad = input.uniformForces[0].startForce; // Assuming uniform load is the same for all walls
    const wallCount = inputWallLines.length;

    let spanIndex = 0;
    
    for (const wall of outputWallLines) {
        if (wallCount === 2){
            wall.wallShear = calculateTotalShear(inputWallLines.horizontalWallLengths[spanIndex], uniformLoad);
        }
        else if (wallCount === 3){
            if (spanIndex !== 1){
                wall.wallShear = calculateTotalShear(inputWallLines.horizontalWallLengths[spanIndex], uniformLoad);
                spanIndex++;
            } 

        }
    }

    if (wallCount === 3){
        outputWallLines[1].wallShear = outputWallLines[0].wallShear + outputWallLines[2].wallShear;
    }


    
}

const populateUnitDiaphragmShear = (input, solution) => {

    const inputWallLines  = input.wallLines;
    const outputWallLines  = solution.wallLines;
    const wallCount = inputWallLines.length;
    const diaphragmDepth = inputWallLines[0].length; // Assuming uniform diaphragm depth for simplicity

    for (let i = 0; i < wallCount; i++) {
        const wall = outputWallLines[i];
        if (i === 0) {
            wall.diaUnitShearLeft = null;
            wall.diaUnitShearRight = calculateUnitShear(wall.wallShear, diaphragmDepth);
        } else if (i === wallCount - 1) {
            wall.diaUnitShearLeft = calculateUnitShear(wall.wallShear, diaphragmDepth);
            wall.diaUnitShearRight = null;
        }
    }

    if (wallCount === 3) {
        outputWallLines[1].diaUnitShearLeft = outputWallLines[0].diaUnitShearRight;
        outputWallLines[1].diaUnitShearRight = outputWallLines[2].diaUnitShearLeft;
    }
}

const updateSolution = (inputs) => {

    let solution = instantiateBlankTemplate(inputs);
    populateWallShear(inputs, solution); //populate wall shear values
    populateUnitDiaphragmShear(inputs, solution); //populate unit diaphragm shear values
    return solution;


}