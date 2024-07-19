import React, { useState, useEffect, useRef } from "react";
import generatorLogic from "./GeneratorLogic";
import { ForwardIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const Question = ({ category, answeredCorrect }) => {
  const [question, setQuestion] = useState({
    question: ``,
    choices: [],
    answer: "",
  });
  const [showSolution, setShowSolution] = useState(false);
  const [viewSolution, setViewSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const colorRef = useRef();
  useEffect(() => {
    setQuestion(generatorLogic(category));
  }, [category]);

  const handleSubmit = () => {
    setShowSolution(true);
    setSubmitted(true);
    if (question.answer === chosen) {
      answeredCorrect((prev) => prev + 1);
      setIsCorrect(true);
      colorRef.current.classList.remove("bg-gray-400");
      colorRef.current.classList.add("bg-green-400");
    } else {
      answeredCorrect(0);
      colorRef.current.classList.remove("bg-gray-400");
      colorRef.current.classList.add("bg-red-400");
    }
  };

  return (
    <div className="flex gap-5 p-5 border rounded-xl mb-4 shadow-xl w-3/4 h-1/2">
      {/* <p>Question:</p> */}
      <div className="text-start">
        <p className="font-bold">{question.question}</p>
        <img
          src={question.image}
          alt="question pic"
          className="w-96 block mr-auto ml-auto"
        />
        <div className="flex justify-evenly">
          {question.choices.map((choice, ind) => (
            <button
              ref={choice === chosen ? colorRef : null}
              value={choice}
              key={choice}
              className={
                "border-2 rounded-xl p-2 m-2 cursor-pointer " +
                (choice === chosen && "bg-gray-400")
                // (question.answer === choice && isCorrect
                //   ? "bg-green-400"
                //   : null)
              }
              onClick={(e) => {
                setChosen(parseFloat(e.target.value));
              }}
            >
              {choice} {question.label}
            </button>
          ))}
        </div>

        <div className="flex justify-around items-center p-4">
          <button
            className="rounded-full border-2  w-20 m-2"
            onClick={handleSubmit}
            disabled={!chosen || showSolution}
          >
            Submit
          </button>
          <div
            className={
              showSolution
                ? "cursor-pointer font-bold"
                : "pointer-events-none text-gray-500 font-bold"
            }
            onClick={() => setViewSolution(!viewSolution)}
          >
            {viewSolution ? "Hide Solution" : "View Solution"}
          </div>
          <div
            className="cursor-pointer flex justify-start items-center gap-2 font-bold"
            onClick={() => {
              setShowSolution(false);
              setChosen(null);
              setQuestion(generatorLogic(category));
              if (!submitted) {
                answeredCorrect(0);
              }
              setSubmitted(false);
              setViewSolution(false);
            }}
          >
            Regenerate <ArrowPathIcon className="h-5 w-5" />
          </div>
        </div>
        {viewSolution && <div>{question.solution}</div>}
      </div>
    </div>
  );
};

export default Question;
