import React from 'react';
import {
  FaChevronDown,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronLeft,
} from 'react-icons/fa';

const ControlButtons = ({
  showedInCorrectQuestions,
  currentQuestion,
  incorrectQuestionList,
  handlePreClick,
  handleNextClick,
  questionsState,
}) => {
  return (
    <div>
      {/* Pre-Next buttons */}
      <div className="flex justify-center gap-2 text-gray-600 text-3xl mt-6">
        <button
          className={`
                ${
                  !showedInCorrectQuestions &&
                  currentQuestion === 0 &&
                  'text-gray-400 hover:cursor-default'
                } 
                ${
                  incorrectQuestionList.questions &&
                  showedInCorrectQuestions &&
                  currentQuestion === incorrectQuestionList.questions[0]?.idx &&
                  'text-gray-400 hover:cursor-default'
                }
                ${
                  !showedInCorrectQuestions &&
                  currentQuestion !== 0 &&
                  'hover:text-gray-800 duration-75'
                }
                ${
                  incorrectQuestionList.questions &&
                  showedInCorrectQuestions &&
                  currentQuestion !== incorrectQuestionList.questions[0]?.idx &&
                  'hover:text-gray-800 duration-75'
                }
                `}
          onClick={handlePreClick}
          disabled={
            (!showedInCorrectQuestions && currentQuestion === 0) ||
            (showedInCorrectQuestions &&
              currentQuestion === incorrectQuestionList.questions[0]?.idx)
          }
        >
          <FaArrowAltCircleLeft />
        </button>
        <button
          className={`
                ${
                  !showedInCorrectQuestions &&
                  currentQuestion === questionsState.questions.length - 1 &&
                  'text-gray-400 hover:cursor-default'
                } 
                ${
                  incorrectQuestionList.questions &&
                  showedInCorrectQuestions &&
                  currentQuestion ===
                    incorrectQuestionList.questions[
                      incorrectQuestionList.questions.length - 1
                    ]?.idx &&
                  'text-gray-400 hover:cursor-default'
                }
                ${
                  !showedInCorrectQuestions &&
                  currentQuestion !== questionsState.questions.length - 1 &&
                  'hover:text-gray-800 duration-75'
                }
                ${
                  incorrectQuestionList.questions &&
                  showedInCorrectQuestions &&
                  currentQuestion !==
                    incorrectQuestionList.questions[
                      incorrectQuestionList.questions.length - 1
                    ]?.idx &&
                  'hover:text-gray-800 duration-75'
                }
                `}
          onClick={handleNextClick}
          disabled={
            (!showedInCorrectQuestions &&
              questionsState.questions.length - 1 === currentQuestion) ||
            (showedInCorrectQuestions &&
              incorrectQuestionList.questions[
                incorrectQuestionList.questions.length - 1
              ]?.idx === currentQuestion)
          }
        >
          <FaArrowAltCircleRight />
        </button>
      </div>

      {/* hint  */}
      <div className="mt-6 flex justify-start italic text-gray-600 text-xs">
        <div>
          <p className="font-semibold mr-1">Hint:</p>
        </div>

        <div>
          <div className=" items-center  flex">
            <div className="w-4 h-4 flex items-center justify-center rounded shadow mx-3 bg-gray-100">
              <FaChevronRight className="text-[8px]" />
            </div>
            <p>or</p>
            <div className="w-4 h-4 flex items-center justify-center rounded shadow mx-3 bg-gray-100">
              <FaChevronDown className="text-[8px]" />
            </div>
            next question
          </div>

          <div className="items-center flex mt-2">
            <div className="w-4 h-4 flex items-center justify-center rounded shadow mx-3 bg-gray-100">
              <FaChevronUp className="text-[8px]" />
            </div>
            <p>or</p>
            <div
              className="w-4 h-4 flex items-center justify-center rounded shadow
              mx-3 bg-gray-100"
            >
              <FaChevronLeft className="text-[8px]" />
            </div>
            previous question
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlButtons;
