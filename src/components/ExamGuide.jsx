import UnderConstruction from './UnderConstruction.jsx';

export default function ExamGuide( { display=false }) {

  if (display === false) {
    return (
      <>
        <h1 data-testid="testExamGuideh1"> Exam Guide </h1>
        <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
      </>
    );
  } else {
    return ( <h1 data-testid="testExamGuideh1"> Exam Guide </h1>)
  }


}