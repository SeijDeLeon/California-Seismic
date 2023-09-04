import React, { useState, useEffect, useRef } from "react";
import generatorLogic from "./GeneratorLogic";
import { ForwardIcon } from "@heroicons/react/24/solid";

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
  const colorRef = useRef();
  useEffect(() => setQuestion(generatorLogic(category)), []);

  const handleSubmit = () => {
    setShowSolution(true);
    setSubmitted(true);
    if (question.answer === chosen) {
      answeredCorrect((prev) => prev + 1);
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
              }
              onClick={(e) => {
                setChosen(parseFloat(e.target.value));
              }}
            >
              {choice} s
            </button>
          ))}
        </div>
        <button
          className="rounded-full border-2  w-20 m-2"
          onClick={handleSubmit}
          disabled={!chosen || showSolution}
        >
          Submit
        </button>
        <div className="flex justify-between p-2">
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
            }}
          >
            Next <ForwardIcon className="h-5 w-5" />
          </div>
          <div
            className={
              showSolution
                ? "cursor-pointer font-bold"
                : "pointer-events-none text-gray-500 font-bold"
            }
            onClick={() => setViewSolution(!viewSolution)}
          >
            View Solution
          </div>
        </div>
        {viewSolution && (
          <div>
            This is a cantilevered column SDOF structure, so we can first
            determine the stiffness of the SDOF and then plug the stiffness into
            the period equation for an SDOF system. Determine stiffness: k =
            3(El)/h3
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
