import React from 'react';

const OutputBlock = ({ label, value }) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    <output className="w-full p-2 border rounded block">{value}</output>
  </div>
);

export default OutputBlock;
