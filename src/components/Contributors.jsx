import UnderConstruction from './UnderConstruction.jsx';

export default function Contributors( { display=false }) {

  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return ( <h1> Contributors </h1>)
  }


}