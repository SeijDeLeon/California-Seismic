import { useState } from 'react';

export default function USGS() {

const [address, setAddress] = useState('');
const [addressData, setAddressData] = useState('');
const [riskCategory, setRiskCategory] = useState('');
const [siteClass, setSiteClass] = useState('');
const [log, setLog] = useState('');

const handleAddressSubmit = async (address) => {
  //remove leading/trailing whitespaces in text input
  let cleanAddress = address.trim();

  //replace inner spaces with '+'
  cleanAddress = cleanAddress.replace(' ', '+');

  const url = 'https://geocode.maps.co/search?q=';

  //make request to endpoint with await
  try {
    const response = await fetch(url + cleanAddress);
    const responseArray = await response.json();
    setAddressData(responseArray[0]);
    console.log(responseArray[0]);
  } catch(error) {
    console.log('an error occurred in the handleAddressSubmit' + error);
  }
}

const handleUSGSSubmit = async () => {
  const url = 'https://earthquake.usgs.gov/ws/designmaps/asce7-16.json?latitude=' + addressData.lat + '&longitude=' + addressData.lon + '&riskCategory=' + riskCategory + '&siteClass=' + siteClass + '&title=Example';
  let cleanParameters = '';
  //check if ther required parameters exist before making a call
  if (addressData === '' || siteClass === '' || riskCategory === '') {
    setLog('Please ensure that a risk cateogry and site class have been selected');
  }
  try {
    const response = await fetch(url + cleanParameters);
    const responseData = await response.json();
    console.log(responseData); //delete after testing
    setLog(JSON.stringify(responseData)); //delete after testing
  } catch(error) {
    console.log('Error in handleUSGSSubmit function ' + error);
  }
}


  const Address = () => {
    return(
      <div className='flex flex-col m-auto border max-w-md'>
        <h2 className=''>Address</h2>
        <input className='text-center' name="address" value={address} onChange={e=>setAddress(e.target.value)}></input>
        <div>
          <button className='px-2 hover:pointer bg-slate-200 hover:bg-slate-100' onClick={()=>handleAddressSubmit(address)}>Obtain Coordinates</button>
        </div>
      </div>
    )
  };


  const AddressResults = () => {
    return (
      <div className='flex flex-col m-auto border max-w-md'>
        <h2>Address Results</h2>
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Results</th>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{addressData.display_name}</td>
            </tr>
            <tr>
              <td>Lattitude: </td>
              <td>{addressData.lat}</td>
              </tr>
            <tr>
              <td>Longitude: </td>
              <td>{addressData.lon}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  };

  const ParameterSelect = () => {
    const riskCategories = ['I', 'II', 'III', 'IV'];
    const siteClasses = ['A', 'B', 'C', 'D', 'E', 'F'];
    return (
      <div className='flex flex-col m-auto border max-w-md'>
        <h2>Parameter Select</h2>
        <p>Risk Categories</p>
        {riskCategories.map((rc) => {
          return (
            <label key={rc}> <input type='radio' name='riskCat' checked={rc === riskCategory} onChange={(e) => setRiskCategory(e.target.value)} value={rc} />{rc}</label>
          )
        })}
        <p>Site Class</p>
        {siteClasses.map((sc) => {
          return (
            <label key={sc}> <input type='radio' name='siteClass' checked={sc === siteClass} onChange={(e) => setSiteClass(e.target.value)} value={sc} /> {sc} </label>
          )
        })}
        <div>
          <button className='px-2 hover:bg-slate-100 bg-slate-200 round-lg w-auto' onClick={() => handleUSGSSubmit()}>Submit USGS</button>
        </div>
      </div>
    )
  };

  const Results = () => {
    return (
      <div className='flex flex-col m-auto border max-w-md'>
        <h2>Results</h2>
      </div>
    )
  };

  return (
    <main>
      <h1>USGS Map Tool</h1>
      {Address()}
      {addressData !== '' ? <AddressResults /> : <p>Submit results to continue</p>}
      {addressData !== '' ? <ParameterSelect /> : <></>}
      <Results />
      <p>{log}</p>
    </main>
  );
}