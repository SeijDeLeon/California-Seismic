import { MathJax } from "better-react-mathjax";

export const EquationFormat = ({ value, result }) => {
    return (
        <div className="flex items-end">
            <MathJax>{value}</MathJax>
            {result && <span className="ml-2">{result}</span>}
        </div>
    );
};
