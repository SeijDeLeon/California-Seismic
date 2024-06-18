import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { sections } from '../assets/data/ASCE7/CH1/sections.js';
// import data from somewhere. for now, create a small data object
/* const fakeData = {
  '12.1.1' : {
    title: 'Basic Requirements',
    body: 'The seismic analysis and design procedures to be used in the design of building structures....',
    img: 'image goes here. this should be a reference to an image in the public/images/ASCE7/CHx folder.'
  }
}; */

export default function ASCE7() {

  //if this functionality requires more than a single component, then all components need to go into a ASCE7 folder in components/features/ASCE7 and should be imported into this file.
  //text data for ASCE7 may live within the src/assets/data/ASCE7/CHX folder. Images should be kept in public/images/ASCE7 so that we avoid having to bundle them and load them in our main website.

  //this function should accept parameters corresponding to a specific code section.
  //if no parameters are found, (indicating that the url is californiaseismic.com/ASCE7) then we should have a minimal display of all available sections that can be displayed as links.
  //If a user clicks the link, the section should appear in a box below or to the right of the link list (without using react router)

  const { sectionParam } = useParams(); //retrieve section from url. This is a string value. this 'section' key exactly matches the :section in the route path in App.js, if one changes so must the other
  console.log({sectionParam});

  const [ section, setSection ] = useState(sectionParam); //hold state variable which will trigger render of new content if link is clicked

  const handleSectionLinkClick = (key) => {
    //logic here
  }

  const imgPath = 'ASCE7/CH1/';
  const imageUrl = `${process.env.PUBLIC_URL}/ASCE7/CH1`; //this is not working.. I can't get the image to show up..

  if ( section in sections) {
    return (
      <h1>We found the section. Display it here</h1>
    )
  } else {
    //in this section I am trying to display the first image only, though it isn't working.
    return (
      <main>
        <h1>We didn't find the section, or you navigated to the /ASCE7 path without any additional params.</h1>
        <ul>
          {Object.keys(sections).map((key) => {
            return (
              <li key={key}>
                <p>{key}</p>
                <p>{sections[key].title}</p>
                <img src={`${imageUrl}${sections[key].imgs[0]}`} alt='asce7' />
              </li>
            )
          })}
        </ul>
      </main>
    )
  }
}