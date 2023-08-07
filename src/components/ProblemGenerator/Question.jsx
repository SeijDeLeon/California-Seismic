import React, { useState, useEffect, useRef } from "react";
import generatorLogic from "./GeneratorLogic";
import { ForwardIcon } from "@heroicons/react/24/solid";

const Question = ({ category, totalQuestions, answeredCorrect }) => {
  const [question, setQuestion] = useState({
    question: ``,
    choices: [],
    answer: "",
  });
  const [showSolution, setShowSolution] = useState(false);
  const [viewSolution, setViewSolution] = useState(false);
  const [chosen, setChosen] = useState(null);
  const colorRef = useRef();
  useEffect(() => setQuestion(generatorLogic(category)), []);

  const handleSubmit = () => {
    setShowSolution(true);
    // totalQuestions((prev) => prev + 1);
    if (question.answer === chosen) {
      answeredCorrect((prev) => prev + 1);
      colorRef.current.classList.remove("bg-gray-400");
      colorRef.current.classList.add("bg-green-400");
    } else {
      colorRef.current.classList.remove("bg-gray-400");
      colorRef.current.classList.add("bg-red-400");
    }
  };

  return (
    <div className="flex gap-5 p-5 border-2 rounded-xl m-5 shadow-xl">
      <p>Question:</p>
      <div className="text-start">
        <p>{question.question}</p>
        {/* <div className="flex justify-center self-center"> */}
        <img
          src={question.image}
          alt="question pic"
          className="w-96 block mr-auto ml-auto"
        />
        {/* </div> */}
        <ul className="p-2">
          {question.choices.map((choice) => (
            <li
              ref={choice === chosen ? colorRef : null}
              value={choice}
              key={choice}
              className={
                "border-2  rounded-xl p-2 m-2 cursor-pointer " +
                (choice === chosen && "bg-gray-400")
              }
              onClick={(e) => {
                setChosen(e.target.value);
              }}
            >
              {choice} s
            </li>
          ))}
        </ul>
        <button
          className="rounded-full border-2  w-20"
          onClick={handleSubmit}
          disabled={!chosen || showSolution}
        >
          Sumbit
        </button>
        <div className="flex justify-between p-2">
          <div
            className="cursor-pointer flex justify-start items-center gap-2 font-bold"
            onClick={() => {
              setShowSolution(false);
              setChosen(null);
              totalQuestions((prev) => prev + 1);
              setQuestion(generatorLogic(category));
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
            Sociable on as carriage my position weddings raillery consider.
            Peculiar trifling absolute and wandered vicinity property yet. The
            and collecting motionless difficulty son. His hearing staying ten
            colonel met. Sex drew six easy four dear cold deny. Moderate
            children at of outweigh it. Unsatiable it considered invitation he
            travelling insensible. Consulted admitting oh mr up as described
            acuteness propriety moonlight.
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
