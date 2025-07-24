import SolutionCs from './SolutionCs';
import SolutionV from './SolutionV';
import SolutionCvx from './SolutionCvx';
import SolutionFvx from './SolutionFvx';

// results.Cvx.join(', '), fvx
const OutputBlock = ({ valueToCalculate, inputs, result, calculated }) => {
  const getSolution = () => {
    switch (valueToCalculate) {
      case "Cs": return <SolutionCs inputs={inputs} result={result} />
      case "V": return <SolutionV inputs={inputs} result={result} />
      case "Cvx": return <SolutionCvx inputs={inputs} result={result} />
      case "Fvx": return <SolutionFvx inputs={inputs} result={result} />
      default: return <div>Not supported</div>
    }
  }

  const formattedResult = Array.isArray(result) ? result.join(', ') : result

  return (
    <section>
      <p className='text-gray-500'>{valueToCalculate} Output</p>
      <output className='text-3xl font-semibold mb-3'>{formattedResult || "-"}</output>
      {calculated && getSolution()}

      <p className="text-gray-500">Code Output</p>
      <pre className="text-center bg-gray-100 p-4 rounded">
        {`{${valueToCalculate}: ${formattedResult}}`}
      </pre>
    </section>
  )
}

export default OutputBlock;