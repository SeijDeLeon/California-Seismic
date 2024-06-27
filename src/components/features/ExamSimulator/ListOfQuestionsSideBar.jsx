import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

function ListOfQuestionsSideBar({
  selectedExam,
  selectedFlags,
  setCurrentQuestion,
}) {
  const [flagColors, setFlagColors] = useState(
    selectedExam.questions.map(() => 'gray')
  );

  const changeFlagColor = (index) => {
    const newFlagColors = [...flagColors];
    newFlagColors[index] = newFlagColors[index] === 'gray' ? 'red' : 'gray';
    setFlagColors(newFlagColors);
  };

  return (
    <aside className="w-full h-auto overflow-y-auto sm:w-1/3 md:w-1/4">
      <div className="top-0 pr-4 w-full grid grid-rows-1 grid-flow-col items-center">
        <ul className="flex flex-col space-y-2">
          {/* Question list */}
          {selectedExam.questions.map((question, index) => (
            <li
              key={index}
              className="bg-white p-2 rounded shadow border border-gray-300 flex items-center justify-between"
            >
              <div className="grid grid-cols-3 gap-4 w-full">
                {/* Flag Button */}
                <div className="flex items-center border-r border-gray-300 pr-2 justify-center">
                  <svg
                    className="flex space-x-4"
                    stroke={selectedFlags[index] ? 'black' : 'white'}
                    width="20"
                    height="20"
                  >
                    <CheckIcon cx="30" cy="30" r="20" strokeWidth="2" />
                  </svg>
                </div>
                {/* Question Number Button */}
                <div className="flex items-center border-gray-300 justify-center">
                  <button
                    className="rounded flex hover:bg-gray-400 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 px-4 py-1"
                    onClick={() => {
                      setCurrentQuestion(index);
                    }}
                    key={index}
                  >
                    <span className="">Q: {index + 1}</span>
                  </button>
                </div>
                {/* Flag SVG Button */}
                <div className="flex items-center border-l justify-center">
                  <button
                    onClick={() => changeFlagColor(index)}
                    className="bg-color-yellow rounded-lg p-2 flex items-center justify-center px-2"
                  >
                    <svg
                      fill={flagColors[index]}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke={flagColors[index]}
                      className="w-7 h-7"
                    >
                      <path d="M14.778.085A.5.5 0 0115 .5V8a.5.5 0 01-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 01-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 003 9.342V15.5a.5.5 0 01-1 0V.5a.5.5 0 011 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 001.349-.476l.019-.007.004-.002h.001" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default ListOfQuestionsSideBar;
