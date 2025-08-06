import { Fragment } from 'react';
import { MathJax } from "better-react-mathjax";
export default function NonStructuralComponentSolution({ equipmentName, table, tableName, ap, SDS, Wp, Rp, Ip, z, h, Fp_original, Fp_max, Fp_min, answer }) {
    // Renamed Fp_original, Fp_max, and Fp_min.
    return (
        <Fragment>
            <p className='mb-6'>To determine the component force, use Section 13 of ASCE 7.</p>
            <p>First determine the seismic coefficients for the components. Table {table} may be used for a/an {equipmentName}. The closest matching component is {tableName}, with the following values:</p>
            <MathJax className='mb-6'>
                {`\\(a_{p} = ${ap},\\ R_{p} = ${Rp}\\)`}
            </MathJax>

            <p>Because there was no description for the component related to an increased importance factor, we can also assume a seismic importance factor:</p>
            <MathJax className='mb-6'>
                {`\\(I_{p} = ${Ip}\\)`}
            </MathJax>

            <p>Second, determine the relative attachment point for the component relative to the building’s mean roof height. This is provided in the problem description:</p>
            <MathJax className='mb-6'>
                {`\\(z = ${z}\\ ft,\\ h = ${h}\\ ft\\)`}
            </MathJax>

            <p>Third, use the equations 13.1-1, 13.3-2, and 13.3-3 to solve for the component force.</p>
            <MathJax className='flex justify-self-start mb-6'>
                {`\\begin{align}
                        F_{p} &= \\frac{0.4a_{p}S_{DS}W_{p}}{(\\frac{R_{p}}{I_{p}})}(1 + 2\\frac{z}{h}) \\\\[5px]
                        &= \\frac{0.4(${ap})(${SDS})(${Wp})}{${Rp}}(1 + 2\\frac{${z}}{${h}}) \\\\[5px]
                        &= ${Fp_original}\\ lb
                    \\end{align}`}
            </MathJax>

            <MathJax>
                {`\\(F_{p}\\) is not required to be taken as greater than`}
            </MathJax>
            <MathJax className='flex justify-self-start mb-6'>
                {`\\begin{align}
                        F_{pmax} &= 1.6S_{DS}I_{p}W_{p} \\\\[5px]
                        &= 1.6(${SDS})(${Ip})(${Wp}) \\\\[5px]
                        &= ${Fp_max}\\ lb
                    \\end{align}`}
            </MathJax>

            <MathJax>
                {`and \\(F_{p}\\) shall not be taken as less than`}
            </MathJax>
            <MathJax className='flex justify-self-start mb-6'>
                {`\\begin{align}
                        F_{pmin} &= 0.3S_{DS}I_{p}W_{p} \\\\[5px]
                        &= 0.3(${SDS})(${Ip})(${Wp}) \\\\[5px]
                        &= ${Fp_min}\\ lb
                    \\end{align}`}
            </MathJax>

            <MathJax className='flex justify-self-start mb-6'>
                {/* {`\\(\\eqalign{
                        F_{p} &= max(min(F_{p},\\ F_{pmax}),\\ F_{pmin}) \\\\[5px]
                        &= max(min(${Fp_original}\\ lb,\\ ${Fp_max}\\ lb),\\ ${Fp_min}\\ lb) \\\\[5px]
                        &= ${answer}\\ lb
                    }\\)`} */}
                {`\\begin{align}
                        F_{p} &= max(min(F_{p},\\ F_{pmax}),\\ F_{pmin}) \\\\[5px]
                        &= max(min(${Fp_original}\\ lb,\\ ${Fp_max}\\ lb),\\ ${Fp_min}\\ lb) \\\\[5px]
                        &= ${answer}\\ lb
                    \\end{align}`}
            </MathJax>
            <MathJax>
                {`The seismic force on the component is \\(${answer}\\ lb\\).`}
            </MathJax>
        </Fragment>
    );
}