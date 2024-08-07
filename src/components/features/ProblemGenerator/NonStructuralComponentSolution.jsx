import { Fragment } from 'react';
import { MathJax } from "better-react-mathjax";
export default function NonStructuralComponentSolution({equipmentName, table, tableName, ap, SDS, Wp, Rp, Ip, z, h, Fp_original, Fp_max, Fp_min, answer} ) {
    // Renamed Fp_original, Fp_max, and Fp_min.
    return (
        <Fragment>
            <p>To determine the component force, use Section 13 of ASCE 7.</p>
            <br />
            <p>First determine the seismic coefficients for the components. Table {table} may be used for a/an {equipmentName}. The closest matching component is {tableName}, with the following values:</p>
            <p>
                <MathJax>
                    {`\\(a_{p} = ${ap},\\ R_{p} = ${Rp}\\)`}
                </MathJax>
            </p>
            <br />
            <p>Because there was no description for the component related to an increased importance factor, we can also assume a seismic importance factor:</p>
            <p>
                <MathJax>
                    {`\\(I_{p} = ${Ip}\\)`}
                </MathJax>
            </p>
            <br />
            <p>Second, determine the relative attachment point for the component relative to the building’s mean roof height. This is provided in the problem description:</p>
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
                    {`\\(F_{p} = \\frac{0.4a_{p}S_{DS}W_{p}}{(\\frac{R_{p}}{I_{p}})}(1 + 2\\frac{z}{h}) = \\frac{0.4(${ap})(${SDS})(${Wp})}{${Rp}}(1 + 2\\frac{${z}}{${h}}) = ${Fp_original}\\ lb\\)`}
                </MathJax>
            </p>
            <br />
            <p>
                <MathJax>
                    {`\\(F_{p}\\) is not required to be taken as greater than`}
                </MathJax>
            </p>
            <br />
            <p className="ml-40">
                <MathJax>
                    {`\\(F_{pmax} = 1.6S_{DS}I_{p}W_{p} = 1.6(${SDS})(${Ip})(${Wp}) = ${Fp_max}\\ lb\\)`}
                </MathJax>
            </p>
            <br />
            <p>
                <MathJax>
                    {`and \\(F_{p}\\) shall not be taken as less than`}
                </MathJax>
            </p>
            <br />
            <p className="ml-40">
                <MathJax>
                    {`\\(F_{pmin} = 0.3S_{DS}I_{p}W_{p} = 0.3(${SDS})(${Ip})(${Wp}) = ${Fp_min}\\ lb\\)`}
                </MathJax>
            </p>
            <br />
            <p>
                <MathJax>
                    {`\\(F_{p} = max(min(F_{p},\\ F_{pmax}),\\ F_{pmin}) = max(min(${Fp_original}\\ lb,\\ ${Fp_max}\\ lb),\\ ${Fp_min}\\ lb) = ${answer}\\ lb\\)`}
                </MathJax>
            </p>
            <br />
            <p>
                <MathJax>
                    {`The seismic force on the component is \\(${answer}\\ lb\\).`}
                </MathJax>
            </p>
        </Fragment>
    );
}