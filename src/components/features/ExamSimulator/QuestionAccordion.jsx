import React from 'react';
import { Element } from 'react-scroll';
import { FaChevronDown } from 'react-icons/fa';

const QuestionAccordion = ({
  ques,
  quesIdx,
  expandedIndex,
  handleOpenAccordionClick,
  currentQuestion,
  questionsState,
}) => {
  return (
      <div
        className={`mb-2 rounded-sm text-sm
  ${expandedIndex === quesIdx && 'border'}`}
        key={`question_${quesIdx}`}
      >
        {/* QUESTION DIV  */}
        <div
          onClick={() => handleOpenAccordionClick(quesIdx)}
          className={`flex justify-between w-full p-3 leading-6 rounded-t-sm
     bg-gray-100 hover:bg-gray-300 hover:cursor-pointer duration-74 transition-colors
     ${quesIdx !== expandedIndex && 'h-12'}
     ${currentQuestion === quesIdx && 'bg-gray-300'}`}
        >
          {/* question  */}
          <div className="text-start overflow-hidden">
            {ques.question
              .trim()
              .split('\n')
              .map((line, idx) => (
                <Element
                  name={`question${quesIdx + 1}`}
                  id={`question${quesIdx + 1}`}
                  key={`line_${idx}`}
                >
                  <p
                    className={`${idx > 1 && '&& indent-6'} ${
                      quesIdx !== expandedIndex && 'truncate'
                    }`}
                  >
                    {idx === 0 ? (
                      <span className="font-semibold mr-1">
                        Q{quesIdx + 1}:{' '}
                      </span>
                    ) : null}
                    {line}
                  </p>
                </Element>
              ))}
          </div>

          {/* down/left icons  */}
          <div className="flex items-center ml-4 text-gray-500">
            <FaChevronDown
              className={`duration-300 ${
                quesIdx === expandedIndex ? 'rotate-0' : 'rotate-90'
              }`}
            />
          </div>
        </div>

        {/* OPTIONS DIV  */}
        {quesIdx === expandedIndex && (
          <div>
            {/* IMAGE FOR QUESTION  */}
            <div>
              {ques.question_img && (
                <div className="flex gap-4 flex-wrap m-6">
                  {ques.question_img &&
                    ques.question_img.map((img, imgIdx) => (
                      <img
                        key={`img_${imgIdx}`}
                        src={img}
                        alt={img}
                        className="object-contain max-h-40"
                      />
                    ))}
                </div>
              )}
            </div>

            {/* OPTIONS  */}
            <div className="grid grid-cols-1 gap-4 text-left p-6">
              {ques.options.map((option, optionIdx) => (
                <div key={`option_${optionIdx}`} className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="answer"
                    value={option.id}
                    disabled
                    checked={
                      questionsState.questions[quesIdx].selectedOption ===
                      optionIdx
                    }
                  />
                  {/* generateRandomQuestions: add images for options   */}
                  <span
                    className={`${
                      option.isCorrect &&
                      'bg-gradient-to-r from-blue-100 to-blue-50'
                    }
                ml-2 p-2 rounded`}
                  >
                    <p className="px-2">{option.text}</p>
                  </span>

                  {option.image && (
                    <img
                      src={option.image.src}
                      alt={option.image.alt}
                      className="max-h-20 ml-3"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  );
};

export default QuestionAccordion;
