import calculateCs from '../../../assets/data/calculations/calculateCs';
import calculateV from '../../../assets/data/calculations/calculateV';
import calculateCvx from '../../../assets/data/calculations/calculateCvx';
import calculateFvx from '../../../assets/data/calculations/calculateFvx';
import calculateStiffness from '../../../assets/data/calculations/calculateStiffness';
import calculateFundamentalPeriod from '../../../assets/data/calculations/calculateFundamentalPeriod';
import { Fragment, useState, useEffect } from "react";
import { requiredFields } from './Solver';

const BreadCrumb = ({ sequence, value, setValue, inputs, setInputs, isValueValidated }) => {
  const [invalidStepIndexes, setinvalidStepIndexes] = useState([]);
  const firstInvalid = invalidStepIndexes.length ?
    Math.min(...invalidStepIndexes) :
    null;

  const parseArrayInput = (input) => {
    try {
      return JSON.parse(input);
    } catch (error) {
      return [];
    }
  };

  const calculate = (value, inputs) => {
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
        return calculateCs(...parsedFields).toFixed(4);
      case "V":
        return calculateV(...parsedFields).toFixed(4);
      case "Cvx":
        const totalWeightHeight = parsedFields[0].reduce((sum, weight, index) => sum + parseFloat(weight || 0) * parseFloat(parsedFields[1][index] || 0), 0);
        return calculateCvx(...parsedFields, totalWeightHeight).map(c => c.toFixed(4));
      case "Fvx":
        return calculateFvx(...parsedFields).map(f => f.toFixed(4));
      case "stiffness":
        return calculateStiffness(...parsedFields).toFixed(4);
      case "fundamentalPeriod":
        return calculateFundamentalPeriod(...parsedFields).toFixed(4);
      default: return [null, null]
    }
  }

  const changeStep = (newStep) => {
    const index = sequence.indexOf(value);
    const copiedInputs = { ...inputs };
    if (index !== sequence.length - 1) {
      sequence.slice(index).forEach(step => {
        const result = calculate(step, copiedInputs);
        const formattedResult = Array.isArray(result) ? `[${result.join(', ')}]` : result;
        copiedInputs[step] = formattedResult || '';
      })
    }
    if (newStep !== value) {
      setInputs(copiedInputs);
      setValue(newStep);
    }
  }

  useEffect(() => {
    const index = sequence.indexOf(value);
    if (index !== sequence.length - 1) {
      isValueValidated ?
        setinvalidStepIndexes(prev => prev.filter(idx => idx !== index)) :
        setinvalidStepIndexes(prev => [...prev, index])
    }
  }, [isValueValidated])

  return (
    <div className='text-sm text-sky-800 mb-3'>
      Sequence:{" "}
      {sequence.map((step, idx) => (
        <Fragment key={step}>
          <button
            disabled={firstInvalid !== null && idx > firstInvalid}
            onClick={() => changeStep(step)}
            className={step === value ? "font-bold" : "disabled:opacity-70"}
          >
            {step}
          </button>
          {idx !== sequence.length - 1 && " > "}
        </Fragment>
      ))}
    </div>
  )
}

export default BreadCrumb;