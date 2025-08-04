import React, { useEffect } from "react";

export default function SolutionChord({
  leftWidthFt,
  rightWidthFt,
  heightFt,
  wTop,
  showRightWall,
  setCalculations,
}) {
  const totalWidth = leftWidthFt + (showRightWall ? rightWidthFt : 0);

  const Vmax = (wTop * totalWidth) / 2;
  const Vdia = heightFt !== 0 ? Vmax / heightFt : 0;
  const v1 = leftWidthFt !== 0 ? Vmax / heightFt : 0; //this will need to change when the shear walls are added
  const v2 = showRightWall && rightWidthFt !== 0 ? Vmax / rightWidthFt : 0;
  const moment = (wTop * totalWidth ** 2) / 8;
  const chord = heightFt !== 0 ? moment / heightFt : 0;

  // ✅ Update parent with new values
  useEffect(() => {
    setCalculations({
      Vmax,
      moment,
      chord,
      width: totalWidth,
    });
  }, [Vmax, moment, chord, totalWidth, setCalculations]);

  return (
    <div className="p-4 border mt-4 mb-8 max-w-md mx-auto bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Calculated Outputs</h2>
      <ul className="space-y-1 text-sm">
        <li>
          <strong>Vmax:</strong> {Vmax.toFixed(2)} lb
        </li>
        <li>
          <strong>Vdia:</strong> {Vdia.toFixed(2)} lb/ft
        </li>
        <li>
          <strong>v1 (Left wall):</strong> {v1.toFixed(2)} lb/ft
        </li>
        {showRightWall && (
          <li>
            <strong>v2 (Right wall):</strong> {v2.toFixed(2)} lb/ft
          </li>
        )}
        <li>
          <strong>Moment:</strong> {moment.toFixed(2)} lb·ft
        </li>
        <li>
          <strong>Chord:</strong> {chord.toFixed(2)} lb/ft
        </li>
      </ul>
    </div>
  );
}
