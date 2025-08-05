import { useState } from 'react';

const squareBuildingInputsExample = {
    wallLines: [
        { wall: 'A', openings: [[5,10]], length: 30},
        { wall: 'B', openings: [], length: 30},
    ],
    horizontalWallLengths: [20],
    uniformForces: [
        { startForce: 400, endForce: 400 }
    ],
};

const rectangularBuildingInputsExample = {
    wallLines: [
        { wall: 'A', openings: [[5,10]], length: 40},
        { wall: 'B', openings: [], length: 40},
        { wall: 'C', openings: [[5,10]], length: 40},
    ],
    horizontalWallLengths: [30, 30],
    uniformForces: [
        { startForce: 300, endForce: 300 },
        { startForce: 300, endForce: 300 }
    ],
};

const blankBuildingInputs = {
    wallLines: [
        { wall: 'A', openings: [], length: 40 },
        { wall: 'B', openings: [], length: 40 },
    ],
    horizontalWallLengths: [30],
    uniformForces: [
        { startForce: 100, endForce: 100 }
    ],
};

export const useDiaphragm = () => {
    const [ inputs, setInputs ] = useState(blankBuildingInputs);
    const [ solution, setSolution ] = useState({});

    const handleDeleteWall = (wallIndex) => {
        if (wallIndex < 0 || wallIndex >= inputs.wallLines.length) return;
        if (inputs.wallLines.length <= 2) {
            console.warn("Cannot delete wall, at least two walls are required.");
            return;
        }
        setInputs((prev) => {
            const newWallLines = prev.wallLines.filter((_, index) => index !== wallIndex);
            //also delete the corresponding horizontal wall length
            const newHorizontalWallLengths = prev.horizontalWallLengths.filter((_, index) => index !== wallIndex);
            return {
                ...prev,
                wallLines: newWallLines,
                horizontalWallLengths: newHorizontalWallLengths,
            };
        });
    };

    const handleAddWall = (wallIndex, wallName, openeings, length, horizontalWallLength) => {
        if (wallIndex < 0 || wallIndex > inputs.wallLines.length) return;
        setInputs((prev) => {
            const newWallLines = [...prev.wallLines];
            newWallLines.splice(wallIndex, 0, { wall: wallName, openings: openeings, length });
            const newHorizontalWallLengths = [...prev.horizontalWallLengths];
            newHorizontalWallLengths.splice(wallIndex, 0, horizontalWallLength);

            return {
                ...prev,
                wallLines: newWallLines,
                horizontalWallLengths: newHorizontalWallLengths,
            };
        });
    };

    const handleAddWallOpening = (wallIndex, opening) => {
        if (wallIndex < 0 || wallIndex >= inputs.wallLines.length) return;
        setInputs((prev) => {
            const newWallLines = [...prev.wallLines];
            if (!newWallLines[wallIndex].openings) {
                newWallLines[wallIndex].openings = [];
            }
            newWallLines[wallIndex].openings.push(opening);

            return {
                ...prev,
                wallLines: newWallLines,
            };
        });
    };


    const handleEditInputs = (newInputState) => {
        //verify that newInputState is valid
        if (!validateInputState(newInputState)) {
            console.error("Invalid input state");
            return;
        }
        setInputs((prev) => ({
            ...prev,
            ...newInputState,
        }));
    };

    const validateInputState = (inputState) => {
        // Add validation logic here
        // For example, check if all required fields are present and valid
        if (!inputState.wallLines || !Array.isArray(inputState.wallLines)) {
            console.error("Invalid wallLines format");
            return false;
        }
        if (inputState.wallLines.length < 2) {
            console.error("At least two walls are required");
            return false;
        }
        if (!inputState.wallLines.every(wall => wall.wall && wall.length >= 0 && Array.isArray(wall.openings))) {
            console.error("Each wall must have a valid wall name, length, and openings");
            return false;
        }
        if (!inputState.horizontalWallLengths || !Array.isArray(inputState.horizontalWallLengths)) {
            console.error("Invalid horizontalWallLengths format");
            return false;
        }
        if (!inputState.uniformForces || !Array.isArray(inputState.uniformForces)) {
            console.error("Invalid uniformForces format");
            return false;
        }
        return true;
    };

    return {
        inputs,
        handleDeleteWall,
        handleAddWall,
        handleAddWallOpening,
        handleEditInputs,
        validateInputState,
        solution
    };
}