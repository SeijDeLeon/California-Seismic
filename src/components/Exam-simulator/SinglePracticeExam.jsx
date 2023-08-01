import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { exams } from "../../assets/duplicateQuestionData.js";
import ExamScorePopUpModal from "./ExamScorePopUp.jsx";
import ListOfQuestionsSideBar from "./ListOfQuestionsSideBar.jsx";
import Timer from "./Timer.js";

function SinglePracticeExam() {
  const { examId } = useParams();
  const selectedExam = exams[examId]; // Find the selected exam using the examId
  const [currentQuestion, setCurrentQuestion] = useState(0); //Tracks the index of the current question being displayed.
  const [score, setScore] = useState(0); //Holds the user's current score in the exam
  const [showPopUp, setShowPopUp] = useState(false); //Controls the visibility of the exam score pop-up modal.
  const [selectedOption, setSelectedOption] = useState(null); //Holds the ID of the selected option for the current question.
  const [selectedFlags, setSelectedFlags] = useState(
    //An array of booleans that tracks whether a question has been flagged or not.
    Array(selectedExam.questions.length).fill(false)
  );
  const [answeredQuestions, setAnsweredQuestions] = useState([]); //An array of booleans that tracks whether a question has been answered or not.

  const [questionsState, setQuestionsState] = useState(
    selectedExam.questions.map((question) => ({
      flagged: false,
      answered: null,
      selectedOption: null, // Add selectedOption property for each question
    }))
  );

  const handleOnSubmit = () => setShowPopUp(true);

  const handleOptionClick = (optionId, isCorrect) => {
    const updatedQuestionsState = questionsState.map((question, index) =>
      index === currentQuestion
        ? { ...question, answered: optionId, selectedOption: optionId }
        : question
    );

    setQuestionsState(updatedQuestionsState);

    // Check if the user has already answered the current question
    const hasAnswered = questionsState[currentQuestion].answered !== null;

    // If the user hasn't already answered, add score
    if (!hasAnswered) {
      setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
    }
  };

  const clickNext = () => {
    unCheck();
    if (currentQuestion + 1 < selectedExam.questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
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

  const unCheck = () => {
    let allRadioButtons = document.querySelectorAll(".form-radio");
    // Loop through all the radio buttons and set the 'checked' property to false
    allRadioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });
  };

  const handleChange = (event) => {
    const selectedOptionId = event.target.value;
    setSelectedOption(selectedOptionId);
  };

  const [displaySolution, setDisplaySolution] = useState(false);

  return (
    <main>
      <div className="container h-auto mx-auto px-6 py-6 bg-gray-100">
        <div className="flex flex-row max-h-screen py-4">
          <ListOfQuestionsSideBar
            selectedExam={selectedExam}
            selectedFlags={selectedFlags}
            setCurrentQuestion={setCurrentQuestion}
          />

          <section className="w-full max-h-screen overflow-y-auto sm:w-2/3 md:w-3/4 pt-1 px-2">
            <div>
              {/* Exam tab */}
              <div className="bg-white p-4 rounded shadow mb-4">
                <h3 className="text-lg font-bold">{selectedExam.name}</h3>
              </div>
              {/* Timer */}
              <div className="bg-white p-4 rounded shadow mb-4">
                <h3 className="text-lg font-bold">Timer</h3>
                {displaySolution ? "00:00" : <Timer />}
              </div>
              {/* Question container */}
              <div className="bg-white p-4 rounded shadow mb-4">
                <h3 className="text-lg font-bold">
                  Question:{" "}
                  <p className="text-blue-600">{currentQuestion + 1}</p>out of{" "}
                  {selectedExam.questions.length}
                </h3>
                <p className="mb-4 mt-6">
                  Q: {selectedExam.questions[currentQuestion].question}
                </p>
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
                          onChange={handleChange}
                          onClick={() => {
                            handleOptionClick(option.id, option.isCorrect);
                          }}
                          checked={
                            questionsState[currentQuestion].selectedOption ===
                            option.id
                          }
                        />
                        <span
                          className={
                            displaySolution
                              ? option.id === selectedOption
                                ? option.isCorrect
                                  ? "bg-gradient-to-r from-green-300"
                                  : "bg-gradient-to-r from-red-300"
                                : option.isCorrect
                                ? "bg-gradient-to-r from-green-300"
                                : null
                              : null
                          }
                        >
                          {option.text}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-center py-6">
                <button
                  className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
                  onClick={clickPrevious}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                  onClick={clickNext}
                >
                  Next
                </button>
              </div>
              {/* Submit */}
              <div className="bg-white p-4 py-6 rounded shadow mb-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleOnSubmit}
                >
                  Submit
                </button>
              </div>
              <ExamScorePopUpModal
                visible={showPopUp}
                onClose={() => setShowPopUp(false)}
                handleOnSubmit={handleOnSubmit}
                displaySolution={displaySolution}
                setDisplaySolution={setDisplaySolution}
                selectedExam={selectedExam}
                score={score}
                restartExam={restartExam}
                answeredQuestionsLength={answeredQuestions.length}
                selectedExamQuestionsList={selectedExam.questions.length}
                currentQuestion={currentQuestion}
                selectedOption={selectedOption}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default SinglePracticeExam;
