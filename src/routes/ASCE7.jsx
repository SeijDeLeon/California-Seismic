import { useParams } from "react-router-dom";
import { useState } from "react";
import Selector from "../components/features/ASCE7/Selector";
import Viewer from "../components/features/ASCE7/Viewer";

export default function ASCE7() {
  const { sectionParam } = useParams();
  const [section, setSection] = useState(sectionParam || "13.2.3");
  const handleSectionSelection = (key) => {
    setSection(key);
  };

  return (
    <section>
      <h1 className="text-center text-4xl my-4">ASCE7</h1>
      <div className="flex justify-between p-5 mx-4 gap-2">
        <div className="w-1/2 border border-gray-300 bg-gray-100 p-4">
          <Selector
            handleSectionSelection={handleSectionSelection}
            selectedSection={section}
          />
        </div>
        <div className="w-1/2 border border-gray-300 bg-gray-100 p-4">
          <Viewer section={section} />
        </div>
      </div>
    </section>
  );
}
