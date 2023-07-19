import React, { useState } from 'react';
import ExamScorePopUpModal from './ExamScorePopUp.jsx';
import Timer from './Timer.js';

function SinglePracticeExam({ selectedExam }) {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOnSubmit = () => setShowPopUp(true);

  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const clickNext = () => {
    if (currentQuestion + 1 < selectedExam.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const clickPrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const restartExam = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (

      <main>
        <div className="container mx-auto px-6 py-6 bg-gray-100">
          <div className="flex flex-row flex-wrap py-4">
            <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
              <div className="top-0 p-4 w-full">
                <ul className="flex flex-col overflow-hidden list-image-[url(checkmark.png)] space-y-2">
                  {/* List of items */}
                  <li className="bg-white p-2 rounded shadow border border-gray-300">01</li>
                  <li className="bg-white p-2 rounded shadow border border-gray-300">02</li>
                  <li className="bg-white p-2 rounded shadow border border-gray-300">01</li>
                  <li className="bg-white p-2 rounded shadow border border-gray-300">02</li>
                </ul>
              </div>
            </aside>
            <section className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
              <div>
                {/* Exam tab */}
                <div className="bg-white p-4 rounded shadow mb-4">
                  <h3 className="text-lg font-bold">{selectedExam.name}</h3>
                  {/* Add exam number content here */}
                </div>

                {/* Timer */}
                <div className="bg-white p-4 rounded shadow mb-4">
                  <h3 className="text-lg font-bold">Timer</h3>
                  <Timer />
                  {/* Add timer content here */}
                </div>

                {/* Question container */}
                <div className="bg-white p-4 rounded shadow mb-4">
                  <h3 className="text-lg font-bold">
                    Question: {currentQuestion + 1} out of {selectedExam.questions.length}
                  </h3>
                  <p className="mb-4">
                    {selectedExam.questions[currentQuestion].question}
                  </p>
                  <ul className="space-y-2">
                    {selectedExam.questions[currentQuestion].options.map((option) => {
                      return (
                        <li key={option.id}>
                          <label className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="answer" value="option1" />
                            <span className="ml-2">{option.text}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex justify-end">
                  <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded" onClick={clickPrevious}>
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={clickNext}>
                    Next
                  </button>
                </div>

                {/* Submit */}
                <div className="bg-white p-4 rounded shadow mb-4">
                  <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleOnSubmit}>
                    Submit
                  </button>
                  {/* Add submit content here */}
                </div>
                <ExamScorePopUpModal visible={showPopUp} handleOnSubmit={handleOnSubmit} />
              </div>
            </section>
          </div>
        </div>
      </main>
  );
}

export default SinglePracticeExam;