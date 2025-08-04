import React, { useState } from "react";

const DiaphragmInput = () => {
  const [inputs, setInputs] = useState({
    length: "",
    width: "",
    loadMagnitude: "",
  });

  const [activeWall, setActiveWall] = useState("A");
  const [walls, setWalls] = useState({
    A: [""],
    B: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWallSegmentChange = (e, index) => {
    const newWalls = { ...walls };
    newWalls[activeWall][index] = e.target.value;
    setWalls(newWalls);
  };

  const addSegment = () => {
    setWalls((prev) => ({
      ...prev,
      [activeWall]: [...prev[activeWall], ""],
    }));
  };

  const removeSegment = (index) => {
    setWalls((prev) => ({
      ...prev,
      [activeWall]: prev[activeWall].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 p-6 flex flex-col gap-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Diaphragm Input
        </h1>
        <div className="bg-white px-20 py-4 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Inputs</h2>
          <div className="space-y-4">
            {["length", "width", "loadMagnitude"].map((key) => (
              <div key={key} className="flex items-center justify-between">
                <label className="w-32 capitalize text-left">
                  {key.replace(/([A-Z])/g, " $1")}:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name={key}
                    value={inputs[key]}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-32 text-right"
                  />
                  <span className="text-sm text-gray-600">
                    {key === "loadMagnitude" ? "plf" : "ft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white px-6 py-4 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Shear Wall</h2>
          <div className="flex gap-4 mb-4">
            {["A", "B"].map((wall) => (
              <button
                key={wall}
                onClick={() => setActiveWall(wall)}
                className={`px-4 py-2 border rounded ${
                  activeWall === wall ? "bg-gray-300" : "bg-gray-100"
                }`}
              >
                Wall {wall}
              </button>
            ))}
            <button
              onClick={addSegment}
              className="ml-auto px-3 py-1 border rounded text-sm"
            >
              + Segment
            </button>
          </div>
          <div className="space-y-3">
            {walls[activeWall].map((value, index) => (
              <div key={index} className="flex items-center gap-2">
                <label className="w-20">Segment</label>
                <input
                  type="number"
                  value={walls[activeWall].length === 1 ? inputs.length : value}
                  onChange={(e) => handleWallSegmentChange(e, index)}
                  className="p-2 border border-gray-300 rounded w-32 text-right"
                />
                <span className="text-sm">ft</span>
                <button
                  onClick={() => removeSegment(index)}
                  className="text-red-500 px-2 py-1 text-sm"
                >
                  - Segment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-gray-200 p-4 flex items-center justify-center">
        <div className="w-full h-full border border-gray-400 bg-white rounded shadow p-4">
          <h1 className="text-center text-xl text-gray-700">
            Diaphragm Display Area
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DiaphragmInput;
