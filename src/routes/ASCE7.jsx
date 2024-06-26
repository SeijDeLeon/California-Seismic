import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { sections } from '../assets/data/ASCE7/CH1/sections.js';
import Selector from '../components/features/ASCE7/Selector';
import Viewer from '../components/features/ASCE7/Viewer';

export default function ASCE7() {

  const { sectionParam } = useParams();
  const [ section, setSection ] = useState(sectionParam);

  const handleSectionLinkClick = (key) => {
    setSection(key);
  }

  const imgPath = 'ASCE7/CH1/';
  const imageUrl = `${process.env.PUBLIC_URL}/ASCE7/CH1/`; 

  return (
    <div className="flex justify-between p-5">
      <div className="w-2/5 border border-gray-300 bg-gray-100 p-4">
        <Selector 
          sections={sections} 
          handleSectionLinkClick={handleSectionLinkClick} 
          selectedSection={section}
        />
      </div>
      <div className="w-3/5 border border-gray-300 bg-gray-100 p-4">
        <Viewer 
          section={sections[section]} 
          imageUrl={imageUrl} 
        />
      </div>
    </div>
  );
}