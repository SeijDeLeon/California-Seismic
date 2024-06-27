import { sections as chapter1 } from "../../../assets/data/ASCE7/CH1/sections.js";
import { sections as chapter2 } from "../../../assets/data/ASCE7/CH2/sections.js";
import { sections as chapter10 } from "../../../assets/data/ASCE7/CH10/sections.js";
import { sections as chapter12 } from "../../../assets/data/ASCE7/CH12/sections.js";
import { sections as chapter13 } from "../../../assets/data/ASCE7/CH13/sections.js";
import { sections as chapter20 } from "../../../assets/data/ASCE7/CH20/sections.js";
  
// chapter data
const chapters = {
  chapter1,
  chapter2,
  chapter10,
  chapter12,
  chapter13,
  chapter20,
};

// custom styling based on section or subsection
const getMarginClass = (level) => {
  const marginClasses = ["ml-0", "ml-8"];
  return marginClasses[level];
};

const getFontSizeClass = (level) => {
  const fontSizeClasses = ["text-base", "text-sm"];
  return fontSizeClasses[level];
};

const Selector = () => {

  // recursive function to print out titles + subsection titles
  const renderTitles = (obj) => {
    const elements = [];

    function generateElements(subObj, level = 0) {
      for (const key in subObj) {
        if (subObj.hasOwnProperty(key)) {
          elements.push(
            <div
              key={key}
              className={`${getMarginClass(level)} ${getFontSizeClass(
                level
              )} mb-2`}
            >
              {key + " " + subObj[key].title}
            </div>
          );
          if (subObj[key].subsections) {
            generateElements(subObj[key].subsections, level + 1);
          }
        }
      }
    }

    generateElements(obj);
    return elements;
  };

  return (
    <>
      <h1 className="text-lg">Selector</h1>
      <div className="overflow-y-scroll max-h-96 text-left">
        {/* map thru all sections */}
        {Object.keys(chapters).map((chapterKey) => ( 
          <div key={chapterKey}>
            <h2 className="text-md font-bold">
              {chapterKey.slice(0, 1).toUpperCase() +
                chapterKey.slice(1, 7) +
                " " +
                chapterKey.slice(7)}
            </h2>
            {renderTitles(chapters[chapterKey])}
          </div>
        ))}
      </div>
    </>
  );
};

export default Selector;
