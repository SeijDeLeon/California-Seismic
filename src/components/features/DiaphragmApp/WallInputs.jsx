// WallInputs.jsx
// this used to live in the diaphragm viewer component but with the custom hook it should be deprecated soon
import React from "react";

const clampToZero = (val) => (isNaN(val) || val < 0 ? 0 : val);

export default function WallInputs({
  leftWidthFt,
  setLeftWidthFt,
  rightWidthFt,
  setRightWidthFt,
  heightFt,
  setHeightFt,
  wTop,
  setwTop,
  showRightWall,
}) {
  return (
    <div className="mb-4 flex gap-4 flex-wrap justify-center">
      <label className="flex flex-col text-sm">
        Left Width (ft)
        <input
          type="number"
          min={0}
          value={leftWidthFt}
          onChange={(e) => setLeftWidthFt(clampToZero(+e.target.value))}
          className="border px-1"
        />
      </label>

      {showRightWall && (
        <label className="flex flex-col text-sm">
          Right Width (ft)
          <input
            type="number"
            min={0}
            value={rightWidthFt}
            onChange={(e) => setRightWidthFt(clampToZero(+e.target.value))}
            className="border px-1"
          />
        </label>
      )}

      <label className="flex flex-col text-sm">
        Height (ft)
        <input
          type="number"
          min={0}
          value={heightFt}
          onChange={(e) => setHeightFt(clampToZero(+e.target.value))}
          className="border px-1"
        />
      </label>

      <label className="flex flex-col text-sm">
        W (lb/ft)
        <input
          type="number"
          min={0}
          value={wTop}
          onChange={(e) => setwTop(clampToZero(+e.target.value))}
          className="border px-1"
        />
      </label>
    </div>
  );
}
