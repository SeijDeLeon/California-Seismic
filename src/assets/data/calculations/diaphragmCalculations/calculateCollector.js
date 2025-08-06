

const calculateCollector = (unitDiaphragmShear, unitWallShear, segments ) => {

    let maxCollectorForce = null;
    let maxAbsForce = -Infinity;
    let maxSegment = 0;


    const netUnitWallShear = unitWallShear - unitDiaphragmShear;
    for (const segment of segments) {
        const product = netUnitWallShear * segment;
        if (Math.abs(product) > maxAbsForce) {
            maxAbsForce = Math.abs(product);
            maxCollectorForce = product;
            maxSegment = segment;
        }
    }

    return {maxCollectorForce, maxSegment, netUnitWallShear};

}

export default calculateCollector;

// Collector Force to be finished
// Need to see input to determine the gaps and segments that need to be considered for calculation
// possible array of segments & gaps for a wall
// if there is a middle gap, find max of  netUnitWallShear * distances on the wall for each segment
// end gap, just take the netUnitWallShear * distance of the wall of one segment