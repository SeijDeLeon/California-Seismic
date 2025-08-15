import { useState } from 'react';
import BreadCrumb from './BreadCrumb';
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
    TL: '12',
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
  defaultInputsValidated["TL"] = true;

  const [inputs, setInputs] = useState(defaultInputs);
  const [inputsValidated, setInputsValidated] = useState(defaultInputsValidated);
  const [sequence, setSequence] = useState([value]);

  //restart everything
  const hardReset = (newValue) => {
    setInputs(defaultInputs);
    setInputsValidated(defaultInputsValidated);
    setValue(newValue);
    setSequence([newValue]);
  }

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      hardReset(tabOptions[tab][0].id);
    }
  }

  const handleValueChange = (newValue) => {
    if (newValue !== value) {
      hardReset(newValue);
    }
  }

  //restart everything, but don't wipe out the fields that are currently displayed
  const softReset = (name, fieldValue, isValid) => {
    const visibleInputs = requiredFields[value].reduce((acc, field) => {
      acc[field] = inputs[field];
      return acc;
    }, {})
    const visibleInputsValidated = requiredFields[value].reduce((acc, field) => {
      acc[field] = inputsValidated[field];
      return acc;
    }, {})
    setInputs({ ...defaultInputs, ...visibleInputs, [name]: fieldValue });
    setInputsValidated({ ...defaultInputsValidated, ...visibleInputsValidated, [name]: isValid });
    setSequence([value]);
  }

  const handleInputChange = (e) => {
    const { name, value: fieldValue } = e.target;
    const isValid = e.target.checkValidity();
    if (!sequence.includes(name)) {
      setInputs({ ...inputs, [name]: fieldValue });
      setInputsValidated({ ...inputsValidated, [name]: isValid });
    }
    else { //result from previous calculation isn't used anymore, so reset
      softReset(name, fieldValue, isValid);
    }
  };

  const getUseCases = (value) => {
    const options = Object.values(tabOptions).flat();
    return Object.keys(requiredFields)
      .filter(key => requiredFields[key].includes(value))
      .map(key => options.find(option => option.id === key))
  }

  const applyUseCase = (value, result, newValue) => {
    setInputs({ ...inputs, [value]: result || '' });
    setInputsValidated({ ...inputsValidated, [value]: !!result });
    setValue(newValue);
    if (!sequence.includes(newValue)) {
      setSequence(prev => [...prev, newValue]);
    }
  }

  return (
    <main className="text-start px-4 mx-auto my-8 max-w-screen-xl min-h-[calc(92vh-120px)] flex flex-col">
      <BreadCrumb
        sequence={sequence}
        value={value}
        setValue={setValue}
        inputs={inputs}
        setInputs={setInputs}
        isValueValidated={requiredFields[value].every(field => inputsValidated[field] === true)}
      />
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