import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Selector from "../components/features/ASCE7/Selector";
import Viewer from "../components/features/ASCE7/Viewer";

export default function ASCE7() {
  const { sectionParam } = useParams();
  const [ section, setSection ] = useState(sectionParam || "1.1");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [indexClicked, setIndexClicked] = useState(false);
  const navigate = useNavigate();
  const viewerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSection(sectionParam || "1.1")
  }, [sectionParam])

  useEffect(() => {
    if (isMobile && indexClicked && viewerRef.current) { // Check if index was clicked
      viewerRef.current.scrollIntoView({ behavior: 'smooth' });
      setIndexClicked(false); // Reset the click state
    }
  }, [section, isMobile, indexClicked]);

  const handleSectionSelection = (key, obj) => {
    if (obj.imgs) {
      setSection(key);
      setIndexClicked(true);
      navigate(`/ASCE7/${key}`)
    }
  };

  return (
    <section>
      <h1 className="text-center text-4xl my-4">ASCE7</h1>
      <div className="flex flex-col items-center md:flex-row justify-between p-5 mx-4 gap-2 h-full md:h-[85vh] 2xl:max-w-screen-2xl 2xl:mx-auto">
        <div className="w-4/5 md:w-1/2 border border-gray-300 bg-gray-100 p-4">
          <Selector
            handleSectionSelection={handleSectionSelection}
          />
        </div>
        <div ref={viewerRef} className="w-4/5 md:w-1/2 border border-gray-300 p-4">
          <Viewer section={section} />
        </div>
      </div>
    </section>
  );
}
