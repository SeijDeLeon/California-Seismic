



const getChordFormulas = (input) => {
    let chordFormulas = [
        { formula: "\\( V=\\frac{wL}{2} \\)", label: "Total Shear" },
        { formula: "\\( v=\\frac{V}{d} \\)", label: "Unit Diaphragm Shear" },
        { formula: "\\( M=\\frac{wL^2}{8} \\)", label: "Max Moment" },
        { formula: "\\( C=\\frac{M}{d} \\)", label: "Chord Force" },
    ];


    return chordFormulas



}



const getCollectorFormulas = (input) => {
    let collectorFormulas = [
        { formula: "\\( R_x=L/2*w \\)", label: "Reaction Force" },
        { formula: "\\( v=\\frac{R_x}{d_x} \\)", label: "Unit Wall Shear" },
    ];

    if(input.wallLines.length == 3){
        collectorFormulas = [
        { formula: "\\( R_x=L/2*w \\)", label: "Reaction Force" },
        { formula: "\\( R_B={R_A}+{R_C} \\)", label: "Reaction Force On Middle Wall" },
        { formula: "\\( v=\\frac{R}{d} \\)", label: "Unit Diaphragm Shear" },

        { formula: "\\( v_x=\\frac{R_x}{\\text{Wall Length}} \\)", label: "Unit Wall Shear" },
    ];


        
    }
    return collectorFormulas
}

export {getChordFormulas, getCollectorFormulas};