import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const InputBlock = ({ valueToCalculate, setValueToCalculate, activeTab, tabValues, inputs, handleInputChange, calculate }) => {
  const inputFields = () => {
    switch (valueToCalculate) {
      case "Cs": return ["SDS", "SD1", "T", "Ie", "R", "T0", "TL"];
      case "V": return ["Cs", "weights"];
      case "Cvx": return ["weights", "heights"];
      case "Fvx": return ["Cvx", "V"];
      case "stiffness": return ["E", "I", "h"];
      case "fundamentalPeriod": return ["stiffness", "weights"];
      default: return []
    }
  }

  const inputLabels = (field) => {
    switch (field) {
      case "SDS": return <span>S<sub>DS</sub></span>
      case "SD1": return <span>S<sub>D1</sub></span>
      case "Ie": return <span>I<sub>e</sub></span>
      case "T0": return <span>T<sub>0</sub></span>
      case "TL": return <span>T<sub>L</sub></span>
      case "Cs": return <span>C<sub>s</sub></span>
      case "weights": return "Weights (kip)"
      case "heights": return "Heights (ft)"
      case "Cvx": return <span>C<sub>vx</sub></span>
      case "V": return "V (kip)"
      case "stiffness": return "Stiffness (k)"
      case "W": return "Weight (W)"
      default: return field
    }
  }

  const getPreviewText = (name) => {
    if (name === 'weights' || name === 'heights' || name === 'Cvx') {
      return '[float, float, ...]';
    }
    return 'float';
  };

  return (
    <section>
      <p className='text-gray-500'>Calculate</p>
      <Listbox
        value={valueToCalculate}
        onChange={setValueToCalculate}
        as="div"
        className="relative"
      >
        <Listbox.Button className="text-3xl font-semibold flex items-center justify-between w-full mb-3">
          {valueToCalculate}
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 p-2 w-full rounded bg-white shadow-lg ring-1 ring-gray-900/5">
          {tabValues[activeTab].map(value =>
            <Listbox.Option
              key={value.id}
              value={value.id}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              {value.name} ({value.id})
            </Listbox.Option>
          )}
        </Listbox.Options>
      </Listbox>

      {inputFields().map(field => (
        <div key={field}>
          <label className="block mb-2">{inputLabels(field)}</label>
          <input
            name={field}
            value={inputs[field]}
            onChange={handleInputChange}
            placeholder={getPreviewText(field)}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={calculate}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
      >
        Calculate {valueToCalculate}
      </button>
    </section>
  )
};

export default InputBlock;