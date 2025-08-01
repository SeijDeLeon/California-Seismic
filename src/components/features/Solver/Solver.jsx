import { useState } from 'react';
import InputBlock from './InputBlock';
import OutputBlock from './OutputBlock';
import solverIcon from "./solverIcon.png"

const getRequiredFields = (value) => {
  switch (value) {
    case "Cs": return ["SDS", "SD1", "T", "Ie", "R", "T0", "TL"];
    case "V": return ["Cs", "weights"];
    case "Cvx": return ["weights", "heights"];
    case "Fvx": return ["Cvx", "V"];
    case "stiffness": return ["E", "I", "h"];
    case "fundamentalPeriod": return ["stiffness", "weights"];
    default: return []
  }
}

const Solver = () => {
  const [activeTab, setActiveTab] = useState("Base Shear");
  const [value, setValue] = useState("Cs");

  const defaultInputs = {
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
    Cvx: [],
    V: '',
    E: '',
    I: '',
    h: '',
    stiffness: '',
    W: '',
  }

  const defaultInputsValidated = {};
  for (const field in defaultInputs) {
    defaultInputsValidated[field] = false;
  }

  const [inputs, setInputs] = useState(defaultInputs);
  const [inputsValidated, setInputsValidated] = useState(defaultInputsValidated);

  const tabOptions = {
    "Base Shear": [
      { name: "Seismic Response Coefficient", id: "Cs" },
      { name: "Seismic Base Shear", id: "V" },
      { name: "Vertical Distribution Factor", id: "Cvx" },
      { name: "Story Shear", id: "Fvx" }
    ],
    "Fundamental Period": [
      { name: "Stiffness", id: "stiffness" },
      { name: "Fundamental Period", id: "fundamentalPeriod" }
    ]
  }

  const resetInputs = () => {
    setInputs(defaultInputs);
    setInputsValidated(defaultInputsValidated);
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setValue(tabOptions[tab][0].id);
    resetInputs();
  }

  const handleValueChange = (value) => {
    setValue(value);
    resetInputs();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isValid = e.target.checkValidity();
    setInputs({ ...inputs, [name]: value });
    setInputsValidated({ ...inputsValidated, [name]: isValid });
  };

  return (
    <main className="text-start px-4 mx-auto my-8 max-w-screen-xl min-h-[calc(92vh-120px)] flex flex-col">
      <h1 className="flex items-center gap-2 font-semibold text-2xl text-sky-800 mb-3">
        <img src={solverIcon} alt="solver icon" />
        Calculator
      </h1>

      <ul className="flex space-x-5">
        {Object.keys(tabOptions).map(tab =>
          <li key={tab}>
            <button
              className={activeTab === tab ? 'font-semibold' : 'text-gray-500 hover:text-gray-700'}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          </li>
        )}
      </ul>

      <div className='mt-3 grid grid-cols-2 divide-x divide-solid flex-1'>
        <InputBlock
          value={value}
          handleValueChange={handleValueChange}
          options={tabOptions[activeTab]}
          inputs={inputs}
          handleInputChange={handleInputChange}
        />
        <OutputBlock
          value={value}
          inputs={inputs}
          isValueValidated={getRequiredFields(value).every(field => inputsValidated[field] === true)}
        />
      </div>
    </main>
  )
}

export default Solver;