import React, { useState } from 'react';
import calculateCs from '../utils/calculateCs';
import calculateV from '../utils/calculateV';
import calculateCvx from '../utils/calculateCvx';
import calculateFvx from '../utils/calculateFvx';

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
    weights: '',
    heights: '',
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

  const parseArrayInput = (input) => {
    try {
      return JSON.parse(input);
    } catch (error) {
      return [];
    }
  };

  const handleCalculateCs = () => {
    const { SDS, SD1, T, Ie, R, T0, TL } = inputs;
    const Cs = calculateCs(parseFloat(SDS), parseFloat(SD1), parseFloat(T), parseFloat(Ie), parseFloat(R), parseFloat(T0), parseFloat(TL));
    setResults({ ...results, Cs: Cs.toFixed(4) });
  };

  const handleCalculateV = () => {
    const { Cs, weights } = inputs;
    const parsedWeights = parseArrayInput(weights);
    const V = calculateV(parseFloat(Cs), parsedWeights);
    setResults({ ...results, V: V.toFixed(4) });
  };

  const handleCalculateCvx = () => {
    const { weights, heights } = inputs;
    const parsedWeights = parseArrayInput(weights);
    const parsedHeights = parseArrayInput(heights);
    const totalWeightHeight = parsedWeights.reduce((sum, weight, index) => sum + parseFloat(weight || 0) * parseFloat(parsedHeights[index] || 0), 0);
    const Cvx = calculateCvx(parsedWeights, parsedHeights, totalWeightHeight);
    setResults({ ...results, Cvx: Cvx.map(c => c.toFixed(4)) });
  };

  const handleCalculateFvx = () => {
    const { Cvx, V } = results;
    const Fvx = calculateFvx(Cvx.map(c => parseFloat(c)), parseFloat(V));
    setResults({ ...results, Fvx: Fvx.map(f => f.toFixed(4)) });
  };

  const getPreviewText = (name) => {
    if (name === 'weights' || name === 'heights') {
      return '[float, float, ...]';
    }
    return 'float';
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
              <h2 className="text-lg font-medium mb-4">Calculate C<sub>s</sub></h2>
              <div className="mb-4">
                <label className="block mb-2">S<sub>DS</sub></label>
                <input
                  type="text"
                  name="SDS"
                  value={inputs.SDS}
                  onChange={handleChange}
                  placeholder={getPreviewText('SDS')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">S<sub>D1</sub></label>
                <input
                  type="text"
                  name="SD1"
                  value={inputs.SD1}
                  onChange={handleChange}
                  placeholder={getPreviewText('SD1')}
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
                  placeholder={getPreviewText('T')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">I<sub>e</sub></label>
                <input
                  type="text"
                  name="Ie"
                  value={inputs.Ie}
                  onChange={handleChange}
                  placeholder={getPreviewText('Ie')}
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
                  placeholder={getPreviewText('R')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">T<sub>0</sub></label>
                <input
                  type="text"
                  name="T0"
                  value={inputs.T0}
                  onChange={handleChange}
                  placeholder={getPreviewText('T0')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">T<sub>L</sub></label>
                <input
                  type="text"
                  name="TL"
                  value={inputs.TL}
                  onChange={handleChange}
                  placeholder={getPreviewText('TL')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleCalculateCs}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate C<sub>s</sub>
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">C<sub>s</sub> Output</h2>
              <div className="mb-4">
                <label className="block mb-2">Seismic Response Coefficient (C<sub>s</sub>)</label>
                <output className="w-full p-2 border rounded block">{results.Cs}</output>
              </div>
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Seismic Response Coefficient (C<sub>s</sub>): <span className="font-bold">{results.Cs}</span></p>
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
                <label className="block mb-2">C<sub>s</sub></label>
                <input
                  type="text"
                  name="Cs"
                  value={inputs.Cs}
                  onChange={handleChange}
                  placeholder={getPreviewText('Cs')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Weights (kip)</label>
                <input
                  type="text"
                  name="weights"
                  value={inputs.weights}
                  onChange={handleChange}
                  placeholder={getPreviewText('weights')}
                  className="w-full p-2 border rounded"
                />
              </div>
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
                <label className="block mb-2">Seismic Base Shear (V)</label>
                <output className="w-full p-2 border rounded block">{results.V}</output>
              </div>
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Seismic Base Shear (V): <span className="font-bold">{results.V}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`V: ${results.V}`}
              </pre>
            </div>
            {/* Calculate Cvx Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate C<sub>vx</sub></h2>
              <div className="mb-4">
                <label className="block mb-2">Weights (kip)</label>
                <input
                  type="text"
                  name="weights"
                  value={inputs.weights}
                  onChange={handleChange}
                  placeholder={getPreviewText('weights')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Heights (ft)</label>
                <input
                  type="text"
                  name="heights"
                  value={inputs.heights}
                  onChange={handleChange}
                  placeholder={getPreviewText('heights')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleCalculateCvx}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate C<sub>vx</sub>
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">C<sub>vx</sub> Output</h2>
              <div className="mb-4">
                <label className="block mb-2">Vertical Distribution Factor (C<sub>vx</sub>)</label>
                <output className="w-full p-2 border rounded block">{results.Cvx.join(', ')}</output>
              </div>
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Vertical Distribution Factor (C<sub>vx</sub>): <span className="font-bold">{results.Cvx.join(', ')}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`Cvx: [${results.Cvx.join(', ')}]`}
              </pre>
            </div>
            {/* Calculate Fvx Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate F<sub>vx</sub></h2>
              <div className="mb-4">
                <label className="block mb-2">C<sub>vx</sub></label>
                <input
                  type="text"
                  name="Cvx"
                  value={inputs.Cvx}
                  onChange={handleChange}
                  placeholder={getPreviewText('Cvx')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Seismic Base Shear (V)</label>
                <input
                  type="text"
                  name="V"
                  value={inputs.V}
                  onChange={handleChange}
                  placeholder={getPreviewText('V')}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleCalculateFvx}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate F<sub>vx</sub>
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">F<sub>vx</sub> Output</h2>
              <div className="mb-4">
                <label className="block mb-2">Story Force (F<sub>vx</sub>)</label>
                <output className="w-full p-2 border rounded block">{results.Fvx.join(', ')}</output>
              </div>
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Story Force (F<sub>vx</sub>): <span className="font-bold">{results.Fvx.join(', ')}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`Fvx: [${results.Fvx.join(', ')}]`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'other1' && (
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">Other Calculation 1</h2>
            {/* Other Calculation 1 content */}
          </div>
        )}
        {activeTab === 'other2' && (
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">Other Calculation 2</h2>
            {/* Other Calculation 2 content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Solver;



