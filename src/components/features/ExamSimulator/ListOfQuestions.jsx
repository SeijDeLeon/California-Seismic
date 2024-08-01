import React from 'react';
import { LiaTimesSolid, LiaCheckSolid } from 'react-icons/lia';
import {Link as ScrollLink } from 'react-scroll';

const ListOfQuestions = ({
  showedInCorrectQuestions,
  questionsState,
  currentQuestion,
  setCurrentQuestion,
  incorrectQuestionList,
}) => {
  return (
    <div>
      <div className="justify-start flex flex-col flex-wrap h-96 gap-1.5 p-2 mt-3">
        {!showedInCorrectQuestions ? (
          questionsState.questions.length > 0 &&
          questionsState.questions.map((ques, quesIdx) => (
            <ScrollLink
              to={`question${quesIdx + 1}`}
              smooth={true}
              offset={-70}
              key={`quesTable_${quesIdx}`}
            >
              <div
                className={`font-light flex gap-1 rounded items-center pl-2 py-0.5 
                    bg-gray-50 shadow text-xs
                  hover:bg-zinc-300 duration-75 transition-colors hover:cursor-pointer
                  ${currentQuestion === ques.idx && 'bg-zinc-300'}`}
                onClick={() => setCurrentQuestion(ques.idx)}
              >
                {ques.isCorrectAnswered ? (
                  <LiaCheckSolid className={`text-blue-500 text-[10px]`} />
                ) : (
                  <LiaTimesSolid className={`text-red-500 text-[10px]`} />
                )}
                <p>{ques.idx + 1}</p>
              </div>
            </ScrollLink>
          ))
        ) : incorrectQuestionList.questions.length > 0 ? (
          incorrectQuestionList.questions.map((ques, quesIdx) => (
            <ScrollLink
              to={`question${ques.idx + 1}`}
              smooth={true}
              offset={-70}
              key={`quesTable_${quesIdx}`}
            >
              <div
                className={`font-light flex gap-1 rounded items-center pl-2 py-0.5 bg-gray-50 shadow text-xs
                  hover:bg-zinc-300 duration-75 transition-colors hover:cursor-pointer
                  ${currentQuestion === ques.idx && 'bg-zinc-300'}`}
                onClick={() => setCurrentQuestion(ques.idx)}
              >
                {ques.isCorrectAnswered ? (
                  <LiaCheckSolid className={`text-blue-500 text-[10px]`} />
                ) : (
                  <LiaTimesSolid className={`text-red-500 text-[10px]`} />
                )}
                <p>{ques.idx + 1}</p>
              </div>
            </ScrollLink>
          ))
        ) : (
          <p className="text-sm">
            Excellent! You don't have any incorrect questions.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListOfQuestions;
