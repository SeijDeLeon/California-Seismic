import { Fragment } from 'react';
import { MathJax } from "better-react-mathjax";
export default function BaseShearQuestion({stories, firstStoryHeight, otherStoryHeights, etswOtherLevels, etswRoof, T, LFRSname, R, Cd, omega, buildingName, RC, Ie, SDS, SD1, S1, TL} ) {
    return (
        <Fragment>
            <p>Determine the vertical and horizontal distribution of seismic forces in the following building structure. Assume that a site specific ground motion hazard is not required, and that amplification to forces per 11.4.8 are not required.</p>
            <br />
            <p className="underline">Building Parameters:</p>
            <p className="font-normal">
                <MathJax>
                    {`Number of stories: \\(${stories}\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`First story height: \\(${firstStoryHeight}\\ ft\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`All other story heights: \\(${otherStoryHeights}\\ ft\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`Effective Tributary Seismic Weight at the roof \\(= ${etswRoof}\\ kips\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`Effective Tributary Seismic Weight at all other levels \\(= ${etswOtherLevels}\\ kips\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`Fundamental Period \\((T) = ${T}\\ s\\)`}
                </MathJax>
            </p>
            <br />
            <p className="font-normal">LFRS: {LFRSname}</p>
            <p className="font-normal">
                <MathJax>
                    {`\\(R = ${R}\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`\\(C_{d} = ${Cd}\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`\\(\\Omega_{0} = ${omega}\\)`}
                </MathJax>
            </p>
            <br />
            <p className="font-normal">Building Description: {buildingName}</p>
            <p className="font-normal">
                <MathJax>
                    {`Risk Category \\((RC) = ${RC}\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`Importance Factor \\((I_{e}) = ${Ie}\\)`}
                </MathJax>
            </p>
            <br />
            <p className="underline">Site Parameters:</p>
            <p className="font-normal">
                <MathJax>
                    {`\\(S_{DS} = ${SDS}\\ g\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`\\(S_{D1} = ${SD1}\\ g\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`\\(S_{1} = ${S1}\\ g\\)`}
                </MathJax>
            </p>
            <p className="font-normal">
                <MathJax>
                    {`\\(T_{L} = ${TL}\\ s\\)`}
                </MathJax>
            </p>
        </Fragment>
    );
}