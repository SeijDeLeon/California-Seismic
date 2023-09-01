import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Question from "./Question";
import { Popover } from "@headlessui/react";
import Tooltip from "../Tooltip";
const QuestionGeneratorDisplay = () => {
  const categories = [
    "Fundamental Period",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
  ];
  const [category, setCategory] = useState("Fundamental Period");
  const [answeredCorrect, setAnsweredCorrect] = useState(0);
  const [bestScore, setBestScore] = useState(
    isNaN(localStorage.getItem("bestScore"))
      ? 0
      : parseInt(JSON.parse(localStorage.getItem("bestScore")))
  );
  useEffect(() => {
    if (answeredCorrect > bestScore) {
      setBestScore(answeredCorrect);
    }
  }, [answeredCorrect]);
  useEffect(() => {
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
  }, [bestScore]);
  return (
    <div className="m-auto">
      <div className="grid grid-cols-3 gap-5 m-5 mt-0">
        {categories.map((item) => (
          <div
            className="border-2 rounded-lg cursor-pointer font-bold hover:bg-slate-300"
            onClick={(e) => setCategory(e.target.value)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-evenly">
        <div className="flex flex-col justify-center gap-10 items-center ">
          <Tooltip content={"Streak of correctly answered in current session."}>
            <div className="border-2 rounded-full shadow-xl w-40 font-bold">
              <p>Current</p>
              <p className="font-extrabold text-2xl">{answeredCorrect}</p>
            </div>
          </Tooltip>
          <Tooltip
            content={
              "Timer for 2:45 mins. Changes to red color after specified time."
            }
          >
            <Timer />
          </Tooltip>
          <Tooltip
            content={"Best streak of correctly answered in all sessions."}
          >
            <div className="border-2 rounded-full shadow-xl w-40 font-bold">
              <p>Best</p>
              <p className="font-extrabold text-2xl">{bestScore}</p>
            </div>
          </Tooltip>
        </div>
        <Question category={category} answeredCorrect={setAnsweredCorrect} />
      </div>
    </div>
  );
};

export default QuestionGeneratorDisplay;
