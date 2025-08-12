const calculateCollectorForce  = (xPosition, unitDiaShear, unitWallShear, openings, wallLength ) =>
{
    let y = 0
    let netShear = unitWallShear - unitDiaShear
    let wallOpening = openings[0] // [[0,10]]
    for (let i = 0; i < wallLength; i++ ){
        if (i >= wallOpening[0] && i <= wallOpening[1]){
            y -= unitDiaShear
        }
        else{
            y += netShear
        }

        if (i == xPosition){
            return y;
        }

    }
    return y;
}

export default calculateCollectorForce;