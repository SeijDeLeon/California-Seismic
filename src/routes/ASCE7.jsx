import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Selector from "../components/features/ASCE7/Selector";
import Viewer from "../components/features/ASCE7/Viewer";

export default function ASCE7() {
  const { sectionParam } = useParams();
  const [ section, setSection ] = useState(sectionParam || "1.1");
  const navigate = useNavigate();

  useEffect(() => {
    setSection(sectionParam || "1.1")
  }, [sectionParam])

  const handleSectionSelection = (key, obj) => {
    if (obj.imgs) {
      setSection(key);
      navigate(`/ASCE7/${key}`)
    }
  };

  return (
    <section>
      <h1 className="text-center text-4xl my-4">ASCE7</h1>
      <div className="flex justify-between p-5 mx-4 gap-2 h-[85vh]">
        <div className="w-1/2 border border-gray-300 bg-gray-100 p-4">
          <Selector
            handleSectionSelection={handleSectionSelection}
            selectedSection={section}
          />
        </div>
        <div className="w-1/2 border border-gray-300 p-4">
          <Viewer section={section} />
        </div>
      </div>
    </section>
  );
}
