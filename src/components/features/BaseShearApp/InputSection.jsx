import React from 'react';

const InputSection = ({ userInput, inputs, floorHeight, handleInputChange, handleFloorHeightChange }) => {
  return (
    <div className="flex flex-col">
      <div className="p-4">
        <label htmlFor="input1" className="block mb-2">Floors:</label>
        <div className="flex items-center">
          <button
            className="px-3 py-2 border rounded border-gray-300 mr-1"
            onClick={() => handleInputChange({ target: { value: userInput.input1 - 1 } }, 'input1')}
          >-</button>
          <input
            type="number"
            id="input1"
            className="p-2 border border-gray-300 rounded text-center"
            value={userInput.input1}
            onChange={event => handleInputChange(event, 'input1')}
          />
          <button
            className="px-3 py-2 border rounded border-gray-300 ml-1"
            onClick={() => handleInputChange({ target: { value: userInput.input1 + 1 } }, 'input1')}
          >+</button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Floor Heights</h2>
        <div className="flex flex-col">
          {Object.keys(floorHeight).map(floorNum => (
            <div key={floorNum} className="flex items-center mb-2">
              <span className="w-30 text-right pr-2">Floor {floorNum}'s Height</span>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded text-center"
                value={floorHeight[floorNum]}
                onChange={event => handleFloorHeightChange(event, floorNum)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col">
        {Object.keys(inputs).map(inputName => (
          <div className="p-4" key={inputName}>
            <label htmlFor={inputName} className="block mb-2">
              {inputName.replace('input', 'Input ')}:
            </label>
            <input
              type="text"
              id={inputName}
              className="p-2 border border-gray-300 rounded"
              value={inputs[inputName]}
              onChange={event => handleInputChange(event, inputName)}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default InputSection;
