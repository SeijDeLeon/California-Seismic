import { Fragment } from 'react';
import { MathJax } from "better-react-mathjax";
export default function FundamentalPeriodSolution({height, kips, E, inertia, G, stiffness, pounds, answer} ) {
    /*
    This is a cantilevered column SDOF structure, so we can first
    determine the stiffness of the SDOF and then plug the stiffness into
    the period equation for an SDOF system. Determine stiffness: k =
    3(EI)/h3;
    */
    return (
        <Fragment>
            <p>
                <MathJax>
                    {`Provided Inputs: \\(h = ${height}\\ ft,\\ W = ${kips}\\ kips,\\ E = ${E}\\ ksi,\\ I = ${inertia}\\ in^{4}\\)`}
                </MathJax>
            </p>
            <p>
                <MathJax>
                    {`Constants: \\(G = ${G}\\ in/s^{2}\\)`}
                </MathJax>
            </p>
            <br />
            <p>Step 1: Determine the stiffness of the system (cantilevered column)</p>
            <br />
            <p className="ml-40">
                <MathJax>
                    {`\\(k = \\frac{3(EI)}{h^{3}} = \\frac{3(${E}\\ ksi)(${inertia}\\ in^{4})}{(${height}\\ ft \\ \\times \\ 12\\ in/ft)^{3}} = ${stiffness}\\ lb/in\\)`}
                </MathJax>
            </p>
            <br />
            <p>Step 2: Determine the fundamental period</p>
            <br />
            <p className="ml-40 mb-5">
                <MathJax>
                    {`\\(T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{W}{Gk}} = 2\\pi\\sqrt{\\frac{${pounds}\\ lb}{(${G}\\ in/s^{2})(${stiffness}\\ lb/in)}} = ${answer}\\ s\\)`}
                </MathJax>
            </p>
        </Fragment>
    );
}