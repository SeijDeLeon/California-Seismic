import React from 'react';

const UserInputs = ({ userInput, handleInputChange }) => (
  <div className="flex flex-col">
    {[2, 3, 4, 5, 6, 7, 8].map(inputNum => (
      <div className="p-4" key={inputNum}>
        <label htmlFor={`input${inputNum}`} className="block mb-2">
          Input {inputNum}:
        </label>
        <input
          type="text"
          id={`input${inputNum}`}
          className="p-2 border border-gray-300 rounded"
          value={userInput[`input${inputNum}`]}
          onChange={event => handleInputChange(event, `input${inputNum}`)}
        />
      </div>
    ))}
  </div>
);

export default UserInputs;
