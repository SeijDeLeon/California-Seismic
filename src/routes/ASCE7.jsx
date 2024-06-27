import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Selector from '../components/features/ASCE7/Selector';
import Viewer from '../components/features/ASCE7/Viewer';

export default function ASCE7() {
  const { sectionParam } = useParams();
  const [ section, setSection ] = useState(sectionParam || "13.2.3");
  const handleSectionSelection = (key) => {
    setSection(key);
  }

  return (
    <div>
      <h1 className="text-center text-4xl mt-4 mb-4">ASCE7</h1>
      <div className="flex justify-between p-5">
      <div className="w-2/5 mr-4 border border-gray-300 bg-gray-100 p-4">
        <Selector
          handleSectionSelection={handleSectionSelection}
          selectedSection={section}
        />
      </div>
      <div className="w-3/5 border border-gray-300 bg-gray-100 p-4">
        <Viewer
          section={section}
        />
      </div>
    </div>
    </div>
  );
}