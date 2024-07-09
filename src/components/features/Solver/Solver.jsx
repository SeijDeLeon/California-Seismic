import React, { useState } from 'react';
import calculateCs from '..assets/data/calculations/calculateCs';
import calculateV from '..assets/data/calculations/calculateV';
import calculateCvx from '..assets/data/calculations/calculateCvx';
import calculateFvx from '..assets/data/calculations/calculateFvx';

const tabs = [
  { name: 'Base Shear', id: 'baseShear' },
  { name: 'Other', id: 'other1' },
  { name: 'Other', id: 'other2' },
];

const Solver = () => {
  const [activeTab, setActiveTab] = useState('baseShear');
  const [inputs, setInputs] = useState({
    SDS: '',
    SD1: '',
    T: '',
    Ie: '',
    R: '',
    T0: '',
    TL: '',
    Cs: '',
    weights: [''],
    heights: [''],
  });

  const [results, setResults] = useState({
    Cs: '',
    V: '',
    Cvx: [],
    Fvx: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleArrayChange = (index, type, value) => {
    const newArray = [...inputs[type]];
    newArray[index] = value;
    setInputs(prevInputs => ({
      ...prevInputs,
      [type]: newArray
    }));
  };

  const handleCalculateCs = () => {
    const { SDS, SD1, T, Ie, R, T0, TL } = inputs;
    const Cs = calculateCs(parseFloat(SDS), parseFloat(SD1), parseFloat(T), parseFloat(Ie), parseFloat(R), parseFloat(T0), parseFloat(TL));
    setResults({ ...results, Cs: Cs.toFixed(4) });
  };

  const handleCalculateV = () => {
    const { Cs, weights } = inputs;
    const V = calculateV(parseFloat(Cs), weights);
    setResults({ ...results, V: V.toFixed(4) });
  };

  const handleCalculateCvx = () => {
    const { weights, heights } = inputs;
    const totalWeightHeight = weights.reduce((sum, weight, index) => sum + parseFloat(weight || 0) * parseFloat(heights[index] || 0), 0);
    const Cvx = calculateCvx(weights.map(w => parseFloat(w)), heights.map(h => parseFloat(h)), totalWeightHeight);
    setResults({ ...results, Cvx: Cvx.map(c => c.toFixed(4)) });
  };

  const handleCalculateFvx = () => {
    const { Cvx, V } = results;
    const Fvx = calculateFvx(Cvx.map(c => parseFloat(c)), parseFloat(V));
    setResults({ ...results, Fvx: Fvx.map(f => f.toFixed(4)) });
  };

  const getPreviewText = (value) => {
    if (Array.isArray(value)) {
      return `[float, float, ...]`;
    } else {
      return 'float';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 -mb-px font-semibold border-b-2 ${activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        {activeTab === 'baseShear' && (
          <div className="grid grid-cols-2 gap-4">    
            {/* Calculate Cs Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate Cs</h2>
              <div className="mb-4">
                <label className="block mb-2">SDS</label>
                <input
                  type="text"
                  name="SDS"
                  value={inputs.SDS}
                  onChange={handleChange}
                  placeholder={getPreviewText(inputs.SDS)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">SD1</label>
                <input
                  type="text"
                  name="SD1"
                  value={inputs.SD1}
                  onChange={handleChange}
                  placeholder={getPreviewText(inputs.SD1)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">T</label>
                <input
                  type="text"
                  name="T"
                  value={inputs.T}
                  onChange={handleChange}
                  placeholder={getPreviewText(inputs.T)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Ie</label>
                <input
                  type="text"
                  name="Ie"
                  value={inputs.Ie}
                  onChange={handleChange}
                  placeholder={getPreviewText(inputs.Ie)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">R</label>
                <input
                  type="text"
                  name="R"
                  value={inputs.R}
                  onChange={handleChange}
                  placeholder={getPreviewText(inputs.R)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">T0</label>
                <input
                  type="text"
                  name="T0"
                  value={inputs.T0}
                  onChange={handleChange}
                  placeholder={getPreviewText(inputs.T0)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">TL</label>
                <input
                  type="text"
                  name="TL"
                  value={inputs.TL}
                  onChange={handleChange}
                  placeholder={getPreviewText(inputs.TL)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleCalculateCs}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate Cs
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Cs Output</h2>
              <div className="mb-4">
                <label className="block mb-2">Seismic Response Coefficient (Cs)</label>
                <output className="w-full p-2 border rounded block">{results.Cs}</output>
              </div>
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Seismic Response Coefficient (Cs): <span className="font-bold">{results.Cs}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`Cs: ${results.Cs}`}
              </pre>
            </div>
            {/* Calculate V Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate V</h2>
              <div className="mb-4">
                <label className="block mb-2">Cs</label>
                <input
                  type="text"
                  name="Cs"
                  value={inputs.Cs}
                  onChange={handleChange}
                  placeholder={getPreviewText(inputs.Cs)}
                  className="w-full p-2 border rounded"
                />
              </div>
              {inputs.weights.map((weight, index) => (
                <div key={index} className="mb-4">
                  <label className="block mb-2">Weight (kip)</label>
                  <input
                    type="text"
                    value={inputs.weights[index]}
                    onChange={(e) => handleArrayChange(index, 'weights', e.target.value)}
                    placeholder={getPreviewText(inputs.weights)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              <button
                onClick={handleCalculateV}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate V
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">V Output</h2>
              <div className="mb-4">
                <label className="block mb-2">Base Shear (V)</label>
                <output className="w-full p-2 border rounded block">{results.V}</output>
              </div>
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Base Shear (V): <span className="font-bold">{results.V}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`V: ${results.V}`}
              </pre>
            </div>
            {/* Calculate Cvx Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate Cvx</h2>
              {inputs.weights.map((weight, index) => (
                <div key={index} className="mb-4">
                  <label className="block mb-2">Weight (kip)</label>
                  <input
                    type="text"
                    value={inputs.weights[index]}
                    onChange={(e) => handleArrayChange(index, 'weights', e.target.value)}
                    placeholder={getPreviewText(inputs.weights)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              {inputs.heights.map((height, index) => (
                <div key={index} className="mb-4">
                  <label className="block mb-2">Height (ft)</label>
                  <input
                    type="text"
                    value={inputs.heights[index]}
                    onChange={(e) => handleArrayChange(index, 'heights', e.target.value)}
                    placeholder={getPreviewText(inputs.heights)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              <button
                onClick={handleCalculateCvx}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate Cvx
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Cvx Output</h2>
              <div className="mb-4">
                <label className="block mb-2">Vertical Distribution Factor (Cvx)</label>
                <output className="w-full p-2 border rounded block">{results.Cvx.join(', ')}</output>
              </div>
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Vertical Distribution Factor (Cvx): <span className="font-bold">{results.Cvx.join(', ')}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`Cvx: [${results.Cvx.join(', ')}]`}
              </pre>
            </div>
            {/* Calculate Fvx Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate Fvx</h2>
              <button
                onClick={handleCalculateFvx}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate Fvx
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Fvx Output</h2>
              <div className="mb-4">
                <label className="block mb-2">Story Shear (Fvx)</label>
                <output className="w-full p-2 border rounded block">{results.Fvx.join(', ')}</output>
              </div>
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Story Shear (Fvx): <span className="font-bold">{results.Fvx.join(', ')}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`Fvx: [${results.Fvx.join(', ')}]`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solver;



