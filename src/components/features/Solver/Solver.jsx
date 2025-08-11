import { useState } from 'react';
import InputBlock from './InputBlock';
import OutputBlock from './OutputBlock';
import solverIcon from "./solverIcon.png"

export const requiredFields = {
  Cs: ["SDS", "SD1", "T", "Ie", "R", "T0", "TL"],
  V: ["Cs", "weights"],
  Cvx: ["weights", "heights"],
  Fvx: ["Cvx", "V"],
  stiffness: ["E", "I", "h"],
  fundamentalPeriod: ["stiffness", "W"],
}

const Solver = () => {
  const [activeTab, setActiveTab] = useState("Base Shear");
  const [value, setValue] = useState("Cs");

  const tabOptions = {
    "Base Shear": [
      {
        name: "Seismic Response Coefficient",
        label: <span>C<sub>s</sub></span>,
        id: "Cs"
      },
      {
        name: "Seismic Base Shear",
        label: "V",
        id: "V"
      },
      {
        name: "Vertical Distribution Factor",
        label: <span>C<sub>vx</sub></span>,
        id: "Cvx"
      },
      {
        name: "Story Shear",
        label: <span>F<sub>vx</sub></span>,
        id: "Fvx"
      }
    ],
    "Fundamental Period": [
      {
        name: "Stiffness",
        label: "Stiffness",
        id: "stiffness"
      },
      {
        name: "Fundamental Period",
        label: "Fundamental Period",
        id: "fundamentalPeriod"
      }
    ]
  }

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
    Cvx: '',
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

  const resetInputs = () => {
    setInputs(defaultInputs);
    setInputsValidated(defaultInputsValidated);
  }

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setValue(tabOptions[tab][0].id);
      resetInputs();
    }
  }

  const handleValueChange = (newValue) => {
    if (newValue !== value) {
      setValue(newValue);
      resetInputs();
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isValid = e.target.checkValidity();
    setInputs({ ...inputs, [name]: value });
    setInputsValidated({ ...inputsValidated, [name]: isValid });
  };

  const getUseCases = (value) => {
    const options = Object.values(tabOptions).flat();
    return Object.keys(requiredFields)
      .filter(key => requiredFields[key].includes(value))
      .map(key => options.find(option => option.id === key))
  }

  const applyUseCase = (value, result, newValue) => {
    setInputs({ ...defaultInputs, [value]: result || '' });
    setInputsValidated({ ...defaultInputsValidated, [value]: !!result });
    setValue(newValue);
  }

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

      <div className='mt-3 lg:grid lg:grid-cols-2 lg:divide-x lg:divide-solid lg:flex-1'>
        <InputBlock
          value={value}
          handleValueChange={handleValueChange}
          options={tabOptions[activeTab]}
          inputs={inputs}
          handleInputChange={handleInputChange}
        />
        <OutputBlock
          value={value}
          valueLabel={tabOptions[activeTab].find(option => option.id === value).label}
          inputs={inputs}
          isValueValidated={requiredFields[value].every(field => inputsValidated[field] === true)}
          useCases={getUseCases(value)}
          applyUseCase={applyUseCase}
        />
      </div>
    </main>
  )
}

export default Solver;