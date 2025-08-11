import { Fragment } from 'react';
import SolutionCs from '../Solver/SolutionCs';
import SolutionV from '../Solver/SolutionV';
import SolutionCvx from '../Solver/SolutionCvx';
import SolutionFvx from '../Solver/SolutionFvx';

export default function BaseShearSolution({ CsInputs, Cs, VInputs, V, CvxInputs, Cvx, FvxInputs, FvxFixedFourPlaces }) {
    return (
        <div className='space-y-3'>
            <SolutionCs inputs={CsInputs} result={Cs} />
            <SolutionV inputs={VInputs} result={V} />
            <SolutionCvx inputs={CvxInputs} result={Cvx} />
            <SolutionFvx inputs={FvxInputs} result={FvxFixedFourPlaces} />
        </div>
    );
}