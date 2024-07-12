import React from 'react';

const InputBlock = ({ label, name, value, handleChange, placeholder }) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
    />
  </div>
);

export default InputBlock;
