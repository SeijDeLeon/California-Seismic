import { useState } from 'react';

export default function USGS() {

const [address, setAddress] = useState('');
const [addressData, setAddressData] = useState('');
const [riskCategory, setRiskCategory] = useState('II');
const [siteClass, setSiteClass] = useState('C');
const [log, setLog] = useState('');
const [resultData, setResultData] = useState('');
const [resultArray, setResultArray] = useState([]);

const handleAddressSubmit = async (address) => {
  setResultData('');
  //remove leading/trailing whitespaces in text input
  let cleanAddress = address.trim();

  //replace inner spaces with '+' for the URL parameters
  cleanAddress = cleanAddress.replace(' ', '+');

  const url = 'https://geocode.maps.co/search?q=';

  try {
    const response = await fetch(url + cleanAddress);
    var responseArray = await response.json();

  } catch(error) {
    console.log('an error occurred in the handleAddressSubmit' + error);
    setLog('There was an error processing the request for you lattitude/longitude. Please try again.');
    return;
  }

  //check if array is empty
  if (responseArray.length === 0) {
    setLog('Your address did not return any results, please try again! Try entering only the street address and zip code if the issue persists.');
    setAddressData('');
  } else {
    setAddressData(responseArray[0]);
    console.log(responseArray[0]);
    setLog('');
  }
}

const handleUSGSSubmit = async () => {
  setResultData('');
  const url = 'https://earthquake.usgs.gov/ws/designmaps/asce7-16.json?latitude=' + addressData.lat + '&longitude=' + addressData.lon + '&riskCategory=' + riskCategory + '&siteClass=' + siteClass + '&title=Example';
  let cleanParameters = '';
  //check if ther required parameters exist before making a call
  if (addressData === '' || siteClass === '' || riskCategory === '') {
    setLog('Please ensure that a risk cateogry and site class have been selected');
  }
  try {
    const response = await fetch(url + cleanParameters);
    const responseData = await response.json();
    setResultData(responseData.response.data);
    storeResult(responseData.request, responseData.response);
  } catch(error) {
    console.log('Error in handleUSGSSubmit function ' + error);
    setLog('There was an error processing the request to USGS, please refresh the webpage and try again');
  }
}


  const Address = () => {
    return(
      <div className='my-4 m-auto max-w-md'>
        <label className='my-2 w-auto'>
          Address: <input className='text-left border' name="address" value={address} onChange={e=>setAddress(e.target.value)}></input>
        </label>
        <button className={`mx-2 rounded-lg px-2 hover:pointer hover:bg-slate-100 ${address ? 'bg-blue-400' : 'bg-slate-100'}`} onClick={()=>handleAddressSubmit(address)}>Go</button>
      </div>
    )
  };


  const AddressResults = () => {
    return (
      <div className='flex px-2 flex-col m-auto border max-w-md bg-slate-100 rounded-lg'>
        <h2 className='font-medium text-lg'>Location</h2>
        <p>Here are the results, make sure the address looks correct.</p>
        <div>
          <div className='flex text-left py-2'>
            <p className='px-2'>Address: </p>
            <p>{addressData.display_name}</p>
          </div>
          <div className='py-2 flex'>
            <p className='px-2'>Lattitude: </p>
            <p>{parseFloat(addressData.lat).toPrecision(6)}</p>
          </div>
          <div className='py-2 flex'>
            <p className='px-2'>Longitude: </p>
            <p>{parseFloat(addressData.lon).toPrecision(6)}</p>
          </div>
        </div>
      </div>
    )
  };

  const ParameterSelect = () => {
    const riskCategories = ['I', 'II', 'III', 'IV'];
    const siteClasses = ['A', 'B', 'C', 'D'];
    return (
      <div className='flex flex-col m-auto border max-w-md px-2 my-4 bg-slate-100 rounded-lg'>
        <h2 className='font-medium text-lg'>Site Specific Parameters</h2>
        <p className='text-left py-4'>Before sending your coordinates to USGS, we need to confirm a few basic parameters including Risk Category (relative importance of building) and Site Class (speed that shear waves can travel through the local ground soil).</p>
        <p className='text-left'>For a typical office building or home, the Risk Category is II. Site Class is determined from local soil parameters, which can be assumed as C if unknown. These values are needed to scale the USGS acceleration parameters to the specific site conditions.</p>
        <div className='flex justify-around py-2'>
          <div>
            <p>Risk Category</p>
            {riskCategories.map((rc) => {
              return (
                <label className='px-1' key={rc}> <input type='radio' name='riskCat' checked={rc === riskCategory} onChange={(e) => setRiskCategory(e.target.value)} value={rc} />{rc}</label>
              )
            })}
          </div>
          <div>
            <p>Site Class</p>
            {siteClasses.map((sc) => {
              return (
                <label className='px-1' key={sc}> <input type='radio' name='siteClass' checked={sc === siteClass} onChange={(e) => setSiteClass(e.target.value)} value={sc} /> {sc} </label>
              )
            })}
          </div>
        </div>
        <div className='my-2'>
          <button className='px-2 bg-blue-400 py-2 text-lg rounded-lg hover:bg-blue-100 bg-slate-200 round-lg w-auto' onClick={() => handleUSGSSubmit()}>Show Results</button>
        </div>
      </div>
    )
  };

  const Results = () => {
    const pga = resultData.pga.toPrecision(2);
    const sds = resultData.sds.toPrecision(3);
    return (
      <div className='flex flex-col m-auto border max-w-md px-2 my-4 rounded-lg space-y-2 bg-slate-100'>
        <p className='text-left py-2'>{`Here are the results for ${address}:`}</p>
        <div className='bg-sky-200 py-4'>
          <p className='text-lg text-center font-medium'>{`Peak Ground Acceleration = ${pga}g`}</p>
        </div>
        <div className='text-left space-y-2 py-2'>
          <p className='italic'>What does Peak Ground Acceleration (PGA) mean?</p>
          <p>{`The units of PGA are in 'g', which is Earth's Gravitational Acceleration. If you weigh 100 lbs on Earth from 1.0g, then during this earthquake your body could experience a horizontal acceleration of ${pga}g, or ${pga*100} lbs!` }</p>
          <p className='italic'>What kind of earthquake is expected to cause this PGA?</p>
          <p>The PGA calcuated from USGS is an estimated ground shaking that has no more than a 2% chance of exceedance in a 50 year period. Expressed as a return period, this would be an earthquake with a return period of approximately 2500 years.</p>
        </div>
        <div className='bg-sky-200 py-4'>
          <p className='text-lg text-center font-medium'>{`Short Period Design Acceleration = ${sds}g`}</p>
        </div>
        <div className='text-left space-y-2 py-2'>
          <p className='italic'>What is the Short Period Design Acceleration (Sds)?</p>
          <p>Sds is an acceleration parameter used in the design of building structures. It is different from the PGA, as Sds is actually used in a set of equations to determine the lateral design force on a building.</p>
          <p>Structural Engineers design building structures to resist this lateral force, and this is enforced at the building permitting stage. A set of plans and supporting calculations are reviewed by a Plan Reviewer to confirm the building has been appropriately designed to resist earthquakes.</p>
          <p className='italic'>What kind of earthquake is expected to cause this Sds acceleration?</p>
          <p>The Sds value calculated by USGS is an estimated ground shaking that has no more than a 10% chance of exceedance in a 50 year period. Expressed as a return period, this would be an earthquake with a return period of approximately 475 years. This acceleration is risk targeted, meaning that it is scaled to enforce a maximum level of risk for a building collapse during its lifetime.</p>
        </div>
      </div>
    )
  };

  const ResultTable = () => {
    return (
      <table className='table-auto m-auto max-w-2xl my-4 border-collapse border border-slate-300'>
        <thead>
          <tr>
            <th className='border border-slate-300'>Address</th>
            <th className='border border-slate-300'>Risk Category</th>
            <th className='border border-slate-300'>Site Class</th>
            <th className='border border-slate-300'>PGA</th>
            <th className='border border-slate-300'>Sds</th>
          </tr>
        </thead>
        <tbody>
          {resultArray.map(({address, pga, sds, rc, sc}) => {
            return (
              <tr key={address+pga+sds+rc+sc}>
                <td className='text-left border border-slate-300'>{address}</td>
                <td className='border border-slate-300'>{rc}</td>
                <td className='border border-slate-300'>{sc}</td>
                <td className='border border-slate-300 px-2'>{pga}</td>
                <td className='border border-slate-300 px-2'>{sds}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  const storeResult = (request, response) => {
    let address = addressData.display_name;
    let pga = response.data.pga.toPrecision(2);
    let sds = response.data.sds.toPrecision(3);
    let rc = request.parameters.riskCategory;
    let sc = request.parameters.siteClass;

    //check if the current result is unique
    for (var i = 0; i < resultArray.length; i++) {
      if (resultArray[i].address === address && resultArray[i].sc === sc && resultArray[i].rc === rc ) {
        return;
      }
    }

    //add to results table
    let entry = {address: address, pga: pga, sds: sds, rc: rc, sc: sc};
    let newArray = resultArray;
    newArray.push(entry);

    setResultArray(newArray);
  }
  return (
    <main>
      <h1 className='text-xl font-bold'>Earthquake Acceleration Tool</h1>
      <div className='text-left m-auto max-w-lg py-8'>
        <p className='py-2'>Have you ever wondered what an earthquake might feel like where you live? Find out with our interactive earthquake accerlation tool.</p>
        <p className='py-2'>USGS (United States Geological Survey) can use your lattitude and longitude alongside historical data to verify the anticipated ground shaking hazard over a time duration.</p>
        <p className='py-2'>Our web tool verifies your address coordinates, requests the relevant data from USGS, and displays the peak ground acceleration for your location. To start, simply enter your address and follow the prompts.</p>
      </div>
      {Address()}
      {addressData !== '' ? <AddressResults /> : <></>}
      {addressData !== '' ? <ParameterSelect /> : <></>}
      {resultData !== '' ? <Results /> : <></>}
      <p>{log}</p>
      {resultArray.length !== 0 ? <ResultTable /> : <></>}
    </main>
  );
}