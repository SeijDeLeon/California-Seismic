import calculateCs from '../../../assets/data/calculations/calculateCs';
import calculateV from '../../../assets/data/calculations/calculateV';
import calculateCvx from '../../../assets/data/calculations/calculateCvx';
import calculateFvx from '../../../assets/data/calculations/calculateFvx';
import calculateStiffness from '../../../assets/data/calculations/calculateStiffness';
import calculateFundamentalPeriod from '../../../assets/data/calculations/calculateFundamentalPeriod';
import SolutionCs from './SolutionCs';
import SolutionV from './SolutionV';
import SolutionCvx from './SolutionCvx';
import SolutionFvx from './SolutionFvx';
import { requiredFields } from './Solver';

const OutputBlock = ({ value, valueLabel, inputs, isValueValidated, useCases, applyUseCase }) => {
  const parseArrayInput = (input) => {
    try {
      return JSON.parse(input);
    } catch (error) {
      return [];
    }
  };

  const getResult = (value, inputs) => {
    if (!isValueValidated) return [null, null];

    const parsedFields = requiredFields[value].map(field => {
      if (field === 'weights' || field === 'heights')
        return parseArrayInput(inputs[field]);
      else if (field === "Cvx")
        return parseArrayInput(inputs[field]).map(c => parseFloat(c));
      else
        return parseFloat(inputs[field]);
    });

    switch (value) {
      case "Cs":
        const Cs = calculateCs(...parsedFields).toFixed(4);
        return [Cs, <SolutionCs inputs={inputs} result={Cs} />];

      case "V":
        const V = calculateV(...parsedFields).toFixed(4);
        return [V, <SolutionV inputs={inputs} result={V} />];

      case "Cvx":
        const totalWeightHeight = parsedFields[0].reduce((sum, weight, index) => sum + parseFloat(weight || 0) * parseFloat(parsedFields[1][index] || 0), 0);
        const Cvx = calculateCvx(...parsedFields, totalWeightHeight).map(c => c.toFixed(4));
        return [Cvx, <SolutionCvx inputs={inputs} result={Cvx} />];

      case "Fvx":
        const Fvx = calculateFvx(...parsedFields).map(f => f.toFixed(4));
        return [Fvx, <SolutionFvx inputs={inputs} result={Fvx} />];

      case "stiffness":
        const stiffness = calculateStiffness(...parsedFields).toFixed(4);
        return [stiffness, null];

      case "fundamentalPeriod":
        const fundamentalPeriod = calculateFundamentalPeriod(...parsedFields).toFixed(4);
        return [fundamentalPeriod, null];

      default: return [null, null]
    }
  }

  const [result, solution] = getResult(value, inputs);
  const formattedResult = Array.isArray(result) ? `[${result.join(', ')}]` : result;

  return (
    <section className="py-6 lg:pl-6 xl:pl-12">
      <p className='text-gray-500'>{valueLabel} Output</p>
      <output data-testid="output" className='text-3xl font-bold'>
        {formattedResult || "-"}
      </output>
      <div className='mt-8'>
        {solution}
        <p className="text-gray-500 mt-8 mb-2">Code Output</p>
        <pre className="text-center border p-4 rounded whitespace-pre-wrap">
          {`{${value}: ${formattedResult}}`}
        </pre>
      </div>

      {isValueValidated && useCases && useCases.length > 0 &&
        <div className='mt-8'>
          <p className='text-gray-500 mb-2'>Uses of {valueLabel}</p>
          {useCases.map(option => (
            <button
              key={option.id}
              onClick={() => applyUseCase(value, formattedResult, option.id)}
            >
              Calculate {option.label} with this value
            </button>
          ))}
        </div>
      }
    </section>
  )
}

export default OutputBlock;