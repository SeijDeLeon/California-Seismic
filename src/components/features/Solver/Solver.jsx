import React, { useState } from 'react';
import calculateCs from '../../../assets/data/calculations/calculateCs';
import calculateV from '../../../assets/data/calculations/calculateV';
import calculateCvx from '../../../assets/data/calculations/calculateCvx';
import calculateFvx from '../../../assets/data/calculations/calculateFvx';
import calculateStiffness from '../../../assets/data/calculations/calculateStiffness';
import calculateFundamentalPeriod from '../../../assets/data/calculations/calculateFundamentalPeriod';
import InputBlock from './InputBlock';
import OutputBlock from './OutputBlock';
import SolutionCs from './SolutionCs';
import SolutionV from './SolutionV';
import SolutionCvx from './SolutionCvx';
import SolutionFvx from './SolutionFvx';

const tabs = [
  { name: 'Base Shear', id: 'baseShear' },
  { name: 'Fundamental Period', id: 'fundamentalPeriod' },
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
    E: '',
    I: '',
    h: '',
    W: '',
  });

  const [results, setResults] = useState({
    Cs: '',
    V: '',
    Cvx: [],
    Fvx: [],
    stiffness: '',
    fundamentalPeriod: '',
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

  const [calculated, setCalculated] = useState({
    Cs: false,
    V: false,
    Cvx: false,
    Fvx: false,
    stiffness: false,
    fundamentalPeriod: false,
  });  

  const handleCalculateCs = () => {
    const { SDS, SD1, T, Ie, R, T0, TL } = inputs;
    const Cs = calculateCs(parseFloat(SDS), parseFloat(SD1), parseFloat(T), parseFloat(Ie), parseFloat(R), parseFloat(T0), parseFloat(TL));
    setResults({ ...results, Cs: Cs.toFixed(4) });
    setCalculated(prev => ({ ...prev, Cs: true }));
  };

  const handleCalculateV = () => {
    const { Cs, weights } = inputs;
    const parsedWeights = parseArrayInput(weights);
    const V = calculateV(parseFloat(Cs), parsedWeights);
    setResults({ ...results, V: V.toFixed(4) });
    setCalculated(prev => ({ ...prev, V: true }));
  };

  const handleCalculateCvx = () => {
    const { weights, heights } = inputs;
    const parsedWeights = parseArrayInput(weights);
    const parsedHeights = parseArrayInput(heights);
    const totalWeightHeight = parsedWeights.reduce((sum, weight, index) => sum + parseFloat(weight || 0) * parseFloat(parsedHeights[index] || 0), 0);
    const Cvx = calculateCvx(parsedWeights, parsedHeights, totalWeightHeight);
    setResults({ ...results, Cvx: Cvx.map(c => c.toFixed(4)) });
    setCalculated(prev => ({ ...prev, Cvx: true }));
  };

  const handleCalculateFvx = () => {
    const { Cvx, V } = results;
    const Fvx = calculateFvx(Cvx.map(c => parseFloat(c)), parseFloat(V));
    setResults({ ...results, Fvx: Fvx.map(f => f.toFixed(4)) });
    setCalculated(prev => ({ ...prev, Fvx: true }));
  };

  const handleCalculateStiffness = () => {
    const { E, I, h } = inputs;
    const stiffness = calculateStiffness(parseFloat(E), parseFloat(I), parseFloat(h));
    setResults({ ...results, stiffness: stiffness.toFixed(4) });
    setCalculated(prev => ({ ...prev, stiffness: true }));
  };

  const handleCalculateFundamentalPeriod = () => {
    const { W } = inputs;
    const { stiffness } = results;
    const fundamentalPeriod = calculateFundamentalPeriod(parseFloat(W), parseFloat(stiffness));
    setResults({ ...results, fundamentalPeriod: fundamentalPeriod.toFixed(4) });
    setCalculated(prev => ({ ...prev, fundamentalPeriod: true }));
  };

  const getPreviewText = (name) => {
    if (name === 'weights' || name === 'heights' || name === 'Cvx') {
      return '[float, float, ...]';
    }
    return 'float';
  };

  const inputFieldsBaseShear = [
    { label: <span>S<sub>DS</sub></span>, name: 'SDS' },
    { label: <span>S<sub>D1</sub></span>, name: 'SD1' },
    { label: 'T', name: 'T' },
    { label: <span>I<sub>e</sub></span>, name: 'Ie' },
    { label: 'R', name: 'R' },
    { label: <span>T<sub>0</sub></span>, name: 'T0' },
    { label: <span>T<sub>L</sub></span>, name: 'TL' },
  ];

  const inputFieldsFundamentalPeriod = [
    { label: 'E', name: 'E' },
    { label: 'I', name: 'I' },
    { label: 'h', name: 'h' },
    { label: 'W', name: 'W' },
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
              {inputFieldsBaseShear.map(field => (
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
                label={<span>Seismic Response Coefficient (C<sub>s</sub>)</span>}
                value={results.Cs}
              />
              {calculated.Cs && (
                <>
                  <h3 className="text-md font-medium mb-4">Formatted Output</h3>
                  <div className="border p-4 rounded mb-4">
                   <p>Seismic Response Coefficient (C<sub>s</sub>): <span className="font-bold">{results.Cs}</span></p>
                   <SolutionCs inputs={inputs} result={results.Cs} />
                  </div>
                 </>
              )}
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`{Cs: ${results.Cs}}`}
              </pre>
            </div>
            {/* Calculate V Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate V</h2>
              <InputBlock
                label={<span>C<sub>s</sub></span>}
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
              {calculated.V && (
                <>
                  <h3 className="text-md font-medium mb-4">Formatted Output</h3>
                  <div className="border p-4 rounded mb-4">
                   <p>Seismic Base Shear (V): <span className="font-bold">{results.Cs}</span></p>
                   <SolutionV inputs={inputs} result={results.V} />
                  </div>
                 </>
              )}
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`{V: ${results.V}}`}
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
                label={<span>Vertical Distribution Factor (C<sub>vx</sub>)</span>}
                value={results.Cvx.join(', ')}
              />
              {calculated.Cvx && (
                <>
                  <h3 className="text-md font-medium mb-4">Formatted Output</h3>
                  <div className="border p-4 rounded mb-4">
                   <p>Vertical Distribution Factor (C<sub>vx</sub>): <span className="font-bold">{results.Cs}</span></p>
                   <SolutionCvx inputs={inputs} result={results.Cvx} />
                  </div>
                 </>
              )}
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`{Cvx: [${results.Cvx.join(', ')}]}`}
              </pre>
            </div>
            {/* Calculate Fvx Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate F<sub>vx</sub></h2>
              <InputBlock
                label={<span>C<sub>vx</sub></span>}
                name="Cvx"
                value={inputs.Cvx}
                handleChange={handleChange}
                placeholder={getPreviewText('Cvx')}
              />
              <InputBlock
                label="V (kip)"
                name="V"
                value={inputs.V}
                handleChange={handleChange}
                placeholder={getPreviewText('V')}
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
                label={<span>Story Shear (F<sub>vx</sub>)</span>}
                value={results.Fvx.join(', ')}
              />
              {calculated.Fvx && (
                <>
                  <h3 className="text-md font-medium mb-4">Formatted Output</h3>
                  <div className="border p-4 rounded mb-4">
                   <p>Story Shear (F<sub>vx</sub>): <span className="font-bold">{results.Cs}</span></p>
                   <SolutionFvx inputs={inputs} result={results.Fvx} />
                  </div>
                 </>
              )}
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`{Fvx: [${results.Fvx.join(', ')}]}`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'fundamentalPeriod' && (
          <div className="grid grid-cols-2 gap-4">
            {/* Calculate Stiffness Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate Stiffness</h2>
              {inputFieldsFundamentalPeriod.slice(0, 3).map(field => (
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
                onClick={handleCalculateStiffness}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate Stiffness
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Stiffness Output</h2>
              <OutputBlock
                label="Stiffness (k)"
                value={results.stiffness}
              />
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Stiffness (k): <span className="font-bold">{results.stiffness}</span></p>
                {/*<SolutionStiffness inputs={inputs} result={results.stiffness} />*/} 
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`{stiffness: ${results.stiffness}}`}
              </pre>
            </div>
            {/* Calculate Fundamental Period Section */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Calculate Fundamental Period</h2>
              <InputBlock
                label="Stiffness (k)"
                name="stiffness"
                value={inputs.stiffness}
                handleChange={handleChange}
                placeholder={getPreviewText('stiffness')}
              />
              <InputBlock
                label="Weight (W)"
                name="W"
                value={inputs.W}
                handleChange={handleChange}
                placeholder={getPreviewText('W')}
              />
              <button
                onClick={handleCalculateFundamentalPeriod}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
              >
                Calculate Fundamental Period
              </button>
            </div>
            <div className="bg-blue-100 rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Fundamental Period Output</h2>
              <OutputBlock
                label="Fundamental Period (T)"
                value={results.fundamentalPeriod}
              />
              <h3 className="text-md font-medium mb-4">Formatted Output</h3>
              <div className="border p-4 rounded mb-4">
                <p>Fundamental Period (T): <span className="font-bold">{results.fundamentalPeriod}</span></p>
                {/*<SolutionFundamentalPeriod inputs={inputs} result={results.fundamentalPeriod} />*/} 
              </div>
              <h3 className="text-md font-medium mb-4">Code Output</h3>
              <pre className="bg-gray-100 p-4 rounded">
                {`{fundamentalPeriod: ${results.fundamentalPeriod}}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solver;
