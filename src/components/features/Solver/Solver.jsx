import React, { useState } from 'react';
import calculateCs from '../../../assets/data/calculations/calculateCs';
import calculateV from '../../../assets/data/calculations/calculateV';
import calculateCvx from '../../../assets/data/calculations/calculateCvx';
import calculateFvx from '../../../assets/data/calculations/calculateFvx';
import InputBlock from './InputBlock';
import OutputBlock from './OutputBlock';

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

  const inputFields = [
    { label: 'S<sub>DS</sub>', name: 'SDS' },
    { label: 'S<sub>D1</sub>', name: 'SD1' },
    { label: 'T', name: 'T' },
    { label: 'I<sub>e</sub>', name: 'Ie' },
    { label: 'R', name: 'R' },
    { label: 'T<sub>0</sub>', name: 'T0' },
    { label: 'T<sub>L</sub>', name: 'TL' },
  ];

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
              {inputFields.map(field => (
                <InputBlock
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={inputs[field.name]}
                  handleChange={handleChange}
                  placeholder={getPreviewText(field.name)}
                />
              ))}
              <button
                onClick={handleCalculateCs}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate C<sub>s</sub>
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">C<sub>s</sub> Output</h2>
              <OutputBlock
                label="Seismic Response Coefficient (C<sub>s</sub>)"
                value={results.Cs}
              />
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
              <InputBlock
                label="C<sub>s</sub>"
                name="Cs"
                value={inputs.Cs}
                handleChange={handleChange}
                placeholder={getPreviewText('Cs')}
              />
              <InputBlock
                label="Weights (kip)"
                name="weights"
                value={inputs.weights}
                handleChange={handleChange}
                placeholder={getPreviewText('weights')}
              />
              <button
                onClick={handleCalculateV}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate V
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">V Output</h2>
              <OutputBlock
                label="Seismic Base Shear (V)"
                value={results.V}
              />
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
              <InputBlock
                label="Weights (kip)"
                name="weights"
                value={inputs.weights}
                handleChange={handleChange}
                placeholder={getPreviewText('weights')}
              />
              <InputBlock
                label="Heights (ft)"
                name="heights"
                value={inputs.heights}
                handleChange={handleChange}
                placeholder={getPreviewText('heights')}
              />
              <button
                onClick={handleCalculateCvx}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate C<sub>vx</sub>
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">C<sub>vx</sub> Output</h2>
              <OutputBlock
                label="Vertical Distribution Factor (C<sub>vx</sub>)"
                value={JSON.stringify(results.Cvx)}
              />
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Vertical Distribution Factor (C<sub>vx</sub>): <span className="font-bold">{JSON.stringify(results.Cvx)}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`Cvx: ${JSON.stringify(results.Cvx)}`}
              </pre>
            </div>
            {/* Calculate Fvx Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate F<sub>vx</sub></h2>
              <OutputBlock
                label="Vertical Distribution Factor (C<sub>vx</sub>)"
                value={JSON.stringify(results.Cvx)}
              />
              <OutputBlock
                label="Seismic Base Shear (V)"
                value={results.V}
              />
              <button
                onClick={handleCalculateFvx}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate F<sub>vx</sub>
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">F<sub>vx</sub> Output</h2>
              <OutputBlock
                label="Vertical Force Distribution (F<sub>vx</sub>)"
                value={JSON.stringify(results.Fvx)}
              />
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Vertical Force Distribution (F<sub>vx</sub>): <span className="font-bold">{JSON.stringify(results.Fvx)}</span></p>
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`Fvx: ${JSON.stringify(results.Fvx)}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solver;
