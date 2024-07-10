import React from 'react';
import { Link } from 'react-router-dom';

function ExamScorePopUpModal({
  visible,
  onClose,
  questionsState,
}) {
  if (!visible) return null;


  const numberOfAnsweredQuestions = questionsState.questions.filter(
    (ques) => ques.answered !== null
  ).length;

  const numberOfFlaggedQuestions = questionsState.questions.filter(
    (ques) => ques.flagged
  ).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-lg w-4/5 md:w-2/5 h-auto">

        {/* HEADER  */}
        <div className="py-3 pl-6 text-start">
          <p className="font-medium text-gray-600">SUBMIT</p>
        </div>

        <hr />

        {/* TEXT  */}
        <div className="max-w-6xl pl-6 py-6 mx-auto leading-10 text-lg tracking-wide text-start">
          {numberOfAnsweredQuestions < questionsState.questions.length && (
            <p>
              You still have{' '}
              <span className="text-red-400 font-bold">
                {questionsState.questions.length - numberOfAnsweredQuestions}
              </span>{' '}
              unanswered questions.
            </p>
          )}
          {numberOfFlaggedQuestions > 0 && (
            <p>
              You still have{' '}
              <span className="text-red-400 font-bold">
                {numberOfFlaggedQuestions}
              </span>{' '}
              flagged questions.
            </p>
          )}
          {numberOfAnsweredQuestions === questionsState.questions.length &&
            numberOfFlaggedQuestions === 0 && (
              <p className="text-lg">
                <span className="text-blue-400">Congratulation!</span> You have
                fininshed your exam.
              </p>
            )}
        </div>

        <hr />

        {/* BUTTONS  */}
        <div className="flex justify-end py-3 pr-6">
          <div className="flex flex-row gap-4">
            <div>
              <button
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200 duration-75 transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
            <div>
              <Link to={`/practice/exams/0/result`} state={{ questionsState }}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 duration-75 transition-colors">
                  {numberOfAnsweredQuestions <
                    questionsState.questions.length ||
                  numberOfFlaggedQuestions > 0 ? (
                    <span>Continue to submit ?</span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamScorePopUpModal;
