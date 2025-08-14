import React from 'react';

const InputTable = ({ floors, addFloor, deleteFloor, handleChange }) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full min-w-[400px] border-collapse text-xs sm:text-sm mb-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">Story</th>
          <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">Height (ft)</th>
          <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">Weight (lb)</th>
          <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">Delete</th>
        </tr>
      </thead>
      <tbody>
        {floors.map((floor, i) => (
          <tr key={i} className="bg-white">
            <td className="text-center px-1 sm:px-2 py-1">{i + 1}</td>
            <td className="px-1 sm:px-2 py-1">
              <input
                type="number"
                value={floor.height}
                onChange={(e) => handleChange(i, 'height', e.target.value)}
                className="w-full p-1 border text-xs sm:text-sm min-w-0"
              />
            </td>
            <td className="px-1 sm:px-2 py-1">
              <input
                type="number"
                value={floor.weight}
                onChange={(e) => handleChange(i, 'weight', e.target.value)}
                className="w-full p-1 border text-xs sm:text-sm min-w-0"
              />
            </td>
            <td className="text-center px-1 sm:px-2 py-1">
              <button
                onClick={() => deleteFloor(i)}
                className="text-red-600 hover:text-red-800 px-2 py-1 text-xs sm:text-sm"
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      onClick={addFloor}
      className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 text-xs sm:text-sm w-full sm:w-auto"
    >
      + Add Floor
    </button>
  </div>
);

export default InputTable;