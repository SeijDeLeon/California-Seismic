import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { requiredFields } from "./Solver";

const InputBlock = ({ value, handleValueChange, options, inputs, handleInputChange }) => {
  const getFieldLabel = (field) => {
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

  const getFieldValidation = (field) => {
    return (field === 'weights' || field === 'heights' || field === 'Cvx') ?
      {
        previewText: '[float, float, ...]',
        regex: "\\[\\s*-?(\\d+|\\d*\\.\\d+)(\\s*,\\s*-?(\\d+|\\d*\\.\\d+))*\\s*\\]"
      } : {
        previewText: 'float',
        regex: "-?(\\d+(\\.\\d+)?|\\.\\d+)"
      }
  };

  return (
    <section className="py-6 lg:pr-6 xl:pr-12">
      <p className='text-gray-500'>Calculate</p>
      <Listbox
        value={value}
        onChange={handleValueChange}
        as="div"
        className="relative"
      >
        <Listbox.Button
          data-testid="value-to-calculate"
          className="text-3xl font-bold flex items-center justify-between w-full"
        >
          {options.find(option => option.id === value).label}
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Listbox.Options className="absolute w-full rounded bg-white shadow-lg ring-1 ring-gray-900/5 z-10 mt-2 p-2">
          {options.map(option =>
            <Listbox.Option
              key={option.id}
              value={option.id}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              {option.name} {(option.name !== option.label) && <>({option.label})</>}
            </Listbox.Option>
          )}
        </Listbox.Options>
      </Listbox>

      <form className="mt-8 space-y-3">
        {requiredFields[value].map(field => {
          const { previewText, regex } = getFieldValidation(field);
          return (
            <div key={field} className="flex flex-col-reverse gap-y-2">
              <input
                role="textbox"
                id={field}
                name={field}
                value={inputs[field]}
                onChange={handleInputChange}
                placeholder={previewText}
                pattern={regex}
                required
                className="text-sm w-full rounded p-2 peer border invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              />
              <label
                htmlFor={field}
                className="peer-[&:not(:placeholder-shown):not(:focus):invalid]:text-red-500"
              >
                {getFieldLabel(field)}
              </label>
            </div>
          )
        })}
      </form>
    </section>
  )
}

export default InputBlock;