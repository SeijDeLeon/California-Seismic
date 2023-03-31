import UnderConstruction from './UnderConstruction.jsx';

export default function Practice( { display=false }) {

  if (display === false) {
    return (
      <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
    );
  } else {
    return ( <h1> Practice</h1>)
  }


}