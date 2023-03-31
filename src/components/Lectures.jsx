import UnderConstruction from './UnderConstruction.jsx';

export default function Lectures({ display=false }) {

  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return ( <h1> Lectures</h1>)
  }

}