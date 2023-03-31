import UnderConstruction from './UnderConstruction.jsx';

export default function ExamGuide( { display=false }) {

  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return ( <h1> Exam Guide </h1>)
  }


}