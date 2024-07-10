import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { exams } from '../../../assets/data/duplicateQuestionData.js';
import { randomExams } from '../../../assets/data/randomExams.js'; //generateRandomQuestions
import ExamScorePopUpModal from './ExamScorePopUp.jsx';
import ListOfQuestionsSideBar from './ListOfQuestionsSideBar.jsx';
import Timer from './Timer.js';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { FaFlag } from 'react-icons/fa6';
import { RxSlash } from 'react-icons/rx';

function SinglePracticeExam() {
  const { examId } = useParams();
  // const selectedExam = exams[examId]; // Find the selected exam using the examId
  const selectedExam = randomExams[examId]; //generateRandomQuestions: new selectedExam from randomExams
  const [currentQuestion, setCurrentQuestion] = useState(0); //Tracks the index of the current question being displayed.
  const [showPopUp, setShowPopUp] = useState(false); //Controls the visibility of the exam score pop-up modal.
  const [selectedOption, setSelectedOption] = useState(null); //Holds the ID of the selected option for the current question.
  const [selectedFlags, setSelectedFlags] = useState(
    //An array of booleans that tracks whether a question has been flagged or not.
    Array(selectedExam.questions.length).fill(false)
  );
  const [onFlaggedMode, setOnFlaggedMode] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [currentFlaggedQuestion, setCurrentFlaggedQuestion] = useState(0);
  const [questionsState, setQuestionsState] = useState({
    ...selectedExam,
    questions: selectedExam.questions.map((question, idx) => ({
      ...question,
      flagged: false, //question is flagged or not
      answered: null, //question is answered or not
      selectedOption: null, // Add selectedOption property for each question
      idx: idx, // add idx property for tracking flagged question
      isCorrectAnswered: null, // answered question is correct or not
    })),
  });

  const handleOnSubmit = () => setShowPopUp(true);

  const handleOptionClick = (optionId) => {
    const updatedQuestionsState = {
      ...questionsState,
      questions: questionsState.questions.map((question, index) => {
        return index === currentQuestion
          ? {
              ...question,
              answered: optionId,
              selectedOption: optionId,
              isCorrectAnswered: question.options[optionId].isCorrect,
            }
          : question;
      }),
    };

    setQuestionsState(updatedQuestionsState);

    //Remember flagged items
    const newSelectedFlags = [...selectedFlags];
    newSelectedFlags[currentQuestion] = true;
    setSelectedFlags(newSelectedFlags);
  };

  const clickNext = () => {
    if (currentQuestion + 1 < selectedExam.questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const clickPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // const handleChange = (event) => {
  //   const selectedOptionId = event.target.value;
  //   // setSelectedOption(selectedOptionId);
  // };

  const handleonFlaggedModeCick = () => {
    setOnFlaggedMode(!onFlaggedMode);
  };

  const handleNextFlaggedQuestion = () => {
    if (currentFlaggedQuestion === flaggedQuestions.length - 1) {
      setCurrentFlaggedQuestion(0);
    } else {
      setCurrentFlaggedQuestion(
        (currentFlaggedQuestion % (flaggedQuestions.length - 1)) + 1
      );
    }
  };

  const handlePreviousFlaggedQuestion = () => {
    setCurrentFlaggedQuestion(() => {
      if (currentFlaggedQuestion > 0) {
        return currentFlaggedQuestion - 1;
      } else {
        return flaggedQuestions.length - 1;
      }
    });
  };

  //continuously track the current Flagged question and current question
  useEffect(() => {
    //only run for flagged mood
    if (!onFlaggedMode) return;

    //find all flagged questions
    setFlaggedQuestions(
      questionsState.questions.filter((ques) => ques.flagged)
    );

    //find first flagged question = current flagged question
    const firstFlaggedQuestionIndex = questionsState.questions.findIndex(
      (ques) => ques.flagged
    );

    if (firstFlaggedQuestionIndex !== -1) {
      setCurrentQuestion(firstFlaggedQuestionIndex);
    }

    if (flaggedQuestions.length > 1) {
      setCurrentQuestion(flaggedQuestions[currentFlaggedQuestion].idx);
    } else {
      setCurrentFlaggedQuestion(0); //if not do this, currentFlaggedQuestion = NaN
    }
  }, [
    questionsState.questions,
    flaggedQuestions.length,
    currentFlaggedQuestion,
    onFlaggedMode,
  ]);

  return (
    <main className="h-screen">
      <div className="container h-screen mx-auto bg-gray-100 py-2 px-2">
        <div className="flex flex-row h-full gap-4">
          <ListOfQuestionsSideBar
            selectedExam={selectedExam}
            selectedFlags={selectedFlags}
            onFlaggedMode={onFlaggedMode}
            questionsState={questionsState}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            setQuestionsState={setQuestionsState}
            currentFlaggedQuestion={currentFlaggedQuestion}
            setCurrentFlaggedQuestion={setCurrentFlaggedQuestion}
            flaggedQuestions={flaggedQuestions}
          />

          <section
            className="w-full max-h-screen
          sm:w-2/3 md:w-3/4 overflow-hidden grid grid-rows-6"
          >
            {/* EXAM TAB */}

            <div className="row-span-5 overflow-hidden">
              {/* Title and Timer  */}
              <div className="flex justify-between bg-white py-4 px-6 rounded shadow">
                <h3 className="text-lg font-bold">{selectedExam.name}</h3>
                <h3 className="text-lg flex">
                  <span className="mr-4 font-bold ">Timer:</span> <Timer />
                </h3>
              </div>

              {/* Question container */}
              <div className="bg-white px-2 py-4 rounded shadow mt-2 h-full">
                <div className="h-90p overflow-hidden overflow-y-auto">

                  {/* <h3 className="text-lg font-bold mt-2">
                    Question: {currentQuestion + 1} out of{' '}
                    {selectedExam.questions.length}
                  </h3> */}

                  {/* <p className="mb-4 mt-6">
                  Q: {selectedExam.questions[currentQuestion].question}
                </p> */}
                  {/* generateRandomQuestions: format questions, break into multiple lines */}
                  <div className="py-4 px-6 text-left">
                    {selectedExam.questions[currentQuestion].question
                      .trim()
                      .split('\n')
                      .map((line, idx) => (
                        <p className={`${idx > 1 && '&& indent-6'} `} key={idx}>
                          {idx === 0 ? (
                            <span className="font-semibold">Q - {currentQuestion + 1}: </span>
                          ) : null}
                          {line}
                        </p>
                      ))}
                  </div>

                  {/* generateRandomQuestions: add new image if the question have an image */}
                  {selectedExam.questions[currentQuestion].question_img && (
                    <div className="flex gap-4 flex-wrap mx-6 my-2">
                      {selectedExam.questions[currentQuestion].question_img &&
                        selectedExam.questions[
                          currentQuestion
                        ].question_img.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={img}
                            className="object-contain max-h-40"
                          />
                        ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 text-left p-6">
                    {selectedExam.questions[currentQuestion].options.map(
                      (option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="radio"
                            className="form-radio"
                            name="answer"
                            value={option.id}
                            // defaultChecked={false}
                            // onChange={handleChange}
                            onChange={() => {
                              handleOptionClick(option.id);
                            }}
                            checked={
                              questionsState.questions[currentQuestion]
                                .selectedOption === option.id
                            }
                          />
                          {/* generateRandomQuestions: add images for options   */}
                          <p className="px-2">{option.text}</p>

                          {option.image && (
                            <img
                              src={option.image.src}
                              alt={option.image.alt}
                              className="max-h-20 ml-3"
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTONS  */}
            <div className="row-span-1 flex flex-col justify-between">
              {/* onFlaggedMode/Next-Previous Buttons */}
              {onFlaggedMode ? (
                <>
                  {/* onFlaggedMode Buttons  */}
                  <div className="flex justify-center py-4 gap-4 text-xl">
                    <button
                      className={`px-4 py-2 rounded bg-none text-black 
                      ${
                        flaggedQuestions.length <= 1
                          ? 'text-slate-500'
                          : 'hover:text-slate-500 transition-colors duration-300'
                      }`}
                      onClick={handlePreviousFlaggedQuestion}
                      disabled={flaggedQuestions.length <= 1}
                    >
                      <ImArrowLeft />
                    </button>

                    <div className="flex gap-4 items-center">
                      <FaFlag />
                      <div className="flex gap-1 items-center">
                        {flaggedQuestions.length === 0
                          ? 0
                          : currentFlaggedQuestion + 1}
                        <RxSlash />
                        {flaggedQuestions.length}
                      </div>
                    </div>

                    <button
                      className={`px-4 py-2 rounded bg-none text-black 
                      ${
                        flaggedQuestions.length <= 1
                          ? 'text-slate-500'
                          : 'hover:text-slate-500 transition-colors duration-300'
                      }`}
                      onClick={handleNextFlaggedQuestion}
                      disabled={flaggedQuestions.length <= 1}
                    >
                      <ImArrowRight />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Next-Previous Buttons */}
                  {/* <div className="flex justify-center py-4 gap-4">
                    <button
                      className={`px-4 py-2 rounded text-white
                  ${
                    currentQuestion === 0
                      ? 'bg-slate-400'
                      : 'bg-blue-500 hover:bg-blue-600 transition-colors duration-300'
                  }`}
                      disabled={currentQuestion === 0}
                      onClick={clickPrevious}
                    >
                      Previous
                    </button>
                    <button
                      className={`px-4 py-2 text-white rounded
                                    ${
                                      currentQuestion ===
                                      selectedExam.questions.length - 1
                                        ? 'bg-slate-400'
                                        : 'bg-orange-500 hover:bg-orange-600 transition-colors duration-300'
                                    }`}
                      disabled={questionsState.questions.length <= 1}
                      onClick={clickNext}
                    >
                      Next
                    </button>
                  </div> */}

                  <div className="flex justify-center py-4 gap-4 text-xl">
                    <button
                      className={`px-4 py-2 rounded bg-none text-black 
                      ${
                        currentQuestion === 0
                          ? 'text-slate-500'
                          : 'hover:text-slate-500 transition-colors duration-300'
                      }`}
                      disabled={currentQuestion === 0}
                      onClick={clickPrevious}
                    >
                      <ImArrowLeft />
                    </button>

                    <div className="flex gap-4 items-center">
                      <div className="flex gap-1 items-center">
                        {currentQuestion + 1}
                        <RxSlash />
                        {questionsState.questions.length}
                      </div>
                    </div>

                    <button
                      className={`px-4 py-2 rounded bg-none text-black 
                      ${
                        currentQuestion + 1 === questionsState.questions.length
                          ? 'text-slate-500'
                          : 'hover:text-slate-500 transition-colors duration-300'
                      }
                      `}
                      disabled={
                        currentQuestion + 1 === questionsState.questions.length
                      }
                      onClick={clickNext}
                    >
                      <ImArrowRight />
                    </button>
                  </div>
                </>
              )}

              {/* Review-Submit */}
              <div className="bg-white p-3 rounded shadow flex gap-4 justify-between">
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors duration-300
                  flex justify-between gap-2 items-center"
                  onClick={() => {
                    handleonFlaggedModeCick();
                  }}
                >
                  <span className='font-medium'>
                    {onFlaggedMode ? 'Turn Off' : 'Turn On'}
                  </span>
                  <FaFlag />
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 
                  font-medium"
                  onClick={handleOnSubmit}
                >
                  Submit
                </button>
              </div>
            </div>

            <ExamScorePopUpModal
              visible={showPopUp}
              onClose={() => setShowPopUp(false)}
              // selectedOption={selectedOption}
              questionsState={questionsState}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default SinglePracticeExam;
