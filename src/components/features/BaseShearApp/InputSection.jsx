import React from 'react';

const InputTable = ({ floors, addFloor, deleteFloor, handleChange }) => (
  <div className="w-full">
    <table className="w-full border-collapse text-sm mb-4">
      <thead className="bg-gray-100">
        <tr>
          <th>Story</th>
          <th>Height (ft)</th>
          <th>Weight (lb)</th>
          <th>Bot (ft)</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {floors.map((floor, i) => (
          <tr key={i} className="bg-white">
            <td className="text-center">{i + 1}</td>
            <td><input type="number" value={floor.height} onChange={(e) => handleChange(i, 'height', e.target.value)} className="w-full p-1 border" /></td>
            <td><input type="number" value={floor.weight} onChange={(e) => handleChange(i, 'weight', e.target.value)} className="w-full p-1 border" /></td>
            <td className="text-center">
              {Number.isInteger(floor.bottom) ? floor.bottom : parseFloat(floor.bottom.toFixed(1))}
            </td>
            <td className="text-center"><button onClick={() => deleteFloor(i)} className="text-red-600 hover:text-red-800">X</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={addFloor} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800">+ Add Floor</button>
  </div>
);

export default InputTable;