import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { exams } from '../../assets/duplicateQuestionData.js';
import ExamScorePopUpModal from './ExamScorePopUp.jsx';
import ListOfQuestionsSideBar from './ListOfQuestionsSideBar.jsx';
import Timer from './Timer.js';


function SinglePracticeExam() {
  const { examId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0); //Tracks the index of the current question being displayed.
  const [score, setScore] = useState(0); //Holds the user's current score in the exam
  const [showPopUp, setShowPopUp] = useState(false); //Controls the visibility of the exam score pop-up modal.
  const [selectedOption, setSelectedOption] = useState(null); //Holds the ID of the selected option for the current question.
  const selectedExam = exams[examId]; // Find the selected exam using the examId
  const [selectedFlags, setSelectedFlags] = useState( //An array of booleans that tracks whether a question has been flagged or not.
    Array(selectedExam.questions.length).fill(false)
  );
  const [answeredQuestions, setAnsweredQuestions] = useState([]); //An array of booleans that tracks whether a question has been answered or not.
  const [unansweredQuestions, setUnansweredQuestions] = useState(
    [...Array(selectedExam.questions.length).keys()]
  );

  const handleOnSubmit = () => setShowPopUp(true);

  const handleOptionClick = (optionId, isCorrect) => {
    setSelectedOption(optionId);

    //Remember flagged items
    const newSelectedFlags = [...selectedFlags];
    newSelectedFlags[currentQuestion] = true;
    setSelectedFlags(newSelectedFlags);

    //Remember answered questions
    const answeredQ = [...answeredQuestions];
    answeredQ[currentQuestion] = true;
    setAnsweredQuestions(answeredQ);
    setUnansweredQuestions((prevUnansweredQuestions) =>
    prevUnansweredQuestions.filter((index) => index !== currentQuestion)
  );
    //If selected option is correct, score adds by 1
    setScore(prevScore => isCorrect ? prevScore + 1 : prevScore);
  };

  const clickNext = () => {
    if (currentQuestion + 1 < selectedExam.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const clickPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartExam = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedFlags(Array(selectedExam.questions.length).fill(false)); // Reset selectedFlags
  };

  const handleChange = event => {
    // 👇️ this is the input field itself
    console.log(event.target);
    
    // 👇️ this is the new value of the input
    console.log(currentQuestion);
  };


  return (
      <main>
        <div className="container h-auto mx-auto px-6 py-6 bg-gray-100">
          <div className="flex flex-row max-h-screen py-4">
              <ListOfQuestionsSideBar selectedExam={selectedExam} selectedFlags={selectedFlags} setCurrentQuestion={setCurrentQuestion}/>
            
            <section className="w-full max-h-screen overflow-y-auto sm:w-2/3 md:w-3/4 pt-1 px-2">
              <div>
                {/* Exam tab */}
                <div className="bg-white p-4 rounded shadow mb-4">
                  <h3 className="text-lg font-bold">{selectedExam.name}</h3>
                </div>
                {/* Timer */}
                <div className="bg-white p-4 rounded shadow mb-4">
                  <h3 className="text-lg font-bold">Timer</h3>
                  <Timer />
                </div>
                {/* Question container */}
                <div className="bg-white p-4 rounded shadow mb-4">
                  <h3 className="text-lg font-bold">
                    Question: <p className="text-blue-600">{currentQuestion + 1}</p>out of {selectedExam.questions.length}
                  </h3>
                  <p className="mb-4 mt-6">
                    Q: {selectedExam.questions[currentQuestion].question}
                  </p>
                  <div className="grid grid-cols-1 gap-4 text-left p-6">
                  {selectedExam.questions[currentQuestion].options.map((option) => (
                    <>
                    <div key={option.id} className="flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="answer"
                        value={option.id}
                        defaultChecked={false}
                        onChange={ handleChange }
                        onClick={() => {handleOptionClick(option.id, option.isCorrect)}} 
                      />
                      <span className="ml-2 `bg-${option.isCorrect ? 'green' : 'gray'}`">{option.text}</span>
                    </div>
                    </>
                  ))}
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-center py-6">
                  <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded" onClick={clickPrevious}>
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={clickNext}>
                    Next
                  </button>
                </div>
                {/* Submit */}
                <div className="bg-white p-4 py-6 rounded shadow mb-4">
                  <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleOnSubmit}>
                    Submit
                  </button>
                </div>
                <ExamScorePopUpModal visible={showPopUp} onClose={() => setShowPopUp(false)} handleOnSubmit={handleOnSubmit} score={score} restartExam={restartExam} answeredQuestionsLength={answeredQuestions.length} selectedExamQuestionsList={selectedExam.questions.length}/>
              </div>
            </section>
          </div>
        </div>
      </main>
  );
}

export default SinglePracticeExam;