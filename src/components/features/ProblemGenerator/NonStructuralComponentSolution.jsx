import { Fragment } from 'react';
import { MathJax } from "better-react-mathjax";
export default function NonStructuralComponentSolution({equipment, table, tableName, ap, SDS, Wp, Rp, Ip, z, h, answer, max, min, original} ) {
    return (
        <Fragment>
            <p>To determine the component force, use Section 13 of ASCE 7.</p>
            <br />
            <p>First determine the seismic coefficients for the components. Table {table} may be used for a/an {equipment}. The closest matching component is {tableName}, with the following values:</p>
            <p>
                <MathJax>
                    {`\\(a_{p} = ${ap},\\ R_{p} = ${Rp}\\)`}
                </MathJax>
            </p>
            <br />
            <p>
                <MathJax>
                    {`Because there was no description for the component related to an increased importance factor, we can also assume a seismic importance factor \\(I_{p} = ${Ip}\\)`}
                </MathJax>
            </p>
            <br />
            <p>Second, determine the relative attachment point for the component relative to the building’s mean roof height. This is provided in the problem description.</p>
            <br />
            <p>
                <MathJax>
                    {`\\(z = ${z}\\ ft,\\ h = ${h}\\ ft\\)`}
                </MathJax>
            </p>
            <br />
            <p>Third, use the equations 13.1-1, 13.3-2, and 13.3-3 to solve for the component force.</p>
            <br />
            <p className="ml-40">
                <MathJax>
                    {`\\(F_{p} = \\frac{0.4a_{p}S_{DS}W_{p}}{\\frac{R_{p}}{I_{p}}}(1 + 2\\frac{z}{h}) = \\frac{0.4(${ap})(${SDS})(${Wp})}{\\frac{${Rp}}{${Ip}}}(1 + 2\\frac{${z}}{${h}}) = ${original}\\ lb\\)`}
                </MathJax>
            </p>
        </Fragment>
    );
}