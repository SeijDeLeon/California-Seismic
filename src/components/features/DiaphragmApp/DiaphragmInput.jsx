import React, { useState } from "react";

const DiaphragmInput = () => {
  const [inputs, setInputs] = useState({
    length: "",
    width: "",
    uniformWallForce: "",
    showRightWall: false,
  });

  const [activeWall, setActiveWall] = useState("A");
  const [walls, setWalls] = useState({
    A: [{ type: "wall segment", value: "" }],
    B: [{ type: "wall segment", value: "" }],
    // C will be added when showRightWall = true
  });

  const labels = {
    length: "Length",
    width: "Width",
    uniformWallForce: "Uniform Wall Force (w)",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "length") {
      setWalls((prev) => {
        const updated = { ...prev };
        ["A", "B"].forEach((wallKey) => {
          if (
            updated[wallKey]?.length > 0 &&
            updated[wallKey][0].type === "wall segment"
          ) {
            updated[wallKey][0].value = value;
          }
        });
        return updated;
      });
    }
  };

  const toggleRightWall = () => {
    setInputs((prev) => ({
      ...prev,
      showRightWall: !prev.showRightWall,
    }));

    setWalls((prev) => {
      if (inputs.showRightWall) {
        // remove wall C
        const { C, ...rest } = prev;
        return rest;
      } else {
        // add wall C
        return {
          ...prev,
          C: [{ type: "wall segment", value: "" }],
        };
      }
    });

    if (inputs.showRightWall && activeWall === "C") {
      setActiveWall("A");
    }
  };

  const handleWallSegmentChange = (e, index) => {
    const newWalls = { ...walls };
    newWalls[activeWall][index].value = e.target.value;
    setWalls(newWalls);
  };

  const addWallItem = (type) => {
    const wall = walls[activeWall];

    const isValidAddition = () => {
      if (wall.length === 0) return type === "wall segment";
      if (wall.length === 1)
        return wall[0].type === "wall segment" && type === "wall opening";
      if (wall.length === 2)
        return wall[1].type === "wall opening" && type === "wall segment";
      return false;
    };

    if (!isValidAddition()) return;

    setWalls((prev) => ({
      ...prev,
      [activeWall]: [...prev[activeWall], { type, value: "" }],
    }));
  };

  const wall = walls[activeWall];

  const canAddSegment = () => {
    if (wall.length === 0) return true;
    if (wall.length === 2 && wall[1].type === "wall opening") return true;
    return false;
  };

  const canAddGap = () => {
    if (wall.length === 1 && wall[0].type === "wall segment") return true;
    return false;
  };

  const removeSegment = (index) => {
    if (index === 0) return;
    setWalls((prev) => ({
      ...prev,
      [activeWall]: prev[activeWall].filter((_, i) => i !== index),
    }));
  };

  const isWallItemOverLimit = (wallKey, index) => {
    const total = walls[wallKey].reduce((sum, item) => {
      const value = parseFloat(item.value);
      return !isNaN(value) ? sum + value : sum;
    }, 0);

    const max = parseFloat(inputs.length);
    return !isNaN(max) && total > max;
  };

  return (
    <div className="flex h-fit w-full">
      <div className="w-full bg-gray-100 p-6 flex flex-col gap-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Diaphragm Input
        </h1>
        <div className="bg-white px-8 md:px-12 lg:px-16 py-6 rounded shadow w-full max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">Inputs</h2>
        
        <div className="grid grid-cols-[20rem_minmax(12rem,1fr)_3rem] items-center gap-y-3 gap-x-3">
            {["length", "width", "uniformWallForce"].map((key) => (
                <React.Fragment key={key}>
                <label className="text-left whitespace-nowrap">{labels[key]}:</label>
                <input
                    type="number"
                    name={key}
                    value={inputs[key]}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded text-right w-full"
                />
                <span className="text-sm text-gray-600">{key === "uniformWallForce" ? "plf" : "ft"}</span>
                </React.Fragment>
            ))}
            {/* Show Right Wall Toggle */}
            <label
                htmlFor="showRightWall"
                className="col-span-3 flex items-center gap-2 cursor-pointer select-none mt-1"
            >
                <input
                type="checkbox"
                id="showRightWall"
                checked={inputs.showRightWall}
                onChange={toggleRightWall}
                />
                <span className="text-md">Show Right Wall</span>
            </label>
        </div>
        </div>
        <div className="bg-white px-6 py-4 rounded shadow">
  <h2 className="text-lg font-medium mb-3">Shear Wall</h2>

  {/* Wall line tabs + add buttons */}
  <div className="flex items-center gap-4 mb-4">
  {/* Wall line tabs */}
  <div className="flex items-center gap-4">
    {Object.keys(walls).map((wallKey) => (
      <button
        key={wallKey}
        onClick={() => setActiveWall(wallKey)}
        className={`px-0 py-1 text-sm font-medium transition-colors underline-offset-8
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-sm
          ${
            activeWall === wallKey
              ? "text-gray-900 underline decoration-2"
              : "text-gray-600 hover:text-gray-900 hover:underline"
          }`}
      >
        Wall Line {wallKey}
      </button>
    ))}
  </div>

  {/* Add buttons on the right stay the same */}
  <div className="ml-auto flex gap-2">
    <button
      onClick={() => addWallItem("wall segment")}
      disabled={!canAddSegment()}
      className={`px-3 py-1 border rounded text-sm ${
        !canAddSegment() ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""
      }`}
    >
      + Wall Segment
    </button>
    <button
      onClick={() => addWallItem("wall opening")}
      disabled={!canAddGap()}
      className={`px-3 py-1 border rounded text-sm ${
        !canAddGap() ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""
      }`}
    >
      + Wall Opening
    </button>
  </div>
</div>


  {/* Items list with icon + type label */}
  <div className="space-y-3">
    {walls[activeWall]?.map((item, index) => {
      const overLimit = isWallItemOverLimit(activeWall, index);
      const isSegment = item.type === "wall segment";
      return (
        <div key={index} className="flex items-center gap-3">
          {/* Icon */}
         <span
            className={`inline-block h-5 border-l-2 border-gray-800 ${item.type === "wall segment" ? "" : "border-dotted"}`}
            aria-hidden
        />
          {/* Type label */}
          <span className="text-xs text-gray-600 w-20 shrink-0">
            {item.type === "wall segment" ? "Segment" : "Opening"}
          </span>

          {/* Value input */}
          <input
            type="number"
            value={item.value}
            onChange={(e) => handleWallSegmentChange(e, index)}
            className={`p-2 border rounded w-32 text-right ${
              overLimit ? "border-red-500 text-red-600" : "border-gray-300"
            }`}
          />
          <span className="text-sm">ft</span>

          {/* Remove */}
          {index !== 0 && (
            <button
              onClick={() => removeSegment(index)}
              className="text-red-500 px-2 py-1 text-sm"
            >
              - Remove
            </button>
          )}
        </div>
      );
    })}
  </div>
</div>

      </div>
    </div>
  );
};

export default DiaphragmInput;
