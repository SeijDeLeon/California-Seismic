import { useState } from 'react';
import calculateCs from '../../../assets/data/calculations/calculateCs';
import calculateV from '../../../assets/data/calculations/calculateV';
import calculateCvx from '../../../assets/data/calculations/calculateCvx';
import calculateFvx from '../../../assets/data/calculations/calculateFvx';
import calculateStiffness from '../../../assets/data/calculations/calculateStiffness';
import calculateFundamentalPeriod from '../../../assets/data/calculations/calculateFundamentalPeriod';
import InputBlock from './InputBlock';
import OutputBlock from './OutputBlock';
import solverIcon from "./solverIcon.png"

const tabs = [
  { name: 'Base Shear', id: 'baseShear' },
  { name: 'Fundamental Period', id: 'fundamentalPeriod' },
  // { name: 'Other', id: 'other2' },
];

const tabValues = {
  baseShear: [
    { name: "Seismic Response Coefficient", id: "Cs" },
    { name: "Seismic Base Shear", id: "V" },
    { name: "Vertical Distribution Factor", id: "Cvx" },
    { name: "Story Shear", id: "Fvx" }
  ],
  fundamentalPeriod: [
    { name: "Stiffness", id: "stiffness" },
    { name: "Fundamental Period", id: "fundamentalPeriod" }
  ]
}

const Solver = () => {
  const [activeTab, setActiveTab] = useState('baseShear');
  const [valueToCalculate, setValueToCalculate] = useState("Cs");
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

  const handleCalculate = {
    Cs: handleCalculateCs,
    V: handleCalculateV,
    Cvx: handleCalculateCvx,
    Fvx: handleCalculateFvx,
    stiffness: handleCalculateStiffness,
    fundamentalPeriod: handleCalculateFundamentalPeriod
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-3">
        <img src={solverIcon} alt="solver icon" />
        <p className="font-medium text-2xl text-sky-800">Calculator</p>
      </div>

      <div className="flex space-x-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'font-medium' : 'text-gray-500 hover:text-gray-700'}
            onClick={() => {
              setActiveTab(tab.id)
              setValueToCalculate(tabValues[tab.id][0].id)
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className='mt-12 grid grid-cols-2 gap-12 text-left'>
        <InputBlock
          valueToCalculate={valueToCalculate}
          setValueToCalculate={setValueToCalculate}
          activeTab={activeTab}
          tabValues={tabValues}
          inputs={inputs}
          handleInputChange={handleChange}
          calculate={handleCalculate[valueToCalculate]}
        />

        <OutputBlock
          valueToCalculate={valueToCalculate}
          inputs={inputs}
          result={results[valueToCalculate]}
          calculated={calculated[valueToCalculate]}
        />
      </div>
    </div>
  );
};

export default Solver;