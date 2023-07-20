import React, { useState, useEffect, useRef } from "react";
import generatorLogic from "./GeneratorLogic";

const Question = ({ category }) => {
  const [question, setQuestion] = useState({
    question: ``,
    choices: [],
    answer: "",
  });
  const [showSolution, setShowSolution] = useState(false);
  const [chosen, setChosen] = useState(null);
  const colorRef = useRef();
  useEffect(() => setQuestion(generatorLogic(category)), []);

  const handleSubmit = () => {
    setShowSolution(true);
    if (question.answer === chosen) {
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
        <ul className="p-10">
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
              {choice}
            </li>
          ))}
        </ul>
        <button
          className="rounded-full border-2 p-1 w-20"
          onClick={handleSubmit}
          disabled={!chosen || showSolution}
        >
          Sumbit
        </button>
        <div
          className={
            showSolution
              ? "cursor-pointer"
              : "pointer-events-none text-gray-500"
          }
        >
          Solution
        </div>
        <p
          className="cursor-pointer"
          onClick={() => {
            setShowSolution(false);
            setChosen(null);
            setQuestion(generatorLogic(category));
          }}
        >
          {"Next" + ">>"}
        </p>
      </div>
    </div>
  );
};

export default Question;
