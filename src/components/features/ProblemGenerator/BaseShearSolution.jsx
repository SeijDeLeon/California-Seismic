import { Fragment } from 'react';
import SolutionCs from '../Solver/SolutionCs';
import SolutionV from '../Solver/SolutionV';
import SolutionCvx from '../Solver/SolutionCvx';
import SolutionFvx from '../Solver/SolutionFvx';

export default function BaseShearSolution({CsInputs, Cs, VInputs, V, CvxInputs, Cvx, FvxInputs, FvxFixedFourPlaces}) {
    return (
        <Fragment>
            <SolutionCs inputs={CsInputs} result={Cs} />
            <br />
            <br />
            <SolutionV inputs={VInputs} result={V} />
            <br />
            <br />
            <SolutionCvx inputs={CvxInputs} result={Cvx} />
            <br />
            <br />
            <SolutionFvx inputs={FvxInputs} result={FvxFixedFourPlaces} />
        </Fragment>
    );
}