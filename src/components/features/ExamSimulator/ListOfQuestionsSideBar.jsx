import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

function ListOfQuestionsSideBar({
  selectedExam,
  selectedFlags,
  setCurrentQuestion,
  onFlaggedMode,
  questionsState,
  currentQuestion,
  currentFlaggedQuestion,
  setCurrentFlaggedQuestion,
  flaggedQuestions,
  setFlaggedQuestions,

}) {
  const [flagColors, setFlagColors] = useState(
    selectedExam.questions.map(() => 'gray')
  );

  const changeFlagColor = (index) => {
    const newFlagColors = [...flagColors];
    newFlagColors[index] = newFlagColors[index] === 'gray' ? 'orange' : 'gray';
    setFlagColors(newFlagColors);

    //change flagged value, flag/unflag ques
    const newQuestionsState = {
      ...questionsState.current,
      questions: questionsState.current.questions.map((ques, idx) => {
        if (idx === index) {
          return {
            ...ques,
            flagged: !ques.flagged,
          };
        }

        return ques;
      }),
    };

    // setQuestionsState(newQuestionsState);
    questionsState.current = newQuestionsState;
    flaggedQuestions = {...questionsState.current}.questions.filter(
      (ques) => ques.flagged
    );
    setFlaggedQuestions(flaggedQuestions)


    //on flag mode: keep track flagged ques and current ques
    if (onFlaggedMode) {
      if (flaggedQuestions.length > 0) {
        currentFlaggedQuestion = currentFlaggedQuestion % flaggedQuestions.length;
        setCurrentFlaggedQuestion(currentFlaggedQuestion)

        currentQuestion = flaggedQuestions[currentFlaggedQuestion].idx
        setCurrentQuestion(currentQuestion);
      } else {
        currentFlaggedQuestion = 0;
        setCurrentFlaggedQuestion(currentFlaggedQuestion)
      }
    }

  };

  //flagged mode: when selecting
  const handleSetCurrentFlaggedQuestion = (index) => {

    // set current question 
    currentQuestion = index;
    setCurrentQuestion(index)

    flaggedQuestions.forEach((ques, idx) => {
      if (ques.idx === index) {
        setCurrentFlaggedQuestion(idx);
        currentFlaggedQuestion = idx;
      }
    });
  };

  return (
    <aside className="w-full h-auto overflow-y-auto sm:w-1/3 md:w-1/4">
      <div className="top-0 pr-4 w-full grid grid-rows-1 grid-flow-col justify-items-center">
        {/* FLAGGED MODE  */}
        {onFlaggedMode ? (
          <ul className="flex flex-col space-y-2 w-full">
            {/*Flagged Question list */}
            {flaggedQuestions.length <= 0 ? (
              <li className="bg-green-500 text-white font-bold p-4 rounded shadow text-base">
                No More Flagged Questions
              </li>
            ) : (
              <>
                <li
                  key="title"
                  className="bg-orange-500 text-white font-bold p-4 rounded shadow text-center"
                >
                  On Flagged Mode
                </li>
                {questionsState.current.questions.map(
                  (ques, index) =>
                    ques.flagged && (
                      <li
                        key={index}
                        className="bg-white p-2 rounded shadow flex items-center justify-between"
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
                              <CheckIcon
                                cx="30"
                                cy="30"
                                r="20"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>
                          {/* Question Number Button */}
                          <div className="flex items-center border-gray-300 justify-center">
                            <button
                              className={`rounded flex px-4 py-1 hover:bg-gray-400 
                      active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300
                      ${currentQuestion === index && 'bg-gray-200'}`}
                              onClick={() => {
                                // currentQuestion = index;
                                // setCurrentQuestion(index);
                                handleSetCurrentFlaggedQuestion(index);
                              }}
                              key={index}
                            >
                              <span className="">Q: {index + 1}</span>
                            </button>
                          </div>
                          {/* Flag SVG Button */}
                          <div className="flex items-center border-l justify-center">
                            <button
                              onClick={() => {
                                changeFlagColor(index);
                              }}
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
                    )
                )}
              </>
            )}
          </ul>
        ) : (
          // NO FLAGGED MODE
          <ul className="flex flex-col space-y-2 w-full">
            {/* Question list */}
            {selectedExam.questions.map((question, index) => (
              <li
                key={index}
                className="bg-white p-2 rounded shadow flex items-center justify-between"
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
                      className={`rounded flex px-4 py-1 hover:bg-gray-400 
                      active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300
                      ${currentQuestion === index && 'bg-gray-200'}`}
                      onClick={() => {
                        currentQuestion = index;
                        setCurrentQuestion(index);
                      }}
                      key={index}
                    >
                      <span>Q: {index + 1}</span>
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
        )}
      </div>
    </aside>
  );
}

export default ListOfQuestionsSideBar;
