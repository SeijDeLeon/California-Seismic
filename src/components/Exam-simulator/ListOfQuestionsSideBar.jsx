import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

function ListOfQuestionsSideBar({selectedExam, selectedFlags, setCurrentQuestion}){
    const [triangleColors, setTriangleColors] = useState(selectedExam.questions.map(() => 'gray'));

    const changeTriangleColor = (index) => {
      const newTriangleColors = [...triangleColors];
      newTriangleColors[index] = newTriangleColors[index] === 'gray' ? 'red' : 'gray';
      setTriangleColors(newTriangleColors);
    };
  

    return (
        <aside className="w-full h-auto overflow-y-auto sm:w-1/3 md:w-1/4 px-2">
      <div className="top-0 p-4 py-2 w-full grid grid-rows-1 grid-flow-col items-center">
        <ul className="flex flex-col space-y-2">
          {/* Question list */}
          {selectedExam.questions.map((question, index) => (
            <li
              key={index}
              className="bg-white p-2 rounded shadow border border-gray-300 flex items-center justify-between"
            >
              <div className="grid grid-cols-3 gap-4 w-full">
                {/* Flag Button */}
                <div className="flex items-center border-r border-gray-300 pr-2">
                  <svg
                    className="flex space-x-4"
                    stroke={selectedFlags[index] ? 'black' : 'white'}
                    width="30"
                    height="30"
                  >
                    <CheckIcon cx="30" cy="30" r="20" strokeWidth="2" />
                  </svg>
                </div>
                {/* Question Number Button */}
                <div className="flex items-center border-r border-gray-300 pr-2">
                  <button className="rounded flex hover:bg-gray-400 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 px-1" onClick={() => {setCurrentQuestion(index);}} key={index}>
                    <span className="ml-2">Q: {index + 1}</span>
                  </button>
                </div>
                {/* Triangle SVG Button */}
                <div className="flex items-center">
                  <button onClick={() => changeTriangleColor(index)} className="bg-color-yellow rounded-lg p-2 flex items-center justify-center px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke={triangleColors[index]}
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
    )
}

export default ListOfQuestionsSideBar;